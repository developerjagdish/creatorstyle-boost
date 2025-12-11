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
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  ArrowLeft,
  ChevronRight,
  Brain,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { db, generateBoost, StyleProfile, BoostHistory } from '@/lib/supabase';

// Sidebar navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'styles', label: 'Styles', icon: Palette },
  { id: 'history', label: 'History', icon: History },
];

// Sidebar Component
const Sidebar = ({ 
  activeSection, 
  setActiveSection,
  isOpen,
  setIsOpen,
  onLogout
}: { 
  activeSection: string; 
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">CreatorJoy</span>
              <p className="text-xs text-zinc-500">AI Content Studio</p>
            </div>
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

        {/* Bottom Section - Profile & Logout */}
        <div className="p-4 border-t border-zinc-800/50 space-y-3">
          {/* Demo User Profile */}
          <div className="flex items-center gap-3 p-3 bg-zinc-900/50 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">John Doe</p>
              <p className="text-xs text-zinc-500 truncate">john@example.com</p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

// Header Component
const Header = ({ 
  activeSection,
  setIsOpen,
  onLogout
}: { 
  activeSection: string;
  setIsOpen: (open: boolean) => void;
  onLogout: () => void;
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const sectionTitles: Record<string, string> = {
    'dashboard': 'Dashboard',
    'scripts': 'Scripts',
    'style-profile': 'Style Profile',
    'daily-boost': 'Daily Boost',
    'history': 'History',
    'styles': 'Styles',
  };

  return (
    <header className="h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left Section - Mobile menu & Logo */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-zinc-400 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        
        {/* Logo for mobile */}
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CreatorJoy</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
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
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notifications */}
        <button className="p-2 text-zinc-400 hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
        </button>

        {/* Theme Toggle */}
        <button className="hidden sm:block p-2 text-zinc-400 hover:text-white transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 pl-2 sm:pl-4 sm:border-l border-zinc-800 hover:opacity-80 transition-opacity"
          >
            <span className="hidden sm:block text-sm text-zinc-400">
              <span className="text-white font-medium">John Doe</span>
            </span>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center ring-2 ring-zinc-800">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <ChevronDown className={cn(
              "hidden sm:block w-4 h-4 text-zinc-400 transition-transform",
              showProfileMenu && "rotate-180"
            )} />
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <>
              {/* Backdrop to close menu */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setShowProfileMenu(false)}
              />
              
              {/* Menu */}
              <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
                {/* User Info */}
                <div className="p-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">JD</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">John Doe</p>
                      <p className="text-sm text-zinc-500">john@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    View Profile
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-zinc-800">
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

// Section Components (Empty placeholders)
const DashboardSection = ({ preSelectedStyleId }: { preSelectedStyleId?: string | null }) => {
  const [selectedStyle, setSelectedStyle] = useState('');
  const [contentIdea, setContentIdea] = useState('');
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

  // Set pre-selected style when prop changes
  useEffect(() => {
    if (preSelectedStyleId) {
      setSelectedStyle(preSelectedStyleId);
    }
  }, [preSelectedStyleId]);

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
    if (!selectedStyle || !contentIdea.trim()) return;
    
    setIsGenerating(true);
    setGeneratedBoost(null);
    setError(null);

    try {
      // Find the selected style profile
      const style = styleProfiles.find(s => s.id === selectedStyle);
      if (!style) {
        throw new Error('Style profile not found');
      }

      // Call the webhook with 60 second timeout, including the user's idea
      const result = await generateBoost(style, contentIdea.trim(), 60000);
      
      // Use the user's input as the idea, script and cta from webhook response
      setGeneratedBoost({
        idea: contentIdea.trim(),
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
            <p className="text-sm text-zinc-400">Generate content in your unique style</p>
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

            {/* Content Idea Input */}
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                What do you want to create content about?
              </label>
              <textarea
                value={contentIdea}
                onChange={(e) => setContentIdea(e.target.value)}
                placeholder="Enter your content idea or topic... e.g., 'How to stay productive while working from home' or 'Why most people fail at building habits'"
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={!selectedStyle || !contentIdea.trim() || isGenerating}
              className={cn(
                "w-full py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 transition-all duration-300",
                selectedStyle && contentIdea.trim() && !isGenerating
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
                  Generate Content
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

// Style Detail Component
const StyleDetailView = ({ 
  style, 
  onBack, 
  onUseForBoost,
  onDelete,
  onEdit
}: { 
  style: StyleProfile; 
  onBack: () => void;
  onUseForBoost: (styleId: string) => void;
  onDelete: (id: string) => void;
  onEdit: (style: StyleProfile) => void;
}) => {
  const [expandedScripts, setExpandedScripts] = useState<number[]>([1]);

  const toggleScript = (num: number) => {
    setExpandedScripts(prev => 
      prev.includes(num) 
        ? prev.filter(n => n !== num)
        : [...prev, num]
    );
  };

  const getScriptCount = () => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      const key = `script_${i}` as keyof StyleProfile;
      if (style[key]) count++;
    }
    return count;
  };

  // Check if style has AI summary data
  const hasSummary = style.tone || style.hook_style || style.structure || 
    (style.common_phrases && style.common_phrases.length > 0) || 
    (style.writing_rules && style.writing_rules.length > 0);

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this style profile? This action cannot be undone.')) {
      onDelete(style.id);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Styles
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
              <Palette className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{style.name}</h1>
              <p className="text-sm text-zinc-500">{getScriptCount()} scripts • Created {new Date(style.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onUseForBoost(style.id)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Zap className="w-4 h-4" />
            Use for Boost
          </button>
          <button
            onClick={() => onEdit(style)}
            className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors"
          >
            <Edit3 className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Scripts Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-zinc-400" />
          Scripts
        </h2>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
            const script = style[`script_${num}` as keyof StyleProfile] as string | undefined;
            if (!script) return null;
            const isExpanded = expandedScripts.includes(num);
            
            return (
              <div key={num} className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleScript(num)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded">
                      Script {num}
                    </span>
                    <span className="text-sm text-zinc-400 truncate max-w-md">
                      {script.substring(0, 60)}...
                    </span>
                  </div>
                  <ChevronRight className={cn(
                    "w-5 h-5 text-zinc-500 transition-transform",
                    isExpanded && "rotate-90"
                  )} />
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-zinc-800">
                    <p className="text-zinc-300 whitespace-pre-line text-sm leading-relaxed pt-4">
                      {script}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* AI-Generated Style Summary */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-zinc-900/40 border border-zinc-800 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">AI-Generated Style Summary</h2>
            <p className="text-sm text-zinc-500">Analysis of your writing patterns</p>
          </div>
        </div>

        {!hasSummary ? (
          <div className="text-center py-8 text-zinc-500">
            <Brain className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No AI summary available yet</p>
            <p className="text-sm mt-1">Summary will be generated when the style profile is analyzed</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Tone */}
            {style.tone && (
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-wide">Tone</span>
                </div>
                <p className="text-white">{style.tone}</p>
              </div>
            )}

            {/* Hook Style */}
            {style.hook_style && (
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-cyan-400 uppercase tracking-wide">Hook Style</span>
                </div>
                <p className="text-white">{style.hook_style}</p>
              </div>
            )}

            {/* Structure */}
            {style.structure && (
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-amber-400 uppercase tracking-wide">Structure</span>
                </div>
                <p className="text-white">{style.structure}</p>
              </div>
            )}

            {/* Common Phrases */}
            {style.common_phrases && style.common_phrases.length > 0 && (
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-green-400 uppercase tracking-wide">Common Phrases</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {style.common_phrases.map((phrase, i) => (
                    <span key={i} className="px-3 py-1.5 bg-zinc-700/50 text-zinc-300 text-sm rounded-lg">
                      "{phrase}"
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Writing Rules */}
            {style.writing_rules && style.writing_rules.length > 0 && (
              <div className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-pink-400 uppercase tracking-wide">Writing Rules</span>
                </div>
                <ul className="space-y-2">
                  {style.writing_rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles Section Component
const StylesSection = ({ onNavigateToDashboard }: { onNavigateToDashboard?: (styleId: string) => void }) => {
  const [styles, setStyles] = useState<StyleProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StyleProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingStyle, setEditingStyle] = useState<StyleProfile | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    script_1: '',
    script_2: '',
    script_3: '',
    script_4: '',
    script_5: '',
    script_6: '',
    script_7: '',
    script_8: '',
    script_9: '',
    script_10: '',
  });

  // Fetch styles from Supabase
  const fetchStyles = async () => {
    try {
      setIsLoading(true);
      const data = await db.styles.getAll();
      setStyles(data);
    } catch (err) {
      console.error('Error fetching styles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      script_1: '',
      script_2: '',
      script_3: '',
      script_4: '',
      script_5: '',
      script_6: '',
      script_7: '',
      script_8: '',
      script_9: '',
      script_10: '',
    });
    setError(null);
  };

  const handleCreateStyle = async () => {
    if (!formData.name.trim()) {
      setError('Style name is required');
      return;
    }

    // Check if at least one script is provided
    const hasScripts = Object.entries(formData)
      .filter(([key]) => key.startsWith('script_'))
      .some(([, value]) => (value as string).trim() !== '');

    if (!hasScripts) {
      setError('Please add at least one script');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Create style in Supabase
      const createdStyle = await db.styles.create({
        name: formData.name,
        script_1: formData.script_1 || undefined,
        script_2: formData.script_2 || undefined,
        script_3: formData.script_3 || undefined,
        script_4: formData.script_4 || undefined,
        script_5: formData.script_5 || undefined,
        script_6: formData.script_6 || undefined,
        script_7: formData.script_7 || undefined,
        script_8: formData.script_8 || undefined,
        script_9: formData.script_9 || undefined,
        script_10: formData.script_10 || undefined,
      });

      // Send to webhook with style name, id, and all scripts
      try {
        await fetch('https://n8n.devjagdish.tech/webhook/02d5567e-a6f3-4361-8b83-a38a8fe2b0f1', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: createdStyle.id,
            name: createdStyle.name,
            script_1: createdStyle.script_1,
            script_2: createdStyle.script_2,
            script_3: createdStyle.script_3,
            script_4: createdStyle.script_4,
            script_5: createdStyle.script_5,
            script_6: createdStyle.script_6,
            script_7: createdStyle.script_7,
            script_8: createdStyle.script_8,
            script_9: createdStyle.script_9,
            script_10: createdStyle.script_10,
          }),
        });
      } catch (webhookErr) {
        console.error('Webhook error (style still saved):', webhookErr);
      }

      resetForm();
      setShowCreateModal(false);
      fetchStyles();
    } catch (err: any) {
      console.error('Error creating style:', err);
      setError(err.message || 'Failed to create style profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStyle = async (id: string) => {
    try {
      await db.styles.delete(id);
      setSelectedStyle(null);
      fetchStyles();
    } catch (err) {
      console.error('Error deleting style:', err);
    }
  };

  const handleViewStyle = (style: StyleProfile) => {
    setSelectedStyle(style);
  };

  const handleEditStyle = (style: StyleProfile) => {
    setEditingStyle(style);
    setFormData({
      name: style.name,
      script_1: style.script_1 || '',
      script_2: style.script_2 || '',
      script_3: style.script_3 || '',
      script_4: style.script_4 || '',
      script_5: style.script_5 || '',
      script_6: style.script_6 || '',
      script_7: style.script_7 || '',
      script_8: style.script_8 || '',
      script_9: style.script_9 || '',
      script_10: style.script_10 || '',
    });
    setShowCreateModal(true);
  };

  const handleUpdateStyle = async () => {
    if (!editingStyle) return;
    
    if (!formData.name.trim()) {
      setError('Style name is required');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.styles.update(editingStyle.id, {
        name: formData.name,
        script_1: formData.script_1 || undefined,
        script_2: formData.script_2 || undefined,
        script_3: formData.script_3 || undefined,
        script_4: formData.script_4 || undefined,
        script_5: formData.script_5 || undefined,
        script_6: formData.script_6 || undefined,
        script_7: formData.script_7 || undefined,
        script_8: formData.script_8 || undefined,
        script_9: formData.script_9 || undefined,
        script_10: formData.script_10 || undefined,
      });

      resetForm();
      setShowCreateModal(false);
      setEditingStyle(null);
      setSelectedStyle(null);
      fetchStyles();
    } catch (err: any) {
      console.error('Error updating style:', err);
      setError(err.message || 'Failed to update style profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseForBoost = (styleId: string) => {
    if (onNavigateToDashboard) {
      onNavigateToDashboard(styleId);
    }
  };

  const getScriptCount = (style: StyleProfile) => {
    let count = 0;
    for (let i = 1; i <= 10; i++) {
      const key = `script_${i}` as keyof StyleProfile;
      if (style[key]) count++;
    }
    return count;
  };

  // If a style is selected, show detail view
  if (selectedStyle) {
    return (
      <StyleDetailView
        style={selectedStyle}
        onBack={() => setSelectedStyle(null)}
        onUseForBoost={handleUseForBoost}
        onDelete={handleDeleteStyle}
        onEdit={handleEditStyle}
      />
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Style Profiles</h1>
          <p className="text-zinc-400">Create a writing style by uploading 10 scripts.</p>
        </div>
        <button
          onClick={() => {
            setEditingStyle(null);
            resetForm();
            setShowCreateModal(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          New Style Profile
        </button>
      </div>

      {/* Styles Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
      ) : styles.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <Palette className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No style profiles yet</h3>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            Create your first style profile by uploading 10 scripts that represent your unique writing style.
          </p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
          >
            <Plus className="w-5 h-5" />
            Create Your First Style
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {styles.map((style) => (
            <div
              key={style.id}
              onClick={() => handleViewStyle(style)}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 hover:border-zinc-700 transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                  <Palette className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex items-center gap-1">
                  <ChevronRight className="w-5 h-5 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{style.name}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <FileText className="w-4 h-4" />
                <span>{getScriptCount(style)} scripts</span>
              </div>
              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-xs text-zinc-500">
                  Created {new Date(style.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingStyle ? 'Edit Style Profile' : 'Create Style Profile'}
                </h2>
                <p className="text-sm text-zinc-400 mt-1">Add 10 scripts to define your writing style</p>
              </div>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingStyle(null);
                  resetForm();
                }}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-200 text-sm">{error}</p>
                </div>
              )}

              {/* Style Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-300 mb-2">
                  Style Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Professional Tech Writer"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              {/* Scripts */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-zinc-300">
                  Scripts <span className="text-zinc-500">(Add up to 10 scripts)</span>
                </label>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div key={num}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                        Script {num}
                      </span>
                      {formData[`script_${num}` as keyof typeof formData] && (
                        <Check className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <textarea
                      value={formData[`script_${num}` as keyof typeof formData]}
                      onChange={(e) => handleInputChange(`script_${num}`, e.target.value)}
                      placeholder={`Paste your script ${num} here...`}
                      rows={4}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-zinc-800 flex items-center justify-between">
              <p className="text-sm text-zinc-500">
                {Object.entries(formData).filter(([key, value]) => key.startsWith('script_') && (value as string).trim()).length}/10 scripts added
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingStyle(null);
                    resetForm();
                  }}
                  className="px-5 py-2.5 text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingStyle ? handleUpdateStyle : handleCreateStyle}
                  disabled={isSubmitting}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold transition-all",
                    isSubmitting
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      {editingStyle ? 'Updating...' : 'Saving...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingStyle ? 'Update Style Profile' : 'Save Style Profile'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// History Section Component
const HistorySection = () => {
  const [boosts, setBoosts] = useState<BoostHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBoost, setSelectedBoost] = useState<BoostHistory | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Fetch boost history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const data = await db.boostHistory.getAll();
        setBoosts(data);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number = 60) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Boost History</h1>
        <p className="text-zinc-400">View all your generated content boosts</p>
      </div>

      {/* History Table */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-zinc-400 animate-spin" />
        </div>
      ) : boosts.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
            <History className="w-8 h-8 text-zinc-500" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No boosts yet</h3>
          <p className="text-zinc-400 max-w-md mx-auto">
            Generate your first content boost from the Dashboard to see it here.
          </p>
        </div>
      ) : (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-800/50 border-b border-zinc-700">
            <div className="col-span-3 text-sm font-medium text-zinc-400">Date</div>
            <div className="col-span-3 text-sm font-medium text-zinc-400">Style</div>
            <div className="col-span-5 text-sm font-medium text-zinc-400">Idea</div>
            <div className="col-span-1 text-sm font-medium text-zinc-400"></div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zinc-800">
            {boosts.map((boost) => (
              <div
                key={boost.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-zinc-800/30 transition-colors cursor-pointer"
                onClick={() => setSelectedBoost(boost)}
              >
                <div className="col-span-3 flex items-center">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Calendar className="w-4 h-4 text-zinc-500" />
                    {formatDate(boost.generated_at)}
                  </div>
                </div>
                <div className="col-span-3 flex items-center">
                  <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-sm rounded-lg">
                    {boost.styles?.name || 'Unknown Style'}
                  </span>
                </div>
                <div className="col-span-5 flex items-center">
                  <p className="text-sm text-zinc-400 truncate">
                    {truncateText(boost.idea || 'No idea provided')}
                  </p>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBoost(boost);
                    }}
                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Boost Detail Drawer */}
      {selectedBoost && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-40"
            onClick={() => setSelectedBoost(null)}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-zinc-900 border-l border-zinc-800 z-50 overflow-y-auto">
            {/* Drawer Header */}
            <div className="sticky top-0 bg-zinc-900 border-b border-zinc-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Boost Details</h2>
                <p className="text-sm text-zinc-500 mt-1">
                  {formatDate(selectedBoost.generated_at)}
                </p>
              </div>
              <button
                onClick={() => setSelectedBoost(null)}
                className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="p-6 space-y-6">
              {/* Style Used */}
              <div>
                <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2">
                  Style Used
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {selectedBoost.styles?.name || 'Unknown Style'}
                  </span>
                </div>
              </div>

              {/* Idea */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    Idea / Topic
                  </label>
                  {selectedBoost.idea && (
                    <button
                      onClick={() => handleCopy('idea', selectedBoost.idea || '')}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedField === 'idea' ? (
                        <><Check className="w-3 h-3" /> Copied!</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  )}
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                  <p className="text-zinc-300 whitespace-pre-line">
                    {selectedBoost.idea || 'No idea provided'}
                  </p>
                </div>
              </div>

              {/* Script */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    Generated Script
                  </label>
                  {selectedBoost.script && (
                    <button
                      onClick={() => handleCopy('script', selectedBoost.script || '')}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedField === 'script' ? (
                        <><Check className="w-3 h-3" /> Copied!</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  )}
                </div>
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                  <p className="text-zinc-300 whitespace-pre-line text-sm leading-relaxed">
                    {selectedBoost.script || 'No script generated'}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                    Call to Action
                  </label>
                  {selectedBoost.cta && (
                    <button
                      onClick={() => handleCopy('cta', selectedBoost.cta || '')}
                      className="flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      {copiedField === 'cta' ? (
                        <><Check className="w-3 h-3" /> Copied!</>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  )}
                </div>
                <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-4">
                  <p className="text-cyan-200 font-medium">
                    {selectedBoost.cta || 'No CTA generated'}
                  </p>
                </div>
              </div>

              {/* Copy All Button */}
              <button
                onClick={() => {
                  const fullContent = `Idea: ${selectedBoost.idea || 'N/A'}\n\nScript:\n${selectedBoost.script || 'N/A'}\n\nCTA: ${selectedBoost.cta || 'N/A'}`;
                  handleCopy('all', fullContent);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors"
              >
                {copiedField === 'all' ? (
                  <><Check className="w-4 h-4" /> Copied All!</>
                ) : (
                  <><Copy className="w-4 h-4" /> Copy All Content</>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);

  const handleNavigateToDashboard = (styleId: string) => {
    setSelectedStyleId(styleId);
    setActiveSection('dashboard');
  };

  const handleLogout = () => {
    // Navigate to home page
    window.location.href = '/';
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection preSelectedStyleId={selectedStyleId} />;
      case 'styles':
        return <StylesSection onNavigateToDashboard={handleNavigateToDashboard} />;
      case 'history':
        return <HistorySection />;
      default:
        return <DashboardSection preSelectedStyleId={selectedStyleId} />;
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
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <Header 
          activeSection={activeSection} 
          setIsOpen={setSidebarOpen} 
          onLogout={handleLogout}
        />

        {/* Content Area */}
        <main className="min-h-[calc(100vh-4rem)]">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
