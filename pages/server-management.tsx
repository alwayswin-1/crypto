import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ServerManagement() {
  const [user, setUser] = useState<any>(null);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.error) return router.push('/login');
      if (data.user.role !== 'admin') return router.push('/dashboard');

      setUser(data.user);
      const metrics = await fetch('/api/files', { headers: { Authorization: `Bearer ${token}` } });
      const body = await metrics.json();
      if (metrics.ok) {
        setDownloads(body.downloaders || []);
      }
      setLoading(false);
    };
    void init();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">Loading server management…</div>;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Server Management</h1>
            <p className="mt-2 text-slate-400">Track downloaders by country, IP, and file slug.</p>
          </div>
          <a href="/dashboard" className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 hover:bg-white/10">Back to Dashboard</a>
        </div>

        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80">
          <table className="min-w-full divide-y divide-white/10 text-left text-sm text-slate-200">
            <thead className="bg-slate-950/80 text-slate-300">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Country</th>
                <th className="px-4 py-3">IP address</th>
                <th className="px-4 py-3">File slug</th>
                <th className="px-4 py-3">User agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 bg-slate-950/70">
              {downloads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-slate-400">No downloader events recorded yet.</td>
                </tr>
              ) : (
                downloads.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-4 text-slate-300">{new Date(item.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-4">{item.country || 'unknown'}</td>
                    <td className="px-4 py-4 break-all">{item.ip}</td>
                    <td className="px-4 py-4">{item.file?.slug || 'unknown'}</td>
                    <td className="px-4 py-4 break-all text-slate-400">{item.userAgent || '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
