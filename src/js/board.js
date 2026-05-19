class Board {
    constructor(width = 8, height = 8, cellSize = 64) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;

        this.matrix = Array.from({ length: height }, () => Array(width).fill(0));
        this.colorMatrix = Array.from({ length: height }, () => Array(width).fill(null));

        this.gridColor = '#00D9FF';
        this.emptyColor = '#0f0f1e';

        this.lastClearedCells = [];
        this.clearAnimation = 0;
    }

    reset() {
        this.matrix = Array.from({ length: this.height }, () => Array(this.width).fill(0));
        this.colorMatrix = Array.from({ length: this.height }, () => Array(this.width).fill(null));
        this.lastClearedCells = [];
        this.clearAnimation = 0;
    }

    isInside(x, y) {
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    canPlacePiece(piece, x, y) {
        const blocks = piece.getBlocks();

        for (const block of blocks) {
            const boardX = x + block.x;
            const boardY = y + block.y;

            if (!this.isInside(boardX, boardY)) {
                return false;
            }

            if (this.matrix[boardY][boardX] !== 0) {
                return false;
            }
        }

        return true;
    }

    placePiece(piece, x, y) {
        if (!this.canPlacePiece(piece, x, y)) {
            return false;
        }

        for (const block of piece.getBlocks()) {
            const boardX = x + block.x;
            const boardY = y + block.y;
            this.matrix[boardY][boardX] = 1;
            this.colorMatrix[boardY][boardX] = piece.color;
        }

        return true;
    }

    getCompleteLines() {
        const rows = [];
        const cols = [];

        for (let y = 0; y < this.height; y++) {
            if (this.matrix[y].every((cell) => cell === 1)) {
                rows.push(y);
            }
        }

        for (let x = 0; x < this.width; x++) {
            let isFull = true;
            for (let y = 0; y < this.height; y++) {
                if (this.matrix[y][x] === 0) {
                    isFull = false;
                    break;
                }
            }
            if (isFull) {
                cols.push(x);
            }
        }

        return { rows, cols };
    }

    clearLines() {
        const { rows, cols } = this.getCompleteLines();
        const cellsMap = new Map();

        for (const row of rows) {
            for (let x = 0; x < this.width; x++) {
                cellsMap.set(`${x},${row}`, { x, y: row });
            }
        }

        for (const col of cols) {
            for (let y = 0; y < this.height; y++) {
                cellsMap.set(`${col},${y}`, { x: col, y });
            }
        }

        const cells = Array.from(cellsMap.values());

        if (cells.length === 0) {
            return { count: 0, rows: [], cols: [] };
        }

        for (const cell of cells) {
            this.matrix[cell.y][cell.x] = 0;
            this.colorMatrix[cell.y][cell.x] = null;
        }

        this.lastClearedCells = cells;
        this.clearAnimation = 1;

        return {
            count: rows.length + cols.length,
            rows,
            cols
        };
    }

    hasAvailableMoves(pieces) {
        if (!pieces || pieces.length === 0) {
            return false;
        }

        for (const piece of pieces) {
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    if (this.canPlacePiece(piece, x, y)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    draw(ctx, offsetX = 0, offsetY = 0) {
        ctx.fillStyle = this.emptyColor;
        ctx.fillRect(offsetX, offsetY, this.width * this.cellSize, this.height * this.cellSize);

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const px = offsetX + x * this.cellSize;
                const py = offsetY + y * this.cellSize;

                ctx.strokeStyle = this.gridColor;
                ctx.lineWidth = 1;
                ctx.strokeRect(px + 0.5, py + 0.5, this.cellSize - 1, this.cellSize - 1);

                if (this.matrix[y][x] === 1) {
                    const color = this.colorMatrix[y][x] || '#FF006E';

                    ctx.fillStyle = color;
                    ctx.fillRect(px + 2, py + 2, this.cellSize - 4, this.cellSize - 4);

                    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
                    ctx.strokeRect(px + 4, py + 4, this.cellSize - 8, this.cellSize - 8);
                }
            }
        }

        if (this.clearAnimation > 0 && this.lastClearedCells.length > 0) {
            ctx.save();
            ctx.globalAlpha = this.clearAnimation * 0.45;
            ctx.fillStyle = '#FFFFFF';

            for (const cell of this.lastClearedCells) {
                const px = offsetX + cell.x * this.cellSize;
                const py = offsetY + cell.y * this.cellSize;
                ctx.fillRect(px + 3, py + 3, this.cellSize - 6, this.cellSize - 6);
            }

            ctx.restore();
            this.clearAnimation = Math.max(0, this.clearAnimation - 0.08);
        }
    }

    drawGhost(ctx, piece, boardX, boardY, offsetX = 0, offsetY = 0, isValid = true) {
        const pixelX = offsetX + boardX * this.cellSize;
        const pixelY = offsetY + boardY * this.cellSize;

        piece.draw(ctx, pixelX, pixelY, this.cellSize, 0.38);

        ctx.save();
        ctx.strokeStyle = isValid ? '#00FF41' : '#FF006E';
        ctx.lineWidth = 2;

        for (const block of piece.getBlocks()) {
            const x = pixelX + block.x * this.cellSize;
            const y = pixelY + block.y * this.cellSize;
            ctx.strokeRect(x + 3, y + 3, this.cellSize - 6, this.cellSize - 6);
        }

        ctx.restore();
    }
}