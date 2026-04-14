'use client'

import { Tithe } from '@/types/tithe'
import { format } from 'date-fns'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Props = {
  tithes: Tithe[]
}

export default function TitheTable({ tithes }: Props) {
  return (
    <div className="rounded-xl border border-border/40 bg-card shadow-sm">

      <Table>

        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {tithes.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center text-muted-foreground py-6"
              >
                Nenhum dízimo registrado
              </TableCell>
            </TableRow>
          ) : (
            tithes.map((t) => (
              <TableRow key={t.id}>
                <TableCell>
                  {format(new Date(t.date), 'dd/MM/yyyy')}
                </TableCell>

                <TableCell className="font-medium">
                  R$ {Number(t.amount).toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

      </Table>
    </div>
  )
}