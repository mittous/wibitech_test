'use client';

interface FormTitleProps {
  title: string | undefined;
  className?: string ;
}

export const FormTitle = ({ title, className = '' }: FormTitleProps) => (
  <div className={`flex justify-center items-center self-stretch text-center text-black dark:text-white `}>
    <h1 className={` ${className} `}>{title}</h1>
  </div>
);