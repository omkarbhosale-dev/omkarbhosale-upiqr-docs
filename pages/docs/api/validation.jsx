import React from 'react';
import DocsLayout from '../../../components/DocsLayout';
import CodeBlock from '../../../components/CodeBlock';
import Callout from '../../../components/Callout';
import Badge from '../../../components/Badge';

const importSchemaCode = `import {
  upiIdSchema,
  qrParamsSchema,
  splitQRParamsSchema,
  splitQRItemSchema
} from "@omkarbhosale/upiqr";`;

const formValidationCode = `import { upiIdSchema } from "@omkarbhosale/upiqr";

function validateUserInput(inputUPI) {
  const result = upiIdSchema.safeParse(inputUPI);
  
  if (!result.success) {
    // Access detailed Zod error message
    const errorMessage = result.error.issues[0].message;
    console.error("Invalid UPI:", errorMessage);
    return { valid: false, error: errorMessage };
  }

  return { valid: true, data: result.data };
}

// Example calls:
validateUserInput("test@upi");       // { valid: true, data: "test@upi" }
validateUserInput("invalid_format"); // { valid: false, error: "Invalid UPI ID format..." }`;

const fullFormCode = `import { qrParamsSchema } from "@omkarbhosale/upiqr";

export async function handleCheckout(formData) {
  const parsed = qrParamsSchema.safeParse({
    UPI_ID: formData.get("upi_id"),
    AMOUNT: Number(formData.get("amount")),
    name: formData.get("name"),
    note: formData.get("note"),
  });

  if (!parsed.success) {
    // Map issues into a clean dictionary
    const fieldErrors = {};
    parsed.error.issues.forEach(issue => {
      const field = issue.path[0] || "form";
      fieldErrors[field] = issue.message;
    });
    return { success: false, errors: fieldErrors };
  }

  // Safe and ready to generate QR
  return { success: true, validatedData: parsed.data };
}`;

export default function ValidationPage() {
  const toc = [
    { id: 'exported-schemas', title: 'Exported Schemas', depth: 2 },
    { id: 'validation-rules', title: 'Validation Rules', depth: 2 },
    { id: 'form-validation', title: 'Pre-Validating Forms', depth: 2 },
    { id: 'api-validation', title: 'Validating API Payloads', depth: 2 },
    { id: 'error-structure', title: 'Error Structure', depth: 2 },
  ];

  return (
    <DocsLayout
      title="Validation & Zod Schemas – @omkarbhosale/upiqr Docs"
      description="Reference for Zod 4 schemas and runtime parameter validation in @omkarbhosale/upiqr v3.0.0."
      toc={toc}
    >
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" size="xs">Core API</Badge>
            <Badge variant="emerald" size="xs">Zod 4 Built-In</Badge>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Validation & Zod Schemas
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
            All parameters in <code>@omkarbhosale/upiqr</code> are strictly validated at runtime using Zod 4. You can also import the schemas directly to pre-validate inputs in your UI forms or API routes.
          </p>
        </div>

        {/* Exported Schemas */}
        <section id="exported-schemas" className="scroll-mt-24 pt-4 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Exported Schemas
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
            Import schemas directly from the package:
          </p>
          <CodeBlock code={importSchemaCode} language="typescript" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">upiIdSchema</div>
              <p className="text-[11px] text-slate-500">Validates handle formatting, regex, and min/max length.</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">qrParamsSchema</div>
              <p className="text-[11px] text-slate-500">Validates params for <code>generateQR()</code> (limit: ₹1,00,000).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">splitQRParamsSchema</div>
              <p className="text-[11px] text-slate-500">Validates params for <code>splitTransactionQR()</code> (limit: ₹10,00,000).</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900">
              <div className="font-mono text-xs font-bold text-brand-500 mb-1">splitQRItemSchema</div>
              <p className="text-[11px] text-slate-500">Validates each split chunk item in the output array.</p>
            </div>
          </div>
        </section>

        {/* Validation Rules */}
        <section id="validation-rules" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
            Validation Rules
          </h2>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 dark:bg-dark-900 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-white/10">
                <tr>
                  <th className="p-3">Field</th>
                  <th className="p-3">Constraint</th>
                  <th className="p-3">Failure Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-slate-600 dark:text-slate-400">
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">UPI_ID</td>
                  <td className="p-3">Regex <code>/^[\w.-]+@[\w.-]+$/</code></td>
                  <td className="p-3"><code>"Invalid UPI ID format. Expected format: username@bank"</code></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">UPI_ID</td>
                  <td className="p-3">3 to 50 characters</td>
                  <td className="p-3"><code>"UPI ID must be between 3 and 50 characters"</code></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">AMOUNT</td>
                  <td className="p-3">Positive &amp; Finite</td>
                  <td className="p-3"><code>"Amount must be greater than 0"</code></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">AMOUNT (Single)</td>
                  <td className="p-3">Max ₹1,00,000</td>
                  <td className="p-3"><code>"Single QR amount cannot exceed ₹1,00,000"</code></td>
                </tr>
                <tr>
                  <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">AMOUNT (Split)</td>
                  <td className="p-3">Max ₹10,00,000</td>
                  <td className="p-3"><code>"Split QR amount cannot exceed ₹10,00,000"</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Pre-Validating Forms */}
        <section id="form-validation" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Pre-Validating UI Forms
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            Use <code>upiIdSchema.safeParse()</code> in your input blur or change handlers to give users instant visual feedback:
          </p>
          <CodeBlock code={formValidationCode} language="typescript" filename="utils/validate.ts" />
        </section>

        {/* API Payloads */}
        <section id="api-validation" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Validating API Payloads
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            If generating QR codes inside Next.js Server Actions or Node.js API handlers, use <code>qrParamsSchema</code> to sanitize the incoming request:
          </p>
          <CodeBlock code={fullFormCode} language="typescript" filename="app/actions/checkout.ts" />
        </section>

        {/* Error Structure */}
        <section id="error-structure" className="scroll-mt-24 pt-6 border-t border-slate-200 dark:border-white/10">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Error Structure
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
            When <code>generateQR()</code> or <code>splitTransactionQR()</code> encounters validation issues, it throws a consolidated standard Error formatted as:
          </p>
          <div className="p-3 rounded-xl bg-slate-100 dark:bg-dark-900 border border-slate-200 dark:border-white/10 font-mono text-xs text-rose-600 dark:text-rose-400">
            Validation error: &lt;field&gt;: &lt;message&gt;; &lt;field2&gt;: &lt;message2&gt;
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
