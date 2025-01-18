import ProtectedRoute from "@/components/ProtectedRoute";
import PageTransition from "@/components/transitions/PageTransition";
import React from "react";

const TimelapsLayout = ({ children }) => {
  return (
    <PageTransition>
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    </PageTransition>
  );
};

export default TimelapsLayout;
