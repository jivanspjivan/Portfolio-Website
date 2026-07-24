import { neon } from "@neondatabase/serverless";

let sql;

export function database() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
  sql ??= neon(process.env.DATABASE_URL);
  return sql;
}

export async function initializeDatabase() {
  const db = database();
  await db`
    CREATE TABLE IF NOT EXISTS visitors (
      id BIGSERIAL PRIMARY KEY,
      ip_hash TEXT NOT NULL,
      raw_ip TEXT,
      country TEXT,
      region TEXT,
      city TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      device_type TEXT,
      browser TEXT,
      os TEXT,
      path TEXT,
      referrer TEXT,
      screen TEXT,
      visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`
    CREATE TABLE IF NOT EXISTS contacts (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      company TEXT,
      message TEXT NOT NULL,
      ip_hash TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
}

