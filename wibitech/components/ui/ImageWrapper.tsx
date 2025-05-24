// components/ImageWrapper.tsx
import React from "react";
import Image from "next/image";

type ImageWrapperProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  isSvg?: boolean;
};

const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  width = 40,
  height = 40,
  className = "",
  isSvg = false,
}) => {
  if (isSvg) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default ImageWrapper;
