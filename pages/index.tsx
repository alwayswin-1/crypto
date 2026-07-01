import Image from 'next/image';
import Link from 'next/link';

import logoDark from '../image/avatar.png';
import heroPromo from '../image/Apex-Blog_Tile.webp';
import bgLeft from '../image/bg-zero-grid-left-dark.svg';
import bgRight from '../image/bg-zero-grid-right-dark.svg';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <div className="bg-image-container">
        <Image src={heroPromo} alt="background" fill className="object-cover" />
      </div>
      
      <Image src={bgLeft} alt="background-left" className="pointer-events-none select-none absolute left-0 top-0 h-full w-auto opacity-20 -z-10" />
      <Image src={bgRight} alt="background-right" className="pointer-events-none select-none absolute right-0 top-0 h-full w-auto opacity-15 -z-10" />

      <div className="dot-wave pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 ring-1 ring-white/10">
              <Image src={logoDark} alt="CryptoShield logo" className="h-12 w-auto" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">CryptoShield</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/signup" className="rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-300">Sign Up</Link>
            <Link href="/login" className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/10">Log In</Link>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 drop-shadow-xs">Protect. Encrypt. Secure. Shield.</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow-xs sm:text-6xl lg:text-7xl">
              Distribute Your Projects with Confidence
            </h1>
            <div className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/90 drop-shadow-xs sm:text-lg">
              <p>Upload, manage, and track your project downloads in one place. Monitor downloader activity by country and manage everything from an intuitive admin dashboard.</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <Link href="/signup" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                Get Started
              </Link>
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950">
                Already have an account?
              </Link>
            </div>
          </div>
        </section>

        <footer className="bg-[#020617] py-16 text-slate-300">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="border-t border-white/10 pt-8 text-sm text-slate-500">© 2026 CryptoShield, Inc. All Rights Reserved.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}

