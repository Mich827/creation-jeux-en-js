/*
to do:
x générer un mot aléatoire
-afficher le mot masqué-------
-afficher les lettres trouvées
-gerer un nombre d'erreurs max
*/



const allWords = ['ministre', 'congolais' , 'constitution',
 'corompre', 'petrole', 'dictateur'];

const buttonPlay = document.querySelector('#beginGame');
const wordToFindDiv = document.querySelector('#wordToFindDiv');
const keyBoardDiv = document.querySelector('#keyBoard');
buttonPlay.addEventListener('click',()=>{
beginGame();
})

function beginGame(){
  //generer un mot au hasard
  wordToFindDiv.innerHTML = '';
  let wordToFind = generateWord();
  
  let wordToFindArray = Array.from(wordToFind);
  let table = document.createElement('table');
  let line = document.createElement('tr');
  wordToFindArray.forEach(letter =>{
    //créer un td case du tableau par lettre
    let td = document.createElement('td');
    td.dataset.letter = letter;
    td.innerText = '-';
    line.appendChild(td)
  })
  table.appendChild(line);
  wordToFindDiv.appendChild(table);
generateKeyBoard()
}
function generateKeyBoard(){
  keyBoardDiv.innerHTML = '';
  let alphabet = generateAlphabet();
  alphabet.forEach(letter=>{
    let lettreDiv = document.createElement('div');
    lettreDiv.innerHTML = letter;
    keyBoardDiv.appendChild(lettreDiv);
  });
}
function generateAlphabet(capital = false){

  let table = [];
  for(i = 0; i < 26; i++){
    if(capital){
      table.push(String.fromCharCode(i + 65));
    }else{
      table.push(String.fromCharCode(i + 97));
    }
  }
  return table;

}

function generateWord(){
  let indexWord = getRandomInt(allWords.length);

  return allWords[indexWord];
  
}
function getRandomInt(max){
 return Math.floor(Math.random()* max);
}