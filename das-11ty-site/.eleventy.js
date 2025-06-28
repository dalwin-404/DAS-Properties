module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");

    return {
        dir: {
            input: "src",
            includes: "_includes",  // ← add this line
            output: "_site"
        }
    };
};
