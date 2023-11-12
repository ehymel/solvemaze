class Astar {
    constructor() {
        this.openSet = [];      // array of nodes to be evaluated for next step in search
        this.closedSet = [];    // array of nodes already evaluated along the way
        this.totalPath = [];    // found path from start node to current node during search
        this.lastGoodPath = [];
    }

    findPath(start, goal) {
        if (this.openSet.length === 0 && !this.closedSet.includes(start)) {
            this.openSet.push(start);
        }
        let diagonalDistance = sqrt(2);
        let d;

        if (this.openSet.length > 0) {
            this.lastGoodPath = this.totalPath;
            this.totalPath = [];
            let indexOfLowestFScore = 0;
            for (let i = 0; i < this.openSet.length; i++) {
                if (this.openSet[i].f < this.openSet[indexOfLowestFScore].f) {
                    indexOfLowestFScore = i;
                }
            }

            let current = this.openSet[indexOfLowestFScore];

            if (current === goal) {
                console.log('success!');
            } else {
                this.removeFromArray(this.openSet, current);
                this.closedSet.push(current);

                for (let i = 0; i < current.neighbors.length; i++) {
                    let neighbor = current.neighbors[i];
                    if (this.closedSet.includes(neighbor) || neighbor.blocked) {
                        continue;
                    }

                    d = (current.i === neighbor.i || current.j === neighbor.j) ? 1 : diagonalDistance;
                    let tempG = current.g + d; // assumes distance from one node to the next is 1

                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.cameFrom = current;
                    }

                    if (!this.openSet.includes(neighbor)) {
                        this.openSet.push(neighbor);
                    }
                }
            }
            this.totalPath = this.reconstructPath(current);
        } else {
            console.log('No solution');
            this.totalPath = this.lastGoodPath;
        }
    }

    reconstructPath(currentNode) {
        let path = [];
        path.push(currentNode);
        while (currentNode.cameFrom !== undefined) {
            currentNode = currentNode.cameFrom;
            path.push(currentNode);
        }
        return path;
    }

    removeFromArray(arr, el) {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (el === arr[i]) {
                arr.splice(i, 1);
            }
        }
    }
}