---
tags:
    - japanese
    - coding
title: Japanese Furigana Script
date: 2021-12-13 13:23:00
image: yotsubato.jpg
excerpt: A little script to help display furigana over kanji
---

<p class="jp">こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。こんにちは。私[わたし]の名[な]前[まえ]はマックスです。二[に]十[じゅう]八[はち]歳[さい]です。</p>

Lorem ipsum dolor `sit amet` consectetur, adipisicing elit. Vel quisquam, ipsum deserunt, at voluptates officiis ad architecto error provident placeat necessitatibus consequuntur quasi rerum? Vitae deleniti voluptas distinctio illum et?

```javascript
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
```

Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit obcaecati nostrum quas a veritatis dolorem non eum nam aspernatur voluptatum quia, consequatur unde libero quod ullam doloribus vitae minima odit!