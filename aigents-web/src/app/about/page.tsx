import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">About AIGents</h1>
        <p className="text-lg">This is the about page for the AIGents project.</p>
        <Link href="/" className="text-blue-400 hover:underline">
          Go back to Home
        </Link>
      </div>
    </main>
  );
}