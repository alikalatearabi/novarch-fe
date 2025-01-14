"use client";

import { iranSans } from "@/lib/font";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import { ProjectProvider } from "../context/projectContext";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import "react-calendar-datetime-picker/dist/style.css";
import "./globals.css";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { SheetProvider } from "@/context/sheetContext";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login";

  return (
    <html lang="en">
      <body className={iranSans.className}>
        <ReduxStoreProviders>
          <AuthProvider>
            <ProjectProvider>
              <SheetProvider>
                <ProtectedRoute>
                  {isAuthPage ? (
                    <>{children}</>
                  ) : (
                    <DashboardRoot>{children}</DashboardRoot>
                  )}
                </ProtectedRoute>
              </SheetProvider>
            </ProjectProvider>
          </AuthProvider>
        </ReduxStoreProviders>
      </body>
    </html>
  );
}
