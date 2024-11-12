"use client";
import React, { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, ArrowRight, Terminal, X } from "lucide-react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Lesson } from "@/types/lesson";
import ReactMarkdown from "react-markdown";
import Editor, { useMonaco } from "@monaco-editor/react";
import {
  solidityLanguageConfiguration,
  solidityTokenProvider,
} from "@/lib/monaco/solidity";
import { useTheme } from "@/lib/theme-context";
import { catppuccinThemes } from "@/lib/monaco/themes";

import type { editor } from "monaco-editor";
import { on } from "events";

interface LessonViewerProps {
  lesson: Lesson;
}

interface CodeFeedback {
  isCorrect: boolean;
  message: string;
  lineErrors?: Array<{
    line: number;
    message: string;
  }>;
}

const monacoTheme = {
  base: "vs",
  inherit: true,
  rules: [
    { token: "comment", foreground: "999999", fontStyle: "italic" },
    { token: "keyword", foreground: "000000" },
    { token: "number", foreground: "000000" },
    { token: "string", foreground: "000000" },
    { token: "type", foreground: "000000" },
    { token: "type.solidity", foreground: "000000" },
    { token: "keyword.solidity", foreground: "000000" },
    { token: "modifier.solidity", foreground: "000000" },
    { token: "global.solidity", foreground: "000000" },
    { token: "function.solidity", foreground: "000000" },
  ],
  colors: {
    "editor.background": "#FFFFFF",
    "editor.foreground": "#000000",
    "editor.lineHighlightBackground": "#F7F7F7",
    "editorLineNumber.foreground": "#2472C8",
    "editorLineNumber.activeForeground": "#2472C8",
    "editor.selectionBackground": "#ADD6FF",
    "editor.inactiveSelectionBackground": "#E5EBF1",
    "editorCursor.foreground": "#000000",
    "editor.lineHighlightBorder": "#00000000",
    "editorGutter.background": "#FFFFFF",
  },
};

