// ---
// permalink: /assets/javascripts/application.min.js
// layout: null
// ---

import { Furigana } from './furigana.js';
import { Hub } from './hub.js';
import { Theme } from './theme.js';

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
  // const particles = new Particles('#particles', {
  //   dotColor: 'rgba(255, 255, 255, 0.2)',
  //   lineColor: '#ffffff',
  //   // particlesCount: 50,
  // });
});

/*if (greetingsContainer) {
  setInterval(() => {
    let content = greetingsContainer.textContent;
    if (writing) {
      // Write new word
      if (content.length != greetings[index].length) {
        // Not finished typing
        content.textContent += greetings[index][charIndex];
        charIndex++;
      }
    } else {
      // Delete word
    }
  }, typingSpeed);
}*/

const greetings = ['Hello', 'こんにちは', 'Guten Tag', 'Bonjour', 'Hola', 'Ciao', '안녕하세요', '你好'];
const greetingsContainer = document.querySelector('.greetings');
let typingSpeed = 100;
let index = 0;
let charIndex = 0;
let writing = true;
function typeGreetings() {
  let content = greetingsContainer.textContent;

  if (writing) {
    // Write word
    if (content.length !== greetings[index].length) {
      // Add next char
      greetingsContainer.textContent += greetings[index][charIndex];
      charIndex++;
    } else {
      charIndex = 0;
      index = (index + 1) % greetings.length;
      typingSpeed = 3000;
      writing = false;
    }
  } else {
    if (content.length > 0) {
      // Remove char
      greetingsContainer.textContent = content.substring(0, content.length - 1);
      typingSpeed = 100;
    } else {
      writing = true;
    }
  }

  setTimeout(typeGreetings, typingSpeed);
}

if (greetingsContainer) {
  typeGreetings();
}

// TODO: Use for reading list?
function rate(number) {
  return '★★★★★☆☆☆☆☆'.slice(5 - stars, 10 - stars);
}
