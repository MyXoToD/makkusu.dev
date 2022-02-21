const fs = require('fs');
const slugify = require('@sindresorhus/slugify');
const pageAssetsPlugin = require('eleventy-plugin-page-assets');

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

    // Custom Collections
    // eleventyConfig.addCollection('alltags', (collectionApi) => {
    //     const alltags = new Set();
    //     collectionApi.getAll().forEach((item) => {
    //         if (!item.data.tags) return;
    //         item.data.tags.forEach((tag) => alltags.add(tag));
    //     });
    //     return alltags;
    // });
    eleventyConfig.addCollection('allposts', function(cApi) {
        return cApi.getFilteredByGlob(config.dir.input + '/_blog/**/*.md');
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
    eleventyConfig.addPassthroughCopy('.htaccess');

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

    return config;
};