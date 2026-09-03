import { CheckCircle2, LoaderCircle, Send } from 'lucide-react'
import { useState } from 'react'
import { submitCustomizationRequest } from '../../services/requirementService'
import FormField from '../auth/FormField'

const initialValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  industry: '',
  project: '',
  budget: '',
  timeline: '',
  requirements: '',
  consent: false,
}
const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-navy-950 placeholder:text-slate-400 focus:border-electric focus:ring-2 focus:ring-blue-100'

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Your name is required.'
  if (!values.email.trim()) errors.email = 'Email address is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
    errors.email = 'Enter a valid email address.'
  if (!values.company.trim()) errors.company = 'Company name is required.'
  if (!values.industry) errors.industry = 'Select your industry.'
  if (!values.requirements.trim())
    errors.requirements = 'Describe the solution or customization you need.'
  else if (values.requirements.trim().length < 30)
    errors.requirements =
      'Please provide at least 30 characters so we can understand your requirement.'
  if (!values.consent) errors.consent = 'Please confirm that we may contact you about this request.'
  return errors
}

export default function CustomizationForm({ initialProject = '' }) {
  const [values, setValues] = useState({ ...initialValues, project: initialProject })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const change = ({ target }) => {
    const { name, value, type, checked } = target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
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
      await submitCustomizationRequest(values)
      setStatus({
        type: 'success',
        message:
          'Your customization request has been submitted. Our solutions team will contact you shortly.',
      })
      setValues({ ...initialValues, project: initialProject })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-6">
      {status.message && (
        <div
          role="alert"
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm ${status.type === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'}`}
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
          {status.message}
        </div>
      )}
      <fieldset>
        <legend className="mb-5 text-lg font-bold text-navy-950">Contact information</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="name" label="Full name *" error={errors.name}>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={change}
              autoComplete="name"
              className={inputClass}
              placeholder="Your full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
          </FormField>
          <FormField id="email" label="Business email *" error={errors.email}>
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
          <FormField id="phone" label="Phone number">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={change}
              autoComplete="tel"
              className={inputClass}
              placeholder="+91 98765 43210"
            />
          </FormField>
          <FormField id="company" label="Company name *" error={errors.company}>
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
      </fieldset>
      <div className="border-t border-slate-100" />
      <fieldset>
        <legend className="mb-5 text-lg font-bold text-navy-950">Solution requirements</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField id="industry" label="Industry *" error={errors.industry}>
            <select
              id="industry"
              name="industry"
              value={values.industry}
              onChange={change}
              className={inputClass}
              aria-invalid={Boolean(errors.industry)}
              aria-describedby={errors.industry ? 'industry-error' : undefined}
            >
              <option value="">Select industry</option>
              {[
                'Human Resources',
                'Manufacturing',
                'Recruitment',
                'Education',
                'Healthcare',
                'E-Commerce',
                'Financial Services',
                'Other',
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormField>
          <FormField id="project" label="Project of interest">
            <select
              id="project"
              name="project"
              value={values.project}
              onChange={change}
              className={inputClass}
            >
              <option value="">Recommend a solution</option>
              {[
                'SM HR Pro',
                'Manufacturing ERP',
                'Job Portal',
                'AI Resume Builder',
                'Other / New Solution',
              ].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormField>
          <FormField id="budget" label="Estimated budget">
            <select
              id="budget"
              name="budget"
              value={values.budget}
              onChange={change}
              className={inputClass}
            >
              <option value="">Select a range</option>
              <option>Under ₹1 lakh</option>
              <option>₹1–3 lakhs</option>
              <option>₹3–5 lakhs</option>
              <option>₹5 lakhs+</option>
              <option>Not decided</option>
            </select>
          </FormField>
          <FormField id="timeline" label="Preferred timeline">
            <select
              id="timeline"
              name="timeline"
              value={values.timeline}
              onChange={change}
              className={inputClass}
            >
              <option value="">Select timeline</option>
              <option>Within 1 month</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>Flexible</option>
            </select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField
              id="requirements"
              label="Tell us what you need *"
              error={errors.requirements}
            >
              <textarea
                id="requirements"
                name="requirements"
                rows="6"
                value={values.requirements}
                onChange={change}
                className={`${inputClass} resize-y`}
                placeholder="Describe your workflow, required features, users, integrations and customization goals…"
                aria-invalid={Boolean(errors.requirements)}
                aria-describedby={errors.requirements ? 'requirements-error' : undefined}
              />
            </FormField>
            <p className="mt-2 text-right text-xs text-slate-400">
              {values.requirements.length} characters
            </p>
          </div>
        </div>
      </fieldset>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={change}
            className="mt-1 h-4 w-4 rounded border-slate-300 text-electric focus:ring-electric"
          />
          <span>
            I agree that SM Global Tech Solutions may contact me regarding this requirement.
          </span>
        </label>
        {errors.consent && (
          <p role="alert" className="mt-2 text-sm text-rose-600">
            {errors.consent}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="primary-button w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? (
          <>
            <LoaderCircle size={18} className="animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            Submit Requirement
            <Send size={17} />
          </>
        )}
      </button>
    </form>
  )
}
