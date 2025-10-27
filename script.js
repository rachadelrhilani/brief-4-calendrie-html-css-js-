 // On récupère le modal Bootstrap via JS
  const modalElement = document.getElementById('reservationModal');
  const modal = new bootstrap.Modal(modalElement);
  const days = document.querySelectorAll('.day');

/*  */

 days.forEach(day => {
    day.addEventListener('click', () => {
      // Exemple : changer le titre du modal avec le jour cliqué
      const dayNumber = day.querySelector('.num').textContent;
      document.getElementById('reservationLabel').textContent = `Réservation du ${dayNumber} Octobre 2025`;
      
      modal.show();
    });
  });

  // Fermeture du modal avec les boutons personnalisés
  document.getElementById('closeModal').addEventListener('click', () => modal.hide());
  document.getElementById('closeModalFooter').addEventListener('click', () => modal.hide());