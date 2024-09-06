const symbols = ["♢", "♡", "♠", "♣"];
let rowCount = 7;
let colCount = 7;

const gameContainer = document.getElementById("game-container");
const resizeButton = document.getElementById("resize-button");
const widthInput = document.getElementById("width-input");
const heightInput = document.getElementById("height-input");
const warning = document.getElementById("warning");

let board = createNewRandomBoard(rowCount, colCount);

function createNewRandomBoard(rows, cols) {
    const board = [];
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
            const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
            row.push(randomSymbol);
        }
        board.push(row);
    }
    return board;
}

function renderBoard() {
    gameContainer.innerHTML = "";
    gameContainer.style.gridTemplateColumns = `repeat(${colCount}, 50px)`;

    for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = board[r][c] || "";

            cell.addEventListener("click", () => removeGroup(r, c));

            cell.addEventListener("mouseenter", () => highlightGroup(r, c, true));
            cell.addEventListener("mouseleave", () => highlightGroup(r, c, false));

            gameContainer.appendChild(cell);
        }
    }
}

function removeGroup(row, col) {
    const group = getMatchingIcons(row, col);
    group.forEach(([r, c]) => {
        board[r][c] = null;
    });
    renderBoard();
}

function getMatchingIcons(row, col) {
    const targetSymbol = board[row][col]; //this is the symbol we need to look for
    if (!targetSymbol) return [];

    const unvisitedCellsCoords = [[row, col]]; // here I save the coordinates of the cells that need to be checked
    const connectedCellsGroupCoords = []; // here I will store the coordinates of all the attached adjacent icons
    const visitedCells = []; //here I store an array of visited cells to avoid re-checking (initially is empty)

    for (let i = 0; i < rowCount; i++) {
        visitedCells[i] = Array(colCount).fill(false); // here I fill this array with values, adding a fels flag to each one, marking it as unvisited before it is visited
    }

    while (unvisitedCellsCoords.length > 0) {
        const [currentRow, currentCol] = unvisitedCellsCoords.pop();

        if (
            board[currentRow][currentCol] !== targetSymbol ||
            visitedCells[currentRow][currentCol]
        )
            continue;

        connectedCellsGroupCoords.push([currentRow, currentCol]); // current cell is added to the group of connected cells
        visitedCells[currentRow][currentCol] = true; // mark the cell as visited

        const directions = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ]; // this is an array of directions to check neighboring cells

        for (let [dx, dy] of directions) {
            const newRow = currentRow + dx;
            const newCol = currentCol + dy;
            // for each direction calculate coordinates of the neighboring cell

            if (
                newRow >= 0 &&
                newRow < rowCount &&
                newCol >= 0 &&
                newCol < colCount &&
                board[newRow][newCol] === targetSymbol &&
                !visitedCells[newRow][newCol]
                // check if the neighbor cell is within the board and if its symbol matches the symbol we are looking for, also check if this cell has already been visited
            ) {
                unvisitedCellsCoords.push([newRow, newCol]); //if all conditions are ok, the coordinates of the neighbor cell are added to the stack for checking
            }
        }
    }
    // when unvisitedCellsCoords becomes empty, it means that all matching cells have been found
    return connectedCellsGroupCoords;
}

function highlightGroup(row, col, highlight) {
    const group = getMatchingIcons(row, col);
    group.forEach(([r, c]) => {
        const cell = gameContainer.children[r * colCount + c];
        if (highlight) {
            cell.classList.add("group-hover");
        } else {
            cell.classList.remove("group-hover");
        }
    });
}

function mixingBoard() {
    try {
        board = createNewRandomBoard(rowCount, colCount);
        renderBoard();
    } catch (error) {
        console.error("Error mixing board:", error);
    }
}

function validateInput(input) {
    const value = parseInt(input.value, 10);
    if (isNaN(value) || value <= 0 || value > 25) {
        warning.classList.add("error");
        return false;
    } else {
        warning.classList.remove("error");
        return true;
    }
}

function checkInputsValidity() {
    const isValid = validateInput(widthInput) && validateInput(heightInput);

    resizeButton.disabled = !isValid;
}

function resizeBoard() {
    if (!validateInput(widthInput) || !validateInput(heightInput)) {
        return;
    }

    colCount = Math.max(1, parseInt(widthInput.value, 10));
    rowCount = Math.max(1, parseInt(heightInput.value, 10));

    board = createNewRandomBoard(rowCount, colCount);
    renderBoard();
}

widthInput.addEventListener("input", checkInputsValidity);
heightInput.addEventListener("input", checkInputsValidity);
resizeButton.addEventListener("click", resizeBoard);

renderBoard();
