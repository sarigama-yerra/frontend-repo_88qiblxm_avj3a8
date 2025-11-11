import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Spline from '@splinetool/react-spline'
import { ShieldCheck, ArrowDown, Cpu, Atom, Server, Database, Sparkles } from 'lucide-react'

// Small typed text hook
const useTypedText = (fullText, speed = 60, delay = 300) => {
  const [text, setText] = useState('')
  useEffect(() => {
    let i = 0
    const start = setTimeout(() => {
      const id = setInterval(() => {
        setText(fullText.slice(0, i + 1))
        i++
        if (i >= fullText.length) clearInterval(id)
      }, speed)
    }, delay)
    return () => clearTimeout(start)
  }, [fullText, speed, delay])
  return text
}

// Subtle tilt helper
const useTilt = () => {
  const [style, setStyle] = useState({ transform: 'rotateX(0deg) rotateY(0deg)' })
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const rx = ((y / rect.height) - 0.5) * -6
    const ry = ((x / rect.width) - 0.5) * 6
    setStyle({ transform: `rotateX(${rx}deg) rotateY(${ry}deg)` })
  }
  const onLeave = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' })
  return { style, onMove, onLeave }
}

function CursorFlame() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 300, damping: 30, mass: 0.4 })
  const y = useSpring(my, { stiffness: 300, damping: 30, mass: 0.4 })

  useEffect(() => {
    const move = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mx, my])

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[60] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ left: x, top: y, background: 'radial-gradient(closest-side, rgba(56,189,248,0.25), rgba(99,102,241,0.15), transparent)', filter: 'blur(8px)' }}
    />
  )
}

