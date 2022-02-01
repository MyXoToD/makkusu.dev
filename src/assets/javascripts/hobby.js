export class Hobby {
    constructor() {
        this.hobbies = document.querySelectorAll('.hobby');
        this.floatingLinks = document.querySelectorAll('.floating-nav a');

        if (!this.hobbies.length)
            return;
        
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll(e) {
        let scrollPos = window.scrollY;
        let active = this.hobbies[0];
        this.hobbies.forEach(hobby => {
            if (hobby.offsetTop - scrollPos < Math.abs(active.offsetTop - scrollPos))
                active = hobby;
        });
        
        this.floatingLinks.forEach(link => {
            link.classList.remove('floating-nav__link--highlight');
            if ('#' + active.id == link.getAttribute('href'))
                link.classList.add('floating-nav__link--highlight');
        });
    }
}