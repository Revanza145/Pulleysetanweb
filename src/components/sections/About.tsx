import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, ShieldCheck, Settings, Wrench, RefreshCw, Gauge, Flame, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';

interface MaintenanceTask {
  id: string;
  title: string;
  interval: string;
  status: 'CRITICAL' | 'HIGH' | 'RECOMMENDED';
  icon: typeof Wrench;
  description: string;
  steps: string[];
  proTip: string;
}

export default function About() {
  const [activeTask, setActiveTask] = useState<string | null>('servis-rutin');

  const maintenanceTasks: MaintenanceTask[] = [
    {
      id: 'servis-rutin',
      title: 'Servis & Pembersihan CVT',
      interval: 'Setiap 5.000 KM',
      status: 'CRITICAL',
      icon: RefreshCw,
      description: 'Pembersihan wajib dari debu kampas ganda dan kotoran jalanan yang menumpuk di dalam bak CVT.',
      steps: [
        'Buka cover bak CVT menggunakan kunci T 8mm.',
        'Bersihkan seluruh area pulley depan dan belakang menggunakan air sabun atau pembersih khusus CVT (karburator cleaner).',
        'Pastikan tidak ada oli atau rembesan grease yang mengenai permukaan pulley maupun sabuk V-Belt.'
      ],
      proTip: 'Jangan pernah menyemprotkan oli rantai (chain lube) atau WD-40 ke dalam bak CVT karena akan menyebabkan slip total!'
    },
    {
      id: 'roller-slider',
      title: 'Pemeriksaan Roller & Slider',
      interval: 'Setiap 10.000 KM',
      status: 'HIGH',
      icon: Gauge,
      description: 'Mengecek kebulatan roller dan kerenggangan slider piece penutup rumah roller.',
      steps: [
        'Buka rumah roller (pulley depan) dan keluarkan roller satu-per-satu.',
        'Raba permukaan roller, jika ada bagian yang peang atau gepeng segera ganti satu set demi kelancaran akselerasi.',
        'Cek tiga slider plastik di tutup rumah roller. Jika longgar atau oblak, ganti agar tidak menimbulkan suara berisik kasar.'
      ],
      proTip: 'Gunakan roller dengan berat (gram) yang direkomendasikan kalkulator "Rekomendasi Setup" di atas sesuai tipe motor Anda!'
    },
    {
      id: 'greasing-pulley',
      title: 'Regreasing / Lumasi Pulley',
      interval: 'Setiap 10.000 KM',
      status: 'HIGH',
      icon: Flame,
      description: 'Melumasi pin guide di pulley belakang (sliding sheave) agar pergerakan pulley lancar.',
      steps: [
        'Buka pulley belakang menggunakan tracker sabuk dan kunci shock.',
        'Bersihkan grease lama yang sudah mengering di area pin guide sliding sheave.',
        'Oleskan grease/gemuk baru khusus CVT berdaya rekat tinggi (hi-temp grease) secukupnya pada jalur pin.'
      ],
      proTip: 'Selalu gunakan grease khusus CVT (biasanya berwarna merah atau kuning terang), jangan menggunakan grease sasis biasa karena akan meleleh pada suhu tinggi.'
    },
    {
      id: 'kampas-mangkok',
      title: 'Perawatan Kampas Ganda',
      interval: 'Setiap 15.000 KM',
      status: 'RECOMMENDED',
      icon: ShieldCheck,
      description: 'Menjaga ketebalan kampas kopling ganda dan mencegah gejala berdecit (gredek) saat tarikan awal.',
      steps: [
        'Amplas permukaan kampas ganda tipis-tipis secara merata untuk membuang lapisan keras/mengkilap yang slip.',
        'Bersihkan bagian dalam mangkok kopling ganda dari debu kampas ganda menggunakan lap kering.',
        'Pastikan per sentrifugal (per kecil) masih kenyal dan tidak lembek atau patah.'
      ],
      proTip: 'Jika tarikan motor matic Anda terasa gredek pada RPM rendah, biasanya debu kampas ganda terjebak di dalam mangkok. Bersihkan segera!'
    }
  ];

  return (
    <section id="about" className="py-24 bg-neutral-950 border-t border-white/10 relative overflow-hidden">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left Panel: High Contrast Tech Badge & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 bg-neutral-900/40 border border-white/10 rounded-2xl backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-red-600 text-white text-[10px] font-tech font-black px-3 py-1 uppercase tracking-widest rounded italic shadow-md">
                EST. 2026
              </div>

              <span className="text-xs font-tech text-red-500 uppercase tracking-widest block mb-2">ENGINEERING PROFILE</span>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4">
                PULLEY SETAN <br/>
                <span className="red-gradient-text italic">BY SHIIJULL</span>
              </h3>
              
              <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-light">
                Berawal dari riset jalanan dan hasrat mendalam terhadap peningkatan akselerasi tanpa batas, kami memproduksi suku cadang transmisi custom dengan presisi tingkat tinggi untuk matic kesayangan Anda.
              </p>

              <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">13.6°</p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-tech mt-1">Sutur Custom</p>
                </div>
                <div className="border-x border-white/10">
                  <p className="text-xl sm:text-2xl font-black text-red-500 font-mono">1k+</p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-tech mt-1">Riders</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-white font-mono">100%</p>
                  <p className="text-[9px] text-neutral-500 uppercase tracking-wider font-tech mt-1">Hand-Built</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Panel: Story & Craftsmanship */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-xs font-tech text-red-500 uppercase tracking-[0.2em] block mb-2">BRAND STORY & CRAFTSMANSHIP</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-none mb-6">
                BUKAN PRODUK MASSAL, <br/>
                <span className="text-neutral-400 italic">MELAINKAN KARYA SENI MEKANIS.</span>
              </h2>
              
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8 font-light">
                Berbeda dari pulley cetakan pabrik yang serba kompromis, setiap unit <strong className="text-white font-semibold">Pulley Setan</strong> dikerjakan secara individual menggunakan bahan original berkualitas tinggi (OEM). Kami mendesain ulang sudut kemiringan kipas dan memperluas jalur roller dengan perhitungan aerodinamika transmisi yang matang.
              </p>

              {/* Core Values Rows */}
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-600/10 text-red-500 rounded-lg shrink-0 mt-1">
                    <Settings size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-tech text-white uppercase tracking-wider mb-1">Presisi Bubut Custom 13.6°</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Derajat kemiringan disesuaikan secara dinamis untuk menggeser kurva torsi ke RPM yang lebih rendah, menghasilkan dorongan responsif instan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-600/10 text-red-500 rounded-lg shrink-0 mt-1">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-tech text-white uppercase tracking-wider mb-1">Durabilitas Teruji 50.000 KM</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Diuji di lintasan macet ekstrem stop-and-go perkotaan hingga touring lintas pulau untuk menjamin material tahan lama tanpa risiko slip.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-red-600/10 text-red-500 rounded-lg shrink-0 mt-1">
                    <Award size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-tech text-white uppercase tracking-wider mb-1">Garansi Kepuasan Racikan Shiijull</h4>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      Konsultasi racikan gram roller dan per CVT gratis untuk menyesuaikan berat pengendara, rute jalan harian, dan spesifikasi motor Anda.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Option 2: Integrated CVT Maintenance Guide Section */}
        <div className="border-t border-white/5 pt-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-tech text-red-500 uppercase tracking-[0.2em] inline-flex items-center gap-1.5 justify-center mb-3">
              <Sparkles size={12} className="text-red-500 animate-pulse" /> PANDUAN PERAWATAN CVT (MAINTENANCE)
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
              CARA MERAWAT CVT MATIC <br/>
              <span className="italic text-neutral-500">BIAR AWET & TETAP SETAN</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light">
              Performa luar biasa dari Pulley Setan membutuhkan perawatan berkala yang tepat. Ikuti petunjuk resmi mekanik kami di bawah ini untuk hasil maksimal jangka panjang.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List of Tasks */}
            <div className="lg:col-span-5 space-y-3">
              {maintenanceTasks.map((task) => {
                const Icon = task.icon;
                const isSelected = activeTask === task.id;
                return (
                  <button
                    key={task.id}
                    onClick={() => setActiveTask(task.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center gap-4 ${
                      isSelected 
                        ? 'bg-red-950/20 border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.05)]' 
                        : 'bg-neutral-900/30 border-white/5 hover:border-white/10 hover:bg-neutral-900/50'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                      isSelected ? 'bg-red-500 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono text-neutral-500">{task.interval}</span>
                        <span className={`text-[9px] font-tech font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          task.status === 'CRITICAL' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                          task.status === 'HIGH' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {task.status}
                        </span>
                      </div>
                      <h4 className={`text-sm font-semibold transition-colors ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                        {task.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Content Panel */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {activeTask && (
                  (() => {
                    const task = maintenanceTasks.find(t => t.id === activeTask)!;
                    return (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="bg-neutral-900/40 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm space-y-6"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-xs font-tech text-red-500 uppercase tracking-widest">{task.interval}</span>
                            <span className="text-neutral-600">•</span>
                            <span className="text-xs text-neutral-400 font-mono">Prioritas {task.status}</span>
                          </div>
                          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                            {task.title}
                          </h3>
                        </div>

                        <p className="text-sm text-neutral-300 font-light leading-relaxed">
                          {task.description}
                        </p>

                        <div className="border-t border-white/5 pt-5 space-y-4">
                          <h5 className="text-xs font-tech text-neutral-400 uppercase tracking-wider">Langkah-Langkah Perawatan:</h5>
                          <ul className="space-y-3">
                            {task.steps.map((step, index) => (
                              <li key={index} className="flex gap-3 items-start text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                                <span className="p-0.5 mt-0.5 text-red-500 shrink-0">
                                  <CheckCircle2 size={14} className="text-red-500" />
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Pro-Tip banner */}
                        <div className="p-4 bg-red-600/5 border border-red-500/10 rounded-xl space-y-1">
                          <span className="text-[10px] font-tech text-red-500 uppercase tracking-widest font-black block">PRO TIP DARI SHIIJULL</span>
                          <p className="text-xs text-neutral-400 leading-relaxed font-light">
                            {task.proTip}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })()
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
