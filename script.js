const t1 = performance.now();
const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".currentPlayer");
const newGameIn = document.querySelector(".newBtn");
const twoP = document.querySelector(".twoPlayer");
const compBtn = document.querySelector(".compBtn");
const resBtn = document.querySelector(".resBtn");
const menuBtn = document.querySelector(".menuBtn");
const alertt = document.querySelector(".alert");
const closeBtn = document.querySelector(".closeBtn");

function callAlert() {
  alertt.classList.add("show");
  setTimeout(function () {
    alertt.classList.remove("show");
  }, 2000);
  closeBtn.addEventListener("click", () => {
    alertt.classList.remove("show");
  });
}

let currentPlayer;
let gameGrid;
let currColor;
let multi = false;
let comp = false;

//winnig position
const winningPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
//intialised game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
  });
  if (comp || multi) {
    resBtn.classList.add("active");
    menuBtn.classList.add("active");
    compBtn.classList.remove("active");
    twoP.classList.remove("active");
    Clickable();
  } else {
    resBtn.classList.remove("active");
    menuBtn.classList.remove("active");
    compBtn.classList.add("active");
    twoP.classList.add("active");
  }
  boxes.forEach((box) => {
    box.classList.remove("win");
  });
  newGameIn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();
function initGame3() {
  comp = false;
  multi = false;
  initGame();
}
function initGame2() {
  alertt.classList.remove("show");
  if (!multi) {
    multi = true;
    initGame();
  }
}
function initGame1() {
  alertt.classList.remove("show");
  if (!comp) {
    comp = true;
    initGame();
  }
}
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
function checkGameOver() {
  let answer = "";
  winningPos.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });
  //it means we have a winner
  if (answer !== "") {
    comp ? comp=false: multi;
    gameInfo.innerText = `Winner - ${answer}`;
    resBtn.classList.remove("active");
    menuBtn.classList.remove("active");
    newGameIn.classList.add("active");
    setTimeout(() => {
      multi ? multi : comp=true;
    }, 1000);
    return;
  }
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box !== "") fillCount++;
  });
  if (fillCount === 9) {
    gameInfo.innerText = `Game Tied !`;
    newGameIn.classList.add("active");
    resBtn.classList.remove("active");
    menuBtn.classList.remove("active");
  }
}
function generateRandomClicks() {
  checkGameOver();
  const randomClicks = Math.floor(Math.random() * 8) + 1;
  if (gameGrid[randomClicks] === "") {
    boxes[randomClicks].innerText = currentPlayer;
    gameGrid[randomClicks] = currentPlayer;
    boxes[randomClicks].style.pointerEvents = "none";
    swapTurn();
    Clickable();
    checkGameOver();
  } else {
    generateRandomClicks();
  }
}
function unClickable() {
  boxes.forEach((box, index) => {
    boxes[index].style.pointerEvents = "none";
  });
}
function Clickable() {
  boxes.forEach((box, index) => {
    if (boxes[index].innerText === "") {
      boxes[index].style.pointerEvents = "all";
    }
  });
}
function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    checkGameOver();
    if (comp) {
      unClickable();
      setTimeout(generateRandomClicks, 500);
    }
  }
}
boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (!comp && !multi) {
      callAlert();
    } else {
      handleClick(index);
    }
  });
});

newGameIn.addEventListener("click", initGame);
resBtn.addEventListener("click", initGame);
menuBtn.addEventListener("click", initGame3);
compBtn.addEventListener("click", initGame1);
twoP.addEventListener("click", initGame2);
const t2 = performance.now();
console.log(`${t2 - t1}ms`);
