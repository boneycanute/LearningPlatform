// lib/monaco/themes.ts
import type { editor } from 'monaco-editor';

export const catppuccinThemes: Record<string, editor.IStandaloneThemeData> = {
  latte: {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '8c8fa1', fontStyle: 'italic' },
      { token: 'keyword', foreground: '8839ef' }, // Mauve
      { token: 'string', foreground: '40a02b' }, // Green
      { token: 'number', foreground: 'fe640b' }, // Peach
      { token: 'type', foreground: 'df8e1d' }, // Yellow
      { token: 'class', foreground: 'df8e1d' }, // Yellow
      { token: 'interface', foreground: 'df8e1d' }, // Yellow
      { token: 'function', foreground: '1e66f5' }, // Blue
      { token: 'variable', foreground: '4c4f69' }, // Text
      { token: 'variable.predefined', foreground: 'd20f39' }, // Red
      { token: 'operator', foreground: '04a5e5' }, // Sky
      { token: 'delimiter', foreground: '8c8fa1' }, // Overlay2
      { token: 'regexp', foreground: 'ea76cb' }, // Pink
    ],
    colors: {
      'editor.background': '#eff1f5',
      'editor.foreground': '#4c4f69',
      'editor.lineHighlightBackground': '#e6e9ef',
      'editorLineNumber.foreground': '#8c8fa1',
      'editorLineNumber.activeForeground': '#1e66f5',
      'editor.selectionBackground': '#8839ef20',
    }
  },
  frappe: {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'a5adce', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ca9ee6' }, // Mauve
      { token: 'string', foreground: 'a6d189' }, // Green
      { token: 'number', foreground: 'ef9f76' }, // Peach
      { token: 'type', foreground: 'e5c890' }, // Yellow
      { token: 'class', foreground: 'e5c890' }, // Yellow
      { token: 'interface', foreground: 'e5c890' }, // Yellow
      { token: 'function', foreground: '8caaee' }, // Blue
      { token: 'variable', foreground: 'c6d0f5' }, // Text
      { token: 'variable.predefined', foreground: 'e78284' }, // Red
      { token: 'operator', foreground: '99d1db' }, // Sky
      { token: 'delimiter', foreground: 'a5adce' }, // Overlay2
      { token: 'regexp', foreground: 'f4b8e4' }, // Pink
    ],
    colors: {
      'editor.background': '#303446',
      'editor.foreground': '#c6d0f5',
      'editor.lineHighlightBackground': '#414559',
      'editorLineNumber.foreground': '#a5adce',
      'editorLineNumber.activeForeground': '#8caaee',
      'editor.selectionBackground': '#ca9ee620',
    }
  },
  macchiato: {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'a5adcb', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c6a0f6' }, // Mauve
      { token: 'string', foreground: 'a6da95' }, // Green
      { token: 'number', foreground: 'f5a97f' }, // Peach
      { token: 'type', foreground: 'eed49f' }, // Yellow
      { token: 'class', foreground: 'eed49f' }, // Yellow
      { token: 'interface', foreground: 'eed49f' }, // Yellow
      { token: 'function', foreground: '8aadf4' }, // Blue
      { token: 'variable', foreground: 'cad3f5' }, // Text
      { token: 'variable.predefined', foreground: 'ed8796' }, // Red
      { token: 'operator', foreground: '91d7e3' }, // Sky
      { token: 'delimiter', foreground: 'a5adcb' }, // Overlay2
      { token: 'regexp', foreground: 'f5bde6' }, // Pink
    ],
    colors: {
      'editor.background': '#24273a',
      'editor.foreground': '#cad3f5',
      'editor.lineHighlightBackground': '#363a4f',
      'editorLineNumber.foreground': '#a5adcb',
      'editorLineNumber.activeForeground': '#8aadf4',
      'editor.selectionBackground': '#c6a0f620',
    }
  },
  mocha: {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: 'a6adc8', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'cba6f7' }, // Mauve
      { token: 'string', foreground: 'a6e3a1' }, // Green
      { token: 'number', foreground: 'fab387' }, // Peach
      { token: 'type', foreground: 'f9e2af' }, // Yellow
      { token: 'class', foreground: 'f9e2af' }, // Yellow
      { token: 'interface', foreground: 'f9e2af' }, // Yellow
      { token: 'function', foreground: '89b4fa' }, // Blue
      { token: 'variable', foreground: 'cdd6f4' }, // Text
      { token: 'variable.predefined', foreground: 'f38ba8' }, // Red
      { token: 'operator', foreground: '89dceb' }, // Sky
      { token: 'delimiter', foreground: 'a6adc8' }, // Overlay2
      { token: 'regexp', foreground: 'f5c2e7' }, // Pink
    ],
    colors: {
      'editor.background': '#1e1e2e',
      'editor.foreground': '#cdd6f4',
      'editor.lineHighlightBackground': '#313244',
      'editorLineNumber.foreground': '#a6adc8',
      'editorLineNumber.activeForeground': '#89b4fa',
      'editor.selectionBackground': '#cba6f720',
    }
  }
};