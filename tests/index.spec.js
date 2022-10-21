const { describe, expect, test } = require('@jest/globals');

const { resource, generate } = require('../src/index');

function generateLines(o) {
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
        resource: resource({
          A: 'https://resource.a',
          BB: 'https://resource.b',
        }),
      }),
    ).toEqual([
      '// ==UserScript==',
      '// @resource   A  https://resource.a',
      '// @resource   BB https://resource.b',
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
