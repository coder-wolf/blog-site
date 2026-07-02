import Link from "next/link";
import { getPublishedPosts } from "@/lib/db/posts";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export default async function BlogHome() {
  const posts = await getPublishedPosts();

  return (
    <>
      <section className="mb-16">
        <div className="pb-8 border-b border-[#e5e5e5] flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-light text-[#1a1a1a] mb-2">Archive</h1>
            <p className="text-sm text-[#666]">All articles published on The Journal.</p>
          </div>
          <span className="text-[11px] font-mono text-[#ccc] shrink-0">03 / {String(posts.length).padStart(2, "0")}</span>
        </div>
      </section>

      <div className="space-y-1">
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-5 border-b border-[#e5e5e5] hover:bg-[#f2f2f2] -mx-6 px-6 transition-colors"
          >
            <div className="flex items-baseline justify-between gap-6">
              <div className="flex items-baseline gap-6 min-w-0">
                <span className="text-[13px] text-[#ccc] font-mono w-8 shrink-0 text-right">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-base font-medium text-[#1a1a1a] group-hover:text-[#666] transition-colors truncate">
                  {post.title}
                </h2>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className="text-[13px] text-[#999] hidden sm:inline">{post.tags[0]}</span>
                <time className="text-[13px] text-[#999] font-mono">{formatDate(post.date)}</time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
