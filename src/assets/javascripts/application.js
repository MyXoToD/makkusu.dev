import { Hub } from './hub.js';
import { Navigation } from './navigation.js';
import { Theme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    document.fonts.ready.then((fontFaceSet) => {
        console.log(fontFaceSet.size, 'FontFaces loaded.');
        document.body.classList.remove('waiting');
    });

    new Theme();
    new Hub();
    new Navigation();
});