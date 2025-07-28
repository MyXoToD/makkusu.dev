import { IdAttributePlugin } from '@11ty/eleventy';
import pluginInclusiveLanguage from '@11ty/eleventy-plugin-inclusive-language';
import pluginRss from '@11ty/eleventy-plugin-rss';
import pluginHighlight from '@11ty/eleventy-plugin-syntaxhighlight';
import readingtime from '@myxotod/eleventy-plugin-readingtime';
import browserslist from 'browserslist';
import del from 'del';
import pluginPageAssets from 'eleventy-plugin-page-assets';
import htmlmin from 'html-minifier';
import { browserslistToTargets, transform as lightningcss } from 'lightningcss';
import { minify } from 'terser';

const config = {
  dir: {
    input: 'src',
    output: 'dist',
    layouts: '_layouts',
    includes: '_includes',
  },
};

// Clear output folder
del.sync(config.dir.output, { dot: true });

export default async function (eleventyConfig) {
  // Directories
  eleventyConfig.setInputDirectory('src');
  eleventyConfig.setOutputDirectory('dist');
  eleventyConfig.setLayoutsDirectory('_layouts');
  eleventyConfig.setIncludesDirectory('_includes');

  // Options
  eleventyConfig.setQuietMode(true);

  // Watch Targets
  eleventyConfig.addWatchTarget(config.dir.input + '/assets/stylesheets/**/*.css');

  // Set global data
  eleventyConfig.addGlobalData('accentcolor', 'rebeccapurple');
  eleventyConfig.addGlobalData('layout', 'base');
  eleventyConfig.addGlobalData('topbar', true);
  eleventyConfig.addGlobalData('include_prism', false);
  eleventyConfig.addGlobalData('fallbackcover', '/assets/images/fallback-cover.webp');
  eleventyConfig.addGlobalData('sitemap', {
    priority: 0.5,
  });
  eleventyConfig.addGlobalData('site', {
    url: 'https://makkusu.dev',
    title: 'makkusu.dev',
    builtAt: Date.now(),
  });

  // Passthrough copies
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/images');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/fonts');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/.htaccess');
  eleventyConfig.addPassthroughCopy(config.dir.input + '/robots.txt');
  eleventyConfig.addPlugin(pluginPageAssets, {
    mode: 'directory',
    assetsMatching: '*.png|*.jpg|*.jpeg|*.gif|*.svg|*.webp',
    hashAssets: false,
    postsMatching: config.dir.input + '/blog|hobbies|projects/**/*.md',
  });

  // Enable plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addPlugin(pluginHighlight);
  eleventyConfig.addPlugin(pluginInclusiveLanguage);
  eleventyConfig.addPlugin(readingtime, {
    verbose: false,
  });

  // Filters
  const publishedPosts = (post) => {
    const now = new Date();
    return post.date <= now && !post.data.draft;
  };
  eleventyConfig.addFilter('formatDate', (value) => {
    if (value == 'now') return value;
    const date = new Date(value);
    return date.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
  });
  eleventyConfig.addFilter('formatDateFull', (value) => {
    const date = new Date(value);
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return date.getDate() + '. ' + months[date.getMonth()] + ' ' + date.getFullYear();
  });
  eleventyConfig.addFilter('publishedPosts', (data) => {
    return data.filter(publishedPosts);
  });

  // Collections
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/blog/**/*.md').filter(publishedPosts);
  });
  eleventyConfig.addCollection('blogLatest', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(config.dir.input + '/blog/**/*.md')
      .filter(publishedPosts)
      .reverse()
      .slice(0, 3);
  });
  eleventyConfig.addCollection('hobbies', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(config.dir.input + '/hobbies/**/*.md')
      .sort((a, b) => {
        if (!a.data.order) a.data.order = 9999999;
        if (!b.data.order) b.data.order = 9999999;
        return a.data.order - b.data.order;
      })
      .filter(publishedPosts);
  });
  eleventyConfig.addCollection('projects', (collectionApi) => {
    return collectionApi.getFilteredByGlob(config.dir.input + '/projects/**/*.md').filter(publishedPosts);
  });
  eleventyConfig.addCollection('sitemap', (collectionApi) => {
    return collectionApi
      .getAll()
      .sort((a, b) => b.data.sitemap.priority - a.data.sitemap.priority)
      .filter(publishedPosts)
      .filter((page) => !page.data.sitemap.exclude);
  });
  eleventyConfig.addCollection('feed', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob([config.dir.input + '/blog/**/*.md', config.dir.input + '/projects/**/*.md'])
      .filter(publishedPosts);
  });

  // Transforms
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });

      minified += `\r\n\r\n<!-- 👽: Hello earthling, I was hiding here, but you found me. Take this 🍪 -->
      
<!--
 ___    ___   ________   __   ___  __   ___  __    __   ______   __    __       _____     _______   __      __
|   \\__/   | |   __   | |  | /  / |  | /  / |  |  |  | |   ___| |  |  |  |     |     \\   |   ____| \\  \\    /  /
|          | |  |__|  | |  |/  /  |  |/  /  |  |  |  | |  |___  |  |  |  |     |  |\\  \\  |  |____   \\  \\  /  /
|  |\\__/|  | |   __   | |     {   |     {   |  |  |  | |___   | |  |  |  |     |  | |  | |   ____|   \\  \\/  /
|  |    |  | |  |  |  | |  |\\  \\  |  |\\  \\  |  |__|  |  ___|  | |  |__|  |  _  |  |/  /  |  |____     \\    /
|__|    |__| |__|  |__| |__| \\__\\ |__| \\__\\ |________| |______| |________| |_| |_____/   |_______|     \\__/
-->`;

      return minified;
    }

    return content;
  });

  eleventyConfig.addTransform('minify-css', (content, outputPath) => {
    if (outputPath.endsWith('.css')) {
      let minified = lightningcss({
        code: Buffer.from(content),
        minify: true,
        targets: browserslistToTargets(browserslist('defaults')),
      });
      return minified.code.toString();
    }

    return content;
  });

  eleventyConfig.addTransform('uglify-js', async (content, outputPath) => {
    if (outputPath.endsWith('.js')) {
      let minified = await minify(content, {
        compress: true,
        mangle: true,
      });
      return minified.code;
    }

    return content;
  });
}
