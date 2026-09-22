import React from 'react';
import DocsLayout from '../../components/DocsLayout';
import CodeBlock from '../../components/CodeBlock';
import Callout from '../../components/Callout';
import Badge from '../../components/Badge';
import { Rocket, Check, ArrowRight, AlertTriangle } from 'lucide-react';

const upgradeCommand = `npm install @omkarbhosale/upiqr@latest`;

const beforeCode = `// v1.x / v2.x - Default import only, basic parameters
import generateQR from "@omkarbhosale/upiqr";

try {
  const qr = await generateQR({
    UPI_ID: "store@upi",
    AMOUNT: 5000 // In v2, large amounts generated a single QR with no splitting
  });
} catch (e) {
  // Generic error string
}`;

const afterCode = `// v3.0.0 - Named imports, metadata, and automatic splitting
import { generateQR, splitTransactionQR } from "@omkarbhosale/upiqr";

try {
  // Option A: For amounts <= ₹2,000 with metadata
  const single = await generateQR({
    UPI_ID: "store@upi",
    AMOUNT: 1500,
    name: "Omkar Store",
    note: "Invoice #1092"
  });

  // Option B: For amounts > ₹2,000, automatically chunk into ₹1,999 parts
  const splits = await splitTransactionQR({
    UPI_ID: "store@upi",
    AMOUNT: 5000,
    name: "Omkar Store",
    note: "Invoice #1092"
  });
  // Splits into: ₹1,999 + ₹1,999 + ₹1,002
} catch (error) {
  // Detailed Zod 4 error format:
  // "Validation error: UPI_ID: Invalid UPI ID format..."
  console.error(error.message);
}`;

export default function MigrationPage() {
  const toc = [
    { id: 'overview', title: 'Migration Overview', depth: 2 },
    { id: 'upgrade', title: 'Upgrading Dependency', depth: 2 },
    { id: 'breaking-changes', title: 'Key Changes & New Features', depth: 2 },
    { id: 'code-comparison', title: 'Before & After Comparison', depth: 2 },
    { id: 'error-handling', title: 'Updated Error Format', depth: 2 },
    { id: 'checklist', title: 'Migration Checklist', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Migrating to v3.0.0 – @omkarbhosale/upiqr Docs"
      description="Step-by-step guide for upgrading your project from v1.x/v2.x to @omkarbhosale/upiqr v3.0.0."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">
              <Rocket className="h-3 w-3" /> Major Upgrade
            </Badge>
            <Badge variant="emerald" size="xs">100% Backward Compatible</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Migrating to Version 3.0.0
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Version 3.0.0 introduces automated transaction splitting under NPCI guidelines, Zod 4 runtime schema validation, transaction metadata, and paise-level precision integer math.
          </p>
        </div>

        {/* Upgrade */}
        <section id="upgrade" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Upgrading the Package
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Install the latest release using your package manager:
          </p>
          <CodeBlock code={upgradeCommand} language="bash" />
        </section>

        {/* Key Changes */}
        <section id="breaking-changes" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Key Changes & New Features
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900 dark:text-white text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs">1</span>
                <span>Automated Transaction Splitting (<code>splitTransactionQR</code>)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Payments exceeding ₹2,000 can now be automatically chunked into ₹1,999 intervals. This helps merchants avoid PPI wallet interchange fees while maintaining high payment success rates.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900 dark:text-white text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs">2</span>
                <span>Zod 4 Schema Validation</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All inputs are strictly validated at runtime. Invalid UPI IDs, non-positive amounts, or numbers exceeding bounds throw structured validation errors before QR generation begins.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900 dark:text-white text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs">3</span>
                <span>Transaction Metadata Fields</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                You can now pass optional metadata parameters: <code>name</code> (Payee Name), <code>note</code> (Transaction Note / Memo), and <code>currency</code> (defaults to <code>INR</code>).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="flex items-center gap-2 mb-1.5 font-semibold text-slate-900 dark:text-white text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500/10 text-brand-500 text-xs">4</span>
                <span>Paise-Level Precision Integer Math</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                All amount calculations operate on integer paise (<code>Math.round(AMOUNT * 100)</code>). This eliminates standard IEEE-754 floating point rounding drift (e.g. <code>1999.0000000002</code>).
              </p>
            </div>
          </div>
        </section>

        {/* Code Comparison */}
        <section id="code-comparison" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Before & After Comparison
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            See how your integration code evolves from v2 to v3:
          </p>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Legacy (v1.x / v2.x)
          </h3>
          <CodeBlock code={beforeCode} language="javascript" filename="v2-implementation.js" />

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">
            Modern (v3.0.0)
          </h3>
          <CodeBlock code={afterCode} language="typescript" filename="v3-implementation.ts" />
        </section>

        {/* Updated Error Format */}
        <section id="error-handling" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Updated Error Handling Format
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            In v3.0.0, if validation fails, the thrown error follows a standardized format:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-mono text-xs text-rose-600 dark:text-rose-400">
            Validation error: &lt;field&gt;: &lt;message&gt;
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            For example:
          </p>
          <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 mt-1 font-mono">
            <li><code>Validation error: UPI_ID: Invalid UPI ID format. Expected format: username@bank</code></li>
            <li><code>Validation error: AMOUNT: Amount must be greater than 0</code></li>
            <li><code>Validation error: AMOUNT: Single QR amount cannot exceed ₹1,00,000</code></li>
          </ul>
        </section>

        {/* Checklist */}
        <section id="checklist" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Migration Checklist
          </h2>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Update package dependency to <code>@omkarbhosale/upiqr@^3.0.0</code></span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Switch to named imports: <code>import {`{ generateQR, splitTransactionQR }`} from "@omkarbhosale/upiqr"</code></span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Use <code>splitTransactionQR</code> in checkout flows where orders exceed ₹2,000</span>
            </div>
            <div className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Check className="h-4 w-4 text-emerald-500" />
              <span>Add payee <code>name</code> and transaction <code>note</code> for clearer customer bank statements</span>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
