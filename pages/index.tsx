import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-2xl p-10 bg-gray-900/60 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold mb-4">CryptoShield</h1>
        <p className="mb-6 text-gray-300">Secure crypto exposure management — sign up or log in to continue.</p>
        <div className="flex gap-4">
          <Link href="/signup" className="px-4 py-2 bg-indigo-600 rounded">Sign Up</Link>
          <Link href="/login" className="px-4 py-2 bg-gray-700 rounded">Log In</Link>
        </div>
      </div>
    </main>
  );
}
