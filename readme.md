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
// or you can use import, esm is also suppotted
import { userscriptMetadataGenerator, Metadata } from 'userscript-metadata-generator';
// or
// const { userscriptMetadataGenerator } = require('userscript-metadata-generator');

const metadata: Metadata = {
  name: {
    $: 'A test',
    de: 'Ein Test',
  },
  noframes: '',
  version: '0.1.2',
  author: {
    name: 'trim21',
    email: 'trim21.me@gmail.com',
  },
  'run-at': 'document-end',
  resource: {
    icon1: 'https://www.tampermonkey.net/favicon.ico',
    icon2: '/images/icon.png',
    html: 'https://www.tampermonkey.net/index.html',
    xml: 'https://www.tampermonkey.net/crx/tampermonkey.xml',
    SRIsecured1: 'https://www.tampermonkey.net/favicon.ico#md5=123434...',
    SRIsecured2: 'https://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...',
  },
  include: ['https://www.tampermonkey.net/*', 'https://*', 'https://*', '/^https://www.tampermonkey.net/.*$/'],
};

console.log(userscriptMetadataGenerator(metadata));
```

and you will get output like this:

```js
// ==UserScript==
// @name       A test
// @name:de    Ein Test
// @noframes
// @version    0.1.2
// @author     trim21 <trim21.me@gmail.com>
// @run-at     document-end
// @resource   icon1       https://www.tampermonkey.net/favicon.ico
// @resource   icon2       /images/icon.png
// @resource   html        https://www.tampermonkey.net/index.html
// @resource   xml         https://www.tampermonkey.net/crx/tampermonkey.xml
// @resource   SRIsecured1 https://www.tampermonkey.net/favicon.ico#md5=123434...
// @resource   SRIsecured2 https://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...
// @include    https://www.tampermonkey.net/*
// @include    https://*
// @include    https://*
// @include    /^https://www.tampermonkey.net/.*$/
// ==/UserScript==
```

## With bundle

### webpack

https://github.com/trim21/userscript-metadata-webpack-plugin

### esbuild

[example/esbuild.cjs](https://github.com/trim21/userscript-metadata-generator/blob/master/example/esbuild.cjs)

## rollup

[example/rollup.config.js](https://github.com/trim21/userscript-metadata-generator/blob/master/example/rollup.config.js)
