"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LucideIcon, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

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
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 left-1/2 -translate-x-1/2 sm:relative sm:bottom-auto sm:left-auto sm:translate-x-0 z-50 mb-6 sm:mb-0",
        className,
      )}
    >
      <div className="flex items-center gap-1 sm:gap-3 bg-surface/80 border border-border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name
          const isHovered = hoveredTab === item.name
          const hasDropdown = item.dropdownItems && item.dropdownItems.length > 0;

          return (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoveredTab(item.name)}
              onMouseLeave={() => setHoveredTab(null)}
            >
              <Link
                href={item.url}
                onClick={() => setActiveTab(item.name)}
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
              
              {/* Dropdown Menu */}
              {hasDropdown && (
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: isMobile ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: isMobile ? 10 : -10 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "absolute left-1/2 -translate-x-1/2 w-48 bg-surface border border-border rounded-2xl shadow-xl overflow-hidden flex flex-col py-2",
                        "bottom-full mb-4 sm:bottom-auto sm:top-full sm:mt-4 sm:mb-0"
                      )}
                    >
                      {item.dropdownItems!.map((dropItem) => (
                        <Link
                          key={dropItem.name}
                          href={dropItem.url}
                          onClick={() => {
                            setActiveTab(item.name);
                            setHoveredTab(null);
                          }}
                          className="px-4 py-2.5 text-sm text-slate hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
