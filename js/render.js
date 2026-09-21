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
    item.className =
      "todo-item flex items-center gap-3 border-b border-slate-200 px-3 py-3 last:border-b-0 sm:px-4 dark:border-slate-700" +
      (todo.completed ? " completed" : "");
    item.dataset.id = todo.id;

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.className =
      "toggle h-4 w-4 shrink-0 accent-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500";
    checkbox.setAttribute("aria-label", "Mark \"" + todo.title + "\" complete");

    var title = document.createElement("p");
    title.className =
      "title m-0 flex-1 break-words" +
      (todo.completed
        ? " text-slate-400 line-through dark:text-slate-500"
        : " text-slate-800 dark:text-slate-100");
    title.textContent = todo.title;

    var deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className =
      "delete-btn shrink-0 rounded-lg border border-transparent px-2 py-1 text-sm text-red-600 transition-colors duration-200 hover:border-red-200 hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 dark:text-red-400 dark:hover:border-red-900 dark:hover:bg-red-950/60";
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
  input.className =
    "edit-input min-h-9 flex-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100";
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
