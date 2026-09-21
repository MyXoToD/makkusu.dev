const icons = {
  light: document.querySelector('.theme-switcher__icon--light'),
  dark: document.querySelector('.theme-switcher__icon--dark'),
};
const switcher = document.querySelector('.theme-switcher');

switcher.addEventListener('click', toggleTheme);

function toggleTheme() {
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)') ? 'dark' : 'light');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  const root = document.documentElement;

  document.startViewTransition(() => {
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  });

  const { top, left, width, height } = switcher.getBoundingClientRect();
  const x = Math.round(left + width / 2);
  const y = Math.round(top + height / 2);

  root.style.setProperty('--theme-x', `${x}px`);
  root.style.setProperty('--theme-y', `${y}px`);
  root.style.setProperty('--theme-r', `${getCircleRadius(x, y)}px`);
}

function getCircleRadius(x, y) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  const distances = [Math.hypot(x, y), Math.hypot(x - width, y), Math.hypot(x, y - height), Math.hypot(x - width, y - height)];

  return Math.max(...distances);
}
