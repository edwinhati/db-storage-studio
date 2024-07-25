import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getAllSchema, getTablesFromSchema } from "../../function/pg";

const app = new Hono().basePath("/api/v2");

app.get("/hello", (c) => {
  return c.json({
    message: "Hello Next.js!",
  });
});

app.get("/pg/schema", async (c) => {
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

app.get("/pg/tables/:schema", async (c) => {
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
