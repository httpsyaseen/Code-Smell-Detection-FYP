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
import { useState } from "react";
import CodeSmellPieChart from "@/components/dashboard/custom-piechart";

export default function ReportPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [projectName, setProjectName] = useState("E-commerce Platform");
  const [members, setMembers] = useState(["john_doe", "jane_smith"]);
  const [searchUsername, setSearchUsername] = useState("");

  const projectData = {
    name: projectName,
    version: "v2.3.4",
    lastScan: "2 hours ago",
    totalFiles: 342,
    affectedFiles: 87,
    totalCodeSmells: 104,
    codeQuality: 76,
    codeSmells: [
      { name: "Duplicate Code", value: 32 },
      { name: "Long Method", value: 24 },
      { name: "Complex Conditional", value: 18 },
      { name: "Dead Code", value: 14 },
      { name: "Large Class", value: 9 },
      { name: "Feature Envy", value: 7 },
    ],
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#FF6B6B",
  ];

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

  const handleAddMember = () => {
    if (searchUsername && !members.includes(searchUsername)) {
      setMembers([...members, searchUsername]);
      setSearchUsername("");
    }
  };

  const handleRemoveMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleUpdateProject = () => {
    // Here you would typically send the updated project data to your backend
    console.log("Updating project with name:", projectName);
    console.log("Updated members:", members);
  };

  return (
    <div className="container py-8 mx-auto px-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold">{projectData.name}</h1>
          <Badge variant="outline" className="ml-2">
            {projectData.version}
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
            <div className="text-2xl font-bold">{projectData.totalFiles}</div>
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
              {projectData.totalCodeSmells}
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
              {projectData.affectedFiles}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (projectData.affectedFiles / projectData.totalFiles) * 100
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
            <div className="text-2xl font-bold">{projectData.codeQuality}%</div>
            <Progress value={projectData.codeQuality} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <CodeSmellPieChart />
    </div>
  );
}
