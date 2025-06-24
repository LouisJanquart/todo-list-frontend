const taskList = document.querySelector("#task-list");

export const renderTasks = (tasks) => {
  taskList.innerHTML = `
    <ul class="task-list">
      ${tasks
        .map(
          (task) => `
          <li class="task" data-id="${task.id}">
            <div class="task__infos">
              <label class="task__checkbox">
                <span class="material-symbols-outlined">check</span>
                <input type="checkbox" ${
                  task.done ? "checked" : ""
                } class="task-checkbox" />
              </label>
              <span class="task__text">${task.text}</span>
            </div>
            <span class="task__user">${task.user}</span>
            <div class="task__actions">
              <button class="edit-btn button button--icon" title="Modifier la tâche">
                <span class="material-symbols-outlined">edit</span>
              </button>
              <button class="delete-btn button button--icon" title="Supprimer la tâche">
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
