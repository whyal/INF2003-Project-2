import { MongoClient } from "mongodb";
import "dotenv/config";

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable to ensure the client is reused during hot-reloading in dev mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.DB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client for every request
  client = new MongoClient(process.env.DB_URI);
  clientPromise = client.connect();
}

export default clientPromise;
