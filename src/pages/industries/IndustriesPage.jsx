import {
  BriefcaseBusiness,
  Factory,
  GraduationCap,
  HeartPulse,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import PageHero from '../../components/common/PageHero'
const industries = [
  [Factory, 'Manufacturing', 'Production, inventory and operational control.'],
  [BriefcaseBusiness, 'Human Resources', 'People, payroll and workforce solutions.'],
  [GraduationCap, 'Education', 'Learning and institutional platforms.'],
  [HeartPulse, 'Healthcare', 'Secure patient and practice workflows.'],
  [ShoppingCart, 'E-Commerce', 'Scalable digital commerce experiences.'],
  [Sparkles, 'AI Solutions', 'Practical AI-powered business products.'],
]
export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Industry expertise"
        title="Solutions designed around your business"
        description="Choose adaptable platforms shaped by the workflows, compliance needs and growth goals of your industry."
      />
      <section className="container-page grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map(([Icon, title, text]) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-electric">
              <Icon />
            </span>
            <h2 className="mt-5 text-xl font-bold text-navy-950">{title}</h2>
            <p className="mt-2 leading-7 text-slate-600">{text}</p>
          </article>
        ))}
      </section>
    </main>
  )
}
