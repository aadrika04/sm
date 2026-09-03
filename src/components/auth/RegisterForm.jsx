import { CheckCircle2, LoaderCircle, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../services/authService'
import FormField from './FormField'
import PasswordInput from './PasswordInput'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-navy-950 placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-blue-100'
function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Full name is required.'
  if (!values.company.trim()) errors.company = 'Company name is required.'
  if (!values.email.trim()) errors.email = 'Email address is required.'
  else if (!emailPattern.test(values.email)) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Password is required.'
  else if (values.password.length < 8)
    errors.password = 'Password must contain at least 8 characters.'
  if (!values.confirmPassword) errors.confirmPassword = 'Please confirm your password.'
  else if (values.confirmPassword !== values.password)
    errors.confirmPassword = 'Passwords do not match.'
  if (!values.terms) errors.terms = 'Please accept the terms to create your account.'
  return errors
}

export default function RegisterForm() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const change = ({ target }) => {
    const { name, value, type, checked } = target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
    setStatus('')
  }
  const submit = async (event) => {
    event.preventDefault()
    if (submitting) return
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setStatus('')
    if (Object.keys(nextErrors).length) return
    setSubmitting(true)
    try {
      await register(values)
      navigate('/login', { replace: true, state: { accountCreated: true } })
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : 'Unable to create your account. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-8">
      <div className="mb-7">
        <h2 className="text-3xl font-bold tracking-tight text-navy-950">Create your account</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Join SM Global Solution Hub to manage your solution requirements.
        </p>
      </div>
      {status && (
        <div
          role="alert"
          className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-700"
        >
          {status}
        </div>
      )}
      <form onSubmit={submit} noValidate className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="name" label="Full name" error={errors.name}>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={change}
              autoComplete="name"
              className={inputClass}
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </FormField>
          <FormField id="company" label="Company name" error={errors.company}>
            <input
              id="company"
              name="company"
              value={values.company}
              onChange={change}
              autoComplete="organization"
              className={inputClass}
              placeholder="Your company"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? 'company-error' : undefined}
            />
          </FormField>
        </div>
        <FormField id="email" label="Email address" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={change}
            autoComplete="email"
            className={inputClass}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
        </FormField>
        <FormField id="password" label="Password" error={errors.password}>
          <PasswordInput
            id="password"
            value={values.password}
            onChange={change}
            hasError={Boolean(errors.password)}
            autoComplete="new-password"
            placeholder="Minimum 8 characters"
          />
        </FormField>
        <FormField id="confirmPassword" label="Confirm password" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            value={values.confirmPassword}
            onChange={change}
            hasError={Boolean(errors.confirmPassword)}
            autoComplete="new-password"
            placeholder="Enter your password again"
          />
        </FormField>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
            <input
              name="terms"
              type="checkbox"
              checked={values.terms}
              onChange={change}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-electric focus:ring-electric"
            />
            <span>I agree to the terms of service and privacy policy.</span>
          </label>
          {errors.terms && (
            <p role="alert" className="mt-2 text-sm text-rose-600">
              {errors.terms}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="primary-button w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" size={18} />
              Creating accountâ€¦
            </>
          ) : (
            <>
              Create account
              <UserPlus size={17} />
            </>
          )}
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-slate-500">
        Already registered?{' '}
        <Link to="/login" className="rounded font-semibold text-electric hover:text-blue-700">
          Sign in
        </Link>
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 border-t border-slate-100 pt-5 text-xs font-medium text-slate-400">
        <CheckCircle2 size={15} className="text-emerald-500" />
        Secure account registration
      </div>
    </div>
  )
}
