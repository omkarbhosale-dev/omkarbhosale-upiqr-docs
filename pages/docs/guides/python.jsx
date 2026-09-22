import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';
import Tabs from '../../../components/Tabs';
import {
  ExternalLink,
  Terminal,
  CheckCircle2,
  ShieldCheck,
  Scissors,
  QrCode,
  Layers,
  Zap,
  Rocket,
  Percent,
  FileCode,
  Lock
} from 'lucide-react';

const pipInstall = `pip install omkarbhosale-upi-qr`;
const poetryInstall = `poetry add omkarbhosale-upi-qr`;
const pipenvInstall = `pipenv install omkarbhosale-upi-qr`;

const basicSingleCode = `from omkarbhosale_upi_qr import generateQR

# 1. Keyword arguments with transaction metadata
qr_data_url = generateQR(
    UPI_ID="store@okhdfcbank",
    AMOUNT=750,
    name="Omkar Store",
    note="Coffee bill",
)
print(qr_data_url) # data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...

# 2. Dictionary payload
qr_data_url = generateQR({
    "UPI_ID": "store@okhdfcbank",
    "AMOUNT": 750,
})

# 3. Positional arguments (Backwards-compatible)
qr_data_url = generateQR("store@okhdfcbank", 750)`;

const basicSplitCode = `from omkarbhosale_upi_qr import splitTransactionQR

# Automatically splits ₹5,000 into ₹1,999 + ₹1,999 + ₹1,002
splits = splitTransactionQR({
    "UPI_ID": "store@upi",
    "AMOUNT": 5000,
    "name": "Omkar Store",
    "note": "Order #9821"
})

for item in splits:
    print(f"ID: {item.id} | Amount: ₹{item.amount}")
    # Supports both attribute access (.image) and dictionary indexing (['image'])
    print(f"Data URL: {item.image[:35]}...\\n")`;

const splitOutputJson = `[
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

const customSplitCode = `from omkarbhosale_upi_qr import splitTransactionQR

# 1. Custom threshold & interval
splits = splitTransactionQR(
    UPI_ID="store@upi",
    AMOUNT=1000,
    threshold=500,     # Trigger splitting on amounts > ₹500
    splitInterval=400, # Chunk in ₹400 intervals
    name="Omkar Store",
    note="Order #12345"
)
# Returns 3 QRs: ₹400 + ₹400 + ₹200
# Notes auto-appended: "(Part 1/3)", "(Part 2/3)", "(Part 3/3)"

# 2. Amounts within threshold (<= ₹2,000) return 1 item without splitting
single_split = splitTransactionQR(
    UPI_ID="store@upi",
    AMOUNT=1500,
)
# Returns 1 QR: [SplitQRItem(id="...", amount=1500, image="...")]`;

const validationCode = `from omkarbhosale_upi_qr import (
    upiIdSchema,
    qrParamsSchema,
    splitQRParamsSchema,
    splitQRItemSchema,
    QRParams,
    SplitQRParams
)

# 1. Validate UPI ID directly with Zod-compatible .safeParse()
result = upiIdSchema.safeParse("invalid-upi")
if not result.success:
    print(result.error.issues[0].message)
    # Output: "Invalid UPI ID format. Expected format: username@bank"
else:
    print("Valid UPI ID:", result.data)

# 2. Pre-validate split parameters
result = splitQRParamsSchema.safeParse({
    "UPI_ID": "store@upi",
    "AMOUNT": 5000,
    "splitInterval": 1999,
})

if result.success:
    validated_params = result.data  # SplitQRParams instance
    print("Valid parameters for total amount:", validated_params.AMOUNT)
else:
    print("Validation error:", result.error.message)

# 3. Direct Pydantic model usage
typed_params = SplitQRParams(
    UPI_ID="merchant@okhdfcbank",
    AMOUNT=7500.0,
    splitInterval=1999.0,
    threshold=2000.0,
    name="Merchant Store",
    note="Invoice #88"
)`;

const importModesCode = `# 1. Named imports (Recommended)
from omkarbhosale_upi_qr import generateQR, splitTransactionQR

# 2. Pythonic snake_case imports
from omkarbhosale_upi_qr import generate_qr, split_transaction_qr

# 3. Callable default object (JS parity)
from omkarbhosale_upi_qr import upiqr

single = upiqr(UPI_ID="user@upi", AMOUNT=500)
splits = upiqr.splitTransactionQR(UPI_ID="user@upi", AMOUNT=5000)

# 4. Import Pydantic models directly
from omkarbhosale_upi_qr import QRParams, SplitQRParams, SplitQRItem`;

