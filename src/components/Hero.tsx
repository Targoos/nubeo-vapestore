export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center pt-20">
      {/* Subtle grid lines - very minimal */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px)`,
            backgroundSize: "120px 100%",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
        {/* Main headline - stacked, massive */}
        <h1 className="text-[clamp(4rem,18vw,14rem)] font-black tracking-[-0.06em] text-white uppercase leading-[0.85]">
          <span className="block">VAPES</span>
          <span className="block text-[#FF2020]">BOLD</span>
          <span className="block">RAW</span>
        </h1>

        {/* Minimal subtext */}
        <p className="mt-12 text-sm tracking-[0.3em] text-neutral-500 uppercase font-medium max-w-md">
          Premium vaping equipment. No compromises.
        </p>

        {/* CTA Buttons - thick borders, hard shadows */}
        <div className="mt-16 flex flex-col sm:flex-row items-start gap-4">
          <a
            href="#categorias"
            className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-[0.15em] border-3 border-white shadow-[5px_5px_0px_0px_#FF2020] hover:shadow-none hover:translate-x-[5px] hover:translate-y-[5px] transition-all duration-100"
          >
            SHOP NOW
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-transparent text-white text-sm font-black uppercase tracking-[0.15em] border-3 border-white hover:bg-white hover:text-black transition-all duration-100"
          >
            LEARN MORE
          </a>
        </div>
      </div>

      {/* Single accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#FF2020]" />
    </section>
  );
}
