import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Briefcase, Heart, BookOpen, Layers, Users, Landmark, HelpCircle, 
  ArrowRight, Check, X, Shield, Smartphone, Globe, Cpu, Zap, 
  TrendingUp, Award, ChevronRight, Clock
} from "lucide-react";
import gsap from "gsap";

interface Proposal {
  title: string;
  desc: string;
  icon: any;
}

interface TargetMetric {
  label: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  color: string;
  // Year values for timeline forecast scope
  year1: number;
  year3: number;
  year5: number;
}

interface Milestone {
  year: string;
  title: string;
  goal: string;
}

interface Pillar {
  id: string;
  topic: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  icon: any;
  bulletPoints: string[];
  gradient: string;
  bgDecorative: string;
  borderClass: string;
  primaryColor: string;
  accentColor: string;
  proposals: Proposal[];
  metrics: TargetMetric[];
  milestones: Milestone[];
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevValueRef = useRef<number>(0);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value;
    if (start === end) {
      setDisplayValue(end);
      return;
    }
    
    const duration = 800; // ms for elegant transition
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // cubic bezier / easeOutQuart transition
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      const current = Math.round(start + easeProgress * (end - start));
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = end;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  useEffect(() => {
    return () => {
      prevValueRef.current = 0;
    };
  }, []);

  return <>{displayValue}</>;
}

