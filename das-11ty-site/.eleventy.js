module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("src/assets/uploads");

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
