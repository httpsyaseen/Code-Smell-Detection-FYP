import type { LucideIcon } from "lucide-react";

interface CodeSmellInsight {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  impact: string;
  tips: string[];
}

interface CodeSmellInsightCardProps {
  insight: CodeSmellInsight;
}

export default function CodeSmellInsightCard({
  insight,
}: CodeSmellInsightCardProps) {
  const Icon = insight.icon;

  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
      <div className="flex items-start mb-3">
        <div className={`p-2 rounded-lg ${insight.bgColor} mr-3`}>
          <Icon className={`h-5 w-5 ${insight.color}`} />
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">
            {insight.title}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {insight.description}
          </p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Impact
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {insight.impact}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300">
            How to fix
          </h4>
          <ul className="text-xs text-gray-600 dark:text-gray-400 list-disc pl-4 space-y-1 mt-1">
            {insight.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
