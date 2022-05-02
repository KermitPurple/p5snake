class Grid{
    constructor(cellSize, loopableWalls = false){
        this.cellSize = cellSize;
        this.loopableWalls = loopableWalls;
        this.updateSize()
    }

    inBounds(point){
        return point.x >= 0 && point.y >= 0 && point.x < this.size.x && point.y < this.size.y;
    }

    getLooped(point){
        let result = point.copy();
        if(result.x < 0){
            result.x = this.size.x - 1;
        }else if(result.x >= this.size.x){
            result.x = 0;
        }
        if(result.y < 0){
            result.y = this.size.y - 1;
        }else if(result.y >= this.size.y){
            result.y = 0;
        }
        return result;
    }

    screenToBoardPos(point){
        return createVector(
            floor(point.x / this.cellSize),
            floor(point.y / this.cellSize),
        );
    }

    boardToScreenPos(point){
        return createVector(
            point.x * this.cellSize,
            point.y * this.cellSize,
        );
    }

    updateSize(){
        this.size = createVector(
            floor(windowWidth / this.cellSize),
            floor(windowHeight / this.cellSize),
        );
    }

    getCenter(){
        return createVector(
            floor(this.size.x / 2),
            floor(this.size.y / 2),
        );
    }
}
