'use client';

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardHeader from "./DashboardHeader";
import CaptureRoot from "../capture/CaptureRoot";
import CreateProjectModal from "./CreateProjectModal";
import { useProject } from "../../context/projectContext";

const DashboardRoot = ({ children }) => {
  const { projectName, setProjectName, projectId, setProjectId } = useProject();
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8000/project/all", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();

        if (data.success && data.responseObject.length > 0) {
          const firstProject = data.responseObject[0];
          setProjectName(firstProject.name);
          setProjectId(firstProject.id);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [setProjectName, setProjectId]);

  const handleProjectCreate = (project) => {
    setProjectName(project.name);
    setProjectId(project.id);
  };

  return (
    <div id="root-container" className="text-black min-h-[100vh] relative">
      <DashboardHeader projectName={projectName} />
      <Sidebar />
      <div className="lg:mr-[70px]">{children}</div>
      <div id="capture" className={`absolute top-0 z-30`}>
        <CaptureRoot />
      </div>

      {/* Create Project Modal */}
      {showCreateProjectModal && (
        <CreateProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          onCreate={handleProjectCreate}
        />
      )}

      {/* Create Project Button */}
      <div className="fixed bottom-10 right-20">
        <button
          onClick={() => setShowCreateProjectModal(true)}
          className="bg-blue-500 text-white p-4 rounded-full shadow-lg"
        >
          ایجاد پروژه
        </button>
      </div>
    </div>
  );
};

export default DashboardRoot;
