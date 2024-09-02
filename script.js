function  Gameboard() {
    const ROWS = 3;
    const COLS = 3;
    const EMPTY = "E";

    const board = [];
    for (let i = 0; i < ROWS; i++ ) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            board[i].push(EMPTY);
        }
    }

    const printBoard = ()=> {
        console.log(board);
    }

    const placeToken = (x, y, playerToken) => {
        if (board[x][y] != EMPTY) {
            console.log("Invalid move!");
        }
        else {
            board[x][y] = playerToken;
        }
    }
    return {printBoard, placeToken};
}

function GameController() {
}

let game = Gameboard();