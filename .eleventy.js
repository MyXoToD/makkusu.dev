const config = {
    dir: {
        input: 'src',
        output: 'dist'
    }
}

module.exports = function(eleventyConfig) {
    // Copy stuff to dist
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/fonts');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/images');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/javascripts');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/assets/stylesheets/application.min.css');
    eleventyConfig.addPassthroughCopy(config.dir.input + '/favicon.png');

    return config;
};