'use client';

interface FormTitleProps {
  title: string;
  className?: string;
}

export const FormTitle = ({ title, className = '' }: FormTitleProps) => (
  <div className={`self-stretch text-center text-black dark:text-white `}>
    <h1 className={` ${className} `}>{title}</h1>
  </div>
);