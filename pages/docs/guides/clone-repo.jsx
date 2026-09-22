import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';
import { GitFork, Terminal, CheckCircle2 } from 'lucide-react';

const cloneCode = `git clone https://github.com/omkarbhosale-dev/nextjs-qrcode-example.git
cd nextjs-qrcode-example
npm install`;

const envCode = `# Create .env.local in root directory
NEXT_PUBLIC_UPI_ID=yourname@okhdfcbank
NEXT_PUBLIC_PAYEE_NAME="My Store"`;

const runDevCode = `npm run dev`;

export default function CloneRepoGuidePage() {
  const toc = [
    { id: 'overview', title: 'Repository Overview', depth: 2 },
    { id: 'steps', title: 'Step-by-Step Setup', depth: 2 },
    { id: 'env-config', title: 'Environment Configuration', depth: 2 },
    { id: 'project-structure', title: 'Key Files', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Clone Demo Repository – @omkarbhosale/upiqr Docs"
      description="Step-by-step guide to clone, run, and customize the official Next.js companion demo repository."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Starter Kit</Badge>
            <Badge variant="emerald" size="xs">Next.js + Tailwind</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Next.js Demo Repository
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Quickly clone and run the official Next.js example repository to explore working QR code generation and payment flows in a complete project environment.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://github.com/omkarbhosale-dev/nextjs-qrcode-example"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all shadow-sm"
            >
              <GitFork className="h-3.5 w-3.5 text-brand-500" />
              <span>View on GitHub (nextjs-qrcode-example)</span>
            </a>
          </div>
        </div>

        {/* Steps */}
        <section id="steps" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            Setup Instructions
          </h2>

          <div className="space-y-6">
            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">1</span>
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Clone and Install Dependencies</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-2 leading-relaxed">
                  Clone the repository and install all required packages using npm:
                </p>
                <CodeBlock code={cloneCode} language="bash" />
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">2</span>
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Configure Environment Variables</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-2 leading-relaxed">
                  Create a <code>.env.local</code> file in the root directory and add your UPI ID:
                </p>
                <CodeBlock code={envCode} language="bash" filename=".env.local" />
              </div>
            </div>

            <div className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold">3</span>
              <div className="w-full">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Start the Development Server</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 mb-2 leading-relaxed">
                  Run the development server and open <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="underline font-mono">http://localhost:3000</a> in your browser:
                </p>
                <CodeBlock code={runDevCode} language="bash" />
              </div>
            </div>
          </div>
        </section>

        {/* Key Files */}
        <section id="project-structure" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Key Files to Inspect
          </h2>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 flex items-start gap-2.5">
              <div className="font-mono font-bold text-brand-500 shrink-0">src/app/page.tsx</div>
              <div className="text-slate-600 dark:text-slate-400">Main landing page containing user amount input and state.</div>
            </div>
            <div className="p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 flex items-start gap-2.5">
              <div className="font-mono font-bold text-brand-500 shrink-0">src/app/components/QRCode.tsx</div>
              <div className="text-slate-600 dark:text-slate-400">Core client component generating and displaying the dynamic UPI QR code.</div>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
