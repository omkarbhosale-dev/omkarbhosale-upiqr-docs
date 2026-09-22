import React from 'react';
import DocsLayout from '../../components/DocsLayout';
import CodeBlock from '../../components/CodeBlock';
import Tabs from '../../components/Tabs';
import Callout from '../../components/Callout';
import Badge from '../../components/Badge';

const npmInstall = `npm install @omkarbhosale/upiqr`;
const pnpmInstall = `pnpm add @omkarbhosale/upiqr`;
const yarnInstall = `yarn add @omkarbhosale/upiqr`;
const bunInstall = `bun add @omkarbhosale/upiqr`;
const pipInstall = `pip install omkarbhosale-upi-qr`;

const esmNamedCode = `// Recommended in v3.0.0 for optimal tree-shaking
import { generateQR, splitTransactionQR } from "@omkarbhosale/upiqr";

// Import TypeScript interfaces
import type { QRParams, SplitQRParams, SplitQRItem } from "@omkarbhosale/upiqr";`;

const esmDefaultCode = `// Backwards-compatible default export
import upiqr from "@omkarbhosale/upiqr";

// Single QR
const qr = await upiqr({ UPI_ID: "merchant@upi", AMOUNT: 500 });

// Split Transaction
const splits = await upiqr.splitTransactionQR({ UPI_ID: "merchant@upi", AMOUNT: 4000 });`;

const cjsCode = `// CommonJS environments
const { generateQR, splitTransactionQR } = require("@omkarbhosale/upiqr");`;

const verifyCode = `import { generateQR } from "@omkarbhosale/upiqr";

async function test() {
  const dataUrl = await generateQR({
    UPI_ID: "test@upi",
    AMOUNT: 100,
  });
  console.log("Success! QR Data URL:", dataUrl.slice(0, 30) + "...");
}

test();`;

export default function InstallationPage() {
  const toc = [
    { id: 'package-managers', title: 'Package Managers', depth: 2 },
    { id: 'importing', title: 'Import Styles', depth: 2 },
    { id: 'typescript', title: 'TypeScript Support', depth: 2 },
    { id: 'environments', title: 'Supported Environments', depth: 2 },
    { id: 'verification', title: 'Verify Installation', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Installation & Setup – @omkarbhosale/upiqr Docs"
      description="Install @omkarbhosale/upiqr via npm, pnpm, yarn, or bun with dual ESM/CJS and TypeScript declarations."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Getting Started</Badge>
            <Badge variant="emerald" size="xs">Zero Setup</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Installation & Setup
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Install <code>@omkarbhosale/upiqr</code> into your application. Shipped with zero external native binaries, full TypeScript type definitions, and dual ESM/CJS module exports.
          </p>
        </div>

        {/* Package Managers */}
        <section id="package-managers" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Package Managers
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Select your preferred package manager to install the latest <strong>v3.0.0</strong> release:
          </p>

          <Tabs items={['npm', 'pnpm', 'yarn', 'bun', 'pip (Python)']}>
            <CodeBlock code={npmInstall} language="bash" />
            <CodeBlock code={pnpmInstall} language="bash" />
            <CodeBlock code={yarnInstall} language="bash" />
            <CodeBlock code={bunInstall} language="bash" />
            <CodeBlock code={pipInstall} language="bash" />
          </Tabs>

          <Callout type="tip" title="Python Package Available">
            Building with Python, Django, Flask, or FastAPI? Use the dedicated Python package <code>omkarbhosale-upi-qr</code>. Read the <a href="/docs/guides/python" className="underline font-semibold">Python Integration Guide →</a>
          </Callout>
        </section>

        {/* Import Styles */}
        <section id="importing" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Import Styles
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Version 3.0.0 ships with first-class support for both named and default imports:
          </p>

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-4 mb-2">
            Named Imports (Recommended)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            Enables modern tree-shaking and cleaner auto-completion in modern IDEs:
          </p>
          <CodeBlock code={esmNamedCode} language="typescript" filename="index.ts" />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-6 mb-2">
            Default Import (Backward Compatible)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
            If migrating from v1.x/v2.x, your existing default imports continue to work without breaking changes:
          </p>
          <CodeBlock code={esmDefaultCode} language="javascript" filename="legacy-handler.js" />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-6 mb-2">
            CommonJS
          </h3>
          <CodeBlock code={cjsCode} language="javascript" filename="server.cjs" />
        </section>

        {/* TypeScript */}
        <section id="typescript" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            TypeScript Declarations
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            The package includes built-in declaration files (<code>.d.ts</code> and <code>.d.ts.map</code>) generated directly by TypeScript. No separate <code>@types/</code> package is needed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">QRParams</div>
              <p className="text-[11px] text-slate-500">Parameters for single UPI QR generation</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">SplitQRParams</div>
              <p className="text-[11px] text-slate-500">Parameters for transaction splitting with thresholds</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">SplitQRItem</div>
              <p className="text-[11px] text-slate-500">Item return structure containing id, amount, and image</p>
            </div>
          </div>
        </section>

        {/* Environments */}
        <section id="environments" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Supported Environments
          </h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 mt-3">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Environment</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Node.js (16+)</td>
                  <td className="p-3"><Badge variant="emerald" size="xs">Supported</Badge></td>
                  <td className="p-3">Native support in ESM and CommonJS</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Next.js (App & Pages)</td>
                  <td className="p-3"><Badge variant="emerald" size="xs">Supported</Badge></td>
                  <td className="p-3">Client components and Server Actions / API routes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">Modern Browsers</td>
                  <td className="p-3"><Badge variant="emerald" size="xs">Supported</Badge></td>
                  <td className="p-3">Bundled via Vite, Webpack, Turbopack, or Rollup</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-900 dark:text-white">TypeScript (4.5+)</td>
                  <td className="p-3"><Badge variant="emerald" size="xs">Supported</Badge></td>
                  <td className="p-3">Native types bundled in package root</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Verification */}
        <section id="verification" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Verify Installation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Run this minimal script to verify that the package is correctly installed and resolving:
          </p>
          <CodeBlock code={verifyCode} language="typescript" filename="verify.ts" />
        </section>
      </div>
    </DocsLayout>
  );
}
