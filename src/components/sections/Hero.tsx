import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden bg-neutral-950">
      {/* Left Panel: Identity */}
      <div className="relative w-full lg:w-[45%] flex flex-col justify-center p-8 sm:p-12 md:p-24 z-10 pt-32 md:pt-24">
        <div className="absolute top-0 left-0 w-16 md:w-24 h-full bg-white/[0.02] hidden md:flex items-center justify-center">
          <span className="vertical-text uppercase tracking-[1em] text-[10px] opacity-20 font-tech rotate-180 text-white">
            PRECISION ENGINEERING
          </span>
        </div>
        
        <div className="md:ml-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 uppercase tracking-tighter text-white">
              AKSELERASI <br/> <span className="red-gradient-text italic leading-tight">TANPA BATAS.</span>
            </h1>
            <div className="accent-line w-24 md:w-32 mb-8" />
            
            <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed mb-10 max-w-sm font-light">
              Solusi upgrade CVT motor matic untuk hasilkan akselerasi instan (jambak) 
              dan power delivery yang lebih responsif. Rahasia motor matic kencang harian.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/6287777920321?text=Halo%20PulleySetan%2C%20saya%20tertarik%20untuk%20membeli%20PulleySetan%20custom%20untuk%20motor%20matic%20saya.%20Bagaimana%20prosedur%20pemesanan%20dan%20pembayarannya%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 px-8 py-4 text-[10px] sm:text-xs font-tech uppercase tracking-widest hover:bg-neutral-100 hover:text-neutral-900 text-white transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center"
              >
                BELI SEKARANG
              </a>
              <a 
                href="https://wa.me/6287777920321?text=Halo%20PulleySetan%2C%20saya%20ingin%20konsultasi%20gratis%20mengenai%20upgrade%20CVT%20dan%20racikan%20kirian%20untuk%20motor%20matic%20saya."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-8 py-4 text-[10px] sm:text-xs font-tech uppercase tracking-widest hover:border-white/60 text-white transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center"
              >
                KONSULTASI GRATIS
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel: Hero Visual */}
      <div className="relative flex-grow min-h-[40vh] sm:min-h-[50vh] lg:min-h-screen bg-gradient-to-br from-[#111] to-black flex items-center justify-center p-8 sm:p-20">
        {/* Abstract pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="w-[80%] h-[80%] rounded-full bg-red-600/5 blur-[120px]" />
          
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative z-10 w-full max-w-lg aspect-square flex items-center justify-center p-8"
          >
            {/* Stylized Pulley Visual */}
            <div className="relative group cursor-pointer transition-transform duration-700 hover:scale-105">
              <div className="w-56 h-56 md:w-80 md:h-80 bg-gradient-to-br from-neutral-800 to-neutral-700 rounded-full shadow-[0_0_100px_rgba(220,38,38,0.25)] relative border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="/assets/image/pulley_product.jpg" 
                  alt="Pulley Setan Product" 
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/10 z-15 pointer-events-none" />
                <div className="absolute inset-4 border-2 border-red-600/30 rounded-full z-20 pointer-events-none" />
                
                <div className="absolute bottom-4 right-4 bg-red-600 text-white font-tech font-black text-[10px] md:text-xs px-2.5 py-1 rounded italic shadow-[0_0_15px_rgba(220,38,38,0.6)] z-30">
                  PS
                </div>
              </div>
              
              {/* Floating Tech Labels */}
              <div className="absolute -top-6 right-[-12px] md:-right-10 z-30 glass-panel p-4 rounded-lg transform rotate-[5deg] animate-pulse">
                <p className="text-[10px] font-tech text-red-500 uppercase">Durability</p>
                <p className="text-sm md:text-lg font-bold text-white">UP TO 50K KM</p>
              </div>
              <div className="absolute -bottom-6 left-[-12px] md:-left-10 z-30 glass-panel p-4 rounded-lg transform rotate-[-5deg]">
                <p className="text-[10px] font-tech text-red-500 uppercase">Degree Shift</p>
                <p className="text-sm md:text-lg font-bold text-white">13.6° CUSTOM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
