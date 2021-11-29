import { Hub } from './hub.js';
import { Navigation } from './navigation.js';
import { Post } from './post.js';
import { Theme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    // Remove waiting class from body once all fonts are loaded
    document.fonts.ready.then((fontFaceSet) => {
        document.body.classList.remove('waiting');
    });

    new Theme();
    new Hub();
    new Navigation();
    new Post();
});