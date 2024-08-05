"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { cn } from "@/utils";
import { useState, useEffect, Key } from "react";
import {
  Eye,
  Plus,
  Copy,
  Trash,
  Check,
  SquarePen,
  ArrowUpDown,
  LoaderCircle,
  MoreHorizontal,
  ChevronsUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import NewTableSheet from "@/features/database/components/sheets/new-table";

type Tables = {
  id: string;
  table_name: string;
  description: string;
  row_count: string;
  table_size: string;
  columns: string[];
};

const columns: ColumnDef<Tables>[] = [
  {
    accessorKey: "table_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="ml-5">{row.getValue("table_name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("description") || (
          <span className="text-gray-400">No description</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "row_count",
    header: "Rows",
    cell: ({ row }) => <div>{row.getValue("row_count")}</div>,
  },
  {
    accessorKey: "table_size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("table_size")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <Eye className="h-4 w-4 mr-2" />
              View table
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate table
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              <SquarePen className="h-4 w-4 mr-2" />
              Edit table
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}} className="text-red-500">
              <Trash className="h-4 w-4 mr-2" />
              Delete table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function TablesPage() {
  const [loading, setLoading] = useState(true);

  // Combobox state
  const [open, setOpen] = useState(false);
  const [schema, setSchema] = useState("public");
  const [schemas, setSchemas] = useState<{ schema_name: string }[]>([]);

  // Table state
  const [tables, setTables] = useState<Tables[]>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  // Fetch schemas
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/v1/pg/schema");
      const data = await response.json();
      setSchemas(data.data);
    }
    fetchData();
  }, []);

  // Fetch tables
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/v1/pg/tables/${schema}`);
      const data = await response.json();
      setTables(data.data);
    }
    fetchData();
  }, [schema]);

  useEffect(() => {
    if (schemas.length && tables) {
      setLoading(false);
    }
  }, [schemas, tables]);

  const table = useReactTable({
    columns,
    data: tables,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <SchemaCombobox
          open={open}
          setOpen={setOpen}
          loading={loading}
          schema={schema}
          schemas={schemas}
          setSchema={setSchema}
        />
        <Input
          placeholder="Search for a table"
          value={
            (table.getColumn("table_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("table_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <NewTableSheet
          schema={
            schemas.find((item) => item.schema_name === schema)?.schema_name
          }
        >
          <Button variant="outline" className="ml-auto">
            <Plus className="h-5 w-5 mr-1" />
            New table
          </Button>
        </NewTableSheet>
      </div>
      <div className="rounded-md border">
        <DatabaseTable
          table={table}
          loading={loading}
          schema={schema}
          schemas={schemas}
        />
      </div>
    </div>
  );
}

function SchemaCombobox({
  open,
  setOpen,
  loading,
  schema,
  schemas,
  setSchema,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  loading: boolean;
  schema: string;
  schemas: { schema_name: string }[];
  setSchema: (value: string) => void;
}) {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      {loading ? (
        <Button variant="outline" className="w-40 justify-between">
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Loading schemas
        </Button>
      ) : (
        <>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-40 justify-between"
            >
              {schema
                ? schemas.find((item) => item.schema_name === schema)
                    ?.schema_name
                : "Select schema"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0">
            <Command>
              <CommandInput placeholder="Search schema..." />
              <CommandList>
                <CommandEmpty>No schema found.</CommandEmpty>
                <CommandGroup>
                  {schemas.map((item) => (
                    <CommandItem
                      key={item.schema_name}
                      value={item.schema_name}
                      onSelect={(currentValue) => {
                        setSchema(currentValue === schema ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          schema === item.schema_name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {item.schema_name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}

function DatabaseTable({
  table,
  loading,
  schema,
  schemas,
}: {
  table: any;
  loading: boolean;
  schema: string;
  schemas: { schema_name: string }[];
}) {
  return (
    <Table>
      <TableHeader>
        {table
          .getHeaderGroups()
          .map(
            (headerGroup: { id: Key | null | undefined; headers: any[] }) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            )
          )}
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell colSpan={columns.length} className="space-y-2">
              <Skeleton className="w-full h-[20px] rounded-md" />
              <Skeleton className="w-full h-[20px] rounded-md" />
            </TableCell>
          </TableRow>
        ) : (
          <>
            {table.getRowModel()?.rows?.length ? (
              table
                .getRowModel()
                .rows.map(
                  (row: {
                    id: Key | null | undefined;
                    getVisibleCells: () => any[];
                  }) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  )
                )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No tables found in{" "}
                  <span className="font-semibold">
                    {
                      schemas.find((item) => item.schema_name === schema)
                        ?.schema_name
                    }
                  </span>{" "}
                  schema
                </TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
}
