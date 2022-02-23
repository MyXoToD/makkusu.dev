const fs = require('fs');
const slugify = require('@sindresorhus/slugify');
const pageAssetsPlugin = require('eleventy-plugin-page-assets');
const pluginRss = require("@11ty/eleventy-plugin-rss");

const config = {
    htmlTemplateEngine: 'njk',
    dir: {
        input: 'src',
        output: 'dist'
    }
}

module.exports = function(eleventyConfig) {
    // Configure Browsersync
    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
            ready: function(err, bs) {
                bs.addMiddleware("*", (req, res) => {
                    const content_404 = fs.readFileSync(config.dir.output + '/404.html');
                    // Add 404 http status code in request header.
                    res.writeHead(404, {
                        "Content-Type": "text/html; charset=UTF-8"
                    });
                    // Provides the 404 content without redirect.
                    res.write(content_404);
                    res.end();
                });
            }
        }
    });

    // Global default data
    eleventyConfig.addGlobalData('navigation', true);
    eleventyConfig.addGlobalData('layout', 'base.njk');
    eleventyConfig.addGlobalData('sitemap', {
        priority: 0.5
    });

    // Custom Collections
    // eleventyConfig.addCollection('alltags', (collectionApi) => {
    //     const alltags = new Set();
    //     collectionApi.getAll().forEach((item) => {
    //         if (!item.data.tags) return;
    //         item.data.tags.forEach((tag) => alltags.add(tag));
    //     });
    //     return alltags;
    // });
    const now = new Date();
    const publishedPosts = (post) => post.date <= now && !post.data.draft;
    eleventyConfig.addCollection('blog', function(cApi) {
        return cApi
            .getFilteredByGlob(config.dir.input + '/_blog/**/*.md')
            .filter(publishedPosts);
    });
    eleventyConfig.addCollection('sitemap', function(cApi) {
        return cApi.getAll().sort((a, b) => b.data.sitemap.priority - a.data.sitemap.priority);
    });

    // Copy stuff to dist
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/fonts');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/images');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/javascripts');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/stylesheets/application.min.css');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/favicon-16x16.png');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/favicon-32x32.png');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/apple-touch-icon.png');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/apple-touch-icon.png');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/robots.txt');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/.htaccess');

    // RSS Plugin
    eleventyConfig.addPlugin(pluginRss);

    // Copy assets from blog posts
    eleventyConfig.addPlugin(pageAssetsPlugin, {
        mode: 'directory',
        assetsMatching: '*.png|*.jpg|*.jpeg|*.gif|*.svg',
        hashAssets: false,
        postsMatching: config.dir.input + '/_blog/**/*.md'
    });

    // Register filters
    eleventyConfig.addFilter('slugify', str => {
        return slugify(str);
    });

    // Filter to format dates to dd.mm.yyyy
    eleventyConfig.addFilter('toFormattedDate', date => {
        let day = date.getUTCDate() + '';
        let month = date.getUTCMonth() + 1;
        if (day < 10) day = '0' + day;
        if (month < 10) month = '0' + month;
        return day + '.' + month + '.' + date.getUTCFullYear();
    });

    // Filter to format time to hh:mm
    eleventyConfig.addFilter('toFormattedTime', date => {
        let hours = date.getUTCHours() + '';
        let minutes = date.getUTCMinutes() + '';
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        return hours + ':' + minutes;
    });

    // Filter posts, only show published posts
    eleventyConfig.addFilter('hideDrafts', posts => {
        return posts.filter(publishedPosts);
    });

    return config;
};