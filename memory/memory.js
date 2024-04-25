const symbols = [
  "buu.jpeg",
  "Brolly.jpeg",
  "bulma.jpeg",
  "chichi.jpeg",
  "freeza.jpeg",
  "Goku.jpeg",
  "krilin.jpeg",
  "picollo.jpeg",
  "songohan.jpeg",
  "Tien.jpeg",
];

const memoryGame = document.getElementById("memoryGame");
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function createCard(symbol) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const cardInner = document.createElement("div");
  cardInner.classList.add("card-inner");

  const cardFront = document.createElement("img");
  cardFront.classList.add("card-face", "card-front");
  cardFront.src = "image/" + symbol;

  const cardBack = document.createElement("div");
  cardBack.classList.add("card-face", "card-back");
  cardBack.src = "";

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);

  cardElement.appendChild(cardInner);

  cardElement.addEventListener("click", () => flipCard(cardElement));

  memoryGame.appendChild(cardElement);
}

function flipCard(cardElement) {
  if (
    lockBoard ||
    cardElement.classList.contains("flipped") ||
    cardElement.classList.contains("matched")
  )
    return;

  cardElement.classList.add("flipped");

  if (!firstCard) {
    firstCard = cardElement;
  } else {
    secondCard = cardElement;
    checkForMatch();
  }
}

function checkForMatch() {
  if (
    firstCard.querySelector(".card-front").src ===
    secondCard.querySelector(".card-front").src
  ) {
    disableCards();
  } else {
    unflipCards();
  }
}
//display message win
function displayMessage(message) {
  const messageElement = document.getElementById("messageWin");
  messageElement.textContent = message;
}
function disableCards() {
  firstCard.removeEventListener("click", () => flipCard(firstCard));
  secondCard.removeEventListener("click", () => flipCard(secondCard));
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  firstCard = null;
  secondCard = null;
  matchedPairs++;

  if (matchedPairs === symbols.length) {
    setTimeout(() => {
      //alert("Félicitations ! Vous avez gagné !");
      displayMessage("you win");
    }, 500);
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }, 1000);
}

function initializeGame() {
  const shuffledSymbols = shuffle(symbols); // Mélanger les symboles de manière aléatoire
  const shuffledPairs = shuffledSymbols.concat(shuffledSymbols); // Dupliquer les symboles pour créer des paires
  shuffledPairs.forEach((symbol) => {
    createCard(symbol);
  });
}

initializeGame();

const replayButton = document.querySelector("#replayButton");
replayButton.addEventListener("click", () => {
  location.reload();
});
