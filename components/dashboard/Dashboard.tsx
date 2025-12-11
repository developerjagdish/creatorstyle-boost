import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FileText,
  Palette,
  Zap,
  History,
  Search,
  Bell,
  Moon,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  TrendingUp,
  Clock,
  Calendar,
  AlertCircle,
  Save,
  Mail,
  Copy,
  Check,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { db, generateBoost, StyleProfile } from '@/lib/supabase';

// Sidebar navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'scripts', label: 'Scripts', icon: FileText },
  { id: 'style-profile', label: 'Style Profile', icon: Palette },
  { id: 'daily-boost', label: 'Daily Boost', icon: Zap },
  { id: 'history', label: 'History', icon: History },
];

// Sidebar Component
const Sidebar = ({ 
  activeSection, 
  setActiveSection,
  isOpen,
  setIsOpen
}: { 
  activeSection: string; 
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 bg-zinc-950 border-r border-zinc-800/50 z-50 flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="p-6 border-b border-zinc-800/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CreatorJoy</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-cyan-500/30" 
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-cyan-400")} />
                {item.label}
                {item.id === 'daily-boost' && (
                  <span className="ml-auto bg-cyan-500 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
                    New
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="p-4 border-t border-zinc-800/50">
        </div>
      </aside>
    </>
  );
};

// Header Component
const Header = ({ 
  activeSection,
  setIsOpen 
}: { 
  activeSection: string;
  setIsOpen: (open: boolean) => void;
}) => {
  const sectionTitles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'scripts': 'Scripts',
    'style-profile': 'Style Profile',
    'daily-boost': 'Daily Boost',
    'history': 'History',
  };

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <button 
        className="lg:hidden p-2 text-zinc-400 hover:text-white"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button className="p-2 text-zinc-400 hover:text-white transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-zinc-800">
          <span className="hidden sm:block text-sm text-zinc-400">
            Hello, <span className="text-white font-medium">User</span>
          </span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">U</span>
          </div>
        </div>
      </div>
    </header>
  );
};

