module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("src/assets/uploads"); // Also important

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
