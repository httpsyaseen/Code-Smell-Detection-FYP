"use client";

import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Code,
  ExternalLink,
  GitBranch,
  GitCommit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CodeSmellChart from "@/components/code-smell-chart";
// import { BarChart } from "@/components/bar-chart";

const projects = [
  {
    id: "1",
    name: "Frontend App",
    type: "React",
    codeSmells: 12,
    complexity: "Medium",
    lastAnalyzed: "2 days ago",
    repo: "github.com/user/frontend-app",
    branch: "main",
    commit: "a1b2c3d",
    issues: {
      high: 3,
      medium: 5,
      low: 4,
    },
    codeSmellsByType: {
      duplicatedCode: 4,
      complexMethods: 3,
      longMethods: 2,
      unusedVariables: 3,
    },
    detailedIssues: [
      {
        id: "1-1",
        type: "high",
        description: "Memory leak in component lifecycle",
        file: "src/components/Dashboard.js",
        line: 45,
      },
      {
        id: "1-2",
        type: "high",
        description: "Unhandled promise rejection",
        file: "src/services/api.js",
        line: 23,
      },
      {
        id: "1-3",
        type: "high",
        description: "Infinite loop potential",
        file: "src/hooks/useData.js",
        line: 17,
      },
      {
        id: "1-4",
        type: "medium",
        description: "Unused state variable",
        file: "src/components/UserProfile.js",
        line: 12,
      },
      {
        id: "1-5",
        type: "medium",
        description: "Inefficient rendering",
        file: "src/components/List.js",
        line: 34,
      },
      {
        id: "1-6",
        type: "low",
        description: "Missing alt attribute",
        file: "src/components/Avatar.js",
        line: 8,
      },
    ],
  },
  {
    id: "2",
    name: "Backend API",
    type: "Node.js",
    codeSmells: 8,
    complexity: "Low",
    lastAnalyzed: "1 day ago",
    repo: "github.com/user/backend-api",
    branch: "develop",
    commit: "e5f6g7h",
    issues: {
      high: 1,
      medium: 3,
      low: 4,
    },
    codeSmellsByType: {
      duplicatedCode: 2,
      complexMethods: 1,
      longMethods: 3,
      unusedVariables: 2,
    },
    detailedIssues: [
      {
        id: "2-1",
        type: "high",
        description: "SQL injection vulnerability",
        file: "src/database/queries.js",
        line: 78,
      },
      {
        id: "2-2",
        type: "medium",
        description: "Unhandled error in async function",
        file: "src/controllers/user.js",
        line: 45,
      },
      {
        id: "2-3",
        type: "low",
        description: "Deprecated method usage",
        file: "src/utils/helpers.js",
        line: 23,
      },
    ],
  },
];

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;

  const fileName =
    typeof window !== "undefined"
      ? sessionStorage.getItem("currentFileName") || "Unknown File"
      : "Unknown File";

  const project = projects.find((p) => p.id === projectId) || projects[0];

  const codeSmellTypes = Object.entries(project.codeSmellsByType)
    .map(([type, count]) => `${type}: ${count}`)
    .join(", ");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-2"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.name}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {project.type}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <GitBranch className="inline h-3 w-3 mr-1" />
              {project.branch}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <GitCommit className="inline h-3 w-3 mr-1" />
              {project.commit.substring(0, 7)}
            </span>
            <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              File: {fileName}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Editor
          </Button>
          <Button className="bg-zinc-900 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">
            <Code className="mr-2 h-4 w-4" />
            Re-analyze
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Code Smells
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.codeSmells}
          </p>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            {codeSmellTypes}
          </div>
          <div
            className={cn(
              "mt-1 text-xs inline-flex items-center px-2 py-0.5 rounded-full",
              project.codeSmells > 10
                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                : project.codeSmells > 5
                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
            )}
          >
            {project.complexity} complexity
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Issues
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {project.issues.high + project.issues.medium + project.issues.low}
          </p>
          <div className="mt-1 flex gap-2">
            <span className="text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              {project.issues.high} high
            </span>
            <span className="text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
              {project.issues.medium} medium
            </span>
            <span className="text-xs inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              {project.issues.low} low
            </span>
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-4 border border-gray-200 dark:border-[#1F1F23]">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            Repository
          </h3>
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {project.repo}
          </p>
          <div className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Last analyzed: {project.lastAnalyzed}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Code Smell Distribution
          </h2>
          <CodeSmellChart codeSmells={project.codeSmellsByType} />
          <div className="mt-6">
            <h3 className="text-md font-bold text-gray-900 dark:text-white mb-4">
              Code Smell Breakdown
            </h3>
            {/* <BarChart
              data={Object.entries(project.codeSmellsByType).map(
                ([key, value]) => ({
                  name: key,
                  value: value,
                })sdcvhbjnrawzexcervrtybunim,p.[wzasexrcdvftgybnhuijmiko,l.;[/]]
              )}
            /> */}
          </div>
        </div>
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Top Issues
          </h2>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
