'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: '/',
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-green-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-2xl font-bold mb-4 text-green-800">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded text-green-800 placeholder-gray-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded text-green-800 placeholder-gray-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Log In
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Demo: <span className="font-mono">user@ecoeats.com</span> / <span className="font-mono">demo123</span>
        </p>
      </form>
    </main>
  );
}
