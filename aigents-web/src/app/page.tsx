import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Image
        src="/AIGents-logo-no-background.png"
        alt="AIGents Logo"
        width={600}
        height={230}
        priority
      />
      <Link
        href="/config"
        className="group relative mt-12 px-10 py-5 overflow-hidden rounded-full bg-gradient-to-r from-[#C75AF6] via-[#F55AFC] to-[#C75AF6] text-white font-bold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95"
        style={{
          boxShadow: '0 0 30px rgba(199, 90, 246, 0.4), 0 0 60px rgba(245, 90, 252, 0.2)',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        }}
      >
        {/* Efecto de brillo animado */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
        
        {/* Borde interior brillante */}
        <div className="absolute inset-0 rounded-full border border-[#F4E48C]/30 pointer-events-none"></div>
        
        {/* Contenido del botón */}
        <span className="relative z-10 flex items-center space-x-4 pl-4">
          <span>Configura tu Agente de Prueba </span>
          <svg 
            className="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-300" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </span>
        
        {/* Partículas decorativas */}
        <div className="absolute -top-1 -left-1 w-3 h-3 bg-[#F4E48C] rounded-full animate-pulse opacity-70"></div>
        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#F4E48C] rounded-full animate-pulse opacity-50 animation-delay-500"></div>
      </Link>
    </main>
  );
}
