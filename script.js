document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameOver = false;
  
    // Select all the boxes
    const boxes = document.querySelectorAll(".box");
  
    // Add click event listeners to each box
    boxes.forEach((box, index) => {
      box.addEventListener("click", () => {
        if (!gameOver && gameBoard[index] === "") {
          // Update the game board and display the symbol
          gameBoard[index] = currentPlayer;
          updateBox(index);
          
          // Check for a winner
          if (checkWinner()) {
            gameOver = true;
            document.getElementById("choosePlayer").innerText = `${currentPlayer} wins!`;
            updateScore(currentPlayer);
          } else if (gameBoard.every((cell) => cell !== "")) {
            // Check for a draw
            gameOver = true;
            document.getElementById("choosePlayer").innerText = "It's a draw!";
          } else {
            // Switch player
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("choosePlayer").innerText = `Player ${currentPlayer}'s turn`;
          }
        }
      });
    });
  
    // Function to update the display of a box
    function updateBox(index) {
      const box = boxes[index];
      if (gameBoard[index] === "X") {
        box.innerHTML = '<div class="cross"></div>';
      } else if (gameBoard[index] === "O") {
        box.innerHTML = '<div class="circle"></div>';
      }
    }
  
    // Function to check if there's a winner
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      return winningCombinations.some((combination) => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
      });
    }
  
    // Function to update the score
    function updateScore(player) {
      const scoreElement = document.getElementById(player);
      const currentScore = parseInt(scoreElement.lastElementChild.innerText, 10);
      scoreElement.lastElementChild.innerText = currentScore + 1;
    }
  
    // Function to reset the game
    function resetGame() {
      gameBoard = ["", "", "", "", "", "", "", "", ""];
      boxes.forEach((box) => (box.innerHTML = ""));
      gameOver = false;
      document.getElementById("choosePlayer").innerText = `Player ${currentPlayer}'s turn`;
     
    }
  
    // Add a keydown event listener to start the game
    document.addEventListener("keydown", resetGame);
    let btn = document.querySelector("button");
    btn.addEventListener("click",resetGame);
  });
  