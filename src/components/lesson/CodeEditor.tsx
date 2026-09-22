"use client";

import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={oneDark}
      extensions={[python()]}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        foldGutter: false,
        highlightActiveLine: true,
      }}
      className="h-full text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:font-mono"
    />
  );
}
