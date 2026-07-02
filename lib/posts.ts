export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
};

export const blogPosts: Post[] = [
  {
    slug: "welcome-to-nextjs-blog",
    title: "Welcome to Next.js Blog",
    date: "April 1, 2024",
    excerpt: "Getting started with the Next.js blog template and explore its features.",
    content:
      "This is the welcome blog post for the Next.js starter template. In this post, we'll explore the basic structure of the blog, including the homepage that lists all articles and how to navigate to individual blog posts. We'll also look at the voting system that allows users to interact with each article.",
    author: "Next.js Team",
    tags: ["Next.js", "Blog", "Tutorial"],
  },
  {
    slug: "building-a-modern-blog",
    title: "Building a Modern Blog with Next.js",
    date: "March 15, 2024",
    excerpt: "Learn how to create a full-featured blog with Next.js App Router and modern web technologies.",
    content:
      "In this comprehensive tutorial, we'll build a modern blog from scratch using Next.js App Router. We'll cover routing, data fetching, markdown parsing, SEO optimization, and much more. This blog starter template serves as the foundation for all our future blog posts.",
    author: "Developer",
    tags: ["Next.js", "Web Development", "Tutorial"],
  },
  {
    slug: "optimizing-performance",
    title: "Optimizing Blog Performance",
    date: "February 28, 2024",
    excerpt: "Performance tips and tricks to make your blog load lightning-fast.",
    content:
      "Performance is crucial for any blog. In this article, we'll explore various techniques to optimize your Next.js blog for speed, including image optimization, caching strategies, code splitting, and more. Fast loading times improve user experience and SEO rankings.",
    author: "Performance Expert",
    tags: ["Performance", "Optimization", "Speed"],
  },
  {
    slug: "nextjs-vs-traditional",
    title: "Next.js App Router vs Traditional Pages",
    date: "February 10, 2024",
    excerpt: "Comparing Next.js 13's new App Router with the traditional routing system.",
    content:
      "Next.js has evolved significantly with the introduction of the App Router in version 13. This post compares the new App Router approach with traditional pages routing, highlighting the advantages and differences. The App Router offers more flexible routing, better nested layouts, and improved data fetching patterns.",
    author: "Architect",
    tags: ["Next.js", "Architecture", "Comparison"],
  },
];

export function getAllPosts(): Post[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
