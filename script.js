"use script";
//buttons
const btnCheck = document.querySelector(".check");
const btnAgain = document.querySelector(".again");
//elementi
const boxEl = document.querySelector(".number");
const inputEl = document.querySelector(".guess");
const guessEl = document.querySelector(".message");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".highscore");
//game state
let gameState = true;

//main values
let score = 20;
let highsScore = 0;

// 1 ODREDITI SECRET NUMBER
let secretNumber = Math.trunc(Math.random() * 20) + 1; // Math random idem od 0 do 1, ako pomnozimo sa 20 dobicemo broj od 0 do 19, plus 1 nam daje 1 do 20.
//function
const displayMessage = function (message) {
  guessEl.textContent = message;
};
const clearMessage = () => {
  guessEl.textContent = "";
};

const buttonCheck = function () {
  const guess = Number(inputEl.value);
  if (inputEl.value < 0) inputEl.value = 0;
  if (inputEl.value > 20) inputEl.value = 20;

  if (score <= 0) {
    gameState = false;
    displayMessage(`The game is Lost`);
    document.body.style.backgroundColor = `red`;
  }
  if (gameState) {
    if (!guess) {
      displayMessage(`Only numbers are alowed`);
      score--;
      scoreEl.textContent = score;
    } else if (guess !== secretNumber) {
      displayMessage(guess > secretNumber ? `Too high` : `Too low`);
      score--;
      scoreEl.textContent = score;
    } else if (guess === secretNumber) {
      displayMessage(`Correct number`);
      document.querySelector("body").style.backgroundColor = `#60b347`;
      boxEl.style.width = `30rem`;
      gameState = false;
      boxEl.textContent = secretNumber;
      if (score > highsScore) {
        highsScore = score;
        highScoreEl.textContent = highsScore;
      }
    }
  }
  inputEl.value = "";
};

//code
// boxEl.textContent = secretNumber === true ? secretNumber : `?`; // mogao sam tek kasnije spojiti
//button check

btnCheck.addEventListener("click", function () {
  buttonCheck();
});

document.addEventListener(`keydown`, function (e) {
  if (e.key === `Enter`) {
    btnCheck.click();
  }
});

btnAgain.addEventListener(`click`, function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.body.style.backgroundColor = `#222`;
  score = 20;
  scoreEl.textContent = score;
  inputEl.value = "";
  boxEl.style.width = `15rem`;
  gameState = true;
  boxEl.textContent = `?`;
  displayMessage(`Start guessing...`);
});
