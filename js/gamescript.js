const scoreTag = document.querySelector("#score");
const timerTag = document.querySelector("#timer");
const grid = document.querySelector("#gameArea");
const content = document.querySelector("#content");
const gameMessages = document.querySelector("#gameMessages");

const characters = [
  ["morty-pink", "morty-pink.png"],
  ["scary-terry", "Scary-Terry.jpg"],
  ["wood-beth", "wood-beth.png"],
  ["bdsm-couple", "bdsm-couple.png"],
  ["survivor-jerry", "survivor-jerry.webp"],
  ["badass-morty", "badass-morty.jpg"],
  ["jerry", "jerry.jpg"],
  ["strong-summer", "strong-summer.jpg"],
  ["rick-vibes", "rick-vibes.jpg"],
  ["rick-roof", "rick-roof.jpg"],
  ["rick-bug", "rick-bug.jpg"],
  ["acid-morty", "acid-morty.jpg"],
  ["acid-rick", "acid-rick.jpg"],
  ["evil-morty", "evil-morty.jpg"],
  ["morty-summer", "morty-summer.jpg"],
];

let firstChoice = "";
let secChoice = "";
let score = 0;
let strikeCount = 0;
// number os pairs cards to the game
const numCards = 12;

const flipCard = ({ target }) => {
  let card = target.closest(".card");
  if (firstChoice == "" && secChoice == "") {
    firstChoice = card;
    card.removeEventListener("click", flipCard);
    card.classList.add("flipped");
    return;
  } else if (firstChoice !== "" && secChoice == "") {
    secChoice = card;
    card.classList.add("flipped");

    setTimeout(checkCards, 350);
  }
};

const checkCards = () => {
  const first = firstChoice.getAttribute("name");
  const second = secChoice.getAttribute("name");

  if (first === second) {
    firstChoice.firstChild.classList.add("blocked");
    secChoice.firstChild.classList.add("blocked");

    firstChoice.removeEventListener("click", flipCard);
    secChoice.removeEventListener("click", flipCard);

    firstChoice = "";
    secChoice = "";

    addScore();
    strikeCount++;
    setTimeout(checkEndGame, 350);
  } else {
    setTimeout(() => {
      firstChoice.addEventListener("click", flipCard);

      firstChoice.classList.remove("flipped");
      secChoice.classList.remove("flipped");

      firstChoice = "";
      secChoice = "";

      strikeCount = 0;
    }, 250);
  }
};

const addScore = () => {
  const hitPoint = 1135;

  const timeBonus = 1.25 + minutes;

  let hitTotal = (hitPoint * (1 + strikeCount)) / timeBonus;

  score += hitTotal;

  scoreTag.innerHTML = Math.round(score);
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
  seconds = 0;
  minutes = 0;

  this.loop = setInterval(() => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++;
    }

    timerTag.innerHTML = `${minTwoDigits(minutes)}:${minTwoDigits(seconds)}`;
  }, 1000);
};

const stopTimer = () => {
  clearInterval(this.loop);
};

const resetGame = () => {
  strikeCount = 0;
  score = 0;
  scoreTag.innerHTML = "0";
  timerTag.innerHTML = "00:00";
};

const startGame = (numCards) => {
  resetGame();

  content.style.display = "none";
  gameMessages.innerHTML = "";

  // select random characters for the game
  let possibleChars = [...characters];
  let gameChars = [];
  for (i = 0; i < numCards; i++) {
    const random = Math.floor(Math.random() * possibleChars.length);

    gameChars.push(possibleChars[random]);
    possibleChars.splice(random, 1);
  }

  gameChars = [...gameChars, ...gameChars];
  let gameCharsShuffled = gameChars
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  gameCharsShuffled.map((card) => {
    grid.appendChild(createCard(card[0], card[1]));
  });

  startTimer();
};

const checkEndGame = () => {
  const totalHits = document.querySelectorAll(".face.front.blocked").length;
  if (numCards * 2 === totalHits) {
    stopTimer();
    setTimeout(() => {
      removeAllChildNodes(grid);
      gameMessages.innerHTML = "That`s a WIN Morty!";
      content.style.display = "flex";
    }, 1000);
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// startGame(numCards);
