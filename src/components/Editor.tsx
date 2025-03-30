"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileCode, AlertCircle, MoveLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import { List } from "react-virtualized";
import "react-virtualized/styles.css";
import { Button } from "./ui/button";

type CodeSmell = {
  type: string;
  lineStart: number;
  lineEnd: number;
  description: string;
  refactoring: string;
};

type FileMetrics = {
  filename: string;
  smells: CodeSmell[];
};

type ExtractedFile = {
  name: string;
  path: string;
  content: string;
};

interface AnalysisPageProps {
  zipFile: File | null;
  report: {
    path: string;
    startLine: number;
    endLine: number;
    smellType: string;
  }[];
  setSection: React.Dispatch<React.SetStateAction<string>>;
}

export default function AnalysisPage({
  zipFile,
  report,
  setSection,
}: AnalysisPageProps) {
  const [isLoadingMetrics, setIsLoadingMetrics] = useState(false);
  const [extractedFiles, setExtractedFiles] = useState<ExtractedFile[]>([]);
  const [fileMetrics, setFileMetrics] = useState<FileMetrics[]>([]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const listRef = useRef<List>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const [smellLines, setSmellLines] = useState<number[]>([]);
  const [currentSmellIndex, setCurrentSmellIndex] = useState<number>(-1);

  useEffect(() => {
    if (report.length > 0) {
      initializeAnalysis();
    }
  }, [zipFile, report]);

  useEffect(() => {
    if (selectedFile && listRef.current) {
      const metrics = getSelectedFileMetrics();
      if (metrics && metrics.smells.length > 0) {
        const lines = [
          ...new Set(metrics.smells.map((smell) => smell.lineStart)),
        ].sort((a, b) => a - b);
        setSmellLines(lines);
        if (lines.length > 0) {
          setCurrentSmellIndex(0);
          listRef.current.scrollToRow(lines[0] + 20);
        }
      } else {
        setSmellLines([]);
        setCurrentSmellIndex(-1);
      }
    }
  }, [selectedFile]);

  const initializeAnalysis = async () => {
    try {
      setIsLoadingMetrics(true);
      const extracted = await extractZipFile(zipFile);
      const metricsData = processReportData(extracted);
      setFileMetrics(metricsData);
      if (metricsData.length > 0 && !selectedFile) {
        setSelectedFile(metricsData[0].filename);
      }
    } catch (error) {
      console.error("Error initializing analysis:", error);
    } finally {
      setIsLoadingMetrics(false);
    }
  };

  const extractZipFile = async (
    file: File | null
  ): Promise<ExtractedFile[]> => {
    const extractedFiles: ExtractedFile[] = [];

    if (!file) {
      // Mock data if no zip file is provided
      const mockFiles = report.map((item) => ({
        name: item.path.split("/").pop() || item.path,
        path: item.path,
        content: "// Mock content for " + item.path + "\n".repeat(1000),
      }));
      setExtractedFiles(mockFiles);
      console.log("Mock extracted files:", mockFiles);
      return mockFiles;
    }

    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);
      const reportPaths = new Set(report.map((item) => item.path));

      // Iterate over all files in the zip
      const promises = Object.entries(zipContent.files).map(
        async ([filename, zipEntry]) => {
          if (!zipEntry.dir && reportPaths.has(filename)) {
            // Only extract files in the report
            try {
              const content = await zipEntry.async("string");
              extractedFiles.push({
                name: filename.split("/").pop() || filename,
                path: filename,
                content: content || "// No content available",
              });
            } catch (err) {
              console.error(`Error extracting ${filename}:`, err);
              extractedFiles.push({
                name: filename.split("/").pop() || filename,
                path: filename,
                content: "// Error extracting content",
              });
            }
          }
        }
      );

      await Promise.all(promises);
      setExtractedFiles(extractedFiles);
      console.log("Extracted files from zip:", extractedFiles);
      return extractedFiles;
    } catch (error) {
      console.error("Error loading zip file:", error);
      setExtractedFiles([]);
      return [];
    }
  };

  const processReportData = (extracted: ExtractedFile[]): FileMetrics[] => {
    const metricsMap: Record<string, FileMetrics> = {};

    report.forEach((item) => {
      if (!metricsMap[item.path]) {
        metricsMap[item.path] = {
          filename: item.path,
          smells: [],
        };
      }
      metricsMap[item.path].smells.push({
        type: item.smellType,
        lineStart: item.startLine,
        lineEnd: item.endLine,
        description: `This code has a ${item.smellType} smell that affects maintainability.`,
        refactoring: `Consider refactoring this ${item.smellType} by applying appropriate design patterns.`,
      });
    });

    const metricsData = Object.values(metricsMap);
    setFileMetrics(metricsData);
    return metricsData;
  };

  const renderFileList = (metric: FileMetrics) => {
    const filename = metric.filename.split("/").pop() || metric.filename;
    const hasSmells = metric.smells.length > 0;
    return (
      <div
        key={metric.filename}
        className={cn(
          "flex items-center py-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer rounded-md transition-colors w-full",
          selectedFile === metric.filename && "bg-blue-100 dark:bg-blue-900/30"
        )}
        onClick={() => setSelectedFile(metric.filename)}
      >
        <FileCode className="h-4 w-4 mr-2 text-orange-500 flex-shrink-0" />
        <span className="text-sm truncate flex-1" title={filename}>
          {filename}
        </span>
        {hasSmells && (
          <AlertCircle className="h-4 w-4 ml-2 text-yellow-500 flex-shrink-0" />
        )}
      </div>
    );
  };

  const getSelectedFileMetrics = () => {
    if (!selectedFile) return null;
    return fileMetrics.find((metric) => metric.filename === selectedFile);
  };

  const getSelectedFileContent = () => {
    if (!selectedFile) return "";
    const file = extractedFiles.find((file) => file.path === selectedFile);
    return file?.content || "// No content available";
  };

  const rowRenderer = ({ index, key, style }) => {
    const code = getSelectedFileContent();
    if (!code) return null;
    const lines = code.split("\n");
    const line = lines[index];
    const metrics = getSelectedFileMetrics();
    const lineNumber = index + 1;
    const lineSmells =
      metrics?.smells.filter(
        (smell) => lineNumber >= smell.lineStart && lineNumber <= smell.lineEnd
      ) || [];
    const hasSmell = lineSmells.length > 0;

    return (
      <div
        key={key}
        style={style}
        className={cn(
          "flex relative w-full",
          hasSmell && "bg-yellow-100 dark:bg-yellow-900/30"
        )}
      >
        <div className="w-12 text-right pr-4 text-gray-500 select-none border-r border-gray-200 dark:border-gray-700">
          {lineNumber}
        </div>
        <pre className="pl-4 whitespace-pre-wrap overflow-x-hidden flex-1 max-w-full">
          <code>{line}</code>
        </pre>
        {hasSmell && (
          <div className="absolute left-0 -top-7 flex flex-col gap-1 text-xs z-10">
            {lineSmells.map(
              (smell, idx) =>
                lineNumber === smell.lineStart && (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-yellow-300 dark:bg-yellow-700 rounded-lg text-yellow-900 dark:text-yellow-100 shadow-sm"
                  >
                    {smell.type}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    );
  };

  const scrollToNextSmell = () => {
    if (smellLines.length > 0 && listRef.current) {
      const nextIndex = (currentSmellIndex + 1) % smellLines.length;
      setCurrentSmellIndex(nextIndex);
      listRef.current.scrollToRow(smellLines[nextIndex] + 20);
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100"
      )}
    >
      <div className="p-4">
        <Button
          className="my-4 flex gap-1"
          variant="outline"
          onClick={() => setSection("report")}
        >
          <MoveLeft />
          Back to Report
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 bg-white border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 font-medium">
              Files with Code Smells
            </div>
            <div className="p-2 overflow-auto h-[80vh] w-full">
              {isLoadingMetrics ? (
                <div className="text-center bg-white p-4 text-gray-500">
                  Loading metrics...
                </div>
              ) : fileMetrics.length > 0 ? (
                <div className="w-full">
                  {fileMetrics.map((metric) => renderFileList(metric))}
                </div>
              ) : (
                <div className="text-center p-4 text-gray-500">
                  No files with code smells found
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-3 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
            {isLoadingMetrics ? (
              <div className="flex items-center justify-center h-[80vh] text-gray-500 dark:text-gray-400">
                Loading code analysis...
              </div>
            ) : selectedFile ? (
              <>
                <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 flex flex-col sm:flex-row sm:justify-between">
                  <div className="font-medium mb-2 sm:mb-0">{selectedFile}</div>
                  <div className="flex flex-wrap gap-4 text-sm items-center">
                    {getSelectedFileMetrics() && (
                      <div>
                        <span className="font-medium">Smells:</span>{" "}
                        {getSelectedFileMetrics()?.smells.length}
                      </div>
                    )}
                    {smellLines.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={scrollToNextSmell}
                        className="flex gap-1"
                      >
                        <ArrowRight className="h-4 w-4" />
                        Next
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  ref={codeContainerRef}
                  className="h-[80vh] overflow-y-auto font-mono text-sm bg-white dark:bg-gray-950"
                >
                  <div className="p-4">
                    <List
                      ref={listRef}
                      width={codeContainerRef.current?.clientWidth || 800}
                      height={codeContainerRef.current?.clientHeight || 600}
                      rowCount={getSelectedFileContent().split("\n").length}
                      rowHeight={30}
                      rowRenderer={rowRenderer}
                      overscanRowCount={10}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[80vh] text-gray-500 dark:text-gray-400">
                Select a file to view its content
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
