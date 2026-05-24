import React from "react";
import { Menu, X, Landmark, ShieldCheck, UserCheck } from "lucide-react";

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isAdminMode: boolean;
  setIsAdminMode: (admin: boolean) => void;
  isSignedIn: boolean;
  currentUserEmail: string | null;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  isAdminMode,
  setIsAdminMode,
  isSignedIn,
  currentUserEmail,
  onLogin,
  onLogout,
}: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { id: "hero", label: "Home" },
    { id: "about", label: "Our Story" },
    { id: "equality", label: "Equal India" },
    { id: "manifesto", label: "Manifesto 2026" },
    { id: "membership", label: "Join Movement" },
    { id: "news", label: "Announcements" },
    { id: "donations", label: "Contribute" },
    { id: "contact", label: "Reach Us" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/20 card-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div 
            onClick={() => setCurrentTab("hero")}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center shadow-sm relative overflow-hidden shrink-0">
              <img 
                src="https://i.postimg.cc/DzWXnVHv/file-00000000fbc0720b832f575e503359ee.png" 
                alt="DJP Logo" 
                className="h-9 w-9 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="font-display font-bold text-lg tracking-wide text-djp-charcoal uppercase group-hover:text-djp-green transition">
                Dheemak Janta Party
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-[10px] font-mono text-djp-saffron tracking-widest font-semibold">DJP</span>
                <span className="text-[9px] text-gray-500 font-medium">| Voice of the People</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsAdminMode(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition duration-200 cursor-pointer ${
                  currentTab === item.id && !isAdminMode
                    ? "bg-djp-green/10 text-djp-green font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-djp-charcoal"
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Admin Dashboard Entry */}
            <button
              id="nav-link-admin"
              onClick={() => {
                setCurrentTab("");
                setIsAdminMode(true);
              }}
              className={`ml-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold border flex items-center space-x-1 bg-white hover:bg-red-50 cursor-pointer transition ${
                isAdminMode 
                  ? "border-djp-saffron text-djp-saffron ring-1 ring-djp-saffron bg-amber-50/30" 
                  : "border-gray-200 text-gray-500 hover:border-gray-400"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Console</span>
            </button>
          </div>

          {/* User Sign-In Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {isSignedIn ? (
              <div className="flex items-center space-x-3 bg-white/60 px-3 py-1.5 rounded-xl border border-gray-100 text-xs">
                <div className="flex items-center space-x-1 text-gray-600 font-mono">
                  <UserCheck className="h-4.5 w-4.5 text-djp-green" />
                  <span className="max-w-[120px] truncate">{currentUserEmail}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="px-4 py-2 text-xs font-bold rounded-xl text-white bg-djp-green hover:bg-emerald-800 shadow-sm transition duration-150 cursor-pointer"
              >
                Sign with Google
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              onClick={() => {
                setCurrentTab("");
                setIsAdminMode(true);
              }}
              className={`p-2 rounded-lg text-xs font-mono border flex items-center space-x-1 ${
                isAdminMode ? "border-djp-saffron text-djp-saffron bg-amber-50/20" : "border-gray-200 text-gray-500"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-djp-charcoal focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {isOpen && (
        <div className="lg:hidden glass border-t border-white/20 animate-fade-in py-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setIsAdminMode(false);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                  currentTab === item.id && !isAdminMode
                    ? "bg-djp-green/10 text-djp-green font-semibold"
                    : "text-gray-600 hover:bg-gray-100 hover:text-djp-charcoal"
                }`}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentTab("");
                setIsAdminMode(true);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-base font-mono font-bold border-t ${
                isAdminMode ? "bg-amber-50 text-djp-saffron" : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              Admin Console
            </button>

            {/* Mobile Auth button */}
            <div className="pt-4 pb-2 border-t border-gray-100 px-3">
              {isSignedIn ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-xs font-mono text-gray-500 truncate">{currentUserEmail}</span>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center px-4 py-2 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    onLogin();
                    setIsOpen(false);
                  }}
                  className="w-full text-center px-4 py-2.5 rounded-xl text-white bg-djp-green text-sm font-bold shadow-md"
                >
                  Sign with Google
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
