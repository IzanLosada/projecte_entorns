/**
 * BLOKIC - Game Core Mejorado
 * Gestor principal del juego con sistema de menú y ajustes
 */

class GameManager {
    constructor(canvasId = 'gameCanvas', containerId = 'piecesContainer') {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.piecesContainer = document.getElementById(containerId);
        this.nextPiecesContainer = document.getElementById('nextPiecesContainer');

        this.board = new Board(8, 8, 64);
        this.pieceManager = new PieceManager(3);

        this.gameMode = 'zen';
        this.isRunning = false;
        this.isPaused = false;
        this.gameOver = false;
        this.currentScreen = 'start';

        this.score = 0;
        this.linesCleared = 0;
        this.combo = 0;
        this.timeElapsed = 0;
        this.timeRemaining = 180;

        this.selectedPieceId = null;
        this.hoverCell = null;

        this.dragState = {
            active: false,
            pieceId: null,
            pointerX: 0,
            pointerY: 0,
            hoverCell: null
        };

        this.boardOffsetX = 12;
        this.boardOffsetY = 12;

        this.lastFrameTime = performance.now();
        this.lastWarningTime = 0;

        this.setupEventListeners();
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        this.showScreen('start');
        this.animate();
    }

    setupEventListeners() {
        // Pantalla de inicio
        document.getElementById('btnStartScreen').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('mode');
        });
        document.getElementById('btnSettingsScreen').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('settings');
        });

        // Pantalla de ajustes
        document.getElementById('btnBackFromSettings').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('start');
        });

        document.getElementById('musicVolume').addEventListener('input', (e) => {
            audioManager.setMusicVolume(e.target.value);
            document.getElementById('musicVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('sfxVolume').addEventListener('input', (e) => {
            audioManager.setSFXVolume(e.target.value);
            document.getElementById('sfxVolumeValue').textContent = e.target.value + '%';
        });

        document.getElementById('enableMusic').addEventListener('change', (e) => {
            audioManager.toggleMusic(e.target.checked);
        });

        document.getElementById('enableSFX').addEventListener('change', (e) => {
            audioManager.toggleSFX(e.target.checked);
        });

        // Selección de fondos
        document.querySelectorAll('.bg-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                audioManager.playClickSound();
                this.selectBackground(e.currentTarget);
            });
        });

        // Pantalla de selección de modo
        document.getElementById('btnBackFromMode').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('start');
        });

        document.getElementById('btnSelectZen').addEventListener('click', () => {
            audioManager.playClickSound();
            this.startNewGame('zen');
        });

        document.getElementById('btnSelectPanic').addEventListener('click', () => {
            audioManager.playClickSound();
            this.startNewGame('panic');
        });

        // Pantalla de juego
        document.getElementById('btnPause').addEventListener('click', () => {
            audioManager.playClickSound();
            if (this.isRunning) {
                this.togglePause();
            }
        });

        document.getElementById('btnMenuFromGame').addEventListener('click', () => {
            audioManager.playClickSound();
            this.returnToMenu();
        });

        document.getElementById('btnResume').addEventListener('click', () => {
            audioManager.playClickSound();
            this.togglePause();
        });

        document.getElementById('btnBackToMenuFromPause').addEventListener('click', () => {
            audioManager.playClickSound();
            this.returnToMenu();
        });

        // Modal de Game Over
        document.getElementById('btnPlayAgain').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('mode');
        });

        document.getElementById('btnBackToMenu').addEventListener('click', () => {
            audioManager.playClickSound();
            this.showScreen('start');
        });

        // Eventos del canvas
        this.canvas.addEventListener('pointermove', (e) => this.onCanvasPointerMove(e));
        this.canvas.addEventListener('pointerleave', () => {
            if (!this.dragState.active) {
                this.hoverCell = null;
            }
        });
        this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));

        window.addEventListener('pointermove', (e) => this.onWindowPointerMove(e));
        window.addEventListener('pointerup', (e) => this.onWindowPointerUp(e));
    }

    selectBackground(button) {
        document.querySelectorAll('.bg-option').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const bg = button.dataset.bg;
        document.body.className = 'bg-' + bg;
        localStorage.setItem('blokicBackground', bg);
    }

    loadSavedBackground() {
        const saved = localStorage.getItem('blokicBackground');
        if (saved) {
            const button = document.querySelector(`[data-bg="${saved}"]`);
            if (button) {
                this.selectBackground(button);
            }
        }
    }

    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        const screenElement = document.getElementById(screenName + 'Screen');
        if (screenElement) {
            screenElement.classList.add('active');
            this.currentScreen = screenName;

            if (screenName === 'game') {
                this.resizeCanvas();
            }
        }
    }

    startNewGame(mode) {
        this.gameMode = mode;
        this.isRunning = true;
        this.isPaused = false;
        this.gameOver = false;

        this.board.reset();
        this.pieceManager.startNewGame();

        this.score = 0;
        this.linesCleared = 0;
        this.combo = 0;
        this.timeElapsed = 0;
        this.timeRemaining = this.gameMode === 'panic' ? 180 : Infinity;

        this.selectedPieceId = null;
        this.hoverCell = null;
        this.dragState.active = false;
        this.dragState.pieceId = null;
        this.dragState.hoverCell = null;

        this.closeGameOverModal();
        this.closePauseModal();

        document.getElementById('btnPause').disabled = false;
        document.getElementById('btnMenuFromGame').disabled = false;

        this.updateStatus('Juego iniciado. Arrastra una pieza al tablero.');
        this.updateUI();
        this.renderPiecesUI();
        this.renderNextPiecesPreview();

        this.showScreen('game');

        if (!this.board.hasAvailableMoves(this.pieceManager.getCurrentPieces())) {
            this.endGame('Sin movimientos');
        }

        // Reproducir música de fondo
        audioManager.playBackgroundMusic();
    }

    togglePause() {
        if (!this.isRunning) return;

        this.isPaused = !this.isPaused;

        if (this.isPaused) {
            document.getElementById('pauseModal').classList.add('active');
            document.getElementById('btnPause').textContent = 'REANUDAR';
        } else {
            document.getElementById('pauseModal').classList.remove('active');
            document.getElementById('btnPause').textContent = 'PAUSAR';
        }
    }

    closePauseModal() {
        document.getElementById('pauseModal').classList.remove('active');
        document.getElementById('btnPause').textContent = 'PAUSAR';
    }

    returnToMenu() {
        this.isRunning = false;
        this.isPaused = false;
        this.gameOver = false;
        this.closePauseModal();
        this.closeGameOverModal();
        this.showScreen('start');
    }

    getSelectedPiece() {
        if (!this.selectedPieceId) return null;
        return this.pieceManager.getPieceById(this.selectedPieceId);
    }

    selectPiece(pieceId) {
        if (!this.isRunning || this.isPaused) return;

        this.selectedPieceId = pieceId;
        this.pieceManager.selectPiece(pieceId);
        this.renderPiecesUI();
        this.updateStatus('Pieza seleccionada. Arrastrala al tablero o haz clic en una casilla.');
    }

    beginDrag(pieceId, event) {
        if (!this.isRunning || this.isPaused) return;

        this.selectedPieceId = pieceId;
        this.pieceManager.selectPiece(pieceId);

        this.dragState.active = true;
        this.dragState.pieceId = pieceId;
        this.dragState.pointerX = event.clientX;
        this.dragState.pointerY = event.clientY;
        this.dragState.hoverCell = this.getBoardCellFromPointer(event.clientX, event.clientY);

        this.renderPiecesUI();
    }

    onCanvasPointerMove(e) {
        if (!this.isRunning || this.isPaused || this.dragState.active) return;
        this.hoverCell = this.getBoardCellFromPointer(e.clientX, e.clientY);
    }

    onCanvasClick(e) {
        if (!this.isRunning || this.isPaused) return;

        const piece = this.getSelectedPiece();
        if (!piece) {
            this.updateStatus('Selecciona una pieza primero.');
            return;
        }

        const cell = this.getBoardCellFromPointer(e.clientX, e.clientY);
        if (!cell) return;

        this.tryPlaceSelectedPiece(cell.x, cell.y, false);
    }

    onWindowPointerMove(e) {
        if (!this.dragState.active) return;

        this.dragState.pointerX = e.clientX;
        this.dragState.pointerY = e.clientY;
        this.dragState.hoverCell = this.getBoardCellFromPointer(e.clientX, e.clientY);
    }

    onWindowPointerUp(e) {
        if (!this.dragState.active) return;

        const piece = this.getSelectedPiece();
        const cell = this.getBoardCellFromPointer(e.clientX, e.clientY);

        this.dragState.active = false;
        this.dragState.pieceId = null;

        if (piece && cell) {
            this.tryPlaceSelectedPiece(cell.x, cell.y, true);
            this.renderPiecesUI();
            return;
        }

        this.dragState.hoverCell = null;
        this.renderPiecesUI();
        this.updateStatus('Suelta la pieza dentro del tablero para colocarla.');
    }

    tryPlaceSelectedPiece(boardX, boardY, isDrag = false) {
        const piece = this.getSelectedPiece();
        if (!piece) return false;

        if (!this.board.canPlacePiece(piece, boardX, boardY)) {
            audioManager.playErrorSound();
            this.updateStatus('No puedes colocar la pieza ahí.');
            return false;
        }

        audioManager.playPlacePieceSound();

        this.board.placePiece(piece, boardX, boardY);
        this.pieceManager.removePieceById(piece.id);
        this.selectedPieceId = null;

        const clearResult = this.board.clearLines();

        let gainedScore = 10;
        let timeBonus = 0;

        if (clearResult.count > 0) {
            audioManager.playLineClearSound();
            gainedScore = 50 * (this.combo + 1) * clearResult.count;
            this.combo++;
            timeBonus = clearResult.count * 5;
            this.score += gainedScore;
            this.linesCleared += clearResult.count;

            if (this.gameMode === 'panic') {
                this.timeRemaining += timeBonus;
            }
        } else {
            this.combo = 0;
            this.score += gainedScore;
        }

        let newBatchLoaded = false;
        if (this.pieceManager.refillIfNeeded()) {
            newBatchLoaded = true;
            audioManager.playBatchCompleteSound();
        }

        this.updateUI();
        this.renderPiecesUI();
        this.renderNextPiecesPreview();

        if (!this.board.hasAvailableMoves(this.pieceManager.getCurrentPieces())) {
            this.endGame('Sin movimientos');
            return true;
        }

        if (clearResult.count > 0) {
            const extra = timeBonus > 0 ? ` y +${timeBonus}s` : '';
            this.updateStatus(`Buen movimiento: +${gainedScore} puntos, ${clearResult.count} linea(s)${extra}.`);
        } else if (newBatchLoaded) {
            this.updateStatus(`Remesa completada. Nuevo lote cargado. +${gainedScore} puntos.`);
        } else {
            this.updateStatus(`Pieza colocada. +${gainedScore} puntos.`);
        }

        return true;
    }

    endGame(reason = 'Game Over') {
        this.isRunning = false;
        this.gameOver = true;

        const statusBox = document.getElementById('statusBox');
        statusBox.classList.add('game-over');

        if (reason === 'Tiempo agotado') {
            this.updateStatus('Se acabo el tiempo en PANIC.');
            audioManager.playGameOverSound();
        } else {
            this.updateStatus('No quedan movimientos disponibles.');
        }

        const modal = document.getElementById('gameOverModal');
        modal.classList.add('active');

        document.getElementById('gameOverTitle').textContent = reason.toUpperCase();
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('finalLines').textContent = this.linesCleared;
        document.getElementById('finalTime').textContent = this.formatTime(this.timeElapsed);

        document.getElementById('btnPause').disabled = true;
        document.getElementById('btnMenuFromGame').disabled = true;
    }

    closeGameOverModal() {
        document.getElementById('gameOverModal').classList.remove('active');
        document.getElementById('statusBox').classList.remove('game-over');
    }

    updateStatus(message) {
        document.getElementById('statusText').textContent = message;
    }

    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('lines').textContent = this.linesCleared;
        document.getElementById('combo').textContent = `x${this.combo + 1}`;

        const timerBox = document.getElementById('timerBox');
        timerBox.classList.remove('warning', 'critical');

        if (this.gameMode === 'panic') {
            document.getElementById('timer').textContent = this.formatTime(this.timeRemaining);

            // Efectos de tensión según el tiempo
            if (this.timeRemaining < 10 && this.timeRemaining > 0) {
                timerBox.classList.add('critical');
                
                // Reproducir sonido de warning cada segundo cuando está crítico
                if (this.timeRemaining - Math.floor(this.timeRemaining) < 0.1 && 
                    performance.now() - this.lastWarningTime > 800) {
                    audioManager.playWarningSound();
                    this.lastWarningTime = performance.now();
                }
            } else if (this.timeRemaining < 30 && this.timeRemaining > 0) {
                timerBox.classList.add('warning');
            }
        } else {
            document.getElementById('timer').textContent = 'ZEN';
        }

        document.getElementById('batchInfo').textContent = `${this.pieceManager.getCurrentPieces().length} PIEZAS`;
    }

    renderPiecesUI() {
        this.piecesContainer.innerHTML = '';
        const pieces = this.pieceManager.getCurrentPieces();

        pieces.forEach((piece) => {
            const pieceDiv = document.createElement('button');
            pieceDiv.type = 'button';
            pieceDiv.className = 'piece-item';

            if (piece.id === this.selectedPieceId) {
                pieceDiv.classList.add('selected');
            }

            if (this.dragState.active && piece.id === this.dragState.pieceId) {
                pieceDiv.classList.add('dragging');
            }

            const miniCanvas = document.createElement('canvas');
            miniCanvas.width = 88;
            miniCanvas.height = 88;

            const miniCtx = miniCanvas.getContext('2d');
            piece.drawMini(miniCtx, 88);

            pieceDiv.appendChild(miniCanvas);

            pieceDiv.addEventListener('click', () => {
                this.selectPiece(piece.id);
            });

            pieceDiv.addEventListener('pointerdown', (event) => {
                event.preventDefault();
                this.beginDrag(piece.id, event);
            });

            this.piecesContainer.appendChild(pieceDiv);
        });
    }

    renderNextPiecesPreview() {
        this.nextPiecesContainer.innerHTML = '';
        const pieces = this.pieceManager.getNextPieces();

        pieces.forEach((piece) => {
            const miniDiv = document.createElement('div');
            miniDiv.className = 'next-piece-mini';

            const miniCanvas = document.createElement('canvas');
            miniCanvas.width = 60;
            miniCanvas.height = 60;

            const miniCtx = miniCanvas.getContext('2d');
            piece.drawMini(miniCtx, 60);

            miniDiv.appendChild(miniCanvas);
            this.nextPiecesContainer.appendChild(miniDiv);
        });
    }

    resizeCanvas() {
        const gameContainer = document.getElementById('gameContainer');
        if (!gameContainer) return;

        const rect = gameContainer.getBoundingClientRect();
        const size = Math.max(320, Math.min(rect.width - 20, rect.height - 20));

        this.canvas.width = size;
        this.canvas.height = size;

        this.board.cellSize = Math.floor((size - 24) / this.board.width);
        this.boardOffsetX = Math.floor((size - this.board.cellSize * this.board.width) / 2);
        this.boardOffsetY = Math.floor((size - this.board.cellSize * this.board.height) / 2);
    }

    getBoardCellFromPointer(clientX, clientY) {
        const rect = this.canvas.getBoundingClientRect();
        const x = ((clientX - rect.left) / rect.width) * this.canvas.width;
        const y = ((clientY - rect.top) / rect.height) * this.canvas.height;

        const boardX = Math.floor((x - this.boardOffsetX) / this.board.cellSize);
        const boardY = Math.floor((y - this.boardOffsetY) / this.board.cellSize);

        if (boardX < 0 || boardY < 0 || boardX >= this.board.width || boardY >= this.board.height) {
            return null;
        }

        return { x: boardX, y: boardY };
    }

    getPanicDrainRate() {
        return 1 + Math.min(1.5, this.score / 1800);
    }

    formatTime(totalSeconds) {
        if (!Number.isFinite(totalSeconds)) return 'ZEN';

        const safeSeconds = Math.max(0, Math.floor(totalSeconds));
        const minutes = Math.floor(safeSeconds / 60);
        const seconds = safeSeconds % 60;

        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    animate = () => {
        requestAnimationFrame(this.animate);

        const currentTime = performance.now();
        const deltaTime = Math.min(0.1, (currentTime - this.lastFrameTime) / 1000);
        this.lastFrameTime = currentTime;

        if (this.isRunning && !this.isPaused) {
            this.timeElapsed += deltaTime;

            if (this.gameMode === 'panic') {
                this.timeRemaining -= deltaTime * this.getPanicDrainRate();

                if (this.timeRemaining <= 0) {
                    this.timeRemaining = 0;
                    this.updateUI();
                    this.endGame('Tiempo agotado');
                    return;
                }
            }

            this.updateUI();
        }

        this.render();
    }

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.board.draw(this.ctx, this.boardOffsetX, this.boardOffsetY);

        const selectedPiece = this.getSelectedPiece();
        const previewCell = this.dragState.active ? this.dragState.hoverCell : this.hoverCell;

        if (this.isRunning && !this.isPaused && selectedPiece && previewCell) {
            const isValid = this.board.canPlacePiece(selectedPiece, previewCell.x, previewCell.y);
            this.board.drawGhost(
                this.ctx,
                selectedPiece,
                previewCell.x,
                previewCell.y,
                this.boardOffsetX,
                this.boardOffsetY,
                isValid
            );
        }

        if (this.dragState.active && selectedPiece && !previewCell) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(255,255,255,0.85)';
            this.ctx.font = '16px Courier New';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Suelta la pieza dentro del tablero', this.canvas.width / 2, this.canvas.height - 20);
            this.ctx.restore();
        }

        if (this.isPaused) {
            this.ctx.save();
            this.ctx.fillStyle = 'rgba(0,0,0,0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#FFBE0B';
            this.ctx.font = 'bold 24px Courier New';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.fillText('PAUSADO', this.canvas.width / 2, this.canvas.height / 2);
            this.ctx.restore();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.blokicGame = new GameManager('gameCanvas', 'piecesContainer');
    
    // Cargar fondo guardado
    setTimeout(() => {
        window.blokicGame.loadSavedBackground();
    }, 100);

    // Cargar ajustes de audio
    const musicVolume = localStorage.getItem('musicVolume') || 70;
    const sfxVolume = localStorage.getItem('sfxVolume') || 70;
    document.getElementById('musicVolume').value = musicVolume;
    document.getElementById('musicVolumeValue').textContent = musicVolume + '%';
    document.getElementById('sfxVolume').value = sfxVolume;
    document.getElementById('sfxVolumeValue').textContent = sfxVolume + '%';
});