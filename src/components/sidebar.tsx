"use client";

import type React from "react";
import {
  BarChart2,
  FileCode,
  FolderGit2,
  Search,
  UploadIcon,
} from "lucide-react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function Sidebar() {
  const [searchQuery, setSearchQuery] = useState("");

  const projects = [
    { id: "1", name: "Frontend App", type: "React" },
    { id: "2", name: "Backend API", type: "Node.js" },
    { id: "3", name: "Mobile App", type: "React Native" },
    { id: "4", name: "E-commerce", type: "Next.js" },
    { id: "5", name: "Admin Dashboard", type: "Vue.js" },
  ];

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function NavItem({
    href,
    icon: Icon,
    children,
  }: {
    href: string;
    icon: any;
    children: React.ReactNode;
  }) {
    return (
      <Link
        href={href}
        className="flex items-center px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] w-full"
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        <span>{children}</span>
      </Link>
    );
  }

  function ProjectItem({
    project,
  }: {
    project: { id: string; name: string; type: string };
  }) {
    return (
      <Link
        href={`/project/${project.id}`}
        className="flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23] w-full"
      >
        <div className="flex items-center">
          <FileCode className="h-4 w-4 mr-3 flex-shrink-0" />
          <span>{project.name}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {project.type}
        </span>
      </Link>
    );
  }

  return (
    <nav className="w-64 border-r border-gray-200 dark:border-[#1F1F23] bg-white dark:bg-[#0F0F12] overflow-y-auto">
      <div className="h-full py-4 px-2">
        <div className="space-y-6">
          <div>
            <div className="px-1 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Overview
            </div>
            <div className="space-y-1">
              <NavItem href="/" icon={Home}>
                Dashboard
              </NavItem>
              <NavItem href="/new-project" icon={UploadIcon}>
                Upload New Project
              </NavItem>
              <NavItem href="/analytics" icon={BarChart2}>
                Analytics
              </NavItem>
              <NavItem href="/repositories" icon={FolderGit2}>
                Projects
              </NavItem>
            </div>
          </div>

          <div>
            <div className="px-1 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Projects
            </div>
            <div className="px-1 mb-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search project"
                  className="pl-8 h-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              {filteredProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
