import type { Metadata } from "next";
import { ThemeProvider } from "../app-components/themeprovider";
import { Header } from "../app-components/header";
import { Sidebar } from "../app-components/sidebar";
import styles from "./layout.module.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Design System",
  description: "Documentation for the Atelier Design System primitives and patterns.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />
          <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