const saveImageCode = `import base64
from omkarbhosale_upi_qr import generateQR

# 1. Generate QR Data URL
qr_data = generateQR(
    UPI_ID="merchant@okhdfcbank",
    AMOUNT=1200,
    name="Omkar Store",
    note="Invoice #1092"
)

# 2. Strip the Data URL prefix and decode base64
if "," in qr_data:
    raw_base64 = qr_data.split(",")[1]
else:
    raw_base64 = qr_data

# 3. Save to disk as PNG image
with open("payment_qr.png", "wb") as f:
    f.write(base64.b64decode(raw_base64))

print("QR Code successfully saved to payment_qr.png")`;

const fastApiCode = `from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse
from omkarbhosale_upi_qr import generateQR, splitTransactionQR, UPIValidationError

app = FastAPI(title="UPI Payment Gateway API")

UPI_ID = "store@okhdfcbank"

# 1. Single QR HTML Checkout page
@app.get("/checkout/single", response_class=HTMLResponse)
def get_checkout_page(order_id: str, amount: float):
    try:
        qr_data_url = generateQR(
            UPI_ID=UPI_ID,
            AMOUNT=amount,
            name="Omkar Store",
            note=f"Order #{order_id}"
        )
        return f"""
        <html>
            <head><title>Pay Order #{order_id}</title></head>
            <body style="font-family: system-ui; text-align: center; padding: 40px;">
                <h2>Scan & Pay for Order #{order_id}</h2>
                <h3>Total Amount: ₹{amount:.2f}</h3>
                <img src="{qr_data_url}" alt="UPI QR" style="width: 250px; height: 250px; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
                <p>Scan with GPay, PhonePe, Paytm, or BHIM</p>
            </body>
        </html>
        """
    except UPIValidationError as err:
        raise HTTPException(status_code=400, detail=str(err))

# 2. Split Transaction JSON API (for orders > ₹2,000)
@app.post("/api/checkout/split")
def create_split_checkout(order_id: str, amount: float):
    try:
        splits = splitTransactionQR(
            UPI_ID=UPI_ID,
            AMOUNT=amount,
            name="Omkar Store",
            note=f"Order #{order_id}"
        )
        return {
            "success": True,
            "order_id": order_id,
            "total_amount": amount,
            "parts_count": len(splits),
            "parts": [item.to_dict() for item in splits]
        }
    except UPIValidationError as err:
        raise HTTPException(status_code=400, detail=str(err))`;

const flaskCode = `from flask import Flask, request, jsonify
from omkarbhosale_upi_qr import generateQR, splitTransactionQR, UPIValidationError

app = Flask(__name__)

MERCHANT_UPI = "store@okhdfcbank"

@app.route("/api/qr/generate", methods=["POST"])
def generate_payment_qr():
    data = request.get_json() or {}
    amount = float(data.get("amount", 0))
    mode = data.get("mode", "single") # 'single' or 'split'
    note = data.get("note", "Online Checkout")

    try:
        if mode == "split" and amount > 2000:
            splits = splitTransactionQR(
                UPI_ID=MERCHANT_UPI,
                AMOUNT=amount,
                note=note
            )
            return jsonify({
                "success": True,
                "mode": "split",
                "total_amount": amount,
                "parts": [item.to_dict() for item in splits]
            })
        else:
            qr_image = generateQR(
                UPI_ID=MERCHANT_UPI,
                AMOUNT=amount,
                note=note
            )
            return jsonify({
                "success": True,
                "mode": "single",
                "amount": amount,
                "qr_image": qr_image
            })
    except UPIValidationError as err:
        return jsonify({"success": False, "error": str(err)}), 400
    except Exception as err:
        return jsonify({"success": False, "error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(port=5000, debug=True)`;

