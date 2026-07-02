import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const [featured, ...rest] = getAllPosts();

  return (
    <>
      {featured && (
        <section className="mb-20">
          <div className="pb-8 border-b border-[#e5e5e5] mb-12">
            <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#999]">
              Featured Story
            </span>
          </div>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div className="h-[420px] bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0] mb-10 flex items-center justify-center">
              <span className="text-6xl text-[#ccc] tracking-[0.3em] uppercase text-sm font-medium">
                &nbsp;
              </span>
            </div>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-[13px] text-[#999] mb-4">
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                <span className="w-px h-3 bg-[#ccc]" />
                <span>{featured.author}</span>
              </div>
              <h1 className="text-4xl leading-tight font-light text-[#1a1a1a] mb-4 group-hover:text-[#666] transition-colors">
                {featured.title}
              </h1>
              <p className="text-base leading-relaxed text-[#666] max-w-xl">
                {featured.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      <section>
        <div className="pb-8 border-b border-[#e5e5e5] mb-12">
          <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-[#999]">
            Latest Articles
          </span>
        </div>
        <div className="space-y-16">
          {rest.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                  <div className="md:col-span-2">
                    <div className="h-64 md:h-full min-h-[200px] bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]" />
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-[13px] text-[#999] mb-3">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="w-px h-3 bg-[#ccc]" />
                      <span>{post.author}</span>
                    </div>
                    <h2 className="text-2xl font-light text-[#1a1a1a] mb-3 group-hover:text-[#666] transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-[#666] max-w-lg">
                      {post.excerpt}
                    </p>
                    <div className="flex gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] tracking-[0.1em] uppercase text-[#999]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
