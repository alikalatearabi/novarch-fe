"use client";

import { iranSans } from "@/lib/font";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import { ProjectProvider } from "../context/projectContext";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import "react-calendar-datetime-picker/dist/style.css";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={iranSans.className}>
        <ReduxStoreProviders>
          <AuthProvider>
            <ProjectProvider>
              <DashboardRoot>{children}</DashboardRoot>
            </ProjectProvider>
          </AuthProvider>
        </ReduxStoreProviders>
      </body>
    </html>
  );
}
