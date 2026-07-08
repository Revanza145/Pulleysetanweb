import { Shield, Cpu, Zap } from 'lucide-react';
import { FEATURES } from '../../constants';
import { cn } from '../../lib/utils';

const ICON_MAP = {
  Shield: Shield,
  Cpu: Cpu,
  Zap: Zap,
};

export default function Features() {
  return (
    <section id="tech" className="bg-neutral-950 border-y border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = ICON_MAP[feature.icon as keyof typeof ICON_MAP];
            return (
              <div 
                key={feature.title} 
                className={cn(
                  "p-10 sm:p-12 md:p-16 flex flex-col items-center text-center",
                  index !== FEATURES.length - 1 && "border-b lg:border-b-0 lg:border-r border-white/10",
                  index === 0 && "bg-white/[0.02]"
                )}
              >
                <div className="mb-8 relative">
                   <div className="w-16 h-16 bg-red-600/10 flex items-center justify-center text-red-600 rounded-full">
                      <Icon size={32} />
                   </div>
                   <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-ping" />
                </div>
                
                <h3 className="text-xl font-tech uppercase tracking-widest mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-neutral-500 text-sm leading-relaxed max-w-xs mb-8">
                  {feature.description}
                </p>
                
                <div className="mt-auto w-full pt-8 border-t border-white/5">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-tech text-white/30">
                    <span>Industrial Grade</span>
                    <span>99.9% Efficiency</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
