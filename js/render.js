function getFilteredTodos(todos, filter) {
  if (filter === "active") {
    return todos.filter(function (todo) {
      return !todo.completed;
    });
  }
  if (filter === "completed") {
    return todos.filter(function (todo) {
      return todo.completed;
    });
  }
  return todos.slice();
}

function render(todos, filter) {
  var listEl = document.getElementById("todo-list");
  var emptyEl = document.getElementById("empty-state");
  var countEl = document.getElementById("todo-count");
  var filterButtons = document.querySelectorAll(".filter-btn");
  var visible = getFilteredTodos(todos, filter);

  listEl.innerHTML = "";

  visible.forEach(function (todo) {
    var item = document.createElement("li");
    item.className = "todo-item" + (todo.completed ? " completed" : "");
    item.dataset.id = todo.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className = "toggle";
    checkbox.setAttribute("aria-label", "Mark \"" + todo.title + "\" complete");

    var title = document.createElement("p");
    title.className = "title";
    title.textContent = todo.title;

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.setAttribute("aria-label", "Delete " + todo.title);

    item.appendChild(checkbox);
    item.appendChild(title);
    item.appendChild(deleteBtn);
    listEl.appendChild(item);
  });

  emptyEl.hidden = visible.length > 0;

  var remaining = todos.filter(function (todo) {
    return !todo.completed;
  }).length;
  countEl.textContent =
    remaining === 1 ? "1 item left" : remaining + " items left";

  filterButtons.forEach(function (button) {
    var isActive = button.getAttribute("data-filter") === filter;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function startEditing(itemEl, currentTitle, onSave, onCancel) {
  var titleEl = itemEl.querySelector(".title");
  if (!titleEl) {
    return;
  }

  var input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = currentTitle;
  input.setAttribute("aria-label", "Edit todo");

  titleEl.replaceWith(input);
  input.focus();
  input.select();

  var finished = false;

  function finish(save) {
    if (finished) {
      return;
    }
    finished = true;
    if (save) {
      onSave(input.value);
    } else {
      onCancel();
    }
  }

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      finish(true);
    } else if (event.key === "Escape") {
      finish(false);
    }
  });

  input.addEventListener("blur", function () {
    finish(true);
  });
}
