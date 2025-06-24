const API_URL = "http://localhost:3000/tasks";

export const fetchTasks = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addTask = async (text, user) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, user }),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateTask = async (id, data) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteTask = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
