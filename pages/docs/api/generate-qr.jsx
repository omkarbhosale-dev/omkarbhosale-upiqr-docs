import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';

const signatureCode = `function generateQR(params: QRParams): Promise<string>;`;

const basicExample = `import { generateQR } from "@omkarbhosale/upiqr";

const createSingleQR = async () => {
  try {
    const qrDataUrl = await generateQR({
      UPI_ID: "omkar@okhdfcbank",
      AMOUNT: 750,
      name: "Omkar Bhosale",
      note: "Coffee and snacks bill",
      currency: "INR"
    });

    console.log(qrDataUrl);
    // Output: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
  } catch (error) {
    console.error("QR creation failed:", error.message);
  }
};

createSingleQR();`;

const reactExample = `import React, { useState, useEffect } from "react";
import { generateQR } from "@omkarbhosale/upiqr";

export default function SingleQRCheckout({ amount = 500 }) {
  const [qrUrl, setQrUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadQR() {
      try {
        setLoading(true);
        const dataUrl = await generateQR({
          UPI_ID: "store@upi",
          AMOUNT: amount,
          name: "Acme Store",
          note: "Order #5092"
        });
        if (mounted) setQrUrl(dataUrl);
      } catch (err) {
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadQR();
    return () => { mounted = false; };
  }, [amount]);

  if (loading) return <div>Generating UPI QR Code...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 border rounded-xl max-w-xs text-center">
      <h3 className="font-bold mb-2">Scan & Pay ₹{amount}</h3>
      {qrUrl && <img src={qrUrl} alt="UPI QR Code" className="mx-auto w-48 h-48" />}
      <p className="text-xs text-slate-500 mt-2">Scan with GPay, PhonePe, or Paytm</p>
    </div>
  );
}`;

const downloadExample = `function downloadQR(dataUrl, filename = "upi-payment-qr.png") {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}`;

export default function GenerateQRPage() {
  const toc = [
    { id: 'signature', title: 'Function Signature', depth: 2 },
    { id: 'parameters', title: 'Parameters (QRParams)', depth: 2 },
    { id: 'return-value', title: 'Return Value', depth: 2 },
    { id: 'step-by-step', title: 'Step-by-Step Implementation', depth: 2 },
    { id: 'code-examples', title: 'Full Code Examples', depth: 2 },
    { id: 'error-handling', title: 'Error Handling', depth: 2 },
  ];

  return (
    <DocsLayout
      title="generateQR() API Reference – @omkarbhosale/upiqr Docs"
      description="API reference and step-by-step implementation guide for generateQR() in @omkarbhosale/upiqr."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Core API</Badge>
            <Badge variant="emerald" size="xs">Single QR</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <code>generateQR(params)</code>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Generates a single standard UPI QR code as a base64 Data URL string. Validated at runtime using Zod 4.
          </p>
        </div>

        {/* Signature */}
        <section id="signature" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Function Signature
          </h2>
          <CodeBlock code={signatureCode} language="typescript" />
        </section>

        {/* Parameters */}
        <section id="parameters" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Parameters (<code>QRParams</code>)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            An object containing the transaction configuration and optional metadata:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Required</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">UPI_ID</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="rose" size="xs">Required</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Valid Virtual Payment Address (e.g. <code>store@upi</code>). Validated via <code>/^[\w.-]+@[\w.-]+$/</code>.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">AMOUNT</td>
                  <td className="p-3 font-mono text-brand-500">number</td>
                  <td className="p-3"><Badge variant="rose" size="xs">Required</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Positive finite number up to ₹1,00,000.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">name</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Payee Name (encoded as <code>pn</code> in the UPI URL).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">note</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Transaction Note / Memo (encoded as <code>tn</code> in the UPI URL).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">currency</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">"INR"</td>
                  <td className="p-3">Currency code (defaults to <code>"INR"</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section id="return-value" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Return Value
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 leading-relaxed">
            Returns a <code>Promise&lt;string&gt;</code> that resolves to a base64-encoded Data URL of the generated PNG image:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-mono text-xs text-slate-800 dark:text-slate-200 break-all">
            data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAA...
          </div>
        </section>

        {/* Step-by-Step Implementation */}
        <section id="step-by-step" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Step-by-Step Implementation Guide
          </h2>

          <div className="space-y-6">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">1</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Validate or Sanitize User Input</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Ensure the UPI ID and amount are present and within valid ranges before making the call, or rely on <code>@omkarbhosale/upiqr</code>'s built-in Zod validation.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Invoke <code>generateQR</code></h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Call the asynchronous function within a <code>try/catch</code> block. Pass your UPI ID, target amount, payee name, and note.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Render Base64 Image in DOM or React</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Set the resolved string directly as the <code>src</code> attribute of an <code>&lt;img&gt;</code> element or Next.js <code>&lt;Image /&gt;</code> component.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">4</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Add Download & Sharing Utility (Optional)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Allow your customers to save the QR code to their phone gallery for easy scanning via payment apps:
                </p>
                <CodeBlock code={downloadExample} language="javascript" />
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section id="code-examples" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Code Examples
          </h2>

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-4 mb-2">
            Basic Node.js / TypeScript Example
          </h3>
          <CodeBlock code={basicExample} language="typescript" filename="index.ts" />

          <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-6 mb-2">
            React / Next.js Component Example
          </h3>
          <CodeBlock code={reactExample} language="tsx" filename="components/SingleQRCheckout.tsx" />
        </section>

        {/* Error Handling */}
        <section id="error-handling" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Error Handling
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            If parameters do not pass schema validation, <code>generateQR</code> throws a descriptive Error. Always wrap in <code>try/catch</code>:
          </p>

          <Callout type="warning" title="Amount Limit Notice">
            The maximum amount for a single QR code is <strong>₹1,00,000</strong>. If your checkout requires amounts up to <strong>₹10,00,000</strong> or exceeds ₹2,000, consider using <a href="/docs/api/split-transaction" className="underline font-semibold">splitTransactionQR()</a>.
          </Callout>
        </section>
      </div>
    </DocsLayout>
  );
}
