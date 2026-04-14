'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { createClient } from '@/lib/client'

type Props = {
  onSuccess: () => void
}

export default function MemberForm({ onSuccess }: Props) {
  const supabase = createClient()

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [status, setStatus] = useState(true)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.from('members').insert([
      { name, phone, birth_date: birthDate, status }
    ])

    setLoading(false)

    if (error) {
      console.error(error)
      return
    }

    setOpen(false)
    setName('')
    setPhone('')
    setBirthDate('')
    setStatus(true)

    onSuccess()
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        Novo membro
      </Button>

      {/* MODAL */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 max-w-lg">
          <div className="rounded-xl border border-border/40 bg-card p-8 shadow-sm">

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                Novo membro
              </h2>
              <p className="mt-1 text-base text-muted-foreground">
                Preencha os dados para registrar um novo membro.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Nome */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Nome completo</Label>
                <Input
                  placeholder="Digite o nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Telefone */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Telefone</Label>
                <Input
                  placeholder="(xx) xxxxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              {/* Data */}
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">Data de nascimento</Label>
                <Input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>

              {/* Status */}
              <div className="flex items-center justify-between rounded-lg bg-muted/30 border px-4 py-3">
                <div>
                  <p className="text-sm font-medium">
                    Membro ativo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Visível nas listagens
                  </p>
                </div>
                <Switch
                  checked={status}
                  onCheckedChange={(checked) => setStatus(!!checked)}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Cadastrando...' : 'Cadastrar membro'}
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}