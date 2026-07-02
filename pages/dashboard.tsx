import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const countryNameFormatter = useMemo(
    () => new Intl.DisplayNames(['en'], { type: 'region' }),
    []
  );

  const formatCountryName = (country: string | undefined | null) => {
    if (!country || country === 'unknown') return 'Unknown';
    if (country.length === 2) {
      return countryNameFormatter.of(country) ?? country;
    }
    return country;
  };
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
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const downloaderByCountry = useMemo(() => {
    return downloaders.reduce((acc: Record<string, number>, item: any) => {
      const country = formatCountryName(item.country || 'Unknown');
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});
  }, [downloaders]);

  const recentDownloaders = useMemo(
    () => [...downloaders].sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()),
    [downloaders]
  );

  const fetchMetrics = async () => {
    const res = await fetch('/api/files');
    const data = await res.json();
    if (res.ok) {
      setUploads(data.uploads || []);
      setDownloaders(data.downloaders || []);
    }
  };

  useEffect(() => {
    const init = async () => {
      const isAuthed = localStorage.getItem('admin-auth') === 'true';
      if (!isAuthed) return router.push('/signup');

      const adminEmail = localStorage.getItem('admin-email') || 'admin@example.com';
      setUser({ email: adminEmail });
      setLoading(false);
      await fetchMetrics();
    };
    void init();
  }, [router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    setUploadSuccess('');
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return setUploadError('Please choose a file to upload.');
    if (!slug) return setUploadError('Please enter a URL slug.');
    setUploadError('');
    setUploadSuccess('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('slug', slug);
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('uploaderEmail', user?.email || 'admin@example.com');

      const res = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Upload failed');
      }

      setUploadSuccess(`File uploaded. Download URL: /download/${data.file.slug}`);
      setUploads((current) => [data.file, ...current]);
      setSelectedFile(null);
      setSlug('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    localStorage.removeItem('admin-email');
    router.push('/signup');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="border-b border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
          <div className="text-2xl font-semibold">CryptoShield Admin</div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <button
            onClick={() => setShowUploadModal(true)}
            className="rounded-full bg-cyan-400 px-6 py-3 text-slate-950 font-semibold transition hover:bg-cyan-300"
          >
            Upload Project
          </button>
        </div>

        {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
            <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/95 p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold">Upload Project</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-300 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {uploadError && (
                <div className="mb-4 rounded-lg bg-red-500/20 px-4 py-3 text-red-200">{uploadError}</div>
              )}
              {uploadSuccess && (
                <div className="mb-4 rounded-lg bg-emerald-500/20 px-4 py-3 text-emerald-200">
                  {uploadSuccess}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    URL slug (e.g., my-app-v1)
                  </label>
                  <input
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-white outline-none focus:border-cyan-400"
                    placeholder="project-name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Select file
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="block w-full text-sm"
                  />
                </div>

                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full rounded-lg bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50"
                >
                  {uploading ? 'Uploading…' : 'Upload'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl border border-white/10 bg-slate-950/80 p-8">
            <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>
            {uploads.length === 0 ? (
              <p className="text-slate-400">No projects uploaded yet.</p>
            ) : (
              <div className="space-y-4">
                {uploads.map((upload) => (
                  <div key={upload.id} className="rounded-lg border border-white/10 bg-slate-900/50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="font-semibold text-white">{upload.originalName}</div>
                        <div className="mt-2 text-sm text-slate-400">
                          Slug: <code className="bg-slate-900 px-2 py-1 rounded">{upload.slug}</code>
                        </div>
                        <div className="mt-1 text-sm text-slate-400">
                          Downloads: <span className="font-semibold text-white">{upload.downloads?.length ?? 0}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-400">Download URL</div>
                        <div className="mt-1 text-white font-mono text-sm">/download/{upload.slug}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Downloads by Country</h2>
                <p className="mt-2 text-sm text-slate-400 max-w-xl">
                  A quick glance at current download traffic by full country name and the most recent IP addresses.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-400">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                Visible at a glance
              </div>
            </div>

            <div className="grid gap-6">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                <div className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 bg-slate-950/80">
                  Country counts
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
                    <thead className="bg-slate-950/80 text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3 text-right">Downloads</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-slate-950/70">
                      {Object.entries(downloaderByCountry)
                        .sort((a, b) => b[1] - a[1])
                        .map(([country, count]) => (
                          <tr key={country}>
                            <td className="px-4 py-3">{country}</td>
                            <td className="px-4 py-3 text-right font-semibold text-cyan-400">{count}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70">
                <div className="px-4 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400 bg-slate-950/80">
                  Recent downloads
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
                    <thead className="bg-slate-950/80 text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">IP address</th>
                        <th className="px-4 py-3">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 bg-slate-950/70">
                      {recentDownloaders.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-4 py-6 text-center text-slate-400">
                            No downloads recorded yet.
                          </td>
                        </tr>
                      ) : (
                        recentDownloaders.slice(0, 8).map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">{formatCountryName(item.country)}</td>
                            <td className="px-4 py-3 break-all text-slate-200">{item.ip}</td>
                            <td className="px-4 py-3 text-slate-400">{new Date(item.createdAt).toLocaleString()}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
