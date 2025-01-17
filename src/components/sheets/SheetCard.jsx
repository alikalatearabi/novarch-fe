"use client";



const SheetCard = () => {
  

  // const fetchProjectSheets = async () => {
  //   if (!projectId) return;
  //   try {
  //     const { ok, data } = await api.sheets.get(projectId);
  //     if (ok) { 
  //       dispatch(RsetSheetsView(data.responseObject.))
  //     }
  //   } catch (error) {
      
  //   }
  // };
  
  useEffect(() => {
    dispatch(RsetSheetsView(0));
  }, []);

  // sheetsView === 1 layer
  return (
    
  );
};

export default SheetCard;
