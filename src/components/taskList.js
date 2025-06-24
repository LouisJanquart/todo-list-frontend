const taskList = document.querySelector("#task-list");

// Fonction pour échapper les caractères spéciaux en HTML
const escapeHtml = (str) => {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

// Fonction pour rendre la liste des tâches
export const renderTasks = (tasks) => {
  taskList.innerHTML = `
    <ul class="task-list">
      ${tasks
        .map(
          (task) => `
          <li class="task" data-id="${task.id}" tabindex="0">
            <div class="task__infos">
              <label class="task__checkbox">
                <span class="material-symbols-outlined">check</span>
                <input
                  type="checkbox"
                  class="task-checkbox"
                  aria-checked="${task.done ? "true" : "false"}"
                  ${task.done ? "checked" : ""}
                />
              </label>
              <span class="task__text">${escapeHtml(task.text)}</span>
            </div>
            <span class="task__user">${escapeHtml(task.user)}</span>
            <div class="task__actions">
              <button class="edit-btn button button--icon" title="Modifier la tâche" aria-label="Modifier la tâche">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="delete-btn button button--icon" title="Supprimer la tâche" aria-label="Supprimer la tâche">
                <span class="material-symbols-outlined">delete</span>
              </button>
            </div>
          </li>
        `
        )
        .join("")}
    </ul>
  `;
};
