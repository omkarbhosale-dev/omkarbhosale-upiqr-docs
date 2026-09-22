import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { 
  QrCode, 
  Scissors, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  BookOpen, 
  Rocket,
  FlaskConical, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  ExternalLink, 
  ChevronRight, 
  Code2, 
  ArrowRight,
  ChevronLeft,
  ArrowUpRight,
  Package,
  FileCode,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useThemeMode } from '../pages/_app';
import Badge from './Badge';

function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

const navigation = [
  {
    category: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/', icon: BookOpen },
      { title: 'Installation & Setup', href: '/docs/installation', icon: Terminal },
      { title: 'Migration to v3.0.0', href: '/docs/migration', icon: Rocket, badge: 'v3.0.0' },
    ],
  },
  {
    category: 'Core API Reference',
    items: [
      { title: 'generateQR()', href: '/docs/api/generate-qr', icon: QrCode },
      { title: 'splitTransactionQR()', href: '/docs/api/split-transaction', icon: Scissors, badge: 'New' },
      { title: 'Validation & Zod Schemas', href: '/docs/api/validation', icon: ShieldCheck },
    ],
  },
  {
    category: 'Framework & Language Guides',
    items: [
      { title: 'Next.js (App & Pages)', href: '/docs/guides/nextjs', icon: Layers },
      { title: 'Vanilla JavaScript', href: '/docs/guides/javascript', icon: Code2 },
      { title: 'Python (PyPI)', href: '/docs/guides/python', icon: Terminal, badge: 'PyPI' },
      { title: 'Demo Repository', href: '/docs/guides/clone-repo', icon: FileCode },
    ],
  },
  {
    category: 'Interactive Tools',
    items: [
      { title: 'Live QR Studio', href: '/playground', icon: FlaskConical, badge: 'Live' },
    ],
  },
];

// Flatten for pagination
const flatItems = navigation.flatMap((group) => group.items);

