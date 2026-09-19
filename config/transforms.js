import { minify } from 'html-minifier';

export function htmlmin(inputCode) {
  if ((this.page.outputPath || '').endsWith('.html')) {
    const minified = minify(inputCode, {
      collapseWhitespace: true,
      removeComments: true,
    });

    return minified + `\n\n<!-- makkusu.dev -->`;
  }
  return inputCode;
}

export default {
  htmlmin,
};
