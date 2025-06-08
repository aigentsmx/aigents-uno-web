import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Importa el nuevo botón
import { ArrowRight } from "lucide-react"; // Importa el ícono de flecha

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <Image
        src="/AIGents-logo-no-background.png"
        alt="AIGents Logo"
        width={800}
        height={310}
        priority
      />
      <Link href="/config" className="mt-16 no-underline">
        <Button
          size="lg"
          className="group bg-gradient-to-r from-[#8c26d5] via-[#E8A5F9] to-[#f6e6c3] text-black font-bold text-[1.2rem] w-[400px] h-[80px] rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 hover:from-[#8c26d5] hover:to-[#f9ebc9] flex items-center justify-center no-underline hover:shadow-[0_0_25px_#F55AFC]"
        >
          Configura tu Agente de Prueba
          <ArrowRight className="ml-4 h-6 w-6 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </Link>
    </main>
  );
}
