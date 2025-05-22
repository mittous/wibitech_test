import React from "react";

interface PageHeaderProps {
  title: string | undefined;
  highlight: string | undefined;
  subtitle?: string | undefined;
}

export default function PageHeader({ title, highlight, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">
        {title}, <span className="text-blue-600 dark:text-blue-400">{highlight}.</span>
      </h1>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
