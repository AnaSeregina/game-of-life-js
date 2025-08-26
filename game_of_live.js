// Anna Seregina: The Game Of Live

function getBanner(s) {
    return setYellowColor(s);
}

function setAliveSymbol(s) {
    return setYellowColor(s);
}

function setDeadSymbol(s) {
    return setBlueColor(s);
}

function colorize(s, newColor) {
    const resetColor = `\x1b[0m`; // reset to default color
    return `${newColor}${s} ${resetColor}`;
}

function setYellowColor(s) {
    return colorize(s, `\x1b[33m`); // ANSI escape code for yellow
}

function setBlueColor(s) {
    return colorize(s, `\x1b[36m`); // ANSI escape code for blue
}

function displayGenerationBanner(generation) {
    const banner = getBanner(`
        
     GAME OF LIFE SIMULATOR 

     ➤ Generation: ${generation}
     
     `);

    console.clear(); // clear console for a cleaner display
    console.log(banner);
}

function renderGrid(grid) {
    const alive = setAliveSymbol(`\u25A0`);// square symbol `${yellow}\u25A0 ${reset}`;
    const dead = setDeadSymbol(`.`);
    for (let i = 0; i < grid.length; i++) {
        let s = ``;
        for (let j = 0; j < grid[i].length; j++) {
            s = s.concat(` `, (grid[i][j] == 0) ? dead : alive);
        }
        console.log(s);
    }
    console.log(`\n`);
}

function getRandomNumber(cellsCount) {
    return Math.floor(Math.random() * (cellsCount)); // random index (0 to n*n - 1)
}

function getRowOfRandomElement(rowsCount, colsCount) {
    const cellsCount = rowsCount * colsCount;
    return Math.floor(getRandomNumber(cellsCount) / colsCount);
}

function getColumnOfRandomElement(rowsCount, colsCount) {
    const cellsCount = rowsCount * colsCount;
    return getRandomNumber(cellsCount) % colsCount;
}

function calculateAliveCellsCount(rowsCount, colsCount, probability) {
    const fillCellsPercent = (probability === undefined) ? 0.3 : probability; // 30% of filled cells
    return (rowsCount * colsCount) * fillCellsPercent;
}

function generateRandomLife(grid, probability) {
    const rowsCount = grid.length;
    const colsCount = grid[0].length;

    let aliveCellsCount = calculateAliveCellsCount(rowsCount, colsCount, probability);
    while (aliveCellsCount >= 0) {
        const row = getRowOfRandomElement(rowsCount, colsCount); // find a row of element based on random_number
        const col = getColumnOfRandomElement(rowsCount, colsCount); // find a column of element based on random_number
        grid[row][col] = 1; // set as alive cell
        aliveCellsCount--;
    }
}

function isGridEmpty(grid) {
    return (grid.length === 0);
}

function isExists(obj) {
    return (obj !== undefined);
}

function getNewCellValue(currentValue, neighboursCount) {
    return ((currentValue === 1 && (neighboursCount < 2 || neighboursCount > 3)) || (currentValue === 0 && neighboursCount === 3)) ? Number(!currentValue) : currentValue;
}

function makeEmptyGrid(rowsCount, colsCount) {
    let grid = [];
    for (let i = 0; i < rowsCount; i++) {
        grid.push(new Array(colsCount).fill(0));
    }
    return grid;
}

function getNeighboursCount(grid, i, j) {
    let result = 0;
    if (isExists(grid[i - 1])) {
        if (isExists(grid[i - 1][j - 1])) result += grid[i - 1][j - 1];
        if (isExists(grid[i - 1][j + 1])) result += grid[i - 1][j + 1];
        result += grid[i - 1][j];
    }
    if (isExists(grid[i + 1])) {
        if (isExists(grid[i + 1][j - 1])) result += grid[i + 1][j - 1];
        if (isExists(grid[i + 1][j + 1])) result += grid[i + 1][j + 1];
        result += grid[i + 1][j];
    }
    if (isExists(grid[i][j - 1])) result += grid[i][j - 1];
    if (isExists(grid[i][j + 1])) result += grid[i][j + 1];
    return result;
}

function makeNewGeneration(grid) {
    let result = makeEmptyGrid(grid.length, grid[0].length);// create a new empty grid of size as the old grid
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            const neighboursCount = getNeighboursCount(grid, i, j);
            result[i][j] = getNewCellValue(grid[i][j], neighboursCount);
        }
    }
    return result;
}

//________The_Game_Of_Live_starts_here________//
const rowsCount = 20;
const colsCount = 50;
let generation = 0;

let grid = makeEmptyGrid(rowsCount, colsCount);
displayGenerationBanner(generation);
generateRandomLife(grid); // starting position = random fill grid
renderGrid(grid); // print the grid

setInterval(function () {
    generation++;
    grid = makeNewGeneration(grid); // get a grid of new generation
    displayGenerationBanner(generation);
    renderGrid(grid); // print the grid
}, 1000);
