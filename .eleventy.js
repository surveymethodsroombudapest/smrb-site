const fs = require("fs");
const NOT_FOUND_PATH = "public/404.html";
const i18n = require("eleventy-plugin-i18n");
const moment = require("moment");
const translations = require("./src/_data/translations.js");
const mainnav = require("./src/_data/mainnav.js");
// const { eleventyImageTransformPlugin } = require("@11ty/eleventy-img");
// const Image = require("@11ty/eleventy-img");
const { JSDOM } = require("jsdom");

/** @param {import("@11ty/eleventy").UserConfig} config */
module.exports = function (config) {
  // Passthroughs
  config.addPassthroughCopy({ "./src/static/": "/" });
  config.addPassthroughCopy("./src/css/");

  // Layout aliases
  config.addLayoutAlias("base", "layouts/base.njk");
  config.addLayoutAlias("collection", "layouts/collection-master.njk");
  config.addLayoutAlias("page", "layouts/page-master.njk");

  config.addWatchTarget("./src/static/");

  // collections
  // TODO talán szebb lenne, ha az index.md-k helyett index.njk-k lennének külön mappában
  config.addCollection("hirek_hu", (collection) => {
    return collection.getFilteredByGlob("./src/hu/hirek/!(index).md").reverse();
  });
  config.addCollection("hirek_en", (collection) => {
    return collection.getFilteredByGlob("./src/en/news/!(index).md").reverse();
  });
  config.addCollection("kutatok_hu", (collection) => {
    return collection
      .getFilteredByGlob("./src/hu/kutatok/!(index).md")
      .sort((a, b) => a.data.order - b.data.order);
  });
  config.addCollection("kutatok_en", (collection) => {
    return collection
      .getFilteredByGlob("./src/en/researchers/!(index).md")
      .sort((a, b) => a.data.order - b.data.order);
  });
  config.addCollection("proj_hu", (collection) => {
    return collection
      .getFilteredByGlob("./src/hu/projektek/!(index).md")
      .sort((a, b) => new Date(b.data.year) - new Date(a.data.date));
  });
  config.addCollection("proj_en", (collection) => {
    return collection
      .getFilteredByGlob("./src/en/projects/!(index).md")
      .reverse();
  });
  config.addCollection("proj_by_hu", (collection) => {
    const posts = collection
      .getFilteredByGlob("./src/hu/projektek/!(index).md")
      .reverse();
    const years = posts.map((post) => new Date(post.date).getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      );

      return [...prev, [year, filteredPosts]];
    }, []);

    return postsByYear;
  });
  config.addCollection("proj_by_en", (collection) => {
    const posts = collection
      .getFilteredByGlob("./src/en/projects/!(index).md")
      .reverse();
    const years = posts.map((post) => post.date.getFullYear());
    const uniqueYears = [...new Set(years)];

    const postsByYear = uniqueYears.reduce((prev, year) => {
      const filteredPosts = posts.filter(
        (post) => post.date.getFullYear() === year
      );

      return [...prev, [year, filteredPosts]];
    }, []);

    return postsByYear;
  });
  config.addCollection("publ_hu", (collection) => {
    return collection.getFilteredByGlob("./src/hu/publikaciok/!(index).md");
  });
  config.addCollection("publ_en", (collection) => {
    return collection.getFilteredByGlob("./src/en/publications/!(index).md");
  });
  config.addCollection("intern_hu", (collection) => {
    return collection.getFilteredByGlob("./src/hu/gyakornokok/!(index).md");
  });
  config.addCollection("intern_en", (collection) => {
    return collection.getFilteredByGlob("./src/en/intern/!(index).md");
  });
  config.addCollection("juniors_hu", (collection) => {
    return collection.getFilteredByGlob("./src/hu/junior/!(index).md");
  });
  config.addCollection("juniors_en", (collection) => {
    return collection.getFilteredByGlob("./src/en/junior/!(index).md");
  });

  config.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      hu: "en",
    },
  });

  // config.addPlugin(eleventyImageTransformPlugin, {
  //   // which file extensions to process
  //   extensions: "html",

  //   // Add any other Image utility options here:

  //   // optional, output image formats
  //   formats: ["webp", "jpeg"],
  //   // formats: ["auto"],

  //   // optional, output image widths
  //   // widths: ["auto"],

  //   // optional, attributes assigned on <img> override these values.
  //   defaultAttributes: {
  //     loading: "lazy",
  //     decoding: "async",
  //   },
  // });

  // date filter (localized)
  config.addFilter("date", function (date, format, locale) {
    locale = locale ? locale : "hu";
    moment.locale(locale);
    return moment(date).format(format);
  });

  config.addFilter("localisedLink", (id, locale) => {
    return mainnav.find((item) => item.id === id)[locale].link;
  });
  config.addFilter("localisedLinkLabel", (id, locale) => {
    return mainnav.find((item) => item.id === id)[locale].label;
  });
  config.addShortcode("localisedLink", (id, locale) => {
    return mainnav.find((item) => item.id === id)[locale].link;
  });

  // config.addShortcode("image", async function (src, alt, sizes) {
  //   let metadata = await Image(src, {
  //     widths: [300, 600],
  //     formats: ["avif", "jpeg"],
  //   });

  //   let imageAttributes = {
  //     alt,
  //     sizes,
  //     loading: "lazy",
  //     decoding: "async",
  //   };

  //   // You bet we throw an error on a missing alt (alt="" works okay)
  //   return Image.generateHTML(metadata, imageAttributes);
  // });

  config.addNunjucksShortcode(
    "goback",
    (link, text) => `
    <a href="${link}" class="goback"><i class="bi bi-caret-left"></i> ${text}</a>
  `
  );

  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          if (!fs.existsSync(NOT_FOUND_PATH)) {
            throw new Error(
              `Expected a \`${NOT_FOUND_PATH}\` file but could not find one. Did you create a 404.html template?`
            );
          }

          const content_404 = fs.readFileSync(NOT_FOUND_PATH);
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  config.addFilter("stripHtml", function (content) {
    // Use JSDOM to parse the HTML and extract text content
    const dom = new JSDOM(content);
    return dom.window.document.body.textContent || "";
  });

  return {
    markdownTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public",
      data: "_data",
    },
  };
};
