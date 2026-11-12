export type StatusStatProps = {
  label: string
  value: string | number
}

export function StatusStat({ label, value }: StatusStatProps) {
  return (
    <div className="status-stat">
      <span className="status-stat__label">{label}</span>
      <strong className="status-stat__value">{value}</strong>
    </div>
  )
}
