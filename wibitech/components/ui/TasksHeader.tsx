import React from "react";

interface PageHeaderProps {
  title: string | undefined;
  highlight: string | undefined;
  subtitle?: string | undefined;
}

export default function PageHeader({ title, highlight, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-[50px] ">
      <h1 className="text-2xl font-bold">
        {title}, <span className=" text-[var(--Blue,#007fff)] dark:text-blue-400">{highlight}</span>
        <span className="text-black dark:text-gray-400">.</span>
      </h1>
      {subtitle && (
        <p className="text-sm text-[#8D9CB8] dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
