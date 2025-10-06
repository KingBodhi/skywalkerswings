"use client";
import { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        location.href = "/admin";
      } else {
        const errorData = await res.json().catch(() => ({ error: "Login failed" }));
        setErr(errorData.error || "Login failed");
      }
    } catch {
      setErr("Network error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="font-display text-2xl font-bold text-primary-600 mb-2">
              SKYFOX ADMIN
            </div>
            <p className="text-neutral-600">Sign in to your admin panel</p>
          </div>

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">
                Email Address
              </label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@skyfoxswings.com"
                type="email"
                className="admin-input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-primary-600 mb-2">
                Password
              </label>
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                className="admin-input"
                required
              />
            </div>

            {err && (
              <div className="bg-danger-50 border border-danger-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-danger-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-danger-800 text-sm">{err}</div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-neutral-400 text-white px-6 py-4 rounded-xl font-bold transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-primary-600 hover:text-primary-700 text-sm font-medium"
            >
              ← Back to Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
