import { ArrowRight, CheckCircle2, LoaderCircle, LockKeyhole, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import FormField from './FormField'
import PasswordInput from './PasswordInput'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values) {
  const errors = {}
  if (!values.email.trim()) errors.email = 'Email address is required.'
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 8)
    errors.password = 'Password must contain at least 8 characters.'
  return errors
}

export default function LoginForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [values, setValues] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ type: '', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const change = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    if (status.message) setStatus({ type: '', message: '' })
  }

  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setStatus({ type: '', message: '' })
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    try {
      const result = await login({ email: values.email.trim(), password: values.password })
      const requestedPage = location.state?.from
      if (requestedPage) {
        navigate(requestedPage, { replace: true })
        return
      }
      if (result.user?.role === 'admin' || result.user?.role === 'super-admin') {
        navigate('/dashboard')
        return
      }
      navigate('/', { replace: true })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Unable to sign in. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-7">
        <h2 className="text-3xl font-bold tracking-tight text-navy-950">Welcome back</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Sign in to continue to SM Global Solution Hub.
        </p>
      </div>
      {status.message && (
        <div
          role="alert"
          className={`mb-5 flex items-start gap-3 rounded-lg border p-3.5 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'}`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          ) : (
            <LockKeyhole className="mt-0.5 shrink-0" size={18} />
          )}
          <span>{status.message}</span>
        </div>
      )}
      <form onSubmit={submit} noValidate className="space-y-5">
        <FormField id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={change}
            autoComplete="email"
            autoFocus
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-navy-950 placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-blue-100"
            placeholder="you@company.com"
          />
        </FormField>
        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            value={values.password}
            onChange={change}
            hasError={Boolean(errors.password)}
          />
        </FormField>
        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-slate-600">
            <input
              name="remember"
              type="checkbox"
              checked={values.remember}
              onChange={change}
              className="h-4 w-4 rounded border-slate-300 text-electric focus:ring-electric"
            />
            Remember me
          </label>
          <a
            href="#forgot-password"
            onClick={(event) => event.preventDefault()}
            className="rounded font-semibold text-electric hover:text-blue-700"
          >
            Forgot Password?
          </a>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" size={18} />
              Signing inâ€¦
            </>
          ) : (
            <>
              Sign In
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Donâ€™t have an account?{' '}
        <Link
          to="/create-account"
          className="rounded font-semibold text-electric hover:text-blue-700"
        >
          Create account
        </Link>
      </p>
      <div className="my-6 border-t border-slate-100" />
      <div className="flex items-center justify-between gap-4">
        <Link to="/" className="rounded text-sm font-semibold text-slate-600 hover:text-electric">
          â† Back to Home
        </Link>
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <ShieldCheck size={15} className="text-emerald-500" />
          Secure login
        </span>
      </div>
    </div>
  )
}
