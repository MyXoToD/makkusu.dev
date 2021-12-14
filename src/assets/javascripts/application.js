import { Furigana } from './furigana.js';
import { Hub } from './hub.js';
import { Navigation } from './navigation.js';
import { Post } from './post.js';
import { Theme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Remove waiting class from body once all fonts are loaded
    document.fonts.ready.then((fontFaceSet) => {
        document.body.classList.remove('waiting');
    });

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

    new Theme();
    new Hub();
    new Navigation();
    new Post();
    new Furigana(['.post__content']);
});