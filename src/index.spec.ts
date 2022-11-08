import { describe, expect, test } from '@jest/globals';

import generate, { Metadata } from '../src/index';

function generateLines(o: Metadata) {
  return generate(o).split('\n');
}

describe('generate metadata block', function () {
  test('string value', function () {
    expect(generateLines({ name: 's' })).toEqual(['// ==UserScript==', '// @name   s', '// ==/UserScript==']);
  });

  test('array value', function () {
    expect(
      generateLines({
        require: ['1', '2'],
      }),
    ).toEqual(['// ==UserScript==', '// @require   1', '// @require   2', '// ==/UserScript==']);
  });

  test('object value', function () {
    expect(
      generateLines({
        resource: {
          A: 'https://resource.a',
          BB: 'https://resource.b',
        },
      }),
    ).toEqual([
      '// ==UserScript==',
      '// @resource   A  https://resource.a',
      '// @resource   BB https://resource.b',
      '// ==/UserScript==',
    ]);
  });

  test('resource issue 4', function () {
    expect(
      generateLines({
        resource: {
          'icon-example-1': 'https://my.website.com/resource1.png',
          'icon-example-2': 'https://my.website.com/resource2.png',
        },
      }),
    ).toEqual([
      '// ==UserScript==',
      '// @resource   icon-example-1 https://my.website.com/resource1.png',
      '// @resource   icon-example-2 https://my.website.com/resource2.png',
      '// ==/UserScript==',
    ]);
  });

  test('resource []string', function () {
    expect(
      generateLines({
        resource: ['A https://resource.a', 'B https://resource.b'],
      }),
    ).toEqual([
      '// ==UserScript==',
      '// @resource   A https://resource.a',
      '// @resource   B https://resource.b',
      '// ==/UserScript==',
    ]);
  });

  test('auth only name', function () {
    expect(generateLines({ author: { name: 'trim21' } })).toEqual([
      '// ==UserScript==',
      '// @author   trim21',
      '// ==/UserScript==',
    ]);
  });

  test('auth with email', function () {
    expect(
      generateLines({
        author: { name: 'trim21', email: 'trim21.me@gmail.com' },
      }),
    ).toEqual(['// ==UserScript==', '// @author   trim21 <trim21.me@gmail.com>', '// ==/UserScript==']);
  });

  test('auth undefined', function () {
    expect(generateLines({})).toEqual(['// ==UserScript==', '// ==/UserScript==']);
  });
});
