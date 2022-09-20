export function getTheme() {
  return localStorage.getItem("theme") === "dark";
}

export function saveTheme(theme) {
  localStorage.setItem("theme", theme ? "dark" : "light");
}
