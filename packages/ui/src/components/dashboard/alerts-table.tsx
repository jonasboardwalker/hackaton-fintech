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

// Define the alert data type
type Alert = {
  id: string
  transactionId: string
  user: string
  amount: string
  rule: string
  priority: "high" | "medium" | "low"
  date: string
  status: "pending" | "resolved" | "dismissed"
}

// Mock data for alerts
const alerts: Alert[] = [
  {
    id: "ALERT-001",
    transactionId: "TX123457",
    user: "Michael Chen",
    amount: "$5,000.00",
    rule: "After Hours Limit",
    priority: "high",
    date: "2023-04-23T20:43:23.511Z",
    status: "pending",
  },
  {
    id: "ALERT-002",
    transactionId: "TX123459",
    user: "Emily Wong",
    amount: "$3,500.00",
    rule: "Manager Approval",
    priority: "medium",
    date: "2023-04-23T16:25:43.511Z",
    status: "pending",
  },
  {
    id: "ALERT-003",
    transactionId: "TX123462",
    user: "Robert Smith",
    amount: "$12,500.00",
    rule: "High Value Transfer",
    priority: "high",
    date: "2023-04-23T19:35:43.511Z",
    status: "pending",
  },
  {
    id: "ALERT-004",
    transactionId: "TX123463",
    user: "Lisa Wang",
    amount: "$4,200.00",
    rule: "Manager Approval",
    priority: "medium",
    date: "2023-04-23T17:25:43.511Z",
    status: "pending",
  },
  {
    id: "ALERT-005",
    transactionId: "TX123470",
    user: "John Smith",
    amount: "$7,800.00",
    rule: "Geo Restriction",
    priority: "high",
    date: "2023-04-23T18:15:43.511Z",
    status: "pending",
  },
  {
    id: "ALERT-006",
    transactionId: "TX123471",
    user: "Anna Martinez",
    amount: "$2,300.00",
    rule: "Velocity Control",
    priority: "low",
    date: "2023-04-23T15:45:43.511Z",
    status: "pending",
  },
  {
    id: "ALERT-007",
    transactionId: "TX123472",
    user: "Kevin Park",
    amount: "$1,900.00",
    rule: "Weekend Approvals",
    priority: "low",
    date: "2023-04-23T14:25:43.511Z",
    status: "pending",
  },
]

// Define the columns for the table
const columns: ColumnDef<Alert>[] = [
  {
    accessorKey: "id",
    header: "Alert ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
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
    header: "Amount",
  },
  {
    accessorKey: "rule",
    header: "Triggered Rule",
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return (
        <Badge
          variant={priority === "high" ? "destructive" : priority === "medium" ? "default" : "outline"}
          className="capitalize"
        >
          {priority}
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
      const alert = row.original

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
            <DropdownMenuSeparator />
            <DropdownMenuItem>Resolve Alert</DropdownMenuItem>
            <DropdownMenuItem>Dismiss Alert</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AlertsTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data: alerts,
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
          placeholder="Filter alerts..."
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
                  No alerts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">{table.getFilteredRowModel().rows.length} alert(s).</div>
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

