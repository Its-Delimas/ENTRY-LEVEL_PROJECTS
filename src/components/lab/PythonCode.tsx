import { Fragment } from "react";

const KEYWORDS = new Set([
  "def", "return", "if", "elif", "else", "for", "while", "in", "not", "and",
  "or", "import", "from", "as", "True", "False", "None", "with", "break",
  "continue", "pass", "lambda", "try", "except", "is", "class",
]);
const BUILTINS = new Set([
  "print", "len", "sum", "range", "round", "abs", "max", "min", "int",
  "float", "str", "list", "dict", "open", "sorted", "type", "enumerate",
]);

const TOKEN = /(#[^\n]*)|(f?"[^"\n]*"|f?'[^'\n]*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/g;

function highlightLine(line: string) {
  const out: React.ReactNode[] = [];
  let m: RegExpExecArray | null;
  let i = 0;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(line))) {
    const [text, comment, str, num, word] = m;
    let cls = "";
    if (comment) cls = "text-white/40 italic";
    else if (str) cls = "text-[#f5c07a]";
    else if (num) cls = "text-[#8fd3ff]";
    else if (word && KEYWORDS.has(word)) cls = "text-lime";
    else if (word && BUILTINS.has(word)) cls = "text-[#c5a3ff]";
    out.push(
      cls ? (
        <span key={i++} className={cls}>
          {text}
        </span>
      ) : (
        <Fragment key={i++}>{text}</Fragment>
      ),
    );
  }
  return out;
}

/** A small, dependency-free Python highlighter for read-only snippets. */
export default function PythonCode({
  code,
  highlightLine: marked,
  lineNumbers = false,
  className = "",
}: {
  code: string;
  highlightLine?: number | null;
  lineNumbers?: boolean;
  className?: string;
}) {
  const lines = code.replace(/\n$/, "").split("\n");
  return (
    <pre
      className={`overflow-x-auto rounded-2xl bg-ink p-5 font-mono text-[13px] leading-relaxed text-white/85 ${className}`}
    >
      <code>
        {lines.map((line, idx) => (
          <span
            key={idx}
            className={`block ${
              marked === idx + 1 ? "-mx-5 bg-lime/15 px-5 shadow-[inset_3px_0_0_var(--color-lime)]" : ""
            }`}
          >
            {lineNumbers && (
              <span className="mr-4 inline-block w-5 select-none text-right text-white/25">
                {idx + 1}
              </span>
            )}
            {highlightLine(line)}
            {line === "" && " "}
          </span>
        ))}
      </code>
    </pre>
  );
}
