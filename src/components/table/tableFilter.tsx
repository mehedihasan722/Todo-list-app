import * as React from "react";
import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface TableFilterProps<TData> {
  table: Table<TData>;
  column: string;
  variant?: VariantProps<typeof tableFilterVariants>["variant"];
  size?: VariantProps<typeof tableFilterVariants>["size"];
  className?: string;
}

const tableFilterVariants = cva("outline-none", {
  variants: {
    variant: {
      default: "outline-background",
      secondary: "outline-secondary",
      destructive: "outline-destructive",
    },
    size: {
      default: "max-w-xs",
      mid: "w-56",
      lg: "w-64",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});
const TableFilter = <TData,>({
  table,
  column,
  variant,
  size,
  className,
}: TableFilterProps<TData>) => {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={`Filter ${column}. . .`}
        value={(table.getColumn(`${column}`)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(`${column}`)?.setFilterValue(event.target.value)
        }
        className={cn(tableFilterVariants({ variant, size }), className)}
      />
    </div>
  );
};

export default TableFilter;
