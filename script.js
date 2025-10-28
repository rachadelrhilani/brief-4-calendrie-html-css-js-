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

// ajoute une reservation
let btnajouter = document.querySelector("#reservationModal .btn-primary");
btnajouter.addEventListener("click", () => {

  const nom = document.getElementById("Nom").value.trim();
  const heuredebut = document.getElementById("heure-debut").value.trim();
  const heurefin = document.getElementById("heure-fin").value.trim();
  const nbrpers = document.getElementById("nbr-pers").value.trim();
  const typereserve = document.getElementById("type-reserve").value.trim();

  if (!nom || !selectday) {
    return alert("Veuillez entrer un nom.");
  }

  // Créer la réservation
  const resa = {
    jour: selectday.querySelector(".num").textContent,
    nom: nom,
    heuredebut: heuredebut,
    heurefin: heurefin,
    nbrpersonne: nbrpers,
    typereserver: typereserve
  };

  // Sauvegarde dans localStorage
  const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
  allResa.push(resa);
  localStorage.setItem("reservations", JSON.stringify(allResa));

  // Afficher le nom dans la case
  const p = document.createElement("p");
  p.textContent = nom;
  selectday.appendChild(p);

  // Réinitialiser et fermer la modale
  let reserveForm = document.getElementById("reservationForm")
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









// Charger les réservations existantes
window.addEventListener("DOMContentLoaded", () => {
  const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
  allResa.forEach(r => {
    const jour = [...days].find(d => d.querySelector(".num").textContent == r.jour);
    if (jour) {
      const p = document.createElement("p");
      p.textContent = r.nom;
      jour.appendChild(p);
    }
  });
});

