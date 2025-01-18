import React from "react"
import ProtectedRoute from "@/components/ProtectedRoute"
import PageTransition from "@/components/transitions/PageTransition";

const SheetsLayout = ({ children }) => {
    return (
        <PageTransition>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </PageTransition>
    );
}

export default SheetsLayout;