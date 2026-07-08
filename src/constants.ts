import { NavItem, Product, NewsItem, Feature } from './types';

export const NAV_LINKS: NavItem[] = [
  { label: 'HOME', href: '/' },
  { label: 'REKOMENDASI SETUP', href: '#rekomendasi-setup' },
  { label: 'PRODUCTS', href: '#products' },
  { label: 'PERFORMANCE', href: '#tech' },
  { label: 'COMMUNITY', href: '#news' },
  { label: 'ABOUT', href: '#about' },
  { label: 'HUBUNGI KAMI', href: '#contact' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'Product',
    name: 'PULLEY SETAN ',
    category: 'Full Set',
    image: '/assets/image/pulley_product.jpg',
    description: 'Upgrade CVT total untuk akselerasi "Jambak" sejak putaran bawah hingga top speed.',
    specs: ['Bubut Derajat 13.6 Custom', 'Jalur Roller Custom Precision', 'Genuine OEM Material'],
  },
  {
    id: 'Detail',
    name: 'KIPAS PULLEY CUSTOM',
    category: 'Individual',
    image: '/assets/image/kipas_custom.jpg',
    description: 'Kipas pulley yang sudah dibubut derajat presisi untuk menjaga suhu dan nafas motor.',
    specs: ['Diamond Surface Cut', 'Aerodynamic Fins', 'Anti-Fade Coating'],
  },
  {
    id: 'PKT-CVT',
    name: 'PAKET UPGRADE CVT',
    category: 'Bundle',
    image: '/assets/image/paket_cvt_custom.jpg',
    description: 'Kombinasi Pulley Setan, Roller, dan Per CVT khusus untuk performa harian rasa balap.',
    specs: ['Plug and Play', 'Free Konsultasi Setting', 'All Matic Brands Compatible'],
  },
];

export const NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Touring Lintas Jawa: Ekspedisi Ketahanan 1.500 KM',
    date: '2026.12.01',
    category: 'ROAD ADVENTURE',
    image: '/assets/image/touring_lintas_jawa.jpg',
    excerpt: 'Membuktikan durabilitas ekstrim PulleySetan melintasi rute pegunungan terjal dan suhu ekstrem tanpa gejala overheat sedikit pun.',
  },
  {
    id: 'n2',
    title: 'Uji Dyno & Siksaan Macet Harian Ibu Kota',
    date: '2026.11.20',
    category: 'STREET PROOF',
    image: '/assets/image/dyno_test_proof.jpg',
    excerpt: 'Grafik akselerasi teruji konstan pada mesin Dyno dengan kenaikan torsi instan, serta teruji tangguh dalam kemacetan ekstrem stop-and-go.',
  },
];

export const FEATURES: Feature[] = [
  {
    title: 'AKSELERASI JAMBAK',
    description: 'Modifikasi jalur roller yang lebih landai dan panjang memberikan dorongan instan saat gas dibuka.',
    icon: 'Zap',
  },
  {
    title: 'PRECISION CNC',
    description: 'Dikerjakan dengan mesin CNC untuk mendapatkan derajat kemiringan yang akurat hingga 0.01mm.',
    icon: 'Cpu',
  },
  {
    title: 'TERMAL STABIL',
    description: 'Material khusus yang cepat melepas panas, mencegah slip saat mesin dalam suhu tinggi.',
    icon: 'Shield',
  },
];
