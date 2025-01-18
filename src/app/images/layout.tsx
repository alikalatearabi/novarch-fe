import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import PageTransition from "@/components/transitions/PageTransition";

const ImagesLayout = ({ children }) => {
    return (
        <PageTransition>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </PageTransition>
    )
}

export default ImagesLayout;