import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute";

const ImagesLayout = ({ children }) => {
    return (
        <ProtectedRoute>
            {children}
        </ProtectedRoute>
    )
}

export default ImagesLayout;