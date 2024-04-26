const questions = [
  {
    question: "Quel est le plus grand mammifère du monde ?",
    answers: ["La baleine bleue", "L'éléphant", "Le rhinocéros"],
    correctAnswer: "a",
  },
  {
    question:
      "Quel est le nom de l'oiseau qui ne peut pas voler mais est un excellent nageur ?",
    answers: ["Le pingouin", "Le colibri", "Le corbeau"],
    correctAnswer: "a",
  },
  {
    question: "Quel est le plus grand animal terrestre ?",
    answers: ["Le rhinocéros", "L'elephant", "Le lyon"],
    correctAnswer: "b",
  },
  {
    question: "Quel animal peut entendre les ultrasons ?",
    answers: ["Le singe", "Le crocodile", "La chauve souris"],
    correctAnswer: "c",
  },
  {
    question: "Quel est le seul mammifère capable de voler ?",
    answers: ["La chauve-souris", "Le raton-laveur", "Le renard"],
    correctAnswer: "a",
  },
  {
    question: "Quel mammifère marin et un cousin de l'éléphant ?",
    answers: ["La baleine", "L'éléphant de mer", "Le lamantin"],
    correctAnswer: "c",
  },
  {
    question: "Que mange le gorille ?",
    answers: ["des insectes", "des plantes", "des chips"],
    correctAnswer: "b",
  },
  {
    question: "Ou vit le diable de Tasmanie ?",
    answers: ["Australie", "Asie", "Afrique"],
    correctAnswer: "a",
  },
  {
    question: "Quel crustacés vit en eau douce ?",
    answers: ["Le homard", "Le crabe", "l'écrevisse"],
    correctAnswer: "c",
  },
  {
    question: "Que mangent les termites ?",
    answers: ["des graines", "du bois", "des os"],
    correctAnswer: "b",
  },
  {
    question: "Que mange le requin baleine ?",
    answers: ["des poissons", "des plongeurs", "du plancton"],
    correctAnswer: "c",
  },
  {
    question: "Pourquoi le caméléon change t'il de couleur ?",
    answers: ["pour se camoufler", "pour communiquer", "pour etre plus beau"],
    correctAnswer: "b",
  },
  {
    question: " Quel est le cri du cerf ?",
    answers: ["il rote", "il braie", "il rute"],
    correctAnswer: "a",
  },
  {
    question: " Que mange le koala ?",
    answers: ["du pop corn", "de la salade", "de l'eucalyptus"],
    correctAnswer: "c",
  },
  {
    question: "De quel famille fait partie l'okapi ?",
    answers: ["du cheval", "des antilope", "des girafe"],
    correctAnswer: "c",
  },
  {
    question: "Quel felin est le plus rapide ?",
    answers: ["Le lyon", "le guépard", "le jaguar"],
    correctAnswer: "b",
  },
  {
    question: "Quelle est la particularité du poisson appelé torpille ?",
    answers: ["il vole", "il est rapide", "il produit de l'electricité"],
    correctAnswer: "c",
  },
  {
    question: "Comment appelle t'on plus couramment le lombric ?",
    answers: ["le ver de terre", "le ver de vase", "le ver de farine"],
    correctAnswer: "a",
  },
  {
    question: "Lequel de ces animaux n'existe pas ?",
    answers: ["la panthère noire", "l'elephant blanc", "la souris verte"],
    correctAnswer: "c",
  },
  {
    question: "combien pése un éléphant ?",
    answers: ["environ 50 kg", "environ 500 kg", "environ 5000 kg"],
    correctAnswer: "c",
  },
];

const questionElement = document.getElementById("question");
const answerAElement = document.getElementById("answerA");
const answerBElement = document.getElementById("answerB");
const answerCElement = document.getElementById("answerC");
const resultElement = document.getElementById("result");
const submitBtn = document.getElementById("submitBtn");
const answersForm = document.getElementById("answersForm");
const scoreValueElement = document.getElementById("scoreValue");

let currentQuestionIndex = 0;
let score = 0;

function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answerAElement.textContent = currentQuestion.answers[0];
  answerBElement.textContent = currentQuestion.answers[1];
  answerCElement.textContent = currentQuestion.answers[2];
}

function checkAnswer() {
  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  if (!selectedAnswer) {
    resultElement.textContent = "Veuillez sélectionner une réponse.";
    return;
  }

  const userAnswer = selectedAnswer.value;
  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (userAnswer === correctAnswer) {
    if (score > 15) {
      resultElement.textContent = "Great Score!";
      resultElement.style.color = "blue";
    }
    if (score >= 10 && score < 15) {
      resultElement.textContent = "Good Score!";
      resultElement.style.color = "green";
    } else if (score < 10) {
      resultElement.textContent = "Average Score!";
      resultElement.style.color = "red";
    }

    score++;
    scoreValueElement.textContent = score + "/20";
  } else {
    //resultElement.textContent =
    // "Mauvaise réponse. La réponse correcte est : " +
    questions[currentQuestionIndex].answers[parseInt(correctAnswer)];
  }

  // Move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    answersForm.reset(); // Clear the selected answer
    resultElement.textContent = ""; // Clear the result message
  } else {
    questionElement.textContent = "Jeu terminé !";
    answersForm.style.display = "none";
    submitBtn.style.display = "none";
  }
}

// Event listener for the submit button
submitBtn.addEventListener("click", checkAnswer);

// Display the first question
displayQuestion();
//replay the
const replayButton = document.querySelector("#replayButton");
replayButton.addEventListener("click", () => {
  location.reload();
});
