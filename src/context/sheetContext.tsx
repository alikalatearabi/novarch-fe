import React, { createContext, useContext, useState } from "react";

const SheetContext = createContext({
  lastSheetId: null,
  setLastSheetId: (id: number | null) => {},
});

export const SheetProvider = ({ children }) => {
  const [lastSheetId, setLastSheetId] = useState(null);

  return (
    <SheetContext.Provider value={{ lastSheetId, setLastSheetId }}>
      {children}
    </SheetContext.Provider>
  );
};

export const useSheet = () => useContext(SheetContext);
