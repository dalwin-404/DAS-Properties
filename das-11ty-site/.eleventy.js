module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("public");
    return {
        dir: {
            input: "src",   // or your actual input folder
            output: "_site"
        }
    };
};
