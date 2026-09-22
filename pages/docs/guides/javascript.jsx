import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';

const esmHtmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>UPI QR Vanilla JS Demo</title>
</head>
<body>
  <div style="max-width: 320px; margin: 40px auto; text-align: center; font-family: sans-serif;">
    <h2>UPI QR Payment</h2>
    <img id="qr-image" src="" alt="Scan to pay" style="width: 220px; height: 220px; border: 1px solid #ddd; border-radius: 12px; margin: 16px 0;" />
    <p id="status">Generating QR code...</p>
    <button id="copy-upi" style="padding: 8px 16px; border-radius: 6px; cursor: pointer;">Copy UPI ID</button>
  </div>

  <script type="module">
    import { generateQR } from "https://esm.sh/@omkarbhosale/upiqr@3.0.0";

    const UPI_ID = "store@okhdfcbank";
    const AMOUNT = 750;

    async function init() {
      try {
        const qrUrl = await generateQR({
          UPI_ID,
          AMOUNT,
          name: "Omkar Store",
          note: "Order #9821"
        });

        document.getElementById("qr-image").src = qrUrl;
        document.getElementById("status").textContent = \`Pay ₹\${AMOUNT} via any UPI app\`;
      } catch (err) {
        document.getElementById("status").textContent = "Error: " + err.message;
      }
    }

    document.getElementById("copy-upi").addEventListener("click", () => {
      navigator.clipboard.writeText(UPI_ID);
      alert("UPI ID copied!");
    });

    init();
  </script>
</body>
</html>`;

const splitVanillaCode = `import { splitTransactionQR } from "@omkarbhosale/upiqr";

async function renderSplits(containerId, amount) {
  const container = document.getElementById(containerId);
  container.innerHTML = "Calculating splits...";

  try {
    const splits = await splitTransactionQR({
      UPI_ID: "store@upi",
      AMOUNT: amount,
      name: "Omkar Store",
      note: "Checkout"
    });

    container.innerHTML = "";

    splits.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "split-card";
      card.innerHTML = \`
        <h4>Part \${index + 1} of \${splits.length}</h4>
        <img src="\${item.image}" alt="QR code" width="180" height="180" />
        <p><strong>₹\${item.amount}</strong></p>
      \`;
      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = \`<p style="color: red;">\${error.message}</p>\`;
  }
}

// Render ₹5,000 splits:
renderSplits("splits-grid", 5000);`;

export default function JavascriptGuidePage() {
  const toc = [
    { id: 'browser-esm', title: 'Browser ES Modules (CDN)', depth: 2 },
    { id: 'single-qr-dom', title: 'Single QR DOM Example', depth: 2 },
    { id: 'split-dom', title: 'Vanilla Split QR Grid', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Vanilla JavaScript Guide – @omkarbhosale/upiqr Docs"
      description="Using @omkarbhosale/upiqr in core Vanilla JavaScript, Vite, or direct HTML script tags."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Framework Guide</Badge>
            <Badge variant="cyan" size="xs">Vanilla JS</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Vanilla JavaScript Guide
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            Generate and display UPI QR codes with core JavaScript. Works with bundlers (Vite, Webpack, Rollup) or directly in the browser via ESM CDNs.
          </p>
        </div>

        {/* Browser ESM */}
        <section id="browser-esm" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Browser ES Modules (CDN)
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            You can load <code>@omkarbhosale/upiqr</code> directly into an HTML file without any build step using modern ESM CDNs such as <code>esm.sh</code>:
          </p>
          <CodeBlock code={esmHtmlCode} language="html" filename="index.html" />
        </section>

        {/* Split DOM */}
        <section id="split-dom" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Vanilla Split QR Grid
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Dynamically render multiple split cards in Vanilla JS:
          </p>
          <CodeBlock code={splitVanillaCode} language="javascript" filename="split-renderer.js" />
        </section>
      </div>
    </DocsLayout>
  );
}
