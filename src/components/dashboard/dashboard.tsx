"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsDown,
  ThumbsUp,
  CheckCircle,
  FileCode,
  AlertTriangle,
} from "lucide-react";
import RecentProjects from "@/components/dashboard/recent-projects";
import CodeSmellPieChart from "./custom-piechart";
import Cookies from "js-cookie";

// Custom hook to fetch data with authentication
const useDashboardData = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get("token"); // Retrieve token from cookies

      if (!token) {
        setError("Authentication token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/project/dashboard-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err: any) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const getQualityStatus = (score: number) => {
    if (score >= 80)
      return { status: "Good", icon: ThumbsUp, color: "text-green-500" };
    if (score >= 60)
      return { status: "Average", icon: CheckCircle, color: "text-yellow-500" };
    // return { status: "Poor", icon: ThumbsDown, color: "text-red-500" };
    return { status: "Good", icon: ThumbsUp, color: "text-green-500" };
  };

  const qualityInfo = data.data.codeQuality
    ? getQualityStatus(data.data.codeQuality)
    : { status: "New", icon: CheckCircle, color: "text-green-500" };

  return (
    <div className="p-6 space-y-8 container mx-auto px-16 dark:bg-[#040820]">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>

      {/* Key Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className=" dark:bg-[#0F172A] shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">
              Total Projects
            </CardTitle>
            <FileCode className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">{data.data.totalProjects}</div>
            <p className="text-sm ">Across all repositories</p>
          </CardContent>
        </Card>

        <Card className=" dark:bg-[#0F172A] shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">
              Total Code Smells
            </CardTitle>
            <AlertTriangle className="h-5 w-5 " />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold ">{data.data.totalSmells}</div>
            <p className="text-sm ">Detected issues requiring attention</p>
          </CardContent>
        </Card>

        <Card className=" dark:bg-[#0F172A] shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium ">Code Quality</CardTitle>
            <qualityInfo.icon className={`h-5 w-5 ${qualityInfo.color}`} />
          </CardHeader>
          <CardContent>
            {data.data.codeQuality ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="text-3xl font-bold text-blue-900">
                    {data.data.codeQuality}/100
                  </div>

                  <Badge
                    className={
                      data.data.codeQuality >= 80
                        ? "bg-green-600 dark:bg-[#3a4255] text-white text-sm px-2 py-1"
                        : data.data.codeQuality >= 60
                        ? "bg-yellow-400 hover:bg-yellow-500 dark:bg-[#3a4255] text-black text-sm px-2 py-1"
                        : "bg-red-500 hover:bg-red-600 dark:bg-[#3a4255] text-white text-sm px-2 py-1"
                    }
                  >
                    {qualityInfo.status}
                  </Badge>
                </div>
                <p className="text-sm ">Overall code health score</p>
              </>
            ) : (
              <div className="text-2xl font-bold text-black-900">
                No projects uploaded
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Combined Chart and Recent Projects Section */}
      <div className="grid gap-6 lg:grid-cols-2 ">
        <CodeSmellPieChart chartData={data.data.chartData} />

        {/* Recent Projects */}
        <Card className="shadow-md dark:bg-[#0F172A]">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProjects />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
