// const minify = require('html-minifier')
const fs = require("fs");
const NOT_FOUND_PATH = "public/404.html";

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

    eleventyConfig.setBrowserSyncConfig({
        callbacks: {
          ready: function(err, bs) {
    
            bs.addMiddleware("*", (req, res) => {
              if (!fs.existsSync(NOT_FOUND_PATH)) {
                throw new Error(`Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`);
              }
    
              const content_404 = fs.readFileSync(NOT_FOUND_PATH);
              // Add 404 http status code in request header.
              res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
              // Provides the 404 content without redirect.
              res.write(content_404);
              res.end();
            });
          }
        }
      });

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