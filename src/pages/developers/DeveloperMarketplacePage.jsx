import { BadgeCheck, Code2, Globe2, Users } from 'lucide-react'
import PageHero from '../../components/common/PageHero'
const benefits = [
  [
    BadgeCheck,
    'Verified expertise',
    'Work with developers reviewed for practical product experience.',
  ],
  [Code2, 'Modern technology', 'Find specialists across web, mobile, cloud and AI stacks.'],
  [
    Users,
    'Collaborative delivery',
    'Build alongside professionals who understand business outcomes.',
  ],
  [
    Globe2,
    'Flexible engagement',
    'Access talent suited to projects of different sizes and timelines.',
  ],
]
export default function DeveloperMarketplacePage() {
  return (
    <main>
      <PageHero
        eyebrow="Developer marketplace"
        title="Connect with verified technology specialists"
        description="Discover trusted developers and solution teams for customization, integration and product delivery."
      />
      <section className="container-page py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {benefits.map(([Icon, title, text]) => (
            <article key={title} className="rounded-2xl border border-slate-200 p-6 shadow-soft">
              <Icon className="text-electric" />
              <h2 className="mt-4 text-xl font-bold text-navy-950">{title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 rounded-2xl bg-blue-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-navy-950">Join our developer network</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Contact our team to discuss partnership and solution delivery opportunities.
          </p>
        </div>
      </section>
    </main>
  )
}
