import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, 
  Gauge, 
  User, 
  Bike, 
  Settings2, 
  Flame, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  Volume2,
  Shield,
  Clock,
  HelpCircle
} from 'lucide-react';

// Data types and presets
type BrandType = 'Honda' | 'Yamaha' | 'Suzuki' | 'Piaggio' | 'Vespa';

const brands: BrandType[] = ['Honda', 'Yamaha', 'Suzuki', 'Piaggio', 'Vespa'];

const motorModels: Record<BrandType, string[]> = {
  Honda: [
    'Beat FI',
    'Beat Street',
    'Beat Deluxe',
    'Scoopy',
    'Genio',
    'Vario 110',
    'Vario 125',
    'Vario 150',
    'Vario 160',
    'PCX 150',
    'PCX 160',
    'ADV150',
    'ADV160',
    'Stylo 160',
    'Air Blade'
  ],
  Yamaha: [
    'Mio Sporty',
    'Mio Soul',
    'Mio M3',
    'Mio Z',
    'Gear 125',
    'Fino',
    'Lexi',
    'Lexi LX155',
    'Freego',
    'Aerox 155',
    'NMAX 155',
    'XMAX 250'
  ],
  Suzuki: [
    'Nex II',
    'Address',
    'Burgman Street',
    'Avenis'
  ],
  Piaggio: [
    'Liberty 125',
    'Medley 150',
    'Beverly'
  ],
  Vespa: [
    'Sprint',
    'Primavera',
    'GTS',
    'LX125',
    'S125'
  ]
};

type NeedType = 'Daily Series' | 'Touring Series' | 'Sprint Series' | 'Top Speed Setan' | 'Torque Series';

const needs: { value: NeedType; label: string; desc: string; icon: string }[] = [
  { value: 'Daily Series', label: 'Daily Series', desc: 'Nyaman, irit, dan responsif untuk harian', icon: '⚡' },
  { value: 'Sprint Series', label: 'Stop n go', desc: 'Respons instan, jambak dari putaran bawah', icon: '🔥' },
  { value: 'Top Speed Setan', label: 'Top Speed Setan', desc: 'Nafas panjang di putaran atas untuk kecepatan tinggi', icon: '🚀' },
  { value: 'Touring Series', label: 'Touring Series', desc: 'Suhu stabil, kuat menanjak jarak jauh', icon: '🏔️' },
  { value: 'Torque Series', label: 'Torque Series', desc: 'Torsi badak saat membawa beban berat', icon: '👥' }
];

export const STOCK_ROLLER_WEIGHTS: Record<string, number> = {
  // Honda
  'Beat FI': 12,
  'Beat Street': 13,
  'Beat Deluxe': 12,
  'Scoopy': 12,
  'Genio': 12,
  'Vario 110': 13,
  'Vario 125': 18,
  'Vario 150': 18,
  'Vario 160': 20,
  'PCX 150': 18,
  'PCX 160': 20,
  'ADV150': 18,
  'ADV160': 20,
  'Stylo 160': 20,
  'Air Blade': 15,

  // Yamaha
  'Mio Sporty': 10,
  'Mio Soul': 10,
  'Mio M3': 12,
  'Mio Z': 12,
  'Gear 125': 12,
  'Fino': 12,
  'Lexi': 14,
  'Lexi LX155': 14,
  'Freego': 12,
  'Aerox 155': 14,
  'NMAX 155': 14,
  'XMAX 250': 23,

  // Suzuki
  'Nex II': 10,
  'Address': 12,
  'Burgman Street': 15,
  'Avenis': 15,

  // Piaggio
  'Liberty 125': 15,
  'Medley 150': 15,
  'Beverly': 18,

  // Vespa
  'Sprint': 15,
  'Primavera': 15,
  'GTS': 18,
  'LX125': 18,
  'S125': 18
};