export default function PythonGuidePage() {
  const toc = [
    { id: 'overview', title: 'v3.0.0 Overview', depth: 2 },
    { id: 'installation', title: 'Installation (pip)', depth: 2 },
    { id: 'split-transaction', title: 'Transaction Splitting', depth: 2 },
    { id: 'generate-qr', title: 'Single QR Generation', depth: 2 },
    { id: 'validation', title: 'Pydantic & Zod Parity', depth: 2 },
    { id: 'import-modes', title: 'Import Modes & Aliases', depth: 2 },
    { id: 'save-png', title: 'Saving as PNG File', depth: 2 },
    { id: 'fastapi-integration', title: 'FastAPI Backend Guide', depth: 2 },
    { id: 'flask-integration', title: 'Flask Backend Guide', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Python Package (omkarbhosale-upi-qr) – @omkarbhosale/upiqr Docs"
      description="Official v3.0.0 documentation for the omkarbhosale-upi-qr Python package on PyPI with transaction splitting, Pydantic validation, and FastAPI/Flask integrations."
      toc={toc}
    >
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <Badge variant="brand" size="xs">
              <Rocket className="h-3 w-3" /> Python v3.0.0
            </Badge>
            <Badge variant="emerald" size="xs">
              <ShieldCheck className="h-3 w-3" /> Pydantic v2 Validated
            </Badge>
            <Badge variant="cyan" size="xs">PyPI Package</Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Python Integration Guide
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            <code>omkarbhosale-upi-qr</code> is the official Python edition of the zero-gateway UPI payment library. It brings automatic transaction splitting, Pydantic v2 schema validation with <code>.safeParse()</code> support, paise-level precision integer arithmetic, and complete framework parity with the JavaScript library.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <a
              href="https://pypi.org/project/omkarbhosale-upi-qr/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all shadow-sm"
            >
              <span>View on PyPI (omkarbhosale-upi-qr)</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://github.com/omkarbhosale-dev/omkarbhosale-upiqr"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 px-3 py-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all shadow-sm"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <section id="overview" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            What's New in Python v3.0.0
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Scissors className="h-5 w-5 text-brand-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Transaction Splitting</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Automatically breaks amounts &gt; ₹2,000 into ₹1,999 intervals under NPCI guidelines.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <ShieldCheck className="h-5 w-5 text-emerald-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Pydantic v2 Schemas</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Strict runtime validation with full Zod parity: <code>.safeParse()</code> and <code>.parse()</code> methods.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Percent className="h-5 w-5 text-accent-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Paise Precision Math</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Operates on integer paise (<code>round(amount * 100)</code>) to prevent IEEE-754 float drift.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Layers className="h-5 w-5 text-indigo-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Flexible Call Signatures</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Accepts keyword args, dictionary payloads, positional args, or direct Pydantic models.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <FileCode className="h-5 w-5 text-purple-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Dual Import Support</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Named imports, snake_case aliases, and callable <code>upiqr</code> object for JS developers.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <Lock className="h-5 w-5 text-rose-500 mb-2" />
              <div className="text-xs font-bold text-slate-900 dark:text-white mb-1">Zero Third-Party Telemetry</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                QR codes generate completely offline in your Python process. No cloud APIs or webhooks required.
              </p>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Installation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Install the latest v3.0.0 release using your package manager:
          </p>

          <Tabs items={['pip', 'poetry', 'pipenv']}>
            <CodeBlock code={pipInstall} language="bash" />
            <CodeBlock code={poetryInstall} language="bash" />
            <CodeBlock code={pipenvInstall} language="bash" />
          </Tabs>
        </section>

        {/* splitTransactionQR */}
        <section id="split-transaction" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="xs">Core Feature</Badge>
            <Badge variant="emerald" size="xs">NPCI Optimized</Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            1. <code>splitTransactionQR(*args, **kwargs)</code>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            Splits large transactions exceeding a threshold (default ₹2,000) into ₹1,999 intervals and generates a QR code for each chunk concurrently. Under NPCI guidelines, transactions $\le$ ₹2,000 often bypass merchant interchange fees on PPI wallets and achieve higher checkout completion.
          </p>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Function Signature
            </h3>
            <CodeBlock
              code={`def splitTransactionQR(*args, **kwargs) -> List[SplitQRItem]:\n# Also available as snake_case alias:\ndef split_transaction_qr(*args, **kwargs) -> List[SplitQRItem]:`}
              language="python"
            />
          </div>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Parameters Table
          </h3>
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 mb-6">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-dark-900 text-slate-900 dark:text-slate-200 font-semibold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Parameter</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Required</th>
                  <th className="p-3">Default</th>
                  <th className="p-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 font-mono text-[11px]">
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">UPI_ID / upi_id</td>
                  <td className="p-3 text-slate-500">str</td>
                  <td className="p-3 text-rose-500 font-bold">Yes</td>
                  <td className="p-3 text-slate-400">—</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Valid UPI ID (e.g. <code>store@upi</code>).</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">AMOUNT / amount</td>
                  <td className="p-3 text-slate-500">float | int</td>
                  <td className="p-3 text-rose-500 font-bold">Yes</td>
                  <td className="p-3 text-slate-400">—</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Total amount to receive (up to ₹10,00,000).</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">splitInterval / split_interval</td>
                  <td className="p-3 text-slate-500">float | int</td>
                  <td className="p-3 text-slate-400">No</td>
                  <td className="p-3 text-amber-500">1999</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Maximum amount per split chunk.</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">threshold</td>
                  <td className="p-3 text-slate-500">float | int</td>
                  <td className="p-3 text-slate-400">No</td>
                  <td className="p-3 text-amber-500">2000</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Trigger threshold. If amount &le; threshold, only 1 QR is generated.</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">name</td>
                  <td className="p-3 text-slate-500">str</td>
                  <td className="p-3 text-slate-400">No</td>
                  <td className="p-3 text-slate-400">None</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Payee name (<code>pn</code> parameter in UPI URI).</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">note</td>
                  <td className="p-3 text-slate-500">str</td>
                  <td className="p-3 text-slate-400">No</td>
                  <td className="p-3 text-slate-400">None</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Transaction memo. Each chunk appends <code>(Part X/Y)</code>.</td>
                </tr>
                <tr>
                  <td className="p-3 text-brand-600 dark:text-brand-400 font-semibold">currency</td>
                  <td className="p-3 text-slate-500">str</td>
                  <td className="p-3 text-slate-400">No</td>
                  <td className="p-3 text-slate-400">"INR"</td>
                  <td className="p-3 font-sans text-slate-600 dark:text-slate-400">Currency code. Defaults to <code>INR</code>.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Basic Split Example (₹5,000)
          </h3>
          <CodeBlock code={basicSplitCode} language="python" filename="split_example.py" />

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-4 mb-2">
            Expected JSON Output Structure
          </h3>
          <CodeBlock code={splitOutputJson} language="json" />

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-6 mb-2">
            Custom Threshold &amp; Interval Handling
          </h3>
          <CodeBlock code={customSplitCode} language="python" filename="custom_split.py" />
        </section>

        {/* generateQR */}
        <section id="generate-qr" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="brand" size="xs">Core API</Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            2. <code>generateQR(*args, **kwargs)</code>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Generates a single UPI QR code as a base64 Data URL (<code>data:image/png;base64,...</code>).
          </p>

          <div className="mb-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Function Signature
            </h3>
            <CodeBlock
              code={`def generateQR(*args, **kwargs) -> str:\n# Also available as snake_case alias:\ndef generate_qr(*args, **kwargs) -> str:`}
              language="python"
            />
          </div>

          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Usage Examples (Keyword, Dict, and Positional Args)
          </h3>
          <CodeBlock code={basicSingleCode} language="python" filename="generate_qr.py" />
        </section>

        {/* Validation & Pydantic */}
        <section id="validation" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="emerald" size="xs">Zod 4 Parity</Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            3. Pydantic Schemas &amp; Runtime Validation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Every input is validated before generating QR images. The Python package exposes Zod-compatible schema wrappers (<code>.safeParse()</code> and <code>.parse()</code>) alongside full Pydantic v2 models:
          </p>

          <CodeBlock code={validationCode} language="python" filename="validation_demo.py" />

          <div className="mt-4 p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 space-y-2">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Validation Rules Reference:</h4>
            <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
              <li><strong>UPI ID:</strong> Regex <code>^[\w.-]+@[\w.-]+$</code>, 3 to 50 characters, auto-trimmed.</li>
              <li><strong>Single Amount:</strong> Positive, finite number &le; ₹1,00,000.</li>
              <li><strong>Split Amount:</strong> Positive, finite number &le; ₹10,00,000.</li>
              <li><strong>Error Format:</strong> Throws <code>UPIValidationError</code> (inherits from <code>ValueError</code>) formatted as <code>Validation error: field: message</code>.</li>
            </ul>
          </div>
        </section>

        {/* Import Modes */}
        <section id="import-modes" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            4. Import Modes &amp; Pythonic Aliases
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            To make integrating effortless for both Python developers and JavaScript teams porting code, multiple import styles are supported:
          </p>
          <CodeBlock code={importModesCode} language="python" filename="imports.py" />
        </section>

        {/* Save PNG */}
        <section id="save-png" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            5. Saving QR Code as a PNG File
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            To write the generated QR code directly to disk for PDF invoices, receipt printers, or email attachments, decode the base64 string using standard <code>base64</code>:
          </p>
          <CodeBlock code={saveImageCode} language="python" filename="save_qr.py" />
        </section>

        {/* FastAPI */}
        <section id="fastapi-integration" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            6. FastAPI Backend Integration
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Production-ready async FastAPI application featuring both single QR HTML checkout and split-transaction JSON API:
          </p>
          <CodeBlock code={fastApiCode} language="python" filename="main.py" />
        </section>

        {/* Flask */}
        <section id="flask-integration" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            7. Flask Backend Integration
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Flask endpoint handling dynamic payment QR generation with automated splitting for orders &gt; ₹2,000:
          </p>
          <CodeBlock code={flaskCode} language="python" filename="app.py" />
        </section>
      </div>
    </DocsLayout>
  );
}
