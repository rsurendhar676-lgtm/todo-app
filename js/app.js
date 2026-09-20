var todos = loadTodos();
var currentFilter = "all";

function persistAndRender() {
  saveTodos(todos);
  render(todos, currentFilter);
}

function addTodo(title) {
  var trimmed = title.trim();
  if (!trimmed) {
    return;
  }

  todos.push({
    id: String(Date.now()) + "-" + Math.random().toString(16).slice(2),
    title: trimmed,
    completed: false,
    createdAt: Date.now(),
  });
  persistAndRender();
}

function toggleTodo(id) {
  todos.forEach(function (todo) {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });
  persistAndRender();
}

function deleteTodo(id) {
  todos = todos.filter(function (todo) {
    return todo.id !== id;
  });
  persistAndRender();
}

function updateTodoTitle(id, title) {
  var trimmed = title.trim();
  if (!trimmed) {
    persistAndRender();
    return;
  }

  todos.forEach(function (todo) {
    if (todo.id === id) {
      todo.title = trimmed;
    }
  });
  persistAndRender();
}

function clearCompleted() {
  todos = todos.filter(function (todo) {
    return !todo.completed;
  });
  persistAndRender();
}

function findTodo(id) {
  for (var i = 0; i < todos.length; i++) {
    if (todos[i].id === id) {
      return todos[i];
    }
  }
  return null;
}

document.getElementById("todo-form").addEventListener("submit", function (event) {
  event.preventDefault();
  var input = document.getElementById("todo-input");
  addTodo(input.value);
  input.value = "";
  input.focus();
});

document.querySelector(".filters").addEventListener("click", function (event) {
  var button = event.target.closest(".filter-btn");
  if (!button) {
    return;
  }
  currentFilter = button.getAttribute("data-filter");
  render(todos, currentFilter);
});

document.getElementById("clear-completed").addEventListener("click", function () {
  clearCompleted();
});

document.getElementById("todo-list").addEventListener("click", function (event) {
  var item = event.target.closest(".todo-item");
  if (!item) {
    return;
  }
  var id = item.dataset.id;

  if (event.target.classList.contains("toggle")) {
    toggleTodo(id);
    return;
  }

  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(id);
  }
});

document.getElementById("todo-list").addEventListener("dblclick", function (event) {
  var titleEl = event.target.closest(".title");
  if (!titleEl) {
    return;
  }
  var item = titleEl.closest(".todo-item");
  var id = item.dataset.id;
  var todo = findTodo(id);
  if (!todo) {
    return;
  }

  startEditing(
    item,
    todo.title,
    function (nextTitle) {
      updateTodoTitle(id, nextTitle);
    },
    function () {
      render(todos, currentFilter);
    }
  );
});

persistAndRender();
