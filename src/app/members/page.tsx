'use client'

import MemberForm from '@/components/members/MemberForm'
import MemberTable from '@/components/members/MemberTable'
import { createClient } from '@/lib/client'
import { Member } from '@/types/member'
import { useEffect, useState } from 'react'

export default function MembersPage() {
  const supabase = createClient()
  const [members, setMembers] = useState<Member[]>([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'todos' | 'ativos' | 'inativos'>('todos')

  async function fetchMembers() {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Erro ao buscar membros:', error)
      return
    }

    setMembers(data ?? [])
  }

  useEffect(() => { fetchMembers() }, [])

  const total = members.length
  const ativos = members.filter((m) => m.status).length
  const inativos = total - ativos

  const filtered = members.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'todos' ? true :
        filter === 'ativos' ? m.status :
          !m.status
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-muted/30 p-8 md:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium text-foreground">Membros</h1>
          <p className="text-base text-muted-foreground mt-1">
            Gerencie os membros da sua igreja.
          </p>
        </div>

        <MemberForm onSuccess={fetchMembers} />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Total de membros', value: total, sub: 'Registrados no sistema' },
          { label: 'Membros ativos', value: ativos, sub: `${total ? Math.round((ativos / total) * 100) : 0}% do total` },
          { label: 'Inativos', value: inativos, sub: 'Aguardando reativação' },
        ].map((s) => (
          <div key={s.label} className="bg-muted/60 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">{s.label}</p>
            <p className="text-3xl font-medium">{s.value}</p>
            <p className="text-sm text-muted-foreground/70 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 gap-6 items-start">

        {/* Table card */}
        <div className="bg-card border border-border/40 rounded-xl p-6">
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/30">
            <div>
              <p className="text-lg font-medium">Lista de membros</p>
              <p className="text-sm text-muted-foreground mt-0.5">
                {total} membro{total !== 1 ? 's' : ''} registrado{total !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Search + filter */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              placeholder="Buscar membro..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 h-9 px-3 text-sm border border-border/50 rounded-lg bg-muted/40 outline-none focus:bg-background transition-colors"
            />
            {(['todos', 'ativos', 'inativos'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-9 px-3 text-xs rounded-lg border transition-colors capitalize ${filter === f
                  ? 'bg-foreground text-background border-transparent'
                  : 'border-border/50 text-muted-foreground hover:bg-muted/40'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <MemberTable members={filtered} />
        </div>
      </div>
    </div>
  )
}