import React, { useState } from 'react';
import Link from 'next/link';
import { 
  QrCode, 
  Scissors, 
  ShieldCheck, 
  Zap, 
  Check, 
  Copy, 
  ArrowRight, 
  Rocket, 
  CheckCircle2, 
  Code, 
  Layers, 
  Terminal,
  Cpu,
  BadgeCheck,
  TrendingUp,
  Percent
} from 'lucide-react';
import DocsLayout from '../components/DocsLayout';
import CodeBlock from '../components/CodeBlock';
import Callout from '../components/Callout';
import Badge from '../components/Badge';
import InteractiveQRStudio from '../components/InteractiveQRStudio';

const quickSingleCode = `import { generateQR } from "@omkarbhosale/upiqr";

// Generate a single UPI QR Data URL
const qrDataUrl = await generateQR({
  UPI_ID: "merchant@okhdfcbank",
  AMOUNT: 750,
  name: "Omkar Store",
  note: "Order #9821",
});

// Use directly in an <img> tag or React <Image />
console.log(qrDataUrl); // data:image/png;base64,...`;

const quickSplitCode = `import { splitTransactionQR } from "@omkarbhosale/upiqr";

// Automatically splits ₹5,000 into ₹1,999 + ₹1,999 + ₹1,002
const qrs = await splitTransactionQR({
  UPI_ID: "store@upi",
  AMOUNT: 5000,
  name: "Omkar Store",
  note: "Order #9821",
});

console.log(qrs);
// [
//   { id: "4a236fad...", amount: 1999, image: "data:image/png;base64,..." },
//   { id: "c19ba6ae...", amount: 1999, image: "data:image/png;base64,..." },
//   { id: "3c44b4ad...", amount: 1002, image: "data:image/png;base64,..." }
// ]`;

