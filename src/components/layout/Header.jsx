import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import BrandLogo from '../common/BrandLogo'
import ProjectSearch from '../search/ProjectSearch'

const nav = [
  ['Home', '#home'],
  ['All Projects', '#projects'],
  ['Featured Projects', '#projects'],
  ['Industries', '#categories'],
  ['Developer Marketplace', '#projects'],
  ['About', '#about'],
  ['Contact', '#contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { pathname } = useLocation()
  const sectionHref = (target) => (pathname === '/' ? target : `/${target}`)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-5">
        <a
          href={sectionHref('#home')}
          aria-label="SM Global Solution Hub home"
          className="shrink-0 rounded"
        >
          <BrandLogo />
        </a>
        <nav aria-label="Primary navigation" className="hidden items-center gap-5 xl:flex">
          {nav.map(([label, target]) => (
            <a
              key={label}
              href={sectionHref(target)}
              className="rounded text-[13px] font-medium text-slate-600 hover:text-electric"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search projects"
            className="grid h-10 w-10 place-items-center rounded-lg hover:bg-slate-100"
          >
            <Search size={19} />
          </button>
          <Link to="/customization-request" className="primary-button px-4 py-2.5">
            Submit Requirement
          </Link>
          <Link to="/login" className="secondary-button px-4 py-2.5">
            Login
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-lg border border-slate-200 md:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav
          aria-label="Mobile navigation"
          className="container-page flex flex-col border-t border-slate-100 pb-6 pt-3 md:hidden"
        >
          <button
            type="button"
            onClick={() => {
              setOpen(false)
              setSearchOpen(true)
            }}
            className="mb-2 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3 text-left text-sm font-semibold text-slate-600"
          >
            <Search size={18} />
            Search projects
          </button>
          {nav.map(([label, target]) => (
            <a
              key={label}
              href={sectionHref(target)}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-blue-50 hover:text-electric"
            >
              {label}
            </a>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to="/customization-request"
              onClick={() => setOpen(false)}
              className="primary-button px-2"
            >
              Submit Requirement
            </Link>
            <Link to="/login" onClick={() => setOpen(false)} className="secondary-button">
              Login
            </Link>
          </div>
        </nav>
      )}
      <ProjectSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
