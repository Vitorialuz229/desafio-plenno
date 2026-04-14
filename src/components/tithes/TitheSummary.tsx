type Tithe = {
  amount: number
}

type Props = {
  tithes: Tithe[]
}

export default function TitheSummary({ tithes }: Props) {
  const total = tithes.reduce((acc, t) => acc + Number(t.amount), 0)

  return (
    <div className="rounded-lg border p-4 bg-muted/30">
      <p className="text-sm text-muted-foreground">
        Total arrecadado
      </p>
      <p className="text-xl font-semibold">
        R$ {total.toFixed(2)}
      </p>
    </div>
  )
}