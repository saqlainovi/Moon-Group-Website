/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function MarqueeTicker({ siteSettings }: { siteSettings?: any }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const havenNoticeBangla = "📢 বিশেষ বিজ্ঞপ্তি: হেভেন টাওয়ার (HEAVEN TOWER) উদ্বোধন হয়েছে - বুকিং ও সেল চলছে! 🏢 ✦";
  const havenNoticeEnglish = "🔥 HEAVEN TOWER INAUGURATED - BOOKING & SALES NOW OPEN! ✦";

  const defaultItems = [
    havenNoticeBangla,
    havenNoticeEnglish,
    "REAL ESTATE ✦",
    "HOUSING ✦",
    "CONSTRUCTION ✦",
    "INTERIORS ✦",
    "COMMERCIAL SPACES ✦",
    "SINCE 1989 ✦",
  ];

  let rawTickerText = siteSettings?.tickerText || '';
  
  let items: string[];
  if (rawTickerText) {
    items = rawTickerText.split('✦').map((t: string) => t.trim()).filter((t: string) => t.length > 0).map((t: string) => t + ' ✦');
    const hasHaven = items.some((item: string) => item.toLowerCase().includes('heaven tower') || item.toLowerCase().includes('haven tower') || item.includes('হেভেন টাওয়ার'));
    if (!hasHaven) {
      items = [havenNoticeBangla, havenNoticeEnglish, ...items];
    }
  } else {
    items = defaultItems;
  }

  // Repeat the array to guarantee smooth seamless visual wrapping
  const repeatedItems = Array(10).fill(items).flat();

  return (
    <div id="marquee-ticker" className="relative w-full overflow-hidden py-3.5 border-t border-b z-10 select-none shadow-md">
      <div className="flex whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="flex gap-4 items-center">
          {repeatedItems.map((text, idx) => {
            const isNotice = text.includes('HEAVEN TOWER') || text.includes('HAVEN TOWER') || text.includes('হেভেন টাওয়ার');
            return (
              <span
                key={idx}
                className={`font-mono text-xs md:text-sm tracking-widest uppercase mx-3 px-3 py-1 rounded-md transition-all inline-flex items-center gap-1.5 ${
                  isNotice
                    ? 'marquee-notice-badge font-black animate-pulse'
                    : 'marquee-standard-text font-black'
                }`}
              >
                {text}
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
