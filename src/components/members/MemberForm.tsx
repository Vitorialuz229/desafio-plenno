'use client'

import { createClient } from '@/src/lib/supabaseClient'
import { useState } from 'react'

type Props = {
  onSuccess: () => void
}

export default function MemberForm({ onSuccess }: Props) {
  const supabase = createClient()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [status, setStatus] = useState(true)

  async function handleSubmit(e: any) {
    e.preventDefault()

    const { error } = await supabase.from('members').insert([
      {
        name,
        phone,
        birth_date: birthDate,
        status
      }
    ])

    if (error) {
      console.error(error)
      return
    }

    setName('')
    setPhone('')
    setBirthDate('')
    setStatus(true)

    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          placeholder="Digite o nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Telefone</Label>
        <Input
          placeholder="(xx) xxxxx-xxxx"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Data de nascimento</Label>
        <Input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          checked={status}
          onCheckedChange={(checked) => setStatus(!!checked)}
        />
        <Label>Ativo</Label>
      </div>

      <Button type="submit" className="w-full">
        Cadastrar membro
      </Button>
    </form>
  )
}