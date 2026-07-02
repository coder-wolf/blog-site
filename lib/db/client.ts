import { MongoClient } from "mongodb";

function getUri(): string {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set in environment variables");
  }
  return uri;
}

let clientPromise: Promise<MongoClient> | null = null;

export default function getClient(): Promise<MongoClient> {
  if (!clientPromise) {
    const uri = getUri();
    const opts = {
      serverSelectionTimeoutMS: 10000,
      tls: true,
      tlsAllowInvalidCertificates: true,
    };
    if (process.env.NODE_ENV === "development") {
      const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
      };
      if (!globalWithMongo._mongoClientPromise) {
        globalWithMongo._mongoClientPromise = new MongoClient(uri, opts).connect();
      }
      clientPromise = globalWithMongo._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri, opts).connect();
    }
  }
  return clientPromise;
}
