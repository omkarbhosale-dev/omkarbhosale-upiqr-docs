import React, { useState } from 'react';

export default function Tabs({ items = [], children }) {
  const [activeTab, setActiveTab] = useState(0);

  // If children is an array or function, render active child
  const content = React.Children.toArray(children);

  return (
    <div className="my-5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-dark-900/50 backdrop-blur-sm overflow-hidden shadow-sm">
      {/* Tab headers */}
      <div className="flex border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-dark-950/80 px-2 pt-2 gap-1 overflow-x-auto">
        {items.map((item, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-xs font-semibold tracking-wide transition-all border-b-2 ${
                isActive
                  ? 'border-brand-500 bg-white dark:bg-dark-850 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      <div className="p-4">
        {content[activeTab] || null}
      </div>
    </div>
  );
}
