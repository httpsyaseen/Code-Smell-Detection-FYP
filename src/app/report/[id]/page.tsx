"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Cog,
  Download,
  RefreshCw,
  FileText,
  Bug,
  FileWarning,
  BarChart2,
  Upload,
  X,
  UserPlus,
  UserMinus,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import CodeSmellPieChart from "@/components/dashboard/custom-piechart";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function ReportPage() {
  const params = useParams();
  const id = params.id;
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState({});
  const [project, setProject] = useState(null);
  const [isLoading, setisLoading] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      setisLoading(true);
      try {
        console.log("this is id", id);
        const response = await fetch(
          `http://localhost:3000/api/v1/project/get-project/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.project);
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setisLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  // const projectData = {
  //   name: projectName,
  //   version: "v2.3.4",
  //   lastScan: "2 hours ago",
  //   totalFiles: 342,
  //   affectedFiles: 87,
  //   totalCodeSmells: 104,
  //   codeQuality: 76,
  //   codeSmells: [
  //     { name: "Duplicate Code", value: 32 },
  //     { name: "Long Method", value: 24 },
  //     { name: "Complex Conditional", value: 18 },
  //     { name: "Dead Code", value: 14 },
  //     { name: "Large Class", value: 9 },
  //     { name: "Feature Envy", value: 7 },
  //   ],
  // };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        setFile(null);
        // Here you would typically handle the file upload to your backend
        console.log("Uploading file:", file.name);
      }, 2000);
    }
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto px-16 ">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{project?.title}</h1>
          <Badge variant="outline" className="ml-2">
            version: {project?.latestVersion?.version}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-1">
            <Download className="h-4 w-4 mr-1" />
            <span>Download Report</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span>Update Project</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Project Update</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="projectFile">Project Zip File</Label>
                  <Input
                    id="projectFile"
                    type="file"
                    accept=".zip"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                </div>
                {file && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {file.name}
                  </p>
                )}
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="gap-2"
                >
                  <Upload className="h-4 w-4" />
                  {isUploading ? "Uploading..." : "Upload Project"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="sm" className="gap-1">
            <Cog className="h-4 w-4 mr-1" />
            <span>Project Settings</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project?.latestVersion?.report?.totalFiles}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Total Code Smells
            </CardTitle>
            <Bug className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project?.latestVersion?.report?.totalSmells}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">
              Affected Files
            </CardTitle>
            <FileWarning className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project?.latestVersion?.report?.AffectedFiles}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (project?.latestVersion?.report?.AffectedFiles /
                  project?.latestVersion?.report?.totalFiles) *
                  100
              )}
              % of total files
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Code Quality</CardTitle>
            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{10}%</div>
            <Progress value={20} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <CodeSmellPieChart
        chartData={project?.latestVersion?.report?.chartData}
      />
    </div>
  );
}
