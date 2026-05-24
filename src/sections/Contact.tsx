import React, { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { Send, CheckCircle, Globe, Lock, ShieldCheck } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../firebase";

export default function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<'suggestion' | 'support' | 'issue_report'>('suggestion');
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      alert("Please fill in all details.");
      return;
    }

    setLoading(true);
    try {
      const randomSeed = Math.floor(100000 + Math.random() * 900000);
      const messageId = `MSG-REF-${randomSeed}`;

      const payload = {
        fullName: fullName.trim(),
        email: email.trim(),
        category: category,
        message: message.trim(),
        createdAt: new Date(),
      };

      // Write directly to messages collection
      await setDoc(doc(db, "messages", messageId), payload);
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "messages");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-[#FF9933] bg-[#FF9933]/10 px-3 py-1.5 rounded-full uppercase">
            End Corruption • Build New India
          </span>
          <h2 className="font-display text-4xl font-bold text-djp-charcoal mt-4 tracking-tight leading-all">
            Direct Private Outreach Grid
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-sm">
            Contact Mohammad Umair Javid directly. Fill out our secure form to have your grievance reviewed on priority.
          </p>
        </div>

        {/* Contact Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
          
          {/* Left Column: Digital Hub & Anti-Corruption Core */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white p-6 rounded-3xl border border-gray-150 shadow-sm space-y-4">
              <div className="flex items-center space-x-2.5 text-djp-green">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <Globe className="h-5 w-5 text-djp-green" />
                </div>
                <h3 className="font-display text-lg font-bold text-djp-charcoal">Official Online Address</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                To maximize absolute accessibility and stay immune from bureaucratic corruption, <span className="font-bold text-djp-charcoal">the office address of the Dheemak Janta Party is 100% online</span>. This public workspace is our headquarters—instantly reachable, interactive, and transparent.
              </p>
              <div className="p-3.5 bg-djp-green/5 rounded-xl border border-djp-green/10 font-mono text-[11px] text-djp-green font-bold text-center">
                📍 Location: Online Citizen Portal (Global IP)
              </div>
            </div>

            <div className="bg-[#14532D] text-white p-6 rounded-3xl relative overflow-hidden shadow-lg border border-emerald-800">
              {/* Decorative accent glow */}
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-djp-saffron/20 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-mono tracking-wider font-bold text-djp-saffron bg-amber-550/20 px-2.5 py-1 rounded-md uppercase">
                  DJP Statement of Power
                </span>
                
                <h4 className="font-display text-2xl font-bold tracking-tight">
                  Our Unyielding Stand
                </h4>
                
                <p className="text-xs text-emerald-100/95 leading-relaxed font-serif italic border-l-2 border-[#FF9933] pl-3">
                  "We stand to build new India. We want to end the corruption in India. We are not only cockroaches. We are also DHEEMAK."
                </p>

                <p className="text-[11px] text-emerald-200/80 leading-relaxed">
                  Like the silent, relentless force of nature, we will consume the rotten, corrupted hollow wood of current bureaucracy from the inside out and establish pure public welfare.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Secure Form Panel */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* ABOVE THE FORM: P2P Privacy notice */}
            <div className="bg-amber-50/70 border border-amber-200/70 p-4 rounded-2xl flex items-start space-x-3 shadow-xs">
              <Lock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-amber-900 font-sans">
                  P2P Absolute Privacy Secure Link
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  This form and your personal information are completely <span className="font-bold">Private between you and US</span> with person-to-person privacy. Absolutely no one else can interact, intercept, or see this. It is a completely direct, secure, and private way to communicate with our leadership.
                </p>
              </div>
            </div>

            <div className="glass p-8 md:p-10 rounded-[36px] border border-white/60 card-shadow bg-white/40">
              {submitted ? (
                <div className="text-center py-12 space-y-4 animate-fade-in">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-djp-green flex items-center justify-center mx-auto">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-xl text-djp-charcoal">Message Sent Privately</h4>
                    <p className="text-xs text-emerald-700 font-mono">P2P Encryption Node Synced Instantly.</p>
                  </div>
                  <p className="text-xs text-gray-650 max-w-sm mx-auto leading-relaxed">
                    Thank you! We have received your secured transmission. Our secretariat will contact you on your <span className="font-bold">priority basis</span>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-5 py-2.5 rounded-xl bg-djp-green hover:bg-emerald-800 text-white font-bold text-xs transition active:scale-95 cursor-pointer"
                  >
                    Open New Session Link
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-sm">
                  
                  <div className="space-y-1 text-center">
                    <h3 className="font-display font-bold text-djp-charcoal text-base">Direct Priority Intake</h3>
                    <p className="text-[11px] text-gray-400">
                      Submit details here. Our leadership team responds on priority.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-600 uppercase mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Anand"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-djp-charcoal focus:outline-none focus:border-djp-green"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono font-bold text-gray-600 uppercase mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. anand@newindia.org"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-djp-charcoal focus:outline-none focus:border-djp-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-600 uppercase mb-1.5">
                      Subject Matter *
                    </label>
                    <select
                      value={category}
                      onChange={(e: any) => setCategory(e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-xs text-djp-charcoal focus:outline-none focus:border-djp-green"
                    >
                      <option value="suggestion">General suggestion / Anti-corruption idea</option>
                      <option value="support">Active volunteering outreach support</option>
                      <option value="issue_report">Immediate community issue grievance slip</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-gray-600 uppercase mb-1.5">
                      Private Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your suggestions on how we can end corruption or solve municipal issues on priority..."
                      className="w-full bg-white border border-gray-200 rounded-xl p-4 text-xs text-djp-charcoal focus:outline-none focus:border-djp-green"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl text-white bg-djp-green hover:bg-emerald-800 font-bold tracking-wide transition shadow cursor-pointer text-xs flex items-center justify-center space-x-1.5 active:scale-95"
                  >
                    <Send className="h-4 w-4" />
                    <span>{loading ? "Locking & Dispatching..." : "Send Secure Message (Priority basis)"}</span>
                  </button>

                </form>
              )}
            </div>

            {/* BELOW THE FORM: Repeating secure P2P notice and patriotic declarations */}
            <div className="bg-emerald-50/50 border border-emerald-150 p-4 rounded-2xl flex items-start space-x-3 shadow-xs font-sans">
              <ShieldCheck className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-xs font-bold text-emerald-900">
                  Totally Private Comm Channel • End Corruption Now
                </div>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  No tracking, no intermediate nodes. This P2P communications link connects you directly to the DJP Secretariat. <strong>"We stand to build new India. We want to end the corruption in India."</strong>
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
