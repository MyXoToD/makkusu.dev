const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPageAssets = require("eleventy-plugin-page-assets");
const pluginInclusiveLanguage = require("@11ty/eleventy-plugin-inclusive-language");
const del = require("del");
const htmlmin = require("html-minifier");
const readingtime = require("@myxotod/eleventy-plugin-readingtime");

const config = {
  dir: {
    input: 'src',
    output: 'dist',
    layouts: '_layouts',
    includes: '_includes'
  }
};

// Clear output folder
del.sync(config.dir.output, { dot: true })

module.exports = (eleventyConfig) => {
  // Options
  eleventyConfig.setQuietMode(true);

  // Set global data
  eleventyConfig.addGlobalData('accentcolor', 'rebeccapurple');
  eleventyConfig.addGlobalData('layout', 'base');
  eleventyConfig.addGlobalData('topbar', true);
  eleventyConfig.addGlobalData('include_prism', false);
  eleventyConfig.addGlobalData('include_fontawesome', false);
  eleventyConfig.addGlobalData('fallbackcover', '/assets/images/fallback-cover.webp');
  eleventyConfig.addGlobalData('sitemap', {
    'priority': 0.5
  });
  eleventyConfig.addGlobalData('site', {
    'url': 'https://www.makkusu.dev',
    'title': 'makkusu.dev',
    'builtAt': Date.now()
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/stylesheets/application.min.css');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/stylesheets/fontawesome.min.css');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/images');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/fonts');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/javascripts');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/.htaccess');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/robots.txt');
  eleventyConfig.addPlugin(pluginPageAssets, {
    mode: 'directory',
    assetsMatching: '*.png|*.jpg|*.jpeg|*.gif|*.svg|*.webp',
    hashAssets: false,
    postsMatching: config.dir.input + '/blog|hobbies|projects/**/*.md'
  });

  // Enable plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginHighlight);
  eleventyConfig.addPlugin(pluginInclusiveLanguage);
  eleventyConfig.addPlugin(readingtime, {
    verbose: false
  });

  // Filters
  const publishedPosts = (post) => {
    const now = new Date();
    return post.date <= now && !post.data.draft;
  };
  eleventyConfig.addFilter('formatDate', (value) => {
    if (value == 'now')
      return value;
    const date = new Date(value);
    return date.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    });
  });
  eleventyConfig.addFilter('formatDateFull', (value) => {
    const date = new Date(value);
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return date.getDate() + '. ' + months[date.getMonth()] + ' ' + date.getFullYear();
  });
  eleventyConfig.addFilter('publishedPosts', (data) => {
    return data.filter(publishedPosts);
  });

  // Collections
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/blog/**/*.md')
      .filter(publishedPosts);
  });
  eleventyConfig.addCollection('hobbies', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/hobbies/**/*.md')
      .sort((a, b) => {
        if (!a.data.order) a.data.order = 9999999;
        if (!b.data.order) b.data.order = 9999999;
        return a.data.order - b.data.order;
      })
      .filter(publishedPosts);
  });
  eleventyConfig.addCollection('projects', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/projects/**/*.md')
      .filter(publishedPosts);
  });
  eleventyConfig.addCollection('sitemap', (collectionApi) => {
    return collectionApi.getAll()
      .sort((a, b) => b.data.sitemap.priority - a.data.sitemap.priority)
      .filter(publishedPosts)
      .filter(page => !page.data.sitemap.exclude);
  });
  eleventyConfig.addCollection('feed', (collectionApi) => {
    return collectionApi.getFilteredByGlob([config.dir.input + '/blog/**/*.md', config.dir.input + '/projects/**/*.md'])
      .filter(publishedPosts);
  });

  // Transforms
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      });

      minified += "\r\n\r\n<!-- 👽: Hello earthling, I was hiding here, but you found me. Take this 🍪 -->";

      return minified;
    }

    return content;
  });

  // Return global config
  return config;
};