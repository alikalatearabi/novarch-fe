"use client";

import React, { useEffect, useState, useCallback } from "react";
import Sidebar from "@/components/dashboard/sidebar/Sidebar";
import DashboardHeader from "./DashboardHeader";
import CaptureContainer from "../capture/CaptureContainer";
import CreateProjectModal from "./CreateProjectModal";
import { useProject } from "../../context/projectContext";
import { api } from "@/api";
import { FaFolder } from "react-icons/fa";
import { Trash2Icon } from "lucide-react";

import "./dashbaordStyle.css";
import { Badge } from "@radix-ui/themes";

const DashboardRoot = ({ children }) => {
  const { project, setProject } = useProject();
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
    if (!project.id) {
      fetchProjects();
    }
  }, [project.id, fetchProjects]);

  const handleProjectClick = (prj) => {
    setProject({ ...prj })
  };

  const handleProjectCreate = () => {
    setShowCreateProjectModal(false);
  };

  const handleDeleteProject = async (projectId) => {
    if (!confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      const { ok, data } = await api.project.delete(project.id);

      if (!ok) {
        throw new Error(data?.message || "Failed to delete the project");
      }

      alert("Project deleted successfully.");
      setProjects((prevProjects) =>
        prevProjects.filter((prj) => prj.id !== project.id)
      );
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project. Please try again.");
    }
  };

  return (
    <div className="flex-1 w-full ps-[16px] overflow-y-auto" style={{ maxWidth: 'calc(100vw - 200px)' }}>
          {!project.id ? (
            <div className="projects-container">
              <h2 className="projects-title">پروژه‌های شما</h2>
              <div className="projects-grid">
                {projects.map((prj) => (
                  <div
                    key={prj.id}
                    className="project-card"
                    onClick={() => handleProjectClick(prj)}
                  >
                    <div className="project-card-header">
                      <div className="project-icon">
                        <FaFolder />
                      </div>
                      <h3 className="project-name">{prj.name}</h3>
                    </div>

                    <Badge size="3" className="bg-[#d1fae5] text-[#065f46] w-fit" >
                      {prj.status || "فعال"}
                    </Badge>
                    <div className="project-card-footer">
                      <button
                        className="delete-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteProject(prj.id);
                        }}
                      >
                        <Trash2Icon size={20} className="h-5 w-5 " />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>{children}</>
          )}

          <div id="capture" className="absolute top-0 right-0 z-30">
            <CaptureContainer />
          </div>

          {showCreateProjectModal && (
            <CreateProjectModal
              onClose={() => setShowCreateProjectModal(false)}
              onCreate={handleProjectCreate}
            />
          )}

          {!project.id && (
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
  )
};

export default DashboardRoot;
