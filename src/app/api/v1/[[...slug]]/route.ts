import pg from "pg";
import { Elysia } from "elysia";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

const getAllSchema = async () => {
  const schemaQuery = `
    SELECT
        schema_name,
        has_schema_privilege(schema_name, 'USAGE') AS has_usage,
        has_schema_privilege(schema_name, 'CREATE') AS has_create
    FROM
        information_schema.schemata;
  `;

  const schemaRes = await pool.query(schemaQuery);
  const schemas = schemaRes.rows;

  for (let schema of schemas) {
    const tableQuery = `
      SELECT
          table_name,
          has_table_privilege(format('%I.%I', table_schema, table_name), 'SELECT') AS has_select,
          has_table_privilege(format('%I.%I', table_schema, table_name), 'INSERT') AS has_insert,
          has_table_privilege(format('%I.%I', table_schema, table_name), 'UPDATE') AS has_update,
          has_table_privilege(format('%I.%I', table_schema, table_name), 'DELETE') AS has_delete
      FROM
          information_schema.tables
      WHERE
          table_schema = $1
      AND table_type = 'BASE TABLE';
    `;

    const tableRes = await pool.query(tableQuery, [schema.schema_name]);
    const tables = tableRes.rows;

    schema.is_read_only = tables.every(
      (table) =>
        table.has_select &&
        !table.has_insert &&
        !table.has_update &&
        !table.has_delete
    );
  }

  return schemas;
};

const getTablesFromSchema = async (schemaName: string) => {
  const res = await pool.query(
    `SELECT
      c.relname AS table_name,
      obj_description(c.oid) AS description,
      s.n_live_tup AS row_count,
      a.attname AS column_name,
      pg_size_pretty(pg_total_relation_size(c.oid)) AS table_size
    FROM
      pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      LEFT JOIN pg_description d ON d.objoid = c.oid
      LEFT JOIN pg_stat_all_tables s ON s.relid = c.oid
      LEFT JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum > 0 AND NOT a.attisdropped
    WHERE
      n.nspname = $1
      AND c.relkind = 'r'
    ORDER BY
      c.relname, a.attnum;`,
    [schemaName]
  );

  const tables = res.rows.reduce((acc, row) => {
    if (!acc[row.table_name]) {
      acc[row.table_name] = {
        description: row.description,
        row_count: row.row_count,
        table_size: row.table_size,
        columns: [],
      };
    }
    acc[row.table_name].columns.push(row.column_name);
    return acc;
  }, {});

  return Object.entries(tables).map(([table_name, details]: [string, any]) => ({
      table_name,
      ...details,
  }));
};
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
