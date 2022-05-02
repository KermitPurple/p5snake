class Grid{
    constructor(size, cellSize, loopableWalls = false){
        this.size = size;
        this.cellSize = cellSize;
        this.loopableWalls = loopableWalls;
    }

    inBounds(point){
        return point.x >= 0 && point.y >= 0 && point.x < size.x && point.y < size.y;
    }

    screenToBoardPos(point){
        return createVector(
            Math.floor(point.x / this.cellSize),
            Math.floor(point.y / this.cellSize),
        );
    }

    boardToScreenPos(point){
        return createVector(
            point.x * this.cellSize,
            point.y * this.cellSize,
        );
    }
}
