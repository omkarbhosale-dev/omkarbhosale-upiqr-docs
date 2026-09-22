import React from 'react';

export default function Badge({ children, variant = 'brand', size = 'sm' }) {
  const variantStyles = {
    brand: 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20',
    cyan: 'bg-accent-500/10 text-accent-600 dark:text-accent-400 border-accent-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
  };

  const sizeStyles = {
    xs: 'px-1.5 py-0.5 text-[10px] font-medium tracking-wide',
    sm: 'px-2.5 py-0.5 text-xs font-medium',
    md: 'px-3 py-1 text-sm font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${
        variantStyles[variant] || variantStyles.brand
      } ${sizeStyles[size] || sizeStyles.sm}`}
    >
      {children}
    </span>
  );
}
