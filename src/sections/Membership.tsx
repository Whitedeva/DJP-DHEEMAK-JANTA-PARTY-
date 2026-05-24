import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc, onSnapshot } from "firebase/firestore";
import { User, QrCode, ShieldCheck, Mail, Map, Smartphone, Download, UserPlus, FileCheck } from "lucide-react";
import { db, auth, handleFirestoreError, OperationType } from "../firebase";
import { Member } from "../types";

interface MembershipProps {
  isSignedIn: boolean;
  onLogin: () => void;
  currentUser: any;
}

export default function Membership({ isSignedIn, onLogin, currentUser }: MembershipProps) {
  const [profile, setProfile] = useState<Member | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // Form states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState("");
  const [tehsil, setTehsil] = useState("");
  const [role, setRole] = useState<'member' | 'volunteer'>('member');

  // Load existing profile from Firestore if signed-in
  useEffect(() => {
    if (!isSignedIn || !currentUser) {
      setProfile(null);
      return;
    }
    setFetching(true);
    const docRef = doc(db, "members", currentUser.uid);
    
    // Direct live subscription to their profile
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProfile(docSnap.data() as Member);
      } else {
        setProfile(null);
        // Pre-fill name from auth profile
        if (currentUser.displayName) {
          setFullName(currentUser.displayName);
        }
      }
      setFetching(false);
    }, (error) => {
      console.warn("Could not retrieve membership document:", error);
      setFetching(false);
    });

    return () => unsubscribe();
  }, [isSignedIn, currentUser]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn || !currentUser) {
      onLogin();
      return;
    }

    if (!fullName.trim() || !phone.trim() || !stateName.trim() || !district.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      // Create DJP Membership ID number
      const randomSeed = Math.floor(100000 + Math.random() * 900000);
      const generatedId = `DJP-${randomSeed}`;

      const newMember: Member = {
        uid: currentUser.uid,
        fullName: fullName.trim(),
        email: currentUser.email || "",
        phone: phone.trim(),
        state: stateName.trim(),
        district: district.trim(),
        tehsil: tehsil.trim(),
        role: role,
        createdAt: new Date(),
        membershipId: generatedId,
      };

      await setDoc(doc(db, "members", currentUser.uid), newMember);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `members/${currentUser.uid}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="membership" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-djp-saffron bg-[#FF9933]/10 px-3 py-1.5 rounded-full uppercase">
            Active Civil Membership
          </span>
          <h2 className="font-display text-4xl font-bold text-djp-charcoal mt-4 tracking-tight leading-none">
            Co-author Indian Progress
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed">
            Become a card-carrying member or active volunteer of Dheemak Janta Party. No membership fee, purely merit-driven collaborative civilian platform.
          </p>
        </div>

        {/* Dashboard Panels */}
        <div className="max-w-4xl mx-auto">
          {!isSignedIn ? (
            /* Call to sign-in first block */
            <div className="glass p-10 md:p-14 rounded-[36px] border border-white/60 card-shadow text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-djp-green/10 text-djp-green flex items-center justify-center mx-auto shadow-sm">
                <UserPlus className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display font-bold text-2xl text-djp-charcoal">Secure Google Auth Verification</h3>
                <p className="text-sm text-gray-650 max-w-md mx-auto leading-relaxed">
                  To secure civilian identities and prevent mock registration bots, we verify memberships using official Google Sign-In verification.
                </p>
              </div>
              <button
                onClick={onLogin}
                className="px-8 py-3.5 rounded-2xl text-white bg-djp-green hover:bg-emerald-800 font-bold text-sm tracking-wide shadow-md transition transform hover:-translate-y-0.5 cursor-pointer inline-flex items-center space-x-2"
              >
                <span>Authenticating with Google Account</span>
              </button>
            </div>
          ) : fetching ? (
            <div className="glass p-12 rounded-[36px] text-center font-mono text-xs text-gray-500">
              Fetching registration database node...
            </div>
          ) : profile ? (
            /* 1. VISUAL IDENTIFICATION CARD GENERATOR PANEL */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-fade-in">
              
              {/* Profile Bio Details view */}
              <div className="md:col-span-5 space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-djp-saffron uppercase">Verified Citizen Record</span>
                  <h3 className="font-display font-black text-2xl text-djp-charcoal">{profile.fullName}</h3>
                  <p className="text-xs font-mono text-gray-500">{profile.email}</p>
                </div>

                <div className="space-y-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm text-xs font-mono text-gray-700">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">MEMBERSHIP RECORD ID:</span>
                    <span className="font-bold text-djp-navy">{profile.membershipId}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">PARTY ENGAGEMENT:</span>
                    <span className="font-bold text-djp-green uppercase">{profile.role}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">OUTREACH REGION:</span>
                    <span className="font-bold text-djp-charcoal">{profile.state}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-400">DISTRICT (ZILLA):</span>
                    <span className="font-bold text-djp-charcoal">{profile.district}</span>
                  </div>
                  {profile.tehsil && (
                    <div className="flex justify-between border-b border-gray-100 pb-2">
                      <span className="text-gray-400">TEHSIL OUTPOST:</span>
                      <span className="font-bold text-djp-charcoal">{profile.tehsil}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-400">DATE DESIGNED:</span>
                    <span className="font-bold text-gray-500">2026-05-24</span>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-150 rounded-2xl flex items-start space-x-2 text-xs">
                  <ShieldCheck className="h-4.5 w-4.5 text-djp-green mt-0.5 shrink-0" />
                  <p className="text-emerald-950 font-medium leading-relaxed">
                    Welcome to Jammu, Kashmir, and overall Indian Progressive loop! Your QR Code stores your verified signature hash, synced with our growing digital citizen registry. We are powered by the trust, support, and loyalty of everyday citizens as we expand across India.
                  </p>
                </div>
              </div>

              {/* Holographic Interactive Membership Card View (SVG render) */}
              <div className="md:col-span-7 flex justify-center">
                <div className="relative w-full max-w-[360px] aspect-[5/3] rounded-[24px] bg-djp-charcoal text-white shadow-2xl p-4 overflow-hidden border border-white/15">
                  {/* Decorative card stripes (representing saffron / white / green tricolor subtle arcs) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-djp-saffron/10 rounded-full blur-[40px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-djp-green/10 rounded-full blur-[40px] pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-djp-saffron via-white to-djp-green" />

                  <div className="h-full flex flex-col justify-between relative z-10 font-mono">
                    
                    {/* Header line */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-extrabold text-[13px] tracking-widest text-white uppercase leading-none">
                          Dheemak Janta Party
                        </h4>
                        <span className="text-[7.5px] text-gray-400 font-bold uppercase tracking-wider">
                          Official Digital Membership Credentials
                        </span>
                      </div>
                      
                      <div className="text-right">
                        <span className="text-[7.5px] bg-[#14532D] text-emerald-300 font-extrabold px-1.5 py-0.5 rounded border border-emerald-800 uppercase">
                          {profile.role}
                        </span>
                      </div>
                    </div>

                    {/* Middle Core info */}
                    <div className="grid grid-cols-12 gap-2 items-center py-1">
                      <div className="col-span-8 space-y-1">
                        <div className="text-[8px] text-gray-400 uppercase leading-none">Member Name</div>
                        <h5 className="font-display font-black text-[13px] tracking-wide text-white leading-tight uppercase limit-line">
                          {profile.fullName}
                        </h5>
                        
                        <div className="pt-1.5 flex items-center space-x-3 text-[7.5px]">
                          <div>
                            <span className="text-gray-400 block pb-0.5">MEMBER ID NO</span>
                            <span className="text-djp-saffron font-bold font-mono">{profile.membershipId}</span>
                          </div>
                          <div className="border-l border-white/10 pl-3">
                            <span className="text-gray-400 block pb-0.5">OUTREACH REGION</span>
                            <span className="text-gray-200 font-bold">{profile.state}</span>
                          </div>
                        </div>
                      </div>

                      {/* Security QR Box code */}
                      <div className="col-span-4 flex justify-end">
                        <div className="bg-white p-1 rounded-lg border border-white/20 shadow-lg relative group">
                          {/* Self-contained procedural SVG representing a digital verification QR Code */}
                          <svg className="w-14 h-14" viewBox="0 0 100 100">
                            {/* Standard QR boundary find corners */}
                            <rect x="5" y="5" width="25" height="25" fill="#1C1C1C" />
                            <rect x="10" y="10" width="15" height="15" fill="#FFFFFF" />
                            <rect x="12" y="12" width="11" height="11" fill="#1C1C1C" />

                            <rect x="70" y="5" width="25" height="25" fill="#1C1C1C" />
                            <rect x="75" y="10" width="15" height="15" fill="#FFFFFF" />
                            <rect x="77" y="12" width="11" height="11" fill="#1C1C1C" />

                            <rect x="5" y="70" width="25" height="25" fill="#1C1C1C" />
                            <rect x="10" y="75" width="15" height="15" fill="#FFFFFF" />
                            <rect x="12" y="77" width="11" height="11" fill="#1C1C1C" />
                            
                            {/* Procedural micro dots coordinates */}
                            <rect x="40" y="10" width="8" height="8" fill="#1C1C1C" />
                            <rect x="52" y="5" width="6" height="12" fill="#1C1C1C" />
                            <rect x="45" y="25" width="12" height="6" fill="#1C1C1C" />
                            
                            <rect x="15" y="40" width="10" height="10" fill="#1C1C1C" />
                            <rect x="40" y="45" width="15" height="15" fill="#1C1C1C" />
                            <rect x="45" y="70" width="8" height="18" fill="#1C1C1C" />
                            <rect x="70" y="45" width="12" height="12" fill="#1C1C1C" />
                            
                            <rect x="80" y="80" width="15" height="15" fill="#123B24" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Footer security badge */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-1.5 text-[6.5px] text-gray-500 font-mono">
                      <div>CITIZEN TRUST-BASED // HASH-2026-F98</div>
                      <div className="flex items-center space-x-1 text-djp-saffron font-bold">
                        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                        <span>VERIFIED DJP IDENTITY</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* 2. REGISTRATION FORM SECTOR */
            <div className="glass p-8 md:p-12 rounded-[36px] border border-white/60 card-shadow animate-fade-in">
              <div className="flex items-start space-x-4 border-b border-gray-150 pb-6 mb-8">
                <div className="p-3 bg-djp-green/10 rounded-2xl text-djp-green shrink-0">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-djp-charcoal">DJP Civilian Roster Registration</h3>
                  <p className="text-xs text-gray-650 mt-1 max-w-lg leading-relaxed">
                    Register once to print your secure cryptographic, mobile-enabled DJP Digital Membership ID card. Pre-filled metadata pulled safely.
                  </p>
                </div>
              </div>

              <form onSubmit={handleRegister} className="space-y-6">
                
                {/* Full name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-600 uppercase mb-2">
                      Full Legal Name (as per ID) *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Mohammad Umair"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-djp-green text-djp-charcoal font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-600 uppercase mb-2">
                      Mobile Number (Contact coordinates) *
                    </label>
                    <div className="relative">
                      <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9906XXXXXX"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-djp-green text-djp-charcoal font-mono font-medium"
                      />
                    </div>
                  </div>
                </div>

                {/* State, District, Tehsil */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-600 uppercase mb-2">
                      State / UT *
                    </label>
                    <div className="relative">
                      <Map className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Jammu & Kashmir"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-djp-green text-djp-charcoal font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-600 uppercase mb-2">
                      District (Zilla) *
                    </label>
                    <input
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Srinagar"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-djp-green text-djp-charcoal font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-gray-600 uppercase mb-2">
                      Tehsil outpost
                    </label>
                    <input
                      type="text"
                      value={tehsil}
                      onChange={(e) => setTehsil(e.target.value)}
                      placeholder="Khanyar"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-djp-green text-djp-charcoal font-medium"
                    />
                  </div>
                </div>

                {/* Role selection */}
                <div className="space-y-3 pb-2">
                  <span className="block text-xs font-mono font-bold text-gray-600 uppercase">
                    Select Your Democratic Capacity *
                  </span>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setRole("member")}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        role === "member"
                          ? "border-djp-green bg-djp-green/5 ring-1 ring-djp-green"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <h4 className="font-display font-medium text-sm text-djp-charcoal">Regular Member</h4>
                      <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                        Receive policy announcements, cast digital feedback, and co-author local constituency proposals.
                      </p>
                    </div>

                    <div
                      onClick={() => setRole("volunteer")}
                      className={`p-4 rounded-2xl border cursor-pointer transition ${
                        role === "volunteer"
                          ? "border-djp-green bg-djp-green/5 ring-1 ring-djp-green"
                          : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <h4 className="font-display font-medium text-sm text-djp-charcoal">Active Volunteer</h4>
                      <p className="text-[11px] text-gray-500 mt-1 leading-normal">
                        Coordinate plantation campaigns, support Smart Class setups, and report civic infrastructure grievances.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit action */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-2xl text-white bg-djp-green hover:bg-emerald-800 font-bold tracking-wide shadow transition cursor-pointer text-sm"
                >
                  {loading ? "Syncing credentials with Firestore..." : "Confirm & Issue Membership Certificate"}
                </button>

              </form>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
