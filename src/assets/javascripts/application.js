import { Hub } from './hub.js';
import { Theme } from './theme.js';
import { Furigana } from './furigana.js';

document.addEventListener('DOMContentLoaded', (e) => {
  // Add age to about page
  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
  let ageContainer = document.querySelector('.age');
  if (ageContainer) {
      ageContainer.textContent = getAge('1993-02-22');
  }

  new Hub();
  new Theme();
  new Furigana();
});