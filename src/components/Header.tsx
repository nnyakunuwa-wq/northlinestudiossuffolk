import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "../lib/utils";

const navLinks = [
  { num: "01", name: "Home", path: "/" },
  { num: "02", name: "Packages", path: "/services" },
  { num: "03", name: "Portfolio", path: "/portfolio" },
  { num: "04", name: "About", path: "/about" },
  { num: "05", name: "Contact", path: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDarkBg = location.pathname === '/portfolio' || location.pathname === '/services';
  const textColor = isDarkBg ? 'text-white' : 'text-brand-dark';

  return (
    <>
      <header className={cn("fixed top-0 inset-x-0 z-40 transition-colors duration-300", textColor)}>
        <div className="flex h-24 items-center justify-between px-6 md:px-12">
          <Link to="/" className="text-2xl font-bold tracking-tighter" onClick={() => setIsOpen(false)}>
            Northline
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 text-sm font-medium hover:opacity-70 transition-opacity"
          >
            <span>Menu</span>
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
              <div className="w-1.5 h-1.5 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* Menu Drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 flex justify-end transition-opacity duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        <div
          className={cn(
            "relative w-full md:w-[600px] h-full bg-brand-blue text-white p-8 md:p-12 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center mb-24 font-mono text-xs uppercase tracking-widest">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-white" />
              <span>Menu / 01-05</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              Close <span className="text-2xl leading-none font-light">&times;</span>
            </button>
          </div>

          <nav className="flex flex-col gap-6 md:gap-8 flex-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="group flex items-start gap-6 border-b border-white/20 pb-6 md:pb-8 hover:border-white transition-colors"
              >
                <span className="font-mono text-xs mt-3 md:mt-4 opacity-60">{link.num}</span>
                <span className="text-5xl md:text-7xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-300">{link.name}</span>
                {link.name === "Contact" && (
                  <span className="font-mono text-xs mt-3 md:mt-4 ml-2 md:ml-4 opacity-60 uppercase hidden sm:block">[Action]</span>
                )}
              </Link>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-white/20 flex gap-6 font-mono text-xs uppercase tracking-widest opacity-80">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
            <span className="opacity-40">/</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
          </div>
        </div>
      </div>
    </>
  );
}
