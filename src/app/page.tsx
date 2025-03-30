import {
  ArrowRight,
  BarChart2,
  FileCode,
  Info,
  AlertTriangle,
  Zap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import ProjectAccordion from "@/components/project-accordion";
import CodeSmellInsightCard from "@/components/code-smell-card";

export default function Dashboard() {
  // Sample projects data with code smell details
  const projects = [
    {
      id: "1",
      name: "Frontend App",
      type: "React",
      lastAnalyzed: "2 days ago",
      totalFiles: 42,
      filesWithSmells: 8,
      codeSmells: {
        duplicatedCode: 4,
        complexMethods: 3,
        longMethods: 2,
        unusedVariables: 3,
        deepNesting: 1,
        largeClasses: 2,
      },
      codeSmellTrend: [
        { date: "Jan", count: 18 },
        { date: "Feb", count: 15 },
        { date: "Mar", count: 12 },
        { date: "Apr", count: 15 },
        { date: "May", count: 10 },
      ],
      codeQualityScore: 72,
      maintainabilityIndex: 65,
      technicalDebt: "4.5 days",
    },
    {
      id: "2",
      name: "Backend API",
      type: "Node.js",
      lastAnalyzed: "1 day ago",
      totalFiles: 36,
      filesWithSmells: 5,
      codeSmells: {
        duplicatedCode: 2,
        complexMethods: 1,
        longMethods: 3,
        unusedVariables: 2,
        deepNesting: 0,
        largeClasses: 1,
      },
      codeSmellTrend: [
        { date: "Jan", count: 12 },
        { date: "Feb", count: 10 },
        { date: "Mar", count: 8 },
        { date: "Apr", count: 9 },
        { date: "May", count: 7 },
      ],
      codeQualityScore: 84,
      maintainabilityIndex: 78,
      technicalDebt: "2.5 days",
    },
    {
      id: "3",
      name: "Mobile App",
      type: "React Native",
      lastAnalyzed: "3 days ago",
      totalFiles: 58,
      filesWithSmells: 12,
      codeSmells: {
        duplicatedCode: 5,
        complexMethods: 4,
        longMethods: 3,
        unusedVariables: 3,
        deepNesting: 2,
        largeClasses: 3,
      },
      codeSmellTrend: [
        { date: "Jan", count: 22 },
        { date: "Feb", count: 20 },
        { date: "Mar", count: 18 },
        { date: "Apr", count: 15 },
        { date: "May", count: 14 },
      ],
      codeQualityScore: 68,
      maintainabilityIndex: 62,
      technicalDebt: "6 days",
    },
    {
      id: "4",
      name: "E-commerce",
      type: "Next.js",
      lastAnalyzed: "5 days ago",
      totalFiles: 64,
      filesWithSmells: 7,
      codeSmells: {
        duplicatedCode: 3,
        complexMethods: 1,
        longMethods: 1,
        unusedVariables: 1,
        deepNesting: 0,
        largeClasses: 1,
      },
      codeSmellTrend: [
        { date: "Jan", count: 10 },
        { date: "Feb", count: 8 },
        { date: "Mar", count: 9 },
        { date: "Apr", count: 7 },
        { date: "May", count: 6 },
      ],
      codeQualityScore: 88,
      maintainabilityIndex: 82,
      technicalDebt: "1.5 days",
    },
  ];

  // Code smell insights data
  const codeSmellInsights = [
    {
      id: "1",
      title: "Duplicated Code",
      description:
        "Repeated code fragments that could be refactored into reusable functions or components.",
      icon: FileCode,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
      impact:
        "Increases maintenance effort and risk of inconsistent bug fixes.",
      tips: [
        "Extract repeated code into functions or components",
        "Use design patterns to eliminate duplication",
        "Consider using utility libraries",
      ],
    },
    {
      id: "2",
      title: "Complex Methods",
      description:
        "Functions with high cyclomatic complexity that are difficult to understand and test.",
      icon: AlertTriangle,
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-100 dark:bg-amber-900/30",
      impact: "Reduces code readability and increases the likelihood of bugs.",
      tips: [
        "Break down complex methods into smaller ones",
        "Reduce nested conditionals with early returns",
        "Use polymorphism instead of complex switch statements",
      ],
    },
    {
      id: "3",
      title: "Long Methods",
      description:
        "Methods that are too long, making them difficult to understand and maintain.",
      icon: Zap,
      color: "text-red-500 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
      impact: "Decreases code readability and makes debugging more difficult.",
      tips: [
        "Extract related code into helper methods",
        "Follow the Single Responsibility Principle",
        "Aim for methods that fit on one screen",
      ],
    },
    {
      id: "4",
      title: "Unused Variables",
      description: "Variables that are declared but never used in the code.",
      icon: Info,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
      impact:
        "Clutters code and can lead to confusion about the code's intent.",
      tips: [
        "Remove unused variables",
        "Use linting tools to automatically detect them",
        "Review code regularly to clean up unused declarations",
      ],
    },
  ];

  // Calculate total code smells across all projects
  const totalCodeSmells = projects.reduce((total, project) => {
    return (
      total +
      Object.values(project.codeSmells).reduce((sum, count) => sum + count, 0)
    );
  }, 0);

  // Calculate average code quality score
  const avgCodeQualityScore = Math.round(
    projects.reduce((sum, project) => sum + project.codeQualityScore, 0) /
      projects.length
  );

  return (
    <div className="space-y-8">
      {/* Dashboard Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Code Quality Overview
            </h2>
            <div
              className={`p-2 rounded-full ${
                avgCodeQualityScore >= 80
                  ? "bg-emerald-100 dark:bg-emerald-900/30"
                  : avgCodeQualityScore >= 60
                  ? "bg-amber-100 dark:bg-amber-900/30"
                  : "bg-red-100 dark:bg-red-900/30"
              }`}
            >
              <TrendingUp
                className={`h-5 w-5 ${
                  avgCodeQualityScore >= 80
                    ? "text-emerald-500 dark:text-emerald-400"
                    : avgCodeQualityScore >= 60
                    ? "text-amber-500 dark:text-amber-400"
                    : "text-red-500 dark:text-red-400"
                }`}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Average Quality Score
                </span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {avgCodeQualityScore}/100
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    avgCodeQualityScore >= 80
                      ? "bg-emerald-500"
                      : avgCodeQualityScore >= 60
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${avgCodeQualityScore}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Total Projects
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {projects.length}
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Code Smells
                </div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">
                  {totalCodeSmells}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23] md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Code Smell Distribution
            </h2>
            <Button variant="outline" size="sm" className="text-xs">
              <BarChart2 className="h-3.5 w-3.5 mr-1" />
              View Details
            </Button>
          </div>

          <div className="h-48">
            <CodeSmellDistributionChart projects={projects} />
          </div>
        </div>
      </div>

      {/* Code Smell Insights */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Understanding Code Smells
          </h2>

          <Button variant="outline" size="sm" className="text-xs">
            Learn More
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {codeSmellInsights.map((insight) => (
            <CodeSmellInsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </div>

      {/* Projects Accordion */}
      <div className="bg-white dark:bg-[#0F0F12] rounded-xl p-6 border border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileCode className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Project Analysis
          </h2>

          <Button variant="outline" size="sm" className="text-xs">
            View All Projects
            <ArrowRight className="ml-1 h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="space-y-3">
          {/* {projects.map((project) => (
            <ProjectAccordion key={project.id} project={project} />
          ))} */}
        </div>
      </div>
    </div>
  );
}

// Code Smell Distribution Chart Component
function CodeSmellDistributionChart({ projects }) {
  // Aggregate code smells across all projects
  const aggregatedSmells = {
    duplicatedCode: 0,
    complexMethods: 0,
    longMethods: 0,
    unusedVariables: 0,
    deepNesting: 0,
    largeClasses: 0,
  };

  projects.forEach((project) => {
    Object.keys(aggregatedSmells).forEach((key) => {
      if (project.codeSmells[key]) {
        aggregatedSmells[key] += project.codeSmells[key];
      }
    });
  });

  const totalSmells = Object.values(aggregatedSmells).reduce(
    (sum, count) => sum + count,
    0
  );

  // Format smell names for display
  const formatSmellName = (name) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  // Colors for different code smell types
  const colors = {
    duplicatedCode: "#3b82f6", // blue
    complexMethods: "#f59e0b", // amber
    longMethods: "#ef4444", // red
    unusedVariables: "#8b5cf6", // purple
    deepNesting: "#10b981", // emerald
    largeClasses: "#6366f1", // indigo
  };

  return (
    <div className="flex h-full items-end">
      {Object.entries(aggregatedSmells).map(([key, value]) => {
        const percentage = (value / totalSmells) * 100;
        return (
          <div
            key={key}
            className="flex-1 flex flex-col items-center justify-end h-full"
          >
            <div
              className="w-full max-w-[40px] rounded-t-md transition-all duration-500 ease-in-out"
              style={{
                height: `${Math.max(percentage, 5)}%`,
                backgroundColor: colors[key],
              }}
            ></div>
            <div className="mt-2 text-xs text-gray-600 dark:text-gray-400 text-center w-full truncate px-1">
              {formatSmellName(key)}
            </div>
            <div className="text-xs font-medium text-gray-900 dark:text-white">
              {value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
