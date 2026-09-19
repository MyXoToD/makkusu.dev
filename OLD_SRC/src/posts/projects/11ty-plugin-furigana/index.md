---
title: 11ty Plugin Furigana
excerpt: 11ty plugin to display furigana on top of kanji
date: 2024-05-17
cover: /assets/images/posts/projects/11ty-furigana.png
---

This is my second 11ty plugin and it provides furigana for kanji. This is useful if you don't know how to read certain kanji yet. It looks like this:

> {{ '私[わたし]の名[な]前[まえ]はマックスです。' | furigana }}

This, like the readingtime plugin, needs refactoring but for now it does its job.

You can find the source code [on github](https://github.com/MyXoToD/eleventy-plugin-furigana) and the package [on npm](https://www.npmjs.com/package/@myxotod/eleventy-plugin-furigana).
