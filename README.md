# Game of Life — JavaScript (Console)
A simple, colorful **console** implementation of Conway’s Game of Life written in plain JavaScript.  
Cells are printed in the terminal using Unicode squares and ANSI colors.


## Demo (console)
Alive cells: ■ (yellow) · Dead cells: . (blue)


## How it works
- Grid is a 2D array of `0` (dead) and `1` (alive)
- Standard Conway rules:
  - A live cell with **fewer than 2** or **more than 3** neighbors dies
  - A dead cell with **exactly 3** neighbors becomes alive
- Neighbors are counted in the 8 surrounding cells (no wraparound at edges)


## Requirements
- [Node.js](https://nodejs.org/) (any modern LTS version)


## Run
1. Clone or download this repo.
2. Put your single JS file (e.g., `game_of_life.js`) in the root of the repo.
3. In the project folder, run:
   ```bash
   node game_of_life.js


## Configuration
Open the file and tweak these constants near the bottom:
const rowsCount = 20;   // grid height
const colsCount = 50;   // grid width
// setInterval(..., 1000);  // simulation speed (ms per generation)


## Random fill density
By default, the grid is seeded with ~30% live cells.
To adjust, pass a probability (0.0–1.0) to generateRandomLife:
generateRandomLife(grid, 0.25); // 25% alive at start


## Symbols & colors
	•	Alive symbol: ■ (yellow) — set in setAliveSymbol / setYellowColor
	•	Dead symbol: . (blue) — set in setDeadSymbol / setBlueColor
	•	Colors use ANSI escape codes. Most modern terminals (macOS Terminal, iTerm2, Windows Terminal, VS Code integrated terminal) support them.
	•	If your terminal shows strange characters, you can remove color by changing colorize to just return s;.


## File structure
This project is a single file: game_of_life.js


## Key functions:
	•	makeEmptyGrid(rows, cols) — creates a zeroed grid
	•	generateRandomLife(grid, probability) — seeds random live cells
	•	getNeighboursCount(grid, i, j) — counts 8-neighborhood
	•	getNewCellValue(current, neighbours) — applies Conway rules
	•	makeNewGeneration(grid) — builds next generation
	•	renderGrid(grid) — prints the grid with symbols/colors

## Known limitations / ideas
	•	No wraparound (toroidal) edges — could be added as an option
	•	No preset patterns (gliders, pulsars) — add helpers to seed patterns
	•	Add keyboard controls (start/stop/speed) via Node readline
	•	Export to file or render a fixed number of generations

## License
This project has no license. All rights reserved.


## Author
Anna Seregina

