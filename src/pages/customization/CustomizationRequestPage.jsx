import { ArrowLeft, Clock3, Headphones, ShieldCheck } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import BrandLogo from '../../components/common/BrandLogo'
import CustomizationForm from '../../components/requirements/CustomizationForm'

export default function CustomizationRequestPage() {
  const [searchParams] = useSearchParams()
  const project = searchParams.get('project') || ''
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" aria-label="SM Global Solution Hub home" className="rounded">
            <BrandLogo />
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 rounded text-sm font-semibold text-slate-600 hover:text-electric"
          >
            <ArrowLeft size={17} />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="container-page py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-9 max-w-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-electric">
              Tell us what you need
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
              Submit a customization requirement
            </h1>
            <p className="mt-4 leading-7 text-slate-600">
              Share your business goals and preferred solution. Our team will review your
              requirement and recommend the right approach.
            </p>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_17rem]">
            <section
              aria-label="Customization request form"
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-8"
            >
              <CustomizationForm initialProject={project} />
            </section>
            <aside className="space-y-4 lg:sticky lg:top-6">
              <div className="rounded-2xl bg-navy-950 p-6 text-white">
                <h2 className="font-bold">What happens next?</h2>
                <ol className="mt-5 space-y-5 text-sm text-blue-100">
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric text-xs font-bold text-white">
                      1
                    </span>
                    We review your business requirement.
                  </li>
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric text-xs font-bold text-white">
                      2
                    </span>
                    A solutions expert contacts you.
                  </li>
                  <li className="flex gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-electric text-xs font-bold text-white">
                      3
                    </span>
                    You receive a tailored recommendation.
                  </li>
                </ol>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <ul className="space-y-4 text-sm text-slate-600">
                  <li className="flex gap-3">
                    <Clock3 size={18} className="shrink-0 text-electric" />
                    Response within one business day
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck size={18} className="shrink-0 text-emerald-500" />
                    Your information stays confidential
                  </li>
                  <li className="flex gap-3">
                    <Headphones size={18} className="shrink-0 text-cyan" />
                    Dedicated solution consultation
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  )
}
