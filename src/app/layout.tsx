// import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
// import './globals.css';
// import { Providers } from './Providers';

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

// export const metadata: Metadata = {
//   title: 'React Next.js 15-Day Plan',
//   description: 'Learning React and Next.js step by step over 15 days.',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <Providers>{children}</Providers>
//       </body>
//     </html>
//   );
// }

// ROOT LAYOUT — src/app/layout.tsx
// DAY 10: This is the App Router root layout
// ALL pages share this layout automatically
// ThemeProvider and AuthProvider wrap everything here — no duplication

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// DAY 10 SEO: Root level metadata — every page inherits this as fallback
export const metadata: Metadata = {
  title: {
    default: 'React Next.js 15-Day Plan',
    // Each page can override just the page name
    template: '%s | React Next.js Plan',
  },
  description:
    'Learning React and Next.js step by step over 15 days — Atomic Design, Hooks, Context, App Router, SEO.',
  metadataBase: new URL('https://react-nextjs-plan.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}