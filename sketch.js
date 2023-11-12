let cols = 30;
let rows = 30;
let grid = [];
let start, end;
let w, h;
let maze;

function setup() {
    createCanvas(400, 400);

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

    maze = new Maze(start);
}

function draw() {
    background(255);

    markStartEnd();

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show();
        }
    }

    if (!maze.complete) {
        maze.generate();
        maze.current.highlight();
    }
}

function markStartEnd() {
    start.walls[3] = false;
    end.walls[1] = false;
}