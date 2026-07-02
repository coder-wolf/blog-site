import clientPromise from "./client";

export type SiteSettings = {
  blogTitle: string;
  tagline: string;
  metaDescription: string;
  analyticsId: string;
  twitterUrl: string;
  githubUrl: string;
};

const DEFAULT_SETTINGS: SiteSettings = {
  blogTitle: "The Journal",
  tagline: "Thoughts, tutorials, and stories about building with Next.js.",
  metaDescription: "A personal blog about web development, Next.js, and modern JavaScript.",
  analyticsId: "",
  twitterUrl: "",
  githubUrl: "",
};

function getCollection() {
  return clientPromise.then((client) =>
    client.db("blog").collection<SiteSettings & { _id: string }>("settings")
  );
}

export async function getSettings(): Promise<SiteSettings> {
  const col = await getCollection();
  const doc = await col.findOne({ _id: "global" });
  return doc ? { ...DEFAULT_SETTINGS, ...doc } : DEFAULT_SETTINGS;
}

export async function updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
  const col = await getCollection();
  await col.updateOne(
    { _id: "global" },
    { $set: data, $setOnInsert: { _id: "global" } },
    { upsert: true }
  );
  return getSettings();
}
