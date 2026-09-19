const getPath = (type) => `./src/posts/${type}/**/*.md`;

const notes = (api) => api.getFilteredByGlob(getPath('notes')).reverse();

export default {
  notes,
};
