module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");

    return {
        dir: {
            input: "src",      // Your actual content lives here
            output: "_site"    // Eleventy builds into this
        }
    };
};
