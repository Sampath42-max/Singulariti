"use client"

import React, { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideIcon, ChevronDown } from "lucide-react"

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export interface DropdownItem {
  name: string;
  url: string;
}

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  dropdownItems?: DropdownItem[]
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const pathname = usePathname()
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  // 1. Optimize active route calculation: compute active item name once per render
  const activeItemName = useMemo(() => {
    for (const item of items) {
      if (item.url === '/' && pathname === '/') return item.name;
      if (item.url !== '/' && pathname.startsWith(item.url)) return item.name;
      if (item.dropdownItems?.some(dropItem => pathname.startsWith(dropItem.url))) return item.name;
    }
    return null;
  }, [items, pathname]);

  // 2. Wrap event handlers with useCallback to prevent reference changes
  const handleItemClick = useCallback((e: React.MouseEvent, item: NavItem) => {
    const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;
    if (hasDropdown) {
      e.preventDefault();
      setActiveDropdown(prev => prev === item.name ? null : item.name);
    } else {
      setActiveDropdown(null);
    }
  }, []);

  const handleMouseEnter = useCallback((itemName: string) => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setHoveredTab(itemName);
      setActiveDropdown(itemName);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches) {
      setHoveredTab(null);
      setActiveDropdown(null);
    }
  }, []);

  const handleBackdropClick = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  return (
    <>
      {/* 3. Invisible click-away backdrop to close dropdowns when tapping outside */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 bg-transparent"
          onClick={handleBackdropClick}
        />
      )}

      <div className={cn("relative z-50", className)}>
        <div className="flex items-center justify-around w-[85vw] sm:w-auto sm:justify-start gap-1 sm:gap-3 bg-surface/80 border border-border backdrop-blur-lg py-1.5 px-2 sm:px-1 rounded-full shadow-lg">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeItemName === item.name;
            const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.url}
                  onClick={(e) => handleItemClick(e, item)}
                  className={cn(
                    "relative cursor-pointer text-sm font-medium px-4 md:px-6 py-2 rounded-full transition-colors flex items-center gap-1.5",
                    "text-slate hover:text-primary",
                    isActive && "text-primary",
                  )}
                >
                  <span className="hidden md:inline">{item.name}</span>
                  <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  
                  {hasDropdown && (
                    <ChevronDown className="w-4 h-4 hidden md:block opacity-50" />
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                        <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
                
                {/* 4. GPU-accelerated CSS transition-based Dropdown Menu */}
                {hasDropdown && (
                  <div
                    className={cn(
                      "absolute left-1/2 -translate-x-1/2 w-48 pt-4 top-full transition-all duration-300 ease-out will-change-transform z-50",
                      activeDropdown === item.name
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    <div className="bg-surface border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col py-2">
                      {item.dropdownItems!.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.url}
                          onClick={handleBackdropClick}
                          className="px-4 py-2.5 text-sm text-slate hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
