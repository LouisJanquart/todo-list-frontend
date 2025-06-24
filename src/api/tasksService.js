const API_URL = "http://localhost:3000/tasks"; // URL de base de l'API

// Récupère toutes les tâches depuis l'API
export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur fetchTasks:", error);
    alert("Erreur lors du chargement des tâches. Veuillez réessayer.");
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

// Ajoute une nouvelle tâche via l'API
export const addTask = async (text, user) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, user }),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur addTask:", error);
    alert("Erreur lors de l'ajout de la tâche. Veuillez réessayer.");
    return null;
  }
};

// Met à jour une tâche existante via l'API
export const updateTask = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur updateTask:", error);
    alert("Erreur lors de la mise à jour de la tâche. Veuillez réessayer.");
    return null;
  }
};

// Supprime une tâche via l'API
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Erreur deleteTask:", error);
    alert("Erreur lors de la suppression de la tâche. Veuillez réessayer.");
    return false;
  }
};
