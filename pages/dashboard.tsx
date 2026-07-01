import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';

import heroImage from '../image/Apex-Blog_Tile.webp';
import bgLeft from '../image/bg-zero-grid-left-dark.svg';
import bgRight from '../image/bg-zero-grid-right-dark.svg';
import assetInventoryImage from '../image/cryptoshield2.png';
import attackSurfaceImage from '../image/Platform-EM-Updates_Pillar1.webp';
import riskImage from '../image/cryptoshield3.png';
import apiImage from '../image/API.webp';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploads, setUploads] = useState<any[]>([]);
  const [downloaders, setDownloaders] = useState<any[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [slug, setSlug] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const downloaderByCountry = useMemo(() => {
    return downloaders.reduce((acc: Record<string, number>, item: any) => {
      const country = item.country || 'unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
  }, [downloaders]);

  const isAdmin = user?.role === 'admin';

  const fetchMetrics = async (token: string) => {
    const res = await fetch('/api/files', { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    if (res.ok) {
      setUploads(data.uploads || []);
      setDownloaders(data.downloaders || []);
    }
  };

  useEffect(() => {
    const init = async () => {
      const t = localStorage.getItem('token');
      if (!t) return router.push('/login');
      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } });
      const data = await res.json();
      if (data.error) return router.push('/login');
      setUser(data.user);
      setLoading(false);
      await fetchMetrics(t);
    };
    void init();
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    setUploadSuccess('');
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const arrayBufferToBase64 = async (buffer: ArrayBuffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    const chunkSize = 0x8000;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const chunk = bytes.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    return btoa(binary);
  };

  const handleUpload = async () => {
    if (!selectedFile) return setUploadError('Please choose a file to upload.');
    if (!slug) return setUploadError('Please enter a URL slug.');
    setUploadError('');
    setUploadSuccess('');
    setUploading(true);

    const token = localStorage.getItem('token');
    if (!token) {
      setUploadError('You must be logged in.');
      setUploading(false);
      return;
    }

    const fileBuffer = await selectedFile.arrayBuffer();
    const content = await arrayBufferToBase64(fileBuffer);

    const res = await fetch('/api/files/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ slug, filename: selectedFile.name, content }),
    });

    const data = await res.json();
    setUploading(false);
    if (!res.ok) {
      setUploadError(data.error || 'Upload failed');
      return;
    }

    setUploadSuccess(`File uploaded. Download URL: ${data.downloadUrl}`);
    setUploads((current) => [data.file, ...current]);
    setSelectedFile(null);
    setSlug('');
  };

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

        <div className="relative mx-auto max-w-7xl px-8 py-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-xs text-cyan-300 tracking-widest">CRYPTOSHIELD</p>
              <h1 className="mt-6 text-5xl leading-tight font-extrabold text-white sm:text-6xl md:text-7xl">Crypto exposure monitoring that feels premium.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">A polished dashboard experience for asset security, risk visibility, and download management.</p>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin ? (
                <>
                  <Link href="/server-management" className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200 transition hover:bg-white/10 sm:inline-flex">Server Management</Link>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="rounded-full bg-cyan-400 px-6 py-3 text-slate-950 font-semibold shadow-md transition hover:bg-cyan-300"
                  >
                    Upload project
                  </button>
                </>
              ) : (
                <span className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-slate-200">Uploader access restricted</span>
              )}
            </div>
          </div>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
            <div className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/95 p-8 shadow-2xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Upload Project</h2>
                  <p className="mt-2 text-sm text-slate-400">Enter a URL slug and upload the file. The download link will be generated automatically.</p>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-300 hover:text-white">Close</button>
              </div>

              <div className="mt-6 grid gap-5">
                {uploadError && <div className="rounded-2xl bg-red-500/20 px-4 py-3 text-red-200">{uploadError}</div>}
                {uploadSuccess && <div className="rounded-2xl bg-emerald-500/15 px-4 py-3 text-emerald-200">{uploadSuccess}</div>}

                <label className="block text-sm text-slate-300">Download URL slug</label>
                <input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400"
                  placeholder="example-project"
                />

                <label className="block text-sm text-slate-300">Project file</label>
                <input type="file" onChange={handleFileChange} className="w-full text-sm text-slate-200" />

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full rounded-2xl bg-cyan-400 px-6 py-3 text-slate-950 font-semibold transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading ? 'Uploading…' : 'Upload and generate URL'}
                </button>
              </div>
            </div>
          </div>
        )}

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

      <section className="mx-auto max-w-7xl px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Uploader Overview</p>
                <h2 className="mt-3 text-3xl font-semibold text-white">Published files and download URLs</h2>
              </div>
              {isAdmin && (
                <Link href="/server-management" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Server Management</Link>
              )}
            </div>

            <div className="mt-8 space-y-4">
              {uploads.length === 0 ? (
                <p className="text-slate-400">No uploaded projects yet. Use the upload button to publish a file.</p>
              ) : (
                uploads.map((upload) => (
                  <div key={upload.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-400">Slug</p>
                        <p className="text-lg font-semibold text-white">{upload.slug}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-slate-400">Download URL</p>
                        <p className="text-white">/download/{upload.slug}</p>
                      </div>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.30em] text-slate-400">File</p>
                        <p className="mt-2 text-sm text-white">{upload.originalName}</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.30em] text-slate-400">Uploaded by</p>
                        <p className="mt-2 text-sm text-white">{upload.uploader?.email || 'admin'}</p>
                      </div>
                      <div className="rounded-2xl bg-white/5 p-3">
                        <p className="text-xs uppercase tracking-[0.30em] text-slate-400">Downloads</p>
                        <p className="mt-2 text-sm text-white">{upload.downloads?.length ?? 0}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Downloader Categories</p>
            <h2 className="mt-3 text-3xl font-semibold text-white">By country</h2>
            <div className="mt-6 space-y-3">
              {Object.keys(downloaderByCountry).length === 0 ? (
                <p className="text-slate-400">No downloads have been recorded yet.</p>
              ) : (
                Object.entries(downloaderByCountry).map(([country, count]) => (
                  <div key={country} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-4 py-3">
                    <span className="text-sm text-slate-200">{country}</span>
                    <span className="text-sm font-semibold text-white">{count}</span>
                  </div>
                ))
              )}
            </div>

            <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
              <p className="text-sm uppercase tracking-[0.30em] text-slate-400">Recent download activity</p>
              <div className="mt-4 space-y-3">
                {downloaders.slice(0, 5).map((item) => (
                  <div key={item.id} className="rounded-2xl bg-white/5 p-3">
                    <div className="flex items-center justify-between gap-2 text-sm text-slate-200">
                      <span>{item.country || 'unknown'}</span>
                      <span>{new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="mt-2 text-xs text-slate-400">IP: {item.ip}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
