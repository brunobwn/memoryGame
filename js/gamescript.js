const score = document.querySelector("#score");
const timer = document.querySelector("#timer");
const grid = document.querySelector("#gameArea");

const cards = [
  ["morty-pink1", "morty-pink.png"],
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
  } else {
    setTimeout(() => {
      firstChoice.classList.remove("flipped");
      secChoice.classList.remove("flipped");

      firstChoice = "";
      secChoice = "";
    }, 250);
  }
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

const startGame = () => {
  let addCard = "";
  cards.forEach((card) => {
    // console.log(card[0]);
    addCard = createCard(card[0], card[1]);
    grid.appendChild(addCard);
  });
};

startGame();
