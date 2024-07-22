module.exports = {
  eleventyComputed: {
    year: function (data) {
      console.log(data.date);
      return new Date(data.date || data.page.date).getFullYear();
    },
  },
};
