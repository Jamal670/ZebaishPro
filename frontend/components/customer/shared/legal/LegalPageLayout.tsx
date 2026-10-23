import React from 'react';
import Link from 'next/link';

export interface LegalSection {
  id: string;
  title: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface LegalPageLayoutProps {
  badgeIcon: React.ReactNode;
  badgeText: string;
  title: string;
  subtitle: string;
  lastUpdated?: string;
  noticeTitle?: string;
  noticeIcon?: React.ReactNode;
  noticeContent?: React.ReactNode;
  sections: LegalSection[];
  showTableOfContents?: boolean;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  badgeIcon,
  badgeText,
  title,
  subtitle,
  lastUpdated = 'October 2025',
  noticeTitle,
  noticeIcon,
  noticeContent,
  sections,
  showTableOfContents = false,
}) => {
  return (
    <div className="bg-stone-50 min-h-screen text-stone-900 pt-16 sm:pt-20 md:pt-24 pb-20 sm:pb-28 animate-fade-in w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Header Hero Banner */}
        <div className="bg-stone-900 text-white rounded-lg p-8 sm:p-10 mb-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          <div className="inline-flex items-center space-x-2 bg-amber-400/10 text-amber-400 px-3.5 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4 border border-amber-400/20">
            {badgeIcon}
            <span>{badgeText}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-normal tracking-wide font-brand-serif mb-3 text-white uppercase">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed mb-4">
            {subtitle}
          </p>
          {lastUpdated && (
            <div className="inline-block px-3 py-1 bg-stone-800/80 rounded-full text-[11px] font-medium text-amber-300/90 border border-stone-700/60">
              Last updated: {lastUpdated}
            </div>
          )}
        </div>

        {/* Optional Important Notice */}
        {noticeTitle && noticeContent && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-8 text-amber-900 shadow-sm relative overflow-hidden">
            <div className="flex items-start space-x-3 sm:space-x-4">
              {noticeIcon && (
                <div className="p-2 bg-amber-500/20 rounded-md text-amber-700 shrink-0 mt-0.5">
                  {noticeIcon}
                </div>
              )}
              <div className="space-y-2">
                <h2 className="text-base sm:text-lg font-bold text-amber-950 uppercase tracking-wide">
                  {noticeTitle}
                </h2>
                <div className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {noticeContent}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Optional Table of Contents */}
        {showTableOfContents && sections.length > 3 && (
          <nav
            aria-label="Table of contents"
            className="bg-white border border-stone-200 rounded-lg p-5 sm:p-6 mb-8 shadow-2xs"
          >
            <h2 className="text-xs font-bold uppercase tracking-widest text-stone-900 mb-3">
              Table of Contents
            </h2>
            <div className="flex flex-wrap gap-2 text-xs">
              {sections.map((section, idx) => (
                <a
                  key={`toc-${section.id || idx}`}
                  href={`#${section.id}`}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 rounded-xs transition-colors font-medium cursor-pointer"
                >
                  {idx + 1}. {section.title}
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Policy Content Container */}
        <div className="bg-white border border-stone-200 rounded-lg p-6 sm:p-10 shadow-sm space-y-10">
          {sections.map((section, index) => {
            const isLast = index === sections.length - 1;
            return (
              <section
                key={section.id || index}
                id={section.id}
                className={`space-y-3 scroll-mt-24 sm:scroll-mt-28 ${
                  !isLast ? 'pb-8 border-b border-stone-100' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full bg-stone-100 text-stone-900 font-bold text-xs flex items-center justify-center border border-stone-200 shrink-0">
                    {index + 1}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight flex items-center space-x-2">
                    {section.icon && (
                      <span className="text-amber-600 shrink-0">{section.icon}</span>
                    )}
                    <span>{section.title}</span>
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 leading-relaxed sm:pl-11 space-y-3">
                  {section.content}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LegalPageLayout;
