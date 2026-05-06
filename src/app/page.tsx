import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import Card from '@/components/molecules/Card';
import Button from '@/components/atoms/Button';
import Badge from '@/components/atoms/Badge';

export const metadata = {
  title: 'Day 1 — Atomic Components | React Next.js Plan',
  description:
    'Day 1 practice: Atomic Design Principle — Header, Button, Card, Sidebar components.',
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Day 1 — Atomic Components
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
            Atoms → Molecules → Organisms (Atomic Design Principle)
          </p>

          <section aria-labelledby="buttons-heading" className="mb-10">
            <h2
              id="buttons-heading"
              className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Buttons (Atoms)
            </h2>
            <div className="flex flex-wrap gap-3">
              <Button label="Primary" variant="primary" />
              <Button label="Secondary" variant="secondary" />
              <Button label="Danger" variant="danger" />
              <Button label="Ghost" variant="ghost" />
              <Button label="Disabled" disabled />
              <Button label="Small" size="sm" />
              <Button label="Large" size="lg" />
            </div>
          </section>

          <section aria-labelledby="badges-heading" className="mb-10">
            <h2
              id="badges-heading"
              className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Badges (Atoms)
            </h2>
            <div className="flex flex-wrap gap-3">
              <Badge label="Active" variant="success" />
              <Badge label="Pending" variant="warning" />
              <Badge label="Error" variant="error" />
              <Badge label="Info" variant="info" />
              <Badge label="Inactive" variant="muted" />
            </div>
          </section>

          <section aria-labelledby="cards-heading" className="mb-10">
            <h2
              id="cards-heading"
              className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              Cards (Molecules)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card
                title="Total Users"
                description="Registered users in the system."
                status="success"
                statusLabel="Active"
                footer={<Button label="View All" size="sm" />}
              />
              <Card
                title="Pending Reviews"
                description="Items waiting for approval."
                status="warning"
                statusLabel="Pending"
                footer={<Button label="Review" size="sm" variant="secondary" />}
              />
              <Card
                title="Failed Jobs"
                description="Background tasks that failed."
                status="error"
                statusLabel="Error"
                footer={<Button label="Retry" size="sm" variant="danger" />}
              />
            </div>
          </section>

          <div className="mt-8">
            <a
              href="/day2"
              className="inline-flex items-center gap-2 text-primary underline text-sm font-medium"
            >
              → Go to Day 2: Counter, Tabs, Modal, Dropdown
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}