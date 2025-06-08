import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Bot, Zap, Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section id="inicio" className="flex min-h-screen flex-col items-center justify-center p-8 pt-24">
        <div className="group transition-all duration-500 hover:transform hover:scale-105">
          <Image
            src="/AIGents-logo-no-background.png"
            alt="AIGents Logo"
            width={800}
            height={310}
            priority
            className="group-hover:drop-shadow-[0_0_30px_#F55AFC] transition-all duration-500"
          />
        </div>
        <Link href="/config" className="no-underline">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-[#8c26d5] via-[#E8A5F9] to-[#f6e6c3] text-black font-bold text-[1.2rem] w-[400px] h-[80px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:from-[#8c26d5] hover:to-[#f9ebc9] flex items-center justify-center no-underline hover:shadow-[0_0_25px_#F55AFC] mt-8"
          >
            Configura tu Agente de Prueba
            <ArrowRight className="ml-4 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-32 px-8 relative">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        
        <div className="container mx-auto relative z-10">
          <h2 className="text-5xl font-bold text-center mb-6 text-[#f6e6c3]">
            ¿Qué es AIGents?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-24 max-w-3xl mx-auto leading-relaxed">
            Somos una empresa que automatiza los procesos de <span className="text-[#F55AFC] font-semibold">atención al cliente</span> de tu empresa utilizando <span className="text-[#F55AFC] font-semibold">Inteligencia Artificial Generativa</span>. 
            Garantizamos una <span className="text-[#F55AFC] font-semibold">experiencia de servicio al cliente de alta calidad</span> mientras ahorras tiempo y dinero. 
            Nuestros agentes de IA están diseñados para brindar el <span className="text-[#F55AFC] font-semibold">mejor servicio al cliente, cada vez</span>.
          </p>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-white/5 via-purple-500/5 to-white/5 backdrop-blur-sm border border-white/10 hover:border-[#C75AF6]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#C75AF6]/25 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#C75AF6]/0 to-[#C75AF6]/0 group-hover:from-[#C75AF6]/5 group-hover:to-transparent transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#C75AF6]/20 to-[#C75AF6]/5 group-hover:from-[#C75AF6]/30 group-hover:to-[#C75AF6]/10 transition-all duration-300">
                    <Bot className="h-16 w-16 text-[#C75AF6] group-hover:drop-shadow-[0_0_15px_#C75AF6] transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#f6e6c3] mb-4 group-hover:text-white transition-colors duration-300">
                  Tu Negocio, tu Marca, tu IA
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Implementamos <span className="text-[#F55AFC] font-semibold">agentes especializados</span> en tu negocio, con un enfoque en la <span className="text-[#F55AFC] font-semibold">experiencia de usuario</span>, la <span className="text-[#F55AFC] font-semibold">eficiencia</span> y la <span className="text-[#F55AFC] font-semibold">generación de ventas</span>. Para nosotros, la IA no es un gadget de novedad, es el instrumento que <span className="text-[#F55AFC] font-semibold">catapultará tu negocio</span> brindando una atención al cliente espectacular.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-white/5 via-pink-500/5 to-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F55AFC]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F55AFC]/25 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F55AFC]/0 to-[#F55AFC]/0 group-hover:from-[#F55AFC]/5 group-hover:to-transparent transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#F55AFC]/20 to-[#F55AFC]/5 group-hover:from-[#F55AFC]/30 group-hover:to-[#F55AFC]/10 transition-all duration-300">
                    <Zap className="h-16 w-16 text-[#F55AFC] group-hover:drop-shadow-[0_0_15px_#F55AFC] transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#C75AF6] mb-4 group-hover:text-white transition-colors duration-300">
                  Nuestra propuesta de valor
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  Estamos cansados de ver empresas implementando soluciones de IA que dañan la experiencia de usuario de sus clientes, no generan ventas y empeoran los procesos de atención al cliente.
                  <br /><br />
                  <span className="text-[#F55AFC] font-semibold">AIGents</span> ofrece un sistema de atención al cliente que es: <span className="text-[#F55AFC] font-semibold">consistente en cada etapa del funnel</span>, <span className="text-[#F55AFC] font-semibold">flexible</span> y que es capaz de <span className="text-[#F55AFC] font-semibold">atender a todos y cada uno de tus clientes</span>.
                  <br /><br />
                  <span className="text-[#F55AFC] font-semibold">Responde a todos tus clientes con la misma calidad</span>, atiende cada una de sus dudas y necesidades, y <span className="text-[#F55AFC] font-semibold">genera ventas para tu negocio</span>.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group text-center space-y-6 p-8 rounded-3xl bg-gradient-to-br from-white/5 via-yellow-500/5 to-white/5 backdrop-blur-sm border border-white/10 hover:border-[#f6e6c3]/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#f6e6c3]/25 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#f6e6c3]/0 to-[#f6e6c3]/0 group-hover:from-[#f6e6c3]/5 group-hover:to-transparent transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f6e6c3]/20 to-[#f6e6c3]/5 group-hover:from-[#f6e6c3]/30 group-hover:to-[#f6e6c3]/10 transition-all duration-300">
                    <Shield className="h-16 w-16 text-[#f6e6c3] group-hover:drop-shadow-[0_0_15px_#f6e6c3] transition-all duration-300" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[#f6e6c3] mb-4 group-hover:text-white transition-colors duration-300">
                  Seguro y Confiable
                </h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                  <span className="text-[#F55AFC] font-semibold">Tecnología segura</span> que protege la <span className="text-[#F55AFC] font-semibold">información de tus clientes</span> y 
                  garantiza la <span className="text-[#F55AFC] font-semibold">confidencialidad</span>.
                  <br /><br />
                  <span className="text-[#F55AFC] font-semibold">Infraestructura robusta</span> con <span className="text-[#F55AFC] font-semibold">encriptación de nivel empresarial</span> para mantener tus datos siempre protegidos.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom accent */}
          <div className="flex justify-center mt-20">
            <div className="h-1 w-32 bg-gradient-to-r from-[#C75AF6] via-[#F55AFC] to-[#f6e6c3] rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-32 px-8">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center mb-6 text-[#f6e6c3]">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-24 max-w-3xl mx-auto leading-relaxed">
            Contáctanos y descubre cómo AIGents puede transformar tu atención al cliente
          </p>

          <div className="grid md:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[#f6e6c3]">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-[#C75AF6]" />
                    <span className="text-gray-300">contacto@aigents.uno</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-[#F55AFC]" />
                    <span className="text-gray-300">+52 777 2068414</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-[#f6e6c3]" />
                    <span className="text-gray-300">Ciudad de México, México</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xl font-semibold text-[#f6e6c3]">¿Por qué contactarnos?</h4>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#C75AF6] rounded-full"></div>
                    <span>Demo personalizada gratuita</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#F55AFC] rounded-full"></div>
                    <span>Consultoría sin costo</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#f6e6c3] rounded-full"></div>
                    <span>Implementación rápida</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-[#C75AF6] rounded-full"></div>
                    <span>Soporte técnico especializado</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-8">
        <div className="container mx-auto text-center space-y-4">
          <div className="text-3xl font-bold text-[#f6e6c3]">
            AIGents
          </div>
          <p className="text-gray-300 text-lg">
            Best Customer Service. Every time.
          </p>
          <p className="text-gray-400 text-sm">
            © 2025 AIGents. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
