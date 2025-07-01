module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("admin");
    eleventyConfig.addPassthroughCopy("static");

    eleventyConfig.addCollection("properties", function (collectionApi) {
        const files = collectionApi.getFilteredByGlob("properties/*.md");
        console.log("Properties found:", files.length);
        files.forEach(f => console.log(" -", f.inputPath));
        return files;
    });

    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};
