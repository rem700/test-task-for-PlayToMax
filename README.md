# test-task-for-PlayToMax
Depth-First Search (DFS) is used here

In the comments to the code I have described my steps for implementation

For example, we click on a cell that has a symbol "♢", this (the cell becomes the variable "targetSymbol") and there are adjacent cells on the board with the same symbol. 
The function will start with this cell, then check its neighbors, add matching neighbors to "connectedCellsGroupCoords", mark them as visited "visitedCells" 
and continue this way with all matching neighbors by symbol until all connected cells with the symbol "♢" are found. After the function completes, 
"connectedCellsGroupCoords" will contain the coordinates of all cells with the symbol "♢" that are connected to each other.

## How to start a project

1. Clone the repository:
    ```
    git clone https://github.com/rem700/test-task-for-PlayToMax
    ```
2. Navigate to your project folder
    
3. Open `index.html` in your browser.
