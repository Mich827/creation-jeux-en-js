/*
to do:
x générer un mot aléatoire
-afficher le mot masqué-------
-afficher les lettres trouvées
-gerer un nombre d'erreurs max
-gerer la victoire
*/

const allWords = [
  "ministre",
  "congolais",
  "constitution",
  "corompre",
  "petrole",
  "dictateur",
  "dinosaure",
  "informatique",
  "president",
  "avion",
  "chat",
  "peluche",
];

const buttonPlay = document.querySelector("#beginGame");
const wordToFindDiv = document.querySelector("#wordToFindDiv");
const keyBoardDiv = document.querySelector("#keyBoard");
const cptErreurDiv = document.getElementById("cptErreur");
const winner = document.getElementById("winner");
let wordToFind;
let wordToFindArray;
let cptError = 0;
let cptLettreTrouvees = 0;
const imgPendu = document.getElementById("imagePendu");

buttonPlay.addEventListener("click", () => {
  initGame();
});

function initGame() {
  //generer un mot au hasard
  cptError = 0;
  imgPendu.className = "";
  imgPendu.classList.add("etat" + cptError);
  cptLettreTrouvees = 0;
  winner.style.visibility = "hidden";
  wordToFindDiv.innerHTML = "";

  wordToFind = generateWord();

  wordToFindArray = Array.from(wordToFind);
  let table = document.createElement("table");
  let line = document.createElement("tr");
  line.id = "lineOfWord";
  wordToFindArray.forEach((letter) => {
    //créer un td case du tableau par lettre
    let td = document.createElement("td");
    td.dataset.letter = letter;
    td.innerText = "-";
    line.appendChild(td);
  });
  table.appendChild(line);
  wordToFindDiv.appendChild(table);
  generateKeyBoard();
}
function generateKeyBoard() {
  keyBoardDiv.innerHTML = "";
  let alphabet = generateAlphabet();
  alphabet.forEach((letter) => {
    let lettreDiv = document.createElement("div");
    lettreDiv.innerHTML = letter;
    keyBoardDiv.appendChild(lettreDiv);
    lettreDiv.addEventListener("click", () => {
      if (checkLetterInWord(letter)) {
        //afficher lettre dans le mot masqué
        let lineWord = document.querySelector("#lineOfWord");
        let allTdOfWord = lineWord.children;

        Array.from(allTdOfWord).forEach((td) => {
          if (td.dataset.letter == letter) {
            td.innerHTML = letter;
            cptLettreTrouvees++;
          }
        });
        if (cptLettreTrouvees == wordToFindArray.length) {
          keyBoardDiv.innerHTML = "";
          cptErreurDiv.innerHTML = "Gagné en " + cptError + " coup(s)";
          winner.style.visibility = "visible";
          winner.style.animation = "2s fifi alternate infinite";
        }
      } else {
        //incrementer le compteur d'erreur
        cptError++;
        cptErreurDiv.innerHTML = cptError;
        let imgPendu = document.getElementById("imagePendu");

        imgPendu.className = "";
        imgPendu.classList.add("etat" + cptError);
        if (cptError >= 4) {
          cptErreurDiv.innerHTML = "perdu essayer une nouvelle partie";
          let lineWord = document.querySelector("#lineOfWord");
          let allTdOfWord = lineWord.children;

          Array.from(allTdOfWord).forEach((td) => {
            td.innerHTML = td.dataset.letter;
          });
          keyBoardDiv.innerHTML = "";
        }
      }
      lettreDiv.style.visibility = "hidden";
    });
  });
}
function generateAlphabet(capital = false) {
  let table = [];
  for (i = 0; i < 26; i++) {
    if (capital) {
      table.push(String.fromCharCode(i + 65));
    } else {
      table.push(String.fromCharCode(i + 97));
    }
  }
  return table;
}

function generateWord() {
  let indexWord = getRandomInt(allWords.length);

  return allWords[indexWord];
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
//return true si lettre presente mot
//return false si letrre non presente
function checkLetterInWord(letter) {
  let findletter = false;
  wordToFindArray.forEach((letterOfWord) => {
    if (letter == letterOfWord) {
      findletter = true;
    }
  });
  return findletter;
}
