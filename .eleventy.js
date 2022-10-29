module.exports = function (config){
    
    config.addPassthroughCopy({"./src/static": ""})

    return {
        dir: {
            input: "src",
            output: "public"
        }
    }
}