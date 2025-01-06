import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext({
  projectName: "",
  setProjectName: (name: string) => {},
  projectId: null,
  setProjectId: (id: number | null) => {}
});

export const ProjectProvider = ({ children }) => {
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState(null);

  return (
    <ProjectContext.Provider value={{ projectName, setProjectName, projectId, setProjectId }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
