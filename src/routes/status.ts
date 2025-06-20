import { createServerFileRoute } from "@tanstack/react-start/server";
import { createMiddleware, json } from "@tanstack/react-start";

const userLoggerMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    console.info("In: /status");
    const result = await next();
    console.info("Out: /status");
    return result;
  },
);

export const ServerRoute = createServerFileRoute("/status")
  .middleware([userLoggerMiddleware])
  .methods({
    GET: async () => {
      console.info("Fetching status");
      return json({ status: "ok", version: "1.0.0" });
    },
  });
