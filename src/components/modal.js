const modal = document.querySelector("#edit-modal");
const backdrop = document.querySelector("#modal-backdrop");
const editText = document.querySelector("#edit-text");
const editUser = document.querySelector("#edit-user");

export let currentEditTaskId = null;

export const openEditModal = (task) => {
  currentEditTaskId = task.id;
  editText.value = task.text;
  editUser.value = task.user;
  modal.classList.add("active");
  backdrop.classList.add("active");
};

export const closeEditModal = () => {
  currentEditTaskId = null;
  modal.classList.remove("active");
  backdrop.classList.remove("active");
};
