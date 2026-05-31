import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center font-sans font-medium transition-all active:scale-[0.97] focus:outline-2 focus:outline-offset-2 focus:outline-primary disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-primary text-dark hover:brightness-110",
    secondary: "bg-ink text-surface hover:bg-ink/90",
    outline: "border border-border text-ink hover:border-slate",
    ghost: "text-slate hover:text-ink hover:bg-slate/5"
  };

  const sizes = {
    sm: "h-8 px-3 text-[13px] rounded-md",
    md: "h-10 px-4 text-[15px] rounded-md",
    lg: "h-12 px-6 text-[17px] rounded-lg"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}
