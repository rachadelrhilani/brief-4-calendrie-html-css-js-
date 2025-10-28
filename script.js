/* creation de modal bootstrap */
  const modalElement = document.getElementById('reservationModal');
  const modal = new bootstrap.Modal(modalElement);
  const days = document.querySelectorAll('.day');
  let selectedDay = null;
  const closeModel =  document.getElementById('closeModal');

/* ajoute un evenement de click les jours*/

 days.forEach(day => {
    day.addEventListener('click', () => {
      const dayNumber = day.querySelector('.num').textContent;
      document.getElementById('reservationLabel').textContent = `Réservation du ${dayNumber} Octobre 2025`;
      selectedDay = day;
      modal.show(); /*afficher le modal*/
    });
  });

 closeModel.addEventListener('click', () => modal.hide()); /*cacher le modal*/

 // ajoute une reservation

  document.querySelector("#reservationModal .btn-primary").addEventListener("click", () => {

    const nom = document.getElementById("Nom").value.trim();

    if (!nom || !selectedDay){
       return alert("Veuillez entrer un nom.");
    }

    // Créer la réservation
    const resa = {
      jour: selectedDay.querySelector(".num").textContent,
      nom: nom,

    };

    // Sauvegarde dans localStorage
    const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
    allResa.push(resa);
    localStorage.setItem("reservations", JSON.stringify(allResa));

    // Afficher le nom dans la case
    const p = document.createElement("p");
    p.textContent = nom;
    selectedDay.appendChild(p);

    // Réinitialiser et fermer la modale
    document.getElementById("reservationForm").reset();
    modal.hide();
  });

  // Charger les réservations existantes
  window.addEventListener("DOMContentLoaded", () => {
    const allResa = JSON.parse(localStorage.getItem("reservations") || "[]");
    allResa.forEach(r => {
      const jour = [...document.querySelectorAll(".day")]
        .find(d => d.querySelector(".num").textContent == r.jour);
      if (jour) {
        const p = document.createElement("p");
        p.textContent = r.nom;
        jour.appendChild(p);
      }
    });
  });

 