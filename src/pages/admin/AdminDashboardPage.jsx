import {
  BarChart3,
  Boxes,
  Download,
  FileText,
  FolderKanban,
  MessageSquareText,
  Plus,
  Save,
  Users,
} from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import StatCard from '../../components/dashboard/StatCard'
import {
  EmptyState,
  panelClass,
  RowAction,
  SectionTitle,
  StatusBadge,
  Toolbar,
} from '../../components/dashboard/DashboardUI'

const navItems = [
  { key: 'overview', icon: BarChart3, label: 'Overview' },
  { key: 'projects', icon: FolderKanban, label: 'Projects' },
  { key: 'requirements', icon: MessageSquareText, label: 'Requirements' },
  { key: 'customers', icon: Users, label: 'Customers' },
  { key: 'reports', icon: FileText, label: 'Reports' },
]
const projects = [
  ['SM HR Pro', 'Human Resources', 'Published', '1,284'],
  ['Manufacturing ERP', 'Manufacturing', 'Published', '892'],
  ['Job Portal', 'Recruitment', 'Draft', '651'],
  ['AI Resume Builder', 'AI Solutions', 'Published', '1,876'],
]
const requests = [
  ['REQ-1048', 'Priya Sharma', 'SM HR Pro', 'New', 'Today'],
  ['REQ-1047', 'Arjun Mehta', 'Manufacturing ERP', 'In Review', 'Today'],
  ['REQ-1046', 'Neha Singh', 'AI Resume Builder', 'Contacted', 'Yesterday'],
  ['REQ-1045', 'Karan Gupta', 'Job Portal', 'In Review', 'Yesterday'],
]
const customers = [
  ['Priya Sharma', 'Vertex People Co.', 'priya@vertex.demo', '3', 'Active'],
  ['Arjun Mehta', 'Apex Manufacturing', 'arjun@apex.demo', '2', 'Active'],
  ['Neha Singh', 'CareerSpring', 'neha@career.demo', '1', 'New'],
  ['Karan Gupta', 'Talent Bridge', 'karan@talent.demo', '4', 'Active'],
]

