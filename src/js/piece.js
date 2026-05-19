/**
 * BLOKIC - Piece System
 * Define las formas de piezas disponibles y su comportamiento
 */

class Piece {
    static nextId = 1;

    static SHAPES = {
        single: [[1]],

        horizontal2: [[1, 1]],
        vertical2: [[1], [1]],

        horizontal3: [[1, 1, 1]],
        vertical3: [[1], [1], [1]],

        horizontal4: [[1, 1, 1, 1]],
        vertical4: [[1], [1], [1], [1]],

        square2x2: [[1, 1], [1, 1]],

        lBlock: [[1, 0], [1, 1]],
        lBlockMirror: [[0, 1], [1, 1]],

        lTall: [[1, 0], [1, 0], [1, 1]],
        lTallMirror: [[0, 1], [0, 1], [1, 1]],

        tBlock: [[1, 1, 1], [0, 1, 0]],
        tBlockRotated: [[1, 0], [1, 1], [1, 0]],

        sBlock: [[1, 1, 0], [0, 1, 1]],
        zBlock: [[0, 1, 1], [1, 1, 0]],

        plus: [[0, 1, 0], [1, 1, 1], [0, 1, 0]],

        lBig: [[1, 0, 0], [1, 0, 0], [1, 1, 1]],
        lBigMirror: [[0, 0, 1], [0, 0, 1], [1, 1, 1]]
    };

    static COLORS = [
        '#FF006E',
        '#00D9FF',
        '#FFBE0B',
        '#3A86FF',
        '#FB5607',
        '#00FF41'
    ];

    static getRandomShape() {
        const shapeKeys = Object.keys(Piece.SHAPES);
        return shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
    }

    constructor(shapeKey, color = null) {
        this.id = Piece.nextId++;
        this.shapeKey = shapeKey;
        this.shape = Piece.SHAPES[shapeKey];
        this.color = color || Piece.COLORS[Math.floor(Math.random() * Piece.COLORS.length)];
    }

    getDimensions() {
        const height = this.shape.length;
        const width = Math.max(...this.shape.map((row) => row.length));
        return { width, height };
    }

    getBlocks() {
        const blocks = [];
        for (let y = 0; y < this.shape.length; y++) {
            for (let x = 0; x < this.shape[y].length; x++) {
                if (this.shape[y][x] === 1) {
                    blocks.push({ x, y });
                }
            }
        }
        return blocks;
    }

    getBlockCount() {
        return this.getBlocks().length;
    }

    draw(ctx, x, y, cellSize = 32, opacity = 1) {
        ctx.save();
        ctx.globalAlpha = opacity;

        for (const block of this.getBlocks()) {
            const px = x + block.x * cellSize;
            const py = y + block.y * cellSize;

            ctx.fillStyle = this.color;
            ctx.fillRect(px + 2, py + 2, cellSize - 4, cellSize - 4);

            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 1;
            ctx.strokeRect(px + 2.5, py + 2.5, cellSize - 5, cellSize - 5);

            ctx.fillStyle = 'rgba(255,255,255,0.18)';
            ctx.fillRect(px + 5, py + 5, cellSize - 10, Math.max(4, cellSize * 0.18));
        }

        ctx.restore();
    }

    drawMini(ctx, size = 70) {
        const { width, height } = this.getDimensions();
        const largestSide = Math.max(width, height);
        const cellSize = Math.floor((size - 12) / largestSide);
        const offsetX = Math.floor((size - width * cellSize) / 2);
        const offsetY = Math.floor((size - height * cellSize) / 2);

        ctx.clearRect(0, 0, size, size);
        this.draw(ctx, offsetX, offsetY, cellSize, 1);
    }
}

/**
 * Gestor de piezas del juego
 */
class PieceManager {
    constructor(batchSize = 3) {
        this.batchSize = batchSize;
        this.currentPieces = [];
        this.nextPieces = [];
        this.selectedPieceId = null;
    }

    createBatch() {
        return Array.from({ length: this.batchSize }, () => {
            const shapeKey = Piece.getRandomShape();
            return new Piece(shapeKey);
        });
    }

    startNewGame() {
        this.currentPieces = this.createBatch();
        this.nextPieces = this.createBatch();
        this.selectedPieceId = null;
    }

    getCurrentPieces() {
        return this.currentPieces;
    }

    getNextPieces() {
        return this.nextPieces;
    }

    getPieceById(id) {
        return this.currentPieces.find((piece) => piece.id === id) || null;
    }

    selectPiece(id) {
        this.selectedPieceId = id;
    }

    clearSelection() {
        this.selectedPieceId = null;
    }

    removePieceById(id) {
        this.currentPieces = this.currentPieces.filter((piece) => piece.id !== id);
        if (this.selectedPieceId === id) {
            this.selectedPieceId = null;
        }
    }

    refillIfNeeded() {
        if (this.currentPieces.length > 0) {
            return false;
        }

        this.currentPieces = this.nextPieces;
        this.nextPieces = this.createBatch();
        return true;
    }
}