import { Hub } from './hub.js';
import { Theme } from './theme.js';
import { Furigana } from './furigana.js';

document.addEventListener('DOMContentLoaded', (e) => {
  // Add age to about page
  function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
  const ageContainer = document.querySelector('.age');
  if (ageContainer) {
    ageContainer.textContent = getAge(atob('MTk5My0wMi0yMg=='));
  }

  new Hub();
  new Theme();
  new Furigana();
});
