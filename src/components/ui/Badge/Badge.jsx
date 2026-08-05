import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`ui-badge ui-badge--${variant} ui-badge--${size} ${className}`}
      {...props}
    >
      {Icon && <Icon size={size === 'sm' ? 12 : 14} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
