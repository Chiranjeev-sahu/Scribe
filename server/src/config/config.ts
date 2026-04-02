import dotenv from 'dotenv';
dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  accessTokenSecret: string;
  accessTokenExpiry: string;
  refreshTokenSecret: string;
  refreshTokenExpiry: string;
  frontendUri: string;
}

const mongoUri = process.env.MONGO_URI;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const frontendUri = process.env.FRONTEND_URI;

if (!mongoUri || !accessTokenSecret || !refreshTokenSecret || !frontendUri) {
  throw new Error(
    'CRITICAL ERROR: Missing required environment variables (MONGO_URI, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, or FRONTEND_URI). Please check your .env file.'
  );
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri,
  accessTokenSecret,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  refreshTokenSecret,
  refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  frontendUri,
};

export default config;
