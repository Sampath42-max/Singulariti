import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

interface CardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  href: string;
  badge?: {
    text: string;
    variant: 'default' | 'pro' | 'outline';
  };
}

export function Card({ title, description, icon, href, badge }: CardProps) {
  return (
    <Link href={href} className="group block">
      <div className="h-full p-6 bg-surface border border-border rounded-xl transition-all duration-150 ease-out hover:border-slate hover:shadow-sm flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center text-primary group-hover:brightness-110 transition-all">
            {icon}
          </div>
          {badge && (
            <Badge variant={badge.variant}>{badge.text}</Badge>
          )}
        </div>
        
        <h3 className="font-display font-bold text-[17px] text-ink mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="font-sans text-[13px] text-slate line-clamp-2 flex-grow mb-4">
          {description}
        </p>
        
        <div className="mt-auto flex items-center text-[13px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
          Open Tool <ArrowRight className="ml-1 w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
