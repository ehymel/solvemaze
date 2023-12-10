let cols = 60;
let rows = 40;
let grid = [];
let start, end;
let w, h;
let maze, astar;
let search = false;
let n256 = 256;
let mult = 64;

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
        maze.current.highlight(color(0, 255, 0, 80));
    } else {
        if (search) {
            astar.findPath(start, end);

            showSearch();

            start.show(color(0, 255, 0));
            end.show(color(255, 0, 0));
        }
    }
}

function initializeSearch() {
    // set start and end nodes
    // start = grid[0][0];
    // end = grid[cols - 1][rows - 1];

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
    for (let i = 0; i < astar.closedSet.length; i++) {
        astar.closedSet[i].highlight(color(150, 150, 150, 100), true);
    }

    noFill();
    this.setMultiplier(astar.totalPath.length - 1);
    for (let i = astar.totalPath.length - 1; i > 0; i--) {
        astar.totalPath[i].highlight(this.getColor(i), false);
    }

    // beginShape();
    // for (let i = 0; i < astar.totalPath.length; i++) {
    //     let path = astar.totalPath[i];
    //     vertex(path.i * w + w/2, path.j * h + h/2);
    // }
    // endShape();
}

function setMultiplier(len) {
    while (floor((mult * len) / n256) > 2) {
        mult = mult / 2;
    }
}

function getColor(i) {
    let red, green, blue;
    let high = n256;
    let highFraction = (mult * i) / high;

    if (floor(highFraction) === 0) {
        red = (mult * i) % high;
        green = 0;
        blue = 0;
    } else if (floor(highFraction) === 1) {
        red = 255;
        green = (mult * i) % high;
        blue = 0;
    } else {
        red = 255;
        green = 255;
        blue =  (mult * i) % high;
    }

    return color(red, green, blue);
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