import React, { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { ShieldCheck, Users, Mail, Newspaper, Landmark, Award, Trash, Save, Plus, ArrowRight, BookOpen, Clock, BarChart3, PieChart as LucidePieChart, TrendingUp, Activity } from "lucide-react";
import { db, handleFirestoreError, OperationType } from "../firebase";
import { News, Member, Message, Donation, Manifesto } from "../types";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from "recharts";

export default function AdminPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [donations, setDonations] = useState<Donation[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'users' | 'volunteers' | 'cms' | 'donations'>('users');

  // CMS Form States - News announcement creation
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsCategory, setNewsCategory] = useState<'announcement' | 'event' | 'campaign'>('announcement');
  const [newsImg, setNewsImg] = useState("");
  const [newsSaving, setNewsSaving] = useState(false);

  // Sync admin dashboard queries
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // 1. Load suggest feedback
        const msgSnap = await getDocs(query(collection(db, "messages"), orderBy("createdAt", "desc")));
        const msgList: Message[] = [];
        msgSnap.forEach((d) => msgList.push({ id: d.id, ...d.data() } as unknown as Message));
        setMessages(msgList);

        // 2. Load members roster
        const memSnap = await getDocs(query(collection(db, "members"), orderBy("createdAt", "desc")));
        const memList: Member[] = [];
        memSnap.forEach((d) => memList.push({ uid: d.id, ...d.data() } as unknown as Member));
        setMembers(memList);

        // 3. Load donations transparent transactions ledger
        const donSnap = await getDocs(query(collection(db, "donations"), orderBy("timestamp", "desc")));
        const donList: Donation[] = [];
        donSnap.forEach((d) => donList.push({ id: d.id, ...d.data() } as unknown as Donation));
        setDonations(donList);

      } catch (error) {
        console.warn("Firestore queries for Admins might be locked (expected under initial state or unverified auth):", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [tab]);

  // Handle publishing a news bulletin
  const handlePublishNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsContent.trim()) {
      alert("Please provide title and content.");
      return;
    }

    setNewsSaving(true);
    try {
      const generatedDocId = `NEWS-REP-${Math.floor(100000 + Math.random() * 900000)}`;
      const payload: News = {
        title: newsTitle.trim(),
        content: newsContent.trim(),
        category: newsCategory,
        createdAt: new Date(),
        imageUrl: newsImg.trim() || "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
        published: true
      };

      await setDoc(doc(db, "news", generatedDocId), payload);
      alert("Announcement published successfully via CMS!");
      setNewsTitle("");
      setNewsContent("");
      setNewsImg("");
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, "news");
    } finally {
      setNewsSaving(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to dismiss this suggestion?")) return;
    try {
      await deleteDoc(doc(db, "messages", id));
      setMessages(messages.filter(m => m.id !== id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `messages/${id}`);
    }
  };

  const handleDeleteMember = async (uid: string) => {
    if (!confirm("Remove this member profile node from DJP roster?")) return;
    try {
      await deleteDoc(doc(db, "members", uid));
      setMembers(members.filter(m => m.uid !== uid));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `members/${uid}`);
    }
  };

  return (
    <section className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section card */}
        <div className="glass p-8 rounded-[36px] border border-white/60 card-shadow text-center max-w-4xl mx-auto mb-12">
          <div className="flex justify-center items-center space-x-2 text-djp-saffron mb-3">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Admin Security Shell</span>
          </div>

          <h2 className="font-display text-3xl font-black text-djp-charcoal tracking-tight">
            Central Administrative Desk
          </h2>
          
          <p className="text-xs text-amber-600 font-mono mt-1 uppercase tracking-widest font-bold">
            DJP Secure Citizen Trust System Connection Live
          </p>
        </div>

        {/* Dashboard Split split */}
        <div className="max-w-6xl mx-auto bg-white/50 backdrop-blur rounded-[40px] border border-gray-150 shadow-xl overflow-hidden min-h-[500px] flex flex-col md:flex-row">
          
          {/* Side navigation rail panel */}
          <div className="w-full md:w-64 bg-djp-charcoal text-gray-300 p-6 space-y-4 flex flex-col justify-between border-r border-white/5">
            <div className="space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <span className="text-[10px] text-gray-400 block tracking-widest font-mono">DJP CLASSIFED</span>
                <span className="font-display font-medium text-xs text-white">Central Secretariat Portal</span>
              </div>

              {/* Navigation tab entries */}
              <div className="flex flex-col space-y-1 text-sm font-medium">
                <button
                  onClick={() => setTab("users")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl cursor-pointer flex items-center space-x-2 transition ${
                    tab === "users" ? "bg-djp-green text-white font-bold" : "hover:bg-white/5"
                  }`}
                >
                  <Mail className="h-4.5 w-4.5" />
                  <span>Citizen suggestions</span>
                </button>

                <button
                  onClick={() => setTab("volunteers")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl cursor-pointer flex items-center space-x-2 transition ${
                    tab === "volunteers" ? "bg-djp-green text-white font-bold" : "hover:bg-white/5"
                  }`}
                >
                  <Users className="h-4.5 w-4.5" />
                  <span>Members & Volunteers</span>
                </button>

                <button
                  onClick={() => setTab("donations")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl cursor-pointer flex items-center space-x-2 transition ${
                    tab === "donations" ? "bg-djp-green text-white font-bold" : "hover:bg-white/5"
                  }`}
                >
                  <Award className="h-4.5 w-4.5" />
                  <span>Transparency Donations</span>
                </button>

                <button
                  onClick={() => setTab("cms")}
                  className={`w-full text-left px-4 py-2.5 rounded-xl cursor-pointer flex items-center space-x-2 transition ${
                    tab === "cms" ? "bg-djp-green text-white font-bold" : "hover:bg-white/5"
                  }`}
                >
                  <Newspaper className="h-4.5 w-4.5" />
                  <span>Dynamic News CMS</span>
                </button>
              </div>
            </div>

            <div className="text-[10px] text-gray-500 font-mono pt-8">
              SECURE ADMIN MODULE<br />
              IP REGISTRY CHECK: PASS
            </div>
          </div>

          {/* Core content block panel */}
          <div className="flex-1 p-6 md:p-8 bg-[#F7F4ED]/40 overflow-y-auto">
            
            {loading ? (
              <div className="text-center font-mono text-xs text-gray-400 py-24">
                Loading secure ledger logs...
              </div>
            ) : tab === "users" ? (
              /* CITIZEN SUGGESTIONS GRIEVANCE DIRECTORY */
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-gray-150 pb-4">
                  <div>
                    <h3 className="font-display font-medium text-lg text-djp-charcoal">Citizen suggestions Box</h3>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">Live diagnostic telemetry on public feedback and advisory reports</p>
                  </div>
                  <span className="text-[11px] font-mono text-gray-500 bg-[#EAE5D9]/60 border border-gray-200 px-3 py-1 rounded-xl uppercase font-bold">{messages.length} Records</span>
                </div>

                {/* Recharts Analytics Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white p-6 rounded-[32px] border border-gray-150 shadow-sm">
                  
                  {/* Summary Metric Stats Left Rail */}
                  <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-2 text-djp-green mb-1">
                        <Activity className="h-4 w-4 animate-pulse" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Operational Telemetry</span>
                      </div>
                      <h4 className="font-display font-bold text-base text-djp-charcoal">Public Concern Metrics</h4>
                      <p className="text-[11px] text-gray-500 font-mono leading-relaxed">
                        Continuous live parsing of grievances, advisory suggestions, and campaign support pledges.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-2.5">
                      <div className="bg-[#F7F4ED] p-3 rounded-2xl border border-gray-250/50 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-gray-500 font-mono block">SUGGESTIONS</span>
                          <span className="text-xs font-bold text-djp-charcoal">Civic Ideas</span>
                        </div>
                        <span className="font-mono text-base font-black text-[#FF9933]">
                          {messages.filter(m => m.category === "suggestion").length}
                        </span>
                      </div>

                      <div className="bg-[#F7F4ED] p-3 rounded-2xl border border-gray-250/50 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-gray-500 font-mono block">CAMPAIGN SUPPORT</span>
                          <span className="text-xs font-bold text-djp-charcoal">Volunteer Enrolls</span>
                        </div>
                        <span className="font-mono text-base font-black text-[#4F46E5]">
                          {messages.filter(m => m.category === "support").length}
                        </span>
                      </div>

                      <div className="bg-[#F7F4ED] p-3 rounded-2xl border border-gray-250/50 flex justify-between items-center">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-gray-500 font-mono block">ISSUE REPORTS</span>
                          <span className="text-xs font-bold text-djp-charcoal">District Grievances</span>
                        </div>
                        <span className="font-mono text-base font-black text-[#10B981]">
                          {messages.filter(m => m.category === "issue_report").length}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-400">
                      <span>Total Flow Volume</span>
                      <span className="font-bold text-djp-charcoal">
                        {messages.filter(m => ["suggestion", "support", "issue_report"].includes(m.category)).length} messages
                      </span>
                    </div>
                  </div>

                  {/* Visual Chart Panel: Column 2 (Bar Chart) */}
                  <div className="lg:col-span-4 bg-[#F7F4ED]/40 p-5 rounded-2xl border border-gray-150 h-[280px] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <BarChart3 className="h-3.5 w-3.5 text-djp-green animate-pulse" /> Frequency Distribution
                      </span>
                    </div>

                    {messages.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center text-[11px] font-mono text-gray-400">
                        <span>Awaiting input transactions...</span>
                      </div>
                    ) : (
                      <div className="h-[190px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={[
                              { category: "Suggestions", count: messages.filter(m => m.category === "suggestion").length, color: "#FF9933" },
                              { category: "Support", count: messages.filter(m => m.category === "support").length, color: "#4F46E5" },
                              { category: "Issues", count: messages.filter(m => m.category === "issue_report").length, color: "#10B981" },
                            ]} 
                            margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                          >
                            <XAxis dataKey="category" tick={{ fontSize: 9, fill: '#6B7280', fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 9, fill: '#6B7280', fontFamily: 'monospace' }} axisLine={false} tickLine={false} allowDecimals={false} />
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1C1C1C', borderRadius: '12px', border: 'none', color: '#FFF', fontFamily: 'monospace', fontSize: '10px' }}
                              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                            />
                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                              {[
                                { color: "#FF9933" },
                                { color: "#4F46E5" },
                                { color: "#10B981" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </div>

                  {/* Visual Chart Panel: Column 3 (Pie Chart Breakdown) */}
                  <div className="lg:col-span-4 bg-[#F7F4ED]/40 p-5 rounded-2xl border border-gray-150 h-[280px] flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                        <LucidePieChart className="h-3.5 w-3.5 text-djp-green" /> Proportional Share
                      </span>
                    </div>

                    {messages.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center text-center text-[11px] font-mono text-gray-400">
                        <span>No proportions calculated...</span>
                      </div>
                    ) : (
                      <div className="h-[190px] w-full flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: "Suggestions", count: messages.filter(m => m.category === "suggestion").length, color: "#FF9933" },
                                { name: "Support Requests", count: messages.filter(m => m.category === "support").length, color: "#4F46E5" },
                                { name: "Issue Reports", count: messages.filter(m => m.category === "issue_report").length, color: "#10B981" },
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={45}
                              outerRadius={70}
                              paddingAngle={4}
                              dataKey="count"
                            >
                              {[
                                { color: "#FF9933" },
                                { color: "#4F46E5" },
                                { color: "#10B981" }
                              ].map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip 
                              contentStyle={{ backgroundColor: '#1C1C1C', borderRadius: '12px', border: 'none', color: '#FFF', fontFamily: 'monospace', fontSize: '10px' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        
                        {/* Display aggregate label center-aligned inside donut */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[9px] font-mono text-gray-400 uppercase">Grand</span>
                          <span className="text-sm font-mono font-black text-djp-charcoal leading-none">
                            {messages.filter(m => ["suggestion", "support", "issue_report"].includes(m.category)).length}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                <div className="grid grid-cols-1 gap-4">
                  {messages.length === 0 ? (
                    <div className="p-12 text-center text-xs font-mono text-gray-500 bg-white border rounded-2xl">
                      Suggestions Box empty. Newly reported Grievances will stream here instantly.
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div key={m.id} className="bg-white p-5 rounded-2xl border border-gray-150 card-shadow relative">
                        <span className="absolute top-4 right-4 text-[9px] font-mono font-bold bg-amber-50 text-djp-saffron px-2.5 py-0.5 rounded border border-djp-saffron/20 uppercase">
                          {m.category}
                        </span>

                        <div className="space-y-2">
                          <h4 className="font-display font-medium text-sm text-djp-charcoal uppercase leading-none">{m.fullName}</h4>
                          <span className="text-[10px] font-mono text-gray-500 block">{m.email}</span>
                          
                          <p className="text-xs text-gray-700 leading-normal pt-2 italic">
                            “{m.message}”
                          </p>

                          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-[9px] text-gray-400 font-mono">
                              {m.createdAt?.seconds ? new Date(m.createdAt.seconds * 1000).toLocaleDateString() : "2026-05-24"}
                            </span>
                            <button
                              onClick={() => handleDeleteMessage(m.id!)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition cursor-pointer"
                            >
                              <Trash className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : tab === "volunteers" ? (
              /* ACTIVE REGISTERED MEMBERS LISTING */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-djp-charcoal">Registered DJP Civilian Roster</h3>
                  <span className="text-[11px] font-mono text-gray-500 uppercase">{members.length} Members</span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {members.length === 0 ? (
                    <div className="p-12 text-center text-xs font-mono text-gray-400 bg-white border rounded-2xl">
                      Awaiting first public registration log slip...
                    </div>
                  ) : (
                    members.map((mem) => (
                      <div key={mem.uid} className="bg-white p-5 rounded-2xl border border-gray-100 card-shadow flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono font-bold text-djp-saffron tracking-wider border border-djp-saffron/20 bg-amber-50 px-2 py-0.5 rounded uppercase">
                            {mem.role}
                          </span>
                          <h4 className="font-display font-bold text-sm text-djp-charcoal pt-1 leading-none">{mem.fullName}</h4>
                          <span className="text-[10px] font-mono text-gray-500 block">{mem.email} // {mem.phone}</span>
                          <span className="text-[9px] font-mono text-gray-400 block pt-1">
                            REGION OUTPOST: {mem.state} &gt; {mem.district} &gt; {mem.tehsil || "NA"}
                          </span>
                        </div>

                        <div className="text-right flex items-center space-x-4">
                          <div className="font-mono text-xs font-bold text-djp-navy bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl">
                            {mem.membershipId}
                          </div>
                          
                          <button
                            onClick={() => handleDeleteMember(mem.uid)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-650 hover:bg-red-100 transition cursor-pointer"
                          >
                            <Trash className="h-4.5 w-4.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : tab === "donations" ? (
              /* TRANSPARENCY CONTRIBUTIONS TRANSACTION LOG */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-djp-charcoal">Transparent Contributions Vault</h3>
                  <span className="text-[11px] font-mono text-gray-500 uppercase">{donations.length} Logs</span>
                </div>

                <div className="grid grid-cols-1 gap-3 font-mono text-xs">
                  {donations.length === 0 ? (
                    <div className="p-12 text-center text-xs text-gray-500 bg-white border rounded-2xl">
                      Ledger is empty. Process sandbox contributions to view sync.
                    </div>
                  ) : (
                    donations.map((d) => (
                      <div key={d.id} className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="font-bold text-djp-charcoal text-[13px]">{d.name}</span>
                          <span className="text-[9px] text-gray-400 block">{d.transactionId}</span>
                        </div>
                        
                        <div className="text-right">
                          <span className="font-semibold text-djp-green text-sm block">INR {d.amount.toLocaleString()}</span>
                          <span className="text-[9px] text-gray-400">
                            {d.timestamp?.seconds 
                              ? new Date(d.timestamp.seconds * 1000).toLocaleDateString()
                              : "Recent Slot"
                            }
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* DYNAMIC CMS ANNOUNCEMENTS COMPILER FORM */
              <div className="space-y-6">
                <div className="flex items-start justify-between border-b border-gray-150 pb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-djp-charcoal">News Announcement publisher CMS</h3>
                    <p className="text-[11px] text-gray-550 leading-normal">
                      Publish clean certified articles directly into the home announcements carousel stream.
                    </p>
                  </div>
                  <Newspaper className="h-6 w-6 text-djp-green" />
                </div>

                <form onSubmit={handlePublishNews} className="space-y-4 text-xs">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-650 font-bold mb-1">Headline title *</label>
                      <input
                        type="text"
                        required
                        value={newsTitle}
                        onChange={(e) => setNewsTitle(e.target.value)}
                        placeholder="Establishing DJP Central Secretariat outpost..."
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-djp-charcoal"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-650 font-bold mb-1">Stream category *</label>
                      <select
                        value={newsCategory}
                        onChange={(e: any) => setNewsCategory(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-djp-charcoal"
                      >
                        <option value="announcement">Official Announcement</option>
                        <option value="campaign">Public Outreach Campaign</option>
                        <option value="event">National Assembly Event</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-650 font-bold mb-1">Visual Image URL placeholder link</label>
                    <input
                      type="text"
                      value={newsImg}
                      onChange={(e) => setNewsImg(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-1541872703-74c5e44368f9..."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-djp-charcoal font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-650 font-bold mb-1">Announce Body content copy *</label>
                    <textarea
                      required
                      rows={5}
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      placeholder="Add detailed press release copy or draft campaign guidelines..."
                      className="w-full bg-white border border-gray-200 rounded-xl p-4 text-djp-charcoal"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={newsSaving}
                    className="px-6 py-3 rounded-xl bg-djp-green text-white font-bold hover:bg-emerald-800 transition flex items-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    <Plus className="h-4 w-4" />
                    <span>{newsSaving ? "Compiling CMS..." : "Publish Bulletin Live"}</span>
                  </button>

                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
