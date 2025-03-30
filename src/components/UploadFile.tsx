"use client";
import { useState } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface uploadFileProps {
  zipFile: File | null;
  setZipFile: React.Dispatch<React.SetStateAction<File | null>>;
  setSection: React.Dispatch<React.SetStateAction<string>>;
  setReport: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function UploadFile({
  zipFile,
  setZipFile,
  setSection,
  setReport,
}: uploadFileProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Handle ZIP file upload
  const handleZipUpload = async (file: File) => {
    if (!file || !file.name.endsWith(".zip")) {
      alert("Please upload a ZIP file");
      return;
    }

    setZipFile(file);
  };

  // Handle file input change
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleZipUpload(file);
    }
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleZipUpload(file);
    }
  };

  // Handle analysis submission
  const handleSubmitAnalysis = async () => {
    if (!zipFile) {
      alert("Please upload a ZIP file first");
      return;
    }

    setIsUploading(true);
    try {
      console.log("Uploading ZIP file:", zipFile);
      const formData = new FormData();
      formData.append("file", zipFile);

      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze the ZIP file");
      }

      const reportData = await response.json();
      setReport(reportData);
      console.log(reportData);
      setSection("report");
    } catch (error) {
      console.error("Error processing ZIP file:", error);
      alert("Error processing the ZIP file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Code Smell Detection</h1>
        <p className="text-muted-foreground mb-8">
          Upload your project ZIP file to identify potential code smells and
          anti-patterns
        </p>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-3">
                <Upload className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              Project Upload
            </CardTitle>
            <CardDescription>
              Upload a ZIP file containing your project for code smell analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-10 transition-all duration-300 ${
                isDragging
                  ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : zipFile
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center text-center">
                {zipFile ? (
                  <>
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                      <Upload className="h-8 w-8 text-green-600 dark:text-green-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      File Ready for Upload
                    </h3>
                    <p className="text-muted-foreground mb-3">
                      {zipFile.name} (
                      {(zipFile.size / (1024 * 1024)).toFixed(2)} MB)
                    </p>
                    <Button
                      onClick={handleSubmitAnalysis}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                      disabled={isUploading}
                    >
                      {isUploading ? "Processing..." : "Start Analysis"}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                      <Upload className="h-8 w-8 text-blue-600 dark:text-blue-300" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Drag & Drop ZIP File Here
                    </h3>
                    <p className="text-muted-foreground mb-6">or</p>
                    <label>
                      <input
                        type="file"
                        accept=".zip"
                        className="hidden"
                        onChange={handleFileInputChange}
                        disabled={isUploading}
                      />
                      <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        disabled={isUploading}
                      >
                        <span>Browse Files</span>
                      </Button>
                    </label>
                  </>
                )}
              </div>
            </div>

            {zipFile && (
              <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <AlertDescription>
                  Your project will be analyzed for common code smells including
                  long methods, duplicated code, complex conditionals, and more.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                What are Code Smells?
              </h3>
              <p className="text-muted-foreground">
                Code smells are indicators of potential problems in your code
                that may lead to deeper issues. They are not bugs but signs that
                your code might need refactoring.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">
                Our Analysis Process
              </h3>
              <p className="text-muted-foreground">
                We analyze your code using advanced static analysis techniques
                to identify common issues like large classes, excessive
                parameters, and poor encapsulation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
