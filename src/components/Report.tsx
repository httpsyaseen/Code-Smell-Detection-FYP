import React from "react";
import { Button } from "./ui/button";
import Graph from "./Graph";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";
import IssuesSection from "./IssueSection";

import Link from "next/link";

interface ReportProps {
  zipFile: File | null;
  report: {
    path: string;
    startLine: number;
    endLine: number;
    smellType: string;
  }[];
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

const Report = ({ zipFile, report, setSection }: ReportProps) => {
  const ProjectName = zipFile?.name.split(".")[0] || "Project";
  const handleDownloadReport = () => {
    const jsonString = JSON.stringify(report, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "code_smell_report.json";
    document.body.appendChild(a);
    a.click();

    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-100">
        <div>
          <Button className="my-4 flex gap-1 hover:pointer" variant="outline">
            <ArrowLeft />
            <Link href="/">Back to Dashboard</Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {ProjectName[0].toUpperCase() + ProjectName.slice(1)}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-gray-400 dark:text-gray-500">•</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {"Java Project"}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            className="cursor-pointer"
          >
            <Code className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="cursor-pointer"
            onClick={() => setSection("editor")}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Open in Editor
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 max-w-[300px] border border-gray-200 my-4">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          Total Code Smells
        </h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {report.length}
        </p>
      </div>

      <div className="flex flex-1 w-full gap-4 mt-8 ">
        <Graph report={report} />
        <IssuesSection report={report} />
        {/* <div className="bg-white rounded-3xl flex-[3]">
          <h2 className="txext-3xl font-medium p-4">Issues</h2>
        </div> */}
      </div>
    </div>
  );
};

export default Report;
