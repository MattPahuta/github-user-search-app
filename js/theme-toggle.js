const storageKey = 'theme-preference';

function handleClick() {
  theme.value = theme.value === 'light'
    ? 'dark'
    : 'light'

  setPreference()
  handleThemeToggleState();
}

function getColorPreference() {
  if (localStorage.getItem(storageKey)) {
    return localStorage.getItem(storageKey);
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  setDataTheme();
}

function setDataTheme() {
  const documentRoot = document.firstElementChild;
  documentRoot.setAttribute('data-theme', theme.value);
}

function handleThemeToggleState() {
  const toggleText = document.getElementById('themeToggleText');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const isDark = theme.value === 'dark';
  toggleText.textContent = isDark ? 'Light' : 'Dark';
  moonIcon.classList.toggle('visually-hidden', isDark);
  sunIcon.classList.toggle('visually-hidden', !isDark);
}

const theme = {
  value: getColorPreference(),
}

setDataTheme();

window.onload = () => {
  setDataTheme()
  handleThemeToggleState();
  document.getElementById('themeToggle').addEventListener('click', handleClick);
}

window
  .matchMedia('(prefers-color-scheme: dark)')
  .addEventListener('change', ({ matches: isDark }) => {
    theme.value = isDark ? 'dark' : 'light'
    setPreference()
  })