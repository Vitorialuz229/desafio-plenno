'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import TitheForm from './TitheForm'

type Props = {
  memberId: string
  onSuccess: () => void
}

export default function TitheFormModal({ memberId, onSuccess }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger>
        <Button className="shadow-sm">
          + Adicionar dízimo
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md rounded-xl">

        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Novo dízimo
          </DialogTitle>
        </DialogHeader>

        <div className="pt-2">
          <TitheForm
            memberId={memberId}
            onSuccess={() => {
              setOpen(false)
              onSuccess()
            }}
          />
        </div>

      </DialogContent>
    </Dialog>
  )
}