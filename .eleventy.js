const { EleventyI18nPlugin } = require("@11ty/eleventy");

module.exports = function (config){
    

    eleventyConfig.addPlugin(EleventyI18nPlugin, {
        // any valid BCP 47-compatible language tag is supported
        defaultLanguage: "", // Required, this site uses "en"
      });
    
    config.addPassthroughCopy({"./src/static": ""})

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}