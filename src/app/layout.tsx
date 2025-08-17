import { BlockerLayout } from "@/shared/components/layout/BlockerLayout";
import { Provider } from "@/shared/components/ui/provider";

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en" suppressHydrationWarning>
    <body suppressHydrationWarning>
      <Provider>
        <BlockerLayout>{children}</BlockerLayout>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
