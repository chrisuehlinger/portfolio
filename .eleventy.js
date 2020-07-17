const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginTOC = require('eleventy-plugin-toc');
const pluginSass = require("eleventy-plugin-sass");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const moment = require("moment");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPlugin(pluginSass);
  eleventyConfig.addPlugin(syntaxHighlight);

  let md = require("markdown-it")({
    html: true,
    breaks: true,
    linkify: true
  });
  let mila = require('markdown-it-link-attributes')
  md.use(mila, {
    pattern: /^http/,
    attrs: {
      target: '_blank',
      rel: 'noopener'
    }
  });
  md.use(require('markdown-it-anchor'));

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addLayoutAlias('default', 'layouts/default.html');
  eleventyConfig.addLayoutAlias('post', 'layouts/post.html');

  eleventyConfig.addLiquidFilter("toUTCString", (date) => {
    const utc = date.toUTCString();
    return moment.utc(utc).format("MMMM Do YYYY");
  });
  eleventyConfig.addLiquidFilter("toBlogUrl", (page) => {
    const utc = page.date.toUTCString();
    return `/blog/${moment.utc(utc).format("YYYY/MM/DD")}/${page.fileSlug }/index.html`
  });


  // Usage: {% uppercase myVar %} where myVar has a value of "alice"
  // Usage: {% uppercase "alice" %}
  eleventyConfig.addLiquidTag("img", function(liquidEngine) {
    return {
      parse: function(tagToken, remainingTokens) {
        this.str = tagToken.args; // myVar or "alice"
      },
      render: function(scope, hash) {
        // Resolve variables
        // var str = liquidEngine.evalValue(this.str, scope); // "alice"

        // Do the uppercasing
        return Promise.resolve(`<img src="${this.str}" />`); // "ALICE"
      }
    };
  });

  eleventyConfig.addPassthroughCopy("source/images");

  return {
    dir: {
      input: "./source",      // Equivalent to Jekyll's source property
      output: "./_site" // Equivalent to Jekyll's destination property
    }
  };
};
