const getPath = (type) => `./src/posts/${type}/**/*.md`;

const notes = (api) => api.getFilteredByGlob(getPath('notes')).reverse();

const blog = (api) => api.getFilteredByGlob(getPath('blog')).reverse();

export default {
  blog,
  notes,
};
