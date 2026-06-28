import Image from 'next/image';
import Link from 'next/link';

import logoDark from '../image/avatar.png';
import heroPromo from '../image/Apex-Blog_Tile.webp';
import bgLeft from '../image/bg-zero-grid-left-dark.svg';
import bgRight from '../image/bg-zero-grid-right-dark.svg';
import assetInventoryImage from '../image/cryptoshield2.png';
import attackSurfaceImage from '../image/cryptoshield1.png';
import riskImage from '../image/cryptoshield3.png';
import apiImage from '../image/API.webp';

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
        <div className="border-b border-white/10 bg-sky-600/10 text-sky-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-sm sm:px-8">
            <p className="flex items-center gap-2 text-white/90">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              CryptoShield: Next-Generation Cryptographic Protection for Your Digital Assets
            </p>
            <Link href="#" className="font-semibold text-white hover:text-sky-200">More →</Link>
          </div>
        </div>

        <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950/70 ring-1 ring-white/10">
              <Image src={logoDark} alt="CryptoShield logo" className="h-12 w-auto" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">CryptoShield</span>
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
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300 drop-shadow-xs">Protect. Encrypt. Secure. Shield.</p>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.05] text-white drop-shadow-xs sm:text-6xl lg:text-7xl">
              Advanced Cryptographic<br />Security for the Modern Era
            </h1>
            <div className="mx-auto mt-8 max-w-3xl text-base leading-8 text-white/90 drop-shadow-xs sm:text-lg">
              <p>CryptoShield provides enterprise-grade cryptographic protection for your sensitive data and digital assets. With advanced encryption algorithms, secure key management, and real-time threat monitoring, CryptoShield ensures your information stays protected against evolving cyber threats across all your digital infrastructure.</p>
              <p className="mt-4 font-semibold">Military-grade encryption. Instant deployment. Zero complexity.</p>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              <Link href="/login" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                Try CryptoShield
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
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Enterprise Features: CryptoShield Pro</p>
              <h2 className="mt-5 text-3xl font-semibold text-white sm:text-4xl">Unmatched encryption strength. Complete peace of mind.</h2>
              <div className="mt-5 space-y-5 text-slate-300">
                <p>CryptoShield Pro combines advanced encryption protocols with intelligent threat detection to protect your most sensitive data. Our platform automatically encrypts critical assets, manages cryptographic keys securely, and provides real-time alerts against unauthorized access attempts.</p>
                <p>With CryptoShield Pro, you gain comprehensive audit trails, compliance reporting for GDPR, HIPAA, and other regulations, and seamless integration with your existing security infrastructure. Our zero-trust architecture ensures that every transaction is verified and every data transfer is encrypted end-to-end.</p>
                <p>We've engineered CryptoShield for enterprise scale with support for distributed systems, cloud environments, and hybrid deployments. Advanced features include quantum-resistant algorithms, automatic key rotation, and granular access controls that give you complete visibility and control over your cryptographic security posture.</p>
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
                <Image src={heroPromo} alt="CryptoShield Pro Dashboard" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Encryption Everywhere. Complete Control.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Protect every byte of your valuable data.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>CryptoShield provides seamless encryption for all your data—whether at rest, in transit, or in use. Our intelligent encryption engine automatically detects sensitive information and applies the appropriate cryptographic protection without disrupting your workflows.</p>
                <p>Deploy CryptoShield across your entire infrastructure in minutes. Our agentless architecture means no complex installations or credential management. Whether your data lives on-premises, in the cloud, or in hybrid environments, CryptoShield provides consistent, enterprise-grade protection.</p>
                <p>Our platform integrates with your existing security tools and databases through simple APIs. CryptoShield supports all major encryption standards and algorithms, including AES-256, RSA, ECC, and emerging quantum-safe cryptography. You maintain full control over encryption keys with our secure key management system.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={attackSurfaceImage} alt="CryptoShield Encryption Protection" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={assetInventoryImage} alt="CryptoShield Intelligence" className="h-auto w-full object-cover" />
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:pl-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Intelligent Protection. Adaptive Security.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Smart encryption that evolves with threats.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>CryptoShield uses machine learning to identify sensitive data patterns and automatically apply optimal encryption algorithms. Our adaptive security system continuously monitors for suspicious activities and strengthens protection in real-time.</p>
                <p>Traditional encryption tools are static. CryptoShield evolves with emerging threats. Our platform automatically updates cryptographic standards, patches vulnerabilities, and rotates keys based on risk assessments—ensuring your security never falls behind.</p>
                <p>From IoT devices to enterprise databases, CryptoShield protects all your digital assets with proven cryptographic protocols. Our multi-layer security architecture detects tampering attempts instantly, prevents unauthorized decryption, and provides forensic evidence of all access attempts.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrapper py-20 bg-white">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 sm:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="order-2 lg:order-1 lg:pr-12">
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-500">Compliance Made Easy. Audit Ready.</p>
              <h3 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">Meet regulatory requirements with confidence.</h3>
              <div className="mt-5 space-y-5 text-slate-600">
                <p>CryptoShield automates compliance with GDPR, HIPAA, PCI-DSS, SOC 2, and other regulatory frameworks. Our comprehensive audit logs and compliance reports prove your encryption and access controls meet industry standards.</p>
                <p>Encryption requirements can be complex. CryptoShield simplifies the process with pre-configured profiles for different compliance standards. Our compliance dashboard shows real-time status of all encryption controls and highlights any gaps that need attention.</p>
                <p>Your security team gets detailed visibility into encryption policies, key management activities, and access patterns. Our interactive dashboards, alerting system, and detailed inquiry tools help you demonstrate compliance to auditors and regulators with confidence.</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="overflow-hidden rounded-[30px] border border-slate-200 shadow-2xl bg-white">
                <Image src={riskImage} alt="CryptoShield Compliance" className="h-auto w-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#03151f] py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8">
            <div className="rounded-[40px] border border-cyan-500/10 bg-slate-950/70 p-10 shadow-2xl backdrop-blur-xl">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Start Protecting Your Data Today</p>
                  <h3 className="mt-5 text-4xl font-semibold text-white sm:text-5xl">Deploy enterprise encryption in minutes. Sleep secure tonight.</h3>
                </div>
                <div className="flex justify-center lg:justify-end">
                  <Link href="/login" className="inline-flex items-center justify-center rounded-full border-2 border-yellow-400 bg-yellow-400 px-[26px] py-[11px] text-sm font-semibold text-slate-950 transition hover:border-cyan-400 hover:bg-cyan-400">
                    Try CryptoShield Free
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
                    <Image src={logoDark} alt="CryptoShield logo" className="h-7 w-auto" />
                  </div>
                  <span className="text-lg font-semibold text-white">CryptoShield</span>
                </div>
                <p className="mt-5 max-w-2xl text-slate-400">CryptoShield is the enterprise cryptographic security platform for the modern era. Protect your sensitive data with military-grade encryption, intelligent threat detection, and complete compliance automation.</p>
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
            <div className="border-t border-white/10 pt-8 text-sm text-slate-500">© 2026 CryptoShield, Inc. All Rights Reserved.</div>
          </div>
        </footer>
      </div>
    </main>
  );
}
