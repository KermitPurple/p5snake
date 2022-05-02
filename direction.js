class  Direction{
    static UP = new Direction('up');
    static DOWN = new Direction('down');
    static LEFT = new Direction('left');
    static RIGHT = new Direction('right');

    constructor(name){
        this.name = name;
    }

    toVector(){
        switch(this.direction){
            case this.UP: return createVector(0, -1);
            case this.DOWN: return createVector(0, 1);
            case this.LEFT: return createVector(-1, 0);
            case this.RIGHT: return createVector(1, 0);
            default: return null;
        };
    }

    opposite(){
        switch(this.direction){
            case this.UP: return this.DOWN;
            case this.DOWN: return this.UP;
            case this.LEFT: return this.RIGHT;
            case this.RIGHT: return this.LEFT;
            default: return null;
        };
    }
}
