
import { Metadata } from 'next';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import AddUserForm from '@/components/organisms/AddUserForm';

export const metadata: Metadata = {
  title: 'Day 5 — Add User Form | React Next.js Plan',
  description: 'Add user form with React Hook Form and Zod validation.',
};

export default function Day5Page() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-8">
          {/* SEO: one H1 */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            Day 5 — Add User Form
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
            React Hook Form + Zod validation — reduced re-renders
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Form card */}
            <section aria-labelledby="adduser-heading">
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-8">
                <div className="mb-6">
                  <h2
                    id="adduser-heading"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    Add New User
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Fill in the details to create a new user account
                  </p>
                </div>
                <AddUserForm />
              </div>
            </section>

            {/* Info panel */}
            <section aria-labelledby="day5-info-heading" className="flex flex-col gap-4">
              <h2
                id="day5-info-heading"
                className="text-base font-semibold text-gray-800 dark:text-gray-200"
              >
                Covered in Day 5
              </h2>

              {[
                {
                  title: 'React Hook Form',
                  desc: 'Uncontrolled inputs — only the changed field re-renders, not the whole form.',
                },
                {
                  title: 'Zod Schema',
                  desc: 'Password rules: min 8 chars, one uppercase, one number, confirm match.',
                },
                {
                  title: 'Reusable FormField',
                  desc: 'FormField atom handles label, input, error, and success state in one component.',
                },
                {
                  title: 'fieldset + legend',
                  desc: 'Form groups use <fieldset> and <legend> for screen reader accessibility.',
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