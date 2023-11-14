let cols = 120;
let rows = 80;
let grid = [];
let start, end;
let w, h;
let maze, astar;

function setup() {
    createCanvas(600, 400);

    w = width / cols;
    h = height / rows;

    // define grid
    for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
    }

    // fill grid with nodes
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = new Node(i, j);
        }
    }

    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    // set heuristic for each node on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
            grid[i][j].setHeuristic(end);
        }
    }

    start.g = 0;
    start.f = start.h;

    maze = new Maze(start);
    astar = new Astar(start, end);

    // startSearchButton = createButton('Start search');
    // startSearchButton.position(50, 25);
    // startSearchButton.mouseClicked(startSearch);
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(255);
        }
    }

    if (!maze.complete) {
        // create maze

        markStartEnd();

        maze.generate();
        maze.current.highlight();
    } else {
        // solve maze
        markStartEnd();

        start.show(color(0, 255, 0));
        end.show(color(255, 0, 0));

        astar.findPath(start, end);

        noFill();
        stroke('orange');
        strokeWeight(h/3);
        beginShape();
        for (let i = 0; i < astar.totalPath.length; i++) {
            let path = astar.totalPath[i];
            vertex(path.i * w + w/2, path.j * h + h/2);
        }
        endShape();
    }
}

function markStartEnd() {
    start.walls[3] = false;
    end.walls[1] = false;
}