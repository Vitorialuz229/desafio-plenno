'use client'

import { createClient } from '@/lib/client'
import { Member } from '@/types/member'
import { useEffect, useState } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { formatPhone } from '@/lib/utils/format'

type Props = {
  members: Member[]
}

export default function MemberTable({ members }: Props) {
  const supabase = createClient()

  const [localMembers, setLocalMembers] = useState<Member[]>([])
  const [page, setPage] = useState(1)

  const pageSize = 5

  useEffect(() => {
    setLocalMembers(members)
  }, [members])

  const totalPages = Math.ceil(localMembers.length / pageSize)

  const paginatedMembers = localMembers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  async function toggleStatus(id: string, current: boolean) {
    setLocalMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: !current } : m
      )
    )

    const { error } = await supabase
      .from('members')
      .update({ status: !current })
      .eq('id', id)

    if (error) {
      console.error(error)

      setLocalMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, status: current } : m
        )
      )
    }
  }

  return (
    <div className="rounded-xl border border-border/40 bg-card p-4 shadow-sm">

      {/* TABELA */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedMembers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                Nenhum membro cadastrado
              </TableCell>
            </TableRow>
          ) : (
            paginatedMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  {member.name}
                </TableCell>

                <TableCell>
                  {formatPhone(member.phone)}
                </TableCell>

                <TableCell>
                  {new Date(member.birth_date).toLocaleDateString('pt-BR')}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={member.status}
                      onCheckedChange={() =>
                        toggleStatus(member.id, member.status)
                      }
                    />
                    <span className="text-sm">
                      {member.status ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* PAGINAÇÃO */}
      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>

            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}