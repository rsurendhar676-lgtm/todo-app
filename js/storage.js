var STORAGE_KEY = "todo-app.todos";

function loadTodos() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    var parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed;
  } catch (error) {
    return [];
  }
}

function saveTodos(todos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
