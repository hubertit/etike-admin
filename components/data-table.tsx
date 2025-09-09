import type React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Column {
  key: string
  label: string
  render?: (value: any, row: any, index?: number) => React.ReactNode
}

interface DataTableProps {
  title: string
  columns: Column[]
  data: any[]
  actions?: React.ReactNode
}

export function DataTable({ title, columns, data, actions }: DataTableProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {actions}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.key === columns[0].key ? "font-medium" : ""}>
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
