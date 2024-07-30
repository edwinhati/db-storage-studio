"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().nonempty("Please provide a name for your new table."),
  description: z.string().optional(),
  columns: z.array(
    z.object({
      name: z.string().nonempty("Please provide a name for the column."),
      type: z.string().nonempty("Please provide a type for the column."),
      defaultValue: z.string().optional(),
      primaryKey: z.boolean().optional(),
    })
  ),
});

// source: https://www.postgresql.org/docs/current/datatype.html
const postgresDataTypes = [
  "SERIAL",
  "BIGSERIAL",
  "SMALLSERIAL",
  "CHAR",
  "VARCHAR",
  "TEXT",
  "INTEGER",
  "BIGINT",
  "SMALLINT",
  "BOOLEAN",
  "DATE",
  "TIMESTAMP",
  "TIMESTAMPTZ",
  "TIME",
  "TIMETZ",
  "INTERVAL",
  "NUMERIC",
  "DECIMAL",
  "REAL",
  "DOUBLE PRECISION",
  "MONEY",
  "UUID",
  "ARRAY",
  "JSON",
  "JSONB",
  "BYTEA",
  "CIDR",
  "INET",
  "MACADDR",
  "TSQUERY",
  "TSVECTOR",
  "XML",
];

export default function NewTableForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      columns: [
        {
          name: "id",
          type: "SERIAL",
          defaultValue: "",
          primaryKey: true,
        },
        {
          name: "created_at",
          type: "TIMESTAMP",
          defaultValue: "",
        },
        {
          name: "updated_at",
          type: "TIMESTAMP",
          defaultValue: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "columns",
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ScrollArea className="h-[540px]">
          <div className="mr-5 ml-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormDescription>
                    A unique name for the table. Should be descriptive.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="optional" {...field} />
                  </FormControl>
                  <FormDescription>
                    A brief description of the table.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="mt-5" />
            <h2 className="text-lg font-semibold mt-5">Columns</h2>
            <Table>
              <TableCaption></TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Default Value</TableHead>
                  <TableHead>Primary</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.map((field, index) => (
                  <TableRow key={field.id}>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`columns.${index}.name`}
                        render={({ field }) => (
                          <FormControl>
                            <Input placeholder="" {...field} />
                          </FormControl>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`columns.${index}.type`}
                        render={({ field }) => (
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger className="ml-2">
                                <SelectValue placeholder={field.value} />
                              </SelectTrigger>
                              <SelectContent>
                                {postgresDataTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form.control}
                        name={`columns.${index}.defaultValue`}
                        render={({ field }) => (
                          <FormControl>
                            <Input placeholder="NULL" {...field} />
                          </FormControl>
                        )}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <FormField
                        control={form.control}
                        name={`columns.${index}.primaryKey`}
                        render={({ field }) => (
                          <FormControl>
                            <Checkbox
                              {...field}
                              value={field.value ? "true" : "false"}
                            />
                          </FormControl>
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <X size="16" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div
              className="flex justify-center items-center border border-gray-700 border-dashed rounded-md mt-5 p-2"
              onClick={() => {
                append({ name: "", type: "", primaryKey: false });
              }}
            >
              Add Column
            </div>
          </div>
        </ScrollArea>
        <Button className="w-full" type="submit">
          Save
        </Button>
      </form>
    </Form>
  );
}
