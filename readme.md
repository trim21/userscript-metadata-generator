# userscript-metadata-generator

`userscript-metadata-generator` is a package to generate UserScript metadata comments string.

require:

- nodejs >= 16

## install

```bash
npm i userscript-metadata-generator -D
```

## Usage

```typescript
const path = require('path');

const esbuild = require('esbuild');

// or you can use import, esm is also suppotted
const generate = require('userscript-metadata-generator');

const metadata = {
  name: {
    '': 'A test',
    de: 'Ein Test',
  },
  version: '0.1.2',
  author: {
    name: 'trim21',
    email: 'trim21.me@gmail.com',
  },
  'run-at': 'document-end',
  resource: {
    icon1: 'http://www.tampermonkey.net/favicon.ico',
    icon2: '/images/icon.png',
    html: 'http://www.tampermonkey.net/index.html',
    xml: 'http://www.tampermonkey.net/crx/tampermonkey.xml',
    SRIsecured1: 'http://www.tampermonkey.net/favicon.ico#md5=123434...',
    SRIsecured2: 'http://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...',
  },
  include: ['http://www.tampermonkey.net/*', 'http://*', 'https://*', '/^https://www.tampermonkey.net/.*$/'],
}

console.log(generate(metadata))

```

and you will get output like this:

```js
// ==UserScript==
// @name       A test
// @name:de    Ein Test
// @version    0.1.2
// @author     trim21 <trim21.me@gmail.com>
// @run-at     document-end
// @resource   icon1       http://www.tampermonkey.net/favicon.ico
// @resource   icon2       /images/icon.png
// @resource   html        http://www.tampermonkey.net/index.html
// @resource   xml         http://www.tampermonkey.net/crx/tampermonkey.xml
// @resource   SRIsecured1 http://www.tampermonkey.net/favicon.ico#md5=123434...
// @resource   SRIsecured2 http://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...
// @include    http://www.tampermonkey.net/*
// @include    http://*
// @include    https://*
// @include    /^https://www.tampermonkey.net/.*$/
// ==/UserScript==

```

## With bundle


### webpack

https://github.com/trim21/userscript-metadata-webpack-plugin

### esbuild

```js
const path = require('path');

const esbuild = require('esbuild');
const generate = require('userscript-metadata-generator');

const metadata = {};

esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, 'index.js')],
  banner: {
    js: generate(metadata) + '\n',
  },
  outfile: path.resolve(__dirname, 'dist/index.user.js'),
});
```

## rollup

```js
const path = require('path');

const banner2 = require('rollup-plugin-banner2')
const generate = require('userscript-metadata-generator');

module.exports = {
  input: path.resolve(__dirname, 'index.js'),
  output: [
    {
      format: 'iife',
      file: path.resolve(__dirname, "dist/index.uset.js"),
      plugins: [banner2(() => generate({ name: 'hello' }) + '\n\n')],
    },
  ],
}
```
