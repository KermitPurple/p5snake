class Snake{
    constructor(head, lengthToAdd = 3, direction = Direction.UP){
        this.points = [head];
        this.lengthToAdd = 3;
        this._direction = direction;
        this.directions = [direction];
        this.input_buffer = [];
    }

    getNextHead(){
        if(this.input_buffer.length !== 0)
            this.direction = this.input_buffer.shift();
        return this.direction.toVector().add(this.head);
    }

    get head(){
        return this.points[0];
    }

    contains(point){
        for(let p of this.points)
            if(p.equals(point)) return true;
        return false;
    }

    move(newHead){
        this.points.unshift(newHead);
        this.directions.unshift(this.direction);
        if(this.lengthToAdd === 0){
            this.points.pop();
            this.directions.pop();
        }else{
            this.lengthToAdd--;
        }
    }

    get direction(){
        return this._direction
    }

    set direction(direction){
        if(direction !== this.direction.opposite())
            this._direction = direction;
    }

    queueDirection(direction){
        this.input_buffer.push(direction);
    }
}
