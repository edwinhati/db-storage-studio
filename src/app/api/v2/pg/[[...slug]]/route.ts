import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getAllSchema, getTablesFromSchema } from "@/features/database/hooks";

const app = new Hono().basePath("/api/v2/pg");

app.get("/schema", async (c) => {
  try {
    const schemas = await getAllSchema();
    return c.json({
      status: 200,
      message: "Success",
      data: schemas,
    });
  } catch (error) {
    return c.json({
      status: 500,
      message: "Error",
      error: (error as Error).message,
    });
  }
});

app.get("/tables/:schema", async (c) => {
  try {
    const schema = c.req.param("schema");
    const tables = await getTablesFromSchema(schema);
    return c.json({
      status: 200,
      message: "Success",
      data: tables,
    });
  } catch (error) {
    return c.json({
      status: 500,
      message: "Error",
      error: (error as Error).message,
    });
  }
});

export const GET = handle(app);
export const POST = handle(app);
