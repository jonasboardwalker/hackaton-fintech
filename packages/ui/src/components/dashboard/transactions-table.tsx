"use client"

import * as React from "react"
import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"

// Define the transaction data type
type Transaction = {
  id: string
  user: string
  amount: string
  status: "approved" | "blocked" | "pending"
  date: string
  rule: string
  method: string
}

// Mock data for transactions
const transactions: Transaction[] = [
  {
    id: "TX123456",
    user: "Sarah Johnson",
    amount: "$1,250.00",
    status: "approved",
    date: "2023-04-23T18:25:43.511Z",
    rule: "Business Hours",
    method: "Bank Transfer",
  },
  {
    id: "TX123457",
    user: "Michael Chen",
    amount: "$5,000.00",
    status: "blocked",
    date: "2023-04-23T20:43:23.511Z",
    rule: "After Hours Limit",
    method: "Wire Transfer",
  },
  {
    id: "TX123458",
    user: "Alex Rodriguez",
    amount: "$750.00",
    status: "approved",
    date: "2023-04-23T15:25:43.511Z",
    rule: "Junior Staff Limit",
    method: "ACH",
  },
  {
    id: "TX123459",
    user: "Emily Wong",
    amount: "$3,500.00",
    status: "pending",
    date: "2023-04-23T16:25:43.511Z",
    rule: "Manager Approval",
    method: "Wire Transfer",
  },
  {
    id: "TX123460",
    user: "David Kim",
    amount: "$2,100.00",
    status: "approved",
    date: "2023-04-23T14:25:43.511Z",
    rule: "Business Hours",
    method: "ACH",
  },
  {
    id: "TX123461",
    user: "Jessica Lee",
    amount: "$900.00",
    status: "approved",
    date: "2023-04-23T13:15:43.511Z",
    rule: "Junior Staff Limit",
    method: "Bank Transfer",
  },
  {
    id: "TX123462",
    user: "Robert Smith",
    amount: "$12,500.00",
    status: "blocked",
    date: "2023-04-23T19:35:43.511Z",
    rule: "High Value Transfer",
    method: "Wire Transfer",
  },
  {
    id: "TX123463",
    user: "Lisa Wang",
    amount: "$4,200.00",
    status: "pending",
    date: "2023-04-23T17:25:43.511Z",
    rule: "Manager Approval",
    method: "ACH",
  },
  {
    id: "TX123464",
    user: "James Wilson",
    amount: "$1,800.00",
    status: "approved",
    date: "2023-04-23T12:25:43.511Z",
    rule: "Business Hours",
    method: "Bank Transfer",
  },
  {
    id: "TX123465",
    user: "Maria Garcia",
    amount: "$3,300.00",
    status: "approved",
    date: "2023-04-23T11:45:43.511Z",
    rule: "Business Hours",
    method: "Wire Transfer",
  },
]

// Define the columns for the table
const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          User
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "method",
    header: "Method",
  },
  {
    accessorKey: "rule",
    header: "Applied Rule",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "approved" ? "outline" : status === "blocked" ? "destructive" : "secondary"}
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div>{new Date(row.getValue("date")).toLocaleString()}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View Details</DropdownMenuItem>
            {transaction.status === "pending" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Approve</DropdownMenuItem>
                <DropdownMenuItem>Reject</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: transactions,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("id")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredRowModel().rows.length} transaction(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

