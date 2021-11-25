export class Theme {
    constructor() {
        this.defaultTheme = 'dark';
        this.prefersDarkScheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        this.prefersLightScheme = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
        this.theme = this.getTheme();
        this.applyTheme();
    }

    getTheme() {
        if (localStorage.getItem('theme')) {
            return localStorage.getItem('theme');
        } else {
            if (this.prefersDarkScheme) {
                return 'dark';
            } else if (this.prefersLightScheme) {
                return 'light';
            } else {
                return this.defaultTheme;
            }
        }
    }

    applyTheme() {
        document.body.classList.add('theme', 'theme--' + this.theme);
    }
}