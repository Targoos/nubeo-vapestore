export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden pt-20">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Accent decorative elements */}
      <div className="absolute top-32 left-8 w-24 h-24 bg-[#FFE600] border-4 border-black rotate-12 hidden lg:block" />
      <div className="absolute bottom-32 right-12 w-16 h-16 bg-[#00FF94] border-4 border-black -rotate-6 hidden lg:block" />
      <div className="absolute top-1/2 right-1/4 w-8 h-32 bg-white border-4 border-black rotate-45 hidden xl:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main headline */}
        <h1 className="text-6xl sm:text-8xl lg:text-[10rem] font-black tracking-tighter text-white uppercase leading-none">
          <span className="block">VAPES.</span>
          <span className="block text-[#FFE600]">BOLD.</span>
          <span className="block">RAW.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-8 text-lg sm:text-xl text-gray-400 font-mono uppercase tracking-widest max-w-2xl mx-auto">
          El mejor equipo de vapeo. Sin filtros. Sin compromiso.
        </p>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#categorias"
            className="px-8 py-4 bg-[#FFE600] text-black text-lg font-black uppercase tracking-wide border-4 border-black shadow-[6px_6px_0px_0px_#fff] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-150"
          >
            VER PRODUCTOS
          </a>
          <a
            href="#about"
            className="px-8 py-4 bg-transparent text-white text-lg font-black uppercase tracking-wide border-4 border-white shadow-[6px_6px_0px_0px_#FFE600] hover:shadow-none hover:translate-x-1.5 hover:translate-y-1.5 transition-all duration-150"
          >
            NOSOTROS
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-widest text-gray-500">
            SCROLL
          </span>
          <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
