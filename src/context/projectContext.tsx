import React, { createContext, useContext, useState } from "react";

interface IProject {
  id: number,
  name?: string;
  address?: string;
}

const ProjectContext = createContext<{ project: IProject; setProject: (data: IProject) => void }>({
  project: {
    id: null,
    name: "",
    address: ""
  },
  setProject: (params) => {},
});

export const ProjectProvider = ({ children }) => {
  const [project, setProject] = useState<IProject>({
    id: null,
  });

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);
