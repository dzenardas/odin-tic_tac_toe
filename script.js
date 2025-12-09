const statusDisplay = document.getElementById("gameStatus");

const gameBoard = {
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    currentPlayer: "X",
    isGameOver: false,
    playerNames: { X: "Player X", O: "Player O" }
};

function printBoard() {
    console.log("Current board:");
    
    let boardString = "";
    for (let row = 0; row < 3; row++) {
        boardString += gameBoard.board[row].map(cell => cell || " ").join(" | ") + "\n";
        if (row < 2) {
            boardString += "---------\n";
        }
    }
    
    console.log(boardString);
}

function handleCellChoice(row, col) {
    if (gameBoard.isGameOver) {
        alert("Game is over! Reset the game to play again.");
        return;
    }

    if (gameBoard.board[row][col] !== "") {
        alert("This cell is already taken.");
        return;
    }

    makeMove(row, col);
    domRenderer.render(gameBoard.board);
    updateStatus();
}

function checkWin() {
    const board = gameBoard.board;
    const currentPlayer = gameBoard.currentPlayer;

    for (let row = 0; row < 3; row++) {
        if (
            board[row][0] === currentPlayer &&
            board[row][1] === currentPlayer &&
            board[row][2] === currentPlayer
        ) {
            return [[row,0],[row,1],[row,2]];
        }
    }

    for (let col = 0; col < 3; col++) {
        if (
            board[0][col] === currentPlayer &&
            board[1][col] === currentPlayer &&
            board[2][col] === currentPlayer
        ) {
            return [[0,col],[1,col],[2,col]];
        }
    }

    if (
        board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer
    ) {
        return [[0,0],[1,1],[2,2]];
    }

    if (
        board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer
    ) {
        return [[0,2],[1,1],[2,0]];
    }

    return null;
}

function checkTie() {
    return gameBoard.board.flat().every(cell => cell !== "");
}

function makeMove(row, col) {
    if (gameBoard.isGameOver) {
        return;
    }

    if (gameBoard.board[row][col] !== "") {
        return;
    }

    gameBoard.board[row][col] = gameBoard.currentPlayer;
    printBoard();

    const winningCells = checkWin();

    if (winningCells) {
        statusDisplay.textContent = `${gameBoard.playerNames[gameBoard.currentPlayer]} wins!`;
        gameBoard.isGameOver = true;

        domRenderer.render(gameBoard.board);

        setTimeout(() => {
            winningCells.forEach(([r, c]) => {
                const index = r * 3 + c;
                domRenderer.container.children[index].classList.add("win-cell");
            });
        }, 10);
        
        return;
    }

    if (checkTie()) {
        statusDisplay.textContent = "It's a tie!";
        gameBoard.isGameOver = true;
        domRenderer.render(gameBoard.board);
        return;
    }

    gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";
    domRenderer.render(gameBoard.board);
    updateStatus();
}

function resetGame() {
    gameBoard.board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    gameBoard.currentPlayer = "X";
    gameBoard.isGameOver = false;
    console.log("Game reset!");
    printBoard();
    updateStatus();
    domRenderer.render(gameBoard.board);
}

function updateStatus() {
    if (!gameBoard.isGameOver) {
        statusDisplay.textContent = `${gameBoard.playerNames[gameBoard.currentPlayer]}'s turn (${gameBoard.currentPlayer})`;
    }
}

const domRenderer = {
    container: document.getElementById("gameContainer"),
    render(board) {
        this.container.innerHTML = "";

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");

                cellDiv.textContent = board[row][col] || ""; 

                cellDiv.addEventListener("click", function(){
                    handleCellChoice(row, col)
                });

                this.container.appendChild(cellDiv);
            }
        }
    }
};

document.getElementById("reset-button").addEventListener("click", function() {
    resetGame();
    domRenderer.render(gameBoard.board); 
});

document.getElementById("start-button").addEventListener("click", function() {
    const playerXName = document.getElementById("playerX").value.trim();
    const playerOName = document.getElementById("playerO").value.trim();

    gameBoard.playerNames.X = playerXName || "Player X";
    gameBoard.playerNames.O = playerOName || "Player O";
    gameBoard.currentPlayer = "X";
    gameBoard.isGameOver = false;

    resetGame();
    domRenderer.render(gameBoard.board);
});

resetGame();