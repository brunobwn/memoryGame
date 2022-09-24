const scoreTag = document.querySelector("#score");
const timerTag = document.querySelector("#timer");
const grid = document.querySelector("#gameArea");

const cards = [
  ["morty-pink1", "morty-pink.png"],
  ["morty-pink1", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
  ["morty-pink1", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
  ["morty-pink1", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
  ["morty-pink2", "morty-pink.png"],
];

let firstChoice = "";
let secChoice = "";

const flipCard = ({ target }) => {
  let card = target.closest(".card");
  if (firstChoice == "" && secChoice == "") {
    firstChoice = card;
    card.classList.add("flipped");
    return;
  } else if (firstChoice !== "" && secChoice == "") {
    secChoice = card;
    card.classList.add("flipped");

    setTimeout(checkCards, 250);
  }
};

const checkCards = () => {
  const first = firstChoice.getAttribute("name");
  const second = secChoice.getAttribute("name");

  console.log(first, second);

  if (first === second) {
    firstChoice.firstChild.classList.add("blocked");
    secChoice.firstChild.classList.add("blocked");

    firstChoice.removeEventListener("click", flipCard);
    secChoice.removeEventListener("click", flipCard);

    firstChoice = "";
    secChoice = "";

    addScore();
  } else {
    setTimeout(() => {
      firstChoice.classList.remove("flipped");
      secChoice.classList.remove("flipped");

      firstChoice = "";
      secChoice = "";
    }, 250);
  }
};

let strikeCount = 0;
let score = 0;

const addScore = () => {
  const hitPoint = 100;

  const timeBonus = minutes + seconds / 60;

  let hitTotal = (hitPoint * ((1 + strikeCount) / 10)) / timeBonus;

  score += hitTotal;

  scoreTag.innerHTML = score;
};

const createElement = (tag, classes = []) => {
  const element = document.createElement(tag);
  classes?.forEach((className) => {
    element.classList.add(className);
  });
  return element;
};

const createCard = (name, img) => {
  const card = createElement("article", ["card"]);
  const front = createElement("div", ["face", "front"]);
  const back = createElement("div", ["face", "back"]);

  card.setAttribute("name", name);
  front.style.backgroundImage = `url('./images/${img}')`;

  card.appendChild(front);
  card.appendChild(back);
  card.addEventListener("click", flipCard);

  return card;
};

function minTwoDigits(n) {
  return (n < 10 ? "0" : "") + n;
}

let seconds = 0;
let minutes = 0;

const startTimer = () => {
  this.loop = setInterval(() => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }

    timerTag.innerHTML = `${minTwoDigits(minutes)}:${minTwoDigits(seconds)}`;

    if (minutes > 59) {
      gameOver();
    }
  }, 1000);
};

const stopTimer = () => {
  clearInterval(this.loop);
};

const startGame = () => {
  let addCard = "";
  cards.forEach((card) => {
    // console.log(card[0]);
    addCard = createCard(card[0], card[1]);
    grid.appendChild(addCard);
  });
  startTimer();
};

const gameOver = () => {
  console.log("end game");
};

startGame();
