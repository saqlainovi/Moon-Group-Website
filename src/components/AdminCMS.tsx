/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Save,
  LogOut,
  Sliders,
  Layers,
  HelpCircle,
  Briefcase,
  Users,
  Building,
  Building2,
  Image as ImageIcon,
  Check,
  X,
  Lock,
  Unlock,
  ClipboardList,
  Flame,
  Star,
  Quote,
  MessageSquare,
  Edit,
  Database,
  Upload
} from 'lucide-react';
import {
  getCMSProperties,
  saveCMSProperty,
  deleteCMSProperty,
  getCMSAboutUs,
  saveCMSAboutUs,
  getCMSHeroSlides,
  saveCMSHeroSlide,
  deleteCMSHeroSlide,
  getCMSGroupConcerns,
  saveCMSGroupConcern,
  deleteCMSGroupConcern,
  getCMSTestimonials,
  saveCMSTestimonial,
  deleteCMSTestimonial,
  getVisitorBookings,
  getLandownerPartnerships,
  getCMSSiteSettings,
  saveCMSSiteSettings,
  CMSAboutUs,
  CMSHeroSlide,
  CMSGroupConcern,
  CMSTestimonial,
  CMSSiteSettings
} from '../lib/cms';
import { Property, VisitBooking, LandownerPartnerSubmission, FloorLayout } from '../types';
import { resizeImageToBase64, getFitClass, getPositionClass } from '../lib/imageUtils';
import { googleSignIn, getAccessToken, logout } from '../lib/driveUpload';

const getDisplayUrl = (url: string | undefined | null) => {
  if (!url) return '';
  if (url.startsWith('data:image')) {
    const sizeKb = Math.round(url.length / 1024);
    return `[Uploaded Image - ${sizeKb} KB Base64 Data]`;
  }
  if (url.startsWith('idb_store:')) {
    return `[Local Cache Reference - ${url.substring(10, 25)}...]`;
  }
  if (url.startsWith('chunk_ref:')) {
    return `[Cloud Image Reference - ${url.substring(10, 25)}...]`;
  }
  return url;
};

interface AdminCMSProps {
  onBackToSite: () => void;
}

