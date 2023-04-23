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

export type Localized =
  | string
  | {
      $: string; // main field value
      [key: string]: string; // localized field value
    };

type Grant =
  | 'none'
  | 'GM.getValue'
  | 'GM_getValue'
  | 'GM.setValue'
  | 'GM_setValue'
  | 'GM.openInTab'
  | 'GM.deleteValue'
  | 'GM.listValues'
  | 'GM.getResourceUrl'
  | 'GM.notification'
  | 'GM.registerMenuCommand'
  | 'GM.setClipboard'
  | 'GM.xmlHttpRequest'
  | 'unsafeWindow'
  | string; // for new grant

export type Metadata = {
  name?: Localized;
  namespace?: string;
  description?: Localized;
  license?: string;
  include?: string[];
  require?: string[];
  connect?: string[];
  'run-at'?: 'document-end' | 'document-start' | 'document-idle' | string;
  version?: string;
  author?: Author;
  resource?: string[] | { [keys: string]: string };
  grant?: Grant[];
  [keys: string]: Value;
};

export function generate(metadata: Metadata) {
  const lines: Array<Line> = [];

  for (const [key, value] of Object.entries(metadata)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (key === 'author') {
      lines.push([key, parseAuthor(value as Author)]);
      continue;
    }

    if (key === 'resource') {
      lines.push(...anyField(key, resource(value as { [keys: string]: string })));
      continue;
    }

    lines.push(...anyField(key, value));
  }

  let pad = longestLength(lines.map((x) => x[0])) + 3;

  return [
    '// ==UserScript==',
    ...lines.map(([key, value]) => `// @${key.padEnd(pad)}${value}`.trimEnd()),
    '// ==/UserScript==',
  ].join('\n');
}

export default generate;

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

  if (value[''] && value['$']) {
    throw new Error(`failed to serialized field ${key}, use remove can't use key "" with "$"`);
  }

  return Object.entries(value).map(([k, v]) => {
    if (k === '' || k === '$') {
      return [`${key}`, v];
    }
    return [`${key}:${k}`, v];
  });
}

function resource(o: string[] | { [keys: string]: string }): Array<string> {
  if (Array.isArray(o)) {
    return o;
  }

  const pad = longestLength(Object.keys(o));
  return Object.entries(o).map(([key, value]) => {
    return `${key.padEnd(pad)} ${value}`;
  });
}
