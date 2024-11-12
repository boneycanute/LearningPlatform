// lib/monaco/solidity.ts

export const solidityLanguageConfiguration = {
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/'],
  },
  brackets: [
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
  ],
  autoClosingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};

export const solidityTokenProvider = {
  defaultToken: '',
  tokenPostfix: '.sol',

  keywords: [
    'pragma', 'solidity', 'contract', 'library', 'interface',
    'function', 'modifier', 'event', 'constructor',
    'address', 'string', 'bool', 'int', 'uint', 'byte', 'bytes',
    'public', 'private', 'external', 'internal', 'payable', 'view', 'pure',
    'storage', 'memory', 'calldata',
    'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'return',
    'true', 'false',
    'new', 'delete',
    'mapping',
    'msg', 'block', 'tx',
    'require', 'assert', 'revert',
    'emit',
  ],

  typeKeywords: [
    'address', 'bool', 'string', 'var', 'int', 'uint', 'fixed', 'ufixed',
    'byte', 'bytes', 'bytes1', 'bytes2', 'bytes3', 'bytes4', 'bytes5',
    'bytes6', 'bytes7', 'bytes8', 'bytes9', 'bytes10', 'bytes11', 'bytes12',
    'bytes13', 'bytes14', 'bytes15', 'bytes16', 'bytes17', 'bytes18',
    'bytes19', 'bytes20', 'bytes21', 'bytes22', 'bytes23', 'bytes24',
    'bytes25', 'bytes26', 'bytes27', 'bytes28', 'bytes29', 'bytes30',
    'bytes31', 'bytes32',
    'int8', 'int16', 'int24', 'int32', 'int40', 'int48', 'int56', 'int64',
    'int72', 'int80', 'int88', 'int96', 'int104', 'int112', 'int120',
    'int128', 'int136', 'int144', 'int152', 'int160', 'int168', 'int176',
    'int184', 'int192', 'int200', 'int208', 'int216', 'int224', 'int232',
    'int240', 'int248', 'int256',
    'uint8', 'uint16', 'uint24', 'uint32', 'uint40', 'uint48', 'uint56',
    'uint64', 'uint72', 'uint80', 'uint88', 'uint96', 'uint104', 'uint112',
    'uint120', 'uint128', 'uint136', 'uint144', 'uint152', 'uint160',
    'uint168', 'uint176', 'uint184', 'uint192', 'uint200', 'uint208',
    'uint216', 'uint224', 'uint232', 'uint240', 'uint248', 'uint256',
  ],

  operators: [
    '=', '>', '<', '!', '~', '?', ':',
    '==', '<=', '>=', '!=', '&&', '||', '++', '--',
    '+', '-', '*', '/', '&', '|', '^', '%', '<<',
    '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
    '^=', '%=', '<<=', '>>=', '>>>=',
  ],

  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  tokenizer: {
    root: [
      // Identifiers and keywords
      [/[a-zA-Z_$][\w$]*/, {
        cases: {
          '@typeKeywords': 'type',
          '@keywords': 'keyword',
          '@default': 'identifier'
        }
      }],

      // Whitespace
      { include: '@whitespace' },

      // Delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, {
        cases: {
          '@operators': 'operator',
          '@default': ''
        }
      }],

      // Numbers
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

      // Strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
    ],

    comment: [
      [/[^\/*]+/, 'comment'],
      [/\/\*/, 'comment', '@push'],
      ["\\*/", 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/\/\*/, 'comment', '@comment'],
      [/\/\/.*$/, 'comment'],
    ],
  },
};