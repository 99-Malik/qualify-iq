import React from 'react';

interface IconProps {
  width?: number | string;
  height?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}
export const GenerateForm: React.FC<IconProps> = ({
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
        d="M18 17H6V15H18V17ZM18 13H6V11H18V13ZM18 9H6V7H18V9ZM3 22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22Z"
        fill={color}
      />
    </svg>
  );
};

export const OutboundLeadsIcon: React.FC<IconProps> = ({
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
          d="M9 16H15V10H19L12 3L5 10H9V16ZM5 18H19V20H5V18Z"
          fill={color}
        />
      </svg>
    );
  };


  export const GenerateTemplateIcon: React.FC<IconProps> = ({
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 3V11H11V3H3ZM9 9H5V5H9V9ZM3 13V21H11V13H3ZM9 19H5V15H9V19ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM13 13V21H21V13H13ZM19 19H15V15H19V19Z"
          fill={color}
        />
      </svg>
    );
  };

  export const CalendarBookingIcon: React.FC<IconProps> = ({
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17 13H12V18H17V13ZM16 2V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4H18V2H16ZM19 20H5V9H19V20Z"
          fill={color}
        />
      </svg>
    );
  };
  
  export const EmailCampaignsIcon: React.FC<IconProps> = ({
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
          d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12ZM15 6.5L18.5 10L15 13.5V11H11V9H15V6.5ZM9 17.5L5.5 14L9 10.5V13H13V15H9V17.5Z"
          fill={color}
        />
      </svg>
    );
  };


  export const WarmUpEmailsIcon: React.FC<IconProps> = ({
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
          d="M2 2V22H22V2H2ZM11.86 16.96C12.62 16.72 13.26 15.92 13.39 15.33C13.52 14.77 13.29 14.28 13.19 13.73C13.11 13.27 13.12 12.88 13.27 12.45C13.81 13.66 15.42 14.09 15.25 15.63C15.06 17.33 13.14 18.01 11.86 16.96ZM20 20H18V18H15.98C16.61 17.16 17 16.13 17 15C17 13.11 15.91 12.15 15.15 11.63C12.2 9.61 13 7 13 7C6.27 10.57 6.98 14.47 7 15C7.03 15.96 7.49 17.07 8.23 18H6V20H4V4H20V20Z"
          fill={color}
        />
      </svg>
    );
  };