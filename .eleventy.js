const path = require("path");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    // Look for markdown files in src/properties/
    eleventyConfig.addCollection("properties", function (collectionApi) {
        const files = collectionApi.getFilteredByGlob("properties/*.md");
        console.log("Properties found:", files.length);
        return files;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};