module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/admin");
    eleventyConfig.addPassthroughCopy("src/assets/uploads");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
