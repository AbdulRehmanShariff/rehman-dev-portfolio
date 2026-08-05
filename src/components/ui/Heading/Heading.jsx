import React from 'react';
import './Heading.css';

export const Heading = ({
  children,
  level = 2,
  gradient = false,
  className = '',
  ...props
}) => {
  const Component = `h${level}`;
  const gradientClass = gradient ? 'ui-heading--gradient' : '';

  return (
    <Component
      className={`ui-heading ui-heading--level-${level} ${gradientClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Heading;
