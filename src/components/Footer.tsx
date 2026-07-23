import { useLocation } from "react-router-dom";
import { cn } from "../lib/utils";

export function Footer() {
  const location = useLocation();
  const isDarkBg = location.pathname === '/portfolio' || location.pathname === '/services';
  const colorClass = isDarkBg ? 'bg-transparent text-white border-white/20' : 'bg-transparent text-brand-dark border-brand-dark/10';

  return (
    <footer className={cn("border-t py-8 px-6 md:px-12 mt-auto", colorClass)}>
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-mono text-xs uppercase tracking-widest opacity-60">
          Northline Studios &copy; {new Date().getFullYear()}
        </div>
        <div className="flex gap-6 font-mono text-xs uppercase tracking-widest opacity-80">
          <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
          <span className="opacity-40">/</span>
          <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
        </div>
      </div>
    </footer>
  );
}
