'use client'

import MemberForm from '@/src/components/members/MemberForm'
import MemberTable from '@/src/components/members/MemberTable'
import { createClient } from '@/src/lib/supabaseClient'
import { Member } from '@/src/types/member'
import { useEffect, useState } from 'react'

export default function MembersPage() {
  const supabase = createClient()

  const [members, setMembers] = useState<Member[]>([])

  async function fetchMembers() {
    const { data, error } = await supabase
      .from('members')
      .select('*')

    if (error) {
      console.error(error)
      return
    }

    setMembers(data)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Membros</h1>

      <MemberForm onSuccess={fetchMembers} />

      <MemberTable members={members} />
    </div>
  )
}