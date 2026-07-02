"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function PublishButton({ slug, status }: { slug: string; status: string | undefined }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isPublished = status === "publish" || !status;

  async function handleToggle() {
    setLoading(true);
    try {
      const newStatus = isPublished ? "draft" : "publish";
      const res = await fetch(`/api/posts?slug=${slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-[12px] text-[#666] hover:text-[#1a1a1a] disabled:opacity-50"
    >
      {loading ? "..." : isPublished ? "Unpublish" : "Publish"}
    </button>
  );
}