export default function Manifesto() {
  const [activePillar, setActivePillar] = useState<string | null>(null);
  const [timelineScope, setTimelineScope] = useState<"y1" | "y3" | "y5">("y1");
  const [activeTab, setActiveTab] = useState<"blueprint" | "proposals" | "milestones">("blueprint");

  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const metricsContainerRef = useRef<HTMLDivElement>(null);

  const pillars: Pillar[] = [
    {
      id: "emp",
      topic: "EMPLOYMENT",
      title: "Youth Tech & Sustainable Labor",
      shortDesc: "Comprehensive job coordination using digital freelancing hubs and startup infrastructure support.",
      longDesc: "DJP's employment paradigm completely remodels the regional labor network. We side-step intermediate exploitative layers by integrating local skilled youth directly with high-bandwidth global and domestic digital resource channels, while guaranteeing transparent, green-collared public work wages.",
      icon: Briefcase,
      gradient: "from-amber-500/15 via-djp-saffron/10 to-transparent",
      bgDecorative: "text-amber-500",
      borderClass: "border-l-4 border-djp-saffron",
      primaryColor: "#FF9933",
      accentColor: "text-[#FF9933]",
      proposals: [
        { title: "National Employment Generation", desc: "A transparent digital coordinate system aligning local youth with municipal and district-level public asset projects.", icon: Briefcase },
        { title: "District Digital Freelance Hubs", desc: "Setting up 36 high-capacity community work spaces equipped with high-speed satellite networks and workstations.", icon: Globe },
        { title: "Sovereign Seed Matching System", desc: "Providing non-dilutive matched state seed funds up to ₹25 Lakhs for regional startups solving local issues.", icon: Zap }
      ],
      metrics: [
        { label: "Youth Tech Freelancing Rate", currentValue: 14, targetValue: 75, unit: "%", color: "#FF9933", year1: 30, year3: 55, year5: 75 },
        { label: "State-Wide Digital Hubs Built", currentValue: 2, targetValue: 36, unit: " hubs", color: "#1E3A8A", year1: 10, year3: 24, year5: 36 },
        { label: "Sovereign Seed Capital Deployed", currentValue: 4, targetValue: 50, unit: " Cr (₹)", color: "#14532D", year1: 15, year3: 35, year5: 50 }
      ],
      milestones: [
        { year: "Year 1", title: "Infrastructure Inception", goal: "Construct first 10 High-Bandwidth Digital Hubs across state districts." },
        { year: "Year 3", title: "Sovereign Capital Pool", goal: "Activate non-dilutive seed matches and fund 150+ regional IT start-ups." },
        { year: "Year 5", title: "Integrated Network Goals", goal: "Integrate 75,000+ local youth with sustainable remote-working platforms." }
      ],
      bulletPoints: [
        "National Employment Generation System aligning direct labor to public projects.",
        "Tier-Based Smart Hackathons and seed matching for Indian tech startups.",
        "District-level high-bandwidth digital freelancing hubs supporting young developers.",
        "Skill-upskilling coordinate classes for informal sectors & local merchants."
      ]
    },
    {
      id: "health",
      topic: "HEALTHCARE",
      title: "Decentralized Medical Networks",
      shortDesc: "Establishing fully equipped clinics and emergency centers safely divided in state, district, and tehsil loops.",
      longDesc: "Premium healthcare is a basic fundamental pillar of public dignity. DJP will move localized medical networks closer to residential centers, adding Level-2 triage units, connected directly with state research campuses via AI-enhanced diagnostic telemetry.",
      icon: Heart,
      gradient: "from-[#14532D]/15 via-emerald-800/5 to-transparent",
      bgDecorative: "text-emerald-700",
      borderClass: "border-l-4 border-djp-green",
      primaryColor: "#14532D",
      accentColor: "text-[#14532D]",
      proposals: [
        { title: "Tehsil Emergi-Nodes", desc: "Establishing fully operational triage clinics inside 150+ tehsils with critical coronary and ventilation services.", icon: Heart },
        { title: "AI Telehealth Diagnostic Cells", desc: "Unifying remote clinics with central medical specialists over high-bandwidth camera arrays.", icon: Smartphone },
        { title: "Zilla Free Diagnostics Initiative", desc: "Fully subsidizing complex MRIs, CT scans, and metabolic blood panels at all public district hospitals.", icon: Shield }
      ],
      metrics: [
        { label: "Tehsil Emergi-Node Coverage", currentValue: 18, targetValue: 95, unit: "%", color: "#14532D", year1: 40, year3: 75, year5: 95 },
        { label: "Average Response & Diagnostics", currentValue: 45, targetValue: 5, unit: " min", color: "#FF9933", year1: 25, year3: 12, year5: 5 },
        { label: "Equipped Zilla Special Diagnostics", currentValue: 4, targetValue: 20, unit: " centers", color: "#1E3A8A", year1: 8, year3: 15, year5: 20 }
      ],
      milestones: [
        { year: "Year 1", title: "Emergency Deployment", goal: "Construct core diagnostic units on first 50 targeted tehsils." },
        { year: "Year 3", title: "Direct Satellite Sync", goal: "Facilitate direct real-time telemedicine and scale specialized checkups." },
        { year: "Year 5", title: "Complete Safety Mesh", goal: "Secure 95% immediate emergency response index state-wide." }
      ],
      bulletPoints: [
        "Establishment of premium primary emergency units in every single Tehsil.",
        "Multi-Specialty research-enabled referral hospitals in State capitals.",
        "Fully modernized district (Zilla) clinics with diagnostics & telehealth support.",
        "Guaranteed accessible basic medical security for underprivileged citizens."
      ]
    },
    {
      id: "edu",
      topic: "EDUCATION",
      title: "Empower Free Quality Classrooms",
      shortDesc: "Equipping schools in state, district, and tehsil with smart tools, clean facilities, and modern learning.",
      longDesc: "DJP guarantees clean, highly interactive, and computer-equipped secondary schools across every district, integrating modular upskilling platforms focus areas (coding, freelancing, and technical trades) inside standard syllabus blocks.",
      icon: BookOpen,
      gradient: "from-blue-600/15 via-djp-navy/10 to-transparent",
      bgDecorative: "text-blue-700",
      borderClass: "border-l-4 border-djp-navy",
      primaryColor: "#1E3A8A",
      accentColor: "text-[#1E3A8A]",
      proposals: [
        { title: "Tehsil Smart projection setups", desc: "Modernizing classrooms with digital projection tools and responsive solar-powered grids.", icon: BookOpen },
        { title: "CodeBharat Tech Laboratories", desc: "Securing student-ready computers and specialized software mentors for practical secondary education.", icon: Cpu },
        { title: "Subsidized Rural Learning Devices", desc: "Distributing pre-configured educational tablets loaded with multi-lingual interactive courses.", icon: Smartphone }
      ],
      metrics: [
        { label: "Tehsil Smart Projection Integration", currentValue: 15, targetValue: 100, unit: "%", color: "#1E3A8A", year1: 45, year3: 80, year5: 100 },
        { label: "Active Code Bharat Labs", currentValue: 8, targetValue: 85, unit: "% schools", color: "#14532D", year1: 30, year3: 65, year5: 85 },
        { label: "Practical Skill Syllabus Share", currentValue: 20, targetValue: 100, unit: "% match", color: "#FF9933", year1: 50, year3: 85, year5: 100 }
      ],
      milestones: [
        { year: "Year 1", title: "Smart-Enforced Classrooms", goal: "Introduce smart learning arrays to 400 school campuses in remote blocks." },
        { year: "Year 3", title: "Device Proliferation Map", goal: "Disburse 50,000+ interactive study terminals and implement practical coding tests." },
        { year: "Year 5", title: "Syllabus Realigned", goal: "Secure 100% integration of technical freelance modules within high schools." }
      ],
      bulletPoints: [
        "Fully modernized classrooms integrated with smart projection and computer setups in every Tehsil.",
        "Syllabus realignment classes focusing on active technological freelancing and technical skills.",
        "Free and democratic distribution of e-learning digital devices for rural districts.",
        "Robust vocational training centers in coordination with local medium-scale factories."
      ]
    },
    {
      id: "clean",
      topic: "CLEAN & GREEN NATION",
      title: "Sustainable Circular Ecology",
      shortDesc: "Implementing clean India waste cycles, green local grids, and intensive re-plantation loops.",
      longDesc: "Environmental safety directly links with localized economic longevity. DJP is committed to state-subsidized neighborhood solar setups for agrarian grids, mechanized state waste sorting, and direct bio-remediation of important lakes.",
      icon: Layers,
      gradient: "from-green-600/15 via-emerald-600/5 to-transparent",
      bgDecorative: "text-green-700",
      borderClass: "border-l-4 border-emerald-600",
      primaryColor: "#059669",
      accentColor: "text-emerald-600",
      proposals: [
        { title: "Tehsil Micro Solar Grids", desc: "Setting up small-scale 100kW agricultural solar stations for village pumping and storage needs.", icon: Layers },
        { title: "Zero Landfill Decentralization", desc: "Providing robotic sorting, automated composting mechanisms within local city borders.", icon: Zap },
        { title: "Prathama Watershed Remediation", desc: "Installing high-efficiency water silt filters and bioshield locks to secure drinking aquifer lines.", icon: Check }
      ],
      metrics: [
        { label: "Renewable Agrarian Gridshare", currentValue: 10, targetValue: 80, unit: "%", color: "#059669", year1: 35, year3: 60, year5: 80 },
        { label: "Municipal Waste Recycled", currentValue: 25, targetValue: 90, unit: "%", color: "#FF9933", year1: 50, year3: 75, year5: 90 },
        { label: "Living Watershed Rejuvenation", currentValue: 3, targetValue: 18, unit: " lakes", color: "#1E3A8A", year1: 6, year3: 12, year5: 18 }
      ],
      milestones: [
        { year: "Year 1", title: "Agro-Grid Setup", goal: "Initiate decentralized green micro-grids in water-stressed rural agriculture circles." },
        { year: "Year 3", title: "Automated Waste Hubs", goal: "Complete computer-navigated solid composting units across 15 zilla domains." },
        { year: "Year 5", title: "Watershed Purity Met", goal: "Reclaim all crucial state canal lines to guarantee safe chemical-free municipal water." }
      ],
      bulletPoints: [
        "State subsidized micro solar grids for rural agricultural operations.",
        "Modern automated waste treatment facilities targeting district landfills.",
        "Civic-led re-plantation loops to build urban forestry micro-zones.",
        "Restoring water canals and traditional lakes with live bio-filtering."
      ]
    },
    {
      id: "eq",
      topic: "EQUALITY",
      title: "Inclusive Social Parity For All",
      shortDesc: "Securing social justice, complete gender integration, and unbiased public resource sharing.",
      longDesc: "DJP aims to build actual, unbiased financial structures providing female entrepreneurs interest-free state matched micro-credit lines, setting up rapid Lok Paramarsh legal support networks, and standardizing factory contracts.",
      icon: Users,
      gradient: "from-purple-600/15 via-indigo-600/5 to-transparent",
      bgDecorative: "text-purple-700",
      borderClass: "border-l-4 border-purple-600",
      primaryColor: "#7C3AED",
      accentColor: "text-purple-600",
      proposals: [
        { title: "Udyamita Female Microgrants", desc: "Non-interest bearing capital up to ₹2 Lakhs directly transferred to registered women-led collectives.", icon: Users },
        { title: "Lok Paramarsh Legal Kiosks", desc: "Modular civic center help kiosks offering instant legal consultations with qualified panel advocates.", icon: Shield },
        { title: "Standardized Labor Wage Audits", desc: "Regular compliance inspections designed to enforce wage equality in commercial and construction clusters.", icon: Check }
      ],
      metrics: [
        { label: "Direct Female Capital Transfers", currentValue: 5, targetValue: 120, unit: " M (₹)", color: "#7C3AED", year1: 20, year3: 70, year5: 120 },
        { label: "Lok Paramarsh Resolution Index", currentValue: 42, targetValue: 95, unit: "%", color: "#1E3A8A", year1: 60, year3: 80, year5: 95 },
        { label: "Standardized Equal Wage Audits", currentValue: 30, targetValue: 100, unit: "%", color: "#14532D", year1: 50, year3: 80, year5: 100 }
      ],
      milestones: [
        { year: "Year 1", title: "Micro-Sovereignty Start", goal: "Disburse ₹20 Million in micro-loans to 1,000+ localized female enterprise structures." },
        { year: "Year 3", title: "Legal Access Expansion", goal: "Deploy 80 Lok Paramarsh Digital Interactive Kiosks inside civic centers." },
        { year: "Year 5", title: "Unbiased Standards", goal: "Establish a fully integrated, transparent, audit-guided equal wage landscape." }
      ],
      bulletPoints: [
        "Unified state-run panels protecting marginalized families and workers.",
        "Subsidized micro-business capital coordinating direct support for women entrepreneurs.",
        "Universal smart legal advice access points in local municipal bodies.",
        "Eliminating public workspace parity gaps through fully standardized recruitment cycles."
      ]
    },
    {
      id: "dem",
      topic: "DEMOCRACY",
      title: "Transparent Digital Democracy",
      shortDesc: "Bringing policy feedback, direct consultation, and draft legislative reviews to the citizens.",
      longDesc: "DJP structures transparent, real-time public ledger updates tracking state treasury allocations, and institutes secure consultation loops to let verified residents propose edits to draft regional laws.",
      icon: Landmark,
      gradient: "from-indigo-600/15 via-djp-navy/10 to-transparent",
      bgDecorative: "text-indigo-700",
      borderClass: "border-l-4 border-indigo-600",
      primaryColor: "#4F46E5",
      accentColor: "text-indigo-600",
      proposals: [
        { title: "Samvad Citizen Consulting App", desc: "Secure digital interface permitting citizens to cast advisory direct support inputs on legislative drafts.", icon: Smartphone },
        { title: "Public Auditable Ledgers", desc: "Direct blockchain verification tracking of panchayat development capital distributions to prevent graft.", icon: Landmark },
        { title: "Digital Kiosk Scheme Gateways", desc: "Friction-less, biometric-authenticated portal enabling local scheme access without proxy administrative bribes.", icon: Check }
      ],
      metrics: [
        { label: "Citizen Consultation Rate", currentValue: 15, targetValue: 85, unit: "%", color: "#4F46E5", year1: 35, year3: 65, year5: 85 },
        { label: "Auditable spent allocations", currentValue: 0, targetValue: 100, unit: "%", color: "#14532D", year1: 40, year3: 80, year5: 100 },
        { label: "Middleman-free Distribution", currentValue: 40, targetValue: 100, unit: "% direct", color: "#FF9933", year1: 65, year3: 85, year5: 100 }
      ],
      milestones: [
        { year: "Year 1", title: "Core Blockchain Tests", goal: "Formulate public ledger APIs for primary village funding releases." },
        { year: "Year 3", title: "Democracy App Rollout", goal: "Distribute Samvad consultations and reach 1 million verified user signups." },
        { year: "Year 5", title: "Full Direct Allocation", goal: "Eliminate administrative intermediaries and route 100% of state schemes biometrically." }
      ],
      bulletPoints: [
        "Interactive citizen consultation apps allowing draft law advice inputs.",
        "Transparent real-time registry showing exactly how public funds are utilized.",
        "Synchronous policy feedback portals hosted at Gram Panchayat blocks.",
        "Eliminating proxy middlemen representation through mobile verification systems."
      ]
    },
    {
      id: "list",
      topic: "LISTENING TO PEOPLE",
      title: "Direct Grievance Portals",
      shortDesc: "Continuous public advisory loops where community complaints are classified as high-priority tasks.",
      longDesc: "Citizens deserve executive responsibility. DJP implements statutory Service Level Agreements (SLAs) with severe penalties for contract delays, and shifts localized budget control directly into neighborhood panels.",
      icon: HelpCircle,
      gradient: "from-pink-600/15 via-rose-600/5 to-transparent",
      bgDecorative: "text-rose-700",
      borderClass: "border-l-4 border-rose-600",
      primaryColor: "#E11D48",
      accentColor: "text-rose-600",
      proposals: [
        { title: "Sankalp SLA Dashboards", desc: "Setting strict 48-hour timelines for routine civic infrastructure corrections (roads, drains, electricity).", icon: Clock },
        { title: "Weekly Livestreamed Summits", desc: "Transparent QA broadcast loops structured to allow block residents to quiz DJP state representatives directly.", icon: Globe },
        { title: "Jan Bhagidari Co-Budgeting", desc: "Assigning up to 15% of constituency modernization funds and allocating them based on direct public votes.", icon: HelpCircle }
      ],
      metrics: [
        { label: "SLA Resolution Scale (<48 hrs)", currentValue: 35, targetValue: 96, unit: "%", color: "#E11D48", year1: 60, year3: 82, year5: 96 },
        { label: "Weekly Townhall Participation", currentValue: 5, targetValue: 100, unit: "k views", color: "#14532D", year1: 25, year3: 60, year5: 100 },
        { label: "Resident Assembly Co-Budgeting", currentValue: 2, targetValue: 15, unit: "% budget", color: "#1E3A8A", year1: 6, year3: 10, year5: 15 }
      ],
      milestones: [
        { year: "Year 1", title: "Civic Dashboard Launch", goal: "Port principal block grievances to unified tracker maps." },
        { year: "Year 3", title: "Syndicated Streams", goal: "Instate direct weekly stream broadcasts across all municipal sections." },
        { year: "Year 5", title: "Democratic Allocations", goal: "Anchor 15% of district capital planning directly onto citizen feedback cards." }
      ],
      bulletPoints: [
        "Community issue reporting allowing direct image submissions of local problems.",
        "Service Level Agreements (SLAs) for civic issues (roads, water, electricity).",
        "Direct weekly town-hall virtual webinars hosted by DJP state authorities.",
        "Empowering common citizens to actively design local constituency budgets."
      ]
    }
  ];

  // GSAP 3D hover effects on grid cards
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 12; // tilt depth scale
    const rotateY = (x - centerX) / 12;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      transformPerspective: 1000,
      boxShadow: "0 25px 50px -12px rgba(28, 28, 28, 0.12)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px -2px rgba(28,28,28,0.03)",
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // GSAP Entrance Animation for detailed 3D panel
  useEffect(() => {
    if (activePillar) {
      document.body.style.overflow = "hidden";

      // Backdrop Fade In
      gsap.fromTo(backgroundRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );

      // Panel 3D entrance
      gsap.fromTo(modalRef.current,
        { 
          opacity: 0, 
          scale: 0.88, 
          rotationY: -15, 
          rotationX: 10,
          z: -150,
          y: 50,
          transformPerspective: 1200 
        },
        { 
          opacity: 1, 
          scale: 1, 
          rotationY: 0, 
          rotationX: 0,
          z: 0,
          y: 0,
          duration: 0.65, 
          ease: "back.out(1.15)"
        }
      );

      // Metres and dynamic charts load scale stagger
      if (metricsContainerRef.current) {
        gsap.fromTo(metricsContainerRef.current.children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out", delay: 0.3 }
        );
      }
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activePillar]);

  // Timeline Scope GSAP metric scale update
  useEffect(() => {
    if (activePillar && metricsContainerRef.current) {
      // Small elastic updates when timelineScope changes
      gsap.fromTo(".progress-target-bar", 
        { scaleX: 0.95 },
        { scaleX: 1, duration: 0.45, ease: "elastic.out(1.2, 0.4)" }
      );
    }
  }, [timelineScope, activePillar]);

  const currentPillar = pillars.find((p) => p.id === activePillar);

  return (
    <section id="manifesto" className="py-24 bg-[#F7F4ED] relative overflow-hidden">
      
      {/* Background Graphic elements */}
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-djp-saffron/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-5000" />
      <div className="absolute bottom-12 left-0 w-96 h-96 bg-djp-green/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-7000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title display */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-djp-saffron bg-[#FF9933]/10 px-3.5 py-1.5 rounded-full uppercase border border-[#FF9933]/15">
            Manifesto Year 2026
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-djp-charcoal mt-6 tracking-tight leading-none">
            Our 7 Core Integrity Commitments
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed max-w-2xl mx-auto text-sm md:text-base">
            Click on any bento-grid pillar to unpack its interactive policy proposals, implementation roadmaps, and real-time forecasted impact projection metrics.
          </p>
        </div>

        {/* 3D Bento Grid Representation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                onClick={() => {
                  setActivePillar(p.id);
                  setTimelineScope("y1");
                  setActiveTab("blueprint");
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 25px 50px -10px rgba(28, 28, 28, 0.16)"
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18
                }}
                className={`relative rounded-[32px] p-8 glass border border-white/60 ${p.borderClass} card-shadow cursor-pointer overflow-hidden flex flex-col justify-between h-[300px] transition-all bg-gradient-to-br ${p.gradient}`}
                style={{ transformStyle: "preserve-3d" }}
                id={`card-${p.id}`}
              >
                {/* Floating solid brand graphic node */}
                <div className={`absolute -right-6 -bottom-6 opacity-[0.06] pointer-events-none ${p.bgDecorative}`}>
                  <Icon className="w-44 h-44" />
                </div>

                <div className="space-y-5">
                  {/* Category logo */}
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold text-djp-saffron tracking-widest border border-djp-saffron/20 px-2.5 py-1 rounded-md bg-amber-50">
                      {p.topic}
                    </span>
                    <motion.div 
                      className="p-3 rounded-2xl bg-white shadow-sm border border-gray-100"
                      animate={{
                        scale: [1, 1.08, 1],
                        boxShadow: [
                          "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                          "0 4px 12px 0 rgba(20, 83, 45, 0.08)",
                          "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                        ]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: pillars.findIndex(pi => pi.id === p.id) * 0.2
                      }}
                    >
                      <Icon className="h-5 w-5 text-djp-green" />
                    </motion.div>
                  </div>

                  {/* Narrative details */}
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-xl text-djp-charcoal tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                      {p.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Explore overlay launcher trigger button */}
                <div className="flex items-center text-xs font-mono font-bold text-djp-green space-x-1.5 group pt-4">
                  <span>Explore Deliverables</span>
                  <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition duration-200" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive detailed 3D overlay popup panel with target metrics */}
        <AnimatePresence>
          {activePillar && currentPillar && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
              
              {/* Back backdrop dark mask */}
              <div 
                ref={backgroundRef}
                className="absolute inset-0 bg-djp-charcoal/45 backdrop-blur-md"
                onClick={() => setActivePillar(null)}
              />

              {/* Holographic 3D Sheet Card Body */}
              <div 
                ref={modalRef}
                className="bg-[#F7F4ED] rounded-[40px] w-full max-w-5xl border border-white/60 card-shadow overflow-hidden relative z-10 flex flex-col max-h-[90vh] md:max-h-[85vh] text-djp-charcoal"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Header colored border line decoration */}
                <div className="h-1.5 w-full bg-gradient-to-r from-djp-saffron via-white to-djp-green" />
                
                {/* Header segment of card */}
                <div className="p-6 md:p-8 bg-white border-b border-gray-100 flex items-start justify-between shrink-0">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-extrabold text-djp-saffron tracking-widest border border-djp-saffron/20 bg-amber-50 px-2.5 py-1 rounded">
                        {currentPillar.topic}
                      </span>
                      <span className="text-[9px] font-mono font-semibold text-gray-400">
                        Pillar ID: DJP-0{pillars.findIndex(p => p.id === activePillar) + 1}
                      </span>
                    </div>
                    
                    <h3 className="font-display font-bold text-2xl md:text-3xl text-djp-charcoal tracking-tight flex items-center gap-2">
                      <currentPillar.icon className="h-7 w-7 text-djp-green" />
                      {currentPillar.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setActivePillar(null)}
                    className="p-2.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-djp-charcoal transition cursor-pointer border border-gray-100 shadow-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Main panel content splitting proposals and visualized metrics */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* Left Column: Narrative Details & Proposal Options */}
                  <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
                    <div className="space-y-6">
                      
                      {/* Interactive Navigation Tabs */}
                      <div className="flex space-x-1.5 bg-[#EAE5D9]/70 p-1 rounded-2xl border border-gray-200/60 font-mono text-xs font-bold">
                        <button
                          onClick={() => setActiveTab("blueprint")}
                          className={`flex-1 py-2 rounded-xl transition-all ${
                            activeTab === "blueprint" ? "bg-white text-djp-charcoal shadow-sm" : "text-gray-500 hover:text-djp-charcoal"
                          }`}
                        >
                          Blueprint
                        </button>
                        <button
                          onClick={() => setActiveTab("proposals")}
                          className={`flex-1 py-2 rounded-xl transition-all ${
                            activeTab === "proposals" ? "bg-white text-djp-charcoal shadow-sm" : "text-gray-500 hover:text-djp-charcoal"
                          }`}
                        >
                          Key Proposals
                        </button>
                        <button
                          onClick={() => setActiveTab("milestones")}
                          className={`flex-1 py-2 rounded-xl transition-all ${
                            activeTab === "milestones" ? "bg-white text-djp-charcoal shadow-sm" : "text-gray-500 hover:text-djp-charcoal"
                          }`}
                        >
                          Roadmap
                        </button>
                      </div>

                      {/* Display Selected Tab Panel */}
                      <div className="min-h-[180px]">
                        {activeTab === "blueprint" && (
                          <div className="space-y-4 animate-fade-in">
                            <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                              Executive Commitment Objective
                            </h4>
                            <p className="text-sm text-gray-700 leading-relaxed bg-[#F7F4ED] border border-gray-200/50 p-5 rounded-2xl">
                              {currentPillar.longDesc}
                            </p>
                            
                            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                              <h5 className="text-[11px] font-mono font-bold text-djp-green uppercase mb-2">Core Mandate Focus</h5>
                              <ul className="space-y-2 text-xs text-gray-650">
                                {currentPillar.bulletPoints.slice(0, 2).map((bp, i) => (
                                  <li key={i} className="flex items-center space-x-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-djp-saffron shrink-0" />
                                    <span>{bp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}

                        {activeTab === "proposals" && (
                          <div className="space-y-4 animate-fade-in">
                            <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                              Policy Action Nodes (Substantive Framework)
                            </h4>
                            <div className="space-y-3">
                              {currentPillar.proposals.map((prop, index) => {
                                const PropIcon = prop.icon;
                                return (
                                  <div 
                                    key={index} 
                                    className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:border-djp-green/25 transition duration-300 flex items-start space-x-3 group"
                                  >
                                    <div className="p-2.5 rounded-xl bg-djp-green/5 text-djp-green shrink-0 group-hover:bg-djp-green/10 transition">
                                      <PropIcon className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-xs font-bold text-djp-charcoal tracking-tight">{prop.title}</h5>
                                      <p className="text-[11px] text-gray-500 leading-relaxed">{prop.desc}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {activeTab === "milestones" && (
                          <div className="space-y-4 animate-fade-in">
                            <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                              Phase Timeline & Growth Targets
                            </h4>
                            <div className="relative border-l border-gray-200 ml-4 py-2 space-y-6">
                              {currentPillar.milestones.map((ms, index) => (
                                <div key={index} className="relative pl-6">
                                  <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#FF9933] border-2 border-white ring-4 ring-[#FF9933]/15" />
                                  <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-[9px] font-mono font-bold bg-amber-50 text-djp-saffron border border-djp-saffron/15 px-1.5 py-0.5 rounded leading-none">
                                        {ms.year}
                                      </span>
                                      <h5 className="text-xs font-bold text-djp-charcoal">{ms.title}</h5>
                                    </div>
                                    <p className="text-[11px] text-gray-500">{ms.goal}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Left corner compliance branding */}
                    <div className="pt-4 border-t border-gray-200/50 flex items-center text-[10px] text-gray-400 font-mono space-x-1.5">
                      <Shield className="h-4 w-4 text-djp-green" />
                      <span>Certified Integrity Guarantee • Year 2026</span>
                    </div>
                  </div>

                  {/* Right Column: Interactive Target Dial & Metric Visualizer */}
                  <div className="lg:col-span-6 bg-white p-6 md:p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4 className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
                            Interactive Metric Forecast Model
                          </h4>
                          <p className="text-[10px] text-gray-400 font-mono">Select target phase to simulate metrics</p>
                        </div>
                        <TrendingUp className="h-4.5 w-4.5 text-djp-green" />
                      </div>

                      {/* Simulation Timeline Selector */}
                      <div className="flex bg-[#F7F4ED] p-1 rounded-2xl border border-gray-200/50">
                        {["y1", "y3", "y5"].map((yr) => (
                          <button
                            key={yr}
                            onClick={() => setTimelineScope(yr as any)}
                            className={`flex-1 py-2 text-xs font-mono font-extrabold rounded-xl transition-all cursor-pointer ${
                              timelineScope === yr
                                ? "bg-djp-green text-white shadow-sm"
                                : "text-gray-550 hover:bg-[#EAE5D9]/40 hover:text-djp-charcoal"
                            }`}
                          >
                            {yr === "y1" ? "Year 1" : yr === "y3" ? "Year 3" : "Year 5 (Realized)"}
                          </button>
                        ))}
                      </div>

                      {/* Staggered Metric Cards */}
                      <div ref={metricsContainerRef} className="space-y-5">
                        {currentPillar.metrics.map((metric, i) => {
                          const valueToRender = 
                            timelineScope === "y1"
                              ? metric.year1
                              : timelineScope === "y3"
                              ? metric.year3
                              : metric.year5;

                          // Percentage toward final Year 5 goal
                          const rawProgressPercent = Math.min(
                            100,
                            Math.round(((valueToRender) / metric.targetValue) * 100)
                          );

                          // Circular calculations for dynamic circle dials
                          const circleRadius = 22;
                          const circumference = 2 * Math.PI * circleRadius;
                          const strokeDashoffset = circumference - (rawProgressPercent / 100) * circumference;

                          return (
                            <div key={i} className="space-y-2 last:border-b-0">
                              <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                  <span className="text-xs font-bold text-djp-charcoal block tracking-tight">
                                    {metric.label}
                                  </span>
                                  <div className="flex items-center space-x-1 font-mono text-[9px] text-gray-400">
                                    <span>Baseline: {metric.currentValue}{metric.unit}</span>
                                    <span>•</span>
                                    <span className="text-djp-green font-bold">Goal Target: {metric.targetValue}{metric.unit}</span>
                                  </div>
                                </div>

                                {/* Smart Radial Circle Progress Indicator */}
                                <div className="relative h-12 w-12 flex items-center justify-center">
                                  <svg className="w-12 h-12 transform -rotate-90">
                                    {/* Unfilled circle */}
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r={circleRadius}
                                      className="stroke-gray-100"
                                      strokeWidth="3.5"
                                      fill="transparent"
                                    />
                                    {/* Filled dynamic animated gauge */}
                                    <circle
                                      cx="24"
                                      cy="24"
                                      r={circleRadius}
                                      stroke={metric.color}
                                      strokeWidth="3.5"
                                      fill="transparent"
                                      strokeDasharray={circumference}
                                      strokeDashoffset={strokeDashoffset}
                                      className="transition-all duration-500 ease-out"
                                      strokeLinecap="round"
                                    />
                                  </svg>
                                  <span className="absolute text-[9px] font-mono font-bold text-djp-charcoal leading-none">
                                    <AnimatedNumber value={rawProgressPercent} />%
                                  </span>
                                </div>
                              </div>

                              {/* Progress bar visual structure with dotted projection benchmark marker */}
                              <div className="relative">
                                {/* Dotted lines overlay depicting target caps */}
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-3.5 w-0.5 border-l border-dashed border-gray-400 mr-[4%]" title="Target Benchmark" />
                                
                                <div className="w-full h-2 rounded-full bg-gray-100/80 overflow-hidden">
                                  <div 
                                    className="h-full rounded-full transition-all duration-700 ease-out progress-target-bar"
                                    style={{ 
                                      width: `${rawProgressPercent}%`,
                                      backgroundColor: metric.color 
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Metrics numeric values details footer details */}
                              <div className="flex justify-between items-center text-[10px] font-mono text-gray-500 pt-1">
                                <span className="text-[9px]">Current Phase Metrics:</span>
                                <span className="font-bold flex items-center text-djp-charcoal">
                                  <Award className="h-3 w-3 mr-0.5 text-djp-saffron" />
                                  <AnimatedNumber value={valueToRender} />{metric.unit}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                    </div>

                    {/* Timeline summary explanation based on selection */}
                    <div className="bg-[#F7F4ED] p-4 rounded-2xl border border-gray-200/50 text-[11px] text-gray-550 leading-relaxed font-mono flex items-start space-x-2 mt-6">
                      <ChevronRight className="h-4.5 w-4.5 text-djp-saffron shrink-0" />
                      <p>
                        {timelineScope === "y1" && "Phase 1 represents setup, capital mobilization, and laying the infrastructural roots within crucial Tehsil areas."}
                        {timelineScope === "y3" && "Phase 2 signals state wide scalability, onboarding citizens online, and reaching 60%+ development milestones."}
                        {timelineScope === "y5" && "Phase 3 showcases complete optimization, public access standardization, and verified policy deliverables."}
                      </p>
                    </div>

                  </div>

                </div>

                {/* Bottom confirmation footer action panel */}
                <div className="p-6 md:p-8 bg-white border-t border-gray-100 flex items-center justify-between shrink-0">
                  <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-gray-550">
                    <Check className="h-4 w-4 text-djp-green" />
                    <span>Real-world policy guarantee vetted for Legislative Session.</span>
                  </div>
                  
                  <button
                    onClick={() => setActivePillar(null)}
                    className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-djp-green hover:bg-emerald-800 text-white font-bold text-xs tracking-wider uppercase transition shadow cursor-pointer"
                  >
                    Close Commitment Card
                  </button>
                </div>

              </div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
