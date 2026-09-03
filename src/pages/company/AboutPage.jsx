import { CheckCircle2 } from 'lucide-react'
import PageHero from '../../components/common/PageHero'
export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About SM Global"
        title="Technology solutions built for meaningful business progress"
        description="SM Global Tech Solutions helps organizations discover, customize and deploy dependable digital products."
      />
      <section className="container-page grid gap-12 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-navy-950">
            From business challenge to working solution
          </h2>
          <p className="mt-5 leading-8 text-slate-600">
            Our Solution Hub brings proven products and skilled technology professionals together in
            one transparent marketplace. Businesses can experience a solution first, then tailor it
            to their operations.
          </p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-7">
          <h2 className="text-xl font-bold text-navy-950">What guides our work</h2>
          <ul className="mt-5 space-y-4">
            {[
              'Practical solutions over unnecessary complexity',
              'Clear collaboration throughout delivery',
              'Flexible customization for real workflows',
              'Long-term value and maintainable technology',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-600">
                <CheckCircle2 className="shrink-0 text-electric" size={20} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
