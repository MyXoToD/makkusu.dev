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

  // Default Global Config
  $config.addGlobalData('layout', 'base');
  $config.addGlobalData('site', {
    url: 'https://makkusu.dev',
    title: 'makkusu.dev',
    builtAt: Date.now(),
  });

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
