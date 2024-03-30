const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginPageAssets = require("eleventy-plugin-page-assets");
const pluginInclusiveLanguage = require("@11ty/eleventy-plugin-inclusive-language");
const del = require("del");

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
  // Set global data
  eleventyConfig.addGlobalData('accentcolor', 'rebeccapurple');
  eleventyConfig.addGlobalData('layout', 'base');
  eleventyConfig.addGlobalData('topbar', true);
  eleventyConfig.addGlobalData('fallbackcover', '/assets/images/fallback-cover.jpg');
  eleventyConfig.addGlobalData('sitemap', {
    'priority': 0.5
  });
  eleventyConfig.addGlobalData('site', {
    'title': 'makkusu.dev'
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/stylesheets/application.min.css');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/images');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/fonts');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/javascripts');
  eleventyConfig.addPlugin(pluginPageAssets, {
    mode: 'directory',
    assetsMatching: '*.png|*.jpg|*.jpeg|*.gif|*.svg|*.webp',
    hashAssets: false,
    postsMatching: config.dir.input + '/blog|hobbies|coding/**/*.md'
  });

  // Enable plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginHighlight);
  eleventyConfig.addPlugin(pluginInclusiveLanguage);

  // Filters
  const publishedPosts = (post) => {
    const now = new Date();
    return post.date <= now && !post.data.draft;
  };
  eleventyConfig.addFilter('formatDate', (value) => {
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
  eleventyConfig.addCollection('coding', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/coding/**/*.md')
      .filter(publishedPosts);
  });
  eleventyConfig.addCollection('sitemap', function (collectionApi) {
    return collectionApi.getAll()
      .sort((a, b) => b.data.sitemap.priority - a.data.sitemap.priority)
      .filter(publishedPosts);
  });

  // Return global config
  return config;
};