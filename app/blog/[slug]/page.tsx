import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllSlugs } from "@/lib/db/posts";
import { ReadingProgress } from "./ReadingProgress";

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allSlugs = await getAllSlugs();
  const totalPosts = allSlugs.length;

  return (
    <>
      <ReadingProgress />
      <article className="max-w-[720px] mx-auto">
        <header className="mb-12">
          <div className="flex items-start justify-between mb-10">
            <nav className="flex items-center gap-2 text-[13px] text-[#999]">
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
            <span className="text-[11px] font-mono text-[#ccc] shrink-0">
              04 / {String(totalPosts).padStart(2, "0")}
            </span>
          </div>

          <div className="relative h-[400px] mb-10 overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 720px) 100vw, 720px"
              priority
            />
          </div>

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

        <div className="text-[#1a1a1a] leading-[1.9] text-[15px] space-y-5">
          {post.content.split("\n\n").map((paragraph, i) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;
            return (
              <p key={i} className="text-justify">
                {trimmed}
              </p>
            );
          })}
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
    </>
  );
}
