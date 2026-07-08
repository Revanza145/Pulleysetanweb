import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Wrench, 
  Layers, 
  ShoppingBag, 
  Sliders, 
  Check, 
  Tag, 
  Flame, 
  Sparkles, 
  Shield, 
  Bike, 
  Info,
  ArrowRight
} from 'lucide-react';
import { PRODUCTS } from '../../constants';

// Define pricing categories based on motorcycle engine size / brand
type MotorCategory = 'small' | 'medium' | 'vespa' | 'maxi';

const MOTOR_MODELS = {
  Honda: [
    { name: 'Beat FI / Deluxe / Street (110cc)', category: 'small' as MotorCategory },
    { name: 'Scoopy / Genio (110cc)', category: 'small' as MotorCategory },
    { name: 'Vario 110 / 125', category: 'small' as MotorCategory },
    { name: 'Vario 150 / PCX 150 / ADV 150', category: 'medium' as MotorCategory },
    { name: 'Vario 160 / PCX 160 / ADV 160', category: 'medium' as MotorCategory },
    { name: 'Stylo 160', category: 'medium' as MotorCategory },
  ],
  Yamaha: [
    { name: 'Mio Sporty / Soul / M3 (115cc - 125cc)', category: 'small' as MotorCategory },
    { name: 'Gear 125 / Freego / Fino', category: 'small' as MotorCategory },
    { name: 'NMAX 155 / Aerox 155 (All Series)', category: 'medium' as MotorCategory },
    { name: 'Lexi 125 / Lexi LX 155', category: 'medium' as MotorCategory },
    { name: 'XMAX 250', category: 'maxi' as MotorCategory },
  ],
  Suzuki: [
    { name: 'Nex II / Address (110cc)', category: 'small' as MotorCategory },
    { name: 'Burgman Street 125 EX', category: 'small' as MotorCategory },
  ],
  Vespa: [
    { name: 'Vespa Sprint / Primavera 150 i-Get', category: 'vespa' as MotorCategory },
    { name: 'Vespa LX 125 / S 125 i-Get', category: 'vespa' as MotorCategory },
    { name: 'Vespa GTS 150 Super', category: 'vespa' as MotorCategory },
    { name: 'Vespa GTS 300 Super Tech', category: 'maxi' as MotorCategory },
  ],
  Piaggio: [
    { name: 'Liberty 125 / Medley 150 i-Get', category: 'vespa' as MotorCategory }
  ]
};

type BrandType = keyof typeof MOTOR_MODELS;

// Detailed pricing mapping
const TIER_PRICING: Record<MotorCategory, {
  bundle: number;
  individual: {
    pulley: number;
    roller: number;
    mangkok: number;
    kampas: number;
    perCvt: number;
    perSentri: number;
  }
}> = {
  small: {
    bundle: 725000,
    individual: {
      pulley: 315000, // Pulley Set
      roller: 85000,
      mangkok: 195000,
      kampas: 215000,
      perCvt: 95000,
      perSentri: 45000
    }
  },
  medium: {
    bundle: 975000,
    individual: {
      pulley: 385000, // Pulley Set
      roller: 105000,
      mangkok: 265000,
      kampas: 295000,
      perCvt: 105000,
      perSentri: 45000
    }
  },
  vespa: {
    bundle: 1995000,
    individual: {
      pulley: 850000, // Pulley Set
      roller: 140000,
      mangkok: 550000,
      kampas: 750000,
      perCvt: 180000,
      perSentri: 70000
    }
  },
  maxi: {
    bundle: 1850000,
    individual: {
      pulley: 785000, // Pulley Set
      roller: 125000,
      mangkok: 495000,
      kampas: 585000,
      perCvt: 145000,
      perSentri: 75000
    }
  }
};

type PackageType = 'Daily Series' | 'Sprint Series' | 'Top Speed Setan' | 'Touring Series' | 'Torque Series';

