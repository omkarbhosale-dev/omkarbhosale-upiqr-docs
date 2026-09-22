import React from 'react';
import { Info, Lightbulb, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Callout({ type = 'info', title, children }) {
  const configs = {
    info: {
      icon: Info,
      wrapper: 'bg-brand-500/5 dark:bg-brand-500/10 border-brand-500/20 text-slate-800 dark:text-slate-200',
      iconColor: 'text-brand-500',
      titleColor: 'text-brand-700 dark:text-brand-300',
      defaultTitle: 'Note',
    },
    tip: {
      icon: Lightbulb,
      wrapper: 'bg-emerald-500/5 dark:bg-emerald-500/10 border-emerald-500/20 text-slate-800 dark:text-slate-200',
      iconColor: 'text-emerald-500',
      titleColor: 'text-emerald-700 dark:text-emerald-300',
      defaultTitle: 'Pro Tip',
    },
    warning: {
      icon: AlertTriangle,
      wrapper: 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/20 text-slate-800 dark:text-slate-200',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-700 dark:text-amber-300',
      defaultTitle: 'Important',
    },
    danger: {
      icon: AlertCircle,
      wrapper: 'bg-rose-500/5 dark:bg-rose-500/10 border-rose-500/20 text-slate-800 dark:text-slate-200',
      iconColor: 'text-rose-500',
      titleColor: 'text-rose-700 dark:text-rose-300',
      defaultTitle: 'Caution',
    },
    success: {
      icon: CheckCircle2,
      wrapper: 'bg-teal-500/5 dark:bg-teal-500/10 border-teal-500/20 text-slate-800 dark:text-slate-200',
      iconColor: 'text-teal-500',
      titleColor: 'text-teal-700 dark:text-teal-300',
      defaultTitle: 'Completed',
    },
  };

  const config = configs[type] || configs.info;
  const IconComponent = config.icon;

  return (
    <div className={`my-6 rounded-xl border p-4 backdrop-blur-sm transition-all ${config.wrapper}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <IconComponent className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 text-sm leading-relaxed">
          <div className={`font-semibold mb-1 ${config.titleColor}`}>
            {title || config.defaultTitle}
          </div>
          <div className="prose prose-sm dark:prose-invert max-w-none opacity-90">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
