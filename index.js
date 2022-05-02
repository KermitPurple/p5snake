const CELL_SIZE = 64;
let grid;
let snake;
let fruit;
let score;
let imgs = {};
let paused = false;
let running = false;
let els = {
    'menu': document.querySelector('#menu'),
    'loopable': document.querySelector('#loopable-walls'),
};

// TODO pause menu

function preload(){
    imgs.head = loadImage('images/head.png');
    imgs.tail = loadImage('images/tail.png');
    imgs.left = loadImage('images/left.png');
    imgs.right = loadImage('images/right.png');
    imgs.straight = loadImage('images/straight.png');
    imgs.fruit = loadImage('images/fruit.png');
}

function setup(){
    let size = calcCanvasSize(CELL_SIZE);
    createCanvas(size.x, size.y);
    reset();
    angleMode(DEGREES);
    imageMode(CENTER);
    stroke(0);
    fill(0);
    frameRate(10);
    noLoop();
}

function windowResized(){
    let size = calcCanvasSize(CELL_SIZE);
    resizeCanvas(size.x, size.y);
    grid.updateSize();
}

function draw(){
    background(0);
    update();
    drawSnake();
    drawFruit();
    drawScore();
}

function calcCanvasSize(cellSize){
    return createVector(
        windowWidth - windowWidth % cellSize,
        windowHeight - windowHeight % cellSize,
    );
}

function update(){
    let nextHead = snake.getNextHead();
    let collideWithTail = snake.contains(nextHead);
    if((grid.inBounds(nextHead) || grid.loopableWalls) && !collideWithTail){
        snake.move(grid.getLooped(nextHead));
    }else{
        gameOver();
        return;
    }
    if(fruit.equals(snake.head)){
        newFruit();
        score += 1;
        snake.lengthToAdd += 2;
    }
}

function dirRot(direction){
    switch(direction){
        case Direction.UP: break;
        case Direction.DOWN: rotate(180); break;
        case Direction.LEFT: rotate(270); break;
        case Direction.RIGHT: rotate(90); break;
    }
}

function drawSnake(){
    let prev_direction = snake.direction;
    for(let i = 0; i < snake.points.length; i++){
        let p = grid.boardToScreenPos(snake.points[i]);
        let direction = snake.directions[i];
        push();
        translate(p.x + grid.cellSize / 2, p.y + grid.cellSize / 2);
        if(i === 0){
            dirRot(direction);
            image(imgs.head, 0, 0);
        }else if(i === snake.points.length - 1){
            dirRot(prev_direction);
            image(imgs.tail, 0, 0);
        }else if(prev_direction === direction){
            dirRot(direction);
            image(imgs.straight, 0, 0);
        }else if(direction === Direction.UP && prev_direction == Direction.LEFT){
            image(imgs.left, 0, 0);
        }else if(direction === Direction.LEFT && prev_direction == Direction.DOWN){
            rotate(270);
            image(imgs.left, 0, 0);
        }else if(direction === Direction.DOWN && prev_direction == Direction.RIGHT){
            rotate(180);
            image(imgs.left, 0, 0);
        }else if(direction === Direction.RIGHT && prev_direction == Direction.UP){
            rotate(90);
            image(imgs.left, 0, 0);
        }else{
            if(direction === Direction.RIGHT && prev_direction == Direction.DOWN) rotate(90);
            else if(direction === Direction.DOWN && prev_direction == Direction.LEFT) rotate(180);
            else if(direction === Direction.LEFT && prev_direction == Direction.UP) rotate(270);
            image(imgs.right, 0, 0);
        }
        pop();
        prev_direction = direction;
    }
}

function drawFruit(){
    let f = grid.boardToScreenPos(fruit);
    image(
        imgs.fruit,
        f.x + grid.cellSize / 2,
        f.y + grid.cellSize / 2,
    );
}

function drawScore(){
    fill(255);
    textSize(20);
    text(`Score: ${score}`, 5, 25);
}

function keyPressed(){
    switch(keyCode){
        case 65: // a
        case 72: // h
        case LEFT_ARROW:
            snake.queueDirection(Direction.LEFT);
            break;
        case 87: // w
        case 75: // k
        case UP_ARROW:
            snake.queueDirection(Direction.UP);
            break;
        case 83: //s
        case 74: // j
        case DOWN_ARROW:
            snake.queueDirection(Direction.DOWN);
            break;
        case 68: // d
        case 76: // l
        case RIGHT_ARROW:
            snake.queueDirection(Direction.RIGHT);
            break;
        case 80:
            pause();
            break;
    };
}

function newFruit(){
    let avaliable = [];
    for(let x = 0; x < grid.size.x; x++){
        for(let y = 0; y < grid.size.y; y++){
            let pos = createVector(x, y);
            if(!snake.contains(pos))
                avaliable.push(pos);
        }
    }
    fruit = random(avaliable);
}

function play(){
    if(!running){
        running = true;
        reset();
        loop();
        els.menu.classList.add('hidden');
    }else{
        pause();
    }
}

function pause(){
    if(!running) return;
    paused = !paused;
    if(paused){
        noLoop();
        els.menu.classList.remove('hidden');
    }else{
        loop();
        els.menu.classList.add('hidden');
    }
};

function gameOver(){
    running = false;
    noLoop();
    els.menu.classList.remove('hidden');
}

function reset(){
    grid = new Grid(CELL_SIZE, els.loopable.checked);
    snake = new Snake(grid.getCenter())
    newFruit();
    score = 0;
}
