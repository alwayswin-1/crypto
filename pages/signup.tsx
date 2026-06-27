import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handle(e: any) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (!res.ok) return setError(data.error || 'Error');
    localStorage.setItem('token', data.token);
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <form onSubmit={handle} className="bg-gray-900/60 p-8 rounded shadow max-w-md w-full">
        <h2 className="text-2xl mb-4">Create an account</h2>
        {error && <div className="mb-2 text-red-400">{error}</div>}
        <input className="w-full mb-2 p-2 rounded bg-gray-800" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input className="w-full mb-4 p-2 rounded bg-gray-800" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="w-full py-2 bg-indigo-600 rounded">Sign Up</button>
      </form>
    </div>
  );
}
