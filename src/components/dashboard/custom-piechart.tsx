"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TooltipProps } from "recharts";
const codeSmellTypes = [
  { codeSmellName: "Duplicate Code", value: 35, color: "#0d9488" }, // teal-600
  { name: "Long Method", value: 25, color: "#8b5cf6" }, // purple-500
  { name: "Complex Conditional", value: 18, color: "#f97316" }, // orange-500
  { name: "Dead Code", value: 12, color: "#ec4899" }, // pink-500
  { name: "Large Class", value: 10, color: "#22c55e" }, // green-500
];

const CustomTooltip = ({ active, payload }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white border border-blue-200 shadow-lg p-3 rounded-lg">
        <p className="font-medium text-blue-900">{data.name}</p>
        <p className="text-blue-700">Value: {data.value}</p>
        <p className="text-blue-700">
          Percentage: {(data.percent * 100).toFixed(1)}%
        </p>
      </div>
    );
  }
  return null;
};

interface chartDatatype {
  codeSmellName: string;
  value: number;
  color: string;
}

export default function CodeSmellPieChart({
  chartData,
}: {
  chartData: chartDatatype[];
}) {
  const [isMobile, setIsMobile] = useState(false);
  console.log("chartData", chartData);
  const codeSmellTypes = chartData;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Define mobile breakpoint
    };

    handleResize(); // Initialize on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Card className="border-blue-100 shadow-md w-[400px] md:w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Code Smell Distribution
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="h-[400px]  md:flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={codeSmellTypes}
                  cx="50%"
                  cy="50%"
                  outerRadius={isMobile ? 100 : 130}
                  innerRadius={isMobile ? 60 : 70}
                  dataKey="value"
                  cornerRadius={15}
                  nameKey="codeSmellName"
                  label={({ codeSmellName, value, percent }) =>
                    isMobile
                      ? `${(percent * 100).toFixed(0)}%`
                      : `${codeSmellName} (${value})    ${(
                          percent * 100
                        ).toFixed(0)}%`
                  }
                  labelLine={!isMobile} // Remove label line in mobile
                >
                  {codeSmellTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center gap-2 lg:w-48">
            {codeSmellTypes.map((entry, index) => (
              <div
                key={`legend-${index}`}
                className="flex items-center gap-2 text-sm font-medium"
              >
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span>{entry.codeSmellName}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
