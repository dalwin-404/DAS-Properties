module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};