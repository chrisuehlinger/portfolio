module.exports = function(eleventyConfig) {
  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
  return {
    dir: {
      input: "./source",      // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    }
  };
};
