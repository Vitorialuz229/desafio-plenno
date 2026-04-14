'use client'

import { useState } from 'react'
import { createClient } from '@/lib/client'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Props = {
  memberId: string
  onSuccess: () => void
}

export default function TitheForm({ memberId, onSuccess }: Props) {
  const supabase = createClient()

  const [value, setValue] = useState('')
  const [date, setDate] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log("clicou")

    console.log({ memberId, value, date })

    const { data, error } = await supabase
      .from('tithes')
      .insert([
        {
          member_id: memberId,
          amount: Number(value),
          date,
        },
      ])
      .select()

    console.log('insert response:', { data, error })

    if (error) {
      console.error('Erro ao inserir:', error.message)
      return
    }

    setValue('')
    setDate('')
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* VALOR */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Valor
        </Label>

        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ex: 100,00"
          className="h-11"
        />
      </div>

      {/* DATA */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          Data
        </Label>

        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="h-11"
        />
      </div>

      {/* BOTÃO */}
      <Button type="submit" className="w-full h-11 font-medium">
        Adicionar dízimo
      </Button>

    </form>
  )
}