import { Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../../components/common/PageHero'
export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact us"
        title="Let’s discuss your next digital solution"
        description="Share your goals with our team and we’ll help you identify the right product or customization path."
      />
      <section className="container-page grid gap-8 py-16 md:grid-cols-3">
        {[
          [Mail, 'Email', 'hello@smglobalsolutions.com'],
          [Phone, 'Phone', '+91 98765 43210'],
          [MapPin, 'Location', 'India · Serving clients worldwide'],
        ].map(([Icon, title, value]) => (
          <article
            key={title}
            className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-soft"
          >
            <Icon className="mx-auto text-electric" />
            <h2 className="mt-4 font-bold text-navy-950">{title}</h2>
            <p className="mt-2 text-sm text-slate-600">{value}</p>
          </article>
        ))}
        <div className="md:col-span-3 rounded-2xl bg-navy-950 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">Have a specific requirement?</h2>
          <p className="mt-3 text-blue-100">
            Use our structured requirement form so our team can respond with the right
            recommendation.
          </p>
          <a href="/customization-request" className="primary-button mt-6">
            Submit Your Requirement
          </a>
        </div>
      </section>
    </main>
  )
}
