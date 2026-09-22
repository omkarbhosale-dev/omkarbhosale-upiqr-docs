import React, { useState, useMemo } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import Prism from '../lib/prism.js';

export default function CodeBlock({ code = '', language = 'typescript', filename }) {
  const [copied, setCopied] = useState(false);

  const { highlightedHtml, resolvedLang } = useMemo(() => {
    try {
      const rawLang = (language || 'typescript').toLowerCase();
      const langMap = {
        js: 'javascript',
        javascript: 'javascript',
        ts: 'typescript',
        typescript: 'typescript',
        sh: 'bash',
        bash: 'bash',
        shell: 'bash',
        py: 'python',
        python: 'python',
        html: 'markup',
        xml: 'markup',
        markup: 'markup',
        json: 'json',
        tsx: 'tsx',
        jsx: 'jsx',
      };
      const resolved = langMap[rawLang] || rawLang;
      const grammar = Prism.languages[resolved] || Prism.languages.typescript || Prism.languages.javascript;
      const highlighted = Prism.highlight((code || '').trim(), grammar, resolved);
      return { highlightedHtml: highlighted, resolvedLang: resolved };
    } catch (err) {
      return { highlightedHtml: (code || '').trim(), resolvedLang: language };
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText((code || '').trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="code-block-wrapper my-5 overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10 bg-[#090d16] shadow-xl text-slate-100">
      {/* Code header bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0f1422] px-4 py-2 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          {filename ? (
            <span className="font-mono font-medium text-slate-300">{filename}</span>
          ) : (
            <div className="flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 text-brand-400" />
              <span className="font-mono uppercase tracking-wider text-[11px] text-brand-400">
                {language}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 rounded-md bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-all active:scale-95"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body with syntax highlighted tokens */}
      <div className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <pre className="font-mono text-slate-200 selection:bg-brand-500/30 selection:text-white">
          <code
            className={`language-${resolvedLang} font-mono`}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </pre>
      </div>

      {/* Embedded scoped styles to guarantee vibrant syntax highlighting everywhere */}
      <style jsx global>{`
        .code-block-wrapper pre code .token.comment,
        .code-block-wrapper pre code .token.prolog,
        .code-block-wrapper pre code .token.doctype,
        .code-block-wrapper pre code .token.cdata {
          color: #64748b !important;
          font-style: italic;
        }

        .code-block-wrapper pre code .token.punctuation {
          color: #94a3b8 !important;
        }

        .code-block-wrapper pre code .token.property,
        .code-block-wrapper pre code .token.tag,
        .code-block-wrapper pre code .token.boolean,
        .code-block-wrapper pre code .token.number,
        .code-block-wrapper pre code .token.constant,
        .code-block-wrapper pre code .token.symbol,
        .code-block-wrapper pre code .token.deleted {
          color: #fbbf24 !important;
        }

        .code-block-wrapper pre code .token.selector,
        .code-block-wrapper pre code .token.attr-name,
        .code-block-wrapper pre code .token.string,
        .code-block-wrapper pre code .token.char,
        .code-block-wrapper pre code .token.builtin,
        .code-block-wrapper pre code .token.inserted {
          color: #34d399 !important;
        }

        .code-block-wrapper pre code .token.operator,
        .code-block-wrapper pre code .token.entity,
        .code-block-wrapper pre code .token.url,
        .code-block-wrapper pre code.language-css .token.string,
        .code-block-wrapper pre code.style .token.string {
          color: #38bdf8 !important;
        }

        .code-block-wrapper pre code .token.atrule,
        .code-block-wrapper pre code .token.attr-value,
        .code-block-wrapper pre code .token.keyword {
          color: #c084fc !important;
          font-weight: 600;
        }

        .code-block-wrapper pre code .token.function,
        .code-block-wrapper pre code .token.class-name {
          color: #60a5fa !important;
        }

        .code-block-wrapper pre code .token.regex,
        .code-block-wrapper pre code .token.important,
        .code-block-wrapper pre code .token.variable {
          color: #f43f5e !important;
        }

        .code-block-wrapper pre code .token.parameter {
          color: #e2e8f0 !important;
        }
      `}</style>
    </div>
  );
}
