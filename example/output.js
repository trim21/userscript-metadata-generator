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

"use strict";
console.log("hello");
