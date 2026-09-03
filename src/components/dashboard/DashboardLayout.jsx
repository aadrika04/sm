import { Bell, ChevronDown, LogOut, Menu, Search, Settings, ShieldCheck, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../../services/authService'
import BrandLogo from '../common/BrandLogo'

export default function DashboardLayout({
  title,
  role,
  navItems,
  activeView,
  onNavigate,
  children,
}) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const select = (key) => {
    onNavigate(key)
    setOpen(false)
  }
  const signOut = () => {
    logout()
    navigate('/login', { replace: true })
  }
  return (
    <div className="min-h-screen bg-slate-100">
      <button
        onClick={() => setOpen(false)}
        aria-label="Close dashboard menu"
        className={`fixed inset-0 z-40 bg-navy-950/50 lg:hidden ${open ? 'block' : 'hidden'}`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-navy-950 p-5 text-blue-100 transition-transform lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between">
          <Link to="/" className="rounded">
            <BrandLogo dark />
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>
        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-blue-300">Signed in as</p>
          <p className="mt-1 text-sm font-bold text-white">{role}</p>
        </div>
        <nav aria-label={`${role} navigation`} className="mt-7 space-y-1">
          {navItems.map(({ icon: Icon, label, key }) => (
            <button
              key={key}
              onClick={() => select(key)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${activeView === key ? 'bg-electric text-white' : 'hover:bg-white/10'}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="mt-auto space-y-1 border-t border-white/10 pt-4">
          <button
            onClick={() => select('settings')}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm ${activeView === 'settings' ? 'bg-electric text-white' : 'hover:bg-white/10'}`}
          >
            <Settings size={18} />
            Settings
          </button>
          <button
            onClick={signOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm hover:bg-white/10"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open dashboard menu"
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="text-sm font-bold text-navy-950 sm:text-base">{title}</h1>
              <p className="hidden text-xs text-slate-400 sm:block">Management workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              aria-label="Search dashboard"
              className="grid h-10 w-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <Search size={19} />
            </button>
            <button
              aria-label="Notifications"
              className="relative grid h-10 w-10 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <Bell size={19} />
              <i className="absolute right-2 top-2 h-2 w-2 rounded-full bg-electric" />
            </button>
            <button className="ml-1 hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-navy-950 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-electric">
                <ShieldCheck size={15} />
              </span>
              {role}
              <ChevronDown size={14} />
            </button>
          </div>
        </header>
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
