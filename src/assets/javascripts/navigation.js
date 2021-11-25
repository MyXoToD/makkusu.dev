export class Navigation {
    constructor() {
        this.button = document.querySelector('.navigation__button');
        this.navigation = document.querySelector('.navigation');

        this.button.addEventListener('click', this.toggleNavigation.bind(this));
    }

    toggleNavigation() {
        this.navigation.classList.toggle('navigation--open');
        this.button.classList.toggle('navigation__button--active');
    }
}