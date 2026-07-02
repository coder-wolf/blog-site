import { MongoClient } from "mongodb";

const uri: string = process.env.MONGODB_URI ?? "";
if (!uri) throw new Error("MONGODB_URI not set");

const posts = [
  {
    slug: "welcome-to-nextjs-blog",
    title: "Welcome to Next.js Blog",
    date: "2024-04-01",
    excerpt: "Getting started with the Next.js blog template and explore its features.",
    content: `Next.js has evolved into one of the most powerful frameworks for building modern web applications. With the introduction of the App Router in version 13, the paradigm shifted from file-based routing to a more flexible, layout-centric architecture that embraces React's latest features.\n\nThe App Router introduces several key concepts that every developer should understand. At its core, it uses a nested routing system where folders define routes and special files (page.tsx, layout.tsx, loading.tsx) define the UI for each segment.\n\nOne of the most significant advantages is the ability to colocate your components, styles, tests, and other files within the same route folder. This colocation pattern keeps related code together, making it easier to maintain and reason about your application.\n\nServer Components are another game-changer. By default, all components in the App Router are Server Components, meaning they render on the server and send only the resulting HTML to the client. This dramatically reduces the amount of JavaScript shipped to the browser, improving performance and user experience.\n\nThe App Router also introduces streaming and Suspense boundaries out of the box. This means you can load your page progressively, showing the user content as it becomes available rather than waiting for the entire page to render.\n\nIn this blog, we'll explore these concepts in depth, building practical examples and sharing best practices along the way. Whether you're a seasoned Next.js developer or just getting started, there's always something new to discover.`,
    author: "Next.js Team",
    tags: ["Next.js", "Blog", "Tutorial"],
    imageUrl: "https://picsum.photos/seed/welcome/1200/600",
  },
  {
    slug: "building-a-modern-blog",
    title: "Building a Modern Blog with Next.js",
    date: "2024-03-15",
    excerpt: "Learn how to create a full-featured blog with Next.js App Router and modern web technologies.",
    content: `Building a blog from scratch is one of the best ways to learn a framework deeply. It touches on routing, data fetching, rendering strategies, SEO, and performance optimization — all core concerns of modern web development.\n\nWe start by defining our data model. For a blog, the essential fields are title, slug, content, excerpt, author, date, and tags. In a production system, you'd likely use a headless CMS, a database, or markdown files. For this template, we've kept things straightforward with a local data module that can be swapped out later.\n\nRouting in the App Router is intuitive. The blog listing lives at /blog, and individual posts live at /blog/[slug]. By exporting generateStaticParams from the slug page, we tell Next.js to pre-render all known posts at build time. This gives us the speed of static generation with the flexibility of dynamic content.\n\nMetadata is handled through the Metadata API. By exporting generateMetadata from each page, we can set custom titles, descriptions, and Open Graph tags per post. This is crucial for SEO and social sharing.\n\nPerformance considerations include using the Next.js Image component for optimized images, leveraging React Server Components to minimize client-side JavaScript, and implementing streaming where appropriate.\n\nThe result is a blog that loads instantly, ranks well in search engines, and provides a great reading experience on any device. This foundation can be extended with comments, analytics, newsletters, and more as your blog grows.`,
    author: "Developer",
    tags: ["Next.js", "Web Development", "Tutorial"],
    imageUrl: "https://picsum.photos/seed/building/1200/600",
  },
  {
    slug: "optimizing-performance",
    title: "Optimizing Blog Performance",
    date: "2024-02-28",
    excerpt: "Performance tips and tricks to make your blog load lightning-fast.",
    content: `Performance isn't just about speed — it's about respect for your readers' time and attention. A fast-loading blog reduces bounce rates, improves SEO rankings, and provides a better experience for users on slow connections or older devices.\n\nThe first and most impactful optimization is image optimization. The Next.js Image component automatically serves responsive images in modern formats like WebP and AVIF. It also lazy-loads images by default, meaning only images in the viewport are loaded initially.\n\nCode splitting happens automatically with the App Router. Each route gets its own JavaScript bundle, loaded on demand. This eliminates the need to download code for pages the user hasn't visited yet.\n\nCaching is a powerful tool. Next.js supports Incremental Static Regeneration (ISR), allowing you to update static content without rebuilding the entire site. For dynamic content, the built-in fetch caching and revalidation APIs give you fine-grained control over how often data is refreshed.\n\nFont optimization is often overlooked. Using next/font to load Google Fonts ensures they're downloaded at build time, eliminating render-blocking external requests. The fonts are also self-hosted, improving privacy and reliability.\n\nBundle analysis tools like @next/bundle-analyzer help identify large dependencies that might be slowing down your app. Tree-shaking and dynamic imports can reduce bundle sizes significantly.\n\nFinally, measure everything. Core Web Vitals — LCP, FID or INP, and CLS — should be monitored regularly. Tools like Lighthouse, PageSpeed Insights, and the Web Vitals extension provide actionable data to guide your optimization efforts.`,
    author: "Performance Expert",
    tags: ["Performance", "Optimization", "Speed"],
    imageUrl: "https://picsum.photos/seed/performance/1200/600",
  },
  {
    slug: "nextjs-vs-traditional",
    title: "Next.js App Router vs Traditional Pages",
    date: "2024-02-10",
    excerpt: "Comparing Next.js 13's new App Router with the traditional routing system.",
    content: `The evolution from the Pages Router to the App Router represents the most significant architectural change in Next.js history. Understanding the differences is crucial for anyone building new projects or considering migration.\n\nThe Pages Router uses a flat file structure where each file in the pages directory becomes a route. Layouts are implemented through custom _app.js and _document.js files, and data fetching relies on getServerSideProps, getStaticProps, and getStaticPaths. This model served the community well for years, but it has limitations.\n\nThe App Router addresses these limitations by introducing nested layouts that persist across navigations. This means your header, footer, and sidebar don't remount when the user moves between pages. The layout system also allows for route groups, parallel routes, and intercepting routes — patterns that were difficult or impossible with the Pages Router.\n\nData fetching in the App Router is simpler. Server Components can fetch data directly with async/await, eliminating the need for separate data-fetching functions. The new caching and revalidation APIs provide more granular control than the older stale-while-revalidate pattern.\n\nLoading states are elegantly handled with loading.tsx files, which automatically trigger React Suspense boundaries. Error handling follows the same pattern with error.tsx files.\n\nFor existing Pages Router projects, Next.js provides a codemod to automate most of the migration. The App Router can coexist with the Pages Router during the transition, allowing teams to migrate incrementally rather than all at once.\n\nThe verdict: the App Router is the clear future of Next.js. Its architecture aligns with React's evolving best practices and provides a more intuitive development experience.`,
    author: "Architect",
    tags: ["Next.js", "Architecture", "Comparison"],
    imageUrl: "https://picsum.photos/seed/comparison/1200/600",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("blog");
    const col = db.collection("posts");

    await col.deleteMany({});
    const result = await col.insertMany(
      posts.map((p) => ({ ...p, createdAt: new Date(), updatedAt: new Date() }))
    );

    console.log(`Seeded ${result.insertedCount} posts`);
  } finally {
    await client.close();
  }
}

seed().catch(console.error);
