
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import LoginForm from '@/components/organisms/LoginForm';

export const metadata: Metadata = {
  title: 'Day 4 — Login Form | React Next.js Plan',
  description: 'Login form with email and password validation using Zod.',
};

export default function Day4Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          {/* SEO: one H1 */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 4 — Login Form
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            Email and password validation with Zod
          </p>

          {/* Two column layout on large screens */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Form card */}
            <section aria-labelledby="login-heading">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                <div className="mb-6">
                  <h2
                    id="login-heading"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Sign In
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Enter your credentials to access the dashboard
                  </p>
                </div>
                <LoginForm />
              </div>
            </section>

            {/* Info panel */}
            <section aria-labelledby="info-heading" className="flex flex-col gap-4">
              <h2
                id="info-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200"
              >
                Covered in Day 4
              </h2>

              {[
                {
                  title: 'Controlled vs Uncontrolled',
                  desc: 'React Hook Form uses uncontrolled inputs — no useState per field, fewer re-renders.',
                },
                {
                  title: 'Zod Validation',
                  desc: 'Schema-based validation — define rules once, reuse across frontend and backend.',
                },
                {
                  title: 'Accessibility',
                  desc: 'Every input has a <label>, aria-invalid, and aria-describedby for screen readers.',
                },
                {
                  title: 'Tailwind Focus + Error States',
                  desc: 'Red border and ring on error, green on success — using conditional class logic.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                >
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}