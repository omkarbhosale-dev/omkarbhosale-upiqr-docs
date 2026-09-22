import React, { useState } from 'react';
import { 
  QrCode, 
  Scissors, 
  FlaskConical,
  Zap, 
  Download, 
  Copy, 
  Check, 
  ArrowRight, 
  AlertCircle, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw 
} from 'lucide-react';
import Badge from './Badge';

export default function InteractiveQRStudio({ defaultMode = 'split' }) {
  const [mode, setMode] = useState(defaultMode);
  const [upiId, setUpiId] = useState('store@upi');
  const [amount, setAmount] = useState(5000);
  const [name, setName] = useState('Omkar Store');
  const [note, setNote] = useState('Invoice #1092');
  const [threshold, setThreshold] = useState(2000);
  const [splitInterval, setSplitInterval] = useState(1999);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        action: mode === 'split' ? 'split' : 'single',
        params: {
          UPI_ID: upiId.trim(),
          AMOUNT: Number(amount),
          name: name.trim() || undefined,
          note: note.trim() || undefined,
          currency: 'INR',
          ...(mode === 'split' ? {
            threshold: Number(threshold) || 2000,
            splitInterval: Number(splitInterval) || 1999,
          } : {})
        }
      };

      const res = await fetch('/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) {
        throw new Error(json.error || 'Failed to generate QR code');
      }

      setResults(json.data);
    } catch (err) {
      setError(err.message || 'An error occurred during generation');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (base64Data, filename = 'upi-qr.png') => {
    const link = document.createElement('a');
    link.href = base64Data;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="my-8 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900/90 shadow-2xl overflow-hidden backdrop-blur-xl transition-all">
      {/* Studio Header */}
      <div className="border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-dark-950/80 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 text-white shadow-glow-sm">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Interactive UPI QR Studio
              <Badge variant="brand" size="xs">Live v3.0.0</Badge>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Simulate live QR generation & transaction splitting directly in your browser
            </p>
          </div>
        </div>

        {/* Mode switcher pills */}
        <div className="flex rounded-xl bg-slate-200/80 dark:bg-dark-800 p-1 text-xs font-semibold">
          <button
            type="button"
            onClick={() => {
              setMode('split');
              setResults(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
              mode === 'split'
                ? 'bg-white dark:bg-brand-600 text-brand-600 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scissors className="h-3.5 w-3.5" />
            <span>Split Transaction</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('single');
              setResults(null);
            }}
            className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 transition-all ${
              mode === 'single'
                ? 'bg-white dark:bg-brand-600 text-brand-600 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>Single QR</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Input Configuration Panel */}
        <form onSubmit={handleGenerate} className="p-6 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-white/10 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              UPI ID (VPA) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="username@bank"
              required
              className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-950 px-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Transaction Amount (₹) <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">₹</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min="1"
                step="any"
                required
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-950 pl-8 pr-3.5 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 font-mono font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Payee Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Optional"
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-950 px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Transaction Note
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional"
                className="w-full rounded-xl border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-950 px-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {mode === 'split' && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-dark-950/60 border border-slate-200 dark:border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Scissors className="h-3.5 w-3.5 text-brand-500" />
                  Split Interval Settings
                </span>
                <Badge variant="cyan" size="xs">NPCI Optimized</Badge>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    Threshold (₹)
                  </label>
                  <input
                    type="number"
                    value={threshold}
                    onChange={(e) => setThreshold(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-900 px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 dark:text-slate-400 mb-1">
                    Split Interval (₹)
                  </label>
                  <input
                    type="number"
                    value={splitInterval}
                    onChange={(e) => setSplitInterval(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-300 dark:border-white/10 bg-white dark:bg-dark-900 px-2.5 py-1 text-xs font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Any amount &gt; ₹{threshold} triggers splitting into max ₹{splitInterval} chunks to bypass PPI interchange fees.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold py-2.5 px-4 shadow-glow-sm transition-all active:scale-[0.99] disabled:opacity-50 text-sm"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>Generating with Zod 4...</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4" />
                <span>{mode === 'split' ? 'Calculate & Generate Splits' : 'Generate Single QR'}</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </form>

        {/* Live Output Preview Panel */}
        <div className="p-6 lg:col-span-7 flex flex-col justify-center items-center bg-slate-50/50 dark:bg-dark-950/40 min-h-[380px]">
          {results ? (
            <div className="w-full space-y-4">
              {mode === 'split' && Array.isArray(results) ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-brand-500" />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {results.length} Split {results.length === 1 ? 'Part' : 'Parts'} Generated
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      Total: <strong className="text-slate-900 dark:text-white">₹{amount}</strong>
                    </span>
                  </div>

                  {/* Display All Split QRs in a Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full pt-1">
                    {results.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 flex flex-col items-center text-center shadow-sm hover:border-brand-500/30 transition-all"
                      >
                        <div className="w-full flex items-center justify-between pb-2 border-b border-slate-100 dark:border-white/5 mb-2">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            Part {idx + 1} of {results.length}
                          </span>
                          <span className="text-[11px] font-bold text-brand-600 dark:text-brand-400">
                            ₹{item.amount}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-sm my-2">
                          <img
                            src={item.image}
                            alt={`QR Part ${idx + 1}`}
                            className="w-36 h-36 object-contain rounded-lg"
                          />
                        </div>

                        <div className="mt-2 text-center">
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                            Amount
                          </div>
                          <div className="text-xl font-black text-slate-900 dark:text-white">
                            ₹{item.amount}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Single QR Result */
                <div className="p-6 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-dark-900 flex flex-col md:flex-row items-center gap-6">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-md">
                    <img
                      src={results}
                      alt="Single UPI QR"
                      className="w-44 h-44 object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 space-y-3 text-xs">
                    <Badge variant="emerald" size="xs">
                      <CheckCircle2 className="h-3 w-3" /> Valid UPI QR Generated
                    </Badge>
                    <div>
                      <div className="text-slate-500 text-[11px]">Receiving Amount</div>
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
                        ₹{amount}
                      </div>
                    </div>
                    <div className="space-y-1 text-slate-600 dark:text-slate-400">
                      <div>UPI ID: <span className="font-mono font-medium text-slate-900 dark:text-white">{upiId}</span></div>
                      {name && <div>Payee: <span className="font-medium text-slate-900 dark:text-white">{name}</span></div>}
                      {note && <div>Note: <span className="font-medium text-slate-900 dark:text-white">{note}</span></div>}
                    </div>

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => handleDownload(results, 'upi-qr.png')}
                        className="flex items-center gap-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white px-3.5 py-1.5 font-medium shadow-sm transition-all text-xs"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download QR Code</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center p-8 space-y-3 max-w-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
                <QrCode className="h-7 w-7" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Ready to Generate
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Adjust parameters on the left and click Generate to see the base64 QR Data URL and split chunks live.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
