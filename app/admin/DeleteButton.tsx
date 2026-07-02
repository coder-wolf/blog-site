"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this post?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/posts?slug=${slug}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-[12px] text-[#cc3333] hover:text-[#990000] disabled:opacity-50"
    >
      {loading ? "..." : "Delete"}
    </button>
  );
}
