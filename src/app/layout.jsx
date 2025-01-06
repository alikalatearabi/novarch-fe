"use client";

import { iranSans } from "@/lib/font";
import "./globals.css";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import { ProjectProvider } from "../context/projectContext";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import "react-calendar-datetime-picker/dist/style.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={iranSans.className}>
        <ReduxStoreProviders>
          <ProjectProvider>
            <DashboardRoot>{children}</DashboardRoot>
          </ProjectProvider>
        </ReduxStoreProviders>
      </body>
    </html>
  );
}
