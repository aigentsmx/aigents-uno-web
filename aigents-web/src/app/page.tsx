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
        className="mt-12 px-8 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-text font-bold rounded-full transition-transform transform hover:scale-105 hover:shadow-lg text-xl"
      >
        Configura tu Agente de Prueba
      </Link>
    </main>
  );
}
