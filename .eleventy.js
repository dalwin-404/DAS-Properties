module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    // Add a collection for properties from _data/content/properties (JSON or Markdown)
    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("_data/content/properties/*");
        // Use *.md or *.json if you want to filter by type
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};