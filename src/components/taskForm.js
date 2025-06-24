const form = document.querySelector("#task-form");
const taskTextInput = document.querySelector("#task__text-input");
const taskUserSelect = document.querySelector("#task__user-select");

// Initialisation du formulaire de tâche
export const initTaskForm = (onSubmit) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = taskTextInput.value.trim();
    const user = taskUserSelect.value;

    if (!text || !user) return;

    const submitButton = form.querySelector("button[type='submit']");
    submitButton.disabled = true;

    try {
      await onSubmit(text, user);
      form.reset();
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      alert("Erreur lors de l'ajout de la tâche. Veuillez réessayer.");
    }

    submitButton.disabled = false;
  });
};
