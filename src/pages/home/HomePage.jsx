import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BarChart3,
  Boxes,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  GraduationCap,
  HeartPulse,
  Layers3,
  MonitorPlay,
  PackageCheck,
  Settings2,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Users,
} from 'lucide-react'

import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import ProjectCard from '../../components/projects/ProjectCard'
import SectionHeading from '../../components/common/SectionHeading'
import useProjects from '../../hooks/useProjects'

const categories = [
  { icon: Boxes, label: 'ERP' },
  { icon: BriefcaseBusiness, label: 'CRM' },
  { icon: Users, label: 'HRMS' },
  { icon: CircleDollarSign, label: 'Payroll' },
  { icon: Building2, label: 'Job Portal' },
  { icon: GraduationCap, label: 'Education' },
  { icon: HeartPulse, label: 'Healthcare' },
  { icon: ShoppingCart, label: 'E-Commerce' },
  { icon: Settings2, label: 'Manufacturing' },
  { icon: Sparkles, label: 'AI Solutions' },
  { icon: Smartphone, label: 'Mobile Apps' },
  { icon: Cloud, label: 'SaaS' },
]

const processSteps = [
  {
    icon: Layers3,
    title: 'Explore Projects',
    description: 'Browse verified solutions matched to real business needs.',
  },
  {
    icon: MonitorPlay,
    title: 'Open Live Demo',
    description: 'Experience complete product workflows before deciding.',
  },
  {
    icon: Settings2,
    title: 'Submit Customization',
    description: 'Tell us what should change for your operations.',
  },
  {
    icon: PackageCheck,
    title: 'Get Your Solution',
    description: 'Launch a tailored, production-ready digital product.',
  },
]

const stats = [
  { value: '25+', label: 'Ready Solutions' },
  { value: '12+', label: 'Industries' },
  { value: 'Live', label: 'Product Demos' },
  { value: '100%', label: 'Customization Available' },
]

const chartBars = [42, 64, 51, 78, 66, 90, 82]

const solutionHighlights = [
  { label: 'Live demos', value: 'Available' },
  { label: 'Tech stack', value: 'Modern' },
  { label: 'Deployment', value: 'Flexible' },
]

function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-5 border-t border-slate-200 pt-7 sm:grid-cols-4">
      {stats.map(({ value, label }) => (
        <div key={label}>
          <strong className="block text-xl text-navy-950">{value}</strong>
          <span className="text-xs text-slate-500">{label}</span>
        </div>
      ))}
    </div>
  )
}

