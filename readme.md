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
const path = require('path')

const esbuild = require('esbuild')

const metadata = require('userscript-metadata-generator');

// or import generate from 'userscript-metadata-generator';

esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, "input.js")],
  banner: {
    js: metadata({
      name: {
        "": "A test", // special key for `@name`
        'de': 'Ein Test', // localization
      },
      version: "0.1.2",
      author: {
        name: "trim21",
        email: "trim21.me@gmail.com",
      },
      'run-at': "document-end",
      resource: {
        icon1: 'http://www.tampermonkey.net/favicon.ico',
        icon2: '/images/icon.png',
        html: 'http://www.tampermonkey.net/index.html',
        xml: 'http://www.tampermonkey.net/crx/tampermonkey.xml',
        SRIsecured1: 'http://www.tampermonkey.net/favicon.ico#md5=123434...',
        SRIsecured2: 'http://www.tampermonkey.net/favicon.ico#md5=123434...;sha256=234234...',
      },
      include: [
        'http://www.tampermonkey.net/*',
        'http://*',
        'https://*',
        '/^https:\/\/www\.tampermonkey\.net\/.*$/',
      ]
    }) + '\n',
  },
  outfile: path.resolve(__dirname, "output.js"),
})
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

...
```
