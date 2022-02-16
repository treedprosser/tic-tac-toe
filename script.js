const createPlayer = (name, marker) => {
    return {name, marker};
}

const gameBoard = (() => {

    let board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }

    let squares = document.querySelector('.squares');

    board.forEach(() => {
        const square = document.createElement('div');
        square.className = 'square';
        squares.appendChild(square);
    })

    Array.from(squares.children).forEach((square, index) => {
        square.addEventListener('click', () => {
            square.classList.add(game.activePlayer.marker);
            square.setAttribute('data', game.activePlayer.marker);
            board[index] = game.activePlayer.marker;
            square.style.pointerEvents = 'none';
            game.remainingSpots -= 1;
            game.checkWinner();
            if (game.winnerDeclared == false) {
                if (game.remainingSpots > 0) {
                    game.alertNextPlayer();
                    game.nextPlayer();
                } else if (game.remainingSpots == 0) {
                    game.declareTie();
                }
            }
        })
    });

    return {
        board
    };

})();

const game = (() => {

    const playerOne = createPlayer(window.prompt("Player 1, enter your name: ", "Player 1"), 'x-marker');
    const playerTwo = createPlayer(window.prompt("Player 2, enter your name: ", "Player 2"), 'o-marker');

    let activePlayer = playerOne;
    let winnerDeclared = false;
    let remainingSpots = 9;

    let subtext = document.querySelector('.subtext');
    let playerName = document.querySelector('.player-name');
    playerName.textContent = playerOne.name;

    const winningAxes = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    function checkWinner() {
        winningAxes.forEach((item, index) => {
            if (gameBoard.board[item[0]] === this.activePlayer.marker && gameBoard.board[item[1]] === this.activePlayer.marker && gameBoard.board[item[2]] === this.activePlayer.marker) {
                subtext.textContent = `${this.activePlayer.name} wins!`;
                this.winnerDeclared = true;
            }
        })
    }

    function alertNextPlayer() {
        this.activePlayer === playerOne ? playerName.textContent = playerTwo.name : playerName.textContent = playerOne.name;
    }

    function nextPlayer() {
        this.activePlayer === playerOne ? this.activePlayer = playerTwo : this.activePlayer = playerOne;
    }

    function declareTie() {
        subtext.textContent = "Tie Game!";
    }

    return {
        activePlayer,
        remainingSpots,
        checkWinner,
        alertNextPlayer,
        nextPlayer,
        declareTie,
        winnerDeclared
    };
})();

function reset() {
    window.location.reload();
}

