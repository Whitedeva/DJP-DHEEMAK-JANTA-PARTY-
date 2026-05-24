import React, { useState, useEffect } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { Clock } from "lucide-react";
import { db } from "../firebase";
import { Donation } from "../types";

export default function DonationSection() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);

  // Subscribe to real-time transparency donations loop
  useEffect(() => {
    const q = query(collection(db, "donations"), orderBy("timestamp", "desc"), limit(6));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Donation[] = [];
      snapshot.forEach((snap) => {
        items.push({ id: snap.id, ...snap.data() } as Donation);
      });
      setDonations(items);
      setLoading(false);
    }, (error) => {
      console.warn("Could not load donations transparent ledger (expected if newly initialized catalog):", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="donations" className="py-24 bg-[#F7F4ED] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-djp-saffron bg-[#FF9933]/10 px-3 py-1.5 rounded-full uppercase">
            Transparent Fund Ledger
          </span>
          <h2 className="font-display text-4xl font-bold text-djp-charcoal mt-4 tracking-tight leading-none text-center">
            Power DJP Clean Operations
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed text-center">
            Unlike standard parties relying on large corporate oligarchs, DJP is fueled directly by localized, transparent public donations.
          </p>
        </div>

        {/* Centered Transparency Ledger card */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="border border-white/50 bg-white/40 p-6 md:p-8 rounded-[36px] card-shadow space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-djp-charcoal">
                Live Public Transparency Slips
              </h3>
              <span className="text-[9px] font-mono font-bold bg-djp-green/10 text-djp-green border border-djp-green/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse">
                Ledger Syncing
              </span>
            </div>

            {loading ? (
              <div className="text-center text-xs font-mono text-gray-400 py-12">
                Pulling transparency pipeline...
              </div>
            ) : (
              <div className="space-y-4">
                {donations.length === 0 ? (
                  <div className="text-center text-xs font-mono text-gray-500 bg-white border border-gray-100 p-8 rounded-2xl">
                    Awaiting initial patron transaction...
                  </div>
                ) : (
                  donations.map((d, index) => (
                    <div 
                      key={d.id || index}
                      className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
                    >
                      <div className="space-y-1">
                        <h4 className="font-display font-medium text-xs text-djp-charcoal">{d.name}</h4>
                        <div className="flex items-center space-x-1 font-mono text-[9px] text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>
                            {d.timestamp?.seconds 
                              ? new Date(d.timestamp.seconds * 1000).toLocaleTimeString() 
                              : "Just now"
                            }
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-sm font-bold text-djp-green block leading-none">
                          +₹{d.amount.toLocaleString()}
                        </span>
                        <span className="text-[7.5px] font-mono text-djp-navy uppercase font-semibold">
                          {d.transactionId}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            <p className="text-[10px] text-gray-550 leading-relaxed font-mono">
              Citizens can verify transaction hashes directly on our public ledger and audit archives. DJP guarantees zero dark money integration.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
