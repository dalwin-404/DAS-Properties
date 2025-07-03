module.exports = function (eleventyConfig) {
    // Passthrough folders
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("src/static");

    // Properties collection
    eleventyConfig.addCollection("properties", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/properties/*.md");
    });

    // About collection
    eleventyConfig.addCollection("about", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/about/*.md");
    });

    // Hero Slides collection
    eleventyConfig.addCollection("heroSlides", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/hero-slides/*.md");
    });

    // Homepage collection
    eleventyConfig.addCollection("homepage", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/homepage/*.md");
    });

    // Pages collection
    eleventyConfig.addCollection("pages", function (collectionApi) {
        return collectionApi.getFilteredByGlob("src/pages/*.md");
    });

    return {
        dir: {
            input: "src",
            output: "_site",
        },
    };
};
