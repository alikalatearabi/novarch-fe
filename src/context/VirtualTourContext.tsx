import React, { createContext, useContext } from "react";

// Define the type of the context
interface VirtualTourContextType {
  navigate: (direction: "forward" | "backward") => void;
}

// Create the context with a default value of `undefined`
const VirtualTourContext = createContext<VirtualTourContextType | undefined>(undefined);

// Hook to use the context
export const useVirtualTourContext = () => {
  const context = useContext(VirtualTourContext);
  if (!context) {
    throw new Error("useVirtualTourContext must be used within a VirtualTourProvider");
  }
  return context;
};

// Context provider component
export const VirtualTourProvider: React.FC<{
  navigate: (direction: "forward" | "backward") => void;
  children: React.ReactNode;
}> = ({ navigate, children }) => {
  return (
    <VirtualTourContext.Provider value={{ navigate }}>
      {children}
    </VirtualTourContext.Provider>
  );
};
