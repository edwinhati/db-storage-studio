// yourModuleName.test.js
import pg from "pg";
import {
  getAllSchema,
  getTablesFromSchema,
  createTable,
} from "@/app/api/function/pg";

jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

const mockPool = new pg.Pool();

describe("getAllSchema", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all schemas with their privileges and check if they are read-only", async () => {
    const schemaQueryResult = {
      rows: [
        { schema_name: "public", has_usage: true, has_create: true },
        { schema_name: "readonly", has_usage: true, has_create: false },
      ],
    };

    const tableQueryResult = {
      rows: [
        {
          table_name: "table1",
          has_select: true,
          has_insert: false,
          has_update: false,
          has_delete: false,
        },
      ],
    };

    (mockPool.query as jest.Mock)
      .mockResolvedValueOnce(schemaQueryResult)
      .mockResolvedValueOnce(tableQueryResult)
      .mockResolvedValueOnce(tableQueryResult);

    const result = await getAllSchema();

    expect(mockPool.query).toHaveBeenCalledTimes(3);
    expect(result).toEqual([
      {
        schema_name: "public",
        has_usage: true,
        has_create: true,
        is_read_only: true,
      },
      {
        schema_name: "readonly",
        has_usage: true,
        has_create: false,
        is_read_only: true,
      },
    ]);
  });
});

describe("getTablesFromSchema", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all tables and their details from a given schema", async () => {
    const tableQueryResult = {
      rows: [
        {
          table_name: "table1",
          description: "desc1",
          row_count: 10,
          column_name: "col1",
          table_size: "10 MB",
        },
        {
          table_name: "table1",
          description: "desc1",
          row_count: 10,
          column_name: "col2",
          table_size: "10 MB",
        },
        {
          table_name: "table2",
          description: "desc2",
          row_count: 5,
          column_name: "col1",
          table_size: "5 MB",
        },
      ],
    };

    (mockPool.query as jest.Mock).mockResolvedValueOnce(tableQueryResult);

    const result = await getTablesFromSchema("public");

    expect(mockPool.query).toHaveBeenCalledWith(expect.any(String), ["public"]);
    expect(result).toEqual([
      {
        table_name: "table1",
        description: "desc1",
        row_count: 10,
        table_size: "10 MB",
        columns: ["col1", "col2"],
      },
      {
        table_name: "table2",
        description: "desc2",
        row_count: 5,
        table_size: "5 MB",
        columns: ["col1"],
      },
    ]);
  });

  describe("CREATE a table", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("should create a table with the specified columns and add comments", async () => {
      const schemaName = "public";
      const tableName = "testTable";
      const columns = [
        { name: "id", type: "SERIAL", primaryKey: true },
        {
          name: "name",
          type: "VARCHAR(100)",
          description: "Name of the entity",
        },
        {
          name: "ref_id",
          type: "INT",
          foreignKey: { table: "refTable", column: "id" },
          description: "Reference ID",
        },
      ];

      await createTable(schemaName, tableName, columns);

      const expectedCreateTableQuery = `CREATE TABLE "public"."testTable" ("id" SERIAL PRIMARY KEY, "name" VARCHAR(100), "ref_id" INT REFERENCES refTable(id));`;
      expect(mockPool.query).toHaveBeenCalledWith(expectedCreateTableQuery);

      const expectedCommentQueries = [
        `COMMENT ON COLUMN "public"."testTable"."name" IS 'Name of the entity';`,
        `COMMENT ON COLUMN "public"."testTable"."ref_id" IS 'Reference ID';`,
      ];

      expect(mockPool.query).toHaveBeenCalledWith(expectedCommentQueries[0]);
      expect(mockPool.query).toHaveBeenCalledWith(expectedCommentQueries[1]);

      expect(mockPool.query).toHaveBeenCalledTimes(3); // 1 for create table, 2 for comments
    });
  });
});
