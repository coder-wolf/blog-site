"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const password = form.get("password") as string;

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        setError("Incorrect password");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-6">
          <h1 className="text-sm font-medium tracking-[0.2em] uppercase text-[#1a1a1a] mb-1">
            Enter Password
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoFocus
              className="w-full px-0 py-2.5 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
            />
          </div>

          {error && <p className="text-xs text-[#cc3333]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-6 py-2.5 hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
