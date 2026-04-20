export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#080808] flex items-center pt-16">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="max-w-3xl">
          {/* Label tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00D4FF]/10 border border-[#00D4FF]/30 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-[#00D4FF] rounded-full" />
            <span className="text-xs font-medium tracking-[0.15em] text-[#00D4FF] uppercase">
              Premium Vaping
            </span>
          </div>

          {/* Main headline - clean, large */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.1]">
            <span className="block">THE FUTURE OF</span>
            <span className="block text-[#00D4FF]">VAPING</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg text-[#444444] max-w-xl leading-relaxed">
            Discover our curated collection of premium vaping equipment. 
            Quality devices, authentic flavors, exceptional experience.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#categorias"
              className="px-8 py-3.5 bg-[#00D4FF] text-black text-sm font-semibold uppercase tracking-[0.1em] rounded-md hover:bg-[#00D4FF]/90 transition-colors duration-200"
            >
              EXPLORE COLLECTION
            </a>
            <a
              href="#featured"
              className="px-8 py-3.5 bg-transparent text-white text-sm font-semibold uppercase tracking-[0.1em] border border-white/20 rounded-md hover:border-white/40 hover:bg-white/5 transition-all duration-200"
            >
              VIEW BESTSELLERS
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex items-center gap-12">
            <div>
              <span className="block text-2xl font-semibold text-white">500+</span>
              <span className="text-xs tracking-[0.1em] text-[#444444] uppercase">Products</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold text-white">50+</span>
              <span className="text-xs tracking-[0.1em] text-[#444444] uppercase">Brands</span>
            </div>
            <div>
              <span className="block text-2xl font-semibold text-white">24/7</span>
              <span className="text-xs tracking-[0.1em] text-[#444444] uppercase">Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
