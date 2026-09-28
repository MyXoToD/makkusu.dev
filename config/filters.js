import { transform } from 'lightningcss';
import { minify as terserMinify } from 'terser';
import fs from 'fs';
import path from 'path';

export const includeFlagCss = () => {
  const cssPath = path.join(process.cwd(), 'node_modules/flag-icons/css/flag-icons.min.css');
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    return cssContent.replace(/url\(\.\.\/flags\//g, 'url(/assets/images/flags/');
  }
  return `/* warning: flag-icons not found in node_modules */`;
}

const minifyCSS = (inputCode) => {
  // if (process.env.ELEVENTY_RUN_MODE === 'build') {
  let { code } = transform({
    code: Buffer.from(inputCode),
    minify: true,
    sourceMap: false,
  });
  return code;
  // }

  // return `/* [11ty] minifyCSS skipped during --watch and --serve */\n${inputCode}`;
};

const minifyJS = async (inputCode) => {
  // if (process.env.ELEVENTY_RUN_MODE === 'build') {
  try {
    const minified = await terserMinify(inputCode, {
      mangle: {
        toplevel: true,
      },
    });
    return minified.code;
  } catch (error) {
    console.error('Error minifying JS:', error);
    return inputCode;
  }
  // }

  // return `/* [11ty] minifyJS skipped during --watch and --serve */\n${inputCode}`;
};

export const toTravelClasses = (array) => [...new Set(array.map(e => e.destination.country.toUpperCase()))].map(country => `path#${country}`).join`,`;

export const dateToSlug = (date) => {
  return `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}`;
};

export const formatDate = (value) => {
  if (value == 'now') return value;
  const date = new Date(value);
  return date.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });
};

export const formatDateFull = (value) => {
  const date = new Date(value);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return date.getDate() + '. ' + months[date.getMonth()] + ' ' + date.getFullYear();
};

export const dateWithTime = (value) => {
  let date = new Date(value);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()} ${hours}:${minutes}`;
};

export default {
  includeFlagCss,
  minifyCSS,
  minifyJS,
  dateToSlug,
  formatDate,
  formatDateFull,
  dateWithTime,
  toTravelClasses,
};
