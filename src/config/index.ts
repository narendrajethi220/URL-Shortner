import dotenv from "dotenv";

type ServerConfig = {
  PORT: number;
  MONGO_URI:string;
  // REDIS_PORT: number;
  REDIS_URL: string;
  REDIS_COUNTER_KEY:string;
};

function loadEnv() {
  dotenv.config();
}

loadEnv();

export const serverConfig: ServerConfig = {
  PORT: Number(process.env.PORT) || 3000,
  MONGO_URI:process.env.MONGO_URI || "mongodb://localhost:27017/short_url",
  // REDIS_PORT:Number(process.env.REDIS_PORT) || 6379,
  REDIS_URL: process.env.REDIS_HOST || "redis://localhost:6379",
  REDIS_COUNTER_KEY: process.env.REDIS_COUNTER_KEY || "url_shortener_counter_key"
};
