"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardHeader from "./DashboardHeader";
import CaptureRoot from "../capture/CaptureRoot";
import CreateProjectModal from "./CreateProjectModal";
import { useProject } from "../../context/projectContext";
import { api } from "@/api";
import "./dashbaordStyle.css";

const DashboardRoot = ({ children }) => {
  const { projectName, setProjectName, projectId, setProjectId } = useProject();
  const [projects, setProjects] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { ok, data } = await api.project.getAll();

        if (!ok) {
          throw new Error("Failed to fetch projects");
        }

        if (data.success) {
          setProjects(data.responseObject);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = (project) => {
    setProjectName(project.name);
    setProjectId(project.id);
  };

  const handleProjectCreate = (project) => {
    setProjectName(project.name);
    setProjectId(project.id);
  };

  return (
    <div id="root-container">
      <DashboardHeader projectName={projectName} />
      <Sidebar />

      {!projectId ? (
        <div className="projects-container">
          <h2 className="projects-title">پروژه‌های شما</h2>
          <div className="projects-grid">
            {projects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project)}
              >
                <div className="project-header">
                  <div className="project-icon">📂</div>
                  <span className="project-status">
                    {project.status || "Active"}
                  </span>
                </div>
                <h3 className="project-name">{project.name}</h3>
                <p className="project-description">
                  {project.description || "بدون توضیحات"}
                </p>
                <div className="project-actions">
                  <button
                    className="delete-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Delete project: ${project.name}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M4 7h16M10 3h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="lg:mr-[70px]">{children}</div>
      )}

      <div id="capture" className="absolute top-0 z-30">
        <CaptureRoot />
      </div>

      {showCreateProjectModal && (
        <CreateProjectModal
          onClose={() => setShowCreateProjectModal(false)}
          onCreate={handleProjectCreate}
        />
      )}

      {/* Conditionally render the "ایجاد پروژه" button */}
      {!projectId && (
        <div className="fixed bottom-10 right-20">
          <button
            onClick={() => setShowCreateProjectModal(true)}
            className="create-project-button"
          >
            ایجاد پروژه
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardRoot;
