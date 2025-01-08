import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const TimelapsLayout = ({ children  }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default TimelapsLayout;
