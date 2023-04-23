const path = require('path');

const banner2 = require('rollup-plugin-banner2');

const { userscriptMetadataGenerator } = require('userscript-metadata-generator');

module.exports = {
  input: path.resolve(__dirname, 'src/input.js'),
  output: [
    {
      format: 'iife',
      file: path.resolve(__dirname, 'out/rollup-output.js'),
      plugins: [banner2(() => userscriptMetadataGenerator({ name: 'hello', version: '0.0.1' }) + '\n\n')],
    },
  ],
};
