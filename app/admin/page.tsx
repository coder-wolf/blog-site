import Link from "next/link";
import { getAllPosts } from "@/lib/db/posts";
import { DeleteButton } from "./DeleteButton";
import { PublishButton } from "./PublishButton";

export const dynamic = "force-dynamic";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function StatusBadge({ status }: { status: string | undefined }) {
  const isPublished = status === "publish" || !status;

  return (
    <span
      className={`text-[11px] tracking-[0.1em] uppercase px-2.5 py-1 border ${
        isPublished
          ? "text-[#999] border-[#e5e5e5]"
          : "text-[#cc8800] border-[#f0d080] bg-[#fffbe6]"
      }`}
    >
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

export default async function AdminDashboard() {
  const posts = await getAllPosts();

  const publishedCount = posts.filter(
    (p) => p.status === "publish" || !p.status
  ).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-light text-[#1a1a1a] mb-1">Posts</h1>
          <p className="text-sm text-[#666]">
            {posts.length} total &middot; {publishedCount} published
          </p>
        </div>
        <Link
          href="/admin/write"
          className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-6 py-3 hover:bg-[#333] transition-colors"
        >
          New Post
        </Link>
      </div>

      <div className="border-t border-[#e5e5e5]">
        {posts.length === 0 && (
          <p className="py-10 text-sm text-[#999] text-center">No posts yet. Write your first one.</p>
        )}
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className="flex items-center gap-6 py-5 border-b border-[#e5e5e5] hover:bg-[#f2f2f2] -mx-6 px-6 transition-colors"
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
              <div className="flex items-center gap-4 shrink-0">
                <StatusBadge status={post.status} />
                <div className="flex gap-3 items-center">
                  <Link
                    href={`/admin/write?edit=${post.slug}`}
                    className="text-[12px] text-[#666] hover:text-[#1a1a1a]"
                  >
                    Edit
                  </Link>
                  <PublishButton slug={post.slug} status={post.status} />
                  <span className="text-[#e5e5e5]">|</span>
                  <DeleteButton slug={post.slug} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
