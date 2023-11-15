let cols = 120;
let rows = 80;
let grid = [];
let start, end;
let w, h;
let maze, astar;
let search = false;

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

    maze = new Maze(grid[floor(random(cols))][floor(random(rows))]);
    astar = new Astar();

    startSearchButton = createButton('Start search');
    startSearchButton.position(50, 25);
    startSearchButton.mouseClicked(startSearch);
}

function draw() {
    background(255);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].show(255);
        }
    }

    if (!maze.complete) {
        maze.generate();
        maze.current.highlight();
    } else {
        if (search) {
            start.show(color(0, 255, 0));
            end.show(color(255, 0, 0));

            astar.findPath(start, end);

            showSearch();
        }
    }
}

function initializeSearch() {
    // set start and end nodes
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];

    start = grid[floor(random(cols))][floor(random(rows))];
    end = grid[floor(random(cols))][floor(random(rows))];

    // set heuristic for each node on grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].addNeighbors(grid);
            grid[i][j].setHeuristic(end);
        }
    }

    start.g = 0;
    start.f = start.h;

    astar = new Astar();
}

function showSearch() {
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

function startSearch() {
    resetNodes();
    initializeSearch();

    search = true;
}

function resetNodes() {
    // since grid is passed to addNeighbors function,
    // reset all nodes, then separately add neighbors
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].cameFrom = undefined;
            grid[i][j].f = 999999999;
            grid[i][j].g = 999999999;
        }
    }
}