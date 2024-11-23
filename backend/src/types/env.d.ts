import { JsonWebKeyInput, PrivateKeyInput } from "crypto";
import { Secret } from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      JWT_SECRET: string;
      PORT: string;
    }
  }
}

export {};
