import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black pointer-events-none" />
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Speech to Text para qualquer idioma
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80">
            Transcreva sua voz em tempo real com tecnologia do navegador, suporte a múltiplos idiomas e exportação rápida.
          </p>
        </div>
      </div>
    </section>
  );
}
