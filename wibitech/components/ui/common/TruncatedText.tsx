import React from 'react';

interface TruncatedTextProps {
  text: string;
  className?: string;
  maxWidth?: {
    default: string;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
  };
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  className = '', 
  maxWidth = { default: 'max-w-[150px]', xs: 'xs:max-w-[200px]', sm: 'sm:max-w-[250px]', md: 'md:max-w-[300px]', lg: 'lg:max-w-[350px]' } 
}) => {
  const widthClasses = `${maxWidth.default} ${maxWidth.xs || ''} ${maxWidth.sm || ''} ${maxWidth.md || ''} ${maxWidth.lg || ''}`;
  
  return (
    <div className="flex max-w-full overflow-hidden" title={text}>
      <div className={`
        ${widthClasses}
        overflow-hidden text-ellipsis whitespace-nowrap
        ${className}
      `}>
        {text}
      </div>
    </div>
  );
};

export default TruncatedText; 