function Hero() {
  const title = useTypedText('PromptShield AI', 70, 250)
  const subtitle = useMemo(() => 'Securing AI Conversations', [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const glow = useTransform([mx, my], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(56,189,248,0.18), transparent 60%)`)

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <section className="relative h-[100svh] overflow-hidden bg-[#050814] text-white" onMouseMove={onMouseMove}>
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/DtQLjBkD1UpownGS/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <motion.div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: glow }} />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050814]/30 via-[#050814]/60 to-[#050814]" />

      <div className="relative z-10 h-full max-w-6xl mx-auto flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-3 rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/30 shadow-[0_0_40px_rgba(34,211,238,0.35)]"
            >
              <ShieldCheck className="w-7 h-7 text-cyan-300" />
            </motion.div>
            <motion.span className="absolute inset-0 rounded-full" animate={{ boxShadow: ['0 0 0 0 rgba(34,211,238,0.5)','0 0 0 18px rgba(34,211,238,0)'] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>

        <div className="relative">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
            {title || '\u00A0'}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-4 text-lg sm:text-xl text-cyan-100/85"
          >
            {subtitle}
          </motion.p>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }} className="mt-6 max-w-2xl text-cyan-100/75">
          Your AI firewall — Detect. Defend. Deliver Safe Prompts.
        </motion.p>

        <motion.a
          href="#about"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="group relative mt-10 inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 text-white font-semibold shadow-[0_10px_30px_rgba(59,130,246,0.35)] ring-1 ring-white/10"
        >
          <span>Get Started</span>
          <Sparkles className="w-4 h-4 opacity-90" />
          <span className="absolute -inset-px rounded-xl bg-gradient-to-r from-cyan-400/40 via-blue-400/40 to-violet-400/40 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.a>

        <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.1, duration: 0.8 }} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-cyan-200/70">
          <div className="relative h-8 w-8">
            <motion.div className="absolute inset-0 rounded-full border border-cyan-400/30" animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.2, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
            <ArrowDown className="absolute inset-0 m-auto w-5 h-5" />
          </div>
          <span className="text-xs mt-1">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="relative py-24 sm:py-28 bg-[#070b1c] text-white">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(59,130,246,0.18),transparent)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-200 via-blue-200 to-violet-200 bg-clip-text text-transparent">
            {title}
          </h2>
          {subtitle && <p className="mt-3 text-cyan-100/75">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  )
}

function About() {
  const cards = [
    { icon: <Cpu className="w-6 h-6" />, title: 'Built for AI Safety', desc: 'PromptShield AI filters harmful or jailbreak prompts before they reach AI agents like ChatGPT or Gemini. Combining rule-based and ML detection, it ensures ethical and secure AI communication.' },
  ]
  const features = [
    { label: 'Dual Security Layers', icon: <ShieldCheck className="w-5 h-5" /> },
    { label: 'ML-Powered Detection', icon: <Cpu className="w-5 h-5" /> },
    { label: 'API Middleware Integration', icon: <Server className="w-5 h-5" /> },
  ]
  return (
    <Section id="about" title="Built for AI Safety">
      <div className="grid md:grid-cols-2 gap-8">
        {cards.map((c, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: i * 0.1 }} className="group relative p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center gap-3 text-cyan-300 mb-3">{c.icon}<span className="font-semibold">{c.title}</span></div>
            <p className="text-cyan-100/80 leading-relaxed">{c.desc}</p>
            <div className="mt-5 grid sm:grid-cols-3 gap-3">
              {features.map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 ring-1 ring-white/10 text-cyan-100/85">
                  {f.icon}
                  <span className="text-sm">{f.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: 0.2 }} className="relative p-6 rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-xl flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-cyan-500/10 ring-1 ring-cyan-400/30 mb-3">
              <ShieldCheck className="w-7 h-7 text-cyan-300" />
            </div>
            <p className="text-cyan-100/80 max-w-md">Your AI firewall — Detect. Defend. Deliver Safe Prompts.</p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Architecture() {
  const steps = [
    'Prompt Intake',
    'NLP Pre-processing',
    'Rule-Based Detection',
    'ML Detection',
    'Decision Engine',
    'Dashboard',
  ]
  const [hover, setHover] = useState(null)
  return (
    <Section id="architecture" title="Architecture Flow" subtitle="Interactive pipeline with dual-layer protection">
      <div className="relative overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-6 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative p-4 rounded-xl bg-white/5 ring-1 ring-white/10 text-center"
            >
              <div className="text-sm font-medium text-cyan-100/90">{s}</div>
              <motion.div
                className="absolute -right-3 top-1/2 -translate-y-1/2 hidden md:block"
                animate={{ opacity: i < steps.length - 1 ? 1 : 0 }}
              >
                <div className="h-1 w-6 bg-gradient-to-r from-cyan-400 to-violet-400 rounded-full" />
              </motion.div>

              {hover === i && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 top-full w-56 text-xs p-3 rounded-lg bg-[#0a122a] ring-1 ring-white/10 text-cyan-100/90 shadow-lg">
                  {s === 'Prompt Intake' && 'Receives prompts from apps or chat interfaces.'}
                  {s === 'NLP Pre-processing' && 'Cleans, normalizes, and tokenizes input for analysis.'}
                  {s === 'Rule-Based Detection' && 'Fast patterns catch obvious jailbreaks and unsafe instructions.'}
                  {s === 'ML Detection' && 'Classifier scores nuanced risks based on learned signals.'}
                  {s === 'Decision Engine' && 'Combines signals to allow, block, or request clarification.'}
                  {s === 'Dashboard' && 'Monitor incidents, adjust rules, and export reports.'}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}

function TechStack() {
  const items = [
    { label: 'React', icon: <Atom className="w-6 h-6" /> },
    { label: 'Node', icon: <Server className="w-6 h-6" /> },
    { label: 'Python', icon: <Cpu className="w-6 h-6" /> },
    { label: 'MongoDB', icon: <Database className="w-6 h-6" /> },
  ]
  return (
    <Section id="tech" title="Tech Stack" subtitle="Connected frontends, backends, and ML services">
      <div className="relative rounded-3xl p-8 ring-1 ring-white/10 bg-[radial-gradient(800px_400px_at_50%_-20%,rgba(59,130,246,0.18),transparent)]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div key={it.label} whileHover={{ scale: 1.05 }} className="group flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/5 ring-1 ring-white/10">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition" />
                <div className="relative text-cyan-300">{it.icon}</div>
              </div>
              <div className="text-sm text-cyan-100/85">{it.label}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 mx-auto max-w-3xl h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 rounded-full" />
        <p className="mt-4 text-center text-cyan-100/70 text-sm">Animated data flow connects UI → middleware → ML scoring service.</p>
      </div>
    </Section>
  )
}

function ProsCons() {
  const pros = ['AI Safety', 'Multi-Model Protection', 'Scalable Middleware']
  const cons = ['Dataset Dependency', 'False Positives Risk', 'Model Maintenance Required']
  const pTilt = useTilt()
  const cTilt = useTilt()
  return (
    <Section id="pros" title="Pros & Cons">
      <div className="grid md:grid-cols-2 gap-8">
        <div onMouseMove={pTilt.onMove} onMouseLeave={pTilt.onLeave} style={pTilt.style} className="transition-transform will-change-transform">
          <div className="relative p-6 rounded-2xl bg-cyan-500/10 ring-1 ring-cyan-400/30">
            <h3 className="font-semibold text-cyan-200 mb-3">Pros</h3>
            <ul className="space-y-2 text-cyan-100/85">
              {pros.map((p) => (
                <li key={p} className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-cyan-400" /> {p}</li>
              ))}
            </ul>
          </div>
        </div>
        <div onMouseMove={cTilt.onMove} onMouseLeave={cTilt.onLeave} style={cTilt.style} className="transition-transform will-change-transform">
          <div className="relative p-6 rounded-2xl bg-rose-500/10 ring-1 ring-rose-400/30">
            <h3 className="font-semibold text-rose-200 mb-3">Cons</h3>
            <ul className="space-y-2 text-rose-100/85">
              {cons.map((p) => (
                <li key={p} className="flex items-center gap-2"><span className="inline-block h-2 w-2 rounded-full bg-rose-400" /> {p}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Team() {
  const members = [
    { name: 'Ava Flux', role: 'Product Lead', id: 'CMS-PS001' },
    { name: 'Noah Cipher', role: 'ML Engineer', id: 'CMS-PS002' },
    { name: 'Kai Vector', role: 'Security Researcher', id: 'CMS-PS003' },
  ]
  return (
    <Section id="team" title="The Team" subtitle="Holographic profiles with roles and IDs">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6, delay: i * 0.05 }} className="group relative p-6 rounded-2xl bg-white/5 ring-1 ring-white/10">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition" />
            <div className="relative">
              <div className="h-20 w-20 mx-auto rounded-xl bg-gradient-to-br from-cyan-400/30 to-violet-400/30 ring-1 ring-white/10" />
              <h4 className="mt-4 text-lg font-semibold text-white">{m.name}</h4>
              <p className="text-cyan-200/90">{m.role}</p>
              <p className="mt-1 text-xs text-cyan-100/60">{m.id}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050814] text-cyan-100/75">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-[radial-gradient(200px_80px_at_20%_100%,rgba(59,130,246,0.25),transparent),radial-gradient(220px_100px_at_60%_100%,rgba(139,92,246,0.22),transparent),radial-gradient(200px_80px_at_90%_100%,rgba(6,182,212,0.25),transparent)]" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="hover:text-cyan-100 transition-colors">© 2025 PromptShield AI — Powered by flames.blue</p>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])

  return (
    <div className="min-h-screen bg-[#050814]">
      <CursorFlame />
      <Hero />
      <About />
      <Architecture />
      <TechStack />
      <ProsCons />
      <Team />
      <Footer />
    </div>
  )
}
