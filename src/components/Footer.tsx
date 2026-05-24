import React from "react";
import { Landmark, Mail, MapPin, Phone, HelpCircle, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-djp-charcoal text-gray-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Brand Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-white border border-gray-800 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src="https://i.postimg.cc/DzWXnVHv/file-00000000fbc0720b832f575e503359ee.png" 
                  alt="DJP Logo" 
                  className="h-8 w-8 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">DJP</span>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-400">
              Dheemak Janta Party is an emerging democratic force built upon high-grade systemic integrity to power employment, healthcare, parity, smart accessibility, and clean energy loops.
            </p>

            <div className="pt-2 text-xs font-mono font-bold text-djp-saffron tracking-wider uppercase">
              “Voice of the People, Vision for the Nation”
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-white font-semibold text-sm tracking-wide uppercase mb-4">Core Focus Pillars</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><div className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-djp-green" /><span>National Employment System</span></div></li>
              <li><div className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-djp-green" /><span>Tier-Based Smart Healthcare</span></div></li>
              <li><div className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-djp-green" /><span>Empower Free Quality Classrooms</span></div></li>
              <li><div className="flex items-center space-x-1"><span className="w-1.5 h-1.5 rounded-full bg-djp-green" /><span>Green Energy Grid Solutions</span></div></li>
            </ul>
          </div>

          {/* Office Address placeholders */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-semibold text-sm tracking-wide uppercase">Official Headquarters</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4.5 w-4.5 text-djp-saffron mt-0.5" />
                <span>
                  <strong>National Office HQ:</strong><br />
                  100% Online Digital Headquarters. Reach our leadership team directly and privately.
                </span>
              </div>
            </div>
          </div>

          {/* Contact Details placeholders */}
          <div className="space-y-4">
            <h3 className="font-display text-white font-semibold text-sm tracking-wide uppercase">Communications</h3>
            <div className="space-y-3 text-sm font-mono">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-djp-green" />
                <a href="mailto:contact@djpindia.org" className="hover:text-white transition">contact@djpindia.org</a>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="h-4 w-4 text-djp-green" />
                <span className="text-[11px] text-amber-500 font-bold">Growing with People's Trust</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-mono">
          <div>
            &copy; {currentYear} Dheemak Janta Party (DJP). An unregistered, rapidly growing democratic movement fueled purely by the trust, support, and loyalty of everyday citizens.
          </div>
          <div className="mt-2 md:mt-0 flex space-x-4">
            <span>Designed for Umair Javid Movement</span>
            <span>-</span>
            <span>Equality and Integrity First</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
