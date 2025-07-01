module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    // Use absolute path for collection
    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./_data/content/properties/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};