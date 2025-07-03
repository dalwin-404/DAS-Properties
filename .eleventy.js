const path = require("path");

module.exports = function (eleventyConfig) {
    // ✅ Copy admin and static folders to output
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    // ✅ Properties collection
    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/properties/*.md");
    });

    // ✅ Pages collection (optional if you're listing or looping through pages)
    eleventyConfig.addCollection("pages", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/pages/*.md");
    });

    // ✅ Hero slides collection
    eleventyConfig.addCollection("heroSlides", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/hero-slides/*.md");
    });

    // ✅ Team collection
    eleventyConfig.addCollection("team", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/team/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
