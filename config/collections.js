import { formatNumber } from "./helpers.js";

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
export const blogRecent = (collectionApi) => collectionApi.getFilteredByGlob(getPath('blog')).reverse().slice(0, 3);
export const notes = (collectionApi) => collectionApi.getFilteredByGlob(getPath('notes')).reverse();
export const hobbies = (collectionApi) => collectionApi.getFilteredByGlob('src/pages/hobbies/**/*.md')
      .sort((a, b) => {
        if (!a.data.order) a.data.order = 9999999;
        if (!b.data.order) b.data.order = 9999999;
        return a.data.order - b.data.order;
      });

// Stats
export const allStats = (collectionApi) => {
  const stats = Object.create(statsStructure);
  const posts = collectionApi.getAll().filter((post) => ['blog', 'note'].includes(post.data.postType));

  stats.totalPosts = posts.length;
  // stats.totalWords = posts.map(post => post.content.split` `.length).reduce((a, b) => a + b);
  stats.totalWords = formatNumber(posts.map(post => post.rawInput.split` `.length).reduce((a, b) => a + b));

  return stats;
};

export default {
  all,
  blog,
  blogRecent,
  hobbies,
  notes,
  allStats,
};
