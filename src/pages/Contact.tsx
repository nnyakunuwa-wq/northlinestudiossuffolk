import { useState, FormEvent } from "react";
import { motion } from "motion/react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => setStatus("success"), 1000);
  };

  return (
    <div className="min-h-screen pt-32 pb-12 px-6 md:px-12 flex flex-col relative bg-brand-bg text-brand-dark">
      {/* Gray vertical line */}
      <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-brand-dark/10 hidden lg:block" />

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 flex-grow">
        {/* Left Side */}
        <div className="flex flex-col">
          <div className="font-mono text-sm tracking-widest flex gap-4 text-brand-blue mb-8 md:mb-12">
            <span>05</span>
            <span className="text-brand-dark opacity-40">/</span>
            <span className="text-brand-dark">Contact</span>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] max-w-md"
          >
            Let's build something great.
          </motion.h1>
        </div>

        {/* Right Side */}
        <div className="flex flex-col pt-12 lg:pt-0">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-brand-dark/80 leading-relaxed font-medium max-w-md lg:ml-auto lg:text-right"
          >
            For websites, interfaces and digital platforms that need clear direction and careful execution.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 lg:mt-auto bg-brand-blue text-white p-8 md:p-16 lg:p-20 flex flex-col items-center justify-center text-center -mx-6 md:mx-0"
          >
            {status === "success" ? (
              <div className="space-y-6">
                <h3 className="text-3xl font-bold tracking-tight">Message Received.</h3>
                <p className="font-mono text-sm opacity-80">We'll be in touch shortly.</p>
              </div>
            ) : (
              <div className="w-full max-w-md">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-8 md:mb-12">
                  <span className="font-normal opacity-60">[</span> Start a conversation <span className="font-normal opacity-60">]</span>
                </h2>
                <div className="w-full h-[1px] bg-white/20 mb-8 md:mb-12" />
                <p className="font-mono text-xs uppercase tracking-widest flex flex-col sm:flex-row items-center justify-center gap-2 mb-12">
                  <span className="opacity-60">or write directly</span>
                  <a href="mailto:hello@northlinestudios.com" className="border-b border-white hover:opacity-80 transition-opacity pb-1">
                    hello@northlinestudios.com
                  </a>
                </p>
                
                {/* Minimalist form expanding below */}
                <form onSubmit={handleSubmit} className="w-full space-y-8 text-left">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="YOUR NAME"
                      className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-mono text-xs md:text-sm uppercase tracking-wider transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="EMAIL ADDRESS"
                      className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-mono text-xs md:text-sm uppercase tracking-wider transition-colors"
                    />
                  </div>
                  <div>
                    <textarea
                      required
                      placeholder="PROJECT DETAILS"
                      rows={3}
                      className="w-full bg-transparent border-b border-white/30 px-0 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-mono text-xs md:text-sm uppercase tracking-wider transition-colors resize-none"
                    />
                  </div>
                  <button type="submit" className="font-mono text-xs md:text-sm uppercase tracking-widest border border-white px-8 py-4 hover:bg-white hover:text-brand-blue transition-colors w-full">
                    {status === "submitting" ? "SENDING..." : "SUBMIT"}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
