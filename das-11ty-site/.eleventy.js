module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src");
    return {
        dir: {
            input: "src",   // or your actual input folder
            output: "_site"
        }
    };
};
