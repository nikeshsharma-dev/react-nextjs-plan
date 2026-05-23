// DAY 11: Dynamic routes — /users/[id]
// No Header/Sidebar — comes from layout.tsx
// PERF: Server Component — no client fetch
// Tailwind: theme colors applied consistently across Button, Card, Input, Sidebar, Header

import { Metadata } from 'next';
import Link from 'next/link';
import StatusBadge from '@/components/molecules/StatusBadge';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import Card from '@/components/molecules/Card';
import FormField from '@/components/atoms/FormField';
import { MOCK_USERS } from '@/app/data/mockUsers';

export const metadata: Metadata = {
  title: 'Day 11 — Dynamic Routes',
  description:
    'Dynamic routes /users/[id], generateStaticParams, generateMetadata, and theme consistency.',
};

export default function Day11Page() {
  return (
    <div className="flex flex-col gap-10">

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Day 11 — Dynamic Routes
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          /users/[id] · generateStaticParams · generateMetadata · notFound()
        </p>
      </div>

      {/* DAY 11 TAILWIND: Theme consistency across all 5 components */}
      <section aria-labelledby="theme-heading">
        <h2
          id="theme-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Tailwind Theme — Applied Consistently Across All Components
        </h2>

        <div className="flex flex-col gap-4">

          {/* Button */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Button
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              bg-primary · bg-secondary · bg-red-600 · hover:bg-primary-dark · focus:ring-primary/50
            </p>
            <div className="flex flex-wrap gap-2">
              <Button label="Primary" variant="primary" size="sm" />
              <Button label="Secondary" variant="secondary" size="sm" />
              <Button label="Danger" variant="danger" size="sm" />
              <Button label="Ghost" variant="ghost" size="sm" />
              <Button label="Disabled" variant="primary" size="sm" disabled />
            </div>
          </div>

          {/* Card */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Card
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              bg-white dark:bg-gray-900 · border-gray-200 dark:border-gray-700 · rounded-xl · shadow-sm
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card title="Active Card" description="Status is active." status="success" statusLabel="Active" footer={<Button label="View" size="sm" />} />
              <Card title="Pending Card" description="Awaiting review." status="warning" statusLabel="Pending" footer={<Button label="Review" size="sm" variant="secondary" />} />
              <Card title="Error Card" description="Action required." status="error" statusLabel="Error" footer={<Button label="Fix" size="sm" variant="danger" />} />
            </div>
          </div>

          {/* Input — FormField atom */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Input (FormField)
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              border-gray-300 · focus:ring-primary/40 · focus:border-primary · border-red-500 on error · border-green-500 on success
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
              <FormField
                id="demo-default"
                label="Default State"
                placeholder="Type something..."
              />
              <FormField
                id="demo-error"
                label="Error State"
                placeholder="Invalid value"
                error="This field is required"
              />
              <FormField
                id="demo-success"
                label="Success State"
                placeholder="Valid value"
                success
              />
            </div>
          </div>

          {/* Sidebar tokens */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Sidebar
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              bg-white dark:bg-gray-900 · active link: bg-primary text-white · hover: bg-gray-100 dark:bg-gray-800
            </p>
            <div className="flex flex-col gap-1 w-48 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              {[
                { label: '🏠 Dashboard', active: true },
                { label: '👥 Users', active: false },
                { label: '📋 Day 3', active: false },
              ].map((item) => (
                <div
                  key={item.label}
                  className={[
                    'px-3 py-2 rounded-lg text-sm font-medium',
                    item.active
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-400',
                  ].join(' ')}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Header tokens */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Header
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              bg-white dark:bg-gray-900 · border-b border-gray-200 · brand uses bg-primary · nav links hover:text-primary
            </p>
            <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">
                  U
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Dashboard
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="hover:text-primary cursor-pointer transition-colors">Home</span>
                <span className="text-primary font-medium cursor-pointer">Users</span>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-lg bg-primary text-white">
                Sign In
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Route Concepts */}
      <section aria-labelledby="concepts-heading">
        <h2
          id="concepts-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Dynamic Route Concepts
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            {
              icon: '🗂️',
              title: 'Dynamic Route — /users/[id]',
              desc: 'Create app/users/[id]/page.tsx. The [id] value is passed as params.id to the page component.',
              code: 'app/users/[id]/page.tsx → /users/u1',
            },
            {
              icon: '⚡',
              title: 'generateStaticParams',
              desc: 'Pre-generates all /users/u1, /users/u2 etc at build time. Fully static — no server cost per request.',
              code: 'export async function generateStaticParams()',
            },
            {
              icon: '🔍',
              title: 'generateMetadata — Dynamic SEO',
              desc: 'Reads params.id, finds user, returns unique title/description/OG for every user detail page.',
              code: "title: `${user.name} — User Detail`",
            },
            {
              icon: '🚫',
              title: 'notFound()',
              desc: 'If user id does not exist in data, call notFound(). Next.js renders not-found.tsx automatically.',
              code: "if (!user) notFound()",
            },
          ].map((concept) => (
            <div
              key={concept.title}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-2"
            >
              <div className="flex items-center gap-2">
                <span aria-hidden="true" className="text-2xl">{concept.icon}</span>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {concept.title}
                </h3>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex-1">
                {concept.desc}
              </p>
              <code className="text-xs text-primary bg-primary/10 px-2 py-1 rounded break-all">
                {concept.code}
              </code>
            </div>
          ))}
        </div>
      </section>

      {/* Performance: server vs client */}
      <section aria-labelledby="perf-heading">
        <h2
          id="perf-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Performance — Server Fetch vs Client Fetch
        </h2>
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-xs text-red-600 font-bold">✕</span>
                <h3 className="text-sm font-semibold text-red-600 dark:text-red-400">
                  Wrong — Client Fetch
                </h3>
              </div>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg p-4 text-xs font-mono text-red-700 dark:text-red-300 leading-6">
                <p>{'// "use client" ← unnecessary'}</p>
                <p>{'const [user, setUser] = useState()'}</p>
                <p>{'useEffect(() => {'}</p>
                <p>{"  fetch(`/api/users/${id}`)"}</p>
                <p>{'    .then(r => setUser(r))'}</p>
                <p>{'}, [])'}</p>
                <p className="mt-2 text-red-400 not-italic">
                  Slow — extra network call on client
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs text-green-600 font-bold">✓</span>
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">
                  Correct — Server Component
                </h3>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-lg p-4 text-xs font-mono text-green-700 dark:text-green-300 leading-6">
                <p>{'// No "use client" needed'}</p>
                <p>{'export default async function Page('}</p>
                <p>{'  { params }: PageProps'}</p>
                <p>{'}) {'}</p>
                <p>{'  const { id } = await params'}</p>
                <p>{'  const user = MOCK_USERS'}</p>
                <p>{'    .find(u => u.id === id)'}</p>
                <p>{'  if (!user) notFound()'}</p>
                <p className="mt-2 text-green-400 not-italic">
                  Fast — runs on server, no extra call
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo */}
      <section aria-labelledby="demo-heading">
        <h2
          id="demo-heading"
          className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-4"
        >
          Live Demo — Click any user to see /users/[id] in action
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOCK_USERS.map((user) => (
            <Link
              key={user.id}
              href={`/users/${user.id}`}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3 hover:border-primary hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  {user.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate group-hover:text-primary transition-colors duration-200">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-medium">
                  {user.role}
                </span>
                <StatusBadge status={user.status} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <code className="text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                  /users/{user.id}
                </code>
                <span className="text-gray-400 group-hover:text-primary transition-colors">
                  View →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
}