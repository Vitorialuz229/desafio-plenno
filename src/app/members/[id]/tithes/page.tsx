'use client'

import { createClient } from '@/lib/client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import TitheFormModal from '@/components/tithes/TitheFormModal'
import TitheSummary from '@/components/tithes/TitheSummary'

import TitheTable from '@/components/tithes/TitheTable'
import { Tithe } from '@/types/tithe'

export default function TithesPage() {
  const { id } = useParams<{ id: string }>()
  const memberId = id

  const supabase = createClient()

  const [tithes, setTithes] = useState<Tithe[]>([])
  const [memberName, setMemberName] = useState('')

  async function fetchData() {
    if (!memberId) return

    const [tithesRes, memberRes] = await Promise.all([
      supabase
        .from('tithes')
        .select('*')
        .eq('member_id', memberId)
        .order('date', { ascending: false }),

      supabase
        .from('members')
        .select('name')
        .eq('id', memberId)
        .single(),
    ])

    if (!tithesRes.error) setTithes(tithesRes.data || [])
    if (!memberRes.error) setMemberName(memberRes.data.name)
  }

  useEffect(() => {
    fetchData()
  }, [memberId])

  return (
    <div className="p-8 space-y-6">

      {/* HEADER */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Dízimos do Membro - {memberName || '...'}
          </h1>

          <p className="text-sm text-muted-foreground mt-1">
            Histórico de contribuições do membro
          </p>
        </div>

        {/* BOTÃO TOP RIGHT */}
        <TitheFormModal
          memberId={memberId}
          onSuccess={fetchData}
        />
      </div>

      {/* RESUMO */}
      <div className="shadow-sm">
        <TitheSummary tithes={tithes} />
      </div>

      {/* LISTA */}
      <div className="shadow-sm">
        <TitheTable tithes={tithes} />
      </div>

    </div>
  )
}