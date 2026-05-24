import React from "react";
import { motion } from "motion/react";

export default function Dheemak3DLogo({ containerMode = false }: { containerMode?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${containerMode ? "w-full h-full" : "min-h-[80vh] bg-[#f7f4ed] py-12 px-4"}`}>

      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-djp-green/10 blur-[120px] opacity-40 pointer-events-none" />

      {/* Main Logo Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, rotateY: -15 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        whileHover={{
          rotateX: 4,
          rotateY: 8,
          scale: 1.015,
        }}
        className={`
          relative
          w-full
          ${containerMode ? "h-full rounded-2xl p-4" : "max-w-[400px] h-[400px] rounded-[40px] p-6"}
          bg-gradient-to-br
          from-white
          to-[#f5f1e8]
          shadow-[0_24px_70px_rgba(20,83,45,0.08)]
          border border-white/60
          backdrop-blur-xl
          flex
          flex-col
          items-center
          justify-center
          overflow-hidden
        `}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Inner Premium Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-djp-green/5 to-djp-saffron/5 pointer-events-none" />

        {/* Dynamic Rotating Dial Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          className="
            absolute
            w-[240px]
            h-[240px]
            rounded-full
            border-[4px]
            border-dashed
            border-djp-green/10
            pointer-events-none
          "
        />

        {/* Realistic Termite Vector SVG */}
        <motion.div
          animate={{
            y: [0, -6, 0],
            rotateZ: [0, 0.5, -0.5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="relative z-20 flex items-center justify-center p-4 drop-shadow-[0_20px_40px_rgba(20,83,45,0.18)]"
        >
          <svg
            width="120"
            height="150"
            viewBox="0 0 120 150"
            className="object-contain"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Gold/Amber realistic chitin gradients */}
              <linearGradient id="chitin-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D97706" />
                <stop offset="40%" stopColor="#F59E0B" />
                <stop offset="70%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#B45309" />
              </linearGradient>
              <linearGradient id="abdomen-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#78350F" />
                <stop offset="50%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </linearGradient>
              <filter id="chitin-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* ANTENNAE WITH gently animated micro-movements */}
            <g filter="url(#chitin-shadow)">
              <motion.path
                d="M 52,25 C 45,15 32,10 24,14"
                fill="none"
                stroke="#92400E"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ rotate: [0, -3, 3, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                style={{ transformOrigin: "52px 25px" }}
              />
              <motion.path
                d="M 68,25 C 75,15 88,10 96,14"
                fill="none"
                stroke="#92400E"
                strokeWidth="2.5"
                strokeLinecap="round"
                animate={{ rotate: [0, 3, -3, 0] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
                style={{ transformOrigin: "68px 25px" }}
              />
            </g>

            {/* SIX LEGS with high precision segment lines */}
            <g stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
              {/* Front Legs */}
              <path d="M 45,45 C 32,40 22,32 15,35" />
              <path d="M 75,45 C 88,40 98,32 105,35" />

              {/* Middle Legs */}
              <path d="M 46,65 C 28,68 18,62 10,70" />
              <path d="M 74,65 C 92,68 102,62 110,70" />

              {/* Rear Legs */}
              <path d="M 48,85 C 30,95 24,105 18,118" />
              <path d="M 72,85 C 90,95 96,105 102,118" />
            </g>

            {/* HEAD (Termite head is smaller, oval/shield) */}
            <ellipse 
              cx="60" 
              cy="34" 
              rx="12" 
              ry="14" 
              fill="url(#chitin-glow)" 
              filter="url(#chitin-shadow)" 
            />
            {/* Tiny stylized insect eyes */}
            <circle cx="51" cy="30" r="1.8" fill="#451A03" />
            <circle cx="69" cy="30" r="1.8" fill="#451A03" />

            {/* THORAX SENSORY PLATE */}
            <ellipse 
              cx="60" 
              cy="55" 
              rx="15" 
              ry="12" 
              fill="url(#chitin-glow)" 
              filter="url(#chitin-shadow)" 
            />

            {/* THE MAJESTIC ABDOMEN (Dheemak abdomen is large, cream/gold segmented) */}
            <rect 
              x="40" 
              y="72" 
              width="40" 
              height="55" 
              rx="20" 
              fill="url(#abdomen-gradient)" 
              filter="url(#chitin-shadow)" 
            />

            {/* Realistic abdominal segment ridges (highlights) */}
            <g opacity="0.4" stroke="#FFF" strokeWidth="1" fill="none">
              <path d="M 42,82 Q 60,86 78,82" />
              <path d="M 41,92 Q 60,96 79,92" />
              <path d="M 41,102 Q 60,106 79,102" />
              <path d="M 43,112 Q 60,116 77,112" />
            </g>
          </svg>
        </motion.div>

        {/* DJP Text Label */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="
            mt-4
            text-5xl
            font-black
            tracking-tight
            bg-gradient-to-b
            from-[#14532D]
            to-[#0d331c]
            bg-clip-text
            text-transparent
            leading-all
            select-none
          "
          style={{
            textShadow: "0px 8px 24px rgba(20,83,45,0.15)",
          }}
        >
          DJP
        </motion.h1>

        {/* Dynamic Party Name */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="
            mt-1.5
            text-djp-charcoal
            text-sm
            font-extrabold
            tracking-[3px]
            uppercase
            select-none
          "
        >
          Dheemak Janta Party
        </motion.p>

        {/* Tagline */}
        <p className="mt-1.5 text-gray-500 text-[11px] tracking-wide select-none font-medium">
          Voice of the People • Vision for the Nation
        </p>

        {/* Indian Saffron/White/Green Accent Bar */}
        <div
          className="
            absolute
            bottom-0
            left-0
            w-full
            h-[6px]
            bg-gradient-to-r
            from-[#FF9933]
            via-white
            to-[#138808]
          "
        />

        {/* Floating Particles Sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              repeat: Infinity,
              duration: 3 + i * 0.4,
              ease: "easeInOut",
            }}
            className="
              absolute
              w-1.5
              h-1.5
              rounded-full
              bg-djp-green/20
              pointer-events-none
            "
            style={{
              top: `${15 + Math.random() * 70}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
