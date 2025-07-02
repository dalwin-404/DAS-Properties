module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/properties/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