export default function CvtRecommendation() {
  const [selectedBrand, setSelectedBrand] = useState<BrandType>('Honda');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [riderWeight, setRiderWeight] = useState<number>(65);
  const [selectedNeed, setSelectedNeed] = useState<NeedType>('Daily Series');
  
  // App states
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [recommendation, setRecommendation] = useState<any>(null);

  // Automatically select first model when brand changes
  useEffect(() => {
    if (motorModels[selectedBrand]) {
      setSelectedModel(motorModels[selectedBrand][0]);
    }
  }, [selectedBrand]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    // Simulate real-time precision engineering telemetry calculations
    setTimeout(() => {
      // 1. Calculate specs based on inputs
      let baseRoller = 12; // default
      let engineSize = '110cc - 125cc';
      
      // Determine base rollers depending on model characteristics
      if (['Vario 150', 'PCX 150', 'ADV150', 'NMAX 155', 'Aerox 155', 'Lexi LX155', 'Medley 150'].includes(selectedModel)) {
        baseRoller = 15;
        engineSize = '150cc - 155cc';
      } else if (['Vario 160', 'PCX 160', 'ADV160', 'Stylo 160'].includes(selectedModel)) {
        baseRoller = 20;
        engineSize = '160cc eSP+';
      } else if (selectedModel === 'XMAX 250' || selectedModel === 'Beverly') {
        baseRoller = 23;
        engineSize = '250cc - 300cc';
      } else if (['GTS', 'Sprint', 'Primavera'].includes(selectedModel)) {
        baseRoller = 18;
        engineSize = '3-Valves i-Get 150cc';
      } else if (['Beat FI', 'Beat Street', 'Beat Deluxe', 'Scoopy', 'Genio', 'Mio M3', 'Gear 125', 'Fino', 'Nex II'].includes(selectedModel)) {
        baseRoller = 12;
        engineSize = '110cc - 125cc BlueCore/eSP';
      }

      // Weight compensation
      let weightCompensation = 0;
      if (riderWeight < 55) {
        weightCompensation = 1.0; // lightweight: heavier rollers to stretch top-end
      } else if (riderWeight > 85) {
        weightCompensation = -1.5; // heavy weight: lighter rollers to prevent bogging down
      } else if (riderWeight > 75) {
        weightCompensation = -0.5;
      }

      // Need adjustment
      let needCompensation = 0;
      let pulleyAngle = '13.6°';
      let cvtSpring = '1200 RPM';
      let clutchSpring = '1000 RPM (Custom)';
      let accScore = 75;
      let topScore = 75;
      let climbScore = 70;
      let fuelScore = 80;

      switch (selectedNeed) {
        case 'Sprint Series':
          needCompensation = -4.0;
          pulleyAngle = '13.5° / 13.6° Racikan Setan';
          cvtSpring = '1500 RPM ';
          clutchSpring = '1200 RPM ';
          accScore = 98;
          topScore = 70;
          climbScore = 85;
          fuelScore = 70;
          break;
        case 'Top Speed Setan':
          needCompensation = -3.0;
          pulleyAngle = '13.8° High Speed Series';
          cvtSpring = '1500 RPM ';
          clutchSpring = '2000 RPM';
          accScore = 65;
          topScore = 96;
          climbScore = 60;
          fuelScore = 85;
          break;
        case 'Touring Series':
          needCompensation = -1.5;
          pulleyAngle = '13.6° Touring Series';
          cvtSpring = '1200 RPM ';
          clutchSpring = '1000 RPM ';
          accScore = 82;
          topScore = 82;
          climbScore = 90;
          fuelScore = 78;
          break;
        case 'Torque Series':
          needCompensation = -1.0;
          pulleyAngle = '13.6° Torque Series';
          cvtSpring = '1500 RPM ';
          clutchSpring = '1500 RPM ';
          accScore = 85;
          topScore = 72;
          climbScore = 96;
          fuelScore = 72;
          break;
        case 'Daily Series':
        default:
          needCompensation = -4.0;
          pulleyAngle = '13.6° Daily Series';
          cvtSpring = '1000 RPM / 1200 RPM ';
          clutchSpring = '1500 RPM';
          accScore = 80;
          topScore = 80;
          climbScore = 75;
          fuelScore = 88;
          break;
      }

      // Calculate final roller setup (Always using whole integer numbers to avoid mixed weights as requested)
      const finalWeightFloat = Math.round(baseRoller + weightCompensation + needCompensation);
      
      // Force flat setup (no mixed weight) as requested by the user
      const rollerSetup = `Rata ${finalWeightFloat} Gram`;

      // Add engineering commentary
      let commentary = '';
      if (selectedNeed === 'Sprint Series') {
        commentary = `Sudut pulley ekstrem ${pulleyAngle} dikombinasikan dengan berat roller rata ${finalWeightFloat}g yang lebih enteng menghasilkan lompatan RPM bawah yang sangat galak. Per CVT 1500 RPM menjaga belt tetap menjepit kuat di putaran tinggi tanpa selip.`;
      } else if (selectedNeed === 'Top Speed Setan') {
        commentary = `Menggunakan sudut landai ${pulleyAngle} untuk melontarkan belt lebih keluar pada limiter tertinggi, dibantu berat roller rata ${finalWeightFloat}g untuk memberikan gaya sentrifugal solid. Per CVT 1000 RPM memastikan motor tidak kehabisan nafas di trek lurus panjang.`;
      } else {
        commentary = `Racikan all-rounder paling dinamis untuk ${selectedModel}. Berat roller rata ${finalWeightFloat}g mempertahankan efisiensi BBM harian Anda sembari memangkas jeda akselerasi (delay CVT) secara signifikan saat bermanuver di perkotaan.`;
      }

      setRecommendation({
        brand: selectedBrand,
        model: selectedModel,
        weight: riderWeight,
        need: selectedNeed,
        engineSize,
        pulleyAngle,
        rollerWeight: `Rata ${finalWeightFloat} Gram`,
        rollerWeightNum: finalWeightFloat,
        rollerSetup,
        stockWeight: STOCK_ROLLER_WEIGHTS[selectedModel] || baseRoller,
        cvtSpring,
        clutchSpring,
        accScore,
        topScore,
        climbScore,
        fuelScore,
        commentary
      });

      setIsCalculating(false);
      setShowResult(true);

      // Smooth scroll to result
      setTimeout(() => {
        const resElement = document.getElementById('calc-result');
        if (resElement) {
          resElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 100);
    }, 1500);
  };

  // Construct Custom WA Pre-filled Text
  const waNumber = '6287777920321';
  const getWaLink = () => {
    if (!recommendation) return '';
    const text = `Halo PulleySetan, saya baru saja mencoba *Kalkulator Rekomendasi Setup CVT* di website dan ingin berkonsultasi / memesan paket ini:

*DATA MOTOR & RIDER*
- Motor: ${recommendation.brand} - ${recommendation.model} (${recommendation.engineSize})
- Berat Rider: ${recommendation.weight} kg
- Kebutuhan: ${recommendation.need}

*HASIL REKOMENDASI TUNE-UP*
- Sudut Kemiringan Pulley: *${recommendation.pulleyAngle}*
- Konfigurasi Roller: *${recommendation.rollerSetup}*
- Per CVT: *${recommendation.cvtSpring}*
- Per Sentri: *${recommendation.clutchSpring}*
- Custom Milling: Jalur Roller Kerok Presisi Maksimal

Mohon infokan rincian harga paket dan estimasi pengerjaannya. Terima kasih!`;
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="rekomendasi-setup" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden border-t border-neutral-900">
      {/* Background grid accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/40 border border-red-500/20 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] font-tech text-red-500 uppercase">Interactive AI Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            REKOMENDASI <span className="red-gradient-text italic font-tech">SETUP CVT</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm max-w-xl mx-auto font-light leading-relaxed">
            Dapatkan racikan derajat pulley custom, ukuran roller, dan per CVT presisi yang disesuaikan khusus dengan motor, berat badan, serta gaya berkendara Anda.
          </p>
        </div>

        {/* Form and Results Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-5 bg-neutral-950/40 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-neutral-900">
              <div className="p-2.5 bg-red-950/60 border border-red-600/30 rounded-lg text-red-500">
                <Settings2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-tech tracking-wide uppercase">KONFIGURATOR RACIKAN</h3>
                <p className="text-[10px] text-gray-500">Spesifikasikan detail fisik & kebutuhan Anda</p>
              </div>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              
              {/* 1. Brand Dropdown */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                  <Bike className="w-3.5 h-3.5 text-red-500" />
                  1. Merk Motor
                </label>
                <div className="relative">
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value as BrandType)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 text-white rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors"
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* 2. Model Dropdown */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                  <Wrench className="w-3.5 h-3.5 text-red-500" />
                  2. Tipe Motor Matic
                </label>
                <div className="relative">
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 focus:border-red-600 text-white rounded-xl px-4 py-3.5 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors"
                  >
                    {motorModels[selectedBrand]?.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-xs">
                    ▼
                  </div>
                </div>
                {selectedModel && STOCK_ROLLER_WEIGHTS[selectedModel] !== undefined && (
                  <motion.div 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-gray-400 font-mono flex items-center gap-1.5 mt-1 bg-neutral-900/40 px-3 py-1.5 rounded-lg border border-neutral-800/30 w-fit"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                    <span>Roller Standar Pabrik: <strong className="text-yellow-500 font-bold">{STOCK_ROLLER_WEIGHTS[selectedModel]} Gram</strong></span>
                  </motion.div>
                )}
              </div>

              {/* 3. Rider Weight Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                    <User className="w-3.5 h-3.5 text-red-500" />
                    3. Berat Badan Rider
                  </label>
                  <span className="text-sm font-black font-tech text-red-500 bg-red-950/60 px-2.5 py-1 rounded border border-red-900/40">
                    {riderWeight} <span className="text-[10px] font-normal text-gray-400">kg</span>
                  </span>
                </div>
                <div className="relative pt-1">
                  <input
                    type="range"
                    min="40"
                    max="120"
                    value={riderWeight}
                    onChange={(e) => setRiderWeight(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>40 kg</span>
                    <span>80 kg</span>
                    <span>120 kg</span>
                  </div>
                </div>
              </div>

              {/* 4. Need Radio Buttons */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                  <Flame className="w-3.5 h-3.5 text-red-500" />
                  4. Fokus Kebutuhan
                </label>
                <div className="grid grid-cols-1 gap-2.5">
                  {needs.map((n) => {
                    const isSelected = selectedNeed === n.value;
                    return (
                      <label
                        key={n.value}
                        onClick={() => setSelectedNeed(n.value)}
                        className={`group flex items-start gap-3.5 p-3.5 rounded-xl border cursor-pointer transition-all duration-300 ${
                          isSelected 
                            ? 'bg-red-950/20 border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.15)]' 
                            : 'bg-neutral-900/50 border-neutral-800/60 hover:bg-neutral-900 hover:border-neutral-700'
                        }`}
                      >
                        <div className="mt-0.5 text-lg select-none">{n.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold transition-colors ${isSelected ? 'text-red-500' : 'text-gray-200 group-hover:text-white'}`}>
                              {n.label}
                            </span>
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all ${
                              isSelected ? 'border-red-600 bg-red-600' : 'border-neutral-700'
                            }`}>
                              {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1 font-light leading-relaxed">
                            {n.desc}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full relative overflow-hidden group bg-red-600 hover:bg-neutral-100 text-white hover:text-neutral-950 py-4.5 rounded-xl font-tech uppercase text-xs tracking-widest transition-all duration-300 shadow-[0_4px_20px_rgba(220,38,38,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>MENGANALISIS DATA...</span>
                  </>
                ) : (
                  <>
                    <span>HITUNG SETUP TERBAIK</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Right Column: Calculations & Recommendation Output */}
          <div className="lg:col-span-7 h-full flex flex-col justify-stretch">
            <AnimatePresence mode="wait">
              {!showResult && !isCalculating && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-neutral-950/20 border border-neutral-900 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center h-[600px] group hover:border-red-600/20 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center border border-neutral-800 text-neutral-500 group-hover:text-red-500 group-hover:border-red-600/30 transition-all duration-500 mb-6 relative">
                    <div className="absolute inset-0 rounded-full border border-red-600/10 animate-ping" />
                    <Gauge className="w-8 h-8" />
                  </div>
                  <h4 className="text-sm font-tech font-bold text-neutral-400 uppercase tracking-widest">Dashboard Racikan Kosong</h4>
                  <p className="text-xs text-neutral-600 max-w-sm mt-3 font-light leading-relaxed">
                    Pilih merk motor matic Anda, tentukan berat badan, dan atur preferensi gaya berkendara di panel kiri, lalu klik tombol hitung untuk memproses racikan paling joss.
                  </p>
                </motion.div>
              )}

              {isCalculating && (
                <motion.div
                  key="calculating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-neutral-950/40 border border-red-600/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center h-[600px]"
                >
                  {/* Futuristic Scanning Effect */}
                  <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-red-600/20 animate-spin" style={{ animationDuration: '4s' }} />
                    <div className="absolute inset-3 rounded-full border border-dashed border-red-600/40 animate-spin" style={{ animationDuration: '2s' }} />
                    <div className="absolute inset-6 bg-red-950/30 rounded-full flex items-center justify-center border border-red-600/30">
                      <Sparkles className="w-8 h-8 text-red-500 animate-pulse" />
                    </div>
                  </div>
                  
                  <h4 className="text-sm font-tech font-bold text-red-500 uppercase tracking-widest animate-pulse">MEMPROSES TELEMETRI CVT</h4>
                  <div className="w-48 bg-neutral-900 h-1 rounded-full overflow-hidden mt-4 relative">
                    <motion.div 
                      initial={{ left: "-100%" }}
                      animate={{ left: "100%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      className="absolute bg-red-600 h-full w-1/2 rounded-full" 
                    />
                  </div>
                  <p className="text-xs text-neutral-400 max-w-sm mt-4 font-mono">
                    Menganalisis sudut kemiringan katrol, gaya sentrifugal roller, dan regangan pegas CVT...
                  </p>
                </motion.div>
              )}

              {showResult && !isCalculating && recommendation && (
                <motion.div
                  key="result"
                  id="calc-result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-neutral-950/60 border border-red-600/30 rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(220,38,38,0.1)] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 font-mono text-[9px] text-white/5 uppercase select-none font-semibold">
                    Telemetry ID: #PS-{recommendation.brand.slice(0,3).toUpperCase()}-{Math.floor(Math.random() * 9000 + 1000)}
                  </div>

                  {/* Header Result */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-neutral-900 mb-8">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-tech text-red-500 uppercase tracking-wider bg-red-950/50 border border-red-900/30 px-2 py-0.5 rounded">
                          Hasil Rekomendasi
                        </span>
                        <span className="text-[10px] text-neutral-500 font-mono">
                          {recommendation.engineSize}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-black font-tech text-white uppercase tracking-tight">
                        {recommendation.model}
                      </h4>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest block mb-0.5">Fokus Output</span>
                      <span className="text-sm font-extrabold text-white bg-red-600/10 border border-red-600/30 px-3.5 py-1 rounded-full text-center inline-block">
                        {recommendation.need}
                      </span>
                    </div>
                  </div>

                  {/* Main Specifications Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    
                    {/* Stat 1: Sudut Pulley */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 relative group hover:border-red-600/30 transition-colors">
                      <div className="absolute top-3 right-3 text-red-600">
                        <Gauge className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-tech uppercase tracking-wider block mb-1">Sudut Kemiringan Pulley</span>
                      <span className="text-sm sm:text-base font-black font-tech text-white">
                        {recommendation.pulleyAngle}
                      </span>
                      <div className="text-[9px] text-gray-400 mt-2 font-light">
                        Meningkatkan kompresi belt CVT untuk responsivitas akselerasi.
                      </div>
                    </div>

                    {/* Stat 2: Roller Setup */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 relative group hover:border-red-600/30 transition-colors">
                      <div className="absolute top-3 right-3 text-red-600">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-tech uppercase tracking-wider block mb-1">Berat Roller Custom</span>
                      <span className="text-sm sm:text-base font-black font-tech text-white block leading-snug">
                        {recommendation.rollerWeight} <span className="text-xs text-gray-400 font-normal">(6 Butir)</span>
                      </span>
                      <div className="text-[9px] text-gray-400 mt-2 font-light">
                        Ukuran ideal untuk menyalurkan tenaga mesin ke roda belakang tanpa selip.
                      </div>
                      {recommendation.stockWeight !== undefined && (
                        <div className="mt-3 pt-2.5 border-t border-neutral-900/60 flex items-center justify-between text-[11px] font-mono">
                          <span className="text-gray-500 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                            Bawaan Pabrik:
                          </span>
                          <span className="text-gray-300 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                            {recommendation.stockWeight} Gram
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stat 3: Per CVT */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 relative group hover:border-red-600/30 transition-colors">
                      <div className="absolute top-3 right-3 text-red-600">
                        <Flame className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-tech uppercase tracking-wider block mb-1">Kekerasan Per CVT</span>
                      <span className="text-sm sm:text-base font-black font-tech text-white">
                        {recommendation.cvtSpring}
                      </span>
                      <div className="text-[9px] text-gray-400 mt-2 font-light">
                        Mencegah belt slip dan menjaga kestabilan performa saat mesin panas.
                      </div>
                    </div>

                    {/* Stat 4: Per Sentri */}
                    <div className="glass-panel p-4 rounded-xl border border-white/5 relative group hover:border-red-600/30 transition-colors">
                      <div className="absolute top-3 right-3 text-red-600">
                        <Settings2 className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] text-gray-500 font-tech uppercase tracking-wider block mb-1">Per Sentri</span>
                      <span className="text-sm sm:text-base font-black font-tech text-white">
                        {recommendation.clutchSpring}
                      </span>
                      <div className="text-[9px] text-gray-400 mt-2 font-light">
                        Memaksimalkan gigitan kampas kopling ganda ke mangkok kopling.
                      </div>
                    </div>

                  </div>

                  {/* Engineering Commentary Box */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-4.5 mb-8">
                    <div className="flex items-center gap-2.5 mb-2">
                      <Sparkles className="w-4 h-4 text-red-500" />
                      <span className="text-[10px] font-tech text-white font-bold uppercase tracking-wider">Engineering Commentary</span>
                    </div>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      {recommendation.commentary}
                    </p>
                  </div>

                  {/* Performance Indicators (Bento Style) */}
                  <div className="mb-8 space-y-3.5">
                    <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest block mb-2">Proyeksi Peningkatan Performa</span>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Performance Bar 1 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-light">Akselerasi (Putaran Bawah)</span>
                          <span className="text-red-500 font-bold font-tech">{recommendation.accScore}%</span>
                        </div>
                        <div className="bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800/40">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${recommendation.accScore}%` }} 
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-red-800 to-red-600 h-full rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Performance Bar 2 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-light">Top Speed (Nafas Panjang)</span>
                          <span className="text-red-500 font-bold font-tech">{recommendation.topScore}%</span>
                        </div>
                        <div className="bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800/40">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${recommendation.topScore}%` }} 
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-red-800 to-red-600 h-full rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Performance Bar 3 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-light">Torsi Tanjakan & Beban</span>
                          <span className="text-red-500 font-bold font-tech">{recommendation.climbScore}%</span>
                        </div>
                        <div className="bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800/40">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${recommendation.climbScore}%` }} 
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-red-800 to-red-600 h-full rounded-full" 
                          />
                        </div>
                      </div>

                      {/* Performance Bar 4 */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400 font-light">Efisiensi Bahan Bakar</span>
                          <span className="text-red-500 font-bold font-tech">{recommendation.fuelScore}%</span>
                        </div>
                        <div className="bg-neutral-900 h-2 rounded-full overflow-hidden border border-neutral-800/40">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${recommendation.fuelScore}%` }} 
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-gradient-to-r from-red-800 to-red-600 h-full rounded-full" 
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Guaranteed Badge & WhatsApp CTA */}
                  <div className="border-t border-neutral-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-neutral-900 border border-neutral-800 rounded-full text-red-500">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-xs font-semibold text-white block">Garansi Kesetanan</span>
                        <span className="text-[10px] text-gray-500">Kalau setup belum pas, kami siap bantu konsultasi hingga menemukan racikan yang pas.</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          const event = new CustomEvent('apply-recommendation', {
                            detail: {
                              brand: recommendation.brand,
                              model: recommendation.model,
                              pkg: recommendation.need,
                              rollerWeight: recommendation.rollerWeightNum
                            }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 hover:border-neutral-700 font-tech uppercase text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-[0_4px_15px_rgba(0,0,0,0.15)] cursor-pointer hover:scale-[1.02]"
                      >
                        <Settings2 className="w-4 h-4 text-red-500" />
                        <span>TERAPKAN SETUP</span>
                      </button>

                      <a
                        href={getWaLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-neutral-100 text-white hover:text-neutral-950 font-tech uppercase text-xs tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 w-full sm:w-auto shadow-[0_4px_15px_rgba(220,38,38,0.25)] hover:scale-[1.02]"
                      >
                        <span>PESAN VIA WA</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
