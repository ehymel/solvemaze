class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.walls = [true, true, true, true];  // top, right, bottom, left
        this.visited = false;
        this.wallStrokeWeight = 2    }

    show() {
        if (!this.visited) {
            return;
        }

        let i = this.i * w;
        let j = this.j * h;
        let offset = 0;
        stroke(0);
        strokeWeight(this.wallStrokeWeight);

        if (this.walls[0]) {
            line(i + offset   , j + offset,     i + w - offset, j + offset);
        }
        if (this.walls[1]) {
            line(i + w - offset, j + offset,     i + w - offset, j + h - offset);
        }
        if (this.walls[2]) {
            line(i + w - offset, j + h - offset, i + offset   , j + h - offset);
        }
        if (this.walls[3]) {
            line(i + offset   , j + h - offset, i + offset   , j + offset);
        }

        noStroke();
        fill(255, 0, 255, 80);
        fill(255);
        rect(this.i * w + this.wallStrokeWeight /2, this.j * h + this.wallStrokeWeight/2, w - this.wallStrokeWeight, h - this.wallStrokeWeight);
    }

    highlight() {
        noStroke();
        fill(0, 255, 0, 80);
        rect(this.i * w + this.wallStrokeWeight /2, this.j * h + this.wallStrokeWeight/2, w - this.wallStrokeWeight, h - this.wallStrokeWeight);
    }

    getUnvisitedNeighbor() {
        let top, right, bottom, left;

        let i = this.i;
        let j = this.j;
        let neighbors = [];

        if (j > 0) {
            top = grid[i][j-1];
        }
        if (i < cols-1) {
            right = grid[i+1][j];
        }
        if (j < cols-1) {
            bottom = grid[i][j+1];
        }
        if (i > 0) {
            left = grid[i-1][j];
        }

        for (let nbr of [top, right, bottom, left]) {
            if (nbr && !nbr.visited) {
                neighbors.push(nbr);
            }
        }

        if (neighbors.length > 0) {
            return random(neighbors);
        } else {
            return undefined;
        }
    }

    removeWalls(neighbor) {
        let x = this.i - neighbor.i;
        let y = this.j - neighbor.j;

        if (x === 1) {
            // neighbor is to the left
            this.walls[3] = false;
            neighbor.walls[1] = false;
        } else if (x === -1) {
            // neighbor is to the right
            this.walls[1] = false;
            neighbor.walls[3] = false;
        } else if (y === 1) {
            // neighbor is to the top
            this.walls[0] = false;
            neighbor.walls[2] = false;
        } else if (y === -1) {
            // neighbor is to the bottom
            this.walls[2] = false;
            neighbor.walls[0] = false;
        }
    }
}
