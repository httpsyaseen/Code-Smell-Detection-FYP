"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";
import {
  AlertTriangle,
  CheckCircle,
  FileCode,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import RecentProjects from "@/components/dashboard/recent-projects";
import CodeSmellPieChart from "./custom-piechart";

// Dummy data for the dashboard
const DUMMY_DATA = {
  totalProjects: 42,
  totalCodeSmells: 156,
  qualityScore: 78,
  codeSmellTypes: [
    { name: "Duplicate Code", value: 35, color: "#2563eb" }, // blue-600
    { name: "Long Method", value: 25, color: "#3b82f6" }, // blue-500
    { name: "Complex Conditional", value: 18, color: "#60a5fa" }, // blue-400
    { name: "Dead Code", value: 12, color: "#93c5fd" }, // blue-300
    { name: "Large Class", value: 10, color: "#bfdbfe" }, // blue-200
  ],
  recentProjects: [
    {
      id: 1,
      name: "E-commerce Platform",
      date: "2023-04-20",
      smells: 12,
      quality: 85,
    },
    { id: 2, name: "CRM System", date: "2023-04-18", smells: 24, quality: 62 },
    {
      id: 3,
      name: "Mobile App Backend",
      date: "2023-04-15",
      smells: 8,
      quality: 91,
    },
    {
      id: 4,
      name: "Analytics Dashboard",
      date: "2023-04-10",
      smells: 18,
      quality: 73,
    },
    {
      id: 5,
      name: "Payment Gateway",
      date: "2023-04-05",
      smells: 15,
      quality: 79,
    },
  ],
};

export default function Dashboard() {
  // Use dummy data directly instead of loading it asynchronously
  const data = DUMMY_DATA;

  const getQualityStatus = (score: number) => {
    if (score >= 80)
      return { status: "Good", icon: ThumbsUp, color: "text-green-500" };
    if (score >= 60)
      return { status: "Average", icon: CheckCircle, color: "text-yellow-500" };
    return { status: "Poor", icon: ThumbsDown, color: "text-red-500" };
  };

  const qualityInfo = getQualityStatus(data.qualityScore);

  return (
    <div className="p-6 space-y-8 container mx-auto px-16">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-blue-100 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">
              Total Projects
            </CardTitle>
            <FileCode className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">{data.totalProjects}</div>
            <p className="text-sm ">Across all repositories</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">
              Total Code Smells
            </CardTitle>
            <AlertTriangle className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">{data.totalCodeSmells}</div>
            <p className="text-sm ">Detected issues requiring attention</p>
          </CardContent>
        </Card>

        <Card className="border-blue-100 shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">Code Quality</CardTitle>
            <qualityInfo.icon className={`h-5 w-5 ${qualityInfo.color}`} />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold text-blue-900">
                {data.qualityScore}/100
              </div>
              <Badge
                className={
                  data.qualityScore >= 80
                    ? "bg-green-600 text-white text-sm px-2 py-1"
                    : data.qualityScore >= 60
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black text-sm px-2 py-1"
                    : "bg-red-500 hover:bg-red-600 text-white text-sm px-2 py-1"
                }
              >
                {qualityInfo.status}
              </Badge>
            </div>
            <p className="text-sm ">Overall code health score</p>
          </CardContent>
        </Card>
      </div>

      {/* Combined Chart and Recent Projects Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CodeSmellPieChart />

        {/* Recent Projects */}
        <Card className="border-blue-100 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProjects projects={data.recentProjects} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
