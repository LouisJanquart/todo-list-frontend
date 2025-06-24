const form = document.querySelector("#task-form");
const taskTextInput = document.querySelector("#task__text-input");
const taskUserSelect = document.querySelector("#task__user-select");

export const initTaskForm = (onSubmit) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = taskTextInput.value.trim();
    const user = taskUserSelect.value;
    if (!text || !user) return;

    await onSubmit(text, user);
    form.reset();
  });
};
