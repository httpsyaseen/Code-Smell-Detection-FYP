"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Cookies from "js-cookie";

interface Project {
  id: string;
  name: string;
  date: string;
  smells: number;
  quality: number;
}

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/v1/project/recent-projects",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        const data = await res.json();

        const mapped: Project[] = data.projects.map((p: any) => ({
          id: p._id,
          name: p.title || "Untitled", // fallback in case name is missing
          date: p.createdAt,
          smells: p.latestVersion?.report?.totalSmells || 0,
          quality: getQualityScore(p.latestVersion?.report?.totalSmells || 0),
        }));

        setProjects(mapped);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getQualityScore = (smells: number) => {
    if (smells === 0) return 100;
    if (smells <= 3) return 85;
    if (smells <= 5) return 65;
    return 40; // Adjust logic as needed
  };

  const getQualityBadge = (score: number) => {
    if (score >= 80)
      return (
        <Badge className="bg-green-600 hover:bg-green-700 text-white font-medium">
          Good
        </Badge>
      );
    if (score >= 60)
      return (
        <Badge className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium">
          Average
        </Badge>
      );
    return (
      <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium">
        Poor
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;

      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="overflow-auto max-h-[350px] dark:bg-[#0f162b] rounded-md dark:border-[#0f162b] border-2">
      <Table className="dark:border-[#0f162b] ">
        <TableHeader className=" dark:bg-[#3a4255] rounded-sm">
          <TableRow>
            <TableHead className="font-semibold text-base">
              Project Name
            </TableHead>
            {!isMobile && (
              <TableHead className="font-semibold text-base">
                Uploaded
              </TableHead>
            )}
            <TableHead className="font-semibold text-base">Smells</TableHead>
            <TableHead className="font-semibold text-base">Quality</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              onMouseEnter={() => setHoveredRow(project.id)}
              onMouseLeave={() => setHoveredRow(null)}
              className={`cursor-pointer transition-colors text-base ${
                hoveredRow === project.id ? "bg-blue-50" : ""
              }`}
            >
              <TableCell className="font-medium">{project.name}</TableCell>
              {!isMobile && <TableCell>{formatDate(project.date)}</TableCell>}
              <TableCell>{project.smells}</TableCell>
              <TableCell>{getQualityBadge(project.quality)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {projects.length === 0 && (
        <h1 className="mt-10  text-2xl font-semibold text-center flex justify-center items-center">
          No Projects
        </h1>
      )}
    </div>
  );
}
