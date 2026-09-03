export default function FormField({ id, label, error, children }) {
  const errorId = `${id}-error`
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-navy-950">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-sm text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}
