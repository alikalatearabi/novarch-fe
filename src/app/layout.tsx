"use client";

import { iranSans } from "@/lib/font";
import ReduxStoreProviders from "@/providers/ReduxStoreProviders";
import { ProjectProvider } from "../context/projectContext";
import DashboardRoot from "@/components/dashboard/DashboardRoot";
import { AuthProvider } from "@/context/AuthContext";
import { SheetProvider } from "@/context/sheetContext";
import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

import { Theme } from "@radix-ui/themes";
import React, { useMemo } from "react";
import { AnimatePresence } from 'motion/react';
import "react-calendar-datetime-picker/dist/style.css";
import "@radix-ui/themes/styles.css";
import "./globals.css";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SideBar from "@/components/dashboard/sidebar/Sidebar";
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
    }
  }
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = useMemo(() => pathname === "/login", [pathname]);

  return (
    <html lang="en">
      <body className={iranSans.className}>
        <Theme accentColor="blue" radius="large">
          <QueryClientProvider client={queryClient}>
            <ReduxStoreProviders>
              <AuthProvider>
                <ProjectProvider>
                  <SheetProvider>
                    {isAuthPage ? (
                      <>{children}</>
                    ) : (
                      <ProtectedRoute>
                        <div id="root-container" className="w-full">
                          <DashboardHeader />
                          <div className="flex flex-row h-[92vh] w-full">
                            <SideBar />
                            <DashboardRoot>
                              <AnimatePresence initial={false} mode="wait">
                                {React.cloneElement(children, { key: pathname })}
                              </AnimatePresence>
                            </DashboardRoot>
                          </div>
                        </div>
                      </ProtectedRoute>
                    )}
                  </SheetProvider>
                </ProjectProvider>
              </AuthProvider>
            </ReduxStoreProviders>
          </QueryClientProvider>

        </Theme>
      </body>
    </html>
  );
}