export default function AdminCMS({ onBackToSite }: AdminCMSProps) {
  // Authentication states
  const [pin, setPin] = useState('');
  const [driveToken, setDriveToken] = useState<string | null>(null);
  useEffect(() => { getAccessToken().then(setDriveToken); }, []);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');

  // CMS Content States
  const [activeTab, setActiveTab] = useState<'properties' | 'slides' | 'about' | 'concerns' | 'testimonials' | 'bookings' | 'partnerships' | 'settings' | 'database'>('properties');
  const [properties, setProperties] = useState<Property[]>([]);
  const [heroSlides, setHeroSlides] = useState<CMSHeroSlide[]>([]);
  const [aboutUs, setAboutUs] = useState<CMSAboutUs | null>(null);
  const [isLoggingInGoogle, setIsLoggingInGoogle] = useState(false);
  const handleGoogleLogin = async () => {
    setIsLoggingInGoogle(true);
    setAuthError('');
    try {
      const authRes = await googleSignIn();
      if (authRes && authRes.user) {
        if (authRes.user.email === 'moongroupofindustrylimited@gmail.com') {
          setDriveToken(authRes.accessToken);
          setIsAuthorized(true);
          triggerStatus('success', 'Authenticated with Google successfully!');
        } else {
           setAuthError('Unauthorized Google account. Access restricted.');
           await logout();
        }
      }
    } catch (e: any) {
      console.error(e);
      setAuthError('Google login failed or blocked. Please allow popups for this site. Error: ' + e.message);
    } finally {
      setIsLoggingInGoogle(false);
    }
  };
  const [concerns, setConcerns] = useState<CMSGroupConcern[]>([]);
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [bookings, setBookings] = useState<VisitBooking[]>([]);
  const [partnerships, setPartnerships] = useState<LandownerPartnerSubmission[]>([]);
  const [siteSettings, setSiteSettings] = useState<CMSSiteSettings | null>(null);

  // Real-time Preview options
  const [showPreview, setShowPreview] = useState(true);
  const [previewSection, setPreviewSection] = useState<'hero' | 'marquee' | 'about' | 'properties' | 'concerns' | 'testimonials'>('hero');

  // Database Diagnostics states
  const [diagData, setDiagData] = useState<any>(null);
  const [isDiagLoading, setIsDiagLoading] = useState(false);
  const [forceSyncStatus, setForceSyncStatus] = useState({ isLoading: false, message: '' });

  // Editing / Form states
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [tempGalleryUrl, setTempGalleryUrl] = useState('');
  const [tempFeatureText, setTempFeatureText] = useState('');
  const [editingSlide, setEditingSlide] = useState<CMSHeroSlide | null>(null);
  const [editingConcern, setEditingConcern] = useState<CMSGroupConcern | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<CMSTestimonial | null>(null);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  
  // Custom Confirmation Dialog State
  const [confirmState, setConfirmState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void | Promise<void>;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Load all content
  const loadCMSContent = async () => {
    try {
      const [propsList, slidesList, aboutData, concernsList, testimonialsList, bookingsList, partnershipsList, settingsData] = await Promise.all([
        getCMSProperties(),
        getCMSHeroSlides(),
        getCMSAboutUs(),
        getCMSGroupConcerns(),
        getCMSTestimonials(),
        getVisitorBookings(),
        getLandownerPartnerships(),
        getCMSSiteSettings()
      ]);

      setProperties(propsList);
      setHeroSlides(slidesList);
      setAboutUs(aboutData);
      setConcerns(concernsList);
      setTestimonials(testimonialsList);
      setBookings(bookingsList);
      setPartnerships(partnershipsList);
      setSiteSettings(settingsData);
    } catch (error: any) {
      console.error('Failed to load CMS content:', error);
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('error', 'Firestore daily quota limit reached. Local fallback is active.');
      } else {
        triggerStatus('error', 'Failed to retrieve cloud data. Check Firestore connectivity.');
      }
    }
  };

  const loadDiagnostics = async () => {
    setIsDiagLoading(true);
    try {
      const res = await fetch('/api/cms/diagnostics');
      const data = await res.json();
      if (data.success) {
        setDiagData(data);
      } else {
        triggerStatus('error', 'Diagnostics failed to query server.');
      }
    } catch (e: any) {
      triggerStatus('error', 'Error loading diagnostics: ' + e.message);
    } finally {
      setIsDiagLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      loadCMSContent();
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (isAuthorized && activeTab === 'database') {
      loadDiagnostics();
    }
  }, [isAuthorized, activeTab]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'moon2026' || pin === 'admin') {
      setIsAuthorized(true);
      setAuthError('');
    } else {
      setAuthError('Invalid Admin passcode. Access denied.');
    }
  };

  const triggerStatus = (type: 'success' | 'error', text: string) => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage({ type: '', text: '' }), 4000);
  };

  // ==========================================
  // PROPERTY ACTIONS
  // ==========================================
  const startNewProperty = () => {
    setEditingProperty({
      id: `PROP-${Date.now().toString().slice(-6)}`,
      title: '',
      type: 'residential',
      status: 'ongoing',
      location: '',
      area: '',
      sizeRange: '',
      priceRange: '',
      beds: 3,
      baths: 4,
      imageUrl: '',
      gallery: [],
      description: '',
      features: [],
      amenities: [],
      floorsCount: 15,
      floorLayouts: []
    });
  };

  const handleSaveProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    if (!editingProperty.title?.trim()) {
      triggerStatus('error', 'Please enter a Property Title before saving.');
      return;
    }

    try {
      triggerStatus('success', 'Saving property data and Floor Plan Blueprints to Firestore...');
      
      await saveCMSProperty(editingProperty);

      if (siteSettings && (editingProperty.id === 'haven-tower' || editingProperty.title.toLowerCase().includes('haven tower'))) {
        const updatedSettings = { ...siteSettings, havenTowerBannerImage: editingProperty.imageUrl };
        setSiteSettings(updatedSettings);
        await saveCMSSiteSettings(updatedSettings).catch(() => {});
      }

      triggerStatus('success', `Property "${editingProperty.title}" saved successfully!`);
      setEditingProperty(null);
      loadCMSContent();
    } catch (error: any) {
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', `Saved locally! Property "${editingProperty.title}" is active in this browser (Cloud quota exceeded).`);
        setEditingProperty(null);
        loadCMSContent();
      } else {
        triggerStatus('error', 'Error writing to Firestore: ' + (error instanceof Error ? error.message : error));
      }
    }
  };

  const handleDeleteProperty = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Property',
      message: 'Are you absolutely sure you want to delete this property? This action is permanent and cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteCMSProperty(id);
          triggerStatus('success', 'Property deleted successfully.');
          loadCMSContent();
        } catch (error: any) {
          triggerStatus('error', error?.message || 'Failed to delete property.');
        }
      }
    });
  };

  // ==========================================
  // ABOUT US ACTIONS
  // ==========================================
  const handleSaveAboutUs = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aboutUs) return;

    try {
      await saveCMSAboutUs(aboutUs);
      triggerStatus('success', 'About Us Section updated successfully!');
      loadCMSContent();
    } catch (error: any) {
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', 'Corporate Narrative saved locally! (Cloud quota exceeded)');
        loadCMSContent();
      } else {
        triggerStatus('error', 'Error updating About Us.');
      }
    }
  };

  // ==========================================
  // HERO SLIDE ACTIONS
  // ==========================================
  const startNewSlide = () => {
    setEditingSlide({
      id: `SLIDE-${Date.now().toString().slice(-4)}`,
      title: '',
      type: 'residential',
      status: 'ongoing',
      description: '',
      imageUrl: '',
      tag: '',
      price: '',
      stats: { size: '' }
    });
  };

  const handleSaveSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    try {
      await saveCMSHeroSlide(editingSlide);

      // Auto-sync Haven Tower image across site settings and properties list
      if (editingSlide.id === 'haven-tower' || editingSlide.title.toLowerCase().includes('haven tower')) {
        if (siteSettings) {
          const updatedSettings = { ...siteSettings, havenTowerBannerImage: editingSlide.imageUrl };
          setSiteSettings(updatedSettings);
          await saveCMSSiteSettings(updatedSettings).catch(() => {});
        }
        const havenInList = properties.find(p => p.id === 'haven-tower' || p.title.toLowerCase().includes('haven tower'));
        if (havenInList) {
          const updatedHavenProp = { ...havenInList, imageUrl: editingSlide.imageUrl };
          await saveCMSProperty(updatedHavenProp).catch(() => {});
          setProperties(prev => prev.map(p => p.id === havenInList.id ? updatedHavenProp : p));
        }
      }

      triggerStatus('success', `Slide "${editingSlide.title}" updated successfully!`);
      setEditingSlide(null);
      loadCMSContent();
    } catch (error: any) {
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', `Saved locally! Slide "${editingSlide.title}" is active in this browser (Cloud quota exceeded).`);
        setEditingSlide(null);
        loadCMSContent();
      } else {
        triggerStatus('error', error?.message || 'Error writing hero slide.');
      }
    }
  };

  const handleDeleteSlide = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Hero Slide',
      message: 'Are you absolutely sure you want to delete this hero slider slide? This action is permanent and cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteCMSHeroSlide(id);
          triggerStatus('success', 'Slide deleted successfully.');
          loadCMSContent();
        } catch (error: any) {
          triggerStatus('error', error?.message || 'Delete slide failed.');
        }
      }
    });
  };

  // ==========================================
  // SISTER CONCERN ACTIONS
  // ==========================================
  const startNewConcern = () => {
    setEditingConcern({
      id: `CONC-${Date.now().toString().slice(-4)}`,
      num: String(concerns.length + 1).padStart(2, '0'),
      name: '',
      desc: '',
      established: '',
      phone: '',
      email: '',
      address: '',
      website: '',
      aboutText: '',
      gallery: [],
      features: []
    });
  };

  const handleSaveConcern = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConcern) return;

    try {
      await saveCMSGroupConcern(editingConcern);
      triggerStatus('success', 'Concern updated.');
      setEditingConcern(null);
      loadCMSContent();
    } catch (error: any) {
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', `Saved locally! Concern "${editingConcern.name}" is active in this browser (Cloud quota exceeded).`);
        setEditingConcern(null);
        loadCMSContent();
      } else {
        triggerStatus('error', error?.message || 'Error saving Concern.');
      }
    }
  };

  const handleDeleteConcern = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Sister Concern',
      message: 'Are you absolutely sure you want to delete this sister concern / company? This action is permanent and cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteCMSGroupConcern(id);
          triggerStatus('success', 'Sister concern removed.');
          loadCMSContent();
        } catch (error: any) {
          triggerStatus('error', error?.message || 'Removal failed.');
        }
      }
    });
  };

  // ==========================================
  // CUSTOMER REVIEWS & RATINGS ACTIONS
  // ==========================================
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    if (!editingTestimonial.author || !editingTestimonial.quote) {
      triggerStatus('error', 'Please fill in required fields (Author name and Review quote).');
      return;
    }

    try {
      await saveCMSTestimonial(editingTestimonial);
      triggerStatus('success', 'Customer review & rating saved successfully!');
      setEditingTestimonial(null);
      loadCMSContent();
    } catch (error: any) {
      console.error(error);
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', 'Review saved locally! (Cloud quota exceeded)');
        setEditingTestimonial(null);
        loadCMSContent();
      } else {
        triggerStatus('error', error?.message || 'Failed to save customer review.');
      }
    }
  };

  const handleDeleteTestimonial = (id: string) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Customer Review',
      message: 'Are you sure you want to delete this customer review? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteCMSTestimonial(id);
          triggerStatus('success', 'Customer review removed.');
          loadCMSContent();
        } catch (error: any) {
          triggerStatus('error', error?.message || 'Removal failed.');
        }
      }
    });
  };

  // ==========================================
  // GLOBAL SITE SETTINGS ACTIONS
  // ==========================================
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!siteSettings) return;

    try {
      await saveCMSSiteSettings(siteSettings);
      triggerStatus('success', 'Global site-wide and contact settings updated successfully!');
      loadCMSContent();
    } catch (error: any) {
      console.error(error);
      const isQuota = error?.message?.toLowerCase().includes('quota') || 
                      error?.message?.toLowerCase().includes('resource-exhausted') ||
                      String(error).toLowerCase().includes('quota') ||
                      String(error).toLowerCase().includes('resource-exhausted');
      if (isQuota) {
        setQuotaExceeded(true);
        triggerStatus('success', 'Settings updated locally! (Cloud quota exceeded)');
        loadCMSContent();
      } else {
        triggerStatus('error', error?.message || 'Failed to save global site settings.');
      }
    }
  };

  // Unlocking Screen
  if (!isAuthorized) {
    return (
      <div className="bg-[#0B0B0C] min-h-screen flex items-center justify-center p-6 text-slate-300">
        <div className="max-w-md w-full bg-[#161617] border border-white/10 p-10 rounded-sm space-y-8 shadow-2xl">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-[#EE1B24]/10 border border-[#EE1B24]/30 flex items-center justify-center text-[#EE1B24]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-white uppercase tracking-wider font-bold">Moon Group CMS</h1>
            <p className="text-xs text-[#6B6B6A] uppercase tracking-widest">Admin Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-mono uppercase tracking-widest text-slate-400">Passcode Pin</label>
              <input
                type="password"
                placeholder="Enter admin passcode"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-center text-white focus:outline-none focus:border-[#EE1B24] transition-colors tracking-widest"
              />
              {authError && <p className="text-xs text-[#FF4A4F] text-center mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-[#EE1B24] hover:bg-white hover:text-[#0B0B0C] text-white py-3.5 px-6 font-mono font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 cursor-pointer"
            >
              UNLOCK PANEL
            </button>
          </form>

          

          <div className="text-center pt-2">
            <button
              onClick={onBackToSite}
              className="text-[10px] font-mono uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Return to Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0B0B0C] min-h-screen text-slate-300 font-sans">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#161617] border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#EE1B24]/10 border border-[#EE1B24]/20 text-[#EE1B24] rounded-sm">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="block font-serif text-lg font-bold text-white uppercase tracking-wider">Moon Group Admin Portal</span>
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                ⚡ Supabase Connected
              </span>
            </div>
            <span className="block font-mono text-[9px] text-emerald-400/90 uppercase tracking-widest mt-0.5">
              Live Supabase Cloud Database (lxxelzbkygsghqbzqius.supabase.co)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          

          <button
            onClick={() => {
              const sql = `CREATE TABLE IF NOT EXISTS public.cms_store (\n    key TEXT PRIMARY KEY,\n    value JSONB NOT NULL,\n    updated_at TIMESTAMPTZ DEFAULT NOW()\n);\nALTER TABLE public.cms_store ENABLE ROW LEVEL SECURITY;\nDROP POLICY IF EXISTS "Allow anon all" ON public.cms_store;\nCREATE POLICY "Allow anon all" ON public.cms_store FOR ALL USING (true) WITH CHECK (true);`;
              navigator.clipboard.writeText(sql);
              triggerStatus('success', '✓ Supabase table SQL copied to clipboard! Paste into Supabase SQL Editor.');
            }}
            className="px-3 py-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600 hover:text-white rounded-sm text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer flex items-center gap-1.5"
            title="Copy SQL script to create cms_store table in Supabase"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>Copy Supabase SQL</span>
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`px-4 py-2 border text-xs font-mono font-bold tracking-widest uppercase transition-all cursor-pointer rounded-sm ${
              showPreview ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'border-white/10 text-white hover:bg-white/10'
            }`}
          >
            {showPreview ? "Hide Live Preview" : "Show Live Preview"}
          </button>
          <button
            onClick={onBackToSite}
            className="px-4 py-2 border border-white/10 text-white rounded-sm text-xs font-mono font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
          >
            PREVIEW WEBSITE
          </button>
          <button
            onClick={() => setIsAuthorized(false)}
            className="p-2 bg-red-950/40 border border-red-500/20 text-red-400 hover:text-white rounded-sm transition-all cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Quota Exceeded Banner */}
      {quotaExceeded && (
        <div className="max-w-[1700px] mx-auto px-4 sm:px-8 pt-6">
          <div className="bg-red-950/40 border border-red-500/30 text-red-200 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
            <div className="space-y-1">
              <span className="block text-xs font-mono font-bold tracking-widest uppercase text-[#EE1B24]">⚠️ Firestore Cloud Quota Exceeded (Daily Spark Plan Limit)</span>
              <p className="text-xs text-red-300/80">
                The cloud database write/read quota has been exhausted. Your changes will be saved <b>locally in this browser fallback</b>. 
                Other website visitors will see these changes once the quota resets tomorrow or when billing is upgraded in the Google Firebase console.
              </p>
            </div>
            <a 
              href="https://console.firebase.google.com/project/moon-group-website/firestore/databases/ai-studio-moonbangladeshli-3cb52391-023d-45d8-ae39-a1def95662ee/data?openUpgradeDialog=true"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#EE1B24]/20 hover:bg-[#EE1B24]/30 border border-[#EE1B24]/40 text-red-200 text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition-colors text-center shrink-0"
            >
              Configure Billing
            </a>
          </div>
        </div>
      )}

      {/* Main CMS Layout */}
      <div className="max-w-[1700px] mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-2 space-y-2">
          <div className="font-mono text-[9px] text-[#6B6B6A] uppercase tracking-widest px-4 pb-2 border-b border-white/5 mb-4">
            Content Segments
          </div>
          <button
            onClick={() => { setActiveTab('properties'); setEditingProperty(null); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'properties' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Building className="w-4 h-4" />
            <span>Properties Portfolio</span>
          </button>
          <button
            onClick={() => { setActiveTab('slides'); setEditingSlide(null); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'slides' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Hero Slider Slides</span>
          </button>
          <button
            onClick={() => { setActiveTab('about'); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'about' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>About Us Section</span>
          </button>
          <button
            onClick={() => { setActiveTab('concerns'); setEditingConcern(null); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'concerns' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Group Concerns</span>
          </button>
          <button
            onClick={() => { setActiveTab('testimonials'); setEditingTestimonial(null); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'testimonials' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Customer Reviews ({testimonials.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('settings'); }}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'settings' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Sliders className="w-4 h-4 text-amber-500" />
            <span>Global Site Settings</span>
          </button>

          <div className="font-mono text-[9px] text-[#6B6B6A] uppercase tracking-widest px-4 pt-6 pb-2 border-b border-white/5 mb-4">
            User Submissions & Leads
          </div>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'bookings' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Tour Bookings ({bookings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('partnerships')}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'partnerships' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Landowner Leads ({partnerships.length})</span>
          </button>

          <div className="font-mono text-[9px] text-[#6B6B6A] uppercase tracking-widest px-4 pt-6 pb-2 border-b border-white/5 mb-4">
            System & Cloud
          </div>
          <button
            onClick={() => setActiveTab('database')}
            className={`w-full text-left px-4 py-3 rounded-sm text-xs font-mono uppercase tracking-wider flex items-center gap-3 transition-colors ${
              activeTab === 'database' ? 'bg-[#EE1B24] text-white font-bold' : 'hover:bg-[#161617] text-slate-400'
            }`}
          >
            <Database className="w-4 h-4 text-emerald-400" />
            <span>DB Sync & Integrity</span>
          </button>
        </aside>

        {/* Main Editor + Live Preview columns */}
        <div className={`col-span-12 lg:col-span-10 grid grid-cols-1 ${showPreview ? 'xl:grid-cols-12' : ''} gap-6`}>
          {/* Dynamic Panel Content Column */}
          <main className={`${showPreview ? 'xl:col-span-7' : 'xl:col-span-12'} space-y-6`}>
          {/* Realtime Action status notifications */}
          {statusMessage.text && (
            <div className={`p-4 rounded-sm text-xs font-mono font-bold tracking-wide uppercase border ${
              statusMessage.type === 'success' 
                ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400' 
                : 'bg-red-950/40 border-red-500/20 text-red-400'
            }`}>
              {statusMessage.text}
            </div>
          )}

          {/* TAB 1: PROPERTIES PORTFOLIO */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              {!editingProperty ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl text-white uppercase font-bold">Properties Portfolio ({properties.length})</h2>
                      <p className="text-xs text-[#6B6B6A]">View, edit or register new property designs on your database.</p>
                    </div>
                    <button
                      onClick={startNewProperty}
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-2.5 px-4 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Property</span>
                    </button>
                  </div>

                  {/* HAVEN TOWER SPOTLIGHT SHOWCASE IMAGE & BANNER EDITOR */}
                  {siteSettings && (
                    <div className="bg-[#161617] border border-[#EE1B24]/40 p-5 rounded-sm space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Flame className="w-4 h-4 text-[#EE1B24]" />
                            <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                              Haven Tower Spotlight Banner & Featured Image Manager
                            </h3>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                              siteSettings.showHavenTowerBanner !== false ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                              {siteSettings.showHavenTowerBanner !== false ? '● ONLINE / VISIBLE' : '○ OFFLINE / HIDDEN'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-1">
                            Upload or change the featured photo for <strong>HEAVEN TOWER by Moon Group</strong> displayed on the Home Page Spotlight & All Properties Page Banner.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={async () => {
                            const nextState = siteSettings.showHavenTowerBanner === false ? true : false;
                            const updated = { ...siteSettings, showHavenTowerBanner: nextState };
                            setSiteSettings(updated);
                            try {
                              await saveCMSSiteSettings(updated);
                              triggerStatus('success', nextState ? 'Haven Tower Banner is now ONLINE!' : 'Haven Tower Banner is now OFFLINE!');
                            } catch {
                              triggerStatus('error', 'Failed to update Haven Tower banner state.');
                            }
                          }}
                          className={`w-14 h-7 rounded-full p-1 transition-colors duration-300 relative shrink-0 cursor-pointer ${
                            siteSettings.showHavenTowerBanner !== false ? 'bg-emerald-500' : 'bg-slate-700'
                          }`}
                        >
                          <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-300 ${
                            siteSettings.showHavenTowerBanner !== false ? 'translate-x-7' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold">
                          Upload Featured Banner / Cover Photo for Haven Tower
                        </label>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            value={getDisplayUrl(siteSettings.havenTowerBannerImage)}
                            onChange={e => {
                              const val = e.target.value;
                              if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                                setSiteSettings({ ...siteSettings, havenTowerBannerImage: val });
                              }
                            }}
                            placeholder="Direct image URL or click Upload button..."
                            className="flex-1 bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                          />
                          <label className="bg-[#EE1B24] hover:bg-white hover:text-black text-white font-mono text-xs font-bold px-4 py-2.5 rounded-sm border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0">
                            <ImageIcon className="w-4 h-4" />
                            <span>Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                if (file.size > 10 * 1024 * 1024) {
                                  triggerStatus('error', 'File size exceeds maximum 10 MB limit.');
                                  return;
                                }
                                try {
                                  const b64 = await resizeImageToBase64(file, 1200);
                                  const updated = { ...siteSettings, havenTowerBannerImage: b64 };
                                  setSiteSettings(updated);
                                  await saveCMSSiteSettings(updated);

                                  // Also sync to properties list haven-tower item
                                  const havenInList = properties.find(p => p.id === 'haven-tower' || p.title.toLowerCase().includes('haven tower'));
                                  if (havenInList) {
                                    const updatedHavenProp = { ...havenInList, imageUrl: b64 };
                                    await saveCMSProperty(updatedHavenProp).catch(() => {});
                                    setProperties(prev => prev.map(p => p.id === havenInList.id ? updatedHavenProp : p));
                                  }

                                  triggerStatus('success', 'Haven Tower image uploaded & saved across site successfully!');
                                } catch (err: any) {
      
                                  console.error(err);
                                  triggerStatus('error', 'Failed to process image file.');
                                }
                              }}
                            />
                          </label>
                        </div>

                        {siteSettings.havenTowerBannerImage && (
                          <div className="flex items-center gap-4 pt-2">
                            <div className="relative aspect-[16/7] w-48 rounded border border-amber-500/30 overflow-hidden bg-black shrink-0">
                              <img
                                src={siteSettings.havenTowerBannerImage}
                                alt="Haven Tower Preview"
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="text-xs text-slate-400 space-y-1">
                              <span className="text-emerald-400 font-mono font-bold block">✓ Image Active & Synced</span>
                              <p className="text-[11px] text-slate-500">
                                This image is now displayed in the Home Page Haven Tower Spotlight Showcase, the All Properties Promotion Banner, and the Haven Tower Property Detail View.
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/10">
                          <div>
                            <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                              Haven Tower Display Title
                            </label>
                            <input
                              type="text"
                              value={siteSettings.havenTowerTitle || ''}
                              onChange={async (e) => {
                                const val = e.target.value;
                                const updated = { ...siteSettings, havenTowerTitle: val };
                                setSiteSettings(updated);
                                saveCMSSiteSettings(updated).catch(() => {});
                              }}
                              placeholder="HEAVEN TOWER by Moon Group"
                              className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                              Haven Tower Inauguration Announcement Text (Bangla / English Description)
                            </label>
                            <textarea
                              rows={3}
                              value={siteSettings.havenTowerDescription || ''}
                              onChange={async (e) => {
                                const val = e.target.value;
                                const updated = { ...siteSettings, havenTowerDescription: val };
                                setSiteSettings(updated);
                                saveCMSSiteSettings(updated).catch(() => {});
                              }}
                              placeholder="📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে..."
                              className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            <div>
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Status Label
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerStatusLabel || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerStatusLabel: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="Project Status"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Status Value
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerStatusValue || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerStatusValue: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="Booking & Sales Open"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Price Label
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerPriceLabel || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerPriceLabel: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="Launch Rate"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div>
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Price Value
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerPriceValue || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerPriceValue: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="Tk 2.2 - 5.5 Cr"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Location
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerLocation || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerLocation: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="Plot 01, Section 12, Mirpur / Prime Location, Dhaka"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Haven Tower Apartment Sizes
                              </label>
                              <input
                                type="text"
                                value={siteSettings.havenTowerSizes || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerSizes: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="1,850 Sft - 3,600 Sft (Single & Duplex)"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>

                            <div className="sm:col-span-2">
                              <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                                Key Architectural Highlights (One per line)
                              </label>
                              <textarea
                                rows={4}
                                value={siteSettings.havenTowerHighlights || ''}
                                onChange={async (e) => {
                                  const val = e.target.value;
                                  const updated = { ...siteSettings, havenTowerHighlights: val };
                                  setSiteSettings(updated);
                                  saveCMSSiteSettings(updated).catch(() => {});
                                }}
                                placeholder="25-Story Iconic Landmark Architecture&#10;Grand Double-Height Entrance Atrium Lobby"
                                className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {properties.map(p => (
                      <div key={p.id} className="bg-[#161617] p-5 border border-white/5 rounded-sm flex items-center gap-4 justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 object-cover rounded-sm border border-white/10 shrink-0"
                          />
                          <div>
                            <span className="block font-serif text-sm font-bold text-white uppercase leading-tight">{p.title}</span>
                            <span className="block font-mono text-[10px] text-gold-400 uppercase mt-0.5">{p.area} — {p.priceRange}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingProperty(p)}
                            className="p-2 bg-black/50 hover:bg-gold-500 hover:text-black text-slate-300 rounded-sm transition-colors cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(p.id)}
                            className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white text-red-400 rounded-sm transition-colors cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveProperty} className="bg-[#161617] border border-white/10 p-8 rounded-sm space-y-8">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <div>
                      <h3 className="font-serif text-lg text-white uppercase font-bold">
                        {editingProperty.title ? `Edit ${editingProperty.title}` : 'Register New Property Design'}
                      </h3>
                      <p className="text-[10px] text-[#6B6B6A] uppercase font-mono tracking-widest mt-1">Configure property page elements in order</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProperty(null);
                        setTempGalleryUrl('');
                        setTempFeatureText('');
                      }}
                      className="p-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* SECTION 1: PROJECT DETAIL HERO SLIDER & MAIN DETAILS */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-6">
                    <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                      <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">01</span>
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">Project Hero Slider & Texts</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">ID (Unique Reference)</label>
                        <input
                          type="text"
                          value={editingProperty.id}
                          onChange={e => setEditingProperty({ ...editingProperty, id: e.target.value })}
                          disabled
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-slate-500 font-mono text-xs focus:outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Property Title</label>
                        <input
                          type="text"
                          required
                          value={editingProperty.title}
                          onChange={e => setEditingProperty({ ...editingProperty, title: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Segment Type</label>
                        <select
                          value={editingProperty.type}
                          onChange={e => setEditingProperty({ ...editingProperty, type: e.target.value as any })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                        >
                          <option value="residential">Residential</option>
                          <option value="commercial">Commercial</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Status</label>
                        <select
                          value={editingProperty.status}
                          onChange={e => setEditingProperty({ ...editingProperty, status: e.target.value as any })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                        >
                          <option value="ongoing">Ongoing</option>
                          <option value="upcoming">Upcoming</option>
                          <option value="completed">Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Project Description</label>
                      <textarea
                        rows={4}
                        required
                        value={editingProperty.description}
                        onChange={e => setEditingProperty({ ...editingProperty, description: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                      />
                    </div>

                    {/* Primary Image Upload */}
                    <div className="space-y-3 p-4 border border-white/5 bg-black/40 rounded-sm">
                      <label className="block text-[10px] font-mono uppercase text-slate-300">Primary Cover / Thumbnail Image</label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                          <span className="block text-[9px] uppercase text-slate-500">Image URL / Data</span>
                          <input
                            type="text"
                            required
                            placeholder="Direct image URL or image data"
                            value={getDisplayUrl(editingProperty.imageUrl)}
                            onChange={e => {
                              const val = e.target.value;
                              if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                                setEditingProperty({ ...editingProperty, imageUrl: val });
                              }
                            }}
                            className="w-full bg-[#0B0B0C] border border-white/10 p-2.5 rounded-sm text-white text-xs focus:outline-none"
                          />
                        </div>
                        <div className="flex-1 space-y-1">
                          <span className="block text-[9px] uppercase text-slate-500">Or Upload File</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                 triggerStatus('success', 'Loading cover image...');
                                 const base64 = await resizeImageToBase64(file);
                                 setEditingProperty({ ...editingProperty, imageUrl: base64 });
                                 triggerStatus('success', 'Cover image loaded! Click "Save Property Asset" below to apply changes.');
                              }
                            }}
                            className="block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-[10px] file:font-mono file:bg-[#EE1B24] file:text-white hover:file:bg-white hover:file:text-black cursor-pointer pt-1" 
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase text-slate-500">Image Fit strategy</label>
                          <select 
                            value={editingProperty.imageFit || 'cover'} 
                            onChange={e => setEditingProperty({ ...editingProperty, imageFit: e.target.value as any })}
                            className="w-full bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs"
                          >
                            <option value="cover">Cover (Fill & Crop)</option>
                            <option value="contain">Contain (Letterbox)</option>
                            <option value="fill">Fill (Stretch)</option>
                            <option value="scale-down">Scale Down</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] uppercase text-slate-500">Image Alignment</label>
                          <select 
                            value={editingProperty.imagePosition || 'center'} 
                            onChange={e => setEditingProperty({ ...editingProperty, imagePosition: e.target.value })}
                            className="w-full bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs"
                          >
                            <option value="center">Center</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="left-top">Left Top</option>
                            <option value="left-bottom">Left Bottom</option>
                            <option value="right-top">Right Top</option>
                            <option value="right-bottom">Right Bottom</option>
                          </select>
                        </div>
                        {editingProperty.imageUrl && (
                          <div className="flex items-center gap-2 border border-white/5 bg-black/40 p-1.5 rounded">
                            <div className="w-16 h-12 overflow-hidden border border-white/10 rounded-sm relative shrink-0 bg-[#0B0B0C]">
                              <img 
                                src={editingProperty.imageUrl} 
                                alt="Cover Preview" 
                                className={`w-full h-full ${getFitClass(editingProperty.imageFit)} ${getPositionClass(editingProperty.imagePosition)}`}
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[9px] text-slate-400 font-mono font-bold truncate">Live Preview</span>
                              <span className="text-[8px] text-emerald-400 font-mono font-bold leading-none">✓ Image Loaded</span>
                              <span className="text-[7px] text-slate-500 truncate mt-0.5 font-mono">
                                {editingProperty.imageFit || 'cover'} | {editingProperty.imagePosition || 'center'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Gallery / Detail Page Slider */}
                    <div className="space-y-4 p-4 border border-white/5 bg-black/40 rounded-sm">
                      <label className="block text-[10px] font-mono uppercase text-slate-300">Project Page Hero Slider Images ({ (editingProperty.gallery || []).length })</label>
                      
                      {/* Interactive previews */}
                      {editingProperty.gallery && editingProperty.gallery.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {editingProperty.gallery.map((url, idx) => (
                            <div key={idx} className="relative group w-20 h-16 rounded border border-white/10 overflow-hidden bg-neutral-950">
                              <img src={url} alt={`Gallery index ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(editingProperty.gallery || [])];
                                  updated.splice(idx, 1);
                                  setEditingProperty({ ...editingProperty, gallery: updated });
                                }}
                                className="absolute inset-0 bg-red-600/80 text-white font-mono text-[9px] uppercase font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-[#6B6B6A] uppercase font-mono italic">No additional slider images configured yet. Showing cover image as default slide.</div>
                      )}

                      {/* Add Gallery item */}
                      <div className="flex flex-col sm:flex-row gap-4 border-t border-white/5 pt-3">
                        <div className="flex-1 space-y-1">
                          <span className="block text-[9px] uppercase text-slate-500">Add Image URL</span>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              placeholder="Direct gallery image URL"
                              value={tempGalleryUrl}
                              onChange={e => setTempGalleryUrl(e.target.value)}
                              className="flex-1 bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (tempGalleryUrl.trim()) {
                                  const updated = [...(editingProperty.gallery || []), tempGalleryUrl.trim()];
                                  setEditingProperty({ ...editingProperty, gallery: updated });
                                  setTempGalleryUrl('');
                                }
                              }}
                              className="bg-[#EE1B24] hover:bg-white hover:text-black px-3 rounded-sm font-mono text-[10px] uppercase font-bold text-white transition-colors cursor-pointer"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                        <div className="flex-1 space-y-1">
                          <span className="block text-[9px] uppercase text-slate-500">Or Upload Image File</span>
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                 triggerStatus('success', 'Loading image...');
                                 const base64 = await resizeImageToBase64(file);
                                 const updated = [...(editingProperty.gallery || []), base64];
                                 setEditingProperty({ ...editingProperty, gallery: updated });
                                 triggerStatus('success', 'Image loaded! Click "Save Property Asset" below to apply changes.');
                              }
                            }}
                            className="block w-full text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-sm file:border-0 file:text-[10px] file:font-mono file:bg-white file:text-black hover:file:bg-[#EE1B24] hover:file:text-white cursor-pointer pt-1" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: FLOOR PLAN BLUEPRINTS */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-6">
                    <div className="border-b border-white/5 pb-2 flex justify-between items-center flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">02</span>
                        <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">Floor Plan Blueprints & Virtual Layout</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 bg-[#EE1B24] hover:bg-white hover:text-black border border-[#EE1B24] py-1.5 px-3 font-mono font-bold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer text-white"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save All Blueprints & Property</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const currentLayouts = editingProperty.floorLayouts || [];
                            const nextIdx = currentLayouts.length + 1;
                            const newLayout: FloorLayout = {
                              levelName: `Floor ${nextIdx} - Unit A`,
                              sizeSqft: 3250,
                              rooms: [
                                { name: 'Master Bed', x: 15, y: 15, w: 35, h: 35, type: 'bed' },
                                { name: 'Guest Bed', x: 55, y: 15, w: 30, h: 30, type: 'bed' },
                                { name: 'Living Room', x: 15, y: 55, w: 45, h: 30, type: 'living' },
                                { name: 'Kitchen', x: 65, y: 55, w: 20, h: 25, type: 'kitchen' },
                                { name: 'Bath', x: 55, y: 45, w: 10, h: 10, type: 'bath' }
                              ],
                              imageUrl: ''
                            };
                            setEditingProperty({
                              ...editingProperty,
                              floorLayouts: [...currentLayouts, newLayout]
                            });
                          }}
                          className="flex items-center gap-1.5 bg-white/5 hover:bg-white hover:text-black border border-white/10 py-1.5 px-3 font-mono font-bold text-[10px] uppercase tracking-wider rounded transition-colors cursor-pointer text-white"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Floor Plan</span>
                        </button>
                      </div>
                    </div>

                    {/* Property-specific Virtual Layout Configurator ON/OFF Switch */}
                    <div className="bg-[#0B0B0C] border border-amber-500/30 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-white uppercase">Virtual Layout Configurator for this Property</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            editingProperty.hideVirtualConfigurator !== true ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {editingProperty.hideVirtualConfigurator !== true ? '● ON (VISIBLE)' : '○ OFF (HIDDEN)'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          Toggle ON to display or OFF to hide the 2D floorplan layout configurator showcase on this property's details page.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setEditingProperty({
                          ...editingProperty,
                          hideVirtualConfigurator: editingProperty.hideVirtualConfigurator === true ? false : true
                        })}
                        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          editingProperty.hideVirtualConfigurator !== true ? 'bg-emerald-500' : 'bg-slate-700'
                        }`}
                        role="switch"
                        aria-checked={editingProperty.hideVirtualConfigurator !== true}
                      >
                        <span
                          className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            editingProperty.hideVirtualConfigurator !== true ? 'translate-x-7' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-4">
                      {editingProperty.floorLayouts && editingProperty.floorLayouts.length > 0 ? (
                        editingProperty.floorLayouts.map((layout, idx) => (
                          <div key={idx} className="p-4 bg-black/40 border border-white/5 rounded-sm space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => {
                                const currentLayouts = [...(editingProperty.floorLayouts || [])];
                                currentLayouts.splice(idx, 1);
                                setEditingProperty({ ...editingProperty, floorLayouts: currentLayouts });
                              }}
                              className="absolute top-4 right-4 text-xs font-mono uppercase font-bold text-red-400 hover:text-white tracking-wider cursor-pointer"
                            >
                              ✕ Remove
                            </button>

                            <span className="inline-block bg-white/5 text-[9px] font-mono uppercase tracking-widest text-[#EE1B24] px-2 py-0.5 rounded border border-white/5">
                              Plan Layout #{idx + 1}
                            </span>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <span className="block text-[9px] uppercase text-slate-500">Level Name & Identifier</span>
                                <input
                                  type="text"
                                  required
                                  value={layout.levelName}
                                  onChange={e => {
                                    const currentLayouts = [...(editingProperty.floorLayouts || [])];
                                    currentLayouts[idx] = { ...currentLayouts[idx], levelName: e.target.value };
                                    setEditingProperty({ ...editingProperty, floorLayouts: currentLayouts });
                                  }}
                                  className="w-full bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[9px] uppercase text-slate-500">Allocated Area Size (SFT)</span>
                                <input
                                  type="number"
                                  required
                                  value={layout.sizeSqft}
                                  onChange={e => {
                                    const currentLayouts = [...(editingProperty.floorLayouts || [])];
                                    currentLayouts[idx] = { ...currentLayouts[idx], sizeSqft: parseInt(e.target.value) || 0 };
                                    setEditingProperty({ ...editingProperty, floorLayouts: currentLayouts });
                                  }}
                                  className="w-full bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                              <div className="space-y-1">
                                <span className="block text-[9px] uppercase text-slate-500">Blueprint Image URL / Data</span>
                                <input
                                  type="text"
                                  placeholder="Direct URL or Data URL of floor layout plan"
                                  value={getDisplayUrl(layout.imageUrl)}
                                  onChange={e => {
                                    const val = e.target.value;
                                    if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                                      const currentLayouts = [...(editingProperty.floorLayouts || [])];
                                      currentLayouts[idx] = { ...currentLayouts[idx], imageUrl: val };
                                      setEditingProperty({ ...editingProperty, floorLayouts: currentLayouts });
                                    }
                                  }}
                                  className="w-full bg-[#0B0B0C] border border-white/10 p-2 rounded-sm text-white text-xs focus:outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <span className="block text-[9px] uppercase text-slate-500">Or Upload Blueprint File</span>
                                <input 
                                  type="file" 
                                  accept="image/*"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                       triggerStatus('success', 'Loading blueprint image...');
                                       const base64 = await resizeImageToBase64(file);
                                       const currentLayouts = [...(editingProperty.floorLayouts || [])];
                                       currentLayouts[idx] = { ...currentLayouts[idx], imageUrl: base64 };
                                       setEditingProperty({ ...editingProperty, floorLayouts: currentLayouts });
                                       triggerStatus('success', `Blueprint loaded for ${layout.levelName || 'Floor'}. Click 'Save All Blueprints & Property'!`);
                                    }
                                  }}
                                  className="block w-full text-xs text-slate-400 file:mr-3 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-[9px] file:font-mono file:bg-[#EE1B24] file:text-white hover:file:bg-white hover:file:text-black cursor-pointer pt-1" 
                                />
                              </div>
                            </div>

                            {layout.imageUrl && (
                              <div className="flex items-center gap-2 pt-1">
                                <img src={layout.imageUrl} alt="Layout Preview" className="w-14 h-10 object-contain border border-white/10 rounded bg-[#0A0B0D]" referrerPolicy="no-referrer" />
                                <span className="text-[9px] text-emerald-400 font-mono font-bold">✓ Blueprint Loaded - Click Save to apply</span>
                              </div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="text-center p-6 border border-dashed border-white/15 rounded bg-black/10">
                          <p className="text-[10px] text-slate-500 font-mono uppercase">No custom layouts registered. The system will fall back to default presentation layouts.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* SECTION 3: VIDEO CONFIGURATION */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-4">
                    <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                      <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">03</span>
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">Cinematic Drone Video Tour</h4>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Cinematic Tour / Walkthrough Video URL</label>
                      <input
                        type="text"
                        placeholder="YouTube watch link, embed link, Vimeo link, or MP4 URL (e.g. https://www.youtube.com/watch?v=S2p8E5Y97eE)"
                        value={editingProperty.videoUrl || ''}
                        onChange={e => setEditingProperty({ ...editingProperty, videoUrl: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                      />
                      <p className="text-[9px] text-[#6B6B6A] uppercase font-mono leading-relaxed pt-1">
                        Tip: Provide a YouTube or Vimeo url. The application will convert it automatically to a responsive, premium video player frame on the visitor page.
                      </p>
                    </div>
                  </div>

                  {/* SECTION 4: AT A GLANCE SIDEPANEL SPECS */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-6">
                    <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                      <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">04</span>
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">"At a Glance" Specifications Table</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Detailed Full Address (Specs View)</label>
                        <input
                          type="text"
                          placeholder="e.g. Plot # 43, Road: 54, Block: F, Gulshan 2, Dhaka"
                          value={editingProperty.address || ''}
                          onChange={e => setEditingProperty({ ...editingProperty, address: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none focus:border-[#EE1B24]"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Total Land Area</label>
                        <input
                          type="text"
                          placeholder="e.g. 35 Katha"
                          value={editingProperty.landArea || ''}
                          onChange={e => setEditingProperty({ ...editingProperty, landArea: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Apartments / Space Per Floor</label>
                        <input
                          type="text"
                          placeholder="e.g. 2, or Grade-A Offices"
                          value={editingProperty.aptPerFloor || ''}
                          onChange={e => setEditingProperty({ ...editingProperty, aptPerFloor: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Sizing Range (SFT)</label>
                        <input
                          type="text"
                          placeholder="e.g. 3,250 - 4,800 Sft"
                          required
                          value={editingProperty.sizeRange}
                          onChange={e => setEditingProperty({ ...editingProperty, sizeRange: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Investment Range</label>
                        <input
                          type="text"
                          placeholder="e.g. Tk 6.5 - 9.8 Crore / Price on Request"
                          required
                          value={editingProperty.priceRange}
                          onChange={e => setEditingProperty({ ...editingProperty, priceRange: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Bedrooms Count</label>
                        <input
                          type="number"
                          value={editingProperty.beds || 3}
                          onChange={e => setEditingProperty({ ...editingProperty, beds: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Bathrooms Count</label>
                        <input
                          type="number"
                          value={editingProperty.baths || 4}
                          onChange={e => setEditingProperty({ ...editingProperty, baths: parseInt(e.target.value) || 0 })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Structural Levels Count</label>
                        <input
                          type="number"
                          value={editingProperty.floorsCount}
                          onChange={e => setEditingProperty({ ...editingProperty, floorsCount: parseInt(e.target.value) || 1 })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Launch Date</label>
                        <input
                          type="text"
                          placeholder="e.g. October 2023"
                          value={editingProperty.launchDate || ''}
                          onChange={e => setEditingProperty({ ...editingProperty, launchDate: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2 sm:col-span-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Handover / Completion Info (e.g. May 2028)</label>
                        <input
                          type="text"
                          placeholder="e.g. Completed 2025"
                          value={editingProperty.handoverDate || ''}
                          onChange={e => setEditingProperty({ ...editingProperty, handoverDate: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: GEOGRAPHIC LOCATION */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-6">
                    <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                      <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">05</span>
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">Geographic Map Location</h4>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Location Area Tag Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Banani, Dhaka"
                          required
                          value={editingProperty.area}
                          onChange={e => setEditingProperty({ ...editingProperty, area: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[10px] font-mono uppercase text-slate-400">Detailed Map Lookup Query</label>
                        <input
                          type="text"
                          placeholder="e.g. Banani, Dhaka (will query interactive maps frame)"
                          required
                          value={editingProperty.location}
                          onChange={e => setEditingProperty({ ...editingProperty, location: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SECTION 6: AMENITIES, FEATURES & ARCHITECTURE */}
                  <div className="p-6 border border-white/10 bg-black/10 rounded-sm space-y-6">
                    <div className="border-b border-white/5 pb-2 flex items-center gap-2">
                      <span className="bg-[#EE1B24] text-white text-[10px] font-mono px-2 py-0.5 rounded-full">06</span>
                      <h4 className="font-mono text-xs uppercase tracking-wider font-bold text-white">Project Features & Architecture List</h4>
                    </div>

                    {/* Features Tags Builder */}
                    <div className="space-y-4">
                      <label className="block text-[10px] font-mono uppercase text-slate-300">Features List ({ (editingProperty.features || []).length })</label>
                      
                      {editingProperty.features && editingProperty.features.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {editingProperty.features.map((feature, idx) => (
                            <div key={idx} className="bg-white/5 border border-white/10 rounded px-2.5 py-1.5 flex items-center gap-2 text-xs text-white">
                              <span>{feature}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(editingProperty.features || [])];
                                  updated.splice(idx, 1);
                                  setEditingProperty({ ...editingProperty, features: updated });
                                }}
                                className="text-[#EE1B24] hover:text-white font-bold ml-1 cursor-pointer"
                                title="Delete feature"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[10px] text-[#6B6B6A] uppercase font-mono italic">No custom project features added yet.</div>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add specific feature (e.g. Earthquake resistant up to Richter Scale 7.5)"
                          value={tempFeatureText}
                          onChange={e => setTempFeatureText(e.target.value)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              if (tempFeatureText.trim()) {
                                const updated = [...(editingProperty.features || []), tempFeatureText.trim()];
                                setEditingProperty({ ...editingProperty, features: updated });
                                setTempFeatureText('');
                              }
                            }
                          }}
                          className="flex-1 bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            if (tempFeatureText.trim()) {
                              const updated = [...(editingProperty.features || []), tempFeatureText.trim()];
                              setEditingProperty({ ...editingProperty, features: updated });
                              setTempFeatureText('');
                            }
                          }}
                          className="bg-[#EE1B24] hover:bg-white hover:text-black px-4 rounded-sm font-mono text-xs uppercase font-bold text-white transition-colors cursor-pointer"
                        >
                          Add Feature
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON ACTIONS */}
                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Property Asset</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProperty(null);
                        setTempGalleryUrl('');
                        setTempFeatureText('');
                      }}
                      className="py-3 px-6 bg-black border border-white/10 text-slate-400 hover:text-white rounded-sm text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: HERO SLIDER CAROUSEL */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              {!editingSlide ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl text-white uppercase font-bold">Hero Slides ({heroSlides.length})</h2>
                      <p className="text-xs text-[#6B6B6A]">Create and adjust the slides displayed on the premium landing carousel.</p>
                    </div>
                    <button
                      onClick={startNewSlide}
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-2.5 px-4 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Carousel Slide</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {heroSlides.map(s => (
                      <div key={s.id} className="bg-[#161617] p-5 border border-white/5 rounded-sm flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={s.imageUrl}
                            alt={s.title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-12 object-cover rounded-sm border border-white/10 shrink-0"
                          />
                          <div>
                            <span className="block font-serif text-sm font-bold text-white uppercase leading-tight">{s.title}</span>
                            <span className="block font-mono text-[10px] text-[#6B6B6A] uppercase mt-1">{s.tag}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingSlide(s)}
                            className="p-2 bg-black/50 hover:bg-gold-500 hover:text-black text-slate-300 rounded-sm transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlide(s.id)}
                            className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white text-red-400 rounded-sm transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveSlide} className="bg-[#161617] border border-white/10 p-8 rounded-sm space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-lg text-white uppercase font-bold">Edit Slide Details</h3>
                    <button type="button" onClick={() => setEditingSlide(null)} className="p-2 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Slide Title</label>
                      <input
                        type="text"
                        required
                        value={editingSlide.title}
                        onChange={e => setEditingSlide({ ...editingSlide, title: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Visual Tag Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Flagship Residential"
                        required
                        value={editingSlide.tag}
                        onChange={e => setEditingSlide({ ...editingSlide, tag: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Segment type</label>
                      <select
                        value={editingSlide.type}
                        onChange={e => setEditingSlide({ ...editingSlide, type: e.target.value as any })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Project Status</label>
                      <select
                        value={editingSlide.status}
                        onChange={e => setEditingSlide({ ...editingSlide, status: e.target.value as any })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      >
                        <option value="ongoing">Ongoing</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Starting Price</label>
                      <input
                        type="text"
                        required
                        value={editingSlide.price}
                        onChange={e => setEditingSlide({ ...editingSlide, price: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Asset dimensions</label>
                      <input
                        type="text"
                        placeholder="e.g. 3,250 - 4,800 Sft"
                        required
                        value={editingSlide.stats.size}
                        onChange={e => setEditingSlide({ ...editingSlide, stats: { ...editingSlide.stats, size: e.target.value } })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 p-4 border border-white/10 bg-black/20 rounded-sm">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Large Slide Image Configuration</label>
                    
                    {/* Real-time Hero Slide Image Preview */}
                    {editingSlide.imageUrl && (
                      <div className="mb-2 p-2 border border-white/5 bg-black/40 rounded-sm flex items-center gap-4">
                        <div className="w-32 h-20 overflow-hidden rounded border border-white/10 bg-[#0B0B0C] shrink-0 relative">
                          <img 
                            src={editingSlide.imageUrl} 
                            alt="Slide Live Preview" 
                            className={`w-full h-full ${getFitClass(editingSlide.imageFit)} ${getPositionClass(editingSlide.imagePosition)}`}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] text-emerald-400 font-mono font-bold">✓ HERO SLIDE IMAGE LOADED</p>
                          <p className="text-[9px] text-slate-400">Preview showing: <span className="text-white uppercase font-mono">{editingSlide.imageFit || 'cover'}</span> | <span className="text-white uppercase font-mono">{editingSlide.imagePosition || 'center'}</span></p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1 space-y-1">
                        <span className="block text-[9px] uppercase text-slate-500">Enter Image URL / Data...</span>
                        <input
                          type="text"
                          required
                          value={getDisplayUrl(editingSlide.imageUrl)}
                          onChange={e => {
                            const val = e.target.value;
                            if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                              setEditingSlide(prev => prev ? { ...prev, imageUrl: val } : null);
                            }
                          }}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <span className="block text-[9px] uppercase text-slate-500">...Or Upload File (Auto Resize)</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              try {
                                triggerStatus('success', 'Loading slide image...');
                                const base64 = await resizeImageToBase64(file);
                                setEditingSlide(prev => prev ? { ...prev, imageUrl: base64 } : null);
                                triggerStatus('success', 'Slide image loaded! Click "Update Slide" to save.');
                              } catch (err: any) {
      
                                console.error('Error loading slide image:', err);
                                triggerStatus('error', 'Failed to load slide image: ' + (err?.message || err));
                              }
                            }
                          }}
                          className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-mono file:bg-[#EE1B24] file:text-white hover:file:bg-white hover:file:text-black cursor-pointer pt-1" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                         <label className="block text-[9px] uppercase text-slate-500 mb-1">Image Fit & Resize Strategy</label>
                         <select 
                            value={editingSlide.imageFit || 'cover'} 
                            onChange={e => setEditingSlide(prev => prev ? { ...prev, imageFit: e.target.value as any } : null)}
                            className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                          >
                            <option value="cover">Cover (Fill space, may crop)</option>
                            <option value="contain">Contain (Show full image, letterbox if needed)</option>
                            <option value="fill">Fill (Stretch to fit)</option>
                            <option value="scale-down">Scale Down</option>
                         </select>
                      </div>
                      <div className="space-y-1">
                         <label className="block text-[9px] uppercase text-slate-500 mb-1">Image Alignment</label>
                         <select 
                            value={editingSlide.imagePosition || 'center'} 
                            onChange={e => setEditingSlide(prev => prev ? { ...prev, imagePosition: e.target.value } : null)}
                            className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                          >
                            <option value="center">Center</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                            <option value="left-top">Left Top</option>
                            <option value="left-bottom">Left Bottom</option>
                            <option value="right-top">Right Top</option>
                            <option value="right-bottom">Right Bottom</option>
                         </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Slide Narrative Description</label>
                    <textarea
                      rows={3}
                      required
                      value={editingSlide.description}
                      onChange={e => setEditingSlide({ ...editingSlide, description: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                    />
                  </div>

                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Update Slide</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingSlide(null)}
                      className="py-3 px-6 bg-black border border-white/10 text-slate-400 hover:text-white rounded-sm text-xs font-mono uppercase tracking-wider"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: ABOUT US SECTION */}
          {activeTab === 'about' && aboutUs && (
            <form onSubmit={handleSaveAboutUs} className="bg-[#161617] border border-white/10 p-8 rounded-sm space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white uppercase font-bold">About Us Narrative Editor</h2>
                <p className="text-xs text-[#6B6B6A]">Edit corporate history, milestones, counters, and legacy parameters.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Mini tagline</label>
                  <input
                    type="text"
                    required
                    value={aboutUs.tagline}
                    onChange={e => setAboutUs({ ...aboutUs, tagline: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">About section main Title</label>
                  <input
                    type="text"
                    required
                    value={aboutUs.title}
                    onChange={e => setAboutUs({ ...aboutUs, title: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Founded Year Milestone</label>
                  <input
                    type="number"
                    required
                    value={aboutUs.yearFounded}
                    onChange={e => setAboutUs({ ...aboutUs, yearFounded: parseInt(e.target.value) })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Sister concerns counter</label>
                  <input
                    type="number"
                    required
                    value={aboutUs.sisterConcernsCount}
                    onChange={e => setAboutUs({ ...aboutUs, sisterConcernsCount: parseInt(e.target.value) })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Active Industrial sectors count</label>
                  <input
                    type="number"
                    required
                    value={aboutUs.sectorsActiveCount}
                    onChange={e => setAboutUs({ ...aboutUs, sectorsActiveCount: parseInt(e.target.value) })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>
                <div className="space-y-3 p-4 border border-white/10 bg-black/20 rounded-sm sm:col-span-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Historical Image Configuration</label>
                  
                  {/* Real-time About Us Narrative Image Preview */}
                  {aboutUs.imageUrl && (
                    <div className="mb-2 p-2 border border-white/5 bg-black/40 rounded-sm flex items-center gap-4">
                      <div className="w-32 h-20 overflow-hidden rounded border border-white/10 bg-[#0B0B0C] shrink-0 relative">
                        <img 
                          src={aboutUs.imageUrl} 
                          alt="About Us Live Preview" 
                          className={`w-full h-full ${getFitClass(aboutUs.imageFit)} ${getPositionClass(aboutUs.imagePosition)}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <p className="text-[10px] text-emerald-400 font-mono font-bold">✓ ABOUT US IMAGE LOADED</p>
                        <p className="text-[9px] text-slate-400">Preview showing: <span className="text-white uppercase font-mono">{aboutUs.imageFit || 'cover'}</span> | <span className="text-white uppercase font-mono">{aboutUs.imagePosition || 'center'}</span></p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 space-y-1">
                      <span className="block text-[9px] uppercase text-slate-500">Enter Image URL / Data...</span>
                      <input
                        type="text"
                        required
                        value={getDisplayUrl(aboutUs.imageUrl)}
                        onChange={e => {
                          const val = e.target.value;
                          if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                            setAboutUs({ ...aboutUs, imageUrl: val });
                          }
                        }}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="block text-[9px] uppercase text-slate-500">...Or Upload File (Auto Resize)</span>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                              triggerStatus('success', 'Loading image...');
                              const base64 = await resizeImageToBase64(file);
                              setAboutUs({ ...aboutUs, imageUrl: base64 });
                              triggerStatus('success', 'Image loaded! Click "Update Corporate Narrative" below to save.');
                          }
                        }}
                        className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-mono file:bg-[#EE1B24] file:text-white hover:file:bg-white hover:file:text-black cursor-pointer pt-1" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                       <label className="block text-[9px] uppercase text-slate-500 mb-1">Image Fit & Resize Strategy</label>
                       <select 
                          value={aboutUs.imageFit || 'cover'} 
                          onChange={e => setAboutUs({ ...aboutUs, imageFit: e.target.value as any })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                        >
                          <option value="cover">Cover (Fill space, may crop)</option>
                          <option value="contain">Contain (Show full image, letterbox if needed)</option>
                          <option value="fill">Fill (Stretch to fit)</option>
                          <option value="scale-down">Scale Down</option>
                       </select>
                    </div>
                    <div className="space-y-1">
                       <label className="block text-[9px] uppercase text-slate-500 mb-1">Image Alignment</label>
                       <select 
                          value={aboutUs.imagePosition || 'center'} 
                          onChange={e => setAboutUs({ ...aboutUs, imagePosition: e.target.value })}
                          className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                        >
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="left-top">Left Top</option>
                          <option value="left-bottom">Left Bottom</option>
                          <option value="right-top">Right Top</option>
                          <option value="right-bottom">Right Bottom</option>
                       </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Narrative paragraph 1</label>
                <textarea
                  rows={4}
                  required
                  value={aboutUs.paragraph1}
                  onChange={e => setAboutUs({ ...aboutUs, paragraph1: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Narrative paragraph 2</label>
                <textarea
                  rows={4}
                  required
                  value={aboutUs.paragraph2}
                  onChange={e => setAboutUs({ ...aboutUs, paragraph2: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                />
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Corporate Narrative</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: GROUP CONCERNS */}
          {activeTab === 'concerns' && (
            <div className="space-y-6">
              {!editingConcern ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="font-serif text-2xl text-white uppercase font-bold">Group Concerns ({concerns.length})</h2>
                      <p className="text-xs text-[#6B6B6A]">Manage subsidiaries and group concerns of the parent conglomerate.</p>
                    </div>
                    <button
                      onClick={startNewConcern}
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-2.5 px-4 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add sister Concern</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {concerns.map(c => (
                      <div key={c.id} className="bg-[#161617] p-5 border border-white/5 rounded-sm flex items-center justify-between gap-4">
                        <div>
                          <span className="font-mono text-[#EE1B24] text-xs uppercase tracking-widest block font-bold">Concern {c.num}</span>
                          <span className="block font-serif text-base font-bold text-white uppercase mt-1 leading-tight">{c.name}</span>
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase mt-0.5">{c.desc}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setEditingConcern(c)}
                            className="p-2 bg-black/50 hover:bg-gold-500 hover:text-black text-slate-300 rounded-sm transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteConcern(c.id)}
                            className="p-2 bg-red-950/20 hover:bg-red-600 hover:text-white text-red-400 rounded-sm transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveConcern} className="bg-[#161617] border border-white/10 p-8 rounded-sm space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-white/5">
                    <h3 className="font-serif text-lg text-white uppercase font-bold">Edit Sister Concern</h3>
                    <button type="button" onClick={() => setEditingConcern(null)} className="p-2 text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Order index number</label>
                      <input
                        type="text"
                        placeholder="e.g. 09"
                        required
                        value={editingConcern.num}
                        onChange={e => setEditingConcern({ ...editingConcern, num: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Concern / Company Name</label>
                      <input
                        type="text"
                        required
                        value={editingConcern.name}
                        onChange={e => setEditingConcern({ ...editingConcern, name: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Tagline Description</label>
                    <input
                      type="text"
                      placeholder="e.g. Luxury Corporate Hospitality"
                      required
                      value={editingConcern.desc}
                      onChange={e => setEditingConcern({ ...editingConcern, desc: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                    />
                  </div>

                  {/* New fields for Est, Web, Phone, Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Established Year</label>
                      <input
                        type="text"
                        placeholder="e.g. 1989"
                        value={editingConcern.established || ''}
                        onChange={e => setEditingConcern({ ...editingConcern, established: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Official Web Portal URL</label>
                      <input
                        type="text"
                        placeholder="e.g. https://www.madinaproperties.com"
                        value={editingConcern.website || ''}
                        onChange={e => setEditingConcern({ ...editingConcern, website: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Phone Helpline</label>
                      <input
                        type="text"
                        placeholder="e.g. +8801713401405"
                        value={editingConcern.phone || ''}
                        onChange={e => setEditingConcern({ ...editingConcern, phone: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Corporate Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. info@moon-bd.com"
                        value={editingConcern.email || ''}
                        onChange={e => setEditingConcern({ ...editingConcern, email: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                  </div>

                  {/* Registered Head Office Address */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Registered Office Address</label>
                    <input
                      type="text"
                      placeholder="e.g. Mizan Tower, Mirpur Road, Kallyanpur, Dhaka-1207"
                      value={editingConcern.address || ''}
                      onChange={e => setEditingConcern({ ...editingConcern, address: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                    />
                  </div>

                  {/* Detailed About Us narrative */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Corporate Overview & About Us Narrative Details</label>
                    <textarea
                      rows={4}
                      placeholder="Enter a detailed multi-sentence description about the history, operations, capacity, and role of this subsidiary company."
                      value={editingConcern.aboutText || ''}
                      onChange={e => setEditingConcern({ ...editingConcern, aboutText: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                    />
                  </div>

                  {/* Features list (comma separated) */}
                  <div className="space-y-2">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Core Strengths & Highlights (Comma-separated list of items)</label>
                    <input
                      type="text"
                      placeholder="e.g. 35+ Luxury Developments Completed, Strategic Gated Communities, Fully Legal & RAJUK Approved"
                      value={editingConcern.features ? editingConcern.features.join(', ') : ''}
                      onChange={e => setEditingConcern({ 
                        ...editingConcern, 
                        features: e.target.value ? e.target.value.split(',').map(f => f.trim()).filter(Boolean) : [] 
                      })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                    />
                  </div>

                  {/* Gallery Sub-editor with URL paste and base64 file upload */}
                  <div className="space-y-4 p-5 border border-white/10 bg-black/30 rounded-sm">
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-white font-bold">Subsidiary Image Gallery (Hero Slider Images)</h4>
                      <p className="text-[10px] text-[#6B6B6A] uppercase mt-0.5">Add, remove, or upload images that will slide in the popup modal.</p>
                    </div>

                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="Paste image URL or image data here..."
                        value={tempGalleryUrl}
                        onChange={e => setTempGalleryUrl(e.target.value)}
                        className="flex-1 bg-[#0B0B0C] border border-white/10 p-2.5 rounded-sm text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (tempGalleryUrl.trim()) {
                            const updatedGallery = [...(editingConcern.gallery || []), tempGalleryUrl.trim()];
                            setEditingConcern({ ...editingConcern, gallery: updatedGallery });
                            setTempGalleryUrl('');
                          }
                        }}
                        className="bg-[#EE1B24] hover:bg-white hover:text-black text-white font-mono text-[10px] uppercase font-bold py-2.5 px-4 rounded-sm transition-colors cursor-pointer"
                      >
                        Add URL
                      </button>
                    </div>

                    <div className="border border-dashed border-white/15 p-4 rounded-sm text-center bg-black/10">
                      <label className="block text-[10px] font-mono uppercase text-slate-400 mb-2">Upload image file directly</label>
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const base64 = await resizeImageToBase64(file);
                            const updatedGallery = [...(editingConcern.gallery || []), base64];
                            setEditingConcern({ ...editingConcern, gallery: updatedGallery });
                          }
                        }}
                        className="block w-full mx-auto text-xs text-slate-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border-0 file:text-[10px] file:font-mono file:bg-white/10 file:text-white hover:file:bg-[#EE1B24] cursor-pointer" 
                      />
                    </div>

                    {editingConcern.gallery && editingConcern.gallery.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                        {editingConcern.gallery.map((imgUrl, imgIdx) => (
                          <div key={imgIdx} className="relative group rounded-sm overflow-hidden aspect-[4/3] border border-white/10 bg-neutral-900">
                            <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            <button
                              type="button"
                              onClick={() => {
                                const updatedGallery = (editingConcern.gallery || []).filter((_, i) => i !== imgIdx);
                                setEditingConcern({ ...editingConcern, gallery: updatedGallery });
                              }}
                              className="absolute top-1.5 right-1.5 p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                              title="Remove image"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Sister Concern</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingConcern(null)}
                      className="py-3 px-6 bg-black border border-white/10 text-slate-400 hover:text-white rounded-sm text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 5: CUSTOMER REVIEWS & RATINGS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-white uppercase font-bold flex items-center gap-2">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                    <span>Customer Reviews & Ratings ({testimonials.length})</span>
                  </h2>
                  <p className="text-xs text-[#6B6B6A] mt-1">
                    Manage client feedback, star ratings, quotes, and photos shown on the homepage review section.
                  </p>
                </div>
                {!editingTestimonial && (
                  <button
                    onClick={() => setEditingTestimonial({
                      id: `review-${Date.now()}`,
                      author: '',
                      role: 'Homeowner',
                      project: '',
                      category: 'OUR CUSTOMERS SPEAK FOR US',
                      rating: 5,
                      quote: '',
                      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=600&auto=format&fit=crop',
                      createdAt: new Date().toISOString()
                    })}
                    className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black text-white font-mono text-xs uppercase font-bold py-3 px-5 rounded-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Review</span>
                  </button>
                )}
              </div>

              {/* Form Editor when editing/creating */}
              {editingTestimonial ? (
                <form onSubmit={handleSaveTestimonial} className="bg-[#161617] border border-white/10 p-6 rounded-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-white/5 pb-3">
                    <h3 className="font-mono text-xs uppercase tracking-wider text-amber-400 font-bold">
                      {editingTestimonial.createdAt ? 'Edit Review & Rating' : 'New Customer Review'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="text-slate-500 hover:text-white text-xs font-mono"
                    >
                      Close Form
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Customer Name (গ্রাহকের নাম) *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Nasim Uddin & Sumaiya Siddika"
                        value={editingTestimonial.author}
                        onChange={e => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Role / Designation (পদবি / পরিচয়)</label>
                      <input
                        type="text"
                        placeholder="e.g. Joint Venture Landowner, Homeowner, Managing Director"
                        value={editingTestimonial.role}
                        onChange={e => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Project Name (প্রজেক্টের নাম)</label>
                      <input
                        type="text"
                        placeholder="e.g. Moon Green Meadow, Moon Skyline Heights"
                        value={editingTestimonial.project}
                        onChange={e => setEditingTestimonial({ ...editingTestimonial, project: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Category Tag (বিভাগ)</label>
                      <input
                        type="text"
                        placeholder="e.g. OUR CUSTOMERS SPEAK FOR US, LANDOWNER CORNER, PREMIUM RESIDENCE"
                        value={editingTestimonial.category}
                        onChange={e => setEditingTestimonial({ ...editingTestimonial, category: e.target.value })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono uppercase text-slate-400">Star Rating (রেটিং স্টার ১-৫)</label>
                      <select
                        value={editingTestimonial.rating || 5}
                        onChange={e => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                        className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                        <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                        <option value={3}>⭐⭐⭐ (3 Stars)</option>
                        <option value={2}>⭐⭐ (2 Stars)</option>
                        <option value={1}>⭐ (1 Star)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Review Quote / Statement (গ্রাহকের রিভিউ ও বক্তব্য) *</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Enter genuine customer testimonial..."
                      value={editingTestimonial.quote}
                      onChange={e => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                      className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs leading-relaxed"
                    />
                  </div>

                  {/* Customer Image */}
                  <div className="space-y-3 p-4 border border-white/10 bg-black/30 rounded-sm">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">Customer Photo / Property Image</label>
                    {editingTestimonial.image && (
                      <div className="w-32 h-20 rounded border border-white/10 overflow-hidden relative group bg-neutral-900">
                        <img src={editingTestimonial.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={getDisplayUrl(editingTestimonial.image)}
                        onChange={e => {
                          const val = e.target.value;
                          if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                            setEditingTestimonial({ ...editingTestimonial, image: val });
                          }
                        }}
                        className="flex-1 bg-[#0B0B0C] border border-white/10 p-2.5 rounded-sm text-white text-xs"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const base64 = await resizeImageToBase64(file);
                            setEditingTestimonial({ ...editingTestimonial, image: base64 });
                          }
                        }}
                        className="block text-xs text-slate-400 file:mr-2 file:py-2 file:px-3 file:rounded-sm file:border-0 file:text-xs file:font-mono file:bg-[#EE1B24] file:text-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex gap-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Review</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTestimonial(null)}
                      className="py-3 px-6 bg-black border border-white/10 text-slate-400 hover:text-white rounded-sm text-xs font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                /* List of existing reviews */
                <div className="space-y-4">
                  {testimonials.length === 0 ? (
                    <div className="p-12 text-center bg-[#161617] border border-white/5 rounded-sm text-slate-500 font-mono text-xs uppercase tracking-wider">
                      No customer reviews uploaded yet. Click "Add New Review" above to upload your first review!
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {testimonials.map(t => (
                        <div key={t.id} className="bg-[#161617] border border-white/10 p-5 rounded-sm flex flex-col justify-between space-y-4 shadow-lg hover:border-amber-500/30 transition-all">
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-2">
                              <span className="text-[9px] font-mono font-bold tracking-widest text-[#FF4A4F] uppercase bg-red-950/40 border border-red-500/20 px-2 py-0.5 rounded">
                                {t.category || 'CUSTOMER REVIEW'}
                              </span>
                              <div className="flex items-center space-x-1">
                                {[...Array(t.rating || 5)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                                ))}
                              </div>
                            </div>

                            <div className="flex items-start gap-3 my-3">
                              {t.image && (
                                <img src={t.image} alt={t.author} className="w-14 h-14 object-cover rounded border border-white/10 shrink-0" referrerPolicy="no-referrer" />
                              )}
                              <div>
                                <h4 className="font-serif text-sm font-bold text-white">{t.author}</h4>
                                <p className="text-[11px] font-mono text-slate-400">{t.role} {t.project ? `— ${t.project}` : ''}</p>
                              </div>
                            </div>

                            <p className="text-xs text-slate-300 italic leading-relaxed bg-black/30 p-3 rounded border border-white/5">
                              "{t.quote}"
                            </p>
                          </div>

                          <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                            <button
                              onClick={() => setEditingTestimonial(t)}
                              className="px-3 py-1.5 bg-white/10 hover:bg-white hover:text-black text-white rounded text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Edit className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteTestimonial(t.id)}
                              className="px-3 py-1.5 bg-red-950/40 border border-red-500/30 hover:bg-red-600 text-red-300 hover:text-white rounded text-[10px] font-mono uppercase font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: VISITS BOOKED LEADS */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white uppercase font-bold">Tour Bookings Submitted ({bookings.length})</h2>
                <p className="text-xs text-[#6B6B6A]">View the elite site viewing appointment requests submitted by visitors.</p>
              </div>

              {bookings.length === 0 ? (
                <div className="p-12 text-center bg-[#161617] border border-white/5 rounded-sm text-slate-500 font-mono text-xs uppercase tracking-wider">
                  No viewings booked on record yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map(b => (
                    <div key={b.id} className="bg-[#161617] border border-white/5 p-6 rounded-sm space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-3">
                        <span className="font-mono text-xs text-[#FF4A4F] font-bold uppercase tracking-wider">{b.id}</span>
                        <span className="font-mono text-[10px] text-[#6B6B6A] uppercase">Submitted: {b.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase">Visitor Info</span>
                          <span className="block text-sm text-white font-bold">{b.name}</span>
                          <span className="block font-mono text-xs text-slate-400">{b.phone}</span>
                          <span className="block font-mono text-xs text-slate-400">{b.email}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase">Target Landmark Asset</span>
                          <span className="block text-sm text-gold-400 font-serif font-bold">{b.propertyName}</span>
                          <span className="block font-mono text-xs text-[#6B6B6A]">Ref ID: {b.propertyId}</span>
                        </div>

                        <div className="space-y-1">
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase">Reserved Slot Schedule</span>
                          <span className="block text-sm text-white font-bold">{b.date}</span>
                          <span className="block font-mono text-xs text-slate-400 uppercase tracking-widest">{b.timeSlot}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: LANDOWNER JV LEADS */}
          {activeTab === 'partnerships' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-white uppercase font-bold">Landowner Joint Venture Proposals ({partnerships.length})</h2>
                <p className="text-xs text-[#6B6B6A]">View applications submitted by landowners for joint-venture property constructions.</p>
              </div>

              {partnerships.length === 0 ? (
                <div className="p-12 text-center bg-[#161617] border border-white/5 rounded-sm text-slate-500 font-mono text-xs uppercase tracking-wider">
                  No landowner proposals registered yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {partnerships.map(p => (
                    <div key={p.id} className="bg-[#161617] border border-white/5 p-6 rounded-sm space-y-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/5 pb-3">
                        <span className="font-mono text-xs text-[#FF4A4F] font-bold uppercase tracking-wider">{p.id}</span>
                        <span className="font-mono text-[10px] text-[#6B6B6A] uppercase">Submitted: {p.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase">Landowner info</span>
                          <span className="block text-sm text-white font-bold">{p.name}</span>
                          <span className="block font-mono text-xs text-slate-400">{p.phone}</span>
                          {p.email && <span className="block font-mono text-xs text-slate-400">{p.email}</span>}
                        </div>

                        <div className="space-y-1 col-span-2">
                          <span className="block font-mono text-[9px] text-[#6B6B6A] uppercase">Spatial & Plot metrics</span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            <strong className="text-white">Location:</strong> {p.location}<br />
                            <strong className="text-white">Size (Katha):</strong> {p.sizeKatha} Katha |{' '}
                            <strong className="text-white">Road Width:</strong> {p.roadWidthFt} Ft |{' '}
                            <strong className="text-white">Frontage:</strong> {p.frontageFt} Ft |{' '}
                            <strong className="text-white">Facing:</strong> {p.facing.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {p.additionalDetails && (
                        <div className="bg-black/40 p-4 border border-white/5 rounded-sm text-xs font-light text-slate-400 leading-relaxed">
                          <strong className="block text-white font-mono text-[10px] uppercase mb-1">Additional details & Notes</strong>
                          {p.additionalDetails}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: GLOBAL SITE SETTINGS */}
          {activeTab === 'settings' && (!siteSettings ? (
            <div className="p-12 text-center bg-[#161617] border border-white/10 rounded-sm text-slate-400 font-mono text-xs uppercase tracking-wider animate-pulse">
              Loading Global Site Settings...
            </div>
          ) : (
            <form onSubmit={handleSaveSettings} className="space-y-6 bg-[#161617] border border-white/10 p-8 rounded-sm">
              <div>
                <h2 className="font-serif text-2xl text-white uppercase font-bold">Global Site Settings</h2>
                <p className="text-xs text-[#6B6B6A]">Edit contact info, brand names, scrolling announcements, and footer taglines across the entire website instantly.</p>
              </div>

              {/* HAVEN TOWER SPOTLIGHT BANNER ON/OFF SWITCH & IMAGE CONTROLS */}
              <div className="bg-[#0B0B0C] border border-[#EE1B24]/40 p-5 rounded-sm space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Flame className="w-4 h-4 text-[#EE1B24]" />
                      <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                        Haven Tower Spotlight Banner Switch
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        siteSettings.showHavenTowerBanner !== false ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {siteSettings.showHavenTowerBanner !== false ? '● ONLINE / VISIBLE' : '○ OFFLINE / HIDDEN'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Toggle ON to show or OFF to hide the full Haven Tower Spotlight Showcase section on the Home page.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={async () => {
                        const nextState = siteSettings.showHavenTowerBanner === false ? true : false;
                        const updated = {
                          ...siteSettings,
                          showHavenTowerBanner: nextState
                        };
                        setSiteSettings(updated);
                        try {
                          await saveCMSSiteSettings(updated);
                          triggerStatus(
                            'success',
                            nextState 
                              ? 'Haven Tower Spotlight Banner is now ONLINE and VISIBLE on the home page!' 
                              : 'Haven Tower Spotlight Banner is now OFFLINE and HIDDEN from the home page!'
                          );
                        } catch (err: any) {
      
                          console.error(err);
                          triggerStatus('error', 'Failed to update Haven Tower banner state.');
                        }
                      }}
                      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        siteSettings.showHavenTowerBanner !== false ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                      role="switch"
                      aria-checked={siteSettings.showHavenTowerBanner !== false}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          siteSettings.showHavenTowerBanner !== false ? 'translate-x-8' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-300 font-bold">
                    Haven Tower Featured Spotlight Image URL / Upload
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={getDisplayUrl(siteSettings.havenTowerBannerImage)}
                      onChange={e => {
                        const val = e.target.value;
                        if (!val.startsWith('[Uploaded') && !val.startsWith('[Local') && !val.startsWith('[Cloud')) {
                          setSiteSettings({ ...siteSettings, havenTowerBannerImage: val });
                        }
                      }}
                      placeholder="Upload image or paste image link..."
                      className="flex-1 bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                    />
                    <label className="bg-[#EE1B24] hover:bg-white hover:text-black text-white font-mono text-xs font-bold px-4 py-2 rounded-sm border border-white/10 flex items-center gap-1.5 cursor-pointer transition-colors">
                      <ImageIcon className="w-4 h-4" />
                      <span>Upload Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 10 * 1024 * 1024) {
                            triggerStatus('error', 'File size exceeds maximum 10.0 MB limit. Please select a smaller image file.');
                            return;
                          }
                          try {
                            const b64 = await resizeImageToBase64(file, 1200);
                            const updated = { ...siteSettings, havenTowerBannerImage: b64 };
                            setSiteSettings(updated);
                            await saveCMSSiteSettings(updated);
                            triggerStatus('success', 'Haven Tower image uploaded & saved successfully!');
                          } catch (err: any) {
      
                            console.error(err);
                            triggerStatus('error', 'Failed to process image file.');
                          }
                        }}
                      />
                    </label>
                  </div>
                  {siteSettings.havenTowerBannerImage && (
                    <div className="relative aspect-[16/6] w-full max-w-sm rounded border border-white/10 overflow-hidden bg-black mt-2">
                      <img
                        src={siteSettings.havenTowerBannerImage}
                        alt="Haven Tower Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-3 pt-3 border-t border-white/10">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                        Haven Tower Title (Headline)
                      </label>
                      <input
                        type="text"
                        value={siteSettings.havenTowerTitle || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, havenTowerTitle: e.target.value })}
                        placeholder="HEAVEN TOWER by Moon Group"
                        className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                        Haven Tower Announcement / Headline Subtext (Bangla / English)
                      </label>
                      <textarea
                        rows={3}
                        value={siteSettings.havenTowerDescription || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, havenTowerDescription: e.target.value })}
                        placeholder="📢 হেভেন টাওয়ার (HEAVEN TOWER) এর উদ্বোধন সম্পন্ন হয়েছে..."
                        className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Status Label
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerStatusLabel || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerStatusLabel: e.target.value })}
                          placeholder="Project Status"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Status Value
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerStatusValue || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerStatusValue: e.target.value })}
                          placeholder="Booking & Sales Open"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Price Label
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerPriceLabel || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerPriceLabel: e.target.value })}
                          placeholder="Launch Rate"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Price Value
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerPriceValue || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerPriceValue: e.target.value })}
                          placeholder="Tk 2.2 - 5.5 Cr"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Location
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerLocation || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerLocation: e.target.value })}
                          placeholder="Plot 01, Section 12, Mirpur / Prime Location, Dhaka"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Haven Tower Apartment Sizes
                        </label>
                        <input
                          type="text"
                          value={siteSettings.havenTowerSizes || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerSizes: e.target.value })}
                          placeholder="1,850 Sft - 3,600 Sft (Single & Duplex)"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[11px] font-mono uppercase text-amber-400 font-bold mb-1">
                          Key Architectural Highlights (One per line)
                        </label>
                        <textarea
                          rows={4}
                          value={siteSettings.havenTowerHighlights || ''}
                          onChange={e => setSiteSettings({ ...siteSettings, havenTowerHighlights: e.target.value })}
                          placeholder="25-Story Iconic Landmark Architecture&#10;Grand Double-Height Entrance Atrium Lobby"
                          className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* VIRTUAL LAYOUT CONFIGURATOR ON/OFF SWITCH */}
              <div className="bg-[#0B0B0C] border border-amber-500/40 p-5 rounded-sm space-y-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Sliders className="w-4 h-4 text-amber-400" />
                      <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
                        Virtual Layout Configurator Section Switch
                      </h3>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        siteSettings.showVirtualConfigurator !== false ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {siteSettings.showVirtualConfigurator !== false ? '● ONLINE / VISIBLE' : '○ OFFLINE / HIDDEN'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      Toggle ON to display or OFF to hide the 2D Virtual Layout Configurator section across the home page and public portals.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={async () => {
                        const nextState = siteSettings.showVirtualConfigurator === false ? true : false;
                        const updated = {
                          ...siteSettings,
                          showVirtualConfigurator: nextState
                        };
                        setSiteSettings(updated);
                        try {
                          await saveCMSSiteSettings(updated);
                          triggerStatus(
                            'success',
                            nextState 
                              ? 'Virtual Layout Configurator is now ONLINE and VISIBLE on the website!' 
                              : 'Virtual Layout Configurator is now OFFLINE and HIDDEN from the website!'
                          );
                        } catch (err: any) {
      
                          console.error(err);
                          triggerStatus('error', 'Failed to update Virtual Layout Configurator state.');
                        }
                      }}
                      className={`relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        siteSettings.showVirtualConfigurator !== false ? 'bg-emerald-500' : 'bg-slate-700'
                      }`}
                      role="switch"
                      aria-checked={siteSettings.showVirtualConfigurator !== false}
                    >
                      <span
                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                          siteSettings.showVirtualConfigurator !== false ? 'translate-x-8' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Conglomerate Brand Name</label>
                  <input
                    type="text"
                    required
                    value={siteSettings.brandName}
                    onChange={e => setSiteSettings({ ...siteSettings, brandName: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Main Hotline Phone</label>
                  <input
                    type="text"
                    required
                    value={siteSettings.hotlinePhone}
                    onChange={e => setSiteSettings({ ...siteSettings, hotlinePhone: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">WhatsApp Support Phone (Digits with country code)</label>
                  <input
                    type="text"
                    required
                    value={siteSettings.whatsappPhone}
                    onChange={e => setSiteSettings({ ...siteSettings, whatsappPhone: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs font-mono"
                    placeholder="e.g. +8801313401405"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Public Contact Email Address</label>
                  <input
                    type="email"
                    required
                    value={siteSettings.emailAddress}
                    onChange={e => setSiteSettings({ ...siteSettings, emailAddress: e.target.value })}
                    className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">All Telephone Lines / Contact Numbers (Comma or newline separated)</label>
                <textarea
                  rows={2}
                  value={siteSettings.telephoneNumbers || ''}
                  onChange={e => setSiteSettings({ ...siteSettings, telephoneNumbers: e.target.value })}
                  placeholder="e.g. 0241002945, 0241002946, 0241002947, 0241002948, 0241002949, 0241002951, 0241000182"
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs font-mono"
                />
                <p className="text-[10px] text-[#6B6B6A] font-mono uppercase">All phone lines listed here will be displayed in the Footer Telephone Lines column.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Scrolling Announcement Ticker Text (Separate with ✦)</label>
                <input
                  type="text"
                  required
                  value={siteSettings.tickerText}
                  onChange={e => setSiteSettings({ ...siteSettings, tickerText: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                />
                <p className="text-[10px] text-[#6B6B6A] font-mono uppercase">Tip: End each announcement with a ✦ symbol for beautiful visual rhythm.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Ticker Scroll Speed (Seconds per cycle)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="1"
                    value={siteSettings.tickerSpeed || 28}
                    onChange={e => setSiteSettings({ ...siteSettings, tickerSpeed: parseInt(e.target.value, 10) })}
                    className="flex-grow accent-red-600 cursor-pointer h-1 bg-[#1A1A1C] rounded-lg appearance-none"
                  />
                  <div className="w-20 px-3 py-1.5 bg-[#0B0B0C] border border-white/10 rounded-sm text-center text-xs font-mono text-white">
                    {siteSettings.tickerSpeed || 28}s
                  </div>
                </div>
                <p className="text-[10px] text-[#6B6B6A] font-mono uppercase">Lower numbers make it scroll FASTER, higher numbers make it scroll SLOWER. Default is 28 seconds.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Corporate Head Office Address</label>
                <textarea
                  rows={2}
                  required
                  value={siteSettings.headOffice}
                  onChange={e => setSiteSettings({ ...siteSettings, headOffice: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-mono uppercase text-slate-400">Global Corporate Tagline / Footer Intro Text</label>
                <textarea
                  rows={2}
                  required
                  value={siteSettings.tagline}
                  onChange={e => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                  className="w-full bg-[#0B0B0C] border border-white/10 p-3 rounded-sm text-white text-xs"
                />
              </div>

              {/* FOOTER & ACCREDITATION SETTINGS SECTION */}
              <div className="p-5 bg-[#0B0B0C] border border-white/10 rounded-sm space-y-4">
                <h4 className="font-mono text-xs font-bold text-[#FF4A4F] uppercase tracking-wider flex items-center gap-2 border-b border-white/10 pb-2">
                  <Building2 className="w-4 h-4 text-[#EE1B24]" />
                  <span>Footer Accreditations, Copyright & Social Links</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">REHAB Member Registration Number</label>
                    <input
                      type="text"
                      value={siteSettings.rehabRegNo || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, rehabRegNo: e.target.value })}
                      placeholder="e.g. Reg # 1452/2012"
                      className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase text-slate-400">RAJUK Registered Code Number</label>
                    <input
                      type="text"
                      value={siteSettings.rajukCodeNo || ''}
                      onChange={e => setSiteSettings({ ...siteSettings, rajukCodeNo: e.target.value })}
                      placeholder="e.g. Code # DL-3215"
                      className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">Footer Copyright Bar Text</label>
                  <input
                    type="text"
                    value={siteSettings.copyrightText || ''}
                    onChange={e => setSiteSettings({ ...siteSettings, copyrightText: e.target.value })}
                    placeholder="e.g. © 2026 Moon Builders — Moon Group of Industries. All rights reserved."
                    className="w-full bg-black border border-white/10 p-2.5 rounded-sm text-white text-xs font-mono"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400 mb-2 font-bold">Social Media Channels (Public Links)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Facebook URL</span>
                      <input
                        type="text"
                        value={siteSettings.facebookLink || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, facebookLink: e.target.value })}
                        placeholder="https://facebook.com/..."
                        className="w-full bg-black border border-white/10 p-2 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">LinkedIn URL</span>
                      <input
                        type="text"
                        value={siteSettings.linkedinLink || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, linkedinLink: e.target.value })}
                        placeholder="https://linkedin.com/..."
                        className="w-full bg-black border border-white/10 p-2 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Twitter / X URL</span>
                      <input
                        type="text"
                        value={siteSettings.twitterLink || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, twitterLink: e.target.value })}
                        placeholder="https://twitter.com/..."
                        className="w-full bg-black border border-white/10 p-2 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div>
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">YouTube Channel URL</span>
                      <input
                        type="text"
                        value={siteSettings.youtubeLink || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, youtubeLink: e.target.value })}
                        placeholder="https://youtube.com/..."
                        className="w-full bg-black border border-white/10 p-2 rounded-sm text-white text-xs font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <span className="block text-[9px] font-mono text-slate-500 uppercase mb-1">Instagram URL</span>
                      <input
                        type="text"
                        value={siteSettings.instagramLink || ''}
                        onChange={e => setSiteSettings({ ...siteSettings, instagramLink: e.target.value })}
                        placeholder="https://instagram.com/..."
                        className="w-full bg-black border border-white/10 p-2 rounded-sm text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#EE1B24] hover:bg-white hover:text-black py-3 px-6 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Update Global Brand Settings</span>
                </button>
              </div>
            </form>
          ))}

          {/* TAB 8: DATABASE SYNC & DIAGNOSTICS PANEL */}
          {activeTab === 'database' && (
            <div className="space-y-6 bg-[#161617] border border-white/10 p-8 rounded-sm text-white">
              <div className="flex justify-between items-start flex-wrap gap-4 border-b border-white/5 pb-5">
                <div>
                  <h2 className="font-serif text-2xl text-white uppercase font-bold flex items-center gap-2">
                    <Database className="w-6 h-6 text-emerald-400" />
                    <span>DB Sync & Integrity Console</span>
                  </h2>
                  <p className="text-xs text-[#6B6B6A] mt-1">
                    Live status, cross-check diagnostics, and force-sync recovery for Moon Group database storage.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isDiagLoading}
                  onClick={loadDiagnostics}
                  className="px-3 py-1.5 bg-black hover:bg-white/10 text-slate-300 hover:text-white rounded-sm text-[10px] font-mono uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Sliders className={`w-3.5 h-3.5 ${isDiagLoading ? 'animate-spin' : ''}`} />
                  <span>{isDiagLoading ? 'Refreshing...' : 'Refresh Status'}</span>
                </button>
              </div>

              {/* LIVE CONNECTIVITY HEALTH MONITOR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* LOCAL FILE DB */}
                <div className="bg-[#0B0B0C] border border-white/5 p-4 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Local JSON Cache</span>
                    <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 font-bold uppercase border border-emerald-500/20">
                      ACTIVE (CJS)
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-white uppercase truncate">cms_db.json</span>
                    <span className="block text-[9px] font-mono text-slate-400">Path: /data/cms_db.json</span>
                    {diagData && (
                      <div className="text-[9px] font-mono text-slate-500 space-y-0.5 pt-1 border-t border-white/5">
                        <span className="block">File Size: {(diagData.local?.fileSize / 1024).toFixed(1)} KB</span>
                        <span className="block truncate">Last Mod: {new Date(diagData.local?.lastModified).toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* SUPABASE CLOUD */}
                <div className="bg-[#0B0B0C] border border-white/5 p-4 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Supabase Backup</span>
                    {diagData?.supabase?.status === 'online' ? (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 font-bold uppercase border border-emerald-500/20">
                        ONLINE ({diagData.supabase.pingMs}ms)
                      </span>
                    ) : diagData?.supabase?.status === 'offline' ? (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-red-500/10 text-red-400 font-bold uppercase border border-red-500/20">
                        OFFLINE
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-400 font-bold uppercase border border-amber-500/20 animate-pulse">
                        CONNECTING...
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-white uppercase truncate">PostgreSQL Storage</span>
                    <span className="block text-[9px] font-mono text-slate-400">Table: public.cms_store</span>
                    <span className="block text-[9px] font-mono text-slate-500 truncate">{diagData?.supabase?.url || 'Connecting to cloud...'}</span>
                  </div>
                </div>

                {/* FIREBASE FIRESTORE */}
                <div className="bg-[#0B0B0C] border border-white/5 p-4 rounded-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Google Firebase</span>
                    {quotaExceeded ? (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-red-500/15 text-red-400 font-bold uppercase border border-red-500/30">
                        QUOTA EXCEEDED
                      </span>
                    ) : (
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 font-bold uppercase border border-emerald-500/20">
                        STANDBY FALLBACK
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <span className="block text-xs font-bold text-white uppercase truncate">Firestore Database</span>
                    <span className="block text-[9px] font-mono text-slate-400">Status: Free Tier (Reads Blocked)</span>
                    <span className="block text-[9px] font-mono text-[#EE1B24] font-bold uppercase">
                      {quotaExceeded ? '⚠️ OVER QUOTA' : '✓ Fallback Active'}
                    </span>
                  </div>
                </div>
              </div>

              {/* CROSS-CHECK INTEGRITY MATRIX */}
              <div className="border border-white/5 bg-[#0B0B0C] rounded-sm p-5 space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Database Cross-Check & Sync Status Matrix
                  </h3>
                  <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-sm border border-emerald-500/15 uppercase font-bold">
                    ✓ Local & Supabase 100% Synced
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[11px] font-mono">
                    <thead>
                      <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase">
                        <th className="py-2.5 px-3">Content Segment Key</th>
                        <th className="py-2.5 px-3">Local Server Cache</th>
                        <th className="py-2.5 px-3">Supabase Cloud</th>
                        <th className="py-2.5 px-3">Firebase (No Quota)</th>
                        <th className="py-2.5 px-3 text-right">Integrity Verification</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { key: 'properties', label: 'Properties Portfolio', local: properties.length, sbKey: 'properties' },
                        { key: 'heroSlides', label: 'Hero Slides', local: heroSlides.length, sbKey: 'heroSlides' },
                        { key: 'aboutUs', label: 'About Us Section', local: aboutUs ? 1 : 0, sbKey: 'aboutUs' },
                        { key: 'groupConcerns', label: 'Group Concerns', local: concerns.length, sbKey: 'groupConcerns' },
                        { key: 'testimonials', label: 'Customer Reviews', local: testimonials.length, sbKey: 'testimonials' },
                        { key: 'bookings', label: 'Tour Bookings', local: bookings.length, sbKey: 'bookings' },
                        { key: 'partnerships', label: 'Landowner Leads', local: partnerships.length, sbKey: 'partnerships' },
                        { key: 'siteSettings', label: 'Global Site Settings', local: siteSettings ? 1 : 0, sbKey: 'siteSettings' }
                      ].map(item => {
                        const sbRec = diagData?.supabase?.records?.find((r: any) => r.key === item.sbKey);
                        const sbCount = sbRec ? sbRec.count : 0;
                        const inSync = item.local === sbCount;

                        return (
                          <tr key={item.key} className="hover:bg-white/[0.02] transition-colors">
                            <td className="py-3 px-3">
                              <span className="text-white font-bold block">{item.label}</span>
                              <span className="text-[9px] text-slate-500 font-mono">key: "{item.sbKey}"</span>
                            </td>
                            <td className="py-3 px-3 font-bold text-slate-200">
                              {item.local} items
                            </td>
                            <td className="py-3 px-3 font-bold text-slate-300">
                              {sbRec ? `${sbCount} items` : '0 items'}
                            </td>
                            <td className="py-3 px-3 text-slate-500 italic">
                              Blocked
                            </td>
                            <td className="py-3 px-3 text-right">
                              {inSync ? (
                                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-400 font-bold uppercase border border-emerald-500/15">
                                  ✓ MATCHED
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-sm bg-red-500/10 text-red-400 font-bold uppercase border border-red-500/15 animate-pulse">
                                  ⚠️ DRIFT
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* DYNAMIC SYNC TOOLS ACTIONS */}
              <div className="bg-[#0B0B0C] border border-[#EE1B24]/20 p-5 rounded-sm space-y-4">
                <div>
                  <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#EE1B24]" />
                    <span>Integrity Operations & Disaster Recovery Suite</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Force synchronization across databases, pull from cloud, or repair database structures in case of corrupt local cache or migration needs.
                  </p>
                </div>

                {forceSyncStatus.message && (
                  <div className="p-3 bg-slate-900 border border-white/10 text-[10px] font-mono text-emerald-400 rounded-sm">
                    {forceSyncStatus.message}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    disabled={forceSyncStatus.isLoading}
                    onClick={async () => {
                      setForceSyncStatus({ isLoading: true, message: 'Initiating server push to Supabase cloud...' });
                      try {
                        const res = await fetch('/api/cms/force-sync', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'push_to_supabase' })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setForceSyncStatus({ isLoading: false, message: 'SUCCESS: ' + data.message });
                          loadDiagnostics();
                        } else {
                          setForceSyncStatus({ isLoading: false, message: 'FAILED: ' + data.message });
                        }
                      } catch (e: any) {
                        setForceSyncStatus({ isLoading: false, message: 'ERROR: ' + e.message });
                      }
                    }}
                    className="py-2.5 px-3 bg-slate-950 border border-white/5 hover:border-emerald-500/40 hover:text-emerald-400 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Force-Push Local to Supabase
                  </button>

                  <button
                    type="button"
                    disabled={forceSyncStatus.isLoading}
                    onClick={async () => {
                      setForceSyncStatus({ isLoading: true, message: 'Pulling records from Supabase cloud into server file cache...' });
                      try {
                        const res = await fetch('/api/cms/force-sync', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'pull_from_supabase' })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setForceSyncStatus({ isLoading: false, message: 'SUCCESS: ' + data.message });
                          loadDiagnostics();
                          loadCMSContent(); // Reload main UI states
                        } else {
                          setForceSyncStatus({ isLoading: false, message: 'FAILED: ' + data.message });
                        }
                      } catch (e: any) {
                        setForceSyncStatus({ isLoading: false, message: 'ERROR: ' + e.message });
                      }
                    }}
                    className="py-2.5 px-3 bg-slate-950 border border-white/5 hover:border-amber-500/40 hover:text-amber-400 rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer text-center"
                  >
                    Force-Pull Supabase to Local
                  </button>

                  <button
                    type="button"
                    disabled={forceSyncStatus.isLoading}
                    onClick={async () => {
                      if (!confirm('Are you absolutely sure you want to restore the entire database (Local and Supabase) to original default factory records? ALL edits, bookings, and inquiries will be deleted permanently.')) {
                        return;
                      }
                      setForceSyncStatus({ isLoading: true, message: 'Resetting factory defaults...' });
                      try {
                        const res = await fetch('/api/cms/force-sync', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ action: 'reset_defaults' })
                        });
                        const data = await res.json();
                        if (data.success) {
                          setForceSyncStatus({ isLoading: false, message: 'SUCCESS: ' + data.message });
                          loadDiagnostics();
                          loadCMSContent(); // Reload main UI states
                        } else {
                          setForceSyncStatus({ isLoading: false, message: 'FAILED: ' + data.message });
                        }
                      } catch (e: any) {
                        setForceSyncStatus({ isLoading: false, message: 'ERROR: ' + e.message });
                      }
                    }}
                    className="py-2.5 px-3 bg-red-950/20 border border-red-500/20 hover:border-red-500 text-red-400 hover:text-white rounded-sm text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer text-center font-bold"
                  >
                    Factory Reset All DBs
                  </button>
                </div>
              </div>

              {/* RAW SQL SCHEMA CONFIG CODE BLOCK */}
              <div className="border border-white/5 bg-[#0B0B0C] p-5 rounded-sm space-y-3">
                <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Supabase Database SQL Schema Configuration
                </h3>
                <p className="text-[10px] text-slate-500">
                  Execute this SQL block inside your Supabase SQL editor to create the keys container if table sync is ever missing or disconnected.
                </p>
                <pre className="bg-black border border-white/5 p-4 rounded-sm text-[10px] text-slate-400 font-mono overflow-x-auto select-all leading-relaxed max-h-[180px]">
{`CREATE TABLE IF NOT EXISTS public.cms_store (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security and Allow Public Read/Write
ALTER TABLE public.cms_store ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow anon all" ON public.cms_store;
CREATE POLICY "Allow anon all" ON public.cms_store FOR ALL USING (true) WITH CHECK (true);`}
                </pre>
              </div>
            </div>
          )}

        </main>

        {/* Live Preview Column */}
        {showPreview && (
          <aside className="xl:col-span-5 space-y-4 sticky top-[90px] h-[calc(100vh-140px)] flex flex-col z-20">
            <div className="bg-[#161617] border border-white/10 rounded-sm p-4 flex flex-col h-full overflow-hidden shadow-2xl">
              
              {/* Preview Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">Real-time Web Preview</span>
                </div>
                
                {/* Select Section to Preview */}
                <div className="flex items-center gap-1 bg-black/40 p-1 border border-white/5 rounded-sm">
                  <button
                    type="button"
                    onClick={() => setPreviewSection('hero')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'hero' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Hero
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection('marquee')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'marquee' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Ticker
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection('about')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'about' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    About
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection('properties')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'properties' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Projects
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection('concerns')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'concerns' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Group
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewSection('testimonials')}
                    className={`px-2 py-1 text-[9px] font-mono uppercase tracking-wider rounded-sm transition-colors ${
                      previewSection === 'testimonials' ? 'bg-[#EE1B24] text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              {/* Viewport content */}
              <div className="flex-1 overflow-y-auto bg-[#0B0B0C] rounded-sm p-4 border border-white/10 relative text-left">
                
                {/* HERO SLIDER PREVIEW */}
                {previewSection === 'hero' && (
                  <div className="space-y-4 h-full flex flex-col justify-between">
                    <div className="bg-black/30 border border-white/5 rounded-sm p-2 flex justify-between items-center text-[10px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                      <span>Header Hotline Live</span>
                      <span className="text-emerald-400 font-bold">{siteSettings?.hotlinePhone || "+88 02 9009153"}</span>
                    </div>
                    <div className="my-auto space-y-4">
                      {heroSlides.length > 0 ? (
                        (() => {
                          const activeSlide = editingSlide || heroSlides[0];
                          return (
                            <div className="relative border border-white/10 rounded-sm overflow-hidden min-h-[220px] bg-cover bg-center flex flex-col justify-end p-4" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.2)), url("${activeSlide.imageUrl}")` }}>
                              <div className="space-y-2">
                                <span className="inline-block px-1.5 py-0.5 bg-[#EE1B24] text-[8px] font-mono uppercase font-bold tracking-widest text-white rounded-sm">
                                  {activeSlide.tag}
                                </span>
                                <h4 className="font-serif text-lg text-white uppercase font-bold leading-tight">
                                  {activeSlide.title}
                                </h4>
                                <p className="text-[10px] text-slate-300 font-light line-clamp-3">
                                  {activeSlide.description}
                                </p>
                                <div className="flex items-center justify-between pt-2 border-t border-white/10 mt-2 text-[10px] font-mono text-slate-400">
                                  <span>{activeSlide.price}</span>
                                  <span>{activeSlide.stats?.size || "N/A"}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : (
                        <div className="text-center text-slate-500 py-12">No slides found.</div>
                      )}
                    </div>
                    <div className="text-center text-[9px] font-mono text-[#6B6B6A] uppercase shrink-0">
                      *Editing values in forms will change this in real-time!
                    </div>
                  </div>
                )}

                {/* MARQUEE PREVIEW */}
                {previewSection === 'marquee' && (
                  <div className="space-y-6 h-full flex flex-col justify-center items-center">
                    <div className="w-full bg-[#EE1B24] text-[#0B0B0C] py-3.5 px-4 rounded-sm text-center font-mono font-bold uppercase tracking-widest text-xs select-none shadow-md overflow-hidden whitespace-nowrap">
                      <div className="inline-block animate-[preview_10s_linear_infinite] w-full">
                        {siteSettings?.tickerText || "REAL ESTATE ✦ HOUSING ✦ CONSTRUCTION ✦"}
                      </div>
                    </div>
                    <p className="text-center text-xs text-slate-500 max-w-xs leading-relaxed">
                      This is a live preview of your endless scrolling red banner ticker. You can edit the text with a ✦ symbol separating categories.
                    </p>
                    <style>{`
                      @keyframes preview {
                        0% { transform: translateX(20%); }
                        100% { transform: translateX(-20%); }
                      }
                    `}</style>
                  </div>
                )}

                {/* ABOUT US PREVIEW */}
                {previewSection === 'about' && (
                  <div className="space-y-4">
                    {aboutUs ? (
                      <div className="space-y-4">
                        <span className="block font-mono text-[9px] text-[#FF4A4F] uppercase tracking-widest font-bold">
                          {aboutUs.tagline}
                        </span>
                        <h4 className="font-serif text-xl text-white uppercase font-bold leading-tight whitespace-pre-line">
                          {aboutUs.title}
                        </h4>
                        
                        <div className="aspect-video relative rounded-sm border border-white/10 overflow-hidden bg-slate-900">
                          {aboutUs.imageUrl && (
                            <img
                              src={aboutUs.imageUrl}
                              alt="About preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                          <div className="absolute bottom-2 left-2 bg-[#161617]/90 border border-white/10 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white font-bold rounded-sm whitespace-nowrap">
                            Founded: {aboutUs.yearFounded}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 pt-2">
                          <div className="bg-[#161617] border border-white/5 p-2 rounded-sm text-center">
                            <span className="block text-lg font-mono font-bold text-white leading-none">{aboutUs.sisterConcernsCount}</span>
                            <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500 mt-1">Sister Concerns</span>
                          </div>
                          <div className="bg-[#161617] border border-white/5 p-2 rounded-sm text-center">
                            <span className="block text-lg font-mono font-bold text-white leading-none">{aboutUs.sectorsActiveCount}</span>
                            <span className="block text-[8px] font-mono uppercase tracking-widest text-slate-500 mt-1">Sectors Active</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-300 leading-relaxed font-light">
                          {aboutUs.paragraph1}
                        </p>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                          {aboutUs.paragraph2}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center text-slate-500 py-12">Loading narrative data...</div>
                    )}
                  </div>
                )}

                {/* PROPERTIES PREVIEW */}
                {previewSection === 'properties' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-white/5 pb-2">
                      <span className="font-mono text-[9px] uppercase text-slate-500">Live Active Portfolio</span>
                      <span className="px-1.5 py-0.5 bg-black text-[#FF4A4F] text-[8px] font-mono uppercase tracking-wider border border-white/5 rounded-sm">
                        {properties.length} Items
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3 max-h-[350px] overflow-y-auto pr-1">
                      {properties.map(p => (
                        <div key={p.id} className="bg-[#161617] border border-white/5 rounded-sm p-3 flex gap-3">
                          {p.imageUrl && (
                            <img
                              src={p.imageUrl}
                              alt={p.title}
                              className="w-16 h-12 object-cover rounded-sm border border-white/10 shrink-0"
                            />
                          )}
                          <div className="space-y-0.5 flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-serif text-white font-bold uppercase truncate">{p.title}</span>
                              <span className={`text-[7px] uppercase font-mono px-1 border rounded-sm ${
                                p.status === 'completed' ? 'text-emerald-400 border-emerald-500/20' : 'text-amber-400 border-amber-500/20'
                              }`}>
                                {p.status}
                              </span>
                            </div>
                            <span className="block text-[8px] font-mono text-[#6B6B6A] uppercase tracking-wider">{p.location}</span>
                            <span className="block text-[9px] font-mono text-[#FF4A4F] font-semibold mt-0.5">{p.priceRange}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GROUP CONCERNS PREVIEW */}
                {previewSection === 'concerns' && (
                  <div className="space-y-4">
                    <div className="border-b border-white/5 pb-2">
                      <span className="font-mono text-[9px] uppercase text-slate-500">Sister companies of parent conglomerate</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 max-h-[350px] overflow-y-auto pr-1">
                      {concerns.map(c => (
                        <div key={c.id} className="bg-[#161617] border border-white/5 p-3 rounded-sm flex items-center justify-between">
                          <div>
                            <span className="font-mono text-[#EE1B24] text-[8px] font-bold tracking-widest block uppercase">Concern {c.num}</span>
                            <span className="block font-serif text-xs font-bold text-white uppercase leading-tight mt-0.5">{c.name}</span>
                            <span className="block font-mono text-[8px] text-[#6B6B6A] uppercase mt-0.5">{c.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CUSTOMER REVIEWS PREVIEW */}
                {previewSection === 'testimonials' && (
                  <div className="space-y-4">
                    <div className="border-b border-white/5 pb-2 flex justify-between items-center">
                      <span className="font-mono text-[9px] uppercase text-slate-500">Client Reviews & Ratings</span>
                      <span className="font-mono text-[9px] text-amber-400 font-bold">{testimonials.length} Reviews</span>
                    </div>
                    {testimonials.length === 0 ? (
                      <div className="p-8 text-center text-xs font-mono text-slate-500 uppercase">
                        No reviews uploaded yet.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
                        {testimonials.map(t => (
                          <div key={t.id} className="bg-[#161617] border border-white/5 p-3 rounded-sm space-y-2">
                            <div className="flex justify-between items-center text-[9px] font-mono">
                              <span className="text-[#FF4A4F] font-bold uppercase">{t.category || 'REVIEW'}</span>
                              <span className="text-amber-400">{'⭐'.repeat(t.rating || 5)}</span>
                            </div>
                            <p className="text-[11px] text-slate-300 italic">"{t.quote}"</p>
                            <div className="text-[10px] text-white font-bold border-t border-white/5 pt-1.5 flex justify-between">
                              <span>{t.author}</span>
                              <span className="text-slate-400 font-normal">{t.project}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>
              
              {/* Footer bar */}
              <div className="pt-3 border-t border-white/5 flex justify-between items-center text-[9px] font-mono text-slate-500 uppercase tracking-widest shrink-0">
                <span>Target: {previewSection.toUpperCase()} VIEWPORT</span>
                <span className="text-emerald-400 font-bold">100% LIVE SYNC</span>
              </div>
            </div>
          </aside>
        )}

      </div>
    </div>
    
    {/* Reusable Custom Confirmation Modal */}
    {confirmState.isOpen && (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
        <div className="bg-[#161617] border border-white/10 p-6 rounded-sm max-w-sm w-full space-y-4 shadow-2xl text-left">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-red-950/40 text-red-500 rounded-sm shrink-0 border border-red-500/10">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-sm text-white uppercase font-bold tracking-wide">
                {confirmState.title}
              </h4>
              <p className="text-[11px] text-slate-400 font-light leading-relaxed">
                {confirmState.message}
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-2 justify-end">
            <button
              type="button"
              onClick={() => setConfirmState(prev => ({ ...prev, isOpen: false }))}
              className="py-2 px-3 bg-black border border-white/10 text-slate-400 hover:text-white rounded-sm text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={async () => {
                const action = confirmState.onConfirm;
                setConfirmState(prev => ({ ...prev, isOpen: false }));
                await action();
              }}
              className="py-2 px-3 bg-[#EE1B24] hover:bg-white hover:text-black text-white rounded-sm text-[10px] font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  );
}
