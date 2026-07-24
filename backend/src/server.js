import "dotenv/config";
import crypto from "node:crypto";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { UAParser } from "ua-parser-js";
import { z } from "zod";
import { database, initializeDatabase } from "./db.js";

const app = express();
const port = Number(process.env.PORT || 3001);
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: frontendUrl }));
app.use(express.json({ limit: "20kb" }));
app.use("/api", rateLimit({ windowMs: 15 * 60 * 1000, limit: 120, standardHeaders: true }));

function clientIp(req) {
  return (req.headers["cf-connecting-ip"] || req.headers["x-real-ip"] || req.ip || "")
    .toString()
    .split(",")[0]
    .trim()
    .replace(/^::ffff:/, "");
}

function hashIp(ip) {
  return crypto
    .createHash("sha256")
    .update(`${process.env.IP_HASH_SALT || "local-development"}:${ip}`)
    .digest("hex");
}

function locationFromHeaders(req) {
  // Vercel and Cloudflare add geolocation headers at the edge. This avoids
  // sending visitor IPs to a third-party IP lookup service.
  return {
    country: req.headers["x-vercel-ip-country"] || req.headers["cf-ipcountry"] || null,
    region: req.headers["x-vercel-ip-country-region"] || null,
    city: req.headers["x-vercel-ip-city"] || null,
    latitude: Number(req.headers["x-vercel-ip-latitude"]) || null,
    longitude: Number(req.headers["x-vercel-ip-longitude"]) || null,
  };
}

function headerText(value) {
  return Array.isArray(value) ? value[0] : value || null;
}

const visitSchema = z.object({
  path: z.string().max(500).default("/"),
  referrer: z.string().max(1000).nullable().optional(),
  screen: z.string().max(30).optional(),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  company: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(3000),
});

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.post("/api/visit", async (req, res, next) => {
  try {
    const input = visitSchema.parse(req.body);
    const ip = clientIp(req);
    const agent = new UAParser(headerText(req.headers["user-agent"]) || "").getResult();
    const location = locationFromHeaders(req);
    const db = database();

    await db`
      INSERT INTO visitors (
        ip_hash, raw_ip, country, region, city, latitude, longitude,
        device_type, browser, os, path, referrer, screen
      ) VALUES (
        ${hashIp(ip)},
        ${process.env.STORE_RAW_IP === "true" ? ip : null},
        ${location.country}, ${location.region}, ${location.city},
        ${location.latitude}, ${location.longitude},
        ${agent.device.type || "desktop"}, ${agent.browser.name || null},
        ${agent.os.name || null}, ${input.path}, ${input.referrer || null},
        ${input.screen || null}
      )
    `;
    res.status(201).json({ recorded: true });
  } catch (error) {
    next(error);
  }
});

app.post(
  "/api/contact",
  rateLimit({ windowMs: 60 * 60 * 1000, limit: 8 }),
  async (req, res, next) => {
    try {
      const input = contactSchema.parse(req.body);
      const db = database();
      await db`
        INSERT INTO contacts (name, email, company, message, ip_hash)
        VALUES (${input.name}, ${input.email}, ${input.company || null},
          ${input.message}, ${hashIp(clientIp(req))})
      `;
      res.status(201).json({ message: "Thanks — your message has been saved." });
    } catch (error) {
      next(error);
    }
  },
);

app.use((error, _req, res, _next) => {
  if (error instanceof z.ZodError) {
    return res.status(400).json({ message: error.issues[0]?.message || "Invalid input." });
  }
  console.error(error);
  return res.status(500).json({ message: "The server could not process this request." });
});

initializeDatabase()
  .then(() => app.listen(port, () => console.log(`Portfolio API running on port ${port}`)))
  .catch((error) => {
    const detail =
      error.message ||
      error.errors?.map((item) => item.message).join("; ") ||
      error.code ||
      "Unknown database connection error";
    console.error("Database initialization failed:", detail);
    process.exit(1);
  });