const LessonViewer = ({ lesson }: LessonViewerProps) => {
  const [code, setCode] = useState(lesson.lessonCodePlaceHolder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<CodeFeedback | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monaco = useMonaco();
  const feedbackPanelRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        feedbackPanelRef.current &&
        !feedbackPanelRef.current.contains(event.target as Node) &&
        showFeedback
      ) {
        setShowFeedback(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFeedback]);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;

    if (monaco) {
      // Define Catppuccin themes
      monaco.editor.defineTheme("latte", {
        base: "vs",
        inherit: true,
        rules: [
          { token: "comment", foreground: "8c8fa1", fontStyle: "italic" },
          { token: "keyword", foreground: "8839ef" }, // Mauve
          { token: "string", foreground: "40a02b" }, // Green
          { token: "number", foreground: "fe640b" }, // Peach
          { token: "type", foreground: "df8e1d" }, // Yellow
          { token: "class", foreground: "df8e1d" }, // Yellow
          { token: "function", foreground: "1e66f5" }, // Blue
          { token: "variable", foreground: "4c4f69" }, // Text
          { token: "variable.predefined", foreground: "d20f39" }, // Red
          { token: "operator", foreground: "04a5e5" }, // Sky
        ],
        colors: {
          "editor.background": "#eff1f5",
          "editor.foreground": "#4c4f69",
          "editor.lineHighlightBackground": "#e6e9ef",
          "editorLineNumber.foreground": "#8c8fa1",
          "editorLineNumber.activeForeground": "#1e66f5",
          "editor.selectionBackground": "#8839ef20",
        },
      });

      monaco.editor.defineTheme("frappe", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "a5adce", fontStyle: "italic" },
          { token: "keyword", foreground: "ca9ee6" }, // Mauve
          { token: "string", foreground: "a6d189" }, // Green
          { token: "number", foreground: "ef9f76" }, // Peach
          { token: "type", foreground: "e5c890" }, // Yellow
          { token: "class", foreground: "e5c890" }, // Yellow
          { token: "function", foreground: "8caaee" }, // Blue
          { token: "variable", foreground: "c6d0f5" }, // Text
          { token: "variable.predefined", foreground: "e78284" }, // Red
          { token: "operator", foreground: "99d1db" }, // Sky
        ],
        colors: {
          "editor.background": "#303446",
          "editor.foreground": "#c6d0f5",
          "editor.lineHighlightBackground": "#414559",
          "editorLineNumber.foreground": "#a5adce",
          "editorLineNumber.activeForeground": "#8caaee",
          "editor.selectionBackground": "#ca9ee620",
        },
      });

      monaco.editor.defineTheme("macchiato", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "a5adcb", fontStyle: "italic" },
          { token: "keyword", foreground: "c6a0f6" }, // Mauve
          { token: "string", foreground: "a6da95" }, // Green
          { token: "number", foreground: "f5a97f" }, // Peach
          { token: "type", foreground: "eed49f" }, // Yellow
          { token: "class", foreground: "eed49f" }, // Yellow
          { token: "function", foreground: "8aadf4" }, // Blue
          { token: "variable", foreground: "cad3f5" }, // Text
          { token: "variable.predefined", foreground: "ed8796" }, // Red
          { token: "operator", foreground: "91d7e3" }, // Sky
        ],
        colors: {
          "editor.background": "#24273a",
          "editor.foreground": "#cad3f5",
          "editor.lineHighlightBackground": "#363a4f",
          "editorLineNumber.foreground": "#a5adcb",
          "editorLineNumber.activeForeground": "#8aadf4",
          "editor.selectionBackground": "#c6a0f620",
        },
      });

      monaco.editor.defineTheme("mocha", {
        base: "vs-dark",
        inherit: true,
        rules: [
          { token: "comment", foreground: "a6adc8", fontStyle: "italic" },
          { token: "keyword", foreground: "cba6f7" }, // Mauve
          { token: "string", foreground: "a6e3a1" }, // Green
          { token: "number", foreground: "fab387" }, // Peach
          { token: "type", foreground: "f9e2af" }, // Yellow
          { token: "class", foreground: "f9e2af" }, // Yellow
          { token: "function", foreground: "89b4fa" }, // Blue
          { token: "variable", foreground: "cdd6f4" }, // Text
          { token: "variable.predefined", foreground: "f38ba8" }, // Red
          { token: "operator", foreground: "89dceb" }, // Sky
        ],
        colors: {
          "editor.background": "#1e1e2e",
          "editor.foreground": "#cdd6f4",
          "editor.lineHighlightBackground": "#313244",
          "editorLineNumber.foreground": "#a6adc8",
          "editorLineNumber.activeForeground": "#89b4fa",
          "editor.selectionBackground": "#cba6f720",
        },
      });

      // Set current theme based on current catppuccin theme
      monaco.editor.setTheme(theme);

      // Register Solidity language
      monaco.languages.register({ id: "solidity" });

      // Define Solidity syntax highlighting rules
      monaco.languages.setMonarchTokensProvider("solidity", {
        keywords: [
          "pragma",
          "solidity",
          "contract",
          "library",
          "interface",
          "function",
          "modifier",
          "event",
          "constructor",
          "address",
          "string",
          "bool",
          "int",
          "uint",
          "byte",
          "bytes",
          "public",
          "private",
          "external",
          "internal",
          "payable",
          "view",
          "pure",
          "storage",
          "memory",
          "calldata",
          "if",
          "else",
          "for",
          "while",
          "do",
          "break",
          "continue",
          "return",
          "true",
          "false",
          "new",
          "delete",
          "mapping",
          "msg",
          "block",
          "tx",
          "require",
          "assert",
          "revert",
          "emit",
        ],

        operators: [
          "=",
          ">",
          "<",
          "!",
          "~",
          "?",
          ":",
          "==",
          "<=",
          ">=",
          "!=",
          "&&",
          "||",
          "++",
          "--",
          "+",
          "-",
          "*",
          "/",
          "&",
          "|",
          "^",
          "%",
          "<<",
          ">>",
          ">>>",
          "+=",
          "-=",
          "*=",
          "/=",
          "&=",
          "|=",
          "^=",
          "%=",
          "<<=",
          ">>=",
          ">>>=",
        ],

        // we include these common regular expressions
        symbols: /[=><!~?:&|+\-*\/\^%]+/,
        escapes:
          /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

        tokenizer: {
          root: [
            // identifiers and keywords
            [
              /[a-z_$][\w$]*/,
              {
                cases: {
                  "@keywords": "keyword",
                  "@default": "variable",
                },
              },
            ],

            // whitespace
            { include: "@whitespace" },

            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
            [/0[xX][0-9a-fA-F]+/, "number.hex"],
            [/\d+/, "number"],

            // strings
            [/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
            [/"/, { token: "string.quote", bracket: "@open", next: "@string" }],

            // characters
            [/'[^\\']'/, "string"],
            [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
            [/'/, "string.invalid"],
          ],

          comment: [
            [/[^\/*]+/, "comment"],
            [/\/\*/, "comment", "@push"], // nested comment
            ["\\*/", "comment", "@pop"],
            [/[\/*]/, "comment"],
          ],

          string: [
            [/[^\\"]+/, "string"],
            [/@escapes/, "string.escape"],
            [/\\./, "string.escape.invalid"],
            [/"/, { token: "string.quote", bracket: "@close", next: "@pop" }],
          ],

          whitespace: [
            [/[ \t\r\n]+/, "white"],
            [/\/\*/, "comment", "@comment"],
            [/\/\/.*$/, "comment"],
          ],
        },
      });

      // Configure editor settings
      editor.updateOptions({
        fontFamily: "'Fira Code', monospace",
        fontSize: 14,
        lineNumbers: "on",
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        renderLineHighlight: "line",
        padding: { top: 16, bottom: 16 },
        lineHeight: 24,
        folding: true,
        glyphMargin: false,
        bracketPairColorization: { enabled: true },
        guides: {
          bracketPairs: true,
          indentation: true,
        },
        smoothScrolling: true,
        cursorBlinking: "smooth",
        cursorSmoothCaretAnimation: "on",
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        autoIndent: "advanced",
        contextmenu: false,
      });
    }
  };

  const updateErrorDecorations = (
    lineErrors?: Array<{ line: number; message: string }>
  ) => {
    if (!editorRef.current || !lineErrors) return;

    const decorations = lineErrors.map((error) => ({
      range: new monaco!.Range(error.line, 1, error.line, 1),
      options: {
        isWholeLine: true,
        className: "errorLineDecoration",
        glyphMarginClassName: "errorGlyphMargin",
        hoverMessage: { value: error.message },
        linesDecorationsClassName: "errorLineDecoration",
        inlineClassName: "errorLineDecoration",
        backgroundColor: "rgba(255, 0, 0, 0.1)",
      },
    }));

    editorRef.current.deltaDecorations([], decorations);
  };

  const evaluateCode = async (submittedCode: string, solutionCode: string) => {
    try {
      const response = await fetch("/api/evaluate-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedCode,
          solutionCode,
          language: "solidity",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate code");
      }

      const result = await response.json();
      return result as CodeFeedback;
    } catch (error) {
      console.error("Error evaluating code:", error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setShowFeedback(true);

    try {
      const evaluation = await evaluateCode(code, lesson.lessonCodeSolution);
      setFeedback(evaluation);
      updateErrorDecorations(evaluation.lineErrors);

      if (evaluation.isCorrect) {
        toast.success("Code submitted successfully!");
      } else {
        toast.error("Code needs some improvements");
      }
    } catch (error) {
      toast.error("Failed to evaluate code");
      setFeedback({
        isCorrect: false,
        message: "Failed to evaluate code. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          Lesson {lesson.lessonNumber}: {lesson.lessonTitle}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{lesson.xp} XP</span>
          {lesson.lessonConcepts.map((concept) => (
            <span
              key={concept}
              className="hidden md:inline-flex items-center rounded-md bg-muted px-2 py-1 text-sm font-medium"
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      <Card className="h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full rounded-lg border"
        >
          <ResizablePanel defaultSize={50}>
            <ScrollArea className="h-full p-6">
              <ReactMarkdown className="prose dark:prose-invert">
                {lesson.lessonContentMD}
              </ReactMarkdown>
            </ScrollArea>
          </ResizablePanel>

          <ResizableHandle />

          <ResizablePanel defaultSize={50}>
            <div className="h-full flex flex-col">
              <div className="flex-1 p-4 relative">
                <Editor
                  height="100%"
                  defaultLanguage="solidity"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  onMount={handleEditorDidMount}
                  options={{
                    fontSize: 14,
                    fontFamily:
                      "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace",
                    lineNumbers: "on",
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    renderLineHighlight: "line",
                    padding: { top: 16, bottom: 16 },
                    lineHeight: 24,
                    tabSize: 4,
                    autoIndent: "full",
                    scrollbar: {
                      vertical: "hidden",
                      horizontal: "hidden",
                    },
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    renderLineHighlightOnlyWhenFocus: false,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                  }}
                  className="border rounded-md overflow-hidden"
                />

                {/* Feedback Panel with click outside handling */}
                {feedback && (
                  <div
                    ref={feedbackPanelRef}
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-300 ease-in-out transform ${
                      showFeedback
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="bg-background border-t shadow-lg">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Terminal className="h-4 w-4" />
                            <span className="font-medium">Code Feedback</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowFeedback(false)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <Alert
                          variant={
                            feedback.isCorrect ? "default" : "destructive"
                          }
                        >
                          <AlertTitle>
                            {feedback.isCorrect
                              ? "Success!"
                              : "Needs Improvement"}
                          </AlertTitle>
                          <AlertDescription className="mt-2">
                            {feedback.message}
                            {feedback.lineErrors &&
                              feedback.lineErrors.length > 0 && (
                                <ul className="mt-2 space-y-1">
                                  {feedback.lineErrors.map((error, index) => (
                                    <li key={index} className="text-sm">
                                      Line {error.line}: {error.message}
                                    </li>
                                  ))}
                                </ul>
                              )}
                          </AlertDescription>
                        </Alert>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t bg-muted">
                <div className="flex justify-between items-center">
                  <Button variant="outline">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous Lesson
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? "Evaluating..." : "Submit Code"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Card>
    </div>
  );
};

export default LessonViewer;