const PACKAGES: { value: PackageType; label: string; desc: string; icon: string }[] = [
  { value: 'Daily Series', label: 'Paket Daily Series', desc: 'Nyaman, irit, responsif, & minim getaran', icon: '⚡' },
  { value: 'Sprint Series', label: 'Paket Sprint Series', desc: 'Akselerasi jambak spontan sejak putaran bawah', icon: '🔥' },
  { value: 'Top Speed Setan', label: 'Paket Top Speed Setan', desc: 'Nafas atas panjang luar biasa untuk jalan lurus', icon: '🚀' },
  { value: 'Touring Series', label: 'Paket Touring Series', desc: 'Ketahanan suhu ekstrem, torsi tanjakan mumpuni', icon: '🏔️' },
  { value: 'Torque Series', label: 'Paket Torque Series', desc: 'Anti-slip kopling ganda saat melibas beban berat', icon: '👥' },
];

const getBaseRollerWeight = (modelName: string): number => {
  if (!modelName) return 12;
  const name = modelName.toLowerCase();
  if (name.includes('beat') || name.includes('scoopy') || name.includes('genio')) return 12;
  if (name.includes('vario 110') || name.includes('vario 125')) return 15;
  if (name.includes('vario 150') || name.includes('pcx 150') || name.includes('adv 150')) return 18;
  if (name.includes('vario 160') || name.includes('pcx 160') || name.includes('adv 160') || name.includes('stylo 160')) return 20;
  if (name.includes('mio sporty') || name.includes('soul')) return 10;
  if (name.includes('mio m3') || name.includes('gear') || name.includes('freego') || name.includes('fino')) return 12;
  if (name.includes('nmax') || name.includes('aerox')) return 14;
  if (name.includes('lexi')) return 14;
  if (name.includes('xmax')) return 23;
  if (name.includes('nex') || name.includes('address')) return 10;
  if (name.includes('burgman')) return 15;
  if (name.includes('sprint') || name.includes('primavera')) return 15;
  if (name.includes('vespa lx') || name.includes('s 125') || name.includes('gts 150')) return 15;
  if (name.includes('gts 300')) return 18;
  if (name.includes('liberty') || name.includes('medley')) return 15;
  return 12; // fallback
};

