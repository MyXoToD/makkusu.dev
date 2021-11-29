export class Post {
    constructor() {
        this.progress = document.querySelector('.post__progress');
        if (this.progress)
            window.onscroll = this.setScrollProgress.bind(this);
    }

    setScrollProgress() {
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrolled = (winScroll / height) * 100;
        this.progress.style.setProperty('--w', scrolled + '%');
    }
}