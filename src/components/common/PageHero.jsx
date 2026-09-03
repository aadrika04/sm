export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-blue-900 py-16 text-white sm:py-20">
      <div className="container-page">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-cyan">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">{description}</p>
      </div>
    </section>
  )
}
