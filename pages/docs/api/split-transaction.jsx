import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';
import InteractiveQRStudio from '../../../components/InteractiveQRStudio';
import { Scissors, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const signatureCode = `function splitTransactionQR(params: SplitQRParams): Promise<SplitQRItem[]>;`;

const basicSplitExample = `import { splitTransactionQR } from "@omkarbhosale/upiqr";

async function processHighValuePayment() {
  try {
    const qrs = await splitTransactionQR({
      UPI_ID: "merchant@okhdfcbank",
      AMOUNT: 5000,
      name: "Omkar Store",
      note: "Order #8491",
    });

    console.log(qrs);
  } catch (error) {
    console.error("Split generation failed:", error.message);
  }
}

processHighValuePayment();`;

const splitOutputExample = `[
  {
    "id": "4a236fad-ebc5-471f-86ab-86a4f9e621e7",
    "amount": 1999,
    "image": "data:image/png;base64,iVBORw0KGgo..."
  },
  {
    "id": "c19ba6ae-664a-47d7-9948-bf3558fefb6d",
    "amount": 1999,
    "image": "data:image/png;base64,iVBORw0KGgo..."
  },
  {
    "id": "3c44b4ad-44e7-414f-86c4-60ae9f228ec6",
    "amount": 1002,
    "image": "data:image/png;base64,iVBORw0KGgo..."
  }
]`;

const customIntervalExample = `import { splitTransactionQR } from "@omkarbhosale/upiqr";

// Split transactions above ₹500 into ₹400 intervals
const qrs = await splitTransactionQR({
  UPI_ID: "merchant@upi",
  AMOUNT: 1000,
  threshold: 500,     // Split anything > ₹500
  splitInterval: 400, // Chunk size: ₹400
  name: "Omkar Store",
  note: "Custom Split"
});

// Returns 3 QRs: ₹400 + ₹400 + ₹200`;

const subThresholdExample = `// Transactions <= threshold are NOT split
const qrs = await splitTransactionQR({
  UPI_ID: "merchant@upi",
  AMOUNT: 1500,
});

// Returns 1 item in the array:
// [ { id: "...", amount: 1500, image: "data:image/png;base64,..." } ]`;

export default function SplitTransactionPage() {
  const toc = [
    { id: 'why-split', title: 'Why Split at ₹1,999?', depth: 2 },
    { id: 'signature', title: 'Function Signature', depth: 2 },
    { id: 'parameters', title: 'Parameters (SplitQRParams)', depth: 2 },
    { id: 'return-value', title: 'Return Value (SplitQRItem[])', depth: 2 },
    { id: 'interactive-demo', title: 'Live Split Demo', depth: 2 },
    { id: 'step-by-step', title: 'Implementation Guide', depth: 2 },
    { id: 'custom-intervals', title: 'Custom Intervals & Thresholds', depth: 2 },
    { id: 'sub-threshold', title: 'Amounts <= Threshold', depth: 2 },
  ];

  return (
    <DocsLayout
      title="splitTransactionQR() API Reference – @omkarbhosale/upiqr Docs"
      description="API reference, NPCI threshold context, and step-by-step implementation guide for splitTransactionQR() in @omkarbhosale/upiqr."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Core API</Badge>
            <Badge variant="cyan" size="xs">New in v3.0.0</Badge>
            <Badge variant="emerald" size="xs">NPCI Optimized</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            <code>splitTransactionQR(params)</code>
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Splits large transactions exceeding a threshold (default ₹2,000) into ₹1,999 intervals and generates concurrent QR codes for each chunk.
          </p>
        </div>

        {/* Why Split at ₹1,999 */}
        <section id="why-split" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <div className="p-5 rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/5 to-accent-500/5">
            <div className="flex items-center gap-2 mb-2">
              <Scissors className="h-5 w-5 text-brand-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Why Split at ₹1,999?
              </h2>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Under <strong>National Payments Corporation of India (NPCI)</strong> regulations:
            </p>
            <ul className="mt-2 space-y-1.5 text-xs text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li>
                Transactions <strong>less than or equal to ₹2,000</strong> on Prepaid Payment Instruments (PPI wallets like Paytm wallet, PhonePe wallet) bypass merchant interchange fees (typically up to 1.1%).
              </li>
              <li>
                Sub-₹2,000 transactions experience significantly fewer bank OTP delays, faster client verification, and higher completion rates.
              </li>
              <li>
                By splitting higher amounts into <strong>₹1,999</strong> chunks, each individual payment remains safely under the ₹2,000 threshold while completing the full invoice balance.
              </li>
            </ul>
          </div>
        </section>

        {/* Signature */}
        <section id="signature" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Function Signature
          </h2>
          <CodeBlock code={signatureCode} language="typescript" />
        </section>

        {/* Parameters */}
        <section id="parameters" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Parameters (<code>SplitQRParams</code>)
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 mt-3">
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
                  <td className="p-3">Valid UPI handle (e.g. <code>store@okhdfcbank</code>).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">AMOUNT</td>
                  <td className="p-3 font-mono text-brand-500">number</td>
                  <td className="p-3"><Badge variant="rose" size="xs">Required</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Total amount to receive (positive number up to ₹10,00,000).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">splitInterval</td>
                  <td className="p-3 font-mono text-brand-500">number</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">1999</td>
                  <td className="p-3">Maximum amount per split chunk.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">threshold</td>
                  <td className="p-3 font-mono text-brand-500">number</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">2000</td>
                  <td className="p-3">Amount above which splitting is triggered. If <code>AMOUNT &lt;= threshold</code>, 1 QR is generated.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">name</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Payee name (encoded as <code>pn</code>).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">note</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">—</td>
                  <td className="p-3">Transaction note. Automatically appends <code>(Part X/Y)</code> to each chunk.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">currency</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3"><Badge variant="neutral" size="xs">Optional</Badge></td>
                  <td className="p-3 font-mono">"INR"</td>
                  <td className="p-3">Currency code.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Return Value */}
        <section id="return-value" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Return Value (<code>SplitQRItem[]</code>)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Returns a <code>Promise</code> resolving to an array of objects:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Property</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">id</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3">Unique UUID (v4) identifying this specific split chunk.</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">amount</td>
                  <td className="p-3 font-mono text-brand-500">number</td>
                  <td className="p-3">The numerical amount for this individual chunk (e.g. <code>1999</code>).</td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">image</td>
                  <td className="p-3 font-mono text-brand-500">string</td>
                  <td className="p-3">Base64 Data URL of the generated QR code (<code>data:image/png;base64,...</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Example Output (for ₹5,000)
            </h3>
            <CodeBlock code={splitOutputExample} language="json" />
          </div>
        </section>

        {/* Interactive Demo */}
        <section id="interactive-demo" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Live Interactive Split Calculator
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Experiment with amounts, split intervals, and thresholds to see the generated QR codes in real-time:
          </p>

          <InteractiveQRStudio defaultMode="split" />
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
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Invoke <code>splitTransactionQR</code></h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Pass your UPI ID and the total order amount. The library automatically checks whether splitting is necessary.
                </p>
                <CodeBlock code={basicSplitExample} language="typescript" filename="checkout.ts" />
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Render Stepper or Tab Carousel</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  If multiple items are returned in the array, render a multi-step checkout UI with tabs (e.g. "Part 1 of 3: ₹1,999", "Part 2 of 3: ₹1,999", "Part 3 of 3: ₹1,002").
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">3</span>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Track Payment Completion</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Each chunk includes a unique UUID in <code>item.id</code>. You can store these IDs in your database to track which parts the customer has confirmed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Intervals & Thresholds */}
        <section id="custom-intervals" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Custom Split Intervals & Thresholds
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            You can customize the threshold and chunk interval to match custom business requirements:
          </p>
          <CodeBlock code={customIntervalExample} language="typescript" />
        </section>

        {/* Sub-threshold */}
        <section id="sub-threshold" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Amounts Within Threshold (≤ ₹2,000)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            If the amount is less than or equal to the threshold, no splitting occurs. The returned array simply contains a single QR item:
          </p>
          <CodeBlock code={subThresholdExample} language="typescript" />
        </section>
      </div>
    </DocsLayout>
  );
}
