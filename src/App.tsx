/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import MarqueeTicker from './components/MarqueeTicker';
import AboutUs from './components/AboutUs';
import PropertyExplorer from './components/PropertyExplorer';
import InteractiveTour from './components/InteractiveTour';
import CustomerTestimonials from './components/CustomerTestimonials';
import VisitBooker from './components/VisitBooker';
import GroupConcerns from './components/GroupConcerns';
import PartnershipPortal from './components/PartnershipPortal';
import Footer from './components/Footer';
import PropertyDetailView from './components/PropertyDetailView';
import AdminCMS from './components/AdminCMS';
import HavenTowerSpotlight from './components/HavenTowerSpotlight';

// New Standalone Pages
import AboutUsPage from './components/AboutUsPage';
import PropertiesPage from './components/PropertiesPage';
import LandownerPage from './components/LandownerPage';
import ConstructionStatusPage from './components/ConstructionStatusPage';
import ReferralProgramPage from './components/ReferralProgramPage';
import NrbPage from './components/NrbPage';
import ContactUsPage from './components/ContactUsPage';
import ArshiHaiderPage from './components/ArshiHaiderPage';
import GroupConcernsPage from './components/GroupConcernsPage';

import { Property } from './types';
import { properties as defaultProperties } from './data/properties';
import { saveAllPropertiesToLocalStorage, saveAllSlidesToLocalStorage } from './lib/indexedDbStorage';
import { resetQuotaExceededFlag } from './lib/firebase';
import {
  seedCMSDatabaseIfNeeded,
  getCMSProperties,
  getCMSAboutUs,
  getCMSGroupConcerns,
  getCMSHeroSlides,
  getCMSSiteSettings,
  defaultHeroSlides,
  CMSAboutUs,
  CMSHeroSlide,
  CMSGroupConcern,
  CMSSiteSettings
} from './lib/cms';
import { ThemeProvider, useTheme, WireframePerspective, SkylineSilhouette } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { initAuth } from './lib/driveUpload';

// Helper to strip Bengali (Bangla) characters and brackets/parentheses containing Bengali to maintain clean English-only typography
const cleanToEnglish = (text: string | undefined | null): string => {
  if (!text) return '';
  
  // 1. Remove brackets/parentheses that contain Bengali characters, e.g., "Al Mizan (আল মিজান)" -> "Al Mizan"
  let cleaned = text.replace(/\s*[\(\[\{][^\)\}\]]*[\u0980-\u09FF]+[^\)\}\]]*[\)\]\}]/g, '');
  
  // 2. Remove any remaining Bengali characters themselves
  cleaned = cleaned.replace(/[\u0980-\u09FF]+/g, '');
  
  // 3. Remove leading/isolated colons, question marks, exclamation marks, or stray parentheses/dashes
  cleaned = cleaned
    .replace(/(^|\s)[\:\-\!\?]+(\s|$)/g, ' ')
    .replace(/\(\s*\)/g, '')
    .replace(/\[\s*\]/g, '');

  // 4. Clean up excessive spaces, leading/trailing spaces, and trailing dashes/punctuation
  cleaned = cleaned.trim()
    .replace(/\s+/g, ' ')
    .replace(/^[:\-\s\+]+/, '') // Leading punctuation
    .replace(/[:\-\s\+]+$/, '') // Trailing punctuation
    .trim();
    
  return cleaned;
};

// Helper to provide an elegant default English description if the original description is mainly in Bengali or broken
const cleanDescription = (title: string, location: string, type: string, rawDesc: string | undefined | null): string => {
  const cleanedTitle = cleanToEnglish(title);
  const cleanedLoc = cleanToEnglish(location);
  const cleanDesc = cleanToEnglish(rawDesc);
  const isMainlyBengali = rawDesc ? /[\u0980-\u09FF]/.test(rawDesc) : true;
  
  if (isMainlyBengali || cleanDesc.length < 15) {
    const typeStr = type === 'commercial' ? 'state-of-the-art commercial plaza' : 'luxurious residential development';
    return `${cleanedTitle} is a premier, ${typeStr} developed by Moon Group of Industries Ltd., strategically situated in ${cleanedLoc || 'Dhaka, Bangladesh'}, showcasing modern architectural design and elite features.`;
  }
  return cleanDesc;
};

