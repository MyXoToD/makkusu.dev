export class Furigana {
  constructor(selectors = []) {
    this.selectors = selectors;
    this.regex = /([\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]{1})\[(.*?)\]/g;

    this.selectors.forEach((selector) => {
      const results = document.querySelectorAll(selector);
      results.forEach((result) => {
        result.innerHTML = result.innerHTML.replace(this.regex, '<ruby>$1 <rp>(</rp><rt>$2</rt><rp>)</rp></ruby>');
      });
    });
  }
}

new Furigana(['.post-detail']);
