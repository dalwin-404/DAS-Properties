module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    return {
        dir: {
            input: "src",
            includes: "_includes",  // this should point to where page.njk is
            output: "_site"
        }
    };
};
