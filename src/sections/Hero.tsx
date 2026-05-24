import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, ShieldAlert, HeartHandshake, Landmark, Eye, Flag } from "lucide-react";
import FlagSimulation from "../components/FlagSimulation";
import Dheemak3DLogo from "../components/Dheemak3DLogo";

interface HeroProps {
  onJoinClick: () => void;
  onManifestoClick: () => void;
}

export default function Hero({ onJoinClick, onManifestoClick }: HeroProps) {
  const [activeVisual, setActiveVisual] = useState<"vision" | "flag" | "logo">("logo");

  // Let's configure a beautiful animated slide
  return (
    <div className="relative min-h-[90vh] bg-[#F7F4ED] overflow-hidden flex items-center pt-8 pb-16">
      {/* Dynamic Visual Gradient Circles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-djp-green/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 -right-32 w-[400px] h-[400px] bg-djp-saffron/5 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Interactive National Particle Lines (Background Elements) */}
      <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none break-words opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="20%" stroke="rgba(20, 83, 45, 0.08)" strokeWidth="1" fill="none" />
          <circle cx="50%" cy="50%" r="35%" stroke="rgba(255, 153, 51, 0.05)" strokeWidth="1.5" strokeDasharray="5,5" fill="none" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Headline and text */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Tagline Announcement badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-djp-green/10 text-djp-green px-4 py-2 rounded-full border border-djp-green/10 shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-djp-saffron animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">
                A Democratic Movement for Modern India
              </span>
            </motion.div>

            {/* Main political display heading */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-djp-charcoal leading-none">
                Building a <span className="text-djp-green">Clean, Equal</span> and <span className="relative inline-block text-djp-navy">
                  Progressive India
                  <span className="absolute left-0 bottom-0 w-full h-2 bg-djp-saffron/30 rounded" />
                </span>
              </h1>
            </motion.div>

            {/* Structured subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              Dheemak Janta Party (DJP) is committed to genuine reform. Under the leadership and vision of 
              Mohammad Umair Javid, we stand for employment, healthcare, education, equal opportunities, democratic transparency, and public-first governance.
            </motion.p>

            {/* Action buttons list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={onJoinClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-white bg-djp-green hover:bg-emerald-800 font-bold tracking-wide shadow-md hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Join The Movement</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </button>
              
              <button
                onClick={onManifestoClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-gray-700 bg-white border border-gray-200 hover:border-gray-350 hover:bg-gray-50 font-bold shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Read Manifesto</span>
              </button>
            </motion.div>

            {/* Fast Stats Blocks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 grid grid-cols-3 gap-6 border-t border-gray-200/60 max-w-md mx-auto lg:mx-0 font-mono"
            >
              <div>
                <dt className="text-[10px] text-gray-500 uppercase tracking-wider">Focus</dt>
                <dd className="text-sm font-bold text-djp-green mt-1">100% Civilian</dd>
              </div>
              <div className="border-l border-gray-200 pl-6">
                <dt className="text-[10px] text-gray-500 uppercase tracking-wider">Platform</dt>
                <dd className="text-sm font-bold text-djp-navy mt-1">Live CMS</dd>
              </div>
              <div className="border-l border-gray-200 pl-6">
                <dt className="text-[10px] text-gray-500 uppercase tracking-wider">Security</dt>
                <dd className="text-sm font-bold text-djp-saffron mt-1">Zero-Trust</dd>
              </div>
            </motion.div>

          </div>

          {/* Right Side Visual Block */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex flex-col items-center">
            
            {/* Visual Panel Modality Controls */}
            <div className="flex bg-[#EAE5D9]/75 p-1 rounded-2xl border border-gray-200/75 font-mono text-xs font-bold mb-4 z-20 shadow-sm">
              <button
                onClick={() => setActiveVisual("logo")}
                className={`px-3 py-2 rounded-xl transition duration-200 flex items-center space-x-1 cursor-pointer select-none ${
                  activeVisual === "logo" ? "bg-white text-djp-charcoal shadow" : "text-gray-550 hover:text-djp-charcoal"
                }`}
              >
                <span className="text-xs">🐜</span>
                <span>3D Logo</span>
              </button>
              <button
                onClick={() => setActiveVisual("flag")}
                className={`px-3 py-2 rounded-xl transition duration-200 flex items-center space-x-1 cursor-pointer select-none ${
                  activeVisual === "flag" ? "bg-white text-djp-charcoal shadow" : "text-gray-550 hover:text-djp-charcoal"
                }`}
              >
                <Flag className="h-3.5 w-3.5 text-[#FF9933]" />
                <span>Waving Flag</span>
              </button>
              <button
                onClick={() => setActiveVisual("vision")}
                className={`px-3 py-2 rounded-xl transition duration-200 flex items-center space-x-1 cursor-pointer select-none ${
                  activeVisual === "vision" ? "bg-white text-djp-charcoal shadow" : "text-gray-550 hover:text-djp-charcoal"
                }`}
              >
                <Eye className="h-3.5 w-3.5 text-djp-green" />
                <span>Leader's Vision</span>
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] bg-gradient-to-tr from-djp-green/10 via-white to-djp-saffron/10 p-4 border border-white/60 shadow-xl overflow-hidden flex flex-col justify-between"
            >
              {/* National colors background rings */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-djp-saffron/10 rounded-full blur-xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-djp-green/10 rounded-full blur-xl pointer-events-none" />
              
              <div className="h-full w-full rounded-2xl bg-white/70 backdrop-blur-md border border-white/80 p-5 flex flex-col justify-between relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {activeVisual === "logo" ? (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    >
                      <Dheemak3DLogo containerMode={true} />
                    </motion.div>
                  ) : activeVisual === "flag" ? (
                    <motion.div 
                      key="flag"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-10"
                    >
                      <FlagSimulation />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="vision"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col justify-between h-full relative z-10"
                    >
                      {/* Visual Emblem Circle */}
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-djp-green/10 flex items-center justify-center">
                          <Landmark className="h-6 w-6 text-djp-green" />
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono font-extrabold text-amber-600 uppercase border border-amber-300/30 px-2.5 py-1 rounded bg-amber-50/70">
                            Growing with Trust & Loyalty
                          </span>
                        </div>
                      </div>

                      {/* Aesthetic democratic card content */}
                      <div className="space-y-3 py-4">
                        <span className="text-[11px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                          Our Democratic Promise
                        </span>
                        <blockquote className="font-display text-base md:text-lg font-bold text-djp-charcoal italic leading-relaxed">
                          “DJP is not just an electoral party; it is a collaborative platform to establish robust healthcare, smart education, and true social parity for all.”
                        </blockquote>
                      </div>

                      {/* Signature box */}
                      <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                        <div className="w-8 h-8 rounded-full bg-djp-navy text-white font-bold flex items-center justify-center text-xs">
                          MU
                        </div>
                        <div>
                          <h5 className="font-display font-bold text-xs text-djp-charcoal">Mohammad Umair Javid</h5>
                          <p className="text-[10px] font-mono text-gray-500 font-medium">Founder, Dheemak Janta Party</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}
