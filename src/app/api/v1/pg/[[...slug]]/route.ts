import { Elysia } from "elysia";
import {
  getAllSchema,
  getTablesFromSchema,
  createTable,
} from "@/features/database/hooks";

const app = new Elysia({ prefix: "/api/v1/pg" })
  .get("/schema", async () => {
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
  .get("/tables/:schema", async (req) => {
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
  })
  .post("/table", async (req) => {
    try {
      const { schema, table, columns } = req.body as {
        schema: string;
        table: string;
        columns: any[];
      };
      await createTable(schema, table, columns);
      return {
        status: 200,
        message: "Success",
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
