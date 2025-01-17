"use client";

import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardHeader from "./DashboardHeader";
import CaptureRoot from "../capture/CaptureRoot";
import CreateProjectModal from "./CreateProjectModal";
import { useProject } from "../../context/projectContext";
import { api } from "@/api";
import "./dashbaordStyle.css";
import { FaFolder } from "react-icons/fa";

const DashboardRoot = ({ children }) => {
  const { projectName, setProjectName, projectId, setProjectId } = useProject();
  const [projects, setProjects] = useState([]);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

  // Fetch projects function
  const fetchProjects = useCallback(async () => {
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
  }, []);

  // Fetch projects initially
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Fetch projects when returning to project list
  useEffect(() => {
    if (!projectId) {
      fetchProjects();
    }
  }, [projectId, fetchProjects]);

  const handleProjectClick = (project) => {
    setProjectName(project.name);
    setProjectId(project.id);
  };

  const handleProjectCreate = () => {
    setShowCreateProjectModal(false);
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const { ok, data } = await api.project.delete(projectId);

      if (!ok) {
        throw new Error(data?.message || "Failed to delete the project");
      }

      alert("Project deleted successfully.");
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project. Please try again.");
    }
  };

  return (
    <div id="root-container" className="w-full">
      <DashboardHeader projectName={projectName} />
      <div className="flex flex-row h-[92vh] w-full">
        <Sidebar />
        <div className="flex-1 w-full py-[16px] ps-[16px]" style={{ maxWidth: 'calc(100vw - 200px)'}}>
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
                    {/* Card Header */}
                    <div className="project-card-header">
                      <div className="project-icon">
                        <FaFolder />
                      </div>
                      <h3 className="project-name">{project.name}</h3>
                    </div>

                    {/* Status Badge */}
                    <div className="project-status">
                      {project.status || "فعال"}
                    </div>

                    {/* Description */}
                    {/* <p className="project-description">
                {project.description || "بدون توضیحات"}
              </p> */}

                    {/* Card Footer */}
                    <div className="project-card-footer">
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(project.id);
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
            <div>{children}</div>
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

          {!projectId && (
            <div className="fixed bottom-5">
              <button
                onClick={() => setShowCreateProjectModal(true)}
                className="create-project-button"
              >
                ایجاد پروژه
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardRoot;
