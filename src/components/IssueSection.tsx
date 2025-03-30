import React from "react";
import {
  AlertCircle,
  FileCode,
  Layers,
  Zap,
  Trash2,
  Link,
  Sliders,
  Grid,
} from "lucide-react";

interface IssueProps {
  report: {
    path: string;
    startLine: number;
    endLine: number;
    smellType: string;
  }[];
}

const IssuesSection = ({ report }: IssueProps) => {
  // Remove duplicate code smells
  const uniqueSmells = Array.from(
    new Set(report.map((issue) => issue.smellType))
  );

  const issueDetails = {
    "Cyclomatic Complexity": {
      description:
        "Code with too many decision points, making it harder to test and maintain.",
      icon: <Grid className="h-6 w-6 text-purple-500" />,
    },
    "God Class": {
      description:
        "A class that does too much, violating the Single Responsibility Principle.",
      icon: <FileCode className="h-6 w-6 text-red-500" />,
    },
    "Excessive Parameter List": {
      description:
        "Methods with too many parameters, making them hard to understand and use.",
      icon: <Sliders className="h-6 w-6 text-yellow-500" />,
    },
    "Coupling Between Objects": {
      description:
        "High dependency between classes, making the system less modular and harder to change.",
      icon: <Link className="h-6 w-6 text-blue-500" />,
    },
    "Dead Code": {
      description:
        "Unused or unnecessary code that adds complexity and should be removed.",
      icon: <Trash2 className="h-6 w-6 text-gray-500" />,
    },
  };

  return (
    <div className="bg-white rounded-3xl flex-[3] p-4">
      <h2 className="text-2xl font-bold text-gray-700">Issues</h2>
      <div className="flex flex-col gap-2 mt-1">
        {uniqueSmells.map((smellType, index) => {
          const details = issueDetails[smellType] || {
            description: "Unknown code smell detected.",
            icon: <AlertCircle className="h-6 w-6 text-gray-500" />,
          };
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-2">
                <div className="mr-2 bg-blue-100 p-2 rounded-full">
                  {details.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {smellType}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-700">
                {details.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IssuesSection;