export default function HomePage() {
  const [copiedInstall, setCopiedInstall] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText('npm install @omkarbhosale/upiqr');
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const toc = [
    { id: 'overview', title: 'Overview', depth: 2 },
    { id: 'interactive-studio', title: 'Interactive Studio', depth: 2 },
    { id: 'whats-new-v3', title: "What's New in v3.0.0", depth: 2 },
    { id: 'quickstart', title: '60-Second Quickstart', depth: 2 },
    { id: 'function-matrix', title: 'Feature Comparison', depth: 2 },
    { id: 'why-client-side', title: 'Why Client-Side Payments?', depth: 2 },
  ];

  return (
    <DocsLayout
      title="@omkarbhosale/upiqr v3.0.0 – Zero-Gateway UPI Payments with Transaction Splitting"
      description="Zero-dependency, high-performance UPI QR generator with automatic transaction splitting into ₹1,999 intervals under NPCI guidelines."
      toc={toc}
    >
      {/* Hero Section */}
      <section className="relative pt-6 pb-12">
        {/* Glow backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-72 bg-gradient-to-tr from-brand-600/20 via-accent-500/15 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="brand" size="sm">
              <Rocket className="h-3 w-3" /> v3.0.0 Major Release
            </Badge>
            <Badge variant="emerald" size="sm">
              <ShieldCheck className="h-3 w-3" /> Zod 4 Validated
            </Badge>
            <Badge variant="cyan" size="sm">
              <Percent className="h-3 w-3" /> Zero Gateway Cut
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Accept Direct UPI Payments. <br />
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-accent-500 bg-clip-text text-transparent">
              Zero Gateways. Zero Commissions.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            <strong className="text-slate-900 dark:text-white font-semibold">@omkarbhosale/upiqr</strong> generates standard UPI payment QR codes on the client with 
            <strong className="text-slate-900 dark:text-white font-semibold"> automatic transaction splitting</strong> for payments above ₹2,000 to bypass merchant interchange fees.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/docs/installation"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold px-5 py-2.5 text-sm shadow-glow-sm transition-all active:scale-95"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/docs/api/split-transaction"
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-dark-900 hover:bg-slate-100 dark:hover:bg-dark-800 text-slate-900 dark:text-white font-semibold px-4 py-2.5 text-sm transition-all"
            >
              <Scissors className="h-4 w-4 text-brand-500" />
              <span>Explore Split API</span>
            </Link>

            {/* Copy npm install chip */}
            <button
              onClick={copyInstall}
              type="button"
              className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-dark-950 px-3.5 py-2 text-xs font-mono text-slate-700 dark:text-slate-300 hover:border-brand-500/40 transition-all group"
            >
              <Terminal className="h-3.5 w-3.5 text-brand-500" />
              <span>npm i @omkarbhosale/upiqr</span>
              {copiedInstall ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Studio Preview */}
      <section id="interactive-studio" className="scroll-mt-24 pt-4 pb-8">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Try it Live
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Test single or split QR generation with real-time Zod 4 validation:
            </p>
          </div>
          <Link
            href="/playground"
            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>Open Full Studio</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <InteractiveQRStudio defaultMode="split" />
      </section>

      {/* What's New in v3.0.0 Grid */}
      <section id="whats-new-v3" className="scroll-mt-24 py-8 border-t border-slate-200 dark:border-white/10">
        <div className="mb-6">
          <Badge variant="brand" size="xs">Major Release</Badge>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            What's New in Version 3.0.0
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Engineered from the ground up for production fintech and high-volume merchant checkout flows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-sm hover:border-brand-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500">
                <Scissors className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Transaction Splitting (₹1,999)
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Splits amounts &gt; ₹2,000 into ₹1,999 intervals (e.g. ₹5,000 becomes ₹1,999 + ₹1,999 + ₹1,002). Helps merchants bypass PPI interchange fees under NPCI guidelines.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-sm hover:border-brand-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                End-to-End Zod 4 Validation
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Strict runtime parameter validation for UPI IDs (`/^[\w.-]+@[\w.-]+$/`), positive amounts, and boundaries before generating any QR code.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-sm hover:border-brand-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-xl bg-accent-500/10 text-accent-500">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Paise-Level Integer Math
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Calculates chunks in integer paise (`Math.round(AMOUNT * 100)`) preventing floating-point IEEE-754 rounding drift on high-volume checkouts.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/60 shadow-sm hover:border-brand-500/40 transition-all">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Transaction Metadata
              </h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Pass payee name (`name`), custom transaction notes (`note`), and currency (`currency`). Split parts automatically append `(Part X/Y)`.
            </p>
          </div>
        </div>
      </section>

      {/* 60-Second Quickstart */}
      <section id="quickstart" className="scroll-mt-24 py-8 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          60-Second Quickstart
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Get up and running with named imports in any modern ES Module, Next.js, or TypeScript app:
        </p>

        <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
          1. Generating a Single QR Code
        </h3>
        <CodeBlock code={quickSingleCode} language="typescript" filename="src/single-payment.ts" />

        <h3 className="text-base font-semibold text-slate-900 dark:text-white mt-8 mb-2">
          2. Splitting a High-Value Payment
        </h3>
        <CodeBlock code={quickSplitCode} language="typescript" filename="src/split-payment.ts" />

        <Callout type="tip" title="Dual Import Support">
          If you are upgrading an existing codebase, default imports like <code>import upiqr from "@omkarbhosale/upiqr"</code> remain 100% backward-compatible!
        </Callout>
      </section>

      {/* Feature Comparison Matrix */}
      <section id="function-matrix" className="scroll-mt-24 py-8 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Feature Comparison
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Choose the right function based on your payment value and checkout structure:
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="p-3">Feature</th>
                <th className="p-3"><code>generateQR()</code></th>
                <th className="p-3"><code>splitTransactionQR()</code></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-600 dark:text-slate-400 font-mono">
              <tr>
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Primary Purpose</td>
                <td className="p-3">Single instant UPI QR</td>
                <td className="p-3">Chunked payment under ₹2k threshold</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Return Type</td>
                <td className="p-3"><code>Promise&lt;string&gt;</code> (Base64)</td>
                <td className="p-3"><code>Promise&lt;SplitQRItem[]&gt;</code></td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Maximum Amount</td>
                <td className="p-3">₹1,00,000</td>
                <td className="p-3">₹10,00,000</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Auto Chunking</td>
                <td className="p-3 text-rose-500">No</td>
                <td className="p-3 text-emerald-500">Yes (₹1,999 default)</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-medium text-slate-900 dark:text-white">Note Suffix</td>
                <td className="p-3">As passed</td>
                <td className="p-3">Appends <code>(Part X/Y)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Client-Side */}
      <section id="why-client-side" className="scroll-mt-24 py-8 border-t border-slate-200 dark:border-white/10">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Why Client-Side Payments?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
            <div className="text-brand-500 font-extrabold text-2xl mb-1">0%</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Zero Intermediary Fees</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Traditional gateways charge 2% to 3% on every order. With direct UPI QR codes, 100% of the funds go straight into your bank account.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
            <div className="text-emerald-500 font-extrabold text-2xl mb-1">100%</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Zero Backend Dependency</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              No server keys, webhooks, or merchant account approvals. Generates client-side base64 images ready to render anywhere.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
            <div className="text-accent-500 font-extrabold text-2xl mb-1">&lt;10ms</div>
            <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Ultra-Fast Generation</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              QR codes are created asynchronously in milliseconds. Multiple split chunks are rendered concurrently via Promise.all.
            </p>
          </div>
        </div>
      </section>
    </DocsLayout>
  );
}
