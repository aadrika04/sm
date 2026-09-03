export default function BrandLogo({ dark = false, compact = false }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-electric to-cyan text-sm font-extrabold text-white shadow-lg shadow-blue-500/20">
        SM
      </span>
      {!compact && (
        <span className="leading-tight">
          <strong className={`block text-sm ${dark ? 'text-white' : 'text-navy-950'}`}>
            SM Global
          </strong>
          <span className={`text-xs font-medium ${dark ? 'text-blue-200' : 'text-slate-500'}`}>
            Solution Hub
          </span>
        </span>
      )}
    </span>
  )
}
