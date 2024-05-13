---
title: Eleventy Reading Time Plugin
excerpt: I created a lightweight eleventy plugin with no dependencies to calculate and display the reading time for posts and pages.
tags:
  - coding
date: 2024-05-13
cover: cover.jpg
---

I've been using [eleventy](https://11ty.dev) for quite a while now and a couple of plugins with it, some official, some by community members. It was about time to create my own plugin. I decided to add a reading time display to my blog posts and even though there are plugins for that already I chose to build my own and publish it&mdash;for learning purposes.

May I proudly present: my very first node package and eleventy plugin! You can find the package at [NPM](https://www.npmjs.com/package/@myxotod/eleventy-plugin-readingtime) and the full source code on [GitHub](https://github.com/MyXoToD/eleventy-plugin-readingtime).

## So, what is it?

The plugin is really small and simple to use. You can add it to your 11ty project and use a custom filter to display the average reading time of a post or page. You can see an example on every single post on the [blog page](/blog).

## How to use it

First install the package to your project like so:

```sh
npm i @myxotod/eleventy-plugin-readingtime
```

After that you have to add and register it inside your `.eleventy.js` config file

```js
// .eleventy.js
const readingtime = require("@myxotod/eleventy-plugin-readingtime");

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(readingtime);
};
```

Finally use it in your code with the `readingtime`-filter

```html
<div>Reading time: {% raw %}{{ post | readingtime }}{% endraw %}</div>
```

Example output

```html
<div>Reading time: ~3min</div>
```

You will have to pass the whole post or page to the filter as shown above.

## Can I customize it? Sure you can!

You can pass several options when adding the plugin in your eleventy config file like so:

```js
eleventyConfig.addPlugin(readingtime, {
  wordsPerMinute: 200,
  suffixDisplay: true,
  suffixText: 'min',
  prefixDisplay: true,
  prefixText: '~',
  verbose: false
});
```

| Option | Default | Description |
|--------|---------|-------------|
|`wordsPerMinute`|`200`|Average number of words read per minute (higher values result in faster reading times)|
|`suffixDisplay`|`true`|Show or hide the suffix|
|`suffixText`|`'min'`|The suffix to be shown|
|`prefixDisplay`|`true`|Show or hide the prefix|
|`prefixText`|`'~'`|The prefix to be shown|
|`verbose`|`false`|Output additional data to your terminal when an eleventy build happens|

If you have any questions, feel free to open an [issue](https://github.com/MyXoToD/eleventy-plugin-readingtime/issues) or send me a message on [X](https://x.com/MyXoToD).