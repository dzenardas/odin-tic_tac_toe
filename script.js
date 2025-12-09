const gameBoard = {
    board: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ],
    currentPlayer: "X",
    isGameOver: false
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

function checkWin() {
    const board = gameBoard.board;
    const currentPlayer = gameBoard.currentPlayer;

    for (let row = 0; row < 3; row++) {
        if (
            board[row][0] === currentPlayer &&
            board[row][1] === currentPlayer &&
            board[row][2] === currentPlayer
        ) {
            return true;
        }
    }

    for (let col = 0; col < 3; col++) {
        if (
            board[0][col] === currentPlayer &&
            board[1][col] === currentPlayer &&
            board[2][col] === currentPlayer
        ) {
            return true;
        }
    }

    if (
        board[0][0] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][2] === currentPlayer
    ) {
        return true;
    }

    if (
        board[0][2] === currentPlayer &&
        board[1][1] === currentPlayer &&
        board[2][0] === currentPlayer
    ) {
        return true;
    }

    return false;
}

function checkTie() {
    return gameBoard.board.flat().every(cell => cell !== "");
}

function makeMove(row, col) {
    if (gameBoard.isGameOver) {
        console.log("Game is over! Start a new game.");
        return;
    }

    if (gameBoard.board[row][col] !== "") {
        console.log("Cell is already taken!");
        return;
    }

    gameBoard.board[row][col] = gameBoard.currentPlayer;
    printBoard();

    if (checkWin()) {
        console.log(`Player ${gameBoard.currentPlayer} wins!`);
        gameBoard.isGameOver = true;
        return;
    }

    if (checkTie()) {
        console.log("It's a tie!");
        gameBoard.isGameOver = true;
        return;
    }

    gameBoard.currentPlayer = gameBoard.currentPlayer === "X" ? "O" : "X";
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
}

resetGame();
makeMove(0, 0); // X
makeMove(1, 1); // O
makeMove(0, 1); // X
makeMove(2, 2); // O
makeMove(0, 2); // X wins!