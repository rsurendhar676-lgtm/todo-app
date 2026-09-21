var THEME_KEY = "todo-app.theme";

function readSavedTheme() {
  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch (error) {}
  return null;
}

function getPreferredTheme() {
  var saved = readSavedTheme();
  if (saved) {
    return saved;
  }
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

function syncThemeToggle(theme) {
  var toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }
  var isDark = theme === "dark";
  toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

function applyTheme(theme) {
  var isDark = theme === "dark";
  document.documentElement.classList.toggle("dark", isDark);
  document.documentElement.style.colorScheme = theme;
  syncThemeToggle(theme);
}

function initTheme() {
  applyTheme(getPreferredTheme());

  var toggle = document.getElementById("theme-toggle");
  if (!toggle) {
    return;
  }

  toggle.addEventListener("click", function () {
    var next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  });
}

initTheme();
