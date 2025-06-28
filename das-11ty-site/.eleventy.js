module.exports = function (eleventyConfig) {
    // Your config logic here

    return {
        dir: {
            input: "src",
            includes: "_includes",
            output: "_site"
        }
    };
};
