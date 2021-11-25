export class Hub {
    constructor() {
        this.hub = document.querySelector('.hub');
        if (!this.hub)
            return;
        this.hubLinks = this.hub.querySelectorAll('.hub__link');
        this.hubKanjis = Array.from(this.hub.querySelectorAll('.hub__kanji'));

        this.hubLinks.forEach(hubLink => {
            hubLink.addEventListener('mouseover', this.toggleKanji.bind(this));
            hubLink.addEventListener('mouseleave', this.toggleKanji.bind(this));
        });
    }

    getKanjiElement(id) {
        let kanji = this.hubKanjis.filter(kanji => kanji.getAttribute('data-kanji') == id);
        return kanji[0];
    }

    toggleKanji(e) {
        let link = e.currentTarget;
        let kanjiNo = link.getAttribute('data-kanji');
        let kanji = this.getKanjiElement(kanjiNo);
        kanji.classList.toggle('hub__kanji--visible');
    }
}