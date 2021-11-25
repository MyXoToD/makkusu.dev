import { Hub } from './hub.js';
import { Navigation } from './navigation.js';
import { Theme } from './theme.js';

document.addEventListener('DOMContentLoaded', () => {
    new Theme();
    new Hub();
    new Navigation();
});