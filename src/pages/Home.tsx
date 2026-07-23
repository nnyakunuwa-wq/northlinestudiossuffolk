import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Home() {
  return (
    <div className="relative min-h-[100dvh] pt-32 pb-12 px-6 md:px-12 flex flex-col justify-center bg-brand-bg text-brand-dark">
      {/* Blue line */}
      <div className="absolute top-0 bottom-0 left-[40%] w-[1px] bg-brand-blue hidden lg:block" />

      <div className="relative z-10 max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-6 flex-grow">
        <div className="lg:col-span-12 mb-8 md:mb-12">
          <div className="font-mono text-sm tracking-widest flex gap-4 text-brand-blue">
            <span>01</span>
            <span className="text-brand-dark opacity-40">/</span>
            <span className="text-brand-dark">Home</span>
          </div>
        </div>

        <div className="lg:col-span-10 lg:col-start-1">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[110px] font-bold tracking-tighter leading-[0.9]"
          >
            Custom websites for local businesses— built for growth.
          </motion.h1>
        </div>

        <div className="lg:col-span-5 lg:col-start-1 mt-12 lg:mt-24">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-2xl text-brand-dark/70 leading-relaxed font-medium"
          >
            We design and build professional, affordable websites that help you stand out, win trust, and grow your business. No jargon, just results.
          </motion.p>
        </div>
      </div>

      <div className="mt-16 md:mt-auto pt-12 max-w-[1400px] mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-12 relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 font-mono text-xs tracking-widest uppercase opacity-60">
          <div className="w-2 h-2 bg-brand-blue hidden sm:block" />
          <span>Based in UK</span>
          <span className="hidden sm:block">/</span>
          <span>Open for projects</span>
        </div>

        <Link to="/contact" className="group self-end md:self-auto">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark group-hover:text-brand-blue transition-colors flex items-center gap-2 md:gap-4">
            <span className="text-brand-blue font-normal">[</span>
            Let's talk
            <span className="text-brand-blue font-normal">]</span>
          </h2>
        </Link>
      </div>
    </div>
  );
}
