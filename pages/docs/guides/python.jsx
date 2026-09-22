import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';
import Tabs from '../../../components/Tabs';
import { ExternalLink, Terminal, CheckCircle2, ShieldCheck, Download, Code } from 'lucide-react';

const pipInstall = `pip install omkarbhosale-upi-qr`;
const poetryInstall = `poetry add omkarbhosale-upi-qr`;
const pipenvInstall = `pipenv install omkarbhosale-upi-qr`;

const basicPythonCode = `from upi_qr import omkarbhosale_upi_qr

# Generate a base64 QR code for payment
qr_base64 = omkarbhosale_upi_qr(
    upi_id="merchant@okhdfcbank",
    amount=750
)

print(qr_base64)
# Output: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."`;

const saveImageCode = `import base64
from upi_qr import omkarbhosale_upi_qr

# 1. Generate QR string
qr_data = omkarbhosale_upi_qr(upi_id="merchant@upi", amount=1200)

# 2. Extract base64 payload (strip data:image/png;base64, prefix if present)
if "," in qr_data:
    raw_base64 = qr_data.split(",")[1]
else:
    raw_base64 = qr_data

# 3. Save to disk as PNG
with open("payment_qr.png", "wb") as f:
    f.write(base64.b64decode(raw_base64))

print("QR Code successfully saved to payment_qr.png")`;

const fastApiCode = `from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from upi_qr import omkarbhosale_upi_qr

app = FastAPI(title="UPI Payment Gateway API")

UPI_ID = "store@okhdfcbank"

@app.get("/checkout/{order_id}", response_class=HTMLResponse)
def get_checkout_qr(order_id: str, amount: float):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")

    # Generate QR Code
    qr_data_url = omkarbhosale_upi_qr(upi_id=UPI_ID, amount=amount)

    html_content = f"""
    <html>
        <head><title>Pay Order #{order_id}</title></head>
        <body style="font-family: system-ui; text-align: center; padding: 40px;">
            <h2>Scan & Pay for Order #{order_id}</h2>
            <h3>Amount: ₹{amount:.2f}</h3>
            <img src="{qr_data_url}" alt="UPI QR" style="width: 250px; height: 250px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
            <p>Scan with GPay, PhonePe, Paytm or BHIM</p>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)`;

const flaskCode = `from flask import Flask, render_template_string, request, jsonify
from upi_qr import omkarbhosale_upi_qr

app = Flask(__name__)

MERCHANT_UPI = "store@okhdfcbank"

@app.route("/api/generate-qr", methods=["POST"])
def generate_payment_qr():
    data = request.get_json() or {}
    amount = data.get("amount")

    if not amount or amount <= 0:
        return jsonify({"success": False, "error": "Amount must be greater than 0"}), 400

    try:
        qr_image = omkarbhosale_upi_qr(upi_id=MERCHANT_UPI, amount=amount)
        return jsonify({
            "success": True,
            "qr_image": qr_image,
            "amount": amount,
            "upi_id": MERCHANT_UPI
        })
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)`;

export default function PythonGuidePage() {
  const toc = [
    { id: 'installation', title: 'Installation (pip)', depth: 2 },
    { id: 'basic-usage', title: 'Basic Python Usage', depth: 2 },
    { id: 'save-png', title: 'Saving as PNG Image', depth: 2 },
    { id: 'fastapi-integration', title: 'FastAPI Backend Integration', depth: 2 },
    { id: 'flask-integration', title: 'Flask Backend Integration', depth: 2 },
    { id: 'features', title: 'Key Features & Security', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Python Package (omkarbhosale-upi-qr) – @omkarbhosale/upiqr Docs"
      description="Documentation and backend integration guide for the official Python package omkarbhosale-upi-qr on PyPI."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Language Guide</Badge>
            <Badge variant="emerald" size="xs">PyPI Package</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Python Integration Guide
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            In addition to the JavaScript/TypeScript library, you can generate dynamic UPI QR codes in Python backends using the official PyPI package <code>omkarbhosale-upi-qr</code>.
          </p>

          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://pypi.org/project/omkarbhosale-upi-qr/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline"
            >
              <span>View on PyPI (omkarbhosale-upi-qr)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Installation */}
        <section id="installation" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Installation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Install the Python package using your favorite package manager:
          </p>

          <Tabs items={['pip', 'poetry', 'pipenv']}>
            <CodeBlock code={pipInstall} language="bash" />
            <CodeBlock code={poetryInstall} language="bash" />
            <CodeBlock code={pipenvInstall} language="bash" />
          </Tabs>
        </section>

        {/* Basic Usage */}
        <section id="basic-usage" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Basic Python Usage
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Import <code>omkarbhosale_upi_qr</code> from <code>upi_qr</code>. The function accepts <code>upi_id</code> and <code>amount</code> and returns a Base64-encoded image string:
          </p>
          <CodeBlock code={basicPythonCode} language="python" filename="generate_qr.py" />
        </section>

        {/* Save PNG */}
        <section id="save-png" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Saving QR Code as a PNG Image
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            To write the generated QR code directly to disk (e.g. for generating invoice PDFs, email attachments, or thermal print receipts), decode the base64 string using Python's standard <code>base64</code> module:
          </p>
          <CodeBlock code={saveImageCode} language="python" filename="save_qr.py" />
        </section>

        {/* FastAPI */}
        <section id="fastapi-integration" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            FastAPI Backend Integration
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Embed UPI QR codes into high-performance async REST endpoints or checkout web pages in FastAPI:
          </p>
          <CodeBlock code={fastApiCode} language="python" filename="main.py" />
        </section>

        {/* Flask */}
        <section id="flask-integration" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Flask Backend Integration
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Build a JSON API in Flask that generates dynamic QR codes for client apps on demand:
          </p>
          <CodeBlock code={flaskCode} language="python" filename="app.py" />
        </section>

        {/* Key Features & Security */}
        <section id="features" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Key Features & Privacy Guarantees
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Zero Telemetry</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                All QR math and image rendering occur locally in your Python environment. Your UPI ID is never shared with third parties.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <CheckCircle2 className="h-5 w-5 text-brand-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Standard UPI URLs</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Generates compliant <code>upi://pay</code> URLs supported across Google Pay, PhonePe, Paytm, CRED, and BHIM apps.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Code className="h-5 w-5 text-accent-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Framework Agnostic</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Seamlessly integrates with Django, Flask, FastAPI, Celery background jobs, and CLI scripts.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
