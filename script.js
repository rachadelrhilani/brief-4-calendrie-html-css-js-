/* creation de modal bootstrap */
const modalElement = document.getElementById('reservationModal');
const addmodal = new bootstrap.Modal(modalElement);
const days = document.querySelectorAll('.day');
const closeModel = document.getElementById('closeModal');
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
let selectday = null;
let currentresa = null;


/* affiche le modal ajouter*/

days.forEach(day => {
  day.addEventListener('click', (e) => {
    const dayNumber = day.querySelector('.num').textContent;
    if (e.target.tagName === 'P') return;
    document.getElementById('reservationLabel').textContent = `Réservation du ${dayNumber} Octobre 2025`;
    selectday = day;
    addmodal.show();
  });
});

closeModel.addEventListener('click', () => addmodal.hide()); /*cacher le modal*/

//============= Ajoute une reservation ==============

let btnajouter = document.querySelector("#reservationModal .btn-primary");
btnajouter.addEventListener("click", () => {
  const nom = document.getElementById("Nom").value.trim();
  const heuredebut = document.getElementById("heure-debut").value;
  const heurefin = document.getElementById("heure-fin").value;
  const nbrpers = document.getElementById("nbr-pers").value.trim();
  const typereserve = document.getElementById("type-reserve").value.trim();

  if (!nom || !selectday) {
    return alert("Veuillez entrer un nom (le nom doit contient seulemnt des lettres)");
  }
  if(heuredebut < "15:00" || heuredebut > heurefin|| heuredebut > "23:00" || heurefin  < "15:00" || heurefin > "23:00"){
    return alert("Veuillez entrer une heure entre 15:00 et 23:00.");
  }
  else if (/\d/.test(nom)) {
    return alert("Veuillez entrer un nom (le nom doit contient seulemnt des lettres)");
  }
  else if (!heuredebut || !heurefin) {
    return alert("Veuillez un date de debut ou la date de fin");
  }
  else if (!nbrpers) {
    return alert("Veuillez entre les nombres de personne");
  }
  else if (!typereserve) {
    return alert("Veuillez entre votre type de reservation");
  }
  // Créer la réservation
  const resa = {
    jour: selectday.querySelector(".num").textContent,
    nom: nom,
    heuredebut: heuredebut,
    heurefin: heurefin,
    nbrpersonne: nbrpers,
    typereserver: typereserve,
  };
  console.log(resa)

  // Sauvegarde dans localstorage
  const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
  allResa.push(resa);
  localStorage.setItem("reservations", JSON.stringify(allResa));

  const p = document.createElement("p");
  p.textContent = nom;
  selectday.appendChild(p);
  // Afficher le nom dans la case
  if (resa.typereserver === "Anniversaire") {
    p.style.backgroundColor = "green";
  }
  else if (resa.typereserver === "VIP") {
    p.style.backgroundColor = "red";
  }
  else if (resa.typereserver === "Événement spécial") {
    p.style.backgroundColor = "blue";
  }
  else if (resa.typereserver === "Sur place") {
    p.style.backgroundColor = "gray";
  }

  // Réinitialiser et fermer la modale
  let reserveForm = document.getElementById("reservationForm");
  reserveForm.reset();
  addmodal.hide();
});

/* ============================================================================================== */

/* affichage de module edit */
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'P') {
    const nom = e.target.textContent;
    const jour = e.target.closest('.day').querySelector('.num').textContent;

    const all = JSON.parse(localStorage.getItem('reservations') || '[]');
    currentresa = all.find(r => r.nom === nom && r.jour === jour);

    if (currentresa) {
      document.getElementById('editNom').value = currentresa.nom;
      document.getElementById('editDebut').value = currentresa.heuredebut;
      document.getElementById('editFin').value = currentresa.heurefin;
      document.getElementById('editPersonnes').value = currentresa.nbrpersonne;
      document.getElementById('editType').value = currentresa.typereserver;
      editModal.show();
    }
  }
});
/* ==========================================================
   MODIFIER LA RÉSERVATION
========================================================== */
document.getElementById('btnSave').addEventListener('click', () => {
  const all = JSON.parse(localStorage.getItem('reservations') || '[]');
  const index = all.findIndex(r => r.nom === currentresa.nom && r.jour === currentresa.jour);

  all[index] = {
    ...currentresa,
    nom: document.getElementById('editNom').value.trim(),
    heuredebut: document.getElementById('editDebut').value.trim(),
    heurefin: document.getElementById('editFin').value.trim(),
    nbrpersonne: document.getElementById('editPersonnes').value.trim(),
    typereserver: document.getElementById('editType').value.trim()
  };

  localStorage.setItem('reservations', JSON.stringify(all));
  location.reload(); // pour mettre à jour l’affichage
});

/* ==========================================================
   SUPPRIMER LA RÉSERVATION
========================================================== */
document.getElementById('btnDelete').addEventListener('click', () => {
  const all = JSON.parse(localStorage.getItem('reservations') || '[]');
  const updated = all.filter(r => !(r.nom === currentresa.nom && r.jour === currentresa.jour));
  localStorage.setItem('reservations', JSON.stringify(updated));
  location.reload();
});



// Charger les réservations existantes
window.addEventListener("DOMContentLoaded", () => {
  const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
  allResa.forEach(r => {
    const jour = [...days].find(d => d.querySelector(".num").textContent == r.jour);
    if (jour) {
      const p = document.createElement("p");
      p.textContent = r.nom;
      // Couleur selon le type
      if (r.typereserver === "Anniversaire") {
        p.style.backgroundColor = "green";
      } else if (r.typereserver === "VIP") {
        p.style.backgroundColor = "red";
      } else if (r.typereserver === "Événement spécial") {
        p.style.backgroundColor = "blue";
      }
      else if (r.typereserver === "Sur place") {
        p.style.backgroundColor = "gray";
      }
      jour.appendChild(p);
    }
  });
});

