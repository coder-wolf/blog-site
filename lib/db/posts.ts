import getClient from "./client";
import { ObjectId } from "mongodb";

export type Post = {
  _id?: ObjectId;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  tags: string[];
  imageUrl: string;
  status?: "draft" | "publish";
  createdAt?: Date;
  updatedAt?: Date;
};

function getCollection() {
  return getClient().then((client) =>
    client.db("blog").collection<Post>("posts")
  );
}

export async function getAllPosts(): Promise<Post[]> {
  const col = await getCollection();
  return col.find().sort({ date: -1 }).toArray();
}

export async function getPublishedPosts(): Promise<Post[]> {
  const col = await getCollection();
  return col
    .find({ $or: [{ status: "publish" }, { status: { $exists: false } }] })
    .sort({ date: -1 })
    .toArray();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const col = await getCollection();
  return col.findOne({ slug });
}

export async function createPost(post: Post): Promise<Post> {
  const col = await getCollection();
  const doc = {
    ...post,
    status: post.status || "draft",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const { insertedId } = await col.insertOne(doc as Post & { createdAt: Date; updatedAt: Date });
  return { ...doc, _id: insertedId };
}

export async function updatePost(slug: string, data: Partial<Post>): Promise<Post | null> {
  const col = await getCollection();
  const result = await col.findOneAndUpdate(
    { slug },
    { $set: { ...data, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return result;
}

export async function deletePost(slug: string): Promise<boolean> {
  const col = await getCollection();
  const result = await col.deleteOne({ slug });
  return result.deletedCount > 0;
}

export async function getAllSlugs(): Promise<string[]> {
  const col = await getCollection();
  const docs = await col
    .find({ $or: [{ status: "publish" }, { status: { $exists: false } }] }, { projection: { slug: 1, _id: 0 } })
    .toArray();
  return docs.map((d) => d.slug);
}

export async function deleteAllPosts(): Promise<number> {
  const col = await getCollection();
  const result = await col.deleteMany({});
  return result.deletedCount;
}
