import { z } from "zod";

const toBoolean = (value: string) => {
  if (value === "true") return true;
  if (value === "false") return false;
  throw new Error(`Invalid boolean value: ${value}`);
};

process.env.DATABASE_URL = `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
process.env.API_BASE_URL = `http://localhost:${process.env.API_PORT}`;
process.env.WEB_BASE_URL = `http://localhost:${process.env.WEB_PORT}`;

const envSchema = z.object({
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number().int().min(1).max(65535),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DATABASE_URL: z.string().url({ message: "DATABASE_URL must be a valid URL" }),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3333),
  API_BASE_URL: z.string().url(),
  WEB_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  WEB_BASE_URL: z.string().url(),
  EMAIL_HOST: z.string(),
  EMAIL_PORT: z.coerce.number().int().min(1).max(65535),
  EMAIL_SECURE: z.preprocess((value) => {
    if (typeof value === "string") return toBoolean(value);
    return value;
  }, z.boolean({ message: "EMAIL_SECURE must be a boolean" })),
  EMAIL_NAME: z.string(),
  EMAIL_USER: z.string().email({ message: "EMAIL_USER must be a valid email" }),
  EMAIL_PASS: z.string(),
});

export const env = envSchema.parse(process.env);
