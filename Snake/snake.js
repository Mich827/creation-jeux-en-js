const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
let snake = [{ x: 15 * boxSize, y: 15 * boxSize }];
let direction = "RIGHT";
let food = {
  x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
  y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
};
let score = 0;
let foodEaten = 0;
let paused = false;

document.addEventListener("keydown", (event) => {
  const key = event.keyCode;
  if (event.key === " ") {
    paused = !paused; // Basculer l'état de pause
  } else if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
});

function drawGame() {
  if (paused) {
    ctx.font = "48px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("PAUSE", canvas.width / 2, canvas.height / 2);
    return; // Ne pas mettre à jour le jeu si en pause
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner la nourriture
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Dessiner chaque segment du serpent
  for (let i = 0; i < snake.length; i++) {
    let segment = snake[i];
    ctx.fillStyle = "green"; // Couleur par défaut pour le corps

    // Dessiner la tête différemment
    if (i === 0) {
      ctx.fillStyle = "blue"; // Couleur pour la tête

      // Dessiner une ellipse pour la tête
      ctx.beginPath();
      ctx.ellipse(
        segment.x + boxSize / 2,
        segment.y + boxSize / 2,
        boxSize / 2,
        boxSize / 3,
        0,
        0,
        2 * Math.PI
      );
      ctx.fill();

      // Dessiner les yeux en fonction de la direction
      ctx.fillStyle = "black";
      if (direction === "RIGHT") {
        ctx.beginPath();
        ctx.arc(
          segment.x + (boxSize * 3) / 4,
          segment.y + boxSize / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil gauche (pour une tête orientée à droite)
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          segment.x + (boxSize * 3) / 4,
          segment.y + (boxSize * 3) / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil droit
        ctx.fill();
      } else if (direction === "LEFT") {
        ctx.beginPath();
        ctx.arc(
          segment.x + boxSize / 4,
          segment.y + boxSize / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil gauche
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          segment.x + boxSize / 4,
          segment.y + (boxSize * 3) / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil droit
        ctx.fill();
      } else if (direction === "UP") {
        ctx.beginPath();
        ctx.arc(
          segment.x + boxSize / 4,
          segment.y + boxSize / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil gauche
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          segment.x + (boxSize * 3) / 4,
          segment.y + boxSize / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil droit
        ctx.fill();
      } else if (direction === "DOWN") {
        ctx.beginPath();
        ctx.arc(
          segment.x + boxSize / 4,
          segment.y + (boxSize * 3) / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil gauche
        ctx.fill();
        ctx.beginPath();
        ctx.arc(
          segment.x + (boxSize * 3) / 4,
          segment.y + (boxSize * 3) / 4,
          boxSize / 8,
          0,
          2 * Math.PI
        ); // Œil droit
        ctx.fill();
      }
    } else {
      ctx.fillRect(segment.x, segment.y, boxSize, boxSize); // Dessiner un carré pour le corps
    }
  }

  // Déplacer le serpent
  let head = { ...snake[0] };
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "DOWN") head.y += boxSize;

  // Vérifier si le serpent mange la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    foodEaten++; // Incrémentation du nombre de nourritures mangées
    food = {
      x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
      y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
    };
  } else {
    snake.pop();
  }

  // Vérifier les collisions
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > canvas.width ||
    head.y > canvas.height ||
    snake.some((segment) => segment.x === head.x && segment.y === head.y)
  ) {
    clearInterval(intervalId); // Arrêter l'intervalle
    alert("Game Over! Score : " + score);
    resetGame(); // Réinitialiser le jeu
    return;
  }

  snake.unshift(head);

  updateSpeed();
}

function resetGame() {
  clearInterval(intervalId);
  snake = [{ x: 15 * boxSize, y: 15 * boxSize }];
  direction = "RIGHT";
  food = {
    x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
    y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize,
  };
  score = 0;
  foodEaten = 0;
  speed = 150; // Réinitialiser la vitesse
  intervalId = setInterval(drawGame, speed);
}

let speed = 150; // Vitesse initiale
let intervalId = setInterval(drawGame, speed);

function updateSpeed() {
  if (foodEaten >= 3 && speed > 100) {
    clearInterval(intervalId);
    speed = Math.max(speed - 20, 100); // Réduire l'intervalle (augmenter la vitesse) mais pas en dessous de 50 ms
    intervalId = setInterval(drawGame, speed);
  }
}
