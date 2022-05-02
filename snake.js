class Snake{
    constructor(head, lengthToAdd = 3, direction = Direction.UP){
        this.points = [head];
        this.lengthToAdd = 3;
        this.direction = direction;
        this.directions = [this.direction];
        this.input_buffer
    }

    getNextHead(){
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

    setDirection(direction){
        if(direction !== this.direction.opposite())
            this.direction = direction;
    }
}
