"use client";

import { useEffect, useRef } from "react";

interface CodeSmellChartProps {
  codeSmells: {
    duplicatedCode: number;
    complexMethods: number;
    longMethods: number;
    unusedVariables: number;
  };
}

export default function CodeSmellChart({ codeSmells }: CodeSmellChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Data preparation
    const labels = [
      "Duplicated Code",
      "Complex Methods",
      "Long Methods",
      "Unused Variables",
    ];

    const data = [
      codeSmells.duplicatedCode,
      codeSmells.complexMethods,
      codeSmells.longMethods,
      codeSmells.unusedVariables,
    ];

    const total = data.reduce((acc, val) => acc + val, 0);

    // Colors for the chart (matching the theme)
    const colors = [
      "#ef4444", // red-500
      "#f59e0b", // amber-500
      "#10b981", // emerald-500
      "#3b82f6", // blue-500
    ];

    // Clear canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Draw the pie chart
    let startAngle = 0;
    const radius =
      Math.min(canvasRef.current.width, canvasRef.current.height) / 2 - 20;
    const centerX = canvasRef.current.width / 2;
    const centerY = canvasRef.current.height / 2;

    data.forEach((value, index) => {
      const sliceAngle = (2 * Math.PI * value) / total;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
      ctx.closePath();

      ctx.fillStyle = colors[index];
      ctx.fill();

      // Draw label lines and text for larger slices
      if (value / total > 0.1) {
        const midAngle = startAngle + sliceAngle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(midAngle);
        const labelY = centerY + labelRadius * Math.sin(midAngle);

        ctx.fillStyle = "#ffffff";
        ctx.font = "12px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX, labelY);
      }

      startAngle += sliceAngle;
    });

    // Draw a white circle in the middle for a donut chart effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    // In dark mode, make the center circle dark
    const isDarkMode = document.documentElement.classList.contains("dark");
    if (isDarkMode) {
      ctx.fillStyle = "#0F0F12";
      ctx.fill();
    }
  }, [codeSmells]);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xs aspect-square relative">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="w-full h-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Duplicated Code ({codeSmells.duplicatedCode})
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Complex Methods ({codeSmells.complexMethods})
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Long Methods ({codeSmells.longMethods})
          </span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            Unused Variables ({codeSmells.unusedVariables})
          </span>
        </div>
      </div>
    </div>
  );
}
