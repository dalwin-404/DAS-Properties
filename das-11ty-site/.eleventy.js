module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("src/assets");

    return {
        dir: {
            input: "src",
            includes: "_includes", // add this line
            output: "_site"
        }
    };
};
