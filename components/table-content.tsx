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
import { ArrowUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export type Payment = {
  id: string;
  city: string;
  surname: string;
  email: string;
};

export function DataTableDemo() {
  // Veri için state
  const [data, setData] = React.useState<Payment[]>([
    {
      id: "m5gr84i9",
      city: "Istanbul",
      surname: "Oguzhan Uguz",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      city: "Ankara",
      surname: "Ferhat Kaya",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      city: "Adana",
      surname: "Aysel Kaya",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      city: "Erzurum",
      surname: "Aleyna Yildiz",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      city: "Van",
      surname: "Carmella Kaya",
      email: "carmella@hotmail.com",
    },
  ]);

  // Silme fonksiyonu
  function handleDelete(id: string) {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData); // Yeni veriyi state'e güncelliyoruz
    console.log("Silinen id:", id);
  }

  // Düzenleme fonksiyonu
  function handleEdit(id: string) {
    // Burada edit işlemi yapılacak
    console.log("Düzenlenen id:", id);
  }

  const columns: ColumnDef<Payment>[] = [
    {
      accessorKey: "surname",
      header: "Surname",
      cell: ({ row }) => <div className="capitalize">{row.getValue("surname")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "city",
      header: () => <div className="">City</div>,
      cell: ({ row }) => {
        const city = row.getValue("city");
        return <div className=" font-medium">{city as string}</div>;
      },
    },
    {
      header: () => <div className="text-right">Button</div>,
      accessorKey: "id",
      cell: ({ row }) => (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" className="text-blue-500">
            <Link href={`/editStudent/${row.getValue("id")}`}>Edit</Link>
          </Button>
          {/* Sil Butonu */}
          <Button
            variant="outline"
            onClick={() => handleDelete(row.getValue("id"))}
            className="text-red-500">
            Sil
          </Button>
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

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
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
