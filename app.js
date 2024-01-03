let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};

const announceWinner = (winner) => {
  const winnerMsgContainer = document.createElement("div");
  winnerMsgContainer.classList.add("winner-msg-container", "celebrate");

  const winnerMsg = document.createElement("p");
  winnerMsg.innerText = `Congratulations ${winner}! You are the winner!`;
  winnerMsgContainer.appendChild(winnerMsg);

  document.body.appendChild(winnerMsgContainer);

  // Set a timeout to display the message for a few seconds
  setTimeout(() => {
    winnerMsgContainer.style.display = "none";
  }, 3000); // Adjust the duration as needed

  // Reset the game after a winner is announced
  resetGame();
};





const checkForWinner = () => {
  if (userScore === 3) {
    announceWinner("You");
    
  } else if (compScore === 3) {
    announceWinner("Computer");
    
  }
  if (userScore === 3 || compScore === 3) {
    // Reset the game after a winner is announced
    resetGame();
  }
};

const resetGame = () => {
  userScore = 0;
  compScore = 0;
  userScorePara.innerText = userScore;
  compScorePara.innerText = compScore;
};

const playGame = (userChoice) => {
  //Generate computer choice
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    //Draw Game
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      //scissors, paper
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }

  checkForWinner();
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
