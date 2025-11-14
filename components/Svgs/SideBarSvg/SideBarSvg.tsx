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

export const ListIcon: React.FC<IconProps> = ({
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


export const TemplatesIcon: React.FC<IconProps> = ({
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
    >      <path fillRule="evenodd" clipRule="evenodd" d="M3 3V11H11V3H3ZM9 9H5V5H9V9ZM3 13V21H11V13H3ZM9 19H5V15H9V19ZM13 3V11H21V3H13ZM19 9H15V5H19V9ZM13 13V21H21V13H13ZM19 19H15V15H19V19Z" fill={color} />
    </svg>
  );
};

export const CapturedLeadsIcon: React.FC<IconProps> = ({
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
    >      <path d="M7.5 21H2V9H7.5V21ZM14.75 3H9.25V21H14.75V3ZM22 11H16.5V21H22V11Z" fill={color} />
    </svg>

  );
};


export const MailBoxIcon: React.FC<IconProps> = ({
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
    >      <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill={color} />
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
      <path d="M9 16H15V10H19L12 3L5 10H9V16ZM5 18H19V20H5V18Z" fill={color} />
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
      <path d="M2 2V22H22V2H2ZM11.86 16.96C12.62 16.72 13.26 15.92 13.39 15.33C13.52 14.77 13.29 14.28 13.19 13.73C13.11 13.27 13.12 12.88 13.27 12.45C13.81 13.66 15.42 14.09 15.25 15.63C15.06 17.33 13.14 18.01 11.86 16.96ZM20 20H18V18H15.98C16.61 17.16 17 16.13 17 15C17 13.11 15.91 12.15 15.15 11.63C12.2 9.61 13 7 13 7C6.27 10.57 6.98 14.47 7 15C7.03 15.96 7.49 17.07 8.23 18H6V20H4V4H20V20Z" fill={color} />
    </svg>

  );
};

export const DomainSetupIcon: React.FC<IconProps> = ({
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
      <path d="M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM18.92 8H15.97C15.65 6.75 15.19 5.55 14.59 4.44C16.43 5.07 17.96 6.35 18.92 8ZM12 4.04C12.83 5.24 13.48 6.57 13.91 8H10.09C10.52 6.57 11.17 5.24 12 4.04ZM4.26 14C4.1 13.36 4 12.69 4 12C4 11.31 4.1 10.64 4.26 10H7.64C7.56 10.66 7.5 11.32 7.5 12C7.5 12.68 7.56 13.34 7.64 14H4.26ZM5.08 16H8.03C8.35 17.25 8.81 18.45 9.41 19.56C7.57 18.93 6.04 17.66 5.08 16ZM8.03 8H5.08C6.04 6.34 7.57 5.07 9.41 4.44C8.81 5.55 8.35 6.75 8.03 8ZM12 19.96C11.17 18.76 10.52 17.43 10.09 16H13.91C13.48 17.43 12.83 18.76 12 19.96ZM14.34 14H9.66C9.57 13.34 9.5 12.68 9.5 12C9.5 11.32 9.57 10.65 9.66 10H14.34C14.43 10.65 14.5 11.32 14.5 12C14.5 12.68 14.43 13.34 14.34 14ZM14.59 19.56C15.19 18.45 15.65 17.25 15.97 16H18.92C17.96 17.65 16.43 18.93 14.59 19.56ZM16.36 14C16.44 13.34 16.5 12.68 16.5 12C16.5 11.32 16.44 10.66 16.36 10H19.74C19.9 10.64 20 11.31 20 12C20 12.69 19.9 13.36 19.74 14H16.36Z" fill={color} />
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
      <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12ZM15 6.5L18.5 10L15 13.5V11H11V9H15V6.5ZM9 17.5L5.5 14L9 10.5V13H13V15H9V17.5Z" fill={color} />
    </svg>
  );
};

export const SettingsIcon: React.FC<IconProps> = ({
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
      <path d="M19.1401 12.9384C19.1801 12.6384 19.2001 12.3284 19.2001 11.9984C19.2001 11.6784 19.1801 11.3584 19.1301 11.0584L21.1601 9.47844C21.3401 9.33844 21.3901 9.06844 21.2801 8.86844L19.3601 5.54844C19.2401 5.32844 18.9901 5.25844 18.7701 5.32844L16.3801 6.28844C15.8801 5.90844 15.3501 5.58844 14.7601 5.34844L14.4001 2.80844C14.3601 2.56844 14.1601 2.39844 13.9201 2.39844H10.0801C9.84011 2.39844 9.65011 2.56844 9.61011 2.80844L9.25011 5.34844C8.66011 5.58844 8.12011 5.91844 7.63011 6.28844L5.24011 5.32844C5.02011 5.24844 4.77011 5.32844 4.65011 5.54844L2.74011 8.86844C2.62011 9.07844 2.66011 9.33844 2.86011 9.47844L4.89011 11.0584C4.84011 11.3584 4.80011 11.6884 4.80011 11.9984C4.80011 12.3084 4.82011 12.6384 4.87011 12.9384L2.84011 14.5184C2.66011 14.6584 2.61011 14.9284 2.72011 15.1284L4.64011 18.4484C4.76011 18.6684 5.01011 18.7384 5.23011 18.6684L7.62011 17.7084C8.12011 18.0884 8.65011 18.4084 9.24011 18.6484L9.60011 21.1884C9.65011 21.4284 9.84011 21.5984 10.0801 21.5984H13.9201C14.1601 21.5984 14.3601 21.4284 14.3901 21.1884L14.7501 18.6484C15.3401 18.4084 15.8801 18.0884 16.3701 17.7084L18.7601 18.6684C18.9801 18.7484 19.2301 18.6684 19.3501 18.4484L21.2701 15.1284C21.3901 14.9084 21.3401 14.6584 21.1501 14.5184L19.1401 12.9384ZM12.0001 15.5984C10.0201 15.5984 8.40011 13.9784 8.40011 11.9984C8.40011 10.0184 10.0201 8.39844 12.0001 8.39844C13.9801 8.39844 15.6001 10.0184 15.6001 11.9984C15.6001 13.9784 13.9801 15.5984 12.0001 15.5984Z" fill={color} />
    </svg>
  );
};

export const CalendarIcon: React.FC<IconProps> = ({
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
      <path fillRule="evenodd" clipRule="evenodd" d="M17 13H12V18H17V13ZM16 2V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4H18V2H16ZM19 20H5V9H19V20Z" fill={color} />
    </svg>
  );
};