// Section Components (Empty placeholders)
const DashboardSection = () => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedBoost, setGeneratedBoost] = useState<{
    idea: string;
    script: string;
    cta: string;
  } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Supabase data states
  const [styleProfiles, setStyleProfiles] = useState<StyleProfile[]>([]);
  const [stats, setStats] = useState({
    totalStyles: 0,
    lastBoost: 'Never',
    boostsThisWeek: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch all data in parallel
        const [styles, stylesCount, lastBoost, boostsThisWeek] = await Promise.all([
          db.styles.getAll(),
          db.styles.count(),
          db.boostHistory.getLastBoost().catch(() => null),
          db.boostHistory.getBoostsThisWeek(),
        ]);

        setStyleProfiles(styles);
        
        // Format last boost time
        let lastBoostText = 'Never';
        if (lastBoost?.generated_at) {
          const date = new Date(lastBoost.generated_at);
          const now = new Date();
          const diffMs = now.getTime() - date.getTime();
          const diffMins = Math.floor(diffMs / 60000);
          const diffHours = Math.floor(diffMs / 3600000);
          const diffDays = Math.floor(diffMs / 86400000);

          if (diffMins < 1) lastBoostText = 'Just now';
          else if (diffMins < 60) lastBoostText = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
          else if (diffHours < 24) lastBoostText = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
          else lastBoostText = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        }

        setStats({
          totalStyles: stylesCount,
          lastBoost: lastBoostText,
          boostsThisWeek,
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [generatedBoost]); // Refetch when a new boost is generated

  const handleGenerate = async () => {
    if (!selectedStyle) return;
    
    setIsGenerating(true);
    setGeneratedBoost(null);
    setError(null);

    try {
      // Find the selected style profile
      const style = styleProfiles.find(s => s.id === selectedStyle);
      if (!style) {
        throw new Error('Style profile not found');
      }

      // Call the webhook with 60 second timeout
      const result = await generateBoost(style, 60000);
      
      setGeneratedBoost({
        idea: result.idea,
        script: result.script,
        cta: result.cta,
      });
    } catch (err: any) {
      console.error('Error generating boost:', err);
      setError(err.message || 'An error occurred while generating the boost. It may be saved to history automatically.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const hasStyleProfiles = styleProfiles.length > 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Creator</h1>
        <p className="text-zinc-400">Your personalized style profiles and daily boost generator.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Styles */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Palette className="w-5 h-5 text-purple-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {isLoading ? <span className="animate-pulse">...</span> : stats.totalStyles}
          </p>
          <p className="text-sm text-zinc-500">Total Styles Created</p>
        </div>

        {/* Last Boost */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {isLoading ? <span className="animate-pulse">...</span> : stats.lastBoost}
          </p>
          <p className="text-sm text-zinc-500">Last Boost Generated</p>
        </div>

        {/* Boosts This Week */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white mb-1">
            {isLoading ? <span className="animate-pulse">...</span> : stats.boostsThisWeek}
          </p>
          <p className="text-sm text-zinc-500">Boosts This Week</p>
        </div>
      </div>

      {/* Boost Generator Section */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Boost Generator</h2>
            <p className="text-sm text-zinc-400">Generate content ideas in your unique style</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        ) : !hasStyleProfiles ? (
          /* No Style Profile Warning */
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-200 font-medium">Create a style profile first</p>
              <p className="text-amber-200/70 text-sm mt-1">
                You need at least one style profile to generate boosts. Head over to the Style Profile section to create one.
              </p>
            </div>
          </div>
        ) : (
          /* Generator Form */
          <div className="space-y-4">
            {/* Style Selector */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Select Style Profile
              </label>
              <div className="relative">
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white appearance-none cursor-pointer focus:outline-none focus:border-cyan-500/50 transition-colors"
                >
                  <option value="">Choose a style profile...</option>
                  {styleProfiles.map((style) => (
                    <option key={style.id} value={style.id}>
                      {style.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedStyle || isGenerating}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300",
                selectedStyle && !isGenerating
                  ? "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]"
                  : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              )}
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Boost
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-200 font-medium">Error generating boost</p>
            <p className="text-red-200/70 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Generated Boost Result */}
      {generatedBoost && (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Your Generated Boost
            </h3>
            <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 text-sm font-medium rounded-lg">
              <Check className="w-4 h-4" />
              Auto-saved to History
            </span>
          </div>

          {/* Idea */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wide">Idea</label>
              <button
                onClick={() => handleCopy('idea', generatedBoost.idea)}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                {copiedField === 'idea' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
              <p className="text-white font-medium">{generatedBoost.idea}</p>
            </div>
          </div>

          {/* Script */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wide">Script</label>
              <button
                onClick={() => handleCopy('script', generatedBoost.script)}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                {copiedField === 'script' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
              <p className="text-zinc-300 whitespace-pre-line leading-relaxed">{generatedBoost.script}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-zinc-400 uppercase tracking-wide">Call to Action</label>
              <button
                onClick={() => handleCopy('cta', generatedBoost.cta)}
                className="text-zinc-500 hover:text-white transition-colors p-1"
              >
                {copiedField === 'cta' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
              <p className="text-cyan-100">{generatedBoost.cta}</p>
            </div>
          </div>

          {/* Webhook Note */}
          <div className="flex items-center gap-2 text-zinc-500 text-sm pt-2 border-t border-zinc-800">
            <Mail className="w-4 h-4" />
            <span>Email sent via webhook → n8n</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ScriptsSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-6">Scripts</h2>
    {/* Scripts content will go here */}
  </div>
);

const StyleProfileSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-6">Style Profile</h2>
    {/* Style Profile content will go here */}
  </div>
);

const DailyBoostSection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-6">Daily Boost</h2>
    {/* Daily Boost content will go here */}
  </div>
);

const HistorySection = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-white mb-6">History</h2>
    {/* History content will go here */}
  </div>
);

// Main Dashboard Component
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection />;
      case 'scripts':
        return <ScriptsSection />;
      case 'style-profile':
        return <StyleProfileSection />;
      case 'daily-boost':
        return <DailyBoostSection />;
      case 'history':
        return <HistorySection />;
      default:
        return <DashboardSection />;
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header activeSection={activeSection} setIsOpen={setSidebarOpen} />

        {/* Content Area */}
        <main className="min-h-[calc(100vh-4rem)]">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
