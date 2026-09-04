import Fastify from "fastify";
import multipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ingest } from "./domain/ingest";
import { getDailyPattern } from "./domain/getDailyPattern";
import { BUILDING_ID } from "./config";

const clientDist = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../dist/client",
);

export function buildApp() {
  const app = Fastify();

  app.register(multipart);
  app.register(fastifyStatic, { root: clientDist });

  app.post("/api/readings", async (request, reply) => {
    const file = await request.file();
    if (!file) {
      reply.code(400);
      return { error: "No file uploaded" };
    }
    const fileContents = (await file.toBuffer()).toString("utf-8");
    ingest(BUILDING_ID, fileContents);
    return { status: "ok" };
  });

  app.get<{ Querystring: { day: string } }>(
    "/api/daily-pattern",
    async (request, reply) => {
      const { day } = request.query;
      if (!day) {
        reply.code(400);
        return { error: "Query parameter 'day' is required" };
      }
      return getDailyPattern(BUILDING_ID, day);
    },
  );

  return app;
}
