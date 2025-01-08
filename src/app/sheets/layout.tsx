import React from "react"
import ProtectedRoute from "@/components/ProtectedRoute"

const SheetsLayout = ({ children}) => {
    return <ProtectedRoute>
        {children}
    </ProtectedRoute>
}

export default SheetsLayout;