const getSuggestedRollerRange = (modelName: string, pkg: PackageType) => {
  const base = getBaseRollerWeight(modelName);
  switch (pkg) {
    case 'Daily Series':
      return { min: base - 1, max: base, label: `${base - 1}g - ${base}g (Nyaman & Irit)` };
    case 'Sprint Series':
      return { min: base - 3, max: base - 2, label: `${base - 3}g - ${base - 2}g (Akselerasi Padat)` };
    case 'Top Speed Setan':
      return { min: base, max: base + 1, label: `${base}g - ${base + 1}g (Nafas Panjang)` };
    case 'Touring Series':
      return { min: base - 2, max: base - 1, label: `${base - 2}g - ${base - 1}g (Torsi Menanjak)` };
    case 'Torque Series':
    default:
      return { min: base - 3, max: base - 2, label: `${base - 3}g - ${base - 2}g (Kuat Beban Berat)` };
  }
};

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'configurator'>('configurator');
  const [selectedBrand, setSelectedBrand] = useState<BrandType>('Honda');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<PackageType>('Sprint Series');
  const [selectedRollerWeight, setSelectedRollerWeight] = useState<number>(12);

  const appliedWeightRef = useRef<number | null>(null);

  // Sync model selection with brand choice
  useEffect(() => {
    if (MOTOR_MODELS[selectedBrand]) {
      setSelectedModel(MOTOR_MODELS[selectedBrand][0].name);
    }
  }, [selectedBrand]);

  // Sync default roller weight when model or package changes
  useEffect(() => {
    if (selectedModel) {
      if (appliedWeightRef.current !== null) {
        setSelectedRollerWeight(appliedWeightRef.current);
        appliedWeightRef.current = null;
      } else {
        const range = getSuggestedRollerRange(selectedModel, selectedPackage);
        setSelectedRollerWeight(range.min);
      }
    }
  }, [selectedModel, selectedPackage]);

  // Listen to apply-recommendation event from calculator above
  useEffect(() => {
    const handleApply = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        const { brand, model, pkg, rollerWeight } = customEvent.detail;
        
        if (rollerWeight !== undefined) {
          appliedWeightRef.current = rollerWeight;
          setSelectedRollerWeight(rollerWeight);
        }
        
        if (brand) setSelectedBrand(brand);
        if (model) setSelectedModel(model);
        if (pkg) setSelectedPackage(pkg);
        setActiveTab('configurator');
        
        // Smooth scroll to configurator section
        setTimeout(() => {
          const element = document.getElementById('products');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('apply-recommendation', handleApply);
    return () => {
      window.removeEventListener('apply-recommendation', handleApply);
    };
  }, []);

  const activeModelObj = MOTOR_MODELS[selectedBrand]?.find(m => m.name === selectedModel);
  const activeCategory: MotorCategory = activeModelObj ? activeModelObj.category : 'small';
  
  // Calculate dynamic pricing based on package selected
  const basePricing = TIER_PRICING[activeCategory];
  const getPackageMultiplier = (pkg: PackageType): number => {
    switch (pkg) {
      case 'Daily Series':
        return 0.88; // 12% cheaper than Sprint Series (sedang)
      case 'Sprint Series':
        return 1.00; // Base (sedang)
      case 'Torque Series':
        return 1.05; // Slightly above Sprint Series (+5%)
      case 'Top Speed Setan':
      case 'Touring Series':
        return 1.15; // Most expensive (+15%)
      default:
        return 1.00;
    }
  };

  const multiplier = getPackageMultiplier(selectedPackage);

  // Helper to round price to nearest Rp 5.000 for a realistic look
  const roundPrice = (price: number): number => {
    return Math.round(price / 5000) * 5000;
  };

  const pricing = {
    bundle: roundPrice(basePricing.bundle * multiplier),
    individual: {
      pulley: roundPrice(basePricing.individual.pulley * multiplier),
      roller: roundPrice(basePricing.individual.roller * multiplier),
      mangkok: roundPrice(basePricing.individual.mangkok * multiplier),
      kampas: roundPrice(basePricing.individual.kampas * multiplier),
      perCvt: roundPrice(basePricing.individual.perCvt * multiplier),
      perSentri: roundPrice(basePricing.individual.perSentri * multiplier),
    }
  };

  const baseWeight = getBaseRollerWeight(selectedModel);
  const rollerWeightOptions = Array.from({ length: 11 }, (_, i) => baseWeight - 5 + i).filter(w => w >= 5 && w <= 25);

  const totalIndividualPrice = 
    pricing.individual.pulley + 
    pricing.individual.roller + 
    pricing.individual.mangkok + 
    pricing.individual.kampas + 
    pricing.individual.perCvt + 
    pricing.individual.perSentri;

  const discountAmount = totalIndividualPrice - pricing.bundle;

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val).replace('IDR', 'Rp');
  };

  // Get dynamic component specifications based on package selected
  const getComponentSpecs = (comp: 'pulley' | 'mangkok' | 'kampas' | 'perCvt' | 'perSentri') => {
    switch (selectedPackage) {
      case 'Daily Series':
        if (comp === 'pulley') return { spec: 'Sudut 13.8° Daily Comfort', detail: 'Transmisi mulus tanpa entakan kasar & meningkatkan sirkulasi udara CVT.' };
        if (comp === 'mangkok') return { spec: 'Kartel Halus Anti-Gredeg', detail: 'Mengurangi vibrasi getar saat stop-and-go.' };
        if (comp === 'kampas') return { spec: 'Carbon Composite Standard', detail: 'Gigitan konsisten untuk komuter harian.' };
        if (comp === 'perCvt') return { spec: '1000 RPM Super Smooth', detail: 'Menjaga mesin tetap irit bensin.' };
        return { spec: '1000 RPM', detail: 'Kopling membuka halus.' };

      case 'Sprint Series':
        if (comp === 'pulley') return { spec: 'Sudut 13.5° Akselerasi Jambak', detail: 'Jalur kerok ekstrim & bubut lightweight aerodynamic untuk roller meluncur instan.' };
        if (comp === 'mangkok') return { spec: 'Kartel Kasar Cross-Cut Anti-Gredeg', detail: 'Permukaan bertekstur memotong gejala slip kopling.' };
        if (comp === 'kampas') return { spec: 'Carbon Kevlar KEV-60 Premium', detail: 'Bahan kampas yang menggigit instan ke mangkok.' };
        if (comp === 'perCvt') return { spec: '1500 RPM Tension Force', detail: 'Menjaga V-belt terjepit maksimal di RPM bawah.' };
        return { spec: '1500 RPM', detail: 'Hentakan responsif saat membuka gas.' };

      case 'Top Speed Setan':
        if (comp === 'pulley') return { spec: 'Sudut 13.8° High Speed Series', detail: 'Dinding pulley lebih tinggi & diamond CNC finish memicu belt terlempar keluar maksimal.' };
        if (comp === 'mangkok') return { spec: 'Honeycomb Light Weight Holes', detail: 'Meringankan beban rotasi kruk as pada RPM tinggi.' };
        if (comp === 'kampas') return { spec: 'Carbon Kevlar Durability Compound', detail: 'Menghindari pemuaian kampas di kecepatan tinggi.' };
        if (comp === 'perCvt') return { spec: '1200 RPM Medium Dynamic', detail: 'Nafas atas motor sangat panjang dan tidak tertahan.' };
        return { spec: '1000 RPM', detail: 'Pelepasan kopling linear untuk top speed stabil.' };

      case 'Touring Series':
        if (comp === 'pulley') return { spec: 'Sudut 13.6° Touring Series', detail: 'Torsi padat saat menanjak & extra cooling fins menjaga suhu belt tetap sejuk.' };
        if (comp === 'mangkok') return { spec: 'Kartel Spiral Combination & Drain Holes', detail: 'Mengevakuasi debu kampas otomatis agar tidak slip.' };
        if (comp === 'kampas') return { spec: 'Carbon Kevlar KEV-60 Heavy Duty', detail: 'Tahan gesek suhu tinggi melibas rute pegunungan.' };
        if (comp === 'perCvt') return { spec: '1500 RPM / 1200 RPM Heat Stable', detail: 'Kekerasan pegas stabil walau mesin disiksa berjam-jam.' };
        return { spec: '1200 RPM', detail: 'Mengurangi entakan kasar namun tetap bertenaga.' };

      case 'Torque Series':
      default:
        if (comp === 'pulley') return { spec: 'Sudut 13.6° Torque Series', detail: 'Jalur padat & CNC solid finish menyalurkan torsi bawah maksimal saat membonceng.' };
        if (comp === 'mangkok') return { spec: 'Kartel Dalam (Deep Knurling) Anti-Selip', detail: 'Mencegah gejala ngempos / kopling selip saat menanjak.' };
        if (comp === 'kampas') return { spec: 'Carbon Kevlar Tebal Anti-Fading', detail: 'Material tebal menyalurkan daya maksimal tanpa loyo.' };
        if (comp === 'perCvt') return { spec: '1500 RPM High Tension', detail: 'Mengangkat rasio puli sekunder instan saat stop-and-go.' };
        return { spec: '1200 RPM', detail: 'Gigitan solid tanpa selip saat membonceng.' };
    }
  };

  const getWaLink = () => {
    const text = `Halo PulleySetan, saya tertarik untuk memesan *PAKET UPGRADE CVT CUSTOM* via website. Berikut adalah racikan pilihan saya:

*DATA MOTOR*
- Merk & Tipe Motor: *${selectedBrand} - ${selectedModel}*
- Kategori Unit: *${activeCategory.toUpperCase()}*

*PILIHAN PAKET UPGRADE*
- Konsep Paket: *${selectedPackage.toUpperCase()}*

*DETAIL SPESIFIKASI BAGIAN CVT*
1. Pulley Setan (Sudah Include Rumah Roller & Kipas Custom): *${getComponentSpecs('pulley').spec}*
2. Roller Racing: *Pilihan ${selectedRollerWeight} Gram (Rekomendasi: ${getSuggestedRollerRange(selectedModel, selectedPackage).label})*
3. Mangkok Ganda: *${getComponentSpecs('mangkok').spec}*
4. Kampas Ganda: *${getComponentSpecs('kampas').spec}*
5. Per CVT: *${getComponentSpecs('perCvt').spec}*
6. Per Sentri: *${getComponentSpecs('perSentri').spec}*

*RINCIAN HARGA*
- Harga Eceran Total: ~${formatRupiah(totalIndividualPrice)}~
- *Harga Promo Paket Bundle*: *${formatRupiah(pricing.bundle)}* (Hemat ${formatRupiah(discountAmount)}!)

Mohon infokan slot ketersediaan barang dan cara transaksi pemesanannya. Terima kasih!`;
    return `https://wa.me/6287777920321?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="products" className="py-20 sm:py-32 bg-neutral-950 border-t border-neutral-900 relative">
      {/* Background ambient red glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.03)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 sm:px-10">
        
        {/* Section Header with Dual Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <span className="text-red-500 font-tech tracking-[0.4em] text-[9px] sm:text-[10px] uppercase mb-4 block">
              CHOOSE YOUR PERFORMANCE UPGRADE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black italic text-white tracking-tighter uppercase leading-[0.9]">
              UPGRADE <span className="red-gradient-text">CVT SETAN.</span>
            </h2>
            <p className="mt-4 text-neutral-400 text-xs sm:text-sm font-light max-w-lg leading-relaxed">
              Dua alternatif cara belanja: Pilih produk eceran legendaris kami secara manual, atau gunakan configurator pintar kami untuk menyusun paket CVT lengkap custom penakluk jalanan!
            </p>
          </div>

          {/* High-tech Selector Tabs */}
          <div className="flex items-center gap-2.5 p-1 bg-neutral-900/80 border border-neutral-800 rounded-xl self-start lg:self-auto backdrop-blur-md">
            <button
              onClick={() => setActiveTab('configurator')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[10px] sm:text-xs font-tech tracking-wider uppercase font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'configurator' 
                  ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.25)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Sliders size={14} />
              Konfigurator Paket CVT
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-[10px] sm:text-xs font-tech tracking-wider uppercase font-bold transition-all duration-300 cursor-pointer ${
                activeTab === 'catalog' 
                  ? 'bg-red-600 text-white shadow-[0_2px_10px_rgba(220,38,38,0.25)]' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingBag size={14} />
              Katalog Produk Utama
            </button>
          </div>
        </div>

        {/* Tab 1: CURATED PRODUCT CATALOG */}
        <AnimatePresence mode="wait">
          {activeTab === 'catalog' && (
            <motion.div
              key="catalog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12"
            >
              {PRODUCTS.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative flex flex-col h-full bg-neutral-950/20 border border-neutral-900 rounded-2xl overflow-hidden p-4 hover:border-red-600/20 transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                >
                  <div className="aspect-[4/5] relative overflow-hidden bg-white/[0.02] border border-white/5 mb-8 rounded-xl">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-55 group-hover:opacity-100 grayscale hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                    
                    {/* Product spec tag */}
                    <div className="absolute top-5 right-5 glass-panel px-3 py-1 rounded text-[8px] font-tech text-white/60 tracking-widest uppercase">
                      CNC MACHINED
                    </div>
                  </div>

                  <div className="relative flex flex-col flex-1 px-2 pb-4">
                    <h3 className="text-lg font-tech text-white tracking-tighter mb-4 group-hover:text-red-500 transition-colors flex items-start justify-between">
                      {product.name}
                      <span className="text-[10px] opacity-20 ml-2">#{product.id}</span>
                    </h3>
                    <p className="text-neutral-500 text-xs mb-8 leading-relaxed font-light">
                      {product.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
                      {product.specs?.map((spec) => (
                        <div key={spec} className="flex items-center gap-2 text-[9px] text-white/30 font-tech tracking-widest uppercase">
                          <div className="w-[3px] h-[3px] bg-red-600 rounded-full" />
                          {spec.split(': ')[1] || spec}
                        </div>
                      ))}
                    </div>

                    <div className="accent-line w-0 group-hover:w-full transition-all duration-500 mt-auto" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Tab 2: INTERACTIVE CVT CONFIGURATOR */}
          {activeTab === 'configurator' && (
            <motion.div
              key="configurator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Left Configuration Panel */}
              <div className="lg:col-span-4 bg-neutral-900/30 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/[0.02] rounded-full blur-3xl pointer-events-none" />
                
                <div className="space-y-6">
                  {/* Selector Header */}
                  <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                    <div className="p-2 bg-red-950/60 border border-red-600/30 rounded-lg text-red-500">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white font-tech tracking-wider uppercase">KONFIGURATOR PAKET</h4>
                      <p className="text-[10px] text-gray-500 font-mono">Customize Your Setup & Pricing</p>
                    </div>
                  </div>

                  {/* 1. Brand Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                      <Bike className="w-3.5 h-3.5 text-red-500" />
                      1. Pilih Merk Motor
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(Object.keys(MOTOR_MODELS) as BrandType[]).map((brand) => (
                        <button
                          key={brand}
                          onClick={() => setSelectedBrand(brand)}
                          className={`py-2 px-1 rounded-xl text-[10px] font-tech font-bold uppercase tracking-wider border text-center transition-all duration-300 cursor-pointer ${
                            selectedBrand === brand
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                          }`}
                        >
                          {brand}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Model Dropdown */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                      <Wrench className="w-3.5 h-3.5 text-red-500" />
                      2. Pilih Tipe Motor
                    </label>
                    <div className="relative">
                      <select
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 focus:border-red-600 text-white rounded-xl px-4 py-3 text-xs appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-red-600 transition-colors font-sans"
                      >
                        {MOTOR_MODELS[selectedBrand]?.map((m) => (
                          <option key={m.name} value={m.name} className="bg-neutral-950 text-white font-sans text-xs">
                            {m.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500 text-[10px]">
                        ▼
                      </div>
                    </div>
                  </div>

                  {/* 3. Package Concept Selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      3. Pilih Konsep Upgrade
                    </label>
                    <div className="space-y-2">
                      {PACKAGES.map((pkg) => {
                        const isSelected = selectedPackage === pkg.value;
                        return (
                          <button
                            key={pkg.value}
                            onClick={() => setSelectedPackage(pkg.value)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                              isSelected 
                                ? 'bg-red-950/20 border-red-600/60 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                                : 'bg-neutral-950/60 border-neutral-800/80 hover:bg-neutral-900/40 hover:border-neutral-700'
                            }`}
                          >
                            <span className="text-sm select-none mt-0.5">{pkg.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-bold font-tech tracking-wide uppercase ${isSelected ? 'text-red-500' : 'text-gray-200'}`}>
                                  {pkg.label}
                                </span>
                                <div className={`w-3 h-3 rounded-full border flex items-center justify-center ${isSelected ? 'border-red-600 bg-red-600' : 'border-neutral-700'}`}>
                                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                                </div>
                              </div>
                              <p className="text-[9px] text-gray-500 mt-0.5 leading-snug">
                                {pkg.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 4. Roller Weight Custom Selector */}
                  <div className="space-y-2 pt-2 border-t border-neutral-800/60">
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 font-tech uppercase tracking-wide">
                        <Sliders className="w-3.5 h-3.5 text-red-500" />
                        4. Pilih Ukuran Roller (Gram)
                      </label>
                      <span className="text-[9px] text-gray-500 font-mono">Standar: {getBaseRollerWeight(selectedModel)}g</span>
                    </div>
                    
                    <div className="bg-neutral-950/80 border border-neutral-900 rounded-xl p-3">
                      <div className="flex items-center justify-between mb-2 pb-2 border-b border-neutral-900">
                        <span className="text-[9px] text-neutral-400 font-tech uppercase">Rekomendasi Paket:</span>
                        <span className="text-[10px] text-red-500 font-mono font-bold">
                          {getSuggestedRollerRange(selectedModel, selectedPackage).label}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 justify-center py-1">
                        {rollerWeightOptions.map((weight) => {
                          const range = getSuggestedRollerRange(selectedModel, selectedPackage);
                          const isRecommended = weight >= range.min && weight <= range.max;
                          const isSelected = selectedRollerWeight === weight;
                          return (
                            <button
                              key={weight}
                              onClick={() => setSelectedRollerWeight(weight)}
                              className={`w-10 h-8 rounded-lg text-xs font-mono font-bold flex flex-col items-center justify-center relative transition-all duration-300 cursor-pointer ${
                                isSelected
                                  ? 'bg-red-600 text-white border border-red-600 shadow-[0_0_8px_rgba(220,38,38,0.3)]'
                                  : isRecommended
                                  ? 'bg-red-950/20 border border-red-950/40 text-red-400 hover:bg-red-950/40 hover:text-red-300'
                                  : 'bg-neutral-900 border border-neutral-800 text-neutral-500 hover:text-neutral-300 hover:border-neutral-700'
                              }`}
                            >
                              <span>{weight}g</span>
                              {isRecommended && !isSelected && (
                                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full" title="Rekomendasi" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-[8px] text-neutral-500 mt-2 text-center">
                        *Titik merah menandakan berat roller yang paling ideal untuk konsep paket terpilih.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Left Side Quick Info */}
                <div className="mt-8 pt-4 border-t border-neutral-800/60 flex items-center gap-3">
                  <div className="p-2 rounded bg-neutral-950 text-red-500">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-white font-tech block uppercase tracking-wider">Garansi Kesetanan</span>
                    <span className="text-[9px] text-neutral-500 leading-none">Kalau setup belum pas, kami siap bantu konsultasi hingga menemukan racikan yang pas.</span>
                  </div>
                </div>
              </div>

              {/* Right Output & Breakdown Panel */}
              <div className="lg:col-span-8 flex flex-col justify-between bg-neutral-900/10 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.3)] relative">
                
                {/* Visual Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-900 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[9px] font-tech font-bold text-red-500 uppercase tracking-widest bg-red-950/50 border border-red-900/30 px-2 py-0.5 rounded">
                        REKOMENDASI PRODUK
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono uppercase">
                        Sangat Presisi (Plug & Play)
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black italic uppercase text-white font-tech tracking-tighter leading-none">
                      {selectedBrand} {selectedModel.split(' (')[0]}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[9px] text-neutral-500 font-tech uppercase block tracking-wider">PAKET KHUSUS</span>
                    <span className="text-xs font-black font-tech text-white tracking-widest uppercase bg-red-600/10 border border-red-600/30 px-3 py-1 rounded">
                      {selectedPackage}
                    </span>
                  </div>
                </div>

                {/* 6 Parts List Breakdown */}
                <div className="mb-8 space-y-3">
                  <span className="text-[9px] text-neutral-500 font-tech uppercase tracking-widest block mb-1">Daftar Komponen & Settingan Custom:</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Part 1: Pulley Setan */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Wrench size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">
                            1. Pulley Setan Custom (Include Rumah Roller & Kipas)
                          </span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.pulley)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          {getComponentSpecs('pulley').spec}
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {getComponentSpecs('pulley').detail}
                        </p>
                      </div>
                    </div>

                    {/* Part 2: Roller Custom */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Layers size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">
                            2. Roller Racing
                          </span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.roller)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          Berat Pilihan: {selectedRollerWeight} Gram
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          Roller custom presisi tinggi (pilihan {selectedRollerWeight}g) sudah terpasang rapi di dalam rumah pulley custom.
                        </p>
                      </div>
                    </div>

                    {/* Part 3: Mangkok Ganda */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Sliders size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">3. Mangkok Ganda Custom</span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.mangkok)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          {getComponentSpecs('mangkok').spec}
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {getComponentSpecs('mangkok').detail}
                        </p>
                      </div>
                    </div>

                    {/* Part 4: Kampas Ganda */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Shield size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">4. Kampas Ganda Racing</span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.kampas)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          {getComponentSpecs('kampas').spec}
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {getComponentSpecs('kampas').detail}
                        </p>
                      </div>
                    </div>

                    {/* Part 5: Per CVT */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Flame size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">5. Per CVT Racing</span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.perCvt)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          {getComponentSpecs('perCvt').spec}
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {getComponentSpecs('perCvt').detail}
                        </p>
                      </div>
                    </div>

                    {/* Part 6: Per Sentri */}
                    <div className="bg-neutral-950/60 border border-neutral-800/60 p-3 rounded-xl flex items-start gap-3 relative hover:border-red-600/20 transition-all">
                      <div className="text-red-500 mt-1">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-tech font-bold text-white uppercase tracking-wider">6. Per Sentri Racing</span>
                          <span className="text-[10px] font-mono text-red-500 font-semibold">{formatRupiah(pricing.individual.perSentri)}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 font-semibold font-mono text-red-400">
                          {getComponentSpecs('perSentri').spec}
                        </p>
                        <p className="text-[9px] text-gray-500 mt-0.5">
                          {getComponentSpecs('perSentri').detail}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Price Summary & WhatsApp Checkout */}
                <div className="pt-6 border-t border-neutral-900 bg-neutral-950/40 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    {/* Ecer price mapping */}
                    <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest block mb-0.5">ESTIMASI BIAYA UPGRADE:</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-neutral-500 line-through font-mono">
                        {formatRupiah(totalIndividualPrice)}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black font-tech text-white leading-none tracking-tight">
                        {formatRupiah(pricing.bundle)}
                      </span>
                      <span className="text-[10px] font-tech text-green-500 bg-green-950/40 border border-green-900/30 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        SAVE {formatRupiah(discountAmount)}
                      </span>
                    </div>
                    <div className="text-[9px] text-neutral-400 font-light mt-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Harga di atas sudah termasuk jasa pasang / ongkos kirim.
                    </div>
                  </div>

                  <a
                    href={getWaLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-neutral-100 text-white hover:text-neutral-950 font-tech uppercase text-[10px] sm:text-xs font-bold tracking-widest py-4 px-8 rounded-xl transition-all duration-300 w-full md:w-auto shadow-[0_4px_20px_rgba(220,38,38,0.3)] hover:scale-[1.02]"
                  >
                    <span>AMBIL PROMO CVT VIA WA</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Single Main CTA Button (Show only on catalog tab as active tab already has customized checkout) */}
        {activeTab === 'catalog' && (
          <div className="mt-16 sm:mt-24 flex justify-center">
            <motion.a
              href="https://wa.me/6287777920321?text=Halo%20PulleySetan%2C%20saya%20tertarik%20untuk%20konsultasi%20dan%20memesan%20produk%20upgrade%20CVT.%20Bisa%20dibantu%3F"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white transition-all duration-300 text-[10px] sm:text-xs font-tech font-bold uppercase tracking-[0.2em] py-4 px-10 border border-red-600/30 hover:border-red-600"
            >
              PESAN & KONSULTASI SEKARANG VIA WHATSAPP
            </motion.a>
          </div>
        )}

      </div>
    </section>
  );
}

