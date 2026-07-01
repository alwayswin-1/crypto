import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);
    if (!res.ok) return setError(data.error || 'Signup failed');

    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6 py-10">
      <div className="max-w-xl w-full rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">CryptoShield</p>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight">Admin sign-up</h1>
        <p className="mt-4 text-slate-300 leading-7">
          Only the administrator may create an account. Use the configured admin email and password for this deployment.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {error && <div className="rounded-xl bg-red-500/20 px-4 py-3 text-red-200">{error}</div>}
          <div>
            <label className="block text-sm text-slate-300">Email</label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300">Password</label>
            <input
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none focus:border-cyan-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="StrongPass123!"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-cyan-400 px-6 py-3 text-slate-950 font-semibold transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
