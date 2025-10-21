import type { Metadata } from "next";
import { BlockerLayout } from "@/shared/components/layout/BlockerLayout";
import { ClientProviders } from "@/shared/components/ui/ClientProviders";

export const metadata: Metadata = {
  title: {
    default: "Apollo Image Explorer",
    template: "%s | Apollo Image Explorer",
  },
  description:
    "Explore Rick and Morty characters with this Next.js 15 powered application featuring server components and optimized images.",
  keywords: ["Rick and Morty", "Next.js", "Apollo", "GraphQL", "React"],
  authors: [{ name: "Apollo Image Explorer" }],
  openGraph: {
    title: "Apollo Image Explorer",
    description: "Explore Rick and Morty characters",
    type: "website",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <ClientProviders>
        <BlockerLayout>{children}</BlockerLayout>
      </ClientProviders>
    </body>
  </html>
);

export default RootLayout;
