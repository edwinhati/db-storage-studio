import { Elysia } from "elysia";
import { getAllSchema, getTablesFromSchema } from "../../function/pg";

const app = new Elysia({ prefix: "/api/v1" })
  .get("/pg/schema", async () => {
    try {
      const schemas = await getAllSchema();
      return {
        status: 200,
        message: "Success",
        data: schemas,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error",
        error: (error as Error).message,
      };
    }
  })
  .get("/pg/tables/:schema", async (req) => {
    try {
      const { schema } = req.params;
      const tables = await getTablesFromSchema(schema);
      return {
        status: 200,
        message: "Success",
        data: tables,
      };
    } catch (error) {
      return {
        status: 500,
        message: "Error",
        error: (error as Error).message,
      };
    }
  });

export const GET = app.handle;
export const POST = app.handle;
