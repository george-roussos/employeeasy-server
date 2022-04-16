import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";

const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";

const MONGO_URL =
  process.env.NODE_ENV === "test"
    ? `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.meh6u.mongodb.net/employeeasy-test`
    : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.meh6u.mongodb.net/employeeasy`;

const PUBLIC_KEY = `${process.env.PUBLIC_KEY}`;

const PRIVATE_KEY = `${process.env.PRIVATE_KEY}`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 3001;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
  user: {
    publicKey: PUBLIC_KEY,
    privateKey: PRIVATE_KEY,
  },
};
