import { formatNumber, formatTime } from './helpers.js';

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
  allTags: [],
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
export const projects = (collectionApi) => collectionApi.getFilteredByGlob(getPath('projects')).reverse();
export const hobbies = (collectionApi) =>
  collectionApi.getFilteredByGlob('src/pages/hobbies/**/*.md').sort((a, b) => {
    if (!a.data.order) a.data.order = 9999999;
    if (!b.data.order) b.data.order = 9999999;
    return a.data.order - b.data.order;
  });
export const sitemap = (collectionApi) =>
  collectionApi
    .getAll()
    .sort((a, b) => b.data.sitemap.priority - a.data.sitemap.priority)
    .filter((page) => !page.data.sitemap.exclude);

// Stats
export const allStats = (collectionApi) => {
  const stats = Object.create(statsStructure);
  const posts = collectionApi.getAll().filter((post) => ['blog', 'note', 'projects'].includes(post.data.postType));

  stats.totalPosts = posts.length;
  // stats.totalWords = posts.map(post => post.content.split` `.length).reduce((a, b) => a + b);
  stats.totalWords = formatNumber(posts.map((post) => post.rawInput.split` `.length).reduce((a, b) => a + b));
  stats.totalReadingTime = formatTime(
    posts
      .map((post) => {
        const words = post.rawInput.split` `.length;
        return Math.round(words / 120);
      })
      .reduce((a, b) => a + b),
  );
  stats.totalTags = Array.from(
    new Set(
      posts
        .filter((post) => post.data.postType === 'blog')
        .map((post) => post.data.tags)
        .flat(),
    ),
  ).length;

  const blogTags = [
    ...new Set(
      posts
        .filter((post) => post.data.postType === 'blog')
        .map((post) => post.data.tags)
        .flat(),
    ),
  ];
  blogTags.map((tag) => {
    stats.byTag[tag] = {
      totalPosts: posts.filter((post) => post.data.tags && post.data.tags.includes(tag)).length,
      totalWords: 0,
      averageWords: 0,
      totalReadingTime: 0,
    };
  });

  stats.allTags = blogTags.map((tag) => [tag, posts.filter((post) => post.data.tags && post.data.tags.includes(tag)).length]).sort((a, b) => b[1] - a[1]);

  return stats;
};

export default {
  all,
  blog,
  blogRecent,
  hobbies,
  notes,
  projects,
  allStats,
  sitemap,
};
