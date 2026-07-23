import { useAppData } from "../lib/data-service";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

export function Portfolio() {
  const { portfolio } = useAppData();

  return (
    <div className="min-h-screen bg-brand-blue text-white pt-32 pb-20 px-6 md:px-12 flex flex-col">
      <div className="max-w-[1400px] mx-auto w-full flex-grow flex flex-col">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 md:mb-24 border-b border-white/20 pb-12">
          <div>
            <div className="font-mono text-sm tracking-widest flex gap-4 mb-8 md:mb-12">
              <span>02</span>
              <span className="opacity-50">/</span>
              <span>Selected Work</span>
            </div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9]"
            >
              Selected work,<br />built for growth.
            </motion.h1>
          </div>
          <div className="flex flex-col justify-between items-start md:items-end">
            <div className="font-mono text-xs tracking-widest uppercase mb-8 md:mb-12">
              Active 01 / {portfolio.length < 10 ? `0${portfolio.length}` : portfolio.length}
            </div>
            <p className="text-lg md:text-xl md:text-right max-w-md opacity-90 leading-relaxed">
              Product, interface and web system work resolved as one connected surface.
            </p>
          </div>
        </div>

        {/* List */}
        <div className="flex flex-col w-full">
          {portfolio.map((item, i) => (
            <motion.a
              href={item.link || "#"}
              target={item.link ? "_blank" : "_self"}
              rel={item.link ? "noopener noreferrer" : ""}
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group grid grid-cols-1 md:grid-cols-12 gap-6 items-center py-10 md:py-16 border-b border-white/20 hover:bg-white/5 transition-colors -mx-6 md:-mx-12 px-6 md:px-12"
            >
              <div className="md:col-span-4 font-mono text-xs tracking-widest uppercase opacity-70 hidden lg:flex flex-col gap-2">
                {i === 0 && (
                  <>
                    <span>[ {new Date(item.createdAt || Date.now()).getFullYear()} · WEB LAUNCH ]</span>
                    <span>DIRECTION · FRONTEND</span>
                  </>
                )}
              </div>
              
              <div className="md:col-span-12 lg:col-span-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter group-hover:translate-x-4 transition-transform duration-300">
                  {item.title}
                </h2>
                <div className="flex items-center gap-6 self-start md:self-auto">
                  <div className="flex items-center gap-4 font-mono text-xs tracking-widest uppercase">
                    <span className="border border-white/30 px-2 py-1 leading-none rounded-sm">{i + 1 < 10 ? `0${i + 1}` : i + 1}</span>
                    <span className="opacity-70 whitespace-nowrap">{item.tags?.[0] || 'WEBSITE'}</span>
                  </div>
                  <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
