import React from "react";
import TruncatedText from "@/components/ui/common/TruncatedText";

interface PageHeaderProps {
  title: string | undefined;
  highlight: string | undefined;
  subtitle?: string | undefined;
}

export default function PageHeader({ title, highlight, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-[50px]">
      <h1 className="text-2xl font-bold flex items-center flex-wrap">
        {title}, <span className="text-[var(--Blue,#007fff)] dark:text-blue-400 mx-1">
          <TruncatedText 
            text={highlight || ''}
            className="inline-block"
            maxWidth={{
              default: 'max-w-[150px]',
              xs: 'xs:max-w-[180px]',
              sm: 'sm:max-w-[220px]',
              md: 'md:max-w-[280px]',
              lg: 'lg:max-w-[350px]'
            }}
          />
        </span>
        <span className="text-black dark:text-gray-400">.</span>
      </h1>
      {subtitle && (
        <p className="text-sm text-[#8D9CB8] dark:text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
