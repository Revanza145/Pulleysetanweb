import { NAV_LINKS } from '../../constants';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-neutral-950 border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-10 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-black tracking-tighter italic text-red-600 uppercase">PULLEYSETAN</span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-sm font-light">
              Spesialis upgrade CVT motor matic dengan riset mendalam untuk 
              menghasilkan performa akselerasi terbaik dan daya tahan optimal.
            </p>
            <div className="flex items-center gap-6">
              {[
                {
                  name: 'WhatsApp',
                  href: 'https://wa.me/6287777920321',
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.705 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  )
                },
                {
                  name: 'Instagram',
                  href: 'https://www.instagram.com/pulleysetanbyshiijull?igsh=dXI1enN4Y3FqYXk3&utm_source=qr',
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                {
                  name: 'TikTok',
                  href: 'https://www.tiktok.com/@shiijull?_r=1&_t=ZS-97iyUrbnQKV',
                  icon: (
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.17 1.13 1.2 2.72 1.89 4.38 2.01v3.91c-1.32-.01-2.61-.41-3.7-1.15-.8-.54-1.44-1.29-1.88-2.17v5.8c0 1.23-.23 2.45-.69 3.59-.87 2.1-2.73 3.65-4.98 4.09-1.49.3-3.04.14-4.44-.45-2.01-.84-3.48-2.69-3.87-4.83-.43-2.28.32-4.64 1.95-6.22 1.58-1.55 3.86-2.22 6.07-1.74V12.4c-1.12-.29-2.34-.05-3.26.68-.86.68-1.31 1.77-1.21 2.87.1 1.21.84 2.27 1.93 2.76 1.01.46 2.23.28 3.06-.47.53-.48.81-1.17.81-1.88V.02z" />
                    </svg>
                  )
                }
              ].map((item, i) => (
                <div key={i} className="relative group flex items-center justify-center">
                  <a 
                    href={item.href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white/20 hover:text-red-600 transition-colors py-2"
                  >
                    {item.icon}
                  </a>
                  {/* Tooltip */}
                  <span className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 pointer-events-none bg-red-600 text-[10px] text-white font-tech tracking-wider px-2 py-1 rounded transition-opacity duration-200 uppercase whitespace-nowrap z-50">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
             <h4 className="text-[10px] font-tech tracking-[0.3em] text-red-500 uppercase mb-8">
              Navigation
            </h4>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-neutral-500 hover:text-white text-[10px] font-tech transition-colors uppercase">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-tech tracking-[0.3em] text-red-500 uppercase mb-8">
              Inquiries
            </h4>
            <ul className="space-y-4">
               <li className="flex flex-col">
                  <span className="text-[10px] text-white/20 font-tech uppercase tracking-widest mb-1">Email</span>
                  <span className="text-neutral-400 text-xs font-light">info@pulleysetan.com</span>
               </li>
               <li className="flex flex-col">
                  <span className="text-[10px] text-white/20 font-tech uppercase tracking-widest mb-1">Phone / WhatsApp</span>
                  <a 
                     href="https://wa.me/6287777920321" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     className="text-neutral-400 hover:text-red-500 text-xs font-light transition-colors"
                  >
                     +62 877-7792-0321
                  </a>
               </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Stats Grid Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 bg-black border-t border-white/10">
        <div className="p-8 border-r border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black font-tech tracking-tighter text-white">1.24<span className="text-xs text-red-600 ml-1 uppercase">KG</span></span>
            <span className="text-[9px] uppercase text-white/30 tracking-widest mt-2 font-tech">Ultra Light Weight</span>
        </div>
        <div className="p-8 md:border-r border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black font-tech tracking-tighter text-white">400<span className="text-xs text-red-600 ml-1 uppercase">°C</span></span>
            <span className="text-[9px] uppercase text-white/30 tracking-widest mt-2 font-tech">Thermal Resistance</span>
        </div>
        <div className="p-8 border-r border-white/10 flex flex-col items-center">
            <span className="text-2xl font-black font-tech tracking-tighter text-white">ISO<span className="text-xs text-red-600 ml-1 uppercase">9001</span></span>
            <span className="text-[9px] uppercase text-white/30 tracking-widest mt-2 font-tech">Quality Control</span>
        </div>
        <div className="p-8 bg-red-600 flex flex-col items-center">
            <span className="text-2xl font-black font-tech tracking-tighter text-white">RACING</span>
            <span className="text-[9px] uppercase text-white/90 tracking-widest mt-2 font-tech">Daily Use Grade</span>
        </div>
      </div>
      <div className="py-4 text-center border-t border-white/5">
        <p className="text-[9px] text-white/20 font-tech uppercase tracking-widest">
          © 2026 PULLEYSETAN BYSHIJULL. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  );
}
