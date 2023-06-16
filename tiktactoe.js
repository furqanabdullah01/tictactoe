const gameBoard = document.querySelector("#gameboard");
const gameInfo = document.querySelector("#info");
const boardCells = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "O";
let gameActive = true;

gameInfo.textContent = "Circle Goes First";

function createGame() {
  boardCells.forEach((_cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("square");
    cellElement.id = index;
    cellElement.addEventListener("click", addMove);
    gameBoard.append(cellElement);
  });
}

createGame();

function addMove(e) {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.id);

  if (boardCells[clickedCellIndex] === "" && gameActive) {
    boardCells[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
      gameInfo.textContent = `  ${currentPlayer}   Wins!`;
      gameActive = false;
    } else if (isBoardFull()) {
      gameInfo.textContent = "It's A Tie!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "O" ? "X" : "O";
      gameInfo.textContent = `  It is now ${currentPlayer}'s turn.`;
    }
  }
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      boardCells[a] &&
      boardCells[a] === boardCells[b] &&
      boardCells[a] === boardCells[c]
    ) {
      return true;
    }
  }

  return false;
}

function isBoardFull() {
  return boardCells.every((cell) => cell !== "");
}