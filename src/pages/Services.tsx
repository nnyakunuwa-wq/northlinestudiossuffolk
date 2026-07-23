import { packages, addons } from "../data";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export function Services() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col relative bg-brand-dark text-white">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="font-mono text-sm tracking-widest flex gap-4 text-brand-blue mb-12">
          <span>03</span>
          <span className="opacity-40">/</span>
          <span>Packages</span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-16 md:mb-24"
        >
          Clear, upfront pricing.
        </motion.h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col p-8 border-r border-b border-white/10 hover:bg-white/5 transition-colors"
            >
              <h3 className="text-3xl font-bold tracking-tighter mb-4">{pkg.name}</h3>
              <p className="text-brand-blue text-4xl font-mono tracking-tighter mb-8">{pkg.price}</p>
              <p className="text-sm opacity-70 mb-12 h-16">{pkg.description}</p>
              
              <ul className="space-y-4 mb-12 flex-grow">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-4 text-sm font-medium border-t border-white/10 pt-4">
                    <span className="text-brand-blue font-mono text-xs opacity-70">+</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/contact" className="font-mono text-xs tracking-widest uppercase py-4 border border-white/20 text-center hover:bg-white hover:text-brand-dark transition-colors block">
                Select
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Addons */}
        <div className="mt-24 grid lg:grid-cols-2 gap-12 border-t border-white/10 pt-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Add-ons</h2>
            <div className="space-y-6 lg:border-l border-white/10 lg:pl-6">
              {addons.map((addon) => (
                <div key={addon.name} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b border-white/10 pb-6">
                  <div>
                    <h4 className="text-lg font-bold tracking-tighter">{addon.name}</h4>
                    {addon.description && <p className="text-sm opacity-60 mt-1">{addon.description}</p>}
                  </div>
                  <span className="font-mono text-sm text-brand-blue tracking-tighter">{addon.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-8">Good to Know</h2>
            <div className="space-y-6 lg:border-l border-white/10 lg:pl-6">
              {[
                "2 rounds of revisions included before final delivery.",
                "Client keeps their existing domain.",
                "Hosting is included at no extra cost.",
                "Payment: 50% upfront, 50% on final delivery."
              ].map((text, i) => (
                <p key={i} className="flex gap-4 text-sm opacity-80 border-b border-white/10 pb-6">
                  <span className="text-brand-blue font-mono">0{i+1}</span>
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
