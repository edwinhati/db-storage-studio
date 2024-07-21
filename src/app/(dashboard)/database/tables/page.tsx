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
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Eye,
  Plus,
  Copy,
  Trash,
  Check,
  SquarePen,
  ArrowUpDown,
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

const data = [
  {
    id: 1,
    name: "users",
    columns: ["id", "username", "email", "created_at"],
    description: "Table containing user information",
    row: 1000,
    size: "10MB",
  },
  {
    id: 2,
    name: "orders",
    columns: ["id", "user_id", "product_id", "quantity", "status"],
    description: "Table containing order information",
    row: 5000,
    size: "25MB",
  },
  {
    id: 3,
    name: "products",
    columns: ["id", "name", "description", "price", "stock"],
    description: "Table containing product information",
    row: 200,
    size: "5MB",
  },
  {
    id: 4,
    name: "categories",
    columns: ["id", "name", "description"],
    description: "Table containing category information",
    row: 50,
    size: "1MB",
  },
  {
    id: 5,
    name: "customers",
    columns: ["id", "first_name", "last_name", "email", "phone"],
    description: "Table containing customer information",
    row: 1000,
    size: "8MB",
  },
  {
    id: 6,
    name: "inventory",
    columns: ["id", "product_id", "quantity"],
    description: "Table containing inventory information",
    row: 300,
    size: "2MB",
  },
  {
    id: 7,
    name: "sales",
    columns: ["id", "product_id", "amount", "sale_date"],
    description: "Table containing sales information",
    row: 2000,
    size: "15MB",
  },
  {
    id: 8,
    name: "employees",
    columns: ["id", "first_name", "last_name", "position", "salary"],
    description: "Table containing employee information",
    row: 100,
    size: "3MB",
  },
  {
    id: 9,
    name: "departments",
    columns: ["id", "name", "manager_id"],
    description: "Table containing department information",
    row: 10,
    size: "500KB",
  },
  {
    id: 10,
    name: "suppliers",
    columns: ["id", "name", "contact_info"],
    description: "Table containing supplier information",
    row: 50,
    size: "1MB",
  },
];

const schemas = [
  {
    value: "public",
    label: "Public",
  },
  {
    value: "private",
    label: "Private",
  },
];

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
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
    cell: ({ row }) => <div className="ml-5">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "row",
    header: "Rows",
    cell: ({ row }) => <div>{row.getValue("row")}</div>,
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => <div>{row.getValue("size")}</div>,
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

export default function DataTableDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("public");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
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
    <div className="w-full p-4">
      <div className="flex items-center py-4 gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? schemas.find((schema) => schema.value === value)?.label
                : "Select schema"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search schema..." />
              <CommandEmpty>No schema found.</CommandEmpty>
              <CommandGroup>
                {schemas.map((schema) => (
                  <CommandItem
                    key={schema.value}
                    value={schema.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === schema.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {schema.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          placeholder="Search for a table"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Button variant="outline" className="ml-auto">
          <Plus className="h-5 w-5 mr-1" />
          New table
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
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
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}