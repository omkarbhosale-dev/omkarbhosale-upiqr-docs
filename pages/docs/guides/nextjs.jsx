import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';

const envSetup = `# .env.local
NEXT_PUBLIC_UPI_ID=merchant@okhdfcbank
NEXT_PUBLIC_PAYEE_NAME="Acme Store"`;

const appRouterSingleCode = `// app/components/SingleQRCode.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { generateQR } from "@omkarbhosale/upiqr";

interface Props {
  amount: number;
}

export default function SingleQRCode({ amount }: Props) {
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function createQR() {
      try {
        setLoading(true);
        setError(null);

        const url = await generateQR({
          UPI_ID: process.env.NEXT_PUBLIC_UPI_ID!,
          AMOUNT: amount,
          name: process.env.NEXT_PUBLIC_PAYEE_NAME,
          note: \`Order payment for ₹\${amount}\`,
        });

        if (active) setQrUrl(url);
      } catch (err: any) {
        if (active) setError(err.message || "Failed to generate QR");
      } finally {
        if (active) setLoading(false);
      }
    }

    createQR();
    return () => { active = false; };
  }, [amount]);

  if (loading) {
    return <div className="animate-pulse p-8 text-center text-sm text-slate-500">Generating UPI QR...</div>;
  }

  if (error) {
    return <div className="p-4 rounded-lg bg-red-50 text-red-600 text-xs">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center p-6 border rounded-2xl bg-white shadow-sm text-center">
      <h3 className="text-lg font-bold text-slate-900 mb-1">Scan to Pay</h3>
      <p className="text-2xl font-black text-indigo-600 mb-4">₹{amount}</p>
      
      {qrUrl && (
        <div className="p-2 border rounded-xl bg-white shadow-inner">
          <Image src={qrUrl} width={220} height={220} alt="UPI QR Code" priority />
        </div>
      )}

      <p className="text-xs text-slate-400 mt-3">
        Supports GPay, PhonePe, Paytm & any BHIM UPI app
      </p>
    </div>
  );
}`;

const appRouterSplitCode = `// app/components/SplitCheckout.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { splitTransactionQR, SplitQRItem } from "@omkarbhosale/upiqr";

export default function SplitCheckout({ amount = 5000 }: { amount?: number }) {
  const [splits, setSplits] = useState<SplitQRItem[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSplits() {
      try {
        setLoading(true);
        const data = await splitTransactionQR({
          UPI_ID: process.env.NEXT_PUBLIC_UPI_ID!,
          AMOUNT: amount,
          name: "Acme Store",
          note: "Invoice #109",
        });
        setSplits(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadSplits();
  }, [amount]);

  if (loading) return <div>Calculating splits...</div>;

  const current = splits[activeStep];

  return (
    <div className="max-w-md mx-auto p-6 rounded-2xl border bg-white shadow-lg">
      <div className="flex items-center justify-between pb-4 border-b mb-4">
        <div>
          <h2 className="font-bold text-slate-900">Multi-Part UPI Payment</h2>
          <p className="text-xs text-slate-500">Split into {splits.length} parts under ₹2,000</p>
        </div>
        <span className="text-sm font-bold text-indigo-600">Total: ₹{amount}</span>
      </div>

      {/* Part tabs */}
      <div className="flex gap-2 mb-6">
        {splits.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={\`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all \${
              activeStep === idx 
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" 
                : "bg-slate-50 text-slate-600 hover:bg-slate-100"
            }\`}
          >
            Part {idx + 1} (₹{s.amount})
          </button>
        ))}
      </div>

      {/* Current QR Code */}
      {current && (
        <div className="flex flex-col items-center">
          <div className="p-2 border rounded-xl bg-white mb-3">
            <Image src={current.image} width={200} height={200} alt="QR part" />
          </div>
          <div className="text-lg font-black text-slate-900">₹{current.amount}</div>
          <p className="text-xs text-slate-400 mt-1 mb-4">Part {activeStep + 1} of {splits.length}</p>

          <button
            onClick={() => setActiveStep((prev) => Math.min(prev + 1, splits.length - 1))}
            disabled={activeStep === splits.length - 1}
            className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 disabled:opacity-40 transition-all"
          >
            {activeStep === splits.length - 1 ? "All Parts Scanned" : "Next Part →"}
          </button>
        </div>
      )}
    </div>
  );
}`;

export default function NextJSGuidePage() {
  const toc = [
    { id: 'env-setup', title: 'Environment Setup', depth: 2 },
    { id: 'single-qr-component', title: 'Single QR Component', depth: 2 },
    { id: 'split-checkout-component', title: 'Split Checkout Component', depth: 2 },
    { id: 'app-vs-pages', title: 'App Router vs Pages Router', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Next.js Integration Guide – @omkarbhosale/upiqr Docs"
      description="Production-ready integration guide for Next.js App Router and Pages Router with @omkarbhosale/upiqr v3.0.0."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Framework Guide</Badge>
            <Badge variant="emerald" size="xs">Next.js 13/14/15</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Next.js Integration Guide
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Learn how to integrate <code>@omkarbhosale/upiqr</code> into Next.js using React Server Components, Client Components, and TypeScript.
          </p>
        </div>

        {/* Environment Setup */}
        <section id="env-setup" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Environment Setup
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Store your store's default UPI ID and merchant details in <code>.env.local</code>. Prefix with <code>NEXT_PUBLIC_</code> for client-side access:
          </p>
          <CodeBlock code={envSetup} language="bash" filename=".env.local" />
        </section>

        {/* Single QR Component */}
        <section id="single-qr-component" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Single QR Component
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Use this client component to render an interactive QR code that dynamically updates when the payment amount changes:
          </p>
          <CodeBlock code={appRouterSingleCode} language="tsx" filename="app/components/SingleQRCode.tsx" />
        </section>

        {/* Split Checkout Component */}
        <section id="split-checkout-component" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Split Checkout Component
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            For orders exceeding ₹2,000, this component breaks the total into ₹1,999 parts and presents a multi-part tab stepper:
          </p>
          <CodeBlock code={appRouterSplitCode} language="tsx" filename="app/components/SplitCheckout.tsx" />
        </section>

        {/* App vs Pages */}
        <section id="app-vs-pages" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            App Router vs Pages Router
          </h2>
          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <p className="leading-relaxed">
              <strong>App Router (<code>app/</code>)</strong>: Because QR codes contain data generated dynamically for the user, mark your components with <code>"use client"</code>.
            </p>
            <p className="leading-relaxed">
              <strong>Pages Router (<code>pages/</code>)</strong>: Components work directly within standard Pages lifecycle. No directive is required.
            </p>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
