let articles = [
  { nom: "Réfrigérateur", prix: 500, image: "image/frigo.jpg" },
  { nom: "Lave-linge", prix: 300, image: "image/machinelinge.jpg" },
  { nom: "Lave-vaisselle", prix: 400, image: "image/lavevaisselle.jpg" },
  { nom: "Four à micro-ondes", prix: 100, image: "image/microonde.jpg" },
  { nom: "mixeur", prix: 50, image: "image/mixer.jpg" },
  { nom: "Aspirateur", prix: 200, image: "image/aspirateur.jpg" },
  { nom: "Fer à repasser", prix: 20, image: "image/ferrepasser.jpg" },
  { nom: "Sèche-linge", prix: 250, image: "image/machinelinge.jpg" },
  { nom: "Plaque de cuisson", prix: 150, image: "image/plaquecuisson.jpg" },
  { nom: "Machine à café", prix: 80, image: "image/cafe.jpg" },
  { nom: "Téléviseur", prix: 250, image: "image/tv.jpg" },
  { nom: "Projecteur", prix: 150, image: "image/projecteur.jpg" },
  { nom: "ordi portable", prix: 80, image: "image/ordiport.jpg" },
];

let articleATrouver = articles[Math.floor(Math.random() * articles.length)];
let prixATrouver = articleATrouver.prix;
let essaisRestants = 10; // Nombre d'essais autorisés
let essaisEffectues = 0; // Compteur d'essais effectués

document
  .getElementById("checkPropalButton")
  .addEventListener("click", verifierProposition);

// Afficher le nom et l'image de l'article
document.getElementById("articleImage").src = articleATrouver.image;
document.getElementById(
  "articleName"
).innerText = `Devinez le prix de l'article : ${articleATrouver.nom}`;

function verifierProposition() {
  let proposition = parseInt(document.getElementById("userPropalInput").value);

  if (isNaN(proposition)) {
    afficherMessage("Veuillez entrer un nombre.");
    return;
  }

  essaisEffectues++;
  essaisRestants--;

  if (proposition < prixATrouver) {
    afficherMessage(`Trop bas. Essais restants : ${essaisRestants}.`);
  } else if (proposition > prixATrouver) {
    afficherMessage(`Trop haut. Essais restants : ${essaisRestants}.`);
  } else {
    afficherMessage(
      `Félicitations ! Vous avez trouvé le prix de l'article ${articleATrouver.nom} en ${essaisEffectues} essais.`
    );
    arreterJeu();
  }

  if (essaisRestants === 0 && proposition !== prixATrouver) {
    afficherMessage(
      `Désolé, vous avez épuisé vos essais. Le prix de l'article ${articleATrouver.nom} était ${prixATrouver}.`
    );
    arreterJeu();
  }

  document.getElementById("userPropalInput").value = "";
}

function afficherMessage(message) {
  document.getElementById("resultDiv").innerText = message;
}

function arreterJeu() {
  document.getElementById("checkPropalButton").disabled = true;
  setTimeout(() => {
    if (confirm("Voulez-vous rejouer ?")) {
      reinitialiserJeu();
    }
  }, 2000);
}

function reinitialiserJeu() {
  articleATrouver = articles[Math.floor(Math.random() * articles.length)];
  prixATrouver = articleATrouver.prix;
  essaisRestants = 10;
  essaisEffectues = 0;
  document.getElementById("checkPropalButton").disabled = false;
  document.getElementById("articleImage").src = articleATrouver.image;
  document.getElementById(
    "articleName"
  ).innerText = `Devinez le prix de l'article : ${articleATrouver.nom}`;
  document.getElementById("resultDiv").innerText = "";
}
