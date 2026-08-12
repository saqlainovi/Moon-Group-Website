/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Default to dark theme for Moon Builders, as requested
    const savedTheme = localStorage.getItem('moon_builders_theme');
    return (savedTheme as Theme) || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('moon_builders_theme', theme);
    // Add theme class to document body to allow styling on body level if needed
    const body = document.body;
    if (theme === 'light') {
      body.classList.remove('theme-dark', 'bg-[#0b0b0c]', 'text-[#f1f0ee]');
      body.classList.add('theme-light', 'bg-[#FAF6EE]', 'text-[#2B251F]');
    } else {
      body.classList.remove('theme-light', 'bg-[#FAF6EE]', 'text-[#2B251F]');
      body.classList.add('theme-dark', 'bg-[#0b0b0c]', 'text-[#f1f0ee]');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

/**
 * 3D Perspective architectural building wireframe (First image style)
 */
export function WireframePerspective({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const strokeColor = theme === 'light' ? 'rgba(43, 37, 31, 0.12)' : 'rgba(255, 74, 79, 0.08)';
  
  return (
    <svg 
      viewBox="0 0 600 600" 
      className={`w-full h-full fill-none transition-colors duration-500 ${className}`} 
      stroke={strokeColor}
      strokeWidth="0.85"
    >
      {/* Left building in upward 3D perspective */}
      <path d="M 50,550 L 50,280 L 190,190 L 190,480 Z" />
      <path d="M 190,190 L 260,225 L 260,500 L 190,480 Z" />
      <path d="M 50,280 L 190,350 L 260,375" />
      
      {/* Floor lines for left building */}
      <line x1="50" y1="320" x2="190" y2="390" />
      <line x1="50" y1="360" x2="190" y2="430" />
      <line x1="50" y1="400" x2="190" y2="470" />
      <line x1="50" y1="440" x2="190" y2="510" />
      <line x1="50" y1="480" x2="190" y2="550" />
      
      {/* Vertical grid/columns left building */}
      <line x1="95" y1="250" x2="95" y2="500" />
      <line x1="140" y1="220" x2="140" y2="520" />
      <line x1="215" y1="205" x2="215" y2="490" />
      <line x1="240" y1="215" x2="240" y2="495" />
      
      {/* Right tall skyscraper in dramatic upward 3D perspective */}
      <path d="M 310,550 L 310,130 L 460,60 L 460,460 Z" />
      <path d="M 460,60 L 530,90 L 530,480 L 460,460 Z" />
      
      {/* Horizontal floor perspective lines for right skyscraper */}
      <line x1="310" y1="160" x2="460" y2="90" />
      <line x1="310" y1="190" x2="460" y2="120" />
      <line x1="310" y1="220" x2="460" y2="150" />
      <line x1="310" y1="250" x2="460" y2="180" />
      <line x1="310" y1="280" x2="460" y2="210" />
      <line x1="310" y1="310" x2="460" y2="240" />
      <line x1="310" y1="340" x2="460" y2="270" />
      <line x1="310" y1="370" x2="460" y2="300" />
      <line x1="310" y1="400" x2="460" y2="330" />
      <line x1="310" y1="430" x2="460" y2="360" />
      <line x1="310" y1="460" x2="460" y2="390" />
      <line x1="310" y1="490" x2="460" y2="420" />
      <line x1="310" y1="520" x2="460" y2="450" />
      
      {/* Vertical columns for right building */}
      <line x1="345" y1="113" x2="345" y2="530" />
      <line x1="385" y1="95" x2="385" y2="510" />
      <line x1="425" y1="77" x2="425" y2="490" />
      
      {/* Side columns of right building */}
      <line x1="480" y1="69" x2="480" y2="465" />
      <line x1="505" y1="80" x2="505" y2="473" />
      
      {/* Side floor lines */}
      <line x1="460" y1="90" x2="530" y2="120" />
      <line x1="460" y1="120" x2="530" y2="150" />
      <line x1="460" y1="150" x2="530" y2="180" />
      <line x1="460" y1="180" x2="530" y2="210" />
      <line x1="460" y1="210" x2="530" y2="240" />
      <line x1="460" y1="240" x2="530" y2="270" />
      <line x1="460" y1="270" x2="530" y2="300" />
      <line x1="460" y1="300" x2="530" y2="330" />
      <line x1="460" y1="330" x2="530" y2="360" />
      <line x1="460" y1="360" x2="530" y2="390" />
      <line x1="460" y1="390" x2="530" y2="420" />
      <line x1="460" y1="420" x2="530" y2="450" />
      <line x1="460" y1="450" x2="530" y2="480" />
    </svg>
  );
}

/**
 * Modern skyline silhouettes with dotted grid window patterns (Second image style)
 */
export function SkylineSilhouette({ className = '' }: { className?: string }) {
  const { theme } = useTheme();
  const strokeColor = theme === 'light' ? 'rgba(43, 37, 31, 0.15)' : 'rgba(255, 255, 255, 0.05)';
  
  return (
    <svg 
      viewBox="0 0 1000 400" 
      className={`w-full h-full fill-none transition-colors duration-500 ${className}`} 
      stroke={strokeColor}
      strokeWidth="0.85"
    >
      {/* Tower 1 - Straight modern outline with vertical window lines */}
      <rect x="50" y="120" width="85" height="280" />
      <line x1="72" y1="140" x2="72" y2="380" strokeDasharray="3,3" />
      <line x1="92" y1="140" x2="92" y2="380" strokeDasharray="3,3" />
      <line x1="112" y1="140" x2="112" y2="380" strokeDasharray="3,3" />
      
      {/* Tower 2 - Tall tower with technical grid windows */}
      <rect x="160" y="60" width="110" height="340" />
      <line x1="182" y1="80" x2="182" y2="380" strokeDasharray="2,4" />
      <line x1="202" y1="80" x2="202" y2="380" strokeDasharray="2,4" />
      <line x1="222" y1="80" x2="222" y2="380" strokeDasharray="2,4" />
      <line x1="242" y1="80" x2="242" y2="380" strokeDasharray="2,4" />

      {/* Tower 3 - Sloped skyscraper */}
      <path d="M 290,400 L 290,190 L 340,150 L 340,400" />
      <line x1="305" y1="200" x2="305" y2="380" strokeDasharray="4,4" />
      <line x1="325" y1="200" x2="325" y2="380" strokeDasharray="4,4" />

      {/* Tower 4 - Small complex with horizontal segments */}
      <rect x="360" y="140" width="80" height="260" />
      <line x1="380" y1="160" x2="380" y2="380" strokeDasharray="1,2" />
      <line x1="400" y1="160" x2="400" y2="380" strokeDasharray="1,2" />
      <line x1="420" y1="160" x2="420" y2="380" strokeDasharray="1,2" />

      {/* Tower 5 - Stepped block skyscraper */}
      <path d="M 460,400 L 460,230 L 485,230 L 485,160 L 510,160 L 510,90 L 545,90 L 545,400" />
      <line x1="480" y1="240" x2="480" y2="380" strokeDasharray="2,2" />
      <line x1="505" y1="170" x2="505" y2="380" strokeDasharray="2,2" />
      <line x1="525" y1="100" x2="525" y2="380" strokeDasharray="2,2" />

      {/* Tower 6 - Double block */}
      <rect x="565" y="170" width="95" height="230" />
      <line x1="585" y1="190" x2="585" y2="380" strokeDasharray="3,3" />
      <line x1="610" y1="190" x2="610" y2="380" strokeDasharray="3,3" />
      <line x1="635" y1="190" x2="635" y2="380" strokeDasharray="3,3" />

      {/* Tower 7 - Tall spire tower */}
      <path d="M 680,400 L 680,130 L 700,50 L 720,130 L 720,400" />
      <line x1="700" y1="70" x2="700" y2="400" />
      <line x1="692" y1="150" x2="692" y2="380" strokeDasharray="2,4" />
      <line x1="708" y1="150" x2="708" y2="380" strokeDasharray="2,4" />

      {/* Tower 8 - Segmented columns */}
      <rect x="740" y="100" width="85" height="300" />
      <line x1="760" y1="120" x2="760" y2="380" strokeDasharray="3,1" />
      <line x1="780" y1="120" x2="780" y2="380" strokeDasharray="3,1" />
      <line x1="800" y1="120" x2="800" y2="380" strokeDasharray="3,1" />

      {/* Tower 9 - Tall simple block */}
      <rect x="845" y="150" width="105" height="250" />
      <line x1="865" y1="170" x2="865" y2="380" strokeDasharray="1,4" />
      <line x1="895" y1="170" x2="895" y2="380" strokeDasharray="1,4" />
      <line x1="925" y1="170" x2="925" y2="380" strokeDasharray="1,4" />

      {/* Tower 10 - End cap */}
      <path d="M 965,400 L 965,210 L 1005,210 L 1005,400" />
      <line x1="980" y1="220" x2="980" y2="380" strokeDasharray="2,2" />
      <line x1="995" y1="220" x2="995" y2="380" strokeDasharray="2,2" />
    </svg>
  );
}
