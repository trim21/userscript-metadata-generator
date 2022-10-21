function longestLength(a: string[]): number {
  return a.reduce(function (a, b) {
    return a.length > b.length ? a : b;
  }, '').length;
}

type Author = string | { name: string; email?: string; url?: string };

function parseAuthor(author: Author): string {
  if (typeof author === 'string') return author;

  let a = author.name;

  if (author.email) {
    a += ' <' + author.email + '>';
  }
  if (author.url) {
    a += ' (' + author.url + ')';
  }

  return a;
}

type Value = string | string[] | undefined | null | { [key: string]: string };
type Line = [string, string];

export function generate(metadata: { name: string; author?: Author; [keys: string]: Value }) {
  const lines: Array<Line> = [];

  for (const [key, value] of Object.entries(metadata)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (key === 'author') {
      lines.push([key, parseAuthor(value as Author)]);
      continue;
    }

    lines.push(...anyField(key, value));
  }

  let pad = longestLength(lines.map((x) => x[0])) + 3;

  return [
    '// ==UserScript==',
    ...lines.map(([key, value]) => `// @${key.padEnd(pad)}${value}`),
    '// ==/UserScript==',
  ].join('\n');
}

function anyField(key: string, value: Value): Array<[string, string]> {
  if (typeof value === 'string') {
    return [[key, value]];
  }

  if (Array.isArray(value)) {
    return value.map((x) => [key, x]);
  }

  if (value === undefined || value === null) {
    return [];
  }

  return Object.entries(value).map(([k, v]) => [`${key}:${k}`, v]);
}

export function resource(o: { [keys: string]: string }): Array<string> {
  const pad = longestLength(Object.keys(o));
  return Object.entries(o).map(([key, value]) => {
    return `${key.padEnd(pad)} ${value}`;
  });
}
