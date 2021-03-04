//First use of OOP
const board = document.getElementById("board");
const gameResult = document.getElementById("gameResult");
board.addEventListener("click", playGame);

const ticTacToe = {
  turnsLeft: 9,
  symbols: ["X", "O"],
  boardState: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "",
  winConditions: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],

  setCurrentPlayer: function (boardTile) {
    let symbol;
    let index = Array.from(boardTile.parentElement.children).indexOf(boardTile);
    if (this.boardState[index] == "") {
      this.turnsLeft--;
      if (this.turnsLeft % 2 == 0) {
        symbol = this.symbols[0];
      } else {
        symbol = this.symbols[1];
      }
      this.currentPlayer = symbol;
    }
  },

  checkWin: function () {
    for (let i = 0; i < this.winConditions.length; i++) {
      let a = this.boardState[this.winConditions[i][0]];
      let b = this.boardState[this.winConditions[i][1]];
      let c = this.boardState[this.winConditions[i][2]];
      if (a == "" || b == "" || c == "") continue;
      if (a == b && b == c) return true;
    }
    return false;
  },

  //Trying to not rely too much on the DOM, however, this heavily relies on the DOM for the boardState to be updated as this is dependent on the index/tile of the board that was clicked.
  updateBoardState: function (boardTile) {
    let index = Array.from(boardTile.parentElement.children).indexOf(boardTile);
    this.boardState[index] = this.boardState[index] || this.currentPlayer;
  },
};

//might want to put this function into the object but we will see about that later
function playGame(e) {
  if (e.target != e.currentTarget) {
    ticTacToe.setCurrentPlayer(e.target);
    ticTacToe.updateBoardState(e.target);
    e.target.innerText = ticTacToe.currentPlayer;
    e.target.innerText == "X"
      ? (e.target.style.color = "green")
      : (e.target.style.color = "blue");

    if (ticTacToe.checkWin()) {
      gameResult.textContent = `Player ${ticTacToe.currentPlayer} has won the game.
      `;
      Array.from(e.currentTarget.children).forEach((child) => {
        child.disabled = true;
        child.style.color = "darkgrey";
        child.style.background = "grey";
      });
    }
    console.log(ticTacToe);
  }
}

//Consider making the game more efficient such that the values don't change even in the DOM when they are clicked again

//Also if I do use a class for this, then I can make a reset game function and then just revert things back to the way they once were before the game began.
