"use client";
import { useEffect, useMemo, useState } from "react";

type Lang = "javascript" | "python" | "java" | "cpp";

type Props = {
  nameText?: string;
  initialLang?: Lang;
  speedMs?: number;
  className?: string;
};

type Token = { text: string; type: "keyword" | "string" | "comment" | "number" | "variable" | "plain" };

function codeFor(nameText: string, lang: Lang) {
  if (lang === "javascript") {
    return `const developer = "${nameText}"; // portfolio\nconst level = 11`;
  }
  if (lang === "python") {
    return `developer = "${nameText}"  # portfolio\nlevel = 11`;
  }
  if (lang === "java") {
    return `String developer = "${nameText}"; // portfolio\nint level = 11;`;
  }
  return `std::string developer = "${nameText}"; // portfolio\nint level = 11;`;
}

function tokenize(code: string, lang: Lang): Token[] {
  const keywords: Record<Lang, string[]> = {
    javascript: ["const", "let", "var", "function", "return"],
    python: ["def", "return", "class", "import"],
    java: ["class", "public", "private", "static", "void", "int", "String", "new"],
    cpp: ["int", "float", "double", "char", "class", "namespace", "std", "string"],
  };
  const kwSet = new Set(keywords[lang]);
  const tokens: Token[] = [];
  let i = 0;
  while (i < code.length) {
    const rest = code.slice(i);
    if (lang === "python") {
      const m = rest.match(/^(#.*)/);
      if (m) {
        tokens.push({ text: m[1], type: "comment" });
        i += m[1].length;
        continue;
      }
    } else {
      const m = rest.match(/^(\/\/.*)/);
      if (m) {
        tokens.push({ text: m[1], type: "comment" });
        i += m[1].length;
        continue;
      }
    }
    {
      const m = rest.match(/^("([^"\\]|\\.)*")/);
      if (m) {
        tokens.push({ text: m[1], type: "string" });
        i += m[1].length;
        continue;
      }
    }
    {
      const m = rest.match(/^(\d+(\.\d+)?)/);
      if (m) {
        tokens.push({ text: m[1], type: "number" });
        i += m[1].length;
        continue;
      }
    }
    {
      const m = rest.match(/^([A-Za-z_]\w*)/);
      if (m) {
        const word = m[1];
        if (kwSet.has(word)) {
          tokens.push({ text: word, type: "keyword" });
        } else {
          tokens.push({ text: word, type: "variable" });
        }
        i += word.length;
        continue;
      }
    }
    tokens.push({ text: code[i], type: "plain" });
    i += 1;
  }
  return tokens;
}

export default function SyntaxTyping({ nameText = "Blake Royal", initialLang = "javascript", speedMs = 60, className }: Props) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [text, setText] = useState(nameText);
  const code = useMemo(() => codeFor(text, lang), [text, lang]);
  const toks = useMemo(() => tokenize(code, lang), [code, lang]);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setIdx(0);
      setDone(false);
    }, 0);
    return () => clearTimeout(t);
  }, [code]);

  useEffect(() => {
    let mounted = true;
    const t = setInterval(() => {
      if (!mounted) return;
      setIdx((v) => {
        if (v >= code.length) {
          clearInterval(t);
          setDone(true);
          return v;
        }
        return v + 1;
      });
    }, speedMs);
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, [code, speedMs]);

  const renderTokens = () => {
    let consumed = 0;
    const spans: React.ReactNode[] = [];
    for (const tok of toks) {
      if (consumed >= idx) break;
      const remaining = idx - consumed;
      const visible = tok.text.slice(0, remaining);
      const cls =
        tok.type === "keyword"
          ? "tok-keyword"
          : tok.type === "string"
          ? "tok-string"
          : tok.type === "comment"
          ? "tok-comment"
          : tok.type === "number"
          ? "tok-number"
          : tok.type === "variable"
          ? "tok-var"
          : "";
      spans.push(<span key={consumed} className={cls}>{visible}</span>);
      consumed += tok.text.length;
    }
    return spans;
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {}
  };

  return (
    <div className={className}>
      <div className="inline-flex items-center gap-3">
        <pre aria-live="polite" className="text-5xl md:text-7xl font-extrabold tracking-wider [font-family:var(--font-hero)]">
          {renderTokens()}
          {!done && <span className="caret" />}
        </pre>
        <button onClick={onCopy} className="px-3 py-2 rounded-md border border-white/10 text-sm text-white/80 hover:text-white hover:border-[color:var(--highlight-blue)] transition">
          Copy
        </button>
      </div>
      <div className="mt-4 flex items-center justify-center gap-2">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as Lang)}
          className="px-3 py-2 rounded-md border border-white/10 bg-black text-gray-300 hover:border-[color:var(--highlight-blue)]"
          aria-label="Language"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-3 py-2 rounded-md border border-white/10 bg-black text-gray-300 w-[280px] hover:border-[color:var(--highlight-blue)]"
          aria-label="Edit text"
          placeholder="Edit name text"
        />
      </div>
    </div>
  );
}
