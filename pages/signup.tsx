import Link from 'next/link';

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">CryptoShield</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Sign-up currently paused</h1>
        <p className="mt-4 text-slate-300 leading-7">We're focusing on perfecting the CryptoShield dashboard and user experience first. Please log in while we finish this phase.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Link href="/login" className="inline-flex justify-center rounded-full bg-cyan-400 px-6 py-3 text-slate-950 font-semibold hover:bg-cyan-300">Log In</Link>
          <a className="inline-flex justify-center rounded-full border border-white/10 px-6 py-3 text-white text-center" href="#features">Why CryptoShield</a>
        </div>
      </div>
    </div>
  );
}
