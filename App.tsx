import React, { useState } from 'react';
import {
  Zap,
  ArrowRight,
  Fingerprint,
  Maximize
} from 'lucide-react';
import BentoGrid from './components/ui/bento-grid-01';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { MagneticText } from './components/ui/morphing-cursor';

// --- COMPONENTS ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 glass-card border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">CreatorStyle Boost</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="hover:text-white transition-colors">Why It's Good</a>
          <a href="#stack" className="hover:text-white transition-colors">Stack</a>
        </div>
        <button className="bg-white text-black px-5 py-2 rounded-lg font-semibold text-sm hover:bg-zinc-200 transition-colors border border-transparent hover:border-zinc-300">
          Get Started
        </button>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative overflow-hidden">

    <ContainerScroll
      titleComponent={
        <>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-xs font-medium mb-8 uppercase tracking-wide animate-float">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Context-Aware Generation
          </div>

          <div className="flex flex-col items-center justify-center mb-6">
            <MagneticText
              text="Your Voice. Your Style."
              hoverText="Unique. Authentic."
              fontSize="text-5xl md:text-7xl"
              className="font-display leading-tight tracking-tight mb-2"
            />
            <span className="font-display text-5xl md:text-7xl font-bold leading-tight text-zinc-500 tracking-tight">On Autopilot.</span>
          </div>

          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            CreatorStyle Boost learns your writing fingerprint from just 10 scripts and generates fresh, on-brand content ideas every day.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group relative px-8 py-4 bg-white hover:bg-zinc-200 text-black font-bold text-lg rounded-xl transition-all hover:scale-105 min-w-[200px]">
              <div className="flex items-center justify-center gap-2">
                <MagneticText
                  text="Start Boosting"
                  hoverText="Let's Go!"
                  fontSize="text-lg"
                  className="pointer-events-none"
                  textColor="text-black"
                  cursorColor="bg-black"
                  cursorTextColor="text-white"
                />
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
            <button className="px-8 py-4 bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-lg rounded-xl hover:bg-zinc-800 transition-colors">
              View Demo
            </button>
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
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-16 items-center">

        {/* Left Text Content */}
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Unified Design<br />
            <span className="text-zinc-500">Tokens</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Manage your creative output like a design system. Every piece of content adheres to your strict brand guidelines.
          </p>

          <div className="space-y-4">
            {[
              { label: 'Surface Primary', val: 'Tone/Witty' },
              { label: 'Surface Secondary', val: 'Tone/Direct' },
              { label: 'Content Primary', val: 'Hook/Contrarian' },
              { label: 'Content Brand', val: 'Structure/Listicle' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full border border-white/20 bg-white/5"></div>
                  <span className="text-sm font-mono text-zinc-300">{item.label}</span>
                </div>
                <div className="bg-zinc-900 border border-white/10 px-2 py-1 rounded text-xs text-zinc-500 font-mono">
                  {item.val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interface Mockup */}
        <div className="lg:w-2/3 w-full">
          <div className="matte-card rounded-xl overflow-hidden shadow-2xl relative border border-white/10">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-zinc-700 via-zinc-500 to-zinc-700 opacity-20"></div>

            <div className="grid grid-cols-12 min-h-[500px]">
              {/* Sidebar */}
              <div className="col-span-3 border-r border-white/5 bg-zinc-950 p-4 hidden md:block">
                <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-4">Token</div>
                <div className="space-y-1">
                  {['All variables', 'Surface', 'Content', 'Success', 'Warning'].map((item, i) => (
                    <div key={i} className={`text-xs px-2 py-2 rounded ${i === 0 ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Table Area */}
              <div className="col-span-12 md:col-span-9 bg-[#0a0a0a] p-6 relative">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Maximize className="w-4 h-4" />
                    <span>Style Library / <span className="text-white">Master</span></span>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700"></div>
                  </div>
                </div>

                {/* Mock Data Rows */}
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 items-center py-2 hover:bg-white/[0.02] rounded px-2 transition-colors group">
                      <div className="col-span-4 flex items-center gap-3">
                        <Fingerprint className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                        <span className="text-sm text-zinc-300">Style_Token_{i}0{i}</span>
                      </div>
                      <div className="col-span-6 flex gap-2">
                        <div className="h-6 w-24 bg-zinc-900 rounded border border-white/5"></div>
                        <div className="h-6 w-16 bg-zinc-900 rounded border border-white/5"></div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="w-4 h-4 border border-zinc-700 rounded bg-zinc-900"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Floating Phone Element (Decorative) */}
                <div className="absolute -bottom-12 -right-12 w-64 h-96 bg-black border-[6px] border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden hidden lg:block transform rotate-[-5deg]">
                  <div className="bg-white text-black h-full p-4 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-xs font-bold">9:41</span>
                      <div className="flex gap-1">
                        <div className="w-4 h-3 bg-black rounded-sm"></div>
                      </div>
                    </div>
                    <h3 className="font-display font-bold text-xl mb-1">Good Afternoon,</h3>
                    <p className="text-xs text-zinc-500 mb-6">Ready for your daily boost?</p>

                    <div className="bg-zinc-100 p-3 rounded-xl mb-3">
                      <div className="flex gap-2 mb-2">
                        <span className="bg-black text-white text-[10px] px-2 py-0.5 rounded-full">New</span>
                      </div>
                      <p className="text-xs font-medium leading-relaxed">
                        "Design isn't just about making things look good. It's about making things work..."
                      </p>
                    </div>
                    <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200">
                      <p className="text-xs text-zinc-400">Loading next idea...</p>
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
    },
    {
      id: "02",
      title: "AI Profile",
      desc: "Our AI creates a compact 'Style DNA': Tone, Hook patterns, Structure.",
    },
    {
      id: "03",
      title: "Daily Boost",
      desc: "Every tap generates a new content idea, caption, and creator-style CTA.",
    },
    {
      id: "04",
      title: "Automate",
      desc: "Saved to Supabase, triggers a webhook, sends via n8n.",
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
          {steps.map((step) => (
            <div key={step.id} className="group relative p-8 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors h-full flex flex-col justify-between">
              <div className="mb-8">
                <span className="text-xs font-mono text-zinc-600 mb-4 block">STEP {step.id}</span>
                <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
              <div className="w-full h-1 bg-zinc-900 mt-4 overflow-hidden rounded-full">
                <div className="h-full bg-white/20 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative Image Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <img src="https://images.unsplash.com/photo-1605106702734-205df224ecce?q=80&w=600&auto=format&fit=crop" className="rounded-lg h-32 w-full object-cover" alt="" />
          <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" className="rounded-lg h-32 w-full object-cover" alt="" />
          <img src="https://images.unsplash.com/photo-1555421689-4926337621fa?q=80&w=600&auto=format&fit=crop" className="rounded-lg h-32 w-full object-cover" alt="" />
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" className="rounded-lg h-32 w-full object-cover" alt="" />
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-white/5 bg-[#050505] text-zinc-500 text-sm">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded bg-white/5 border border-white/10 flex items-center justify-center">
          <Zap className="w-3 h-3 text-white fill-current" />
        </div>
        <span className="font-bold text-white">CreatorStyle Boost</span>
      </div>

      <div className="flex gap-6">
        <a href="#" className="hover:text-zinc-300 transition-colors">Privacy</a>
        <a href="#" className="hover:text-zinc-300 transition-colors">Terms</a>
        <a href="#" className="hover:text-zinc-300 transition-colors">Twitter</a>
      </div>

      <div className="flex items-center gap-2 opacity-75 hover:opacity-100 transition-opacity">
        <span>Powered by</span>
        <div className="font-bold text-white flex items-center gap-1">
          CreatorJoy
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN LAYOUT ---

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <BentoGrid />
        <InteractiveDemo />
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-32 text-center bg-tech-grid border-t border-white/5 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] shine-overlay -z-10"></div>
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 tracking-tight">
              Ready to put your content<br />
              <span className="text-zinc-500">on autopilot?</span>
            </h2>
            <button className="px-10 py-5 bg-white text-black font-bold text-lg rounded-xl transition-all hover:scale-105 hover:bg-zinc-200 shadow-xl">
              Get Started Now
            </button>
            <p className="mt-6 text-zinc-600 text-sm font-mono">No credit card required for demo.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}