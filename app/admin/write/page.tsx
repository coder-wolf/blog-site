"use client";

import { Suspense, FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function WriteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!editSlug);
  const [error, setError] = useState("");
  const [defaults, setDefaults] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    author: "",
    tags: "",
    imageUrl: "",
    date: "",
  });

  useEffect(() => {
    if (!editSlug) return;
    fetch(`/api/posts?slug=${editSlug}`)
      .then((r) => r.json())
      .then((post) => {
        if (post.error) throw new Error(post.error);
        setDefaults({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          tags: (post.tags || []).join(", "),
          imageUrl: post.imageUrl || "",
          date: post.date || "",
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setFetching(false));
  }, [editSlug]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = new FormData(e.currentTarget);

    const body = {
      title: form.get("title") as string,
      slug: form.get("slug") as string,
      excerpt: form.get("excerpt") as string,
      content: form.get("content") as string,
      author: form.get("author") as string,
      tags: (form.get("tags") as string).split(",").map((t) => t.trim()).filter(Boolean),
      imageUrl: (form.get("imageUrl") as string) || "https://picsum.photos/seed/default/1200/600",
      date: (form.get("date") as string) || new Date().toISOString().split("T")[0],
    };

    try {
      const url = editSlug ? `/api/posts?slug=${editSlug}` : "/api/posts";
      const method = editSlug ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save post");
      }

      router.push("/admin");
      router.refresh();
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
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">
            {editSlug ? "Edit Article" : "Write"}
          </h1>
          <p className="text-sm text-[#666]">
            {editSlug ? "Update your article" : "Draft a new article"}
          </p>
        </div>
        <button
          type="submit"
          form="editor-form"
          disabled={loading}
          className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-6 py-3 hover:bg-[#333] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : editSlug ? "Update" : "Publish"}
        </button>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-[#fef2f2] border border-[#fecaca] text-sm text-[#cc3333]">
          {error}
        </div>
      )}

      <form id="editor-form" onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <input
                type="text"
                name="title"
                required
                defaultValue={defaults.title}
                placeholder="Article title"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-2xl font-light text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <input
                type="text"
                name="slug"
                required
                defaultValue={defaults.slug}
                placeholder="Slug (e.g. my-article-title)"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#666] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb] font-mono"
              />
            </div>
            <div>
              <textarea
                name="excerpt"
                rows={3}
                defaultValue={defaults.excerpt}
                placeholder="Short excerpt for the article card..."
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#666] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <textarea
                name="content"
                rows={16}
                required
                defaultValue={defaults.content}
                placeholder="Write your article content here..."
                className="w-full px-0 py-3 text-[15px] leading-[1.9] text-[#1a1a1a] bg-transparent border-b border-[#e5e5e5] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#bbb]"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Cover Image URL
              </label>
              <input
                type="text"
                name="imageUrl"
                defaultValue={defaults.imageUrl}
                placeholder="https://picsum.photos/seed/.../1200/600"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Author
              </label>
              <input
                type="text"
                name="author"
                required
                defaultValue={defaults.author}
                placeholder="Your name"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                defaultValue={defaults.tags}
                placeholder="Next.js, Web Dev, Tutorial"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.15em] uppercase text-[#999] mb-3">
                Publish Date
              </label>
              <input
                type="date"
                name="date"
                defaultValue={defaults.date}
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <p className="text-sm text-[#999]">Loading...</p>
        </div>
      }
    >
      <WriteForm />
    </Suspense>
  );
}
