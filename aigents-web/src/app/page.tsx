import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#10142A]">
      <main className="flex flex-col items-center justify-center">
        <Image
          src="/AIGents-logo-highQ.png"
          alt="AIGents Logo"
          width={500}
          height={150}
          priority
        />
        <p className="text-xl text-white mt-4">
          Best Customer Service. Every time.
        </p>
      </main>
    </div>
  );
}
