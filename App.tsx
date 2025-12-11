import React, { useState, useCallback, useEffect } from 'react';
import {
  Zap,
  ArrowRight,
  Fingerprint,
  Maximize,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import BentoGrid from './components/ui/bento-grid-01';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { MagneticText } from './components/ui/morphing-cursor';
import { ShaderAnimation } from './components/ui/shader-lines';
import ShaderBackground from './components/ui/shader-background';
import Dashboard from './components/dashboard/Dashboard';

// Smooth scroll with extra glide effect
const smoothScrollWithGlide = (targetSelector: string, offset: number = 60) => {
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  
  // Smooth scroll to target
  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });

  // After scroll ends, glide a bit more
  setTimeout(() => {
    window.scrollTo({
      top: targetPosition + offset,
      behavior: "smooth"
    });
  }, 400);
};

// --- COMPONENTS ---

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      {/* Main navbar container - pill shape */}
      <div className="relative rounded-full overflow-hidden">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 rounded-full" />
        
        {/* Inner container with glass effect */}
        <div className="relative m-[1px] rounded-full bg-zinc-950/90 backdrop-blur-xl border border-white/10">
          <div className="px-4 py-2.5 flex justify-between items-center">
            {/* Logo Section */}
            <div className="flex items-center pl-2">
              <a href="/" className="relative group">
                <img 
                  src="/logo.png" 
                  alt="CreatorJoy.com" 
                  className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>

            {/* Desktop Navigation - Center pill */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-zinc-900/80 rounded-full px-1.5 py-1.5 border border-white/5">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollWithGlide(item.href, 60);
                    }}
                    className="relative px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-all duration-300 rounded-full hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-3 pr-1">
              <a href="/dashboard" className="relative group overflow-hidden px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105">
                {/* White background with gradient shine */}
                <div className="absolute inset-0 bg-white rounded-full" />
                {/* Shine sweep effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {/* Top highlight */}
                <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-transparent opacity-80 rounded-t-full" />
                <span className="relative flex items-center gap-2 text-black">
                  <Sparkles className="w-4 h-4" />
                  Get Started
                </span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-2xl bg-zinc-950/95 backdrop-blur-xl border border-white/10 overflow-hidden">
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-3 text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  smoothScrollWithGlide(item.href, 60);
                }}
              >
                {item.label}
              </a>
            ))}
            <a href="/dashboard" className="relative group mt-3 w-full px-6 py-3 rounded-full font-semibold text-sm overflow-hidden flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105">
              {/* White background */}
              <div className="absolute inset-0 bg-white rounded-full" />
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <Sparkles className="relative w-4 h-4 text-black" />
              <span className="relative text-black">Get Started</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => (
  <section className="relative overflow-hidden pt-24 md:pt-16">
    {/* Mobile Animated Gradient Background */}
    <div className="absolute inset-0 z-0 md:hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-pink-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/30 to-[#0a0a0a] pointer-events-none"></div>
    </div>
    
    {/* Desktop Shader Animation Background */}
    <div className="absolute inset-0 z-0 hidden md:block">
      <ShaderAnimation />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a] z-10 pointer-events-none"></div>
    </div>

    <ContainerScroll
      titleComponent={
        <>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/10 text-zinc-200 text-xs font-medium mb-8 uppercase tracking-wide animate-float mt-4 md:mt-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            Context-Aware Generation
          </div>

          <div className="flex flex-col items-center justify-center mb-6">
            <MagneticText
              text="Your Voice. Your Style."
              hoverText="Unique. Authentic."
              fontSize="text-5xl md:text-7xl"
              className="font-display leading-tight tracking-tight mb-2"
            />
            <span className="font-display text-5xl md:text-7xl font-bold leading-tight text-zinc-400 tracking-tight">On Autopilot.</span>
          </div>

          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            CreatorStyle Boost learns your writing fingerprint from just 10 scripts and generates fresh, on-brand content ideas every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-24">
            {/* Primary CTA Button - Shiny White */}
            <a href="/dashboard" className="group relative overflow-hidden px-10 py-5 rounded-2xl min-w-[220px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20">
              {/* White background */}
              <div className="absolute inset-0 bg-white rounded-2xl" />
              {/* Glossy top highlight */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white via-zinc-100 to-transparent rounded-t-2xl" />
              {/* Shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {/* Subtle bottom shadow */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-zinc-200/50 to-transparent rounded-b-2xl" />
              <div className="relative flex items-center justify-center gap-3">
                <span className="text-black font-bold text-lg tracking-wide">Start Boosting</span>
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </a>
            
            {/* Secondary CTA Button - Shiny Black */}
            <a href="#demo" className="group relative overflow-hidden px-10 py-5 rounded-2xl min-w-[220px] transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/10">
              {/* Black background */}
              <div className="absolute inset-0 bg-zinc-900 rounded-2xl" />
              {/* Glossy top highlight */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-zinc-700/50 to-transparent rounded-t-2xl" />
              {/* Shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              {/* Border */}
              <div className="absolute inset-0 rounded-2xl border border-zinc-700 group-hover:border-zinc-500 transition-colors duration-300" />
              <div className="relative flex items-center justify-center gap-2">
                <span className="text-white font-semibold text-lg">View Demo</span>
              </div>
            </a>
          </div>
        </>
      }
    >
      <div className="w-full h-full relative bg-zinc-950">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10 pointer-events-none"></div>
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop"
          alt="Dashboard Preview"
          className="w-full h-full object-cover object-left-top rounded-2xl opacity-90"
        />
      </div>
    </ContainerScroll>
  </section>
);

const InteractiveDemo = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'profile' | 'boost' | 'history'>('profile');

  return (
    <section className="py-32 bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-20 items-center relative z-10">

        {/* Left Text Content */}
        <div className="lg:w-1/3">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-medium uppercase tracking-wider mb-6">
            Style System
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
            Unified Design
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-zinc-400 to-zinc-600 bg-clip-text text-transparent mb-6">
            Tokens
          </h2>
          <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
            Manage your creative output like a design system. Every piece of content adheres to your strict brand guidelines.
          </p>

          <div className="space-y-3">
            {[
              { label: 'Surface Primary', val: 'Tone/Witty', color: 'from-purple-500 to-purple-600' },
              { label: 'Surface Secondary', val: 'Tone/Direct', color: 'from-cyan-500 to-cyan-600' },
              { label: 'Content Primary', val: 'Hook/Contrarian', color: 'from-emerald-500 to-emerald-600' },
              { label: 'Content Brand', val: 'Structure/Listicle', color: 'from-amber-500 to-amber-600' },
            ].map((item, i) => (
              <div key={i} className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-white/15 hover:bg-zinc-800/50 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${item.color} shadow-lg`}></div>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{item.label}</span>
                </div>
                <div className="bg-zinc-800 border border-white/10 px-3 py-1.5 rounded-lg text-xs text-zinc-400 font-mono group-hover:bg-zinc-700 group-hover:text-zinc-300 transition-all">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interface Mockup */}
        <div className="lg:w-2/3 w-full">
          <div className="relative">
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 rounded-3xl blur-2xl opacity-50"></div>
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-zinc-950">
              {/* Top bar with window controls */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-zinc-500 font-medium">Style Library</span>
                <div className="w-16"></div>
              </div>

              <div className="grid grid-cols-12 min-h-[480px]">
                {/* Sidebar */}
                <div className="col-span-3 border-r border-white/5 bg-zinc-900/50 p-5 hidden md:block">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-5">Token Categories</div>
                  <div className="space-y-1">
                    {[
                      { name: 'All variables', active: true },
                      { name: 'Surface', active: false },
                      { name: 'Content', active: false },
                      { name: 'Success', active: false },
                      { name: 'Warning', active: false },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={`text-sm px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                          item.active 
                            ? 'bg-white text-black font-medium shadow-lg' 
                            : 'text-zinc-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Table Area */}
                <div className="col-span-12 md:col-span-9 bg-[#0c0c0c] p-6 relative">
                  <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3 text-sm text-zinc-400">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center">
                        <Maximize className="w-4 h-4" />
                      </div>
                      <span>Style Library / <span className="text-white font-medium">Master</span></span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors cursor-pointer"></div>
                      <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-colors cursor-pointer"></div>
                    </div>
                  </div>

                  {/* Mock Data Rows */}
                  <div className="space-y-2">
                    {[
                      { color: 'from-purple-500 to-purple-600' },
                      { color: 'from-cyan-500 to-cyan-600' },
                      { color: 'from-emerald-500 to-emerald-600' },
                      { color: 'from-amber-500 to-amber-600' },
                      { color: 'from-pink-500 to-pink-600' },
                      { color: 'from-blue-500 to-blue-600' },
                    ].map((item, i) => (
                      <div key={i} className="grid grid-cols-12 gap-4 items-center py-3 px-3 hover:bg-white/[0.03] rounded-xl transition-all duration-200 group cursor-pointer border border-transparent hover:border-white/5">
                        <div className="col-span-5 flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                            <Fingerprint className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors font-medium">Style_Token_{i + 1}0{i + 1}</span>
                        </div>
                        <div className="col-span-5 flex gap-3">
                          <div className="h-7 w-24 bg-zinc-800/80 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors"></div>
                          <div className="h-7 w-20 bg-zinc-800/80 rounded-lg border border-white/5 group-hover:border-white/10 transition-colors"></div>
                        </div>
                        <div className="col-span-2 flex justify-end">
                          <div className="w-5 h-5 border-2 border-zinc-600 rounded-md bg-zinc-800 group-hover:border-white/30 transition-colors"></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Phone Element (Decorative) */}
                  <div className="absolute -bottom-8 -right-8 w-56 h-[400px] bg-zinc-900 border-[4px] border-zinc-700 rounded-[2.5rem] shadow-2xl overflow-hidden hidden lg:block transform rotate-[-8deg] hover:rotate-[-5deg] transition-transform duration-500">
                    {/* Phone notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full"></div>
                    
                    <div className="bg-white text-black h-full pt-8 p-5 overflow-hidden">
                      <div className="flex justify-between items-center mb-5">
                        <span className="text-xs font-bold">9:41</span>
                        <div className="flex gap-1 items-center">
                          <div className="w-4 h-2 bg-black rounded-sm"></div>
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl mb-1">Good Afternoon,</h3>
                      <p className="text-[11px] text-zinc-500 mb-5">Ready for your daily boost?</p>

                      <div className="bg-gradient-to-br from-zinc-100 to-zinc-50 p-4 rounded-2xl mb-3 shadow-sm border border-zinc-200">
                        <div className="flex gap-2 mb-2">
                          <span className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-[9px] px-2.5 py-1 rounded-full font-bold">New</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed text-zinc-700">
                          "Design isn't just about making things look good. It's about making things work..."
                        </p>
                      </div>
                      <div className="bg-zinc-100 p-4 rounded-2xl border border-zinc-200">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-zinc-300 border-t-zinc-600 rounded-full animate-spin"></div>
                          <p className="text-xs text-zinc-400">Loading next idea...</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Upload Scripts",
      desc: "Drop in your past posts. We analyze your writing fingerprint.",
      icon: "📤",
    },
    {
      id: "02",
      title: "AI Profile",
      desc: "Our AI creates a compact 'Style DNA': Tone, Hook patterns, Structure.",
      icon: "🧬",
    },
    {
      id: "03",
      title: "Daily Boost",
      desc: "Every tap generates a new content idea, caption, and creator-style CTA.",
      icon: "⚡",
    },
    {
      id: "04",
      title: "Automate",
      desc: "Saved to Supabase, triggers a webhook, sends via n8n.",
      icon: "🔄",
    }
  ];

  return (
    <section id="how-it-works" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-medium uppercase tracking-wider mb-6">
            How It Works
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">
            Four simple steps to
            <span className="block text-zinc-500">content mastery</span>
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="group relative"
            >
              {/* Connecting line for desktop */}
              {index < 3 && (
                <div className="hidden lg:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 opacity-30"></div>
              )}
              
              {/* Card */}
              <div className="relative p-8 rounded-2xl bg-gradient-to-b from-zinc-800/50 to-zinc-900/50 border border-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:-translate-y-2 h-full">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Step number & icon */}
                <div className="relative flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-800 border border-white/10 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <span className="text-5xl font-bold text-zinc-800 group-hover:text-zinc-700 transition-colors">{step.id}</span>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white transition-colors">{step.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors">{step.desc}</p>
                </div>
                
                {/* Progress bar */}
                <div className="relative mt-8 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/40 to-white/60 w-0 group-hover:w-full transition-all duration-700 ease-out rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Image Strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop"
          ].map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl">
              <img 
                src={src} 
                className="h-40 w-full object-cover transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0" 
                alt="" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 bg-gradient-to-t from-[#080808] to-[#0a0a0a] text-zinc-500 relative overflow-hidden">
    {/* Subtle top border gradient */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    
    <div className="max-w-7xl mx-auto px-4">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/logo.png" 
              alt="CreatorJoy.com" 
              className="h-8 w-auto object-contain"
            />
          </div>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6">
            AI-powered content generation that learns your unique voice and style.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:border-white/20 transition-all duration-300 group">
              <svg className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>

        {/* Product Column */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Product</h4>
          <ul className="space-y-3">
            <li><a href="#features" className="text-zinc-500 hover:text-white transition-colors text-sm">Features</a></li>
            <li><a href="#how-it-works" className="text-zinc-500 hover:text-white transition-colors text-sm">How it Works</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Pricing</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Changelog</a></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">About</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Blog</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Careers</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Contact</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h4>
          <ul className="space-y-3">
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Terms of Service</a></li>
            <li><a href="#" className="text-zinc-500 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} CreatorJoy. All rights reserved.
        </p>
        <div className="flex items-center gap-2 text-zinc-600 text-sm">
          <span>Made with</span>
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>by <a href="https://creatorjoy.com" className="text-white hover:text-purple-400 transition-colors font-medium">CreatorJoy</a></span>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN LAYOUT ---

// Simple router hook
function useRoute() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    
    // Handle link clicks for SPA navigation
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href.startsWith(window.location.origin)) {
        const newPath = new URL(anchor.href).pathname;
        if (newPath !== path) {
          e.preventDefault();
          window.history.pushState({}, '', newPath);
          setPath(newPath);
        }
      }
    };
    
    document.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleClick);
    };
  }, [path]);

  return path;
}

// Landing Page Component
function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <InteractiveDemo />
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-40 text-center relative overflow-hidden">
          {/* Mobile Animated Gradient Background */}
          <div className="absolute inset-0 z-0 md:hidden">
            <div className="absolute inset-0 bg-[#0a0a0a]">
              {/* Animated gradient orbs */}
              <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-violet-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              {/* Radial glow */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-900/20 via-transparent to-transparent"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/80 pointer-events-none"></div>
          </div>
          
          {/* Desktop Shader Background */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <ShaderBackground />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/60 pointer-events-none"></div>
          </div>
          
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm mb-10">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
              <span className="text-purple-300 text-sm font-medium tracking-wide">Ready to Transform?</span>
            </div>
            
            {/* Heading */}
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              <span className="text-white">Put your content</span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">on autopilot</span>
            </h2>
            
            {/* Subtext */}
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
              Join thousands of creators who are saving hours every week with AI-powered content generation.
            </p>
            
            {/* CTA Button */}
            <a href="/dashboard" className="group relative inline-flex items-center gap-3 overflow-hidden px-10 py-5 rounded-2xl transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-white rounded-2xl" />
              {/* Glossy top highlight */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white to-zinc-100/50 rounded-t-2xl" />
              {/* Shine sweep effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative text-black font-bold text-lg">Get Started Now</span>
              <ArrowRight className="relative w-5 h-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            
            {/* Trust indicators */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-zinc-500 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  const path = useRoute();

  // Render dashboard if on /dashboard path
  if (path === '/dashboard') {
    return <Dashboard />;
  }

  // Default: render landing page
  return <LandingPage />;
}