import { IdAttributePlugin } from '@11ty/eleventy';
import markdownIt from 'markdown-it';
import markdownItFootnote from 'markdown-it-footnote';
import collections from './config/collections.js';
import filters from './config/filters.js';
import transforms from './config/transforms.js';

export default async function ($config) {
  $config.setInputDirectory('src');
  $config.setOutputDirectory('dist');
  $config.setIncludesDirectory('_includes');
  $config.setLayoutsDirectory('_layouts');

  // File passthrough
  $config.addPassthroughCopy('src/assets/images');
  $config.addPassthroughCopy({
    'node_modules/flag-icons/flags': 'assets/images/flags',
  });

  // Default Global Config
  $config.addGlobalData('layout', 'base');
  $config.addGlobalData('site', {
    url: 'https://makkusu.dev',
    title: 'makkusu.dev',
    builtAt: Date.now(),
  });

  // Plugins
  let markdownLib = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItFootnote);
  $config.setLibrary('md', markdownLib);
  $config.addPlugin(IdAttributePlugin);

  // Collections
  Object.entries(collections).forEach(([name, collection]) => {
    $config.addCollection(name, collection);
  });

  // Filters
  Object.entries(filters).forEach(([name, filter]) => {
    $config.addFilter(name, filter);
  });

  // Transforms
  Object.entries(transforms).forEach(([name, transform]) => {
    $config.addTransform(name, transform);
  });
}
