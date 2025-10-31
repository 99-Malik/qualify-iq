import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const FlashIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#84818A',
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M7 2V13H10V22L17 10H13L17 2H7Z"
        fill={color}
      />
    </svg>
  );
};

export const GridIcon: React.FC<IconProps> = ({
  width = 24,
  height = 24,
  color = '#84818A',
  className,
  style,
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
    >
      <path
        d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z"
        fill={color}
      />
    </svg>
  );
};