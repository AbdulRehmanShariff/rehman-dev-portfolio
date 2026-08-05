import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  iconLeft: IconLeft,
  iconRight: IconRight,
  className = '',
  as: Component = 'button',
  type = 'button',
  ...props
}) => {
  const isButtonElement = Component === 'button';
  const buttonProps = isButtonElement
    ? { type, disabled: isDisabled || isLoading }
    : {};

  return (
    <Component
      className={`ui-button ui-button--${variant} ui-button--${size} ${isLoading ? 'ui-button--loading' : ''} ${className}`}
      {...buttonProps}
      {...props}
    >
      {isLoading && <span className="ui-button__spinner" aria-hidden="true" />}
      {!isLoading && IconLeft && <IconLeft size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
      <span>{children}</span>
      {!isLoading && IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} />}
    </Component>
  );
};

export default Button;
