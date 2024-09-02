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

    const placeToken = (r, c, playerToken) => {
        if (board[r][c] != EMPTY) {
            console.log("Invalid Move!");
            return 0;
        }
        else {
            board[r][c] = playerToken;
        }
        return 1;
    }
    return {printBoard, getBoard, placeToken};
}

function GameController(playerOneName="PlayerOne",
    playerTwoName="Computer") {
    
    const SIZE = 3;

    const board = Gameboard();

    const players = [{name:playerOneName, token: "X"},
                    {name:playerTwoName, token: "O"}];

    let activePlayer = players[0];

    const switchActivePlayer = ()=> {
        activePlayer = activePlayer.name === players[0].name ? players[1]: players[0];
    }

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer.name}'s turn`)
    }

    const checkWinner = (gameBoard)=> {

        // Check Filled board

        // Check Rows
        for (let i = 0; i < SIZE; i++) {
            row = gameBoard[i];
            if (row[0] === row[1] && row[1] === row[2]) {
                if (row[0] === players[0].token) {
                    console.log("You Win!")
                }
                else if (row[0] === players[1].token) {
                    console.log("Computer Wins")
                }
                return 1;
            }
        }
        // Check Columns

        return 0;
        // Check Diagonals
    }

    const playRound = (row, column) => {
        let switchPlayer;
        if (activePlayer === players[0]) {
            switchPlayer = board.placeToken(row, column, activePlayer.token)
        }
        else {

            let randRow = Math.floor(Math.random() * 3);
            let randCol = Math.floor(Math.random() * 3);
            switchPlayer = board.placeToken(randRow, randCol, activePlayer.token)
        }
        if (switchPlayer) {
            switchActivePlayer();
        }
        printNewRound();
    }
    printNewRound();

    return {playRound};
}