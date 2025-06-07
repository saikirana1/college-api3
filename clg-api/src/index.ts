import { serve } from "@hono/node-server";
import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";
import { auth, type AuthType } from "../auth.js";
import { cors } from "hono/cors";

const prisma = new PrismaClient();

const app = new Hono<{
  Variables: {
    prisma: PrismaClient;
  };
  Bindings: AuthType;
}>();

app.use(
  "/api/auth/*",
  cors({
    origin: "http://localhost/5173",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.use(async (c, next) => {
  c.set("prisma", prisma);
  await next();
});

app.get("/v1/:resource", async (c) => {
  const prisma = c.get("prisma");
  const resource = c.req.param("resource") as keyof typeof prisma;
  const query = c.req.query();
  // @ts-ignore
  const result = await prisma[resource].findMany(query);
  return c.json(result);
});

app.post("/v1/:resource", async (c) => {
  const prisma = c.get("prisma");
  const resource = c.req.param("resource") as keyof typeof prisma;
  const data = c.req.json();
  // @ts-ignore
  await prisma[resource].create(data);
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
