import {
  Activity,
  BarChart3,
  Building2,
  CreditCard,
  Database,
  Download,
  Plus,
  Save,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import {
  panelClass,
  RowAction,
  SectionTitle,
  StatusBadge,
  Toolbar,
} from '../../components/dashboard/DashboardUI'
const navItems = [
  { key: 'overview', icon: BarChart3, label: 'Platform Overview' },
  { key: 'organizations', icon: Building2, label: 'Organizations' },
  { key: 'admins', icon: Users, label: 'Admin Management' },
  { key: 'data', icon: Database, label: 'System Data' },
  { key: 'audit', icon: ShieldCheck, label: 'Audit & Security' },
]
const organizations = [
  ['Apex Manufacturing', 'Manufacturing', '42', 'Active'],
  ['Vertex People Co.', 'Human Resources', '28', 'Active'],
  ['CareerSpring', 'Recruitment', '16', 'Trial'],
  ['BrightCare', 'Healthcare', '35', 'Active'],
]
const admins = [
  ['Ananya Rao', 'ananya@smglobal.demo', 'Platform Admin', 'Active'],
  ['Rohan Verma', 'rohan@smglobal.demo', 'Content Admin', 'Active'],
  ['Sana Khan', 'sana@smglobal.demo', 'Support Admin', 'Invited'],
]
const audit = [
  ['Admin access granted', 'Ananya Rao', 'Security', '2 minutes ago'],
  ['Project catalogue updated', 'Rohan Verma', 'Content', '38 minutes ago'],
  ['Organization verified', 'Super Admin', 'Organization', '2 hours ago'],
  ['Login attempt blocked', 'System', 'Security', 'Today'],
]
function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[42rem] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-400">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-3">
                {header}
              </th>
            ))}
            <th />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row[0]} className="hover:bg-slate-50">
              {row.map((cell, index) => (
                <td
                  key={index}
                  className={`px-5 py-4 ${index === 0 ? 'font-semibold text-navy-950' : 'text-slate-600'}`}
                >
                  {index === row.length - 1 ? (
                    <StatusBadge
                      tone={
                        cell === 'Active'
                          ? 'green'
                          : cell === 'Invited' || cell === 'Trial'
                            ? 'amber'
                            : 'blue'
                      }
                    >
                      {cell}
                    </StatusBadge>
                  ) : (
                    cell
                  )}
                </td>
              ))}
              <td className="px-5">
                <RowAction />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default function SuperAdminDashboardPage() {
  const [view, setView] = useState('overview')
  const [query, setQuery] = useState('')
  const filtered = (rows) =>
    rows.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase()))
  let content
  if (view === 'organizations')
    content = (
      <>
        <SectionTitle
          eyebrow="Tenant management"
          title="Organizations"
          description="Manage companies using the Solution Hub."
          action={
            <button className="primary-button">
              <Plus size={16} />
              Add organization
            </button>
          }
        />
        <section className={`${panelClass} mt-7`}>
          <Toolbar query={query} onQueryChange={setQuery} placeholder="Search organizationsâ€¦">
            <button className="secondary-button px-3 py-2">
              <Download size={15} />
              Export
            </button>
          </Toolbar>
          <Table
            headers={['Organization', 'Industry', 'Users', 'Status']}
            rows={filtered(organizations)}
          />
        </section>
      </>
    )
  else if (view === 'admins')
    content = (
      <>
        <SectionTitle
          eyebrow="Access control"
          title="Admin Management"
          description="Invite administrators and manage platform responsibilities."
          action={
            <button className="primary-button">
              <Plus size={16} />
              Invite admin
            </button>
          }
        />
        <section className={`${panelClass} mt-7`}>
          <Toolbar query={query} onQueryChange={setQuery} placeholder="Search adminsâ€¦" />
          <Table
            headers={['Administrator', 'Email', 'Access level', 'Status']}
            rows={filtered(admins)}
          />
        </section>
      </>
    )
  else if (view === 'data')
    content = (
      <>
        <SectionTitle
          eyebrow="Platform operations"
          title="System Data"
          description="Review platform data sources, storage health and catalogue synchronization."
        />
        <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[
            ['Project catalogue', '4 records', 'Healthy'],
            ['Account registry', '1,284 records', 'Healthy'],
            ['Requirement records', '486 records', 'Healthy'],
          ].map(([title, count, status]) => (
            <article key={title} className={`${panelClass} p-6`}>
              <Database className="text-electric" />
              <h3 className="mt-4 font-bold text-navy-950">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{count}</p>
              <div className="mt-5">
                <StatusBadge tone="green">{status}</StatusBadge>
              </div>
            </article>
          ))}
        </div>
        <section className={`${panelClass} mt-6 p-6`}>
          <h3 className="font-bold text-navy-950">Data maintenance</h3>
          <p className="mt-2 text-sm text-slate-500">
            Export, review and validate platform records from one secure workspace.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="secondary-button">Export snapshot</button>
            <button className="secondary-button">Validate records</button>
          </div>
        </section>
      </>
    )
  else if (view === 'audit')
    content = (
      <>
        <SectionTitle
          eyebrow="Security monitoring"
          title="Audit & Security"
          description="Review access events and important platform actions."
          action={
            <button className="secondary-button">
              <Download size={15} />
              Export audit log
            </button>
          }
        />
        <section className={`${panelClass} mt-7`}>
          <Toolbar query={query} onQueryChange={setQuery} placeholder="Search audit eventsâ€¦" />
          <Table headers={['Event', 'Actor', 'Category', 'Time']} rows={filtered(audit)} />
        </section>
      </>
    )
  else if (view === 'settings')
    content = (
      <>
        <SectionTitle
          eyebrow="Platform preferences"
          title="Super Admin Settings"
          description="Configure workspace security and notification defaults."
        />
        <form
          className={`${panelClass} mt-7 max-w-3xl space-y-6 p-6`}
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block">
            <span className="text-sm font-semibold text-navy-950">Platform name</span>
            <input
              defaultValue="SM Global Solution Hub"
              className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
            />
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
            Require enhanced admin verification
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-600">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
            Send critical system alerts
          </label>
          <button className="primary-button">
            <Save size={16} />
            Save settings
          </button>
        </form>
      </>
    )
  else
    content = (
      <>
        <SectionTitle
          eyebrow="Platform administration"
          title="System overview"
          description="Monitor organizations, users and platform operations."
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Building2} label="Organizations" value="148" change="+9%" />
          <StatCard icon={Users} label="Platform users" value="3,892" change="+14%" tone="violet" />
          <StatCard
            icon={CreditCard}
            label="Active solutions"
            value="326"
            change="+21"
            tone="green"
          />
          <StatCard
            icon={Activity}
            label="System health"
            value="99.9%"
            change="Operational"
            tone="cyan"
          />
        </div>
        <div className="mt-7 grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
          <section className={`${panelClass} p-6`}>
            <h3 className="font-bold text-navy-950">Platform usage</h3>
            <div className="mt-8 flex h-52 items-end gap-3">
              {[48, 62, 55, 74, 68, 88, 82, 95, 79, 92, 86, 100].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-gradient-to-t from-electric to-cyan"
                  style={{ height: `${height * 2}px` }}
                />
              ))}
            </div>
          </section>
          <section className={panelClass}>
            <div className="border-b p-5">
              <h3 className="font-bold text-navy-950">Recent audit activity</h3>
            </div>
            <ul className="divide-y">
              {audit.slice(0, 4).map(([title, actor, , time]) => (
                <li key={title} className="p-4">
                  <p className="text-sm font-medium text-navy-950">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {actor} Â· {time}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </>
    )
  return (
    <DashboardLayout
      title="Super Admin Console"
      role="Super Admin"
      navItems={navItems}
      activeView={view}
      onNavigate={(next) => {
        setView(next)
        setQuery('')
      }}
    >
      {content}
    </DashboardLayout>
  )
}
