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

    const getBoard = () => board;

    const placeToken = (row, col, playerToken) => {
        if (board[row][col] != EMPTY) {
            return false;
        }
        else {
            board[row][col] = playerToken;
            return true;
        }
    }
    return {printBoard, getBoard, placeToken};
}

function Player(name, token) {
    return {name, token};
}


function GameController(playerOneName="PlayerOne",
    playerTwoName="Computer") {
    
    const board = Gameboard();
    let playerOne = Player(playerOneName, "X");
    let playerTwo = Player(playerTwoName, "O");

    const printNewRound = (player) => {
        board.printBoard();
        console.log(`${player.name}'s turn`)
    }

    const checkWinner = () => {
        let BOARD = board.getBoard();
        // Check Rows
        let nonEmptyRows = BOARD.filter((row) => row.every(value => value !== "E"));
        for (row of nonEmptyRows) {
            let winnerX = row.filter(value => value === "X");
            let winnerO = row.filter(value => value === "O");
            if (winnerX.length === 3) {
                console.log("You Win!");
                return 1;
            }
            else if (winnerO.length === 3) {
                console.log("You lose!");
                return 1;
            }
        }

        for (let i = 0; i < 3; i++) {
            let temp = [];
            for (let j = 0; j < 3; j++) {
                temp.push(BOARD[j][i]);
            }
            let winnerX = temp.filter(value => value === "X");
            let winnerO = temp.filter(value => value === "O");

            if (winnerX.length === 3) {
                console.log("You Win");
                return 1;
            }
            else if (winnerO.length === 3) {
                console.log("You lose");
                return 1;
            }
        }
        
        // Check Diagonals
        if (BOARD[0][0] !== "E" && BOARD[1][1] !== "E" && BOARD[2][2] !== "E") {
            if ((BOARD[0][0] === BOARD[1][1]) &&
            (BOARD[1][1] === BOARD[2][2])) {
                if (BOARD[0][0] === playerOne.token) {
                    console.log("You Win");
                }
                else {
                    console.log("You Lose");
                }
                return 1;
            }
        }
        if (BOARD[0][2] !== "E" && BOARD[1][1] !== "E" && BOARD[2][0] !== "E") {
            if ((BOARD[0][2] === BOARD[1][1]) &&
            (BOARD[1][1] === BOARD[2][2])) {
                if (BOARD[0][2] === playerOne.token) {
                    console.log("You Win");
                }
                else {
                    console.log("You Lose");
                }
                return 1;
            }
        }
        // Check Tie
        let filledArray = BOARD.filter((row) => {
            return row.some(cellVal => cellVal === "E");
        })
        if (filledArray.length === 0) {
            console.log("Tie");
            return 0;
        }

        return -1;
    }

    const isGameOver = ()=> {
        const result = checkWinner();
        if (result === 0 || result === 1) {
            board.printBoard();
            console.log("Game Over");
            return true;
        }
        else {
            return false;
        }
    }
    const playRound = (row, column) => {
        let tokenPlaced = board.placeToken(row, column, playerOne.token);

        if (tokenPlaced === true) {
            if (isGameOver() === true) {
                return;
            }

            printNewRound(playerTwo);
            do {
                let cellRow = Math.floor(Math.random() * 3);
                let cellCol =  Math.floor(Math.random() * 3);
                tokenPlaced = board.placeToken(cellRow, cellCol, playerTwo.token);
            } while(tokenPlaced === false);

            if (isGameOver() === true) {
                return;
            }
            printNewRound(playerOne);
        }
        else {
            console.log("Invalid move. Try Again!");
        }
    }
    printNewRound(playerOne);

    return {playRound};
}