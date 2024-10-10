function  Gameboard() {
    const ROWS = 3;
    const COLS = 3;
    const EMPTY = "";

    const board = [];
    for (let i = 0; i < ROWS; i++ ) {
        board[i] = [];
        for (let j = 0; j < COLS; j++) {
            board[i].push(EMPTY);
        }
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
    return {getBoard, placeToken};
}

function Player(name, token) {
    return {name, token};
}

function GameController(playerOneName="PlayerOne",
    playerTwoName="Computer") {
    
    const board = Gameboard();
    let playerOne = Player(playerOneName, "X");
    let playerTwo = Player(playerTwoName, "O");

    const checkWinner = () => {
        let BOARD = board.getBoard();
        // Check Rows
        for (row of BOARD) {
            let winnerX = row.filter(value => value === "X");
            let winnerO = row.filter(value => value === "O");
            if (winnerX.length === 3) {
                return 1;
            }
            else if (winnerO.length === 3) {
                return 2;
            }
        }

        // Check Columns
        for (let i = 0; i < 3; i++) {
            let temp = [];
            for (let j = 0; j < 3; j++) {
                temp.push(BOARD[j][i]);
            }
            let winnerX = temp.filter(value => value === "X");
            let winnerO = temp.filter(value => value === "O");

            if (winnerX.length === 3) {
                return 1;
            }
            else if (winnerO.length === 3) {
                return 2;
            }
        }

        // Check Diagonal
        let diagonalRows = [[], []];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i === j) {
                    diagonalRows[0].push(BOARD[i][j]);
                }
                if ((i + j) === 2) {
                    diagonalRows[1].push(BOARD[i][j]);
                }
            }
        }

        for (row of diagonalRows ) {
            let winnerX = row.filter(value => value === "X");
            let winnerO = row.filter(value => value === "O");

            if (winnerX.length === 3) {
                return 1;
            }
            else if (winnerO.length === 3) {
                return 2
            }
        }

        // Check Tie. Find partially empty rows. If there are none and we got to this point then it is tie
        let filledArray = BOARD.filter((row) => {
            return row.some(cellVal => cellVal === "");
        })
        if (filledArray.length === 0) {
            return 0;
        }

        return -1;
    }

    const playRound = (row, column) => {
        let tokenPlaced = board.placeToken(row, column, playerOne.token);
        let isGameOver;

        if (tokenPlaced === true) {
            isGameOver = checkWinner();
            
            if (isGameOver === 0 || isGameOver === 1 || isGameOver === 2) {
                return isGameOver;
            }

            do {
                let cellRow = Math.floor(Math.random() * 3);
                let cellCol =  Math.floor(Math.random() * 3);
                tokenPlaced = board.placeToken(cellRow, cellCol, playerTwo.token);
            } while(tokenPlaced === false);

            isGameOver = checkWinner();
            if (isGameOver === 0 || isGameOver === 1 || isGameOver === 2) {
                return isGameOver;
            } else {
                return -1;
            }
        }
        return -1;
    }

    return {
        playRound,
        getBoard: board.getBoard()

    };
}

function ScreenController() {
    const newGame = document.querySelector(".newGame");
    const boardDiv = document.querySelector(".board");
    const endMsg = document.querySelector(".gameOverMsg");
    const game = GameController();
    const board = game.getBoard;
    let isGameOver = -1;

    const updateScreen = () => {
        boardDiv.textContent = "";
        board.forEach((row, rowIndex) => {
            row.forEach((value, columnIndex) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                
                cellButton.textContent = value;
                boardDiv.appendChild(cellButton);
            })
        });
    }

    boardDiv.addEventListener("click", (event) => {

        if (isGameOver !== -1) {
            return;
        }
        const selectedRow = parseInt(event.target.dataset.row, 10);
        const selectedColumn = parseInt(event.target.dataset.column, 10);

        isGameOver = game.playRound(selectedRow, selectedColumn);
        updateScreen();

        if (isGameOver !== -1) {
            if (isGameOver === 1) {
                endMsg.textContent = "You Win!";
            }
            else if (isGameOver === 2) {
                endMsg.textContent = "You Lose!";
            }
            else if (isGameOver === 0) {
                endMsg.textContent = "Tie!";
            }
        }
    });

    newGame.addEventListener("click", (event) => {
        endMsg.textContent = "";
        isGameOver = -1;
        for (let row of board) {
            for (let i = 0; i < 3; i++) {
                row[i] = "";
            }
        }
        updateScreen();
    });
    updateScreen();
}

ScreenController();