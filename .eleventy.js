// const minify = require('html-minifier')

module.exports = function (eleventyConfig) {

    // Passthroughs
    eleventyConfig.addPassthroughCopy({ "./src/static": "" })
    
    // Layout aliases
	eleventyConfig.addLayoutAlias("base", "layouts/base.njk");

    eleventyConfig.addWatchTarget("./src/static/");
    /*
    // Minify HTML
	const isProduction = process.env.ELEVENTY_ENV === "production";

	var htmlMinify = function(value, outputPath) {
		if (outputPath && outputPath.indexOf('.html') > -1) {
			return minify(value, {
				useShortDoctype: true,
				removeComments: true,
				collapseWhitespace: true,
				minifyCSS: true
			});
		}
	}

	// html min only in production
	if (isProduction) {
		eleventyConfig.addTransform("htmlmin", htmlMinify);
	}
    */
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "public",
            data: "_data"
        }
    }
}