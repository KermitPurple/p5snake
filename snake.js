class Snake{
    constructor(head, lengthToAdd = 3, direction = Direction.UP){
        this.points = [head];
        this.lengthToAdd = 3;
        this.direction = direction;
    }

    getNextHead(){
        return this.direction.toVector().add(this.points[0]);
    }

    move(){
        let newHead = this.getNextHead();
        this.points.unshift(newHead);
        if(this.lengthToAdd === 0){
            this.points.pop();
        }else{
            this.lengthToAdd--;
        }
    }
}
