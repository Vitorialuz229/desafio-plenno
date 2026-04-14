'use client'

import { Member } from "@/src/types/member"

type Props = {
  members: Member[]
}

export default function MemberTable({ members }: Props) {
  return (
    <div>
      {members.map((member) => (
        <div key={member.id} className="border p-2 mb-2">
          <p><strong>{member.name}</strong></p>
          <p>{member.phone}</p>
          <p>{member.status ? 'Ativo' : 'Inativo'}</p>
        </div>
      ))}
    </div>
  )
}