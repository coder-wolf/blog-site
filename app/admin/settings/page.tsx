"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Settings = {
  blogTitle: string;
  tagline: string;
  metaDescription: string;
  analyticsId: string;
  twitterUrl: string;
  githubUrl: string;
};

export default function SettingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [defaults, setDefaults] = useState<Settings>({
    blogTitle: "The Journal",
    tagline: "Thoughts, tutorials, and stories about building with Next.js.",
    metaDescription: "A personal blog about web development, Next.js, and modern JavaScript.",
    analyticsId: "",
    twitterUrl: "",
    githubUrl: "",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) setDefaults(data);
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  }, []);

  async function handleSaveSettings(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(e.currentTarget);

    const body: Settings = {
      blogTitle: (form.get("blogTitle") as string) || "The Journal",
      tagline: form.get("tagline") as string,
      metaDescription: form.get("metaDescription") as string,
      analyticsId: form.get("analyticsId") as string,
      twitterUrl: form.get("twitterUrl") as string,
      githubUrl: form.get("githubUrl") as string,
    };

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save settings");

      setSuccess("Settings saved successfully.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const form = new FormData(e.currentTarget);
    const currentPassword = form.get("currentPassword") as string;
    const newPassword = form.get("newPassword") as string;

    try {
      const res = await fetch("/api/auth", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to change password");

      setSuccess(data.message);
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <p className="text-sm text-[#999]">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">Settings</h1>
        <p className="text-sm text-[#666]">Manage your blog configuration</p>
      </div>

      {success && (
        <div className="mb-8 p-4 bg-[#f0fdf4] border border-[#bbf7d0] text-sm text-[#166534]">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-[#fef2f2] border border-[#fecaca] text-sm text-[#cc3333]">
          {error}
        </div>
      )}

      <form onSubmit={handleSaveSettings} className="space-y-12">
        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              General
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Blog Title
              </label>
              <input
                type="text"
                name="blogTitle"
                defaultValue={defaults.blogTitle}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Tagline
              </label>
              <input
                type="text"
                name="tagline"
                defaultValue={defaults.tagline}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              SEO
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Default Meta Description
              </label>
              <textarea
                name="metaDescription"
                rows={3}
                defaultValue={defaults.metaDescription}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                name="analyticsId"
                defaultValue={defaults.analyticsId}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] font-mono"
              />
            </div>
          </div>
        </section>

        <section>
          <div className="pb-4 border-b border-[#e5e5e5] mb-8">
            <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
              Social Links
            </h2>
          </div>
          <div className="max-w-lg space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                Twitter / X
              </label>
              <input
                type="text"
                name="twitterUrl"
                defaultValue={defaults.twitterUrl}
                placeholder="https://x.com/username"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                GitHub
              </label>
              <input
                type="text"
                name="githubUrl"
                defaultValue={defaults.githubUrl}
                placeholder="https://github.com/username"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
          </div>
        </section>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-8 py-3 hover:bg-[#333] transition-colors disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <div className="mt-16">
        <form onSubmit={handleChangePassword} className="space-y-8">
          <section>
            <div className="pb-4 border-b border-[#e5e5e5] mb-8">
              <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#1a1a1a]">
                Change Password
              </h2>
            </div>
            <div className="max-w-lg space-y-6">
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
              <div>
                <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={4}
                  className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
              </div>
              <p className="text-[11px] text-[#999]">
                Minimum 4 characters. After changing, update ADMIN_PASSWORD in your .env file.
              </p>
            </div>
          </section>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-8 py-3 hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