function SolutionOverviewCard() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-5 rotate-2 rounded-3xl bg-gradient-to-br from-blue-200/60 to-cyan-100/40" />

      <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-5 shadow-2xl">
        <div className="mb-5 flex justify-between">
          <div className="flex gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>

          <small className="text-blue-200">Solution overview</small>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-xl bg-white/5 p-4">
            <p className="text-xs text-blue-200">Active solutions</p>

            <div className="mt-2 flex items-end justify-between">
              <strong className="text-3xl text-white">25</strong>
              <span className="text-xs text-cyan">+18% this quarter</span>
            </div>

            <div className="mt-6 flex h-24 items-end gap-2">
              {chartBars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t bg-gradient-to-t from-blue-600 to-cyan"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-electric p-4 text-white">
            <BarChart3 size={20} />
            <strong className="mt-6 block text-2xl">12+</strong>
            <small className="text-blue-100">Industries served</small>
          </div>

          <div className="col-span-3 grid gap-3 sm:grid-cols-3">
            {solutionHighlights.map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                <small className="text-blue-200">{label}</small>

                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-white">
                  <Check size={12} className="text-cyan" />
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function HomePage() {
  const [notice, setNotice] = useState('')
  const noticeTimerRef = useRef(null)
  const { projects, loading: projectsLoading, error: projectsError } = useProjects()

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        clearTimeout(noticeTimerRef.current)
      }
    }
  }, [])

  const notify = (message) => {
    setNotice(message)

    if (noticeTimerRef.current) {
      clearTimeout(noticeTimerRef.current)
    }

    noticeTimerRef.current = setTimeout(() => {
      setNotice('')
    }, 2600)
  }

  return (
    <div id="home" className="min-h-screen">
      <Header />

      {notice && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-[60] w-max max-w-[90vw] -translate-x-1/2 rounded-lg bg-navy-950 px-5 py-3 text-center text-sm font-medium text-white shadow-2xl"
        >
          {notice}
        </div>
      )}

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/80 pb-20 pt-16 lg:pb-28 lg:pt-24">
          <div className="absolute left-0 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan/10 blur-3xl" />

          <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-bold text-electric shadow-sm">
                <Sparkles size={14} />
                Ready to explore. Built to customize.
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-.04em] text-navy-950 sm:text-5xl lg:text-6xl">
                Explore. Experience.{' '}
                <span className="bg-gradient-to-r from-electric to-cyan bg-clip-text text-transparent">
                  Customize.
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Discover live digital solutions developed by SM Global Tech Solutions and our
                verified developer community.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#projects" className="primary-button">
                  Explore Projects
                  <ArrowRight size={17} />
                </a>

                <a href="/customization-request" className="secondary-button">
                  Submit Your Requirement
                </a>
              </div>

              <HeroStats />
            </div>

            <SolutionOverviewCard />
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="container-page py-20 lg:py-28">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Built by experts"
              title="Featured SM Global Projects"
              description="Explore robust, demo-ready platforms engineered for real-world business operations."
            />

            <div className="flex flex-wrap items-center gap-5">
              <Link
                to="/projects"
                className="flex shrink-0 items-center gap-1 text-sm font-bold text-electric"
              >
                View all projects
                <ChevronRight size={17} />
              </Link>
            </div>
          </div>

          {projectsError && (
            <p
              role="alert"
              className="mt-10 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
            >
              {projectsError}
            </p>
          )}
          <div
            className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
            aria-busy={projectsLoading}
          >
            {projectsLoading
              ? Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-[34rem] animate-pulse rounded-2xl border border-slate-200 bg-slate-100"
                    aria-hidden="true"
                  />
                ))
              : projects.map((project) => (
                  <ProjectCard key={project.name} project={project} notify={notify} />
                ))}
          </div>
        </section>

        {/* Categories */}
        <section id="categories" className="border-y border-slate-200 bg-slate-50 py-16">
          <div className="container-page">
            <SectionHeading
              centered
              eyebrow="Find your fit"
              title="Solutions for every business"
              description="Start with the category closest to your challenge, then shape the solution around your workflow."
            />

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => notify(`${label} solutions selected`)}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-semibold text-navy-900 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-electric transition group-hover:bg-electric group-hover:text-white">
                    <Icon size={18} />
                  </span>

                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section id="process" className="container-page py-20 lg:py-28">
          <SectionHeading
            centered
            eyebrow="Simple from start to launch"
            title="How It Works"
            description="See it, shape it, and deploy it—with an expert team beside you at every step."
          />

          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <div className="absolute left-[12%] right-[12%] top-8 hidden border-t-2 border-dashed border-blue-100 md:block" />

            {processSteps.map(({ icon: Icon, title, description }, index) => (
              <article key={title} className="relative text-center">
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-blue-100 bg-white text-electric shadow-soft">
                  <Icon size={24} />

                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-navy-950 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                </span>

                <h3 className="mt-5 font-bold text-navy-950">{title}</h3>

                <p className="mx-auto mt-2 max-w-60 text-sm leading-6 text-slate-500">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-y border-slate-200 bg-slate-50 py-20 lg:py-28">
          <div className="container-page grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-electric">
                About SM Global
              </p>
              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
                Technology solutions designed around real business needs
              </h2>
              <p className="mt-5 max-w-2xl leading-8 text-slate-600">
                SM Global Solution Hub brings ready-to-use digital products, live demonstrations and
                flexible customization together in one trusted marketplace. We help businesses
                experience a solution before investing in it.
              </p>
              <p className="mt-4 max-w-2xl leading-8 text-slate-600">
                Our team combines practical industry understanding with modern technology to turn
                operational challenges into dependable, scalable products.
              </p>
              <a href="#contact" className="primary-button mt-7">
                Talk to our team
                <ArrowRight size={17} />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Check,
                  title: 'Verified solutions',
                  text: 'Explore carefully reviewed products built for real workflows.',
                },
                {
                  icon: Users,
                  title: 'Expert collaboration',
                  text: 'Work with a team that understands technology and business.',
                },
                {
                  icon: Settings2,
                  title: 'Flexible customization',
                  text: 'Adapt features, branding and processes to suit your organization.',
                },
                {
                  icon: Sparkles,
                  title: 'Modern delivery',
                  text: 'Launch maintainable solutions using current technologies.',
                },
              ].map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-electric">
                    <Icon size={19} />
                  </span>
                  <h3 className="mt-4 font-bold text-navy-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Requirement CTA */}
        <section id="requirement" className="container-page pb-20 lg:pb-28">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-950 via-navy-800 to-blue-900 px-6 py-12 text-center shadow-2xl sm:px-12 lg:py-16">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border-[40px] border-cyan/10" />

            <div className="relative">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-cyan">
                Let&apos;s find your solution
              </p>

              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Can&apos;t find the right solution?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-blue-100">
                Tell us about your business and we&apos;ll recommend the most suitable project.
              </p>

              <a
                href="/customization-request"
                className="primary-button mt-8 bg-white text-navy-950 shadow-none hover:bg-blue-50"
              >
                Submit Your Requirement
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default HomePage
