import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'pro' | 'outline' | 'pill' | 'pill-active';
  children: React.ReactNode;
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const baseStyle = "inline-flex items-center justify-center font-sans text-[11px] font-medium leading-none";
  let variantStyle = "";

  switch (variant) {
    case 'default':
      variantStyle = "bg-primary/10 text-primary px-2 py-1 rounded-[4px]"; // e.g. Free, Browser-based
      break;
    case 'pro':
      variantStyle = "bg-accent/10 text-accent px-2 py-1 rounded-[4px]"; // Pro
      break;
    case 'outline':
      variantStyle = "border border-border text-slate px-2 py-1 rounded-[4px]"; // No sign-up, Secure
      break;
    case 'pill':
      variantStyle = "bg-surface border border-border text-slate px-4 py-2 rounded-pill hover:border-slate transition-colors"; // Category pill
      break;
    case 'pill-active':
      variantStyle = "bg-ink text-surface px-4 py-2 rounded-pill"; // Active Category pill
      break;
  }

  return (
    <span className={`${baseStyle} ${variantStyle} ${className}`} {...props}>
      {children}
    </span>
  );
}
