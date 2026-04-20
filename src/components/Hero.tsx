import { useEffect, useRef, useState } from "react";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#080808] flex items-center pt-16">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Label tag */}
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-3 py-1 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
            <span className="text-xs font-medium tracking-[0.15em] text-[#00D4FF] uppercase">
              Vapeo Premium
            </span>
          </div>

          {/* Main headline - clean, large */}
          <h1 className="animate-fade-in-up delay-100 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
            <span className="block">EL FUTURO DEL</span>
            <span className="block text-[#00D4FF]">VAPEO</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-in-up delay-200 mt-6 text-lg text-[#444444] max-w-xl leading-relaxed">
            Descubre nuestra colección de equipos de vapeo premium. 
            Dispositivos de calidad, sabores auténticos, experiencia excepcional.
          </p>

          {/* CTA Buttons */}
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#categorias"
              className="px-8 py-3.5 bg-[#00D4FF] text-black text-sm font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors duration-200"
            >
              VER COLECCIÓN
            </a>
            <a
              href="#featured"
              className="px-8 py-3.5 bg-transparent text-white text-sm font-semibold uppercase tracking-[0.1em] border border-white/20 rounded-md hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              VER MÁS VENDIDOS
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-in-up delay-400 mt-16 pt-8 border-t border-[#1a1a1a] flex items-center gap-12">
            <CountUpStat value={500} suffix="+" label="Productos" />
            <CountUpStat value={50} suffix="+" label="Marcas" />
            <StaticStat value="24/7" label="Soporte" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1500;
          const steps = 60;
          const stepDuration = duration / steps;
          let currentStep = 0;

          const timer = setInterval(() => {
            currentStep++;
            const progress = currentStep / steps;
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * value));

            if (currentStep >= steps) {
              clearInterval(timer);
              setCount(value);
            }
          }, stepDuration);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <span className="block text-2xl font-semibold text-white">
        {count}{suffix}
      </span>
      <span className="text-xs tracking-[0.1em] text-[#444444] uppercase">{label}</span>
    </div>
  );
}

function StaticStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <span className="block text-2xl font-semibold text-white">{value}</span>
      <span className="text-xs tracking-[0.1em] text-[#444444] uppercase">{label}</span>
    </div>
  );
}
