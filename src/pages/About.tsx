import { motion } from "motion/react";

export function About() {
  return (
    <div className="min-h-[100dvh] pt-32 pb-20 px-6 md:px-12 flex flex-col relative bg-brand-bg text-brand-dark">
      <div className="absolute top-0 bottom-0 left-[33%] w-[1px] bg-brand-blue/20 hidden lg:block" />

      <div className="max-w-[1400px] mx-auto w-full grid lg:grid-cols-12 gap-12 relative z-10 flex-grow">
        <div className="lg:col-span-4">
          <div className="font-mono text-sm tracking-widest flex gap-4 text-brand-blue mb-8">
            <span>04</span>
            <span className="text-brand-dark opacity-40">/</span>
            <span className="text-brand-dark">About</span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.9] mb-16"
          >
            We keep things simple. No complicated jargon or confusing pricing.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-12 text-lg font-medium text-brand-dark/80 leading-relaxed"
          >
            <div>
              <p className="mb-6">
                [Founder Story Placeholder] I started Northline Studios because I saw too many great local businesses struggling with outdated websites—or no website at all. I wanted to create a straightforward, high-quality service that takes the technical headache away from business owners.
              </p>
              <p>
                [Bio Placeholder] I believe a good website shouldn't just look pretty; it should be an engine that brings in new clients and builds trust instantly.
              </p>
            </div>
            <div className="flex flex-col">
              <p className="mb-6">
                We focus on clean, modern design that works beautifully on any device, ensuring your customers get the best possible impression of your business from the moment they land on your page.
              </p>
              <p className="font-mono text-xs tracking-widest uppercase text-brand-blue mt-auto pt-12 border-t border-brand-dark/10">
                Independent Digital Practice<br/>
                Established 2026
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
