"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface ReportProps {
  report: {
    path: string;
    startLine: number;
    endLine: number;
    smellType: string;
  }[];
}

const CodeSmellInsights = ({ report }: ReportProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const smellData = Object.entries(
    report.reduce((acc, { smellType }) => {
      acc[smellType] = (acc[smellType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value], index) => ({
    name,
    value,
    color: ["#05CD99", "#6CAD5C", "#65D1FF", "#0062FF", "#B98E83", "#A66CFF"][
      index % 6
    ],
  }));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile breakpoint at 768px
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate total for percentage calculations
  const total = smellData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="rounded-3xl bg-white p-4 shadow-2xl flex-[7] max-h-[602px]">
      <h1 className="font-bold text-2xl pt-4 text-center text-gray-700">
        Code Smell Insights Report
      </h1>
      <div className="w-full h-[500px] flex flex-col items-center">
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={smellData}
                cx="50%"
                cy="50%"
                innerRadius={isMobile ? 60 : 80} // Smaller inner radius on mobile
                outerRadius={isMobile ? 120 : 130} // Smaller outer radius on mobile
                fill="#8884d8"
                dataKey="value"
                cornerRadius={15}
                paddingAngle={1}
                label={
                  isMobile
                    ? (entry) => `${((entry.value / total) * 100).toFixed(1)}%`
                    : (entry) => `${entry.name}`
                } // Percentage on mobile, name on desktop
                labelLine={!isMobile} // No label lines on mobile
              >
                {smellData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend section moved below the graph */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {smellData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-lg font-medium">{item.value}</span>
              <span className="ml-2 text-lg text-[#A3AED0] font-medium">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodeSmellInsights;
