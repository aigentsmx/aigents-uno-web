import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Image
        src="/AIGents-logo-no-background.png"
        alt="AIGents Logo"
        width={600}
        height={230}
        priority
      />
    </main>
  );
}
