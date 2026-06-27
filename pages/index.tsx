import Image from 'next/image';
import Link from 'next/link';

import logoDark from '../image/runzero-cyber-asset-attacks-surface-management-dark.svg';
import heroPromo from '../image/runzero-dashboard-4-9-dark.webp';
import bgLeft from '../image/bg-zero-grid-left-dark.svg';
import bgRight from '../image/bg-zero-grid-right-dark.svg';
import assetInventoryImage from '../image/Asset-Inventory.webp';
import attackSurfaceImage from '../image/Attack-Surface.webp';
import riskImage from '../image/Risk.webp';
import apiImage from '../image/API.webp';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden relative">
      <Image src={bgLeft} alt="background-left" className="pointer-events-none select-none absolute left-0 top-0 h-full w-auto opacity-20 -z-10" />
      <Image src={bgRight} alt="background-right" className="pointer-events-none select-none absolute right-0 top-0 h-full w-auto opacity-15 -z-10" />

      <div className="dot-wave pointer-events-none absolute inset-0 z-0" />

      <div className="relative z-10">
        <div className="border-b border-white/10 bg-sky-600/10 text-sky-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm sm:px-8">
            <p className="flex items-center gap-2 text-white/90">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              runZero joined Dragos to power the next-generation exposure management platform.
            </p>
            <Link href="#" className="font-semibold text-white hover:text-sky-200">More →</Link>
          </div>
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 ring-1 ring-white/10">
              <Image src={logoDark} alt="runZero logo" className="h-7 w-auto" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">runZero</span>
          </div>

          <nav className="hidden items-center gap-10 text-sm text-slate-300 xl:flex">
            <Link href="#" className="hover:text-white">Platform</Link>
            <Link href="#" className="hover:text-white">Solutions</Link>
            <Link href="#" className="hover:text-white">Resources</Link>
            <Link href="#" className="hover:text-white">Customers</Link>
            <Link href="#" className="hover:text-white">Partners</Link>
            <Link href="#" className="hover:text-white">About</Link>
            <Link href="#" className="hover:text-white">Pricing</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-yellow-500/10 transition hover:bg-yellow-300 sm:inline-flex">Start Free</Link>
            <Link href="#" className="hidden rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/10 sm:inline-flex">Book Demo</Link>
            <Link href="#" className="text-sm text-slate-300 hover:text-white">Sign In</Link>
          </div>
        </header>

        <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 drop-shadow-xs">Every asset. Every attack path. Every exposure.</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow-xs sm:text-6xl lg:text-7xl">
              Exposure management<br />for the AI-attack era
            </h1>
            <div className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/90 drop-shadow-xs sm:text-lg">
              <p>Defenders should win by default. Even against AI. runZero delivers deep intelligence across IT, OT, IoT, cloud, and mobile, so you can close the gaps and hold the line. With runZero, know every asset on your attack surface, uncover all types of exposures, map every attack path, and validate your segmentation integrity — before the exploit drops.</p>
              <p className="mt-4 font-semibold">No agents. No authentication. No appliances.</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                Try runZero
              </Link>
              <Link href="#" className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-950">
                Learn More
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-950/50 border-y border-white/10 py-16">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">New Release: Meet runZero 5.0</p>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">AI attacks demand accelerated defenses. runZero 5.0 delivers.</h2>
              <div className="mt-5 space-y-5 text-slate-300">
                <p>AI has compressed the window from exposure to exploit to mere minutes. runZero 5.0 is built for this reality, accelerating defender response time by automating the entire exposure management workflow — from discovery to risk prioritization to verified remediation.</p>
                <p>5.0 introduces new capabilities and views that automatically surface the risks most likely to lead to an incident and provides consolidated summaries pairing impact intelligence with remediation guidance to drive faster fixes. Bi-directional ticketing integration tracks the full remediation lifecycle — and when runZero rescans and confirms the exposure is gone, you can be confident the issue is truly closed.</p>
                <p>We’ve also expanded end-of-life coverage for network devices and added out-of-band testing that catches blind vulnerability classes without requiring customer infrastructure. And new external reporting lets stakeholders search, filter, and analyze risk data without platform access.</p>
              </div>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="#" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-[26px] py-[11px] text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                  Read the Blog
                </Link>
                <Link href="#" className="inline-flex items-center justify-center rounded-full border-2 border-white bg-transparent px-[26px] py-[11px] text-sm font-semibold text-white transition hover:bg-white hover:border-white hover:text-slate-950">
                  Watch the Demo
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[30px] border border-white/10 bg-[#03151f] shadow-2xl">
                <Image src={heroPromo} alt="runZero 5.0 release" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Full Visibility. Zero Compromise.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Own your total attack surface, inside and out.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>If you can’t see it, you can’t secure it. Unfortunately, today’s tools leave you in the dark. Hampered by clunky agents, credential-heavy setups, and limited deployment capabilities, they fail to provide full asset and exposure visibility, leaving critical risks out of reach.</p>
                <p>Easy to deploy in any environment, runZero delivers visibility in minutes across your internal and external attack surface, including IT, OT, IoT, mobile, and cloud. And we excel at uncovering the unknown and unmanageable.</p>
                <p>Combining safe active scanning, passive discovery, seamless API integrations, and advanced fingerprinting, runZero not only uncovers every asset but profiles each one against nearly 1,000 attributes — so you don’t just see more, you know more. And that enables you to address exposures other tools overlook.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={attackSurfaceImage} alt="runZero attack surface" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={assetInventoryImage} alt="runZero discovery" className="h-auto w-full object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Every Asset. Every Risk.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Uncover the hidden exposures your other security tools miss.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>Legacy vulnerability scanners fixate on CVEs. While EASM tools only skim the surface, runZero links internal topology maps with external exposures to chart the actual paths an attacker would take.</p>
                <p>Our discovery methods and novel fingerprinting break through the limits of agent, authentication, and attribution-only approaches to reveal the risks others can’t, even in OT and IoT environments.</p>
                <p>With proprietary scanning designed and proven safe for even the most sensitive devices, runZero ensures that no matter the device or the risk, you see what others miss, detect what others can’t, and leave no threat unchecked.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">No Guesswork. No Delays.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Start taking action against real risks.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>Finding hidden exposures is hard. Figuring out which ones matter is harder. Legacy tools overwhelm you with “critical” alerts based on theoretical scores, ignoring the actual context of your network.</p>
                <p>runZero cuts through the noise. By analyzing each asset’s specific attributes and environmental role, we pinpoint the exact exposures attackers prioritize.</p>
                <p>From there, our interactive 2D/3D topology maps, risk dashboards, and powerful inquiry tools accelerate remediation — helping you shrink the window of exploitability and stay proactively secure.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={riskImage} alt="runZero risk management" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#03151f] py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="rounded-[40px] border border-cyan-500/10 bg-slate-950/70 p-10 shadow-2xl backdrop-blur-xl">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">See Results in Minutes</p>
                  <h3 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">See ;& secure your total attack surface. Even the unknowns ;& unmanageable.</h3>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link href="/login" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-[26px] py-[11px] text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                    Try runZero for Free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-[#020617] py-16 text-slate-300">
          <div className="mx-auto max-w-7xl space-y-12 px-6 sm:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 ring-1 ring-white/10">
                    <Image src={logoDark} alt="runZero logo" className="h-7 w-auto" />
                  </div>
                  <span className="text-lg font-semibold text-white">runZero</span>
                </div>
                <p className="mt-5 max-w-2xl text-slate-400">runZero is the exposure management platform built for the AI-attack era. Discover every asset, reduce cyber exposure, and validate remediation faster than ever.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-200">Company</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><Link href="#" className="hover:text-white">Legal</Link></li>
                    <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                    <li><Link href="#" className="hover:text-white">Master Subscription Agreement</Link></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-200">Resources</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><Link href="#" className="hover:text-white">Contact</Link></li>
                    <li><Link href="#" className="hover:text-white">Blog</Link></li>
                    <li><Link href="#" className="hover:text-white">Subscribe</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-sm text-slate-500">© 2026 runZero, Inc. All Rights Reserved.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
