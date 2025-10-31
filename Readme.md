# 🗓️ Application de Réservation — JavaScript + Bootstrap

## 📘 Description
Cette application web permet de **gérer des réservations** à travers un **calendrier interactif**.  
Elle a été développée en **HTML, CSS (Bootstrap)** et **JavaScript**, avec stockage local via **LocalStorage**.

L’utilisateur peut :
- Ajouter une réservation sur un jour précis,
- Modifier ou supprimer une réservation existante,
- Rechercher une réservation par nom,
- Et supprimer toutes les réservations d’un clic.

Toutes les données sont sauvegardées localement dans le navigateur.
---

## 🧭 Structure du projet
```
📂 brief 4/
│
│
├── 📁 css/
│   ├── style.css              # Styles personnalisés du calendrier et des modales
│
├── 📁 js/
│   ├── script.js              # Logique principale (ajout, modification, recherche, suppression)
│
├── 📁 images/
│   ├── logo.png               # Logo du site (optionnel)
│
├── 📄 README.md               # Documentation complète du projet
│
├── 📄 index.html              # Fichier principal de la page
```

---

## 🧱 Technologies utilisées
| Technologie | Rôle |
|--------------|------|
| **HTML5** | Structure de la page |
| **CSS3 / Bootstrap 5** | Mise en forme et design responsive |
| **JavaScript (ES6)** | Logique du projet et gestion des événements |
| **LocalStorage** | Sauvegarde des données localement |

---

## ⚙️ Fonctionnalités principales

### 🗓️ 1. Gestion du calendrier
- Chaque jour du mois est affiché dans une **grille Bootstrap**.
- Un clic sur une date ouvre un **modal Bootstrap** permettant d’ajouter une réservation.

---

### ➕ 2. Ajout de réservation
Lorsqu’on ajoute une réservation, l’utilisateur doit saisir :
- **Nom du client**
- **Heure de début et heure de fin**
- **Nombre de personnes**
- **Type de réservation** : sur place, VIP, anniversaire, événement spécial…

✅ Le système vérifie :
- Que le nom contient uniquement des lettres.  
- Que les heures sont comprises entre **15:00 et 23:00**.  
- Qu’il n’existe **aucun chevauchement horaire** sur le même jour.

---

### ✏️ 3. Modification / Suppression
- Un clic sur un **nom déjà réservé** ouvre un second modal.  
- On peut modifier les informations ou **supprimer la réservation** correspondante.  
- Les vérifications d’heures et de format sont également appliquées lors de la modification.

---

### 🔍 4. Recherche par nom
- Une **barre de recherche** dans le header permet de filtrer les réservations affichées selon le nom du client.  
- La recherche se met à jour automatiquement pendant la saisie.

---

### 🗑️ 5. Suppression totale
- Un **bouton “Supprimer tout”** permet d’effacer toutes les réservations du `localStorage`.  
- Le calendrier est ainsi réinitialisé.

---

### 💾 6. Sauvegarde automatique
- Toutes les réservations sont stockées automatiquement dans le **localStorage**.  
- Lors du rechargement de la page, les réservations sont **rechargées et affichées** dans le calendrier.



