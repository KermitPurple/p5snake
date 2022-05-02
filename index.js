const CELL_SIZE = 64;

function setup(){
    let size = calcCanvasSize(CELL_SIZE);
    createCanvas(size.x, size.y);
}

function windowResized(){
    let size = calcCanvasSize(CELL_SIZE);
    resizeCanvas(size.x, size.y);
}

function draw(){
    background(0);
}

function calcCanvasSize(cellSize){
    return createVector(
        windowWidth - windowWidth % cellSize,
        windowHeight - windowHeight % cellSize,
    );
}

function calcBoardSize(cellSize){
    return createVector(
        Math.floor(windowWidth / cellSize),
        Math.floor(windowHeight / cellSize),
    );
}
