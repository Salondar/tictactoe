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
            console.log("Invalid Move!");
            return 0;
        }
        else {
            board[row][col] = playerToken;
        }
        return 1;
    }
    return {printBoard, getBoard, placeToken};
}

function Player(name, token) {

    const getMove = () => {
        const SIZE = 3;
        const cellRow = Math.floor(Math.random() * SIZE);
        const cellCol = Math.floor(Math.random() * SIZE);

        return {cellRow, cellCol};
    }
    return {name, token, getMove};
}


function GameController(playerOneName="PlayerOne",
    playerTwoName="Computer") {
    
    const board = Gameboard();
    let playerOne = Player(playerOneName, "X");
    let playerTwo = Player(playerTwoName, "O");

    let activePlayer = playerOne;

    const switchActivePlayer = ()=> {
        activePlayer = (activePlayer === playerOne) ? playerTwo: playerOne;
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`)
    }

    const checkWinner = () => {
        const BOARD = board.getBoard();
        // Check Rows
        for (let i = 0; i < 3; i++) {
            if (BOARD[i][0] !== "E" && BOARD[i][1] !== "E" && BOARD[i][2] !== "E") {
                if ((BOARD[i][0] === BOARD[i][1]) &&
                (BOARD[i][1] === BOARD[i][2])) {
                   if (BOARD[0][0] == playerOne.token) {
                       console.log("You Win!")
                   }
                   else {
                       console.log("You lose");
                   }
                   board.printBoard();
                   return 1;
                }
            }  
        }

        // Check Columns
        if (BOARD[0][0] !== "E" && BOARD[1][0] !== "E" && BOARD[2][0] !== "E") {
            if ((BOARD[0][0] === BOARD[1][0]) &&
            (BOARD[0][0] === BOARD[2][0])) {
                if (BOARD[0][0] === playerOne.token) {
                    console.log("You Win");
                }
                else {
                    console.log("You Lose");
                }
                board.printBoard();
                return 1;
            }
        }
        
        if (BOARD[0][1] !== "E" && BOARD[1][1] !== "E" && BOARD[2][1] !== "E") {
            if ((BOARD[0][1] === BOARD[1][1]) &&
            (BOARD[1][1] === BOARD[2][1])) {
                if (BOARD[0][1] === playerOne.token) {
                    console.log("You Win");
                }
                else {
                    console.log("You Lose");
                }
                board.printBoard();
                return 1;
            }
        }

        if (BOARD[0][2] !== "E" && BOARD[1][2] !== "E" && BOARD[2][2] !== "E") {
            if ((BOARD[0][2] === BOARD[1][2]) &&
            (BOARD[1][2] === BOARD[2][2])) {
                if (BOARD[0][2] === playerOne.token) {
                    console.log("You Win");
                }
                else {
                    console.log("You Lose");
                }
                board.printBoard();
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
                board.printBoard();
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
                board.printBoard();
                return 1;
            }
        }
        // Check Tie
        let filledArray = BOARD.filter((row) => {
            return row.some(cellVal => cellVal === "E");
        })
        if (filledArray.length === 0) {
            board.printBoard();
            console.log("Tie");
            return 0;
        }

        return -1;
    }

    const playRound = (row, column) => {
        let switchPlayer, foundWinner;
        if (activePlayer === playerOne) {
            switchPlayer = board.placeToken(row, column, activePlayer.token);
        }
        else {
            let cell = playerTwo.getMove();
            switchPlayer = board.placeToken(cell.cellRow, cell.cellCol, activePlayer.token);
        }

        foundWinner = checkWinner();

        if (foundWinner === 0 || foundWinner === 1) {
            console.log("Game Over");
            return;
        }

        if (switchPlayer === 1) {
            switchActivePlayer();
        }
        printNewRound();

    }
    printNewRound();

    return {playRound};
}