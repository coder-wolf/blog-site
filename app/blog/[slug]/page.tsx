import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs, formatDate } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-[680px] mx-auto">
      <header className="mb-12">
        <nav className="flex items-center gap-2 text-[13px] text-[#999] mb-10">
          <Link href="/" className="hover:text-[#666] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#666] transition-colors">
            Archive
          </Link>
          <span>/</span>
          <span className="text-[#666] truncate">{post.title}</span>
        </nav>

        <div className="pb-10 border-b border-[#e5e5e5]">
          <div className="flex items-center gap-3 text-[13px] text-[#999] mb-5">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="w-px h-3 bg-[#ccc]" />
            <span>{post.author}</span>
          </div>
          <h1 className="text-4xl leading-tight font-light text-[#1a1a1a] mb-5">{post.title}</h1>
          <p className="text-base leading-relaxed text-[#666]">{post.excerpt}</p>
          <div className="flex gap-3 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.1em] uppercase text-[#999] border border-[#e5e5e5] px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div className="prose prose-base max-w-none text-[#1a1a1a] leading-[1.8]">
        <p className="text-base leading-[1.8] text-justify">{post.content}</p>
      </div>

      <div className="mt-16 pt-10 border-t border-[#e5e5e5]">
        <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-[#999] mb-8">
          Leave a Comment
        </h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors placeholder:text-[#bbb]"
              />
            </div>
          </div>
          <div>
            <textarea
              id="comment"
              rows={4}
              placeholder="Share your thoughts..."
              className="w-full px-0 py-3 border-b border-[#e5e5e5] bg-transparent text-sm text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a] transition-colors resize-none placeholder:text-[#bbb]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="text-sm tracking-[0.15em] uppercase text-white bg-[#1a1a1a] px-8 py-3 hover:bg-[#333] transition-colors"
          >
            Post Comment
          </button>
        </form>
      </div>
    </article>
  );
}
