const modal = document.querySelector("#edit-modal");
const backdrop = document.querySelector("#modal-backdrop");
const editText = document.querySelector("#edit-text");
const editUser = document.querySelector("#edit-user");

// Id de la tâche actuellement en cours d'édition
export let currentEditTaskId = null;

// Ouvre la modale d'édition avec les données de la tâche
export const openEditModal = (task) => {
  currentEditTaskId = task.id;
  editText.value = task.text;
  editUser.value = task.user;
  modal.classList.add("active");
  backdrop.classList.add("active");
  editText.focus();
};

// Ferme la modale d'édition et réinitialise l'ID de la tâche
export const closeEditModal = () => {
  currentEditTaskId = null;
  modal.classList.remove("active");
  backdrop.classList.remove("active");
};