function AppInner() {
  useEffect(() => {
    initAuth();
  }, []);
  // Support custom clean routing and initial path resolution on load (like /admin, /cms, etc.)
  const getInitialView = () => {
    const rawPath = window.location.pathname.toLowerCase();
    // Normalize path by stripping trailing slash unless it is just "/"
    const path = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

    if (path === '/admin' || path === '/cms') return 'admin';
    if (path === '/about') return 'about';
    if (path === '/properties') return 'properties';
    if (path === '/landowner') return 'landowner';
    if (path === '/construction') return 'construction';
    if (path === '/referral') return 'referral';
    if (path === '/nrb') return 'nrb';
    if (path === '/contact') return 'contact';
    if (path === '/arshi') return 'arshi';
    if (path === '/group') return 'group';
    return 'home';
  };

  const [currentView, setCurrentView] = useState<
    'home' | 'about' | 'properties' | 'landowner' | 'construction' | 'referral' | 'nrb' | 'contact' | 'arshi' | 'property-detail' | 'admin' | 'group'
  >(getInitialView());

  // Listen for browser navigation (back/forward keys)
  useEffect(() => {
    const handlePopState = () => {
      const rawPath = window.location.pathname.toLowerCase();
      const currentPath = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

      if (currentPath === '/admin' || currentPath === '/cms') {
        setCurrentView('admin');
      } else if (currentPath === '/about') {
        setCurrentView('about');
      } else if (currentPath === '/properties') {
        setCurrentView('properties');
      } else if (currentPath === '/landowner') {
        setCurrentView('landowner');
      } else if (currentPath === '/construction') {
        setCurrentView('construction');
      } else if (currentPath === '/referral') {
        setCurrentView('referral');
      } else if (currentPath === '/nrb') {
        setCurrentView('nrb');
      } else if (currentPath === '/contact') {
        setCurrentView('contact');
      } else if (currentPath === '/arshi') {
        setCurrentView('arshi');
      } else if (currentPath === '/group') {
        setCurrentView('group');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize browser URL with currentView state changes
  useEffect(() => {
    const rawPath = window.location.pathname.toLowerCase();
    const currentPath = rawPath.endsWith('/') && rawPath.length > 1 ? rawPath.slice(0, -1) : rawPath;

    let expectedPath = '/';
    if (currentView === 'admin') expectedPath = '/admin';
    else if (currentView === 'about') expectedPath = '/about';
    else if (currentView === 'properties') expectedPath = '/properties';
    else if (currentView === 'landowner') expectedPath = '/landowner';
    else if (currentView === 'construction') expectedPath = '/construction';
    else if (currentView === 'referral') expectedPath = '/referral';
    else if (currentView === 'nrb') expectedPath = '/nrb';
    else if (currentView === 'contact') expectedPath = '/contact';
    else if (currentView === 'arshi') expectedPath = '/arshi';
    else if (currentView === 'group') expectedPath = '/group';

    // Update URL if it does not match (unless it is already /cms pointing to admin)
    if (currentPath !== expectedPath && !(currentView === 'admin' && (currentPath === '/cms' || currentPath === '/cms/'))) {
      window.history.pushState({}, '', expectedPath);
    }
  }, [currentView]);

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [searchFilters, setSearchFilters] = useState<{ type: string; status: string; area: string } | null>(null);
  const [preSelectedPropertyForBooking, setPreSelectedPropertyForBooking] = useState<Property | null>(null);

  const getInitialProperties = (): Property[] => {
    try {
      const saved = localStorage.getItem('moon_properties_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return defaultProperties;
  };

  const getInitialSlides = (): CMSHeroSlide[] => {
    try {
      const saved = localStorage.getItem('moon_slides_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return defaultHeroSlides;
  };

  const getInitialAbout = (): CMSAboutUs | null => {
    try {
      const saved = localStorage.getItem('moon_about_cache');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  const getInitialConcerns = (): CMSGroupConcern[] => {
    try {
      const saved = localStorage.getItem('moon_concerns_cache');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  };

  const getInitialSettings = (): CMSSiteSettings | null => {
    try {
      const saved = localStorage.getItem('moon_settings_cache');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  // Dynamic CMS content states
  const [propertiesList, setPropertiesList] = useState<Property[]>(getInitialProperties);
  const [heroSlides, setHeroSlides] = useState<CMSHeroSlide[]>(getInitialSlides);
  const [aboutUsData, setAboutUsData] = useState<CMSAboutUs | null>(getInitialAbout);
  const [groupConcerns, setGroupConcerns] = useState<CMSGroupConcern[]>(getInitialConcerns);
  const [siteSettings, setSiteSettings] = useState<CMSSiteSettings | null>(getInitialSettings);

  // Seed and load dynamic CMS database
  useEffect(() => {
    const initializeCMS = async () => {
      // Clear transient quota flag to ensure live synchronization with Firestore
      resetQuotaExceededFlag();

      // Seed data asynchronously in background if empty
      seedCMSDatabaseIfNeeded().catch(e => console.warn('Seed notice:', e));
      
      // Load all dynamic content
      try {
        const [props, slides, about, concerns, settings] = await Promise.all([
          getCMSProperties(),
          getCMSHeroSlides(),
          getCMSAboutUs(),
          getCMSGroupConcerns(),
          getCMSSiteSettings()
        ]);

        if (props) {
          saveAllPropertiesToLocalStorage(props);
        }
        if (slides) {
          saveAllSlidesToLocalStorage(slides);
        }

        setPropertiesList(props);
        setHeroSlides(slides);
        setAboutUsData(about);
        setGroupConcerns(concerns);
        setSiteSettings(settings);
      } catch (error) {
        console.warn('Could not load dynamic CMS content. Using fallback statics.', error);
      }
    };

    initializeCMS();

    const handleCMSUpdate = () => {
      initializeCMS();
    };

    window.addEventListener('cms_updated', handleCMSUpdate);
    return () => window.removeEventListener('cms_updated', handleCMSUpdate);
  }, [currentView]); // Re-fetch on view changes to ensure live updates from Admin

  // Smooth Scroll Navigation / Page Switching Router
  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId === 'hero' || sectionId === 'top') {
      setCurrentView('home');
    } else if (sectionId === 'legacy' || sectionId === 'about') {
      setCurrentView('about');
    } else if (sectionId === 'properties') {
      setCurrentView('properties');
    } else if (sectionId === 'partnership' || sectionId === 'landowner') {
      setCurrentView('landowner');
    } else if (sectionId === 'construction') {
      setCurrentView('construction');
    } else if (sectionId === 'referral') {
      setCurrentView('referral');
    } else if (sectionId === 'nrb') {
      setCurrentView('nrb');
    } else if (sectionId === 'contact') {
      setCurrentView('contact');
    } else if (sectionId === 'arshi') {
      setCurrentView('arshi');
    } else if (sectionId === 'verticals' || sectionId === 'group') {
      setCurrentView('group');
    } else if (sectionId === 'visit-booker') {
      setCurrentView('home');
      setTimeout(() => {
        scrollToSection('visit-booker');
      }, 150);
    }
  };

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'hero' || sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scrollspy to update active header indicators automatically
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScrollSpy = () => {
      const sections = ['hero', 'properties', 'interactive-tour', 'visit-booker', 'verticals', 'partnership'];
      const scrollPosition = window.scrollY + 120; // adding threshold buffer for top sticky header

      for (const sectionId of sections) {
        if (sectionId === 'hero' && window.scrollY < 300) {
          setActiveSection('hero');
          break;
        }

        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [currentView]);

  // Handle Search submit from Hero finder
  const handleSearchProperties = (filters: { type: string; status: string; area: string }) => {
    setSearchFilters(filters);
    handleNavigation('properties');
  };

  // Callback to link property Details Modal to the Site Booker Scheduler
  const handleSelectPropertyForBooking = (property: Property) => {
    setPreSelectedPropertyForBooking(property);
  };

  // Dedicated Detail view navigation (pop up hobe na!)
  const handleOpenPropertyDetail = (property: Property) => {
    setSelectedProperty(property);
    setCurrentView('property-detail');
  };

  const handleOpenPropertyDetailById = (propertyId: string) => {
    const prop = propertiesList.find(p => p.id === propertyId) || propertiesList[0];
    if (prop) {
      setSelectedProperty(prop);
      setCurrentView('property-detail');
    }
  };

  const handleBookTourFromDetail = (property: Property) => {
    handleSelectPropertyForBooking(property);
    setCurrentView('home');
    setTimeout(() => {
      scrollToSection('visit-booker');
    }, 150);
  };

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Dynamically map all properties/projects to hero slides so that all projects' images are present in the hero slider
  const projectSlides: CMSHeroSlide[] = propertiesList.length > 0
    ? propertiesList.map(p => ({
        id: p.id,
        title: p.title,
        type: p.type,
        status: p.status,
        description: p.description || `${p.title} is an architectural masterpiece of Moon Group of Industries Ltd.`,
        imageUrl: p.imageUrl,
        imageFit: p.imageFit || 'cover',
        imagePosition: p.imagePosition || 'center',
        tag: `${(p.status || 'ongoing').replace('-', ' ').toUpperCase()} PROJECT`,
        price: p.priceRange || 'Price on Request',
        location: p.location || p.area || 'Dhaka, Bangladesh',
        stats: {
          beds: p.beds ? `${p.beds} Beds` : undefined,
          baths: p.baths ? `${p.baths} Baths` : undefined,
          levels: p.floorsCount ? `${p.floorsCount} Floors` : undefined,
          size: p.sizeRange || 'N/A'
        }
      }))
    : heroSlides;

  // Render proper views
  if (currentView === 'admin') {
    return <AdminCMS onBackToSite={() => setCurrentView('home')} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 antialiased overflow-x-hidden flex flex-col justify-between relative ${
      isDark 
        ? 'bg-[#0B0B0C] text-slate-300 selection:bg-[#FF4A4F] selection:text-black' 
        : 'bg-[#FAF6EE] text-[#2B251F] selection:bg-[#FF4A4F] selection:text-white'
    }`}>
      {/* Elegant, architecturally inspired skyscraper background watermarks for white cream mode */}
      {!isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Wireframe Perspective (First Image Style) */}
          <div className="absolute right-[-80px] top-[150px] w-[480px] h-[480px] opacity-12">
            <WireframePerspective />
          </div>
          {/* Skyline Silhouette (Second Image Style) */}
          <div className="absolute left-0 top-[1400px] w-full max-w-[1100px] h-[280px] opacity-12">
            <SkylineSilhouette />
          </div>
          {/* Wireframe Perspective on the Left Side of Project Section */}
          <div className="absolute left-[-100px] top-[2600px] w-[450px] h-[450px] opacity-[0.08] -rotate-6">
            <WireframePerspective />
          </div>
          {/* Skyline Silhouette behind the Testimonials and Interactive Configurator */}
          <div className="absolute right-[-150px] top-[3800px] w-full max-w-[1000px] h-[260px] opacity-[0.08]">
            <SkylineSilhouette />
          </div>
          {/* Wireframe Perspective behind Partnership Section */}
          <div className="absolute right-[-50px] top-[5000px] w-[500px] h-[500px] opacity-10">
            <WireframePerspective />
          </div>
        </div>
      )}

      {/* Premium custom background images for Dark mode using the user's uploaded architectural blueprints */}
      {isDark && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
          {/* Architectural Draft 1 (Skyscraper schematic) */}
          <div className="absolute right-[-100px] top-[180px] w-[600px] h-[600px] opacity-[0.045] mix-blend-screen">
            <img 
              src="https://lh3.googleusercontent.com/d/1zZvNF4bXnaiJGhNxm3YjhZ8c8Z2Mc4l5" 
              alt="Architectural Blueprint Background" 
              className="w-full h-full object-contain filter invert brightness-125"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Architectural Draft 2 (Line Draft) */}
          <div className="absolute left-[-150px] top-[1500px] w-[700px] h-[700px] opacity-[0.035] mix-blend-screen">
            <img 
              src="https://lh3.googleusercontent.com/d/1sKHs_h83-a2v7ELfv3m_sVbM529NOBMd" 
              alt="Structural Line Draft" 
              className="w-full h-full object-contain filter invert brightness-110"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Architectural Draft 3 (Detail Sketch) */}
          <div className="absolute right-[-120px] top-[3200px] w-[650px] h-[650px] opacity-[0.045] mix-blend-screen">
            <img 
              src="https://lh3.googleusercontent.com/d/1hJS7jjTsKMEWK2Ki6PBHWGbRzKQGLeda" 
              alt="Building Sketch Blueprint" 
              className="w-full h-full object-contain filter invert brightness-125"
              referrerPolicy="no-referrer"
            />
          </div>
          {/* Additional Blueprint repeats to cover the long page gracefully */}
          <div className="absolute left-[-100px] top-[4800px] w-[600px] h-[600px] opacity-[0.035] mix-blend-screen">
            <img 
              src="https://lh3.googleusercontent.com/d/1zZvNF4bXnaiJGhNxm3YjhZ8c8Z2Mc4l5" 
              alt="Architectural Grid Blueprint" 
              className="w-full h-full object-contain filter invert"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute right-[-100px] top-[6000px] w-[600px] h-[600px] opacity-[0.035] mix-blend-screen">
            <img 
              src="https://lh3.googleusercontent.com/d/1sKHs_h83-a2v7ELfv3m_sVbM529NOBMd" 
              alt="Structural Line Draft" 
              className="w-full h-full object-contain filter invert"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      <div className="relative z-10">
        {/* Floating Translucent Header Navigation */}
        <Header onNavigate={handleNavigation} activeSection={activeSection} siteSettings={siteSettings} />

        {/* Dynamic page contents */}
        {currentView === 'home' && (
          <main>
            {/* Full-Screen Interactive Hero Presentation with Search Overlay */}
            <section id="hero">
              <HeroSlider
                slidesList={heroSlides}
                onSearchProperties={handleSearchProperties}
                onExploreProperties={() => handleNavigation('properties')}
              />
            </section>

            {/* Endless scrolling marquee ticker */}
            <MarqueeTicker siteSettings={siteSettings} />

            {/* Haven Tower Main Attraction Spotlight Showcase */}
            <HavenTowerSpotlight
              havenProperty={propertiesList.find(p => p.id === 'haven-tower')}
              siteSettings={siteSettings}
              onSelectProperty={(id) => handleOpenPropertyDetailById(id)}
              onOpenBookingModal={() => {
                const havenProp = propertiesList.find(p => p.id === 'haven-tower') || propertiesList[0];
                handleSelectPropertyForBooking(havenProp);
                scrollToSection('visit-booker');
              }}
              showBanner={siteSettings?.showHavenTowerBanner !== false}
            />

            {/* Brand Legacy Strength (About Us section detailing structural safety) */}
            <AboutUs aboutData={aboutUsData} />

            {/* Featured Projects Grid Gallery */}
            <PropertyExplorer
              propertiesList={propertiesList}
              searchFilters={searchFilters}
              onSelectPropertyForBooking={handleSelectPropertyForBooking}
              onNavigateToBooking={() => handleNavigation('visit-booker')}
              onSelectPropertyDetail={handleOpenPropertyDetail}
            />

            {/* Customer Testimonial Slider requested above Virtual Layout Configurator */}
            <CustomerTestimonials />

            {/* Virtual Layout schematic 2D configurator (Toggleable from Admin Panel) */}
            {siteSettings?.showVirtualConfigurator !== false && (
              <InteractiveTour propertiesList={propertiesList} siteSettings={siteSettings} />
            )}

            {/* Guided Scheduler Walkthrough with Ticket Generator Pass */}
            <VisitBooker
              preSelectedProperty={preSelectedPropertyForBooking}
              onClearPreSelected={() => setPreSelectedPropertyForBooking(null)}
              propertiesList={propertiesList}
            />

            {/* Sister Concerns / Verticals section */}
            <GroupConcerns concernsList={groupConcerns} />
          </main>
        )}

        {currentView === 'about' && (
          <AboutUsPage onNavigateToContact={() => handleNavigation('contact')} />
        )}

        {currentView === 'properties' && (
          <PropertiesPage
            propertiesList={propertiesList}
            siteSettings={siteSettings}
            onSelectPropertyDetail={handleOpenPropertyDetail}
            onSelectPropertyForBooking={handleSelectPropertyForBooking}
            onNavigateToBooking={() => handleNavigation('visit-booker')}
          />
        )}

        {currentView === 'landowner' && (
          <LandownerPage />
        )}

        {currentView === 'construction' && (
          <ConstructionStatusPage />
        )}

        {currentView === 'referral' && (
          <ReferralProgramPage />
        )}

        {currentView === 'nrb' && (
          <NrbPage />
        )}

        {currentView === 'contact' && (
          <ContactUsPage />
        )}

        {currentView === 'arshi' && (
          <ArshiHaiderPage onNavigateToContact={() => handleNavigation('contact')} />
        )}

        {currentView === 'group' && (
          <GroupConcernsPage
            onNavigateHome={() => handleNavigation('hero')}
            onNavigateToContact={() => handleNavigation('contact')}
            concernsList={groupConcerns}
          />
        )}

        {currentView === 'property-detail' && selectedProperty && (
          <div className="pt-[80px]">
            <PropertyDetailView
              property={selectedProperty}
              onBack={() => setCurrentView('properties')}
              onBookTour={handleBookTourFromDetail}
            />
          </div>
        )}
      </div>

      {/* Premium Trust Accreditations and Legal Footer Info */}
      <Footer onOpenAdmin={() => setCurrentView('admin')} siteSettings={siteSettings} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppInner />
      </LanguageProvider>
    </ThemeProvider>
  );
}
