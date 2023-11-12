class Maze {
    constructor(current) {
        this.current = current;
        this.stack = []
    }

    generate() {
        this.current.visited = true;

        let next = this.current.getUnvisitedNeighbor();
        if (next) {
            next.visited = true;
            this.stack.push(this.current);
            this.current.removeWalls(next);
            this.current = next;
        } else if (this.stack.length > 0) {
            this.current = this.stack.pop();
        }
    }
}
