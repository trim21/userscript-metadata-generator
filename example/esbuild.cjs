const path = require('path')

const esbuild = require('esbuild')

const metadata = require('../src/cjs_shim.cjs');


esbuild.buildSync({
  entryPoints: [path.resolve(__dirname, "input.js")],
  banner: {
    js: metadata({
      name: {
        "": "A test",
        'de': 'Ein Test',
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
