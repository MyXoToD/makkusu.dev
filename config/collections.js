const statsStructure = {
  totalPosts: 0,
  totalWords: 0,
  averageWords: 0,
  totalReadingTime: 0,
  totalTags: 0,
  mostUsedWords: [{ word: 'javascript', usage: 100 }],
  byYear: {
    2025: {
      totalPosts: 0,
      totalWords: 0,
      averageWords: 0,
      totalReadingTime: 0,
      totalTags: 0,
      totalPerMonth: Array(12),
    },
  },
  byTag: {
    coding: {
      totalPosts: 0,
      totalWords: 0,
      averageWords: 0,
      totalReadingTime: 0,
    },
  },
};

// Helpers
const getPath = (type) => `src/posts/${type}/**/*.md`;

// Normal Collections
export const all = (collectionApi) => collectionApi.getAll().reverse();
export const blog = (collectionApi) => collectionApi.getFilteredByGlob(getPath('blog')).reverse();
export const notes = (collectionApi) => collectionApi.getFilteredByGlob(getPath('notes')).reverse();

// Stats
export const allStats = (collectionApi) => {
  const stats = Object.create(statsStructure);
  const posts = collectionApi.getAll().filter((post) => ['blog', 'note'].includes(post.data.postType)); // TODO: Filter post types probably to not include pages

  stats.totalPosts = posts.length;

  return stats;
};

export default {
  all,
  blog,
  notes,
  allStats,
};
