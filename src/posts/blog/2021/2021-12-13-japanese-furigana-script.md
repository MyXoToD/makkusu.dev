---
tags:
  - japanese
  - coding
title: Japanese Furigana Script
date: 2021-12-13T11:23:00Z
cover: /assets/images/posts/blog/2021/2021-12-13-yotsubato.webp
excerpt: A little script to help display furigana over kanji
---

While finalizing the current version of this website using 11ty, I took the time to implement a super small script to help me display _furigana_ for kanji. Furigana are small written hiragana on top of kanji. To keep it clean I only wanted to show the furigana when the respective kanji is hovered. The thought behind is being present with a _kanji-only_ mode at first and only seeing the helping _furigana_ when actually needed, might help while learning the language. I noticed that I'm always reading the furigana instead of the kanji whenever it is present, so I thought hiding it on the first sight would be useful.  
Here is an example block of how it looks.

<p class="jp">
    こんにちは。私[わたし]の名[な]前[まえ]はマックスです。お元[げん]気[き]ですか。
</p>

In case you're interested how it works, here is the code. A little description you can find below.

```javascript
class Furigana {
  constructor(selectors = []) {
    this.selectors = selectors;
    this.regex = /([\u4E00-\u9FAF\u3040-\u3096\u30A1-\u30FA\uFF66-\uFF9D\u31F0-\u31FF]{1})\[(.*?)\]/g;

    this.selectors.forEach((selector) => {
      let results = document.querySelectorAll(selector);
      results.forEach((result) => {
        result.innerHTML = result.innerHTML.replace(this.regex, '<ruby>$1 <rp>(</rp><rt>$2</rt><rp>)</rp></ruby>');
      });
    });
  }
}

new Furigana(['.content']);
```

### How it works

The class expects an array of element selectors. These DOM elements are then checked for kanji that are followed by brackets `[]` and this will be replaced by `<ruby>Kanji <rp>(</rp><rt>Furigana</rt><rp>)</rp></ruby>`. The HTML ruby element suits best for this. Voilá, done.
