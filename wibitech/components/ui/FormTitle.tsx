'use client';

interface FormTitleProps {
  title: string;
}

export const FormTitle = ({ title }: FormTitleProps) => (
  <div className="self-stretch text-center justify-start text-black text-3xl font-semibold leading-7">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);
