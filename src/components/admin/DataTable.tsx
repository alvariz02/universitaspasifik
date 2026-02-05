'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Pencil, Trash2, MoreVertical, Plus } from 'lucide-react'

interface Column {
  key: string
  title: string
  render?: (value: any, row: any) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  onEdit?: (id: number, row: any) => void
  onView?: (id: number, row: any) => void
  onDelete?: (id: number, row: any) => void
  onAdd?: () => void
  searchable?: boolean
  searchPlaceholder?: string
  addButtonText?: string
}

export default function DataTable({
  columns,
  data,
  onEdit,
  onView,
  onDelete,
  onAdd,
  searchable = true,
  searchPlaceholder = 'Cari...',
  addButtonText = 'Tambah Data',
}: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        {searchable && (
          <div className="flex-1 max-w-sm">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-unipas-primary/20 focus:border-unipas-accent"
            />
          </div>
        )}
        {onAdd && (
          <Button onClick={onAdd} className="bg-linear-to-r from-unipas-primary to-unipas-accent text-white hover:from-unipas-accent hover:to-unipas-primary shadow-lg hover:shadow-xl transition-all duration-300">
            <Plus className="h-4 w-4 mr-2" />
            {addButtonText}
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-unipas-primary/20 bg-white overflow-x-auto shadow-lg">
        <div className="min-w-180">
          <Table>
          <TableHeader>
            <TableRow className="bg-unipas-muted">
              {columns.map((column) => (
                <TableHead key={column.key} className="text-unipas-primary font-semibold">{column.title}</TableHead>
              ))}
              <TableHead className="w-25 text-unipas-primary font-semibold">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center py-8 text-unipas-text"
                >
                  Tidak ada data
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        typeof row[column.key] === 'string' && row[column.key].length > 60 ? (
                          <div title={row[column.key]} className="truncate max-w-75">{row[column.key].slice(0, 60)}…</div>
                        ) : (
                          String(row[column.key] ?? '')
                        )
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-unipas-accent/10">
                          <MoreVertical className="h-4 w-4 text-unipas-primary" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="border-unipas-primary/20">
                        {onView && (
                          <DropdownMenuItem onClick={() => onView(row.id, row)} className="hover:bg-unipas-accent/10">
                            <Plus className="h-4 w-4 mr-2 text-unipas-primary" />
                            <span className="text-unipas-primary">Lihat</span>
                          </DropdownMenuItem>
                        )}
                        {onEdit && (
                          <DropdownMenuItem onClick={() => onEdit(row.id, row)} className="hover:bg-unipas-accent/10">
                            <Pencil className="h-4 w-4 mr-2 text-unipas-primary" />
                            <span className="text-unipas-primary">Edit</span>
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem
                            onClick={() => onDelete(row.id, row)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Hapus
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination info */}
      <div className="text-sm text-unipas-text bg-white rounded-lg px-4 py-2 border border-unipas-primary/20">
        Menampilkan {filteredData.length} dari {data.length} data
      </div>
    </div>
  )
}
