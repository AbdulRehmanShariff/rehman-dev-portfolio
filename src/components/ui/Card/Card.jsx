import React from 'react';
import './Card.css';

export const Card = ({
  children,
  hoverable = false,
  glass = false,
  glow = false,
  className = '',
  ...props
}) => {
  const classes = [
    'ui-card',
    hoverable ? 'ui-card--hoverable' : '',
    glass ? 'ui-card--glass' : '',
    glow ? 'ui-card--glow' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`ui-card__header ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`ui-card__body ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`ui-card__footer ${className}`} {...props}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
