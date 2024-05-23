import dotenv from "dotenv"
dotenv.config()

if (!process.env.MONGODB_URL) {
    throw new Error("MONGODB_URL environment variable is not set");
  }

export const MONGO_URI: string = process.env.NODE_ENV === "test" ? `${process.env.MONGODB_TEST_URL}` : process.env.MONGODB_URL

export const PORT = process.env.PORT