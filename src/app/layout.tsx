import { BlockerLayout } from "@/components/layout/BlockerLayout";
import { Provider } from "@/components/ui/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Provider>
          <BlockerLayout>{children}</BlockerLayout>
        </Provider>
      </body>
    </html>
  );
}
