import { CheckCircle2, FileChartColumnIncreasing, Layers3, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandLogo from '../common/BrandLogo'

const benefits = [
  'Explore verified digital solutions',
  'Track project and customization requests',
  'Manage your business requirements',
]

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1.04fr_.96fr]">
      <section className="relative hidden min-h-screen overflow-hidden bg-navy-950 px-10 py-12 text-white lg:flex lg:flex-col xl:px-16">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-electric/20 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan/15 blur-3xl" />
        <Link
          to="/"
          aria-label="SM Global Solution Hub home"
          className="relative inline-flex rounded"
        >
          <BrandLogo dark />
        </Link>
        <div className="relative my-auto max-w-xl py-14">
          <p className="mb-4 text-xs font-bold uppercase tracking-[.2em] text-cyan">
            SM Global Solution Hub
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-[-.035em] xl:text-5xl">
            Your digital solutions, all in one place.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-blue-100">
            Access project demos, manage customization requests and connect with SM Global Tech
            Solutions.
          </p>
          <ul className="mt-8 space-y-4">
            {benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm font-medium text-slate-100"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-cyan/15 text-cyan">
                  <CheckCircle2 size={16} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
          <div className="relative mt-10 max-w-lg rounded-2xl border border-white/10 bg-white/[.07] p-5 shadow-2xl backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-100">Workspace overview</span>
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                SECURE
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                [Layers3, '25+', 'Solutions'],
                [FileChartColumnIncreasing, 'Live', 'Demos'],
                [ShieldCheck, '100%', 'Verified'],
              ].map(([Icon, value, label]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-navy-950/50 p-3">
                  <Icon size={18} className="mb-4 text-cyan" />
                  <b className="block text-lg">{value}</b>
                  <span className="text-[11px] text-blue-200">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="relative text-xs text-slate-500">
          © {new Date().getFullYear()} SM Global Tech Solutions
        </p>
      </section>
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <Link
            to="/"
            aria-label="SM Global Solution Hub home"
            className="mx-auto mb-10 flex w-max rounded lg:hidden"
          >
            <BrandLogo />
          </Link>
          {children}
        </div>
      </section>
    </main>
  )
}
