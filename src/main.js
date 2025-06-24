import "./scss/style.scss";

import {
  fetchTasks,
  addTask,
  updateTask,
  deleteTask,
} from "./api/tasksService.js";
import { renderTasks } from "./components/taskList.js";
import {
  openEditModal,
  closeEditModal,
  currentEditTaskId,
} from "./components/modal.js";
import { initTaskForm } from "./components/taskForm.js";

// Sélection des éléments du DOM
const taskList = document.querySelector("#task-list");
const backdrop = document.querySelector("#modal-backdrop");
const cancelEdit = document.querySelector("#cancel-edit");
const saveEdit = document.querySelector("#save-edit");
const editText = document.querySelector("#edit-text");
const editUser = document.querySelector("#edit-user");

// Fonction pour charger et afficher les tâches depuis l'API
const loadAndRenderTasks = async () => {
  try {
    const tasks = await fetchTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error("Erreur lors du chargement des tâches :", error);
  }
};

// Gestion du clic sur la liste des tâches pour gérer la suppression et l'édition
taskList.addEventListener("click", async (event) => {
  const li = event.target.closest("li.task"); // Trouve l'élément <li> parent de la tâche cliquée
  if (!li) return;

  const id = li.dataset.id;

  if (event.target.closest(".delete-btn")) {
    // Suppression de la tâche
    try {
      await deleteTask(id);
      await loadAndRenderTasks();
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      alert("Erreur lors de la suppression de la tâche. Veuillez réessayer.");
    }
  }

  if (event.target.closest(".edit-btn")) {
    // Ouverture de la modale d'édition avec les données actuelles de la tâche
    const textEl = li.querySelector(".task__text");
    const userEl = li.querySelector(".task__user");
    const text = textEl ? textEl.textContent : "";
    const user = userEl ? userEl.textContent : "";
    openEditModal({ id, text, user });
  }
});

// Gestion du changement d'état de la checkbox de la tâche
taskList.addEventListener("change", async (event) => {
  if (event.target.classList.contains("task-checkbox")) {
    const li = event.target.closest("li.task");
    const id = li.dataset.id;
    const done = event.target.checked;
    try {
      await updateTask(id, { done });
      await loadAndRenderTasks();
    } catch (error) {
      console.error("Erreur mise à jour done :", error);
      alert(
        "Erreur lors de la mise à jour de l'état de la tâche. Veuillez réessayer."
      );
    }
  }
});

// Fermeture de la modale d'édition au clic sur Annuler
cancelEdit.addEventListener("click", () => {
  closeEditModal();
});

// Fermeture de la modale d'édition au clic en dehors de la modale
backdrop.addEventListener("click", () => {
  closeEditModal();
});

// Sauvegarde des modifications de la tâche lors du clic sur Sauvegarder
saveEdit.addEventListener("click", async () => {
  const newText = editText.value.trim();
  const newUser = editUser.value;
  if (!newText || !newUser) return; // Vérifie que les champs ne sont pas vides

  saveEdit.disabled = true; // Désactive le bouton pour éviter les doubles clics
  try {
    await updateTask(currentEditTaskId, { text: newText, user: newUser });
    closeEditModal();
    await loadAndRenderTasks();
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la tâche :", error);
    alert("Erreur lors de la mise à jour de la tâche. Veuillez réessayer.");
  }
  saveEdit.disabled = false; // Réactive le bouton après la requête
});

// Initialisation du formulaire d'ajout de tâche
initTaskForm(async (text, user) => {
  try {
    await addTask(text, user);
    await loadAndRenderTasks();
  } catch (error) {
    console.error("Erreur lors de l'ajout de la tâche :", error);
    alert("Erreur lors de l'ajout de la tâche. Veuillez réessayer.");
  }
});

// Chargement initial des tâches
loadAndRenderTasks();
