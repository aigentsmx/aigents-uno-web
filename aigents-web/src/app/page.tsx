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
      {/* Header/Navigation */}
      <header className="fixed top-0 w-full bg-[#091442]/90 backdrop-blur-md z-50">
        <nav className="container mx-auto px-6 py-6 flex justify-between items-center h-20">
          <div className="text-3xl font-bold text-[#9c38e6]">
            AIGents
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-gray-300 hover:text-[#f6e6c3] transition-colors text-lg">Inicio</a>
            <a href="#servicios" className="text-gray-300 hover:text-[#f6e6c3] transition-colors text-lg">Servicios</a>
            <a href="#contacto" className="text-gray-300 hover:text-[#f6e6c3] transition-colors text-lg">Contacto</a>
          </div>
          <Link href="/config">
            <Button className="bg-gradient-to-r from-[#8c26d5] to-[#f6e6c3] text-black hover:scale-100 transition-transform px-6 py-3 text-lg font-semibold">
              Configurar
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="flex min-h-screen flex-col items-center justify-center p-8 pt-24">
        <Image
          src="/AIGents-logo-no-background.png"
          alt="AIGents Logo"
          width={800}
          height={310}
          priority
        />
        <Link href="/config" className="no-underline">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-[#8c26d5] via-[#E8A5F9] to-[#f6e6c3] text-black font-bold text-[1.2rem] w-[400px] h-[80px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:from-[#8c26d5] hover:to-[#f9ebc9] flex items-center justify-center no-underline hover:shadow-[0_0_25px_#F55AFC]"
          >
            Configura tu Agente de Prueba
            <ArrowRight className="ml-4 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section id="servicios" className="py-32 px-8">
        <div className="container mx-auto">
          <h2 className="text-5xl font-bold text-center mb-6 text-[#f6e6c3]">
            ¿Por qué elegir AIGents?
          </h2>
          <p className="text-xl text-gray-300 text-center mb-24 max-w-3xl mx-auto leading-relaxed">
            Nuestros agentes de IA están diseñados para brindar el mejor servicio al cliente, cada vez.
          </p>
          
          <div className="grid md:grid-cols-3 gap-16 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center">
                <Bot className="h-16 w-16 text-[#C75AF6]" />
              </div>
              <h3 className="text-2xl font-bold text-[#f6e6c3]">IA Avanzada</h3>
              <p className="text-gray-300 leading-relaxed">
                Agentes inteligentes que aprenden y mejoran continuamente para brindar 
                respuestas precisas y personalizadas.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center">
                <Zap className="h-16 w-16 text-[#F55AFC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#f6e6c3]">Respuesta Instantánea</h3>
              <p className="text-gray-300 leading-relaxed">
                Atención 24/7 con respuestas inmediatas. Tus clientes nunca tendrán 
                que esperar por ayuda.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center space-y-6 p-8 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              <div className="flex justify-center">
                <Shield className="h-16 w-16 text-[#f6e6c3]" />
              </div>
              <h3 className="text-2xl font-bold text-[#f6e6c3]">Seguro y Confiable</h3>
              <p className="text-gray-300 leading-relaxed">
                Tecnología segura que protege la información de tus clientes y 
                garantiza la confidencialidad.
              </p>
            </div>
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
            {/* Contact Form */}
            <div className="space-y-8 p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#f6e6c3]">Envíanos un mensaje</h3>
                <p className="text-gray-300">
                  Completa el formulario y nos pondremos en contacto contigo
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre" className="text-gray-300">Nombre</Label>
                    <Input 
                      id="nombre" 
                      placeholder="Tu nombre" 
                      className="bg-white/10 text-white placeholder:text-gray-400 focus:border-[#f6e6c3]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa" className="text-gray-300">Empresa</Label>
                    <Input 
                      id="empresa" 
                      placeholder="Tu empresa" 
                      className="bg-white/10 text-white placeholder:text-gray-400 focus:border-[#f6e6c3]"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="tu@email.com" 
                    className="bg-white/10 text-white placeholder:text-gray-400 focus:border-[#f6e6c3]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mensaje" className="text-gray-300">Mensaje</Label>
                  <Textarea 
                    id="mensaje" 
                    placeholder="Cuéntanos sobre tu proyecto..."
                    className="min-h-32 bg-white/10 text-white placeholder:text-gray-400 focus:border-[#f6e6c3]"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-[#8c26d5] to-[#f6e6c3] text-black font-bold text-xl py-4 px-6 h-14 hover:scale-100 transition-transform rounded-xl">
                  Enviar Mensaje
                </Button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[#f6e6c3]">Información de contacto</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-[#C75AF6]" />
                    <span className="text-gray-300">contacto@aigents.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-[#F55AFC]" />
                    <span className="text-gray-300">+1 (555) 123-4567</span>
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
