import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(()=>{
    const t = localStorage.getItem('token');
    if (!t) return router.push('/login');
    fetch('/api/auth/me', { headers: { Authorization: `Bearer ${t}` } }).then(r=>r.json()).then(data=>{
      if (data.error) return router.push('/login');
      setUser(data.user);
    });
  },[]);

  if (!user) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
        <p className="mt-4">Role: {user.role}</p>
        {user.role === 'admin' && <a href="/admin" className="inline-block mt-4 px-4 py-2 bg-yellow-500 text-black rounded">Admin Panel</a>}
      </div>
    </div>
  );
}
