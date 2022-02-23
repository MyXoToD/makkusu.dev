---
tags:
    - japanese
    - coding
title: Japanese Furigana Script
date: 2021-12-13 13:23:00
image: yotsubato.jpg
excerpt: A little script to help display furigana over kanji
---

While finalizing the current version of this website with 11ty I took the time to implement a super small script to help me display *furigana* on top of kanji. Furigana are small writting hiragana over kanji. The keep it simple I only wanted to show the respective furigana when the kanji is hovered. This also help a little while learning Japanese, since you're first thrown into *kanji-only* mode. Here is an example block of how it looks. Please hover the kanji, in this example they all have furigana:

<p class="jp">
    こんいちは。私[わたし]の名[な]前[まえ]はマックスです。お元[げん]気[き]ですか。
</p>

In case you're interested how it works, here is the code. A little description you can find below.

```javascript
class Furigana {
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

new Furigana(['.post__content']);
```

### How it works

The class expects an array of element selectors. These DOM elements are then checked for kanji that are followed by brackets `[]` and this will be replaced by `<span class='furigana' data-furi='FURIGANA'>KANJI</span>`. The rest is handled by CSS, the `data-furi` attribute is display via the `:before`-pseudo element. Voilá, done.

### Future ideas

I was thinking of maybe implementing a global button on this page that either activates or deactivates furigana. So no hover effect, just simply show/hide possibility if needed.