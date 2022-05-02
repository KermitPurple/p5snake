class  Direction{
    static UP = new Direction('up');
    static DOWN = new Direction('down');
    static LEFT = new Direction('left');
    static RIGHT = new Direction('right');

    constructor(name){
        this.name = name;
    }

    toVector(){
        switch(this){
            case Direction.UP: return createVector(0, -1);
            case Direction.DOWN: return createVector(0, 1);
            case Direction.LEFT: return createVector(-1, 0);
            case Direction.RIGHT: return createVector(1, 0);
            default: return null;
        };
    }

    opposite(){
        switch(this){
            case Direction.UP: return Direction.DOWN;
            case Direction.DOWN: return Direction.UP;
            case Direction.LEFT: return Direction.RIGHT;
            case Direction.RIGHT: return Direction.LEFT;
            default: return null;
        };
    }
}
