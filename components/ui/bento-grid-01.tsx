import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lock, Smartphone, Globe, Fingerprint, Layout, Zap } from "lucide-react"

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-display text-6xl md:text-8xl text-white font-medium"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Aa
      </motion.span>
    </div>
  )
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2", "grid-cols-3", "grid-cols-1"]

  return (
    <div className="h-full flex items-center justify-center">
      <motion.div
        className={`grid ${layouts[layout]} gap-1.5 w-full max-w-[140px] h-full`}
        layout
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-white/20 rounded-md h-5 w-full"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function SpeedIndicator() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="h-10 flex items-center justify-center overflow-hidden relative w-full">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              className="h-8 w-24 bg-white/10 rounded"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              exit={{ opacity: 0, y: -20, position: 'absolute' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          ) : (
            <motion.span
              key="text"
              initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              className="text-3xl md:text-4xl font-sans font-medium text-white"
            >
              100ms
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <span className="text-sm text-gray-400">Gen Time</span>
      <div className="w-full max-w-[120px] h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: loading ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 100, damping: 15, mass: 1 }}
        />
      </div>
    </div>
  )
}

function SecurityBadge() {
  const [shields, setShields] = useState([
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false }
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setShields(prev => {
        const nextIndex = prev.findIndex(s => !s.active)
        if (nextIndex === -1) {
          return prev.map(() => ({ id: Math.random(), active: false }))
        }
        return prev.map((s, i) => i === nextIndex ? { ...s, active: true } : s)
      })
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full gap-2">
      {shields.map((shield) => (
        <motion.div
          key={shield.id}
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            shield.active ? 'bg-white/20' : 'bg-white/5'
          }`}
          animate={{ scale: shield.active ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Lock className={`w-5 h-5 ${shield.active ? 'text-white' : 'text-gray-600'}`} />
        </motion.div>
      ))}
    </div>
  )
}

function GlobalNetwork() {
  const [pulses] = useState([0, 1, 2, 3, 4])

  return (
    <div className="flex items-center justify-center h-full relative">
      <Globe className="w-16 h-16 text-white/80 z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-16 h-16 border-2 border-white/30 rounded-full"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  )
}

function FeaturesSection() {
  return (
    <section className="bg-gradient-to-b from-[#0a0a0a] to-[#0d0d0d] px-6 py-32 flex items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-zinc-400 text-xs font-medium uppercase tracking-wider mb-6">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">What will you get</h2>
            <p className="text-zinc-400 max-w-xl text-lg leading-relaxed">A complete toolkit designed to replicate your creative DNA without the manual effort.</p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5 auto-rows-[220px]">
          
          {/* 1. Style DNA (TypeTester) - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 relative z-10">
              <TypeTester />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-xl text-white font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Fingerprint className="w-4 h-4 text-purple-400" />
                </div>
                Style DNA
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">AI that analyzes your tone, vocabulary, and hooks.</p>
            </div>
          </motion.div>

          {/* 2. Foundations (Layouts) - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 relative z-10">
              <LayoutAnimation />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-xl text-white font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Layout className="w-4 h-4 text-cyan-400" />
                </div>
                Foundations
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Structural templates proven to convert.</p>
            </div>
          </motion.div>

          {/* 3. Multi-Modal (Global Network) - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="relative">
                <GlobalNetwork />
              </div>
            </div>
            <div className="mt-auto relative z-20 bg-zinc-900/70 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <h3 className="font-display text-xl text-white flex items-center gap-3 font-semibold">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                Multi-Channel
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Generate for LinkedIn, Twitter, and Email simultaneously.</p>
            </div>
          </motion.div>

          {/* 4. Instant Boost (Speed) - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 relative z-10">
              <SpeedIndicator />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-xl text-white font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                Instant Boost
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">From blank page to posted in seconds.</p>
            </div>
          </motion.div>

          {/* 5. Secure (Security) - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 relative z-10">
              <SecurityBadge />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-xl text-white flex items-center gap-3 font-semibold">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 flex items-center justify-center">
                  <Lock className="w-4 h-4 text-rose-400" />
                </div>
                Secure & Private
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Your style data is yours. Secured via Supabase & n8n integration.</p>
            </div>
          </motion.div>

          {/* 6. Mobile Ready - Wide (3x1) */}
          <motion.div
            className="md:col-span-3 relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 rounded-2xl p-8 flex flex-col hover:border-white/20 transition-all duration-500 cursor-pointer overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.01 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            <div className="flex-1 flex items-center justify-center relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-display text-xl text-white font-semibold flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                </div>
                Mobile Ready
              </h3>
              <p className="text-zinc-400 text-sm mt-2 leading-relaxed">Generate content on the go. Optimized for all devices.</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default function BentoGrid() {
  return <FeaturesSection />
}