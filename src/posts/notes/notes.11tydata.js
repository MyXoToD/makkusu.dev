export default {
  eleventyComputed: {
    permalink: '/notes/{{ date | dateToSlug }}/',
  },
};
