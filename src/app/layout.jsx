"use client";

import { iranSans } from "@/lib/font";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import { ProjectProvider } from "../context/projectContext";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import "react-calendar-datetime-picker/dist/style.css";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login"; 

  return (
    <html lang="en">
      <body className={iranSans.className}>
        <ReduxStoreProviders>
          <AuthProvider>
            <ProjectProvider>
              {isAuthPage ? (
                <>{children}</> 
              ) : (
                <DashboardRoot>{children}</DashboardRoot>
              )}
            </ProjectProvider>
          </AuthProvider>
        </ReduxStoreProviders>
      </body>
    </html>
  );
}
