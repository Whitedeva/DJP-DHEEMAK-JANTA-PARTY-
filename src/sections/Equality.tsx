import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Users, Flame, Award, Scale, HelpCircle, CheckCircle, Fingerprint } from "lucide-react";

interface CitizenNode {
  id: number;
  label: string;
  originalGroup: string;
  originalSize: number; // For representing the VIP disparity
  casteColor: string;
}

export default function Equality() {
  const [simulationState, setSimulationState] = useState<"corrupt" | "equal">("equal");

  // Representing 12 diverse Indian citizens
  const citizens: CitizenNode[] = [
    { id: 1, label: "Farmer", originalGroup: "Aam Citizen", originalSize: 14, casteColor: "#F59E0B" },
    { id: 2, label: "Bureaucrat", originalGroup: "VIP Class", originalSize: 32, casteColor: "#3B82F6" },
    { id: 3, label: "Teacher", originalGroup: "Aam Citizen", originalSize: 15, casteColor: "#10B981" },
    { id: 4, label: "Politician", originalGroup: "VIP Class", originalSize: 34, casteColor: "#EF4444" },
    { id: 5, label: "Student", originalGroup: "Aam Citizen", originalSize: 13, casteColor: "#8B5CF6" },
    { id: 6, label: "Shopkeeper", originalGroup: "Aam Citizen", originalSize: 14, casteColor: "#EC4899" },
    { id: 7, label: "Doctor", originalGroup: "Aam Citizen", originalSize: 16, casteColor: "#06B6D4" },
    { id: 8, label: "Industrialist", originalGroup: "VIP Class", originalSize: 36, casteColor: "#6366F1" },
    { id: 9, label: "Laborer", originalGroup: "Aam Citizen", originalSize: 12, casteColor: "#14532D" },
    { id: 10, label: "Engineer", originalGroup: "Aam Citizen", originalSize: 15, casteColor: "#F43F5E" },
    { id: 11, label: "Artist", originalGroup: "Aam Citizen", originalSize: 13, casteColor: "#D97706" },
    { id: 12, label: "Judge", originalGroup: "VIP Class", originalSize: 28, casteColor: "#4B5563" },
  ];

  // Positions on the canvas based on active state
  // Corrupt state has segmented groups, giant VIP nodes, and spatial disparity
  // Equal state has them uniform, perfectly leveled in a beautiful balanced circle, gold and green theme
  const getNodeStyles = (node: CitizenNode, index: number) => {
    if (simulationState === "corrupt") {
      const isVIP = node.originalGroup === "VIP Class";
      // VIPs clustered high, Aam citizens pushed low
      let x = 0;
      let y = 0;
      if (isVIP) {
        // Spread along top
        const vipIndex = [2, 4, 8, 12].indexOf(node.id);
        x = 10 + vipIndex * 26; // percent width
        y = 15;
      } else {
        // Spread along bottom
        const aamIndex = [1, 3, 5, 6, 7, 9, 10, 11].indexOf(node.id);
        x = 8 + aamIndex * 11;
        y = 65;
      }
      return {
        x: `${x}%`,
        y: `${y}%`,
        size: node.originalSize * 1.6,
        color: isVIP ? "#991B1B" : "#4B5563",
        text: node.label,
        tag: node.originalGroup,
        glow: isVIP ? "rgba(239, 68, 68, 0.4)" : "rgba(0,0,0,0.05)"
      };
    } else {
      // Perfect concentric golden circle representing total equality
      const radius = 32; // percent radius
      const angle = (index * 2 * Math.PI) / citizens.length;
      const x = 50 + radius * Math.cos(angle);
      const y = 48 + radius * Math.sin(angle);
      return {
        x: `${x}%`,
        y: `${y}%`,
        size: 26, // Every single citizen has identical size
        color: "#14532D", // Unified Dheemak Green
        text: "Indian", // No classification
        tag: "Equal Citizen",
        glow: "rgba(20, 83, 45, 0.2)"
      };
    }
  };

  return (
    <section id="equality" className="py-24 bg-[#FAF8F5] relative overflow-hidden border-b border-gray-100">
      
      {/* Absolute Decorative Ambient Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-[#138808]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FF9933]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-djp-green bg-emerald-500/10 px-3 py-1.5 rounded-full uppercase">
            Core Constitution Principle
          </span>
          <h2 className="font-display text-4xl font-black text-djp-charcoal mt-4 tracking-tight leading-all">
            We Are Only Indians. We Are Equal.
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-sm">
            Dheemak Janta Party stands for the complete eradication of VIP culture (<span className="font-semibold text-djp-charcoal">Khas</span> versus <span className="font-semibold text-djp-charcoal">Aam</span>) and absolute judicial parity. Under our leadership, no caste, color, or religion divides us.
          </p>
        </div>

        {/* Dynamic interactive grid row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Equality Charter Points */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-5">
              <div className="flex items-center space-x-3 text-[#FF9933]">
                <Scale className="h-6 w-6 text-djp-saffron" />
                <h3 className="font-display text-xl font-bold text-djp-charcoal">The Parity Manifesto</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Modern feudalism has crippled the growth of ordinary youth. Feudal lords use sirens, protocols, and barriers to shield themselves while implementing regulations selectively. DJP is on a relentless mission to dissolve these structures.
              </p>
            </div>

            <div className="space-y-4">
              
              {/* Point 1 */}
              <div className="flex space-x-4 bg-white/70 p-4.5 rounded-2xl border border-gray-150/50 hover:border-[#14532D]/30 transition duration-300">
                <div className="p-2 bg-emerald-50 text-djp-green rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  <span className="font-black text-sm">01</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-djp-charcoal">Zero VIP Protocol</h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    No flashing beacon lights, no special lanes, no arbitrary security barricades blocking local traffic. Every official travels under the same conditions as the public they represent.
                  </p>
                </div>
              </div>

              {/* Point 2 */}
              <div className="flex space-x-4 bg-white/70 p-4.5 rounded-2xl border border-gray-150/50 hover:border-[#14532D]/30 transition duration-300">
                <div className="p-2 bg-amber-50 text-djp-saffron rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  <span className="font-black text-sm">02</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-djp-charcoal">No Division Criteria</h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    We strictly forbid state classification by caste, color, or religion. In the national register, every individual is logged simply and purely as: <span className="font-bold">INDIAN CITIZEN</span>.
                  </p>
                </div>
              </div>

              {/* Point 3 */}
              <div className="flex space-x-4 bg-white/70 p-4.5 rounded-2xl border border-gray-150/50 hover:border-[#14532D]/30 transition duration-300">
                <div className="p-2 bg-indigo-50 text-[#6366F1] rounded-xl shrink-0 h-10 w-10 flex items-center justify-center">
                  <span className="font-black text-sm">03</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-djp-charcoal">Equal Law Implementation</h4>
                  <p className="text-[11px] text-gray-550 leading-relaxed mt-1">
                    Universal, transparent justice. The rule of law behaves identically whether it impacts the most powerful politician or the humblest laborer. Double standards are completely eradicated.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive Equality Simulator */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-[40px] border border-gray-150 shadow-sm flex flex-col justify-between h-[520px] relative">
            
            {/* Simulation Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 mb-4 gap-4 z-10">
              <div>
                <h4 className="font-sans font-bold text-djp-charcoal text-base">Interactive Equality Node Grid</h4>
                <p className="text-[10px] text-gray-400">Toggle states to simulate absolute state parity versus traditional systemic bias</p>
              </div>

              {/* State Controls */}
              <div className="flex bg-[#F7F4ED] p-1 rounded-xl border border-gray-200 text-[10px] font-mono font-black shadow-inner self-start sm:self-auto shrink-0">
                <button
                  onClick={() => setSimulationState("corrupt")}
                  className={`px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer ${
                    simulationState === "corrupt" ? "bg-red-800 text-white shadow" : "text-gray-500 hover:text-red-800"
                  }`}
                >
                  Systemic Bias Outpost
                </button>
                <button
                  onClick={() => setSimulationState("equal")}
                  className={`px-3 py-1.5 rounded-lg transition duration-200 cursor-pointer ${
                    simulationState === "equal" ? "bg-[#14532D] text-white shadow" : "text-gray-550 hover:text-[#14532D]"
                  }`}
                >
                  DJP Unified Parity Code
                </button>
              </div>
            </div>

            {/* Simulation Arena Canvas */}
            <div className="flex-grow w-full bg-[#FAF8F5] rounded-3xl border border-gray-100 relative overflow-hidden">
              
              {/* Dynamic Grid Background Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-35" />

              {/* Central Law Beacon for Equal State */}
              <AnimatePresence>
                {simulationState === "equal" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center text-center pointer-events-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-dashed border-[#FF9933]/50 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                      <Fingerprint className="h-7 w-7 text-djp-saffron" />
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-[4px] font-bold text-[#14532D] mt-2 block">
                      ONLY INDIAN
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Segment Divides for Systemic Bias State */}
              <AnimatePresence>
                {simulationState === "corrupt" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col justify-between p-6 pointer-events-none"
                  >
                    <div className="text-[10px] font-mono font-bold text-red-800/80 bg-red-50 border border-red-200 rounded-lg px-2 py-1 self-start">
                      🚨 Elite / VIP Protocol Segment
                    </div>
                    <div className="border-t border-dashed border-red-300/60 w-full" />
                    <div className="text-[10px] font-mono font-bold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 self-start">
                      ⛔ Ordinary Public / Class Barriers
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Render Animated Citizen Nodes */}
              {citizens.map((citizen, idx) => {
                const style = getNodeStyles(citizen, idx);
                return (
                  <motion.div
                    key={citizen.id}
                    layoutId={`citizen-node-${citizen.id}`}
                    animate={{
                      left: style.x,
                      top: style.y,
                      backgroundColor: style.color,
                      width: style.size,
                      height: style.size,
                      boxShadow: `0 0 15px ${style.glow}`
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 15,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center group cursor-pointer"
                  >
                    {/* Concentric highlight ring inside code node */}
                    <div className="w-2.5 h-2.5 rounded-full bg-white/40" />

                    {/* Popover description bubble on hover */}
                    <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-full mb-2 bg-djp-charcoal text-white text-[10px] rounded-lg py-1 px-2.5 whitespace-nowrap z-40 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-lg flex flex-col items-center">
                      <span className="font-bold">{style.text === "Indian" ? `Citizen #${citizen.id}` : citizen.label}</span>
                      <span className="text-[8px] font-mono text-gray-400">{style.tag}</span>
                    </div>
                  </motion.div>
                );
              })}

            </div>

            {/* Bottom Dynamic Status Bar */}
            <div className="mt-4 bg-[#F7F4ED] p-4.5 rounded-2xl border border-gray-150 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className={`h-2.5 w-2.5 rounded-full ${simulationState === "equal" ? "bg-emerald-600 animate-pulse" : "bg-red-650"}`} />
                <span className="text-[11px] font-bold text-djp-charcoal">
                  {simulationState === "equal" 
                    ? "DJP Active Protocol: 100% Equal Enforcement Grid" 
                    : "Traditional Status: Segregated VIP / Feudalistic Disparity Pipeline"
                  }
                </span>
              </div>
              <span className="text-[10px] font-mono text-gray-500 font-medium">SYS: OK</span>
            </div>

            {/* Side Accent Bar */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[4px] h-[60%] rounded-r-lg bg-gradient-to-b from-[#FF9933] to-[#138808]" />

          </div>

        </div>

      </div>
    </section>
  );
}