function DataTable({ headers, rows, renderCell }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[46rem] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase text-slate-400">
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-5 py-3">
                {header}
              </th>
            ))}
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row) => (
            <tr key={row[0]} className="hover:bg-slate-50">
              {row.map((cell, index) => (
                <td key={index} className="px-5 py-4">
                  {renderCell ? renderCell(cell, index) : cell}
                </td>
              ))}
              <td className="px-5 py-4">
                <RowAction />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function AdminDashboardPage() {
  const [view, setView] = useState('overview')
  const [query, setQuery] = useState('')
  const filter = useCallback(
    (rows) => rows.filter((row) => row.join(' ').toLowerCase().includes(query.toLowerCase())),
    [query],
  )
  const content = useMemo(() => {
    if (view === 'projects')
      return (
        <>
          <SectionTitle
            eyebrow="Catalogue management"
            title="Projects"
            description="Manage solution visibility and catalogue content."
            action={
              <button className="primary-button">
                <Plus size={17} />
                Add Project
              </button>
            }
          />
          <section className={`${panelClass} mt-7`}>
            <Toolbar query={query} onQueryChange={setQuery} placeholder="Search projects…">
              <button className="secondary-button px-3 py-2">Filter</button>
            </Toolbar>
            {filter(projects).length ? (
              <DataTable
                headers={['Project', 'Industry', 'Status', 'Demo views']}
                rows={filter(projects)}
                renderCell={(cell, index) =>
                  index === 2 ? (
                    <StatusBadge tone={cell === 'Published' ? 'green' : 'amber'}>
                      {cell}
                    </StatusBadge>
                  ) : (
                    <span
                      className={index === 0 ? 'font-semibold text-navy-950' : 'text-slate-600'}
                    >
                      {cell}
                    </span>
                  )
                }
              />
            ) : (
              <EmptyState text="No matching projects." />
            )}
          </section>
        </>
      )
    if (view === 'requirements')
      return (
        <>
          <SectionTitle
            eyebrow="Customer requests"
            title="Customization Requirements"
            description="Review, assign and track every incoming requirement."
          />
          <section className={`${panelClass} mt-7`}>
            <Toolbar query={query} onQueryChange={setQuery} placeholder="Search requests…">
              <button className="secondary-button px-3 py-2">Status: All</button>
            </Toolbar>
            <DataTable
              headers={['Request', 'Customer', 'Project', 'Status', 'Received']}
              rows={filter(requests)}
              renderCell={(cell, index) =>
                index === 3 ? (
                  <StatusBadge
                    tone={cell === 'New' ? 'blue' : cell === 'Contacted' ? 'green' : 'amber'}
                  >
                    {cell}
                  </StatusBadge>
                ) : (
                  <span className={index < 2 ? 'font-semibold text-navy-950' : 'text-slate-600'}>
                    {cell}
                  </span>
                )
              }
            />
          </section>
        </>
      )
    if (view === 'customers')
      return (
        <>
          <SectionTitle
            eyebrow="Customer directory"
            title="Registered Customers"
            description="View customer profiles and requirement activity."
          />
          <section className={`${panelClass} mt-7`}>
            <Toolbar query={query} onQueryChange={setQuery} placeholder="Search customers…">
              <button className="secondary-button px-3 py-2">
                <Download size={15} />
                Export
              </button>
            </Toolbar>
            <DataTable
              headers={['Customer', 'Company', 'Email', 'Requests', 'Status']}
              rows={filter(customers)}
              renderCell={(cell, index) =>
                index === 4 ? (
                  <StatusBadge tone="green">{cell}</StatusBadge>
                ) : (
                  <span className={index === 0 ? 'font-semibold text-navy-950' : 'text-slate-600'}>
                    {cell}
                  </span>
                )
              }
            />
          </section>
        </>
      )
    if (view === 'reports')
      return (
        <>
          <SectionTitle
            eyebrow="Performance insights"
            title="Reports"
            description="Monitor catalogue engagement and customer demand."
            action={
              <button className="secondary-button">
                <Download size={16} />
                Download report
              </button>
            }
          />
          <div className="mt-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {[
              ['Demo conversion', '34.8%', '+5.2%'],
              ['Requirements resolved', '78%', '+11%'],
              ['Average response', '4.2 hrs', '-18%'],
            ].map(([label, value, change]) => (
              <article key={label} className={panelClass + ' p-6'}>
                <p className="text-sm text-slate-500">{label}</p>
                <strong className="mt-3 block text-3xl text-navy-950">{value}</strong>
                <span className="mt-2 block text-xs font-semibold text-emerald-600">
                  {change} this month
                </span>
              </article>
            ))}
          </div>
          <section className={`${panelClass} mt-6 p-6`}>
            <h3 className="font-bold text-navy-950">Monthly engagement</h3>
            <div className="mt-8 flex h-52 items-end gap-3">
              {[42, 58, 49, 72, 64, 81, 76, 94, 86, 98, 91, 100].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t bg-gradient-to-t from-electric to-cyan"
                  style={{ height: `${height * 2}px` }}
                />
              ))}
            </div>
          </section>
        </>
      )
    if (view === 'settings')
      return (
        <>
          <SectionTitle
            eyebrow="Workspace preferences"
            title="Admin Settings"
            description="Configure notifications and catalogue defaults."
          />
          <form
            className={`${panelClass} mt-7 max-w-3xl space-y-6 p-6`}
            onSubmit={(event) => event.preventDefault()}
          >
            <label className="block">
              <span className="text-sm font-semibold text-navy-950">Display name</span>
              <input
                defaultValue="SM Global Admin"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-navy-950">Notification email</span>
              <input
                defaultValue="admin@smglobal.demo"
                className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3"
              />
            </label>
            <label className="flex items-center gap-3 text-sm text-slate-600">
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded" />
              Email me about new requirements
            </label>
            <button className="primary-button">
              <Save size={16} />
              Save settings
            </button>
          </form>
        </>
      )
    return (
      <>
        <SectionTitle
          eyebrow="Admin workspace"
          title="Solution Hub overview"
          description="Monitor projects, users and active business requirements."
          action={
            <button className="primary-button">
              <Plus size={17} />
              Add Project
            </button>
          }
        />
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Boxes} label="Published projects" value="25" change="+3 this month" />
          <StatCard
            icon={MessageSquareText}
            label="Open requirements"
            value="18"
            change="+12%"
            tone="cyan"
          />
          <StatCard
            icon={Users}
            label="Registered users"
            value="1,284"
            change="+8%"
            tone="violet"
          />
          <StatCard icon={BarChart3} label="Demo requests" value="92" change="+16%" tone="green" />
        </div>
        <section className={`${panelClass} mt-7`}>
          <div className="border-b border-slate-100 p-5">
            <h3 className="font-bold text-navy-950">Recent customization requests</h3>
          </div>
          <DataTable
            headers={['Request', 'Customer', 'Project', 'Status', 'Received']}
            rows={requests}
            renderCell={(cell, index) => (index === 3 ? <StatusBadge>{cell}</StatusBadge> : cell)}
          />
        </section>
      </>
    )
  }, [view, filter, query])
  return (
    <DashboardLayout
      title="Admin Dashboard"
      role="Admin"
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
