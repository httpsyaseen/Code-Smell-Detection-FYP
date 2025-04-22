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

interface Project {
  id: number;
  name: string;
  date: string;
  smells: number;
  quality: number;
}

interface RecentProjectsProps {
  projects: Project[];
}

export default function RecentProjects({ projects }: RecentProjectsProps) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define mobile breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
      // Simple date formatting without external libraries
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
    <div className="overflow-auto max-h-[350px]">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className=" font-semibold text-base">
              Project Name
            </TableHead>
            {!isMobile && (
              <TableHead className=" font-semibold text-base">
                Uploaded
              </TableHead>
            )}
            <TableHead className=" font-semibold text-base">Smells</TableHead>
            <TableHead className=" font-semibold text-base">Quality</TableHead>
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
              <TableCell className="font-medium ">{project.name}</TableCell>
              {!isMobile && (
                <TableCell className="">{formatDate(project.date)}</TableCell>
              )}
              <TableCell className="">{project.smells}</TableCell>
              <TableCell>{getQualityBadge(project.quality)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
