export default function StatCard({ icon: Icon, label, value, change, tone = 'blue' }) {
  const tones = {
    blue: 'bg-blue-50 text-electric',
    cyan: 'bg-cyan-50 text-cyan-600',
    green: 'bg-emerald-50 text-emerald-600',
    violet: 'bg-violet-50 text-violet-600',
  }
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon size={21} />
        </span>
        {change && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
            {change}
          </span>
        )}
      </div>
      <p className="mt-5 text-sm font-medium text-slate-500">{label}</p>
      <strong className="mt-1 block text-3xl text-navy-950">{value}</strong>
    </article>
  )
}
