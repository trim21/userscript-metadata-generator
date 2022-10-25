const path = require('path');

const banner2 = require('rollup-plugin-banner2');

const generate = require('../');

module.exports = {
  input: path.resolve(__dirname, 'src/input.js'),
  output: [
    {
      format: 'iife',
      file: path.resolve(__dirname, 'out/rollup-output.js'),
      plugins: [banner2(() => generate({ name: 'hello' }) + '\n\n')],
    },
  ],
};
