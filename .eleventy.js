const path = require("path");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    // Look for markdown files in src/properties/
    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("properties/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};