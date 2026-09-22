import React from 'react';
import DocsLayout from '../components/DocsLayout';
import InteractiveQRStudio from '../components/InteractiveQRStudio';
import Badge from '../components/Badge';
import Callout from '../components/Callout';
import { FlaskConical, Terminal } from 'lucide-react';

export default function PlaygroundPage() {
  const toc = [
    { id: 'studio', title: 'Interactive Studio', depth: 2 },
    { id: 'tips', title: 'Testing Tips', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Live QR Studio & Playground – @omkarbhosale/upiqr Docs"
      description="Live interactive test studio to generate single UPI QR codes and simulate transaction splitting."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">
              <FlaskConical className="h-3 w-3" /> Live Studio
            </Badge>
            <Badge variant="emerald" size="xs">Real-Time Zod 4 Engine</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Live UPI QR Studio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Test and simulate real UPI payment QR codes directly in your browser. Toggle between <strong>Split Transaction</strong> (for amounts above ₹2,000) and <strong>Single QR</strong> mode.
          </p>
        </div>

        <section id="studio" className="scroll-mt-24 pt-2">
          <InteractiveQRStudio defaultMode="split" />
        </section>

        <section id="tips" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Testing Tips
          </h2>
          <Callout type="tip" title="Testing Payment Apps">
            You can test scanning the generated QR codes with Google Pay, PhonePe, Paytm, or BHIM apps. Ensure you use a valid UPI handle you own (e.g. <code>yourname@okhdfcbank</code>) to receive test amounts.
          </Callout>
        </section>
      </div>
    </DocsLayout>
  );
}
