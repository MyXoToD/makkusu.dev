export class Furigana {
    constructor(selectors = []) {
        this.selectors = selectors;
        this.regex = /([\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]{1})\[(.*?)\]/g;

        this.selectors.forEach(selector => {
            let results = document.querySelectorAll(selector);
            results.forEach(result => {
                result.innerHTML = result.innerHTML.replace(this.regex, "<span class='furigana' data-furi='$2'>$1</span>");
            });
        });
    }
}