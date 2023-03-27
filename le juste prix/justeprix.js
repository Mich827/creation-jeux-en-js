//générer un chiffre ven aléatoire 
// l'utilisateur fera des propositions
// continue tant que les propositions sont mauvaises
let numberToFind = 0;
const resultDiv = document.querySelector('#resultDiv');
const compterebourdiv = document.querySelector('#compteARebour');
let tempsRestant = 0;
let compteurInterval = null;
const imageLag = document.querySelector('.imgLag')
document.querySelector('#beginGame').addEventListener('click', ()=>{
  //lancer la partie
  //recup un chiffre aléatoire
  numberToFind = getRandomInt(1000);
  alert(numberToFind)
  tempsRestant = 30;
  if(compteurInterval != null){
    clearInterval(compteurInterval);
    
  }
  compteurInterval = setInterval(()=>{
    compterebourdiv.innerText = tempsRestant + ' seconde(s)';
    tempsRestant--;
   if(tempsRestant < 0){

       clearInterval(compteurInterval);
       endGame()
    }
  }, 1000);

})
function endGame(){
resultDiv.innerText = 'you lose';
resultDiv.style.color = 'red';

}

document.getElementById('checkPropalButton').addEventListener('click', ()=>{
  checkPropal()
 })


document.getElementById('userPropalInput').addEventListener('keyup', (event)=>{
  if(event.key == 'Enter'){
    checkPropal()
  }
})

function getRandomInt(max){
  return Math.floor(Math.random() * max);
}

function checkPropal(){

   let numberPropal = document.getElementById('userPropalInput').value;
  if(numberToFind > numberPropal ){
    resultDiv.innerHTML = '+';
    resultDiv.style.color = 'red';
  }else if(numberToFind < numberPropal){
    resultDiv.innerHTML = '-';
  }else if(numberToFind == numberPropal){
    resultDiv.innerHTML = 'gagné';
    imageLag.style.animation = '2s lag ';
    resultDiv.style.color = 'green';
    let audio = new Audio('audio/applaus.waw');
    audio.play();
  }

}