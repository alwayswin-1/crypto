import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import heroImage from '../image/Apex-Blog_Tile.webp';
import bgLeft from '../image/bg-zero-grid-left-dark.svg';
import bgRight from '../image/bg-zero-grid-right-dark.svg';
import assetInventoryImage from '../image/cryptoshield2.png';
import attackSurfaceImage from '../image/Platform-EM-Updates_Pillar1.webp';
import riskImage from '../image/cryptoshield3.png';
import apiImage from '../image/API.webp';

const stats = [
  { label: 'Monitored Assets', value: '1,248', description: 'Wallets, contracts, and exchanges.' },
  { label: 'Open Risks', value: '27', description: 'Active exposure findings to review.' },
  { label: 'Compliance Score', value: '92%', description: 'Cryptographic and policy coverage.' },
];

const cards = [
  { title: 'Liquidity Exposure', value: '$12.4M', detail: 'Tracked across 8 pools and bridges.' },
  { title: 'Pending Alerts', value: '14', detail: 'High-risk events requiring review.' },
  { title: 'Smart Contract Health', value: 'A+', detail: 'Audit and runtime consistency.' },
  { title: 'Network Coverage', value: '46', detail: 'Chains including Ethereum and Solana.' },
];

const gallery = [
  { title: 'Asset Inventory', description: 'Complete inventory coverage across wallet and contract exposures.', image: assetInventoryImage },
  { title: 'Attack Surface', description: 'Visualize surface risks across your hybrid crypto estate.', image: attackSurfaceImage },
  { title: 'Risk Scoring', description: 'Real-time risk trends with impact and remediation insight.', image: riskImage },
  { title: 'API Access', description: 'Secure integrations for alerts, observability, and automation.', image: apiImage },
];

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const t = localStorage.getItem('token');
      if (!t) return router.push('/login');
      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.error) return router.push('/login');
      setUser(data.user);
      setLoading(false);
    };
    void init();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading Dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030510] text-white">
      <div className="relative overflow-hidden">
        <Image src={bgLeft} alt="bg-left" className="pointer-events-none select-none absolute left-0 top-0 h-full w-auto opacity-30" />
        <Image src={bgRight} alt="bg-right" className="pointer-events-none select-none absolute right-0 top-0 h-full w-auto opacity-25" />

        <div className="relative mx-auto max-w-7xl px-8 py-28">
          <p className="text-xs text-cyan-300 tracking-widest">CRYPTOSHIELD</p>
          <h1 className="mt-6 text-5xl leading-tight font-extrabold text-white sm:text-6xl md:text-7xl">Crypto exposure monitoring that feels premium.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A polished dashboard experience for asset security, risk visibility, and compliance insight.</p>

          <div className="mt-8 flex items-center gap-4">
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-slate-900 font-semibold shadow-md">Log In</Link>
            <button className="inline-flex items-center justify-center rounded-full bg-transparent border border-white/10 px-6 py-3 text-white">Sign-up paused</button>
          </div>
        </div>

        <div className="absolute right-12 top-24 w-80 rounded-lg border border-cyan-400/30 bg-gradient-to-b from-[#042a37] to-[#023042] p-3 shadow-xl">
          <div className="rounded-md overflow-hidden border border-white/10 bg-[#022430]">
            <Image src={heroImage} alt="promo" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-white font-semibold">A new release has landed!</h3>
              <p className="text-slate-300 text-sm mt-2">Learn More →</p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-7xl px-8 py-8">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex gap-6 items-center">
                <Image src={assetInventoryImage} alt="icons" className="h-8 w-8 opacity-60" />
                <Image src={attackSurfaceImage} alt="icons" className="h-8 w-8 opacity-60" />
                <Image src={riskImage} alt="icons" className="h-8 w-8 opacity-60" />
                <Image src={apiImage} alt="icons" className="h-8 w-8 opacity-60" />
              </div>
              <div className="text-sm text-slate-400">&nbsp;</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
