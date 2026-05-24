import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ShieldAlert, BookOpen, Compass, Award, PenTool, CheckCircle, Save } from "lucide-react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../firebase";

interface AboutProps {
  isAdmin: boolean;
}

export default function About({ isAdmin }: AboutProps) {
  const [bio, setBio] = useState({
    title: "Philosophy of Public First Governance",
    subtitle: "Rebuilding our democratic foundations on accountability and modernization",
    content: "Under the stewardship of Mohammad Umair Javid, DJP works toward comprehensive welfare structure. Our strategy centers on systemic, high-grade implementations rather than hollow rhetoric or temporary handouts. We believe in providing robust platforms where every Indian youth, woman, and common worker receives direct smart resource coordination.",
    vision: "To establish a clean, technology-driven welfare model where quality healthcare, smart classrooms, sustainable employment, and equality are guaranteed constitutional realities, not privileges.",
    mission: "To engage direct public feedback structures synchronously, enabling every village, tehsil, and zilla to co-author national development workflows and budget structures."
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedBio, setEditedBio] = useState({ ...bio });
  const [saving, setSaving] = useState(false);

  // Load biography from firestore in real time if configured
  useEffect(() => {
    const docRef = doc(db, "manifesto", "founder_bio");
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        const updated = {
          title: data.title || bio.title,
          subtitle: data.subtitle || bio.subtitle,
          content: data.content || bio.content,
          vision: data.vision || bio.vision,
          mission: data.mission || bio.mission,
        };
        setBio(updated);
        setEditedBio(updated);
      }
    }, (err) => {
      console.warn("About section firestore reading error (expected if permissions are strict or doc empty):", err);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const docRef = doc(db, "manifesto", "founder_bio");
      await setDoc(docRef, {
        topic: "FOUNDER",
        title: editedBio.title,
        content: editedBio.content,
        items: [editedBio.subtitle, editedBio.vision, editedBio.mission],
        updatedAt: new Date()
      });
      setBio({ ...editedBio });
      setIsEditing(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, "manifesto/founder_bio");
    } finally {
      setSaving(false);
    }
  };

  const values = [
    {
      icon: BookOpen,
      title: "Equal Smart Classrooms",
      text: "Every district and tehsil must host technology-enabled public smart schools."
    },
    {
      icon: Compass,
      title: "Decentralized Healthcare",
      text: "Quality community clinics to multi-specialty hospitals in state, district, and tehsil loops."
    },
    {
      icon: Award,
      title: "Absolute Equality & Justice",
      text: "Securing social justice and gender integration with equal, transparent public resource sharing."
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-djp-saffron uppercase">
            Deep Democratic Values
          </span>
          <h2 className="font-display text-4xl font-bold text-djp-charcoal mt-2 tracking-tight">
            Our Vision, Our Values
          </h2>
          <p className="text-gray-600 mt-3">
            DJP represents a modern political promise to elevate governance standards, placing utility above empty labels.
          </p>
        </div>

        {/* Vision & Mission bento cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 animate-fade-in">
          <div className="glass p-8 rounded-3xl border border-white/60 border-l-4 border-djp-green card-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl bg-djp-green/10 text-djp-green">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-djp-charcoal">Our Vision for India</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {bio.vision}
            </p>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/60 border-l-4 border-djp-saffron card-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-xl bg-djp-saffron/10 text-djp-saffron">
                <CheckCircle className="h-5 w-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-djp-charcoal">Governance Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">
              {bio.mission}
            </p>
          </div>
        </div>

        {/* Founder Spotlights panel */}
        <div className="glass p-8 md:p-12 rounded-[40px] border border-white/60 card-shadow bg-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Founder Avatar side */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative mb-4 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-djp-green to-djp-saffron rounded-3xl blur opacity-30 group-hover:opacity-40 transition" />
                <div className="w-56 h-56 rounded-3xl bg-djp-offwhite border-2 border-white/80 p-3 relative overflow-hidden flex items-center justify-center">
                  {/* Styled avatar representing Mohammad Umair Javid */}
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-djp-green/20 via-djp-navy/10 to-djp-saffron/20 flex flex-col items-center justify-center relative">
                    <span className="font-display font-bold text-5xl text-djp-green mb-1">MUJ</span>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Umair Javid</span>
                    {/* Glowing holographic tag */}
                    <div className="absolute bottom-2 inset-x-2 py-1 rounded bg-white/80 backdrop-blur border border-white/30 text-[9px] font-mono font-bold text-djp-navy">
                      FOUNDER & LEADER
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-display font-extrabold text-xl text-djp-charcoal">Mohammad Umair Javid</h4>
              <p className="text-xs font-mono text-gray-500 mt-1">Founder, Dheemak Janta Party</p>
              
              {isAdmin && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="mt-4 px-4 py-1.5 rounded-full border border-djp-green text-djp-green hover:bg-djp-green hover:text-white transition text-xs font-semibold cursor-pointer flex items-center space-x-1"
                >
                  <PenTool className="h-3 w-3" />
                  <span>{isEditing ? "Cancel Edit" : "Edit Founder Bio (CMS)"}</span>
                </button>
              )}
            </div>

            {/* Founder Bio Info */}
            <div className="lg:col-span-8 space-y-6">
              {isEditing ? (
                <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200">
                  <h4 className="text-sm font-mono text-djp-saffron uppercase font-bold">FOUNDER BIOGRAPHY CMS WIDGET</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Pillar Title</label>
                    <input
                      type="text"
                      value={editedBio.title}
                      onChange={(e) => setEditedBio({ ...editedBio, title: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-djp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Pillar Subtitle</label>
                    <input
                      type="text"
                      value={editedBio.subtitle}
                      onChange={(e) => setEditedBio({ ...editedBio, subtitle: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-djp-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Biography Content Text</label>
                    <textarea
                      value={editedBio.content}
                      rows={5}
                      onChange={(e) => setEditedBio({ ...editedBio, content: e.target.value })}
                      className="w-full text-sm border border-gray-200 rounded-lg p-2 focus:outline-none focus:border-djp-green"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-4 py-2 bg-djp-green text-white text-xs font-bold rounded-lg hover:bg-emerald-800 transition flex items-center space-x-1 disabled:opacity-50 cursor-pointer"
                  >
                    <Save className="h-3.5 w-3.5" />
                    <span>{saving ? "Saving Changes..." : "Deploy to Firestore"}</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <span className="text-xs font-mono font-bold text-djp-saffron uppercase tracking-wider block">
                    Leadership Spotlight
                  </span>
                  <h3 className="font-display text-2xl font-bold text-djp-charcoal tracking-tight leading-none">
                    {bio.title}
                  </h3>
                  <p className="text-gray-500 font-medium italic text-sm border-l-2 border-djp-green pl-3">
                    “{bio.subtitle}”
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                    {bio.content}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Decorative Grid Values */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <div key={i} className="glass p-6 rounded-2xl border border-white/50 card-shadow flex space-x-4 items-start">
                <div className="p-2.5 rounded-xl bg-djp-green/10 text-djp-green mt-0.5">
                  <IconComp className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-djp-charcoal">{v.title}</h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{v.text}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