export default function DocsLayout({
  children,
  title = '@omkarbhosale/upiqr - Zero-Gateway UPI Payments',
  description = 'High-performance, zero-server UPI QR Code Generator with automated transaction splitting for Indian payments.',
  toc = [],
}) {
  const router = useRouter();
  const currentPath = router.pathname;
  const { isDark, toggleTheme } = useThemeMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentIndex = flatItems.findIndex((item) => item.href === currentPath);
  const prevPage = currentIndex > 0 ? flatItems[currentIndex - 1] : null;
  const nextPage = currentIndex >= 0 && currentIndex < flatItems.length - 1 ? flatItems[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-950 text-slate-800 dark:text-slate-100 flex flex-col antialiased selection:bg-brand-500 selection:text-white transition-colors duration-200">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>" />
      </Head>

      {/* Release Announcement Banner */}
      <div className="relative isolate flex items-center justify-center gap-x-3 overflow-hidden bg-gradient-to-r from-brand-600 via-indigo-600 to-accent-600 px-4 py-2 text-xs font-medium text-white shadow-sm sm:px-6">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            <strong>v3.0.0 is released!</strong> Automatic Transaction Splitting, Zod 4 & Precision Math.
          </span>
        </div>
        <Link
          href="/docs/migration"
          className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold text-white hover:bg-white/30 transition-all flex items-center gap-1"
        >
          <span>What's New</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-dark-950/80 backdrop-blur-xl transition-all">
        <div className="mx-auto flex h-16 w-full max-w-[96rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & Brand */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 to-accent-500 text-white shadow-glow-sm group-hover:scale-105 transition-all">
                <QrCode className="h-5 w-5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                  upiqr
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  v3.0.0
                </span>
              </div>
            </Link>

            {/* Desktop Top Nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600 dark:text-slate-300">
              <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Docs
              </Link>
              <Link href="/docs/api/generate-qr" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                API Reference
              </Link>
              <Link href="/docs/guides/nextjs" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Guides
              </Link>
              <Link href="/playground" className="flex items-center gap-1.5 text-brand-600 dark:text-brand-400 hover:opacity-80 transition-opacity">
                <FlaskConical className="h-3.5 w-3.5" />
                <span>Playground</span>
              </Link>
            </nav>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://www.npmjs.com/package/@omkarbhosale/upiqr"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all"
            >
              <Package className="h-3.5 w-3.5 text-rose-500" />
              <span>npm v3.0.0</span>
            </a>

            <a
              href="https://github.com/omkarbhosale-dev/omkarbhosale-upiqr"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all"
              title="GitHub Repository"
            >
              <GithubIcon className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              type="button"
              className="rounded-lg border border-slate-200 dark:border-white/10 p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-850 transition-all"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden rounded-lg border border-slate-200 dark:border-white/10 p-2 text-slate-600 dark:text-slate-300"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-dark-950/80 backdrop-blur-xl p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-2">
              <QrCode className="h-6 w-6 text-brand-500" />
              <span className="font-extrabold text-lg text-white">upiqr docs</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {navigation.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  {group.category}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                            isActive
                              ? 'bg-brand-600 text-white'
                              : 'text-slate-300 hover:bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent className="h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge variant={isActive ? 'neutral' : 'brand'} size="xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout Body */}
      <div className="mx-auto flex w-full max-w-[96rem] flex-1 px-4 sm:px-6 lg:px-8">
        {/* Left Sticky Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 shrink-0 py-8 pr-6 border-r border-slate-200/80 dark:border-white/10">
          <div className="sticky top-24 space-y-7 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            {navigation.map((group, idx) => (
              <div key={idx}>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 px-3">
                  {group.category}
                </h4>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const isActive = currentPath === item.href;
                    const IconComponent = item.icon;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={`group flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                            isActive
                              ? 'bg-brand-500/10 dark:bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/25 shadow-sm'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-850 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <IconComponent
                              className={`h-4 w-4 transition-colors ${
                                isActive ? 'text-brand-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                              }`}
                            />
                            <span>{item.title}</span>
                          </div>
                          {item.badge && (
                            <Badge variant={isActive ? 'brand' : 'neutral'} size="xs">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            {/* Quick Links Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/5 to-accent-500/5 border border-brand-500/15">
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                Zero Gateway Fees
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                Direct client-to-bank UPI transfers without payment aggregator cuts.
              </p>
              <a
                href="https://github.com/omkarbhosale-dev/omkarbhosale-upiqr"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                <span>Star on GitHub</span>
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </aside>

        {/* Center Content Column */}
        <main className="flex-1 py-8 md:px-8 lg:px-12 min-w-0">
          <div className="w-full max-w-4xl xl:max-w-5xl">
            {children}

            {/* Bottom Pagination Controls */}
            <div className="mt-14 pt-8 border-t border-slate-200 dark:border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevPage ? (
                <Link
                  href={prevPage.href}
                  className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 bg-white dark:bg-dark-900/60 hover:bg-slate-50 dark:hover:bg-dark-850 transition-all group"
                >
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    <ChevronLeft className="h-3 w-3" /> Previous Page
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                    {prevPage.title}
                  </span>
                </Link>
              ) : <div />}

              {nextPage && (
                <Link
                  href={nextPage.href}
                  className="flex flex-col items-end p-4 rounded-xl border border-slate-200 dark:border-white/10 hover:border-brand-500/50 bg-white dark:bg-dark-900/60 hover:bg-slate-50 dark:hover:bg-dark-850 transition-all group text-right"
                >
                  <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1 mb-1">
                    Next Page <ChevronRight className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                    {nextPage.title}
                  </span>
                </Link>
              )}
            </div>
          </div>
        </main>

        {/* Right Sticky Table of Contents (Desktop) */}
        {toc.length > 0 && (
          <aside className="hidden xl:block w-60 shrink-0 py-8 pl-6 border-l border-slate-200/80 dark:border-white/10">
            <div className="sticky top-24 space-y-4 max-h-[calc(100vh-7rem)] overflow-y-auto">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                On This Page
              </h4>
              <ul className="space-y-2 text-xs">
                {toc.map((item, idx) => (
                  <li key={idx} className={item.depth === 3 ? 'pl-3' : ''}>
                    <a
                      href={`#${item.id}`}
                      className="text-slate-600 dark:text-slate-400 hover:text-brand-500 transition-colors block py-0.5"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-200 dark:border-white/10 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                <a
                  href="https://github.com/omkarbhosale-dev/omkarbhosale-upiqr"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://omkarbhosale.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Developer Portfolio</span>
                </a>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-white/10 bg-white dark:bg-dark-950 py-8 px-4 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="mx-auto w-full max-w-[96rem] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            @omkarbhosale/upiqr • Open Source under <strong>ISC License</strong>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:underline">Documentation</Link>
            <a href="https://www.npmjs.com/package/@omkarbhosale/upiqr" target="_blank" rel="noreferrer" className="hover:underline">npm</a>
            <a href="https://github.com/omkarbhosale-dev/omkarbhosale-upiqr" target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
            <a href="https://omkarbhosale.dev" target="_blank" rel="noreferrer" className="hover:underline">Author</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
