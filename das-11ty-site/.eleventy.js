module.exports = function (eleventyConfig) {
    return {
        dir: {
            input: "src",        // where your content files are
            includes: "_includes", // subfolder inside "src"
            output: "_site"
        }
    };
};
