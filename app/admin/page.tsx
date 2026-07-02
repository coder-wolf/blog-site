import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function AdminDashboard() {
  const posts = getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">Posts</h1>
          <p className="text-sm text-[#666]">{posts.length} articles published</p>
        </div>
        <Link
          href="/admin/write"
          className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-6 py-3 hover:bg-[#333] transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="border-t border-[#e5e5e5]">
        {posts.map((post, i) => (
          <div
            key={post.slug}
            className="flex items-center gap-6 py-5 border-b border-[#e5e5e5] hover:bg-[#f2f2f2] -mx-6 px-6 transition-colors group"
          >
            <span className="text-[13px] font-mono text-[#ccc] w-8 shrink-0 text-right">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-medium text-[#1a1a1a] truncate">{post.title}</h2>
              <div className="flex items-center gap-3 text-[12px] text-[#999] mt-1">
                <time>{formatDate(post.date)}</time>
                <span className="w-px h-2.5 bg-[#e5e5e5]" />
                <span>{post.author}</span>
              </div>
            </div>
            <span className="text-[11px] tracking-[0.1em] uppercase text-[#999] border border-[#e5e5e5] px-2.5 py-1">
              Published
            </span>
            <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link
                href={`/admin/write?edit=${post.slug}`}
                className="text-[12px] text-[#666] hover:text-[#1a1a1a]"
              >
                Edit
              </Link>
              <Link
                href={`/blog/${post.slug}`}
                className="text-[12px] text-[#666] hover:text-[#1a1a1a]"
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
