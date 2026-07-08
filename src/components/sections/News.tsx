import { NEWS } from '../../constants';
import { Calendar, ChevronRight } from 'lucide-react';

export default function News() {
  return (
    <section id="news" className="py-24 bg-neutral-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-16 sm:mb-20 gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
             <div className="w-1 h-10 sm:h-12 bg-red-600" />
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic text-white tracking-tighter uppercase">
               REAL <span className="red-gradient-text">PROOF.</span>
             </h2>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-tech tracking-widest text-white/40 hover:text-white transition-colors self-start sm:self-auto">
            MORE STORIES <ChevronRight size={14} className="text-red-600" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {NEWS.map((item) => (
            <div key={item.id} className="group relative flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2 aspect-[4/3] w-full overflow-hidden border border-white/5 bg-white/[0.02]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-red-500 font-tech text-[9px] tracking-widest uppercase">
                    {item.category}
                  </span>
                  <div className="w-[1px] h-3 bg-white/10" />
                  <span className="text-white/30 text-[9px] font-tech tracking-widest">
                    {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-tech text-white tracking-tight mb-4 group-hover:text-red-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-500 text-xs leading-relaxed mb-6 font-light">
                  {item.excerpt}
                </p>
                <div className="mt-auto accent-line w-12 group-hover:w-full transition-all duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
