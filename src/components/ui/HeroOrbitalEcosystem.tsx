"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ImageIcon, FileText, QrCode, Wand2, Calculator, Keyboard, Timer, Brush, Type, Code, Scale, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { registry } from "@/registry";
import Link from "next/link";

// Map category IDs to their specific Lucide Icons
const iconMap: Record<string, React.ElementType> = {
  image: ImageIcon,
  editing: Wand2,
  pdf: FileText,
  qr: QrCode,
  calculators: Calculator,
  text: Type,
  convert: Scale,
  dev: Code,
  seo: Search,
};

interface ToolPreview {
  name: string;
  path: string;
}

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  tools: ToolPreview[];
}

export default function HeroOrbitalEcosystem() {
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(220);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Prepare data from registry
  const timelineData: TimelineItem[] = registry.categories.map(category => {
    const allTools = category.collections.flatMap(c => c.tools);
    const previewTools = allTools.slice(0, 8).map(t => ({ name: t.name, path: t.path! }));
    return {
      id: category.id,
      title: category.name.replace(' Tools', ''),
      description: category.description,
      icon: iconMap[category.id] || Search,
      tools: previewTools,
    };
  });

  // Handle Window Resize for Mobile Responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setRadius(135);
      } else if (window.innerWidth < 1024) { // tablet
        setRadius(180);
      } else { // desktop
        setRadius(220);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: string) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (key !== id) {
          newState[key] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);
        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.15) % 360; 
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate]);

  const centerViewOnNode = (nodeId: string) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    
    // Bring the expanded node to the right side (or bottom on mobile)
    const offset = window.innerWidth < 640 ? 90 : 270;
    setRotationAngle(offset - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.3,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-visible mt-10 lg:mt-0"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* 3D Hollow Prism Background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 dark:opacity-40 pointer-events-none overflow-hidden scale-150 sm:scale-100">
        <svg 
          viewBox="0 0 100 100" 
          className="w-[500px] h-[500px] md:w-[800px] md:h-[800px] lg:w-[1000px] lg:h-[1000px] drop-shadow-[0_0_40px_rgba(20,184,166,0.3)] animate-[spin_120s_linear_infinite]" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back faces (wireframe illusion) */}
          <polygon points="50,10 15,85 85,85" className="stroke-slate/10 dark:stroke-slate/20" strokeWidth="0.5" />
          
          {/* Front Wireframe */}
          <polygon points="50,10 15,85 85,85" className="stroke-primary/40 dark:stroke-primary/60" strokeWidth="0.5" strokeLinejoin="round" />
          
          {/* Inner 3D perspective lines */}
          <line x1="50" y1="10" x2="50" y2="60" className="stroke-primary/50 dark:stroke-primary/70" strokeWidth="1" strokeLinecap="round" />
          <line x1="15" y1="85" x2="50" y2="60" className="stroke-primary/50 dark:stroke-primary/70" strokeWidth="1" strokeLinecap="round" />
          <line x1="85" y1="85" x2="50" y2="60" className="stroke-primary/50 dark:stroke-primary/70" strokeWidth="1" strokeLinecap="round" />
          
          {/* Inner bottom face to give depth */}
          <polygon points="15,85 85,85 50,60" className="fill-primary/5 dark:fill-primary/10" />

          {/* Floating geometric fragments for premiumness */}
          <circle cx="25" cy="40" r="1" className="fill-primary/60" />
          <circle cx="75" cy="50" r="1.5" className="fill-primary/40" />
          <circle cx="45" cy="80" r="0.8" className="fill-slate/40" />
        </svg>
      </div>

      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
          ref={orbitRef}
          style={{
            perspective: "1000px",
          }}
        >
          
          {/* Outer Orbit Rings (Responsive) */}
          <div 
            className="absolute rounded-full border border-slate/10 dark:border-white/5 pointer-events-none transition-all duration-500"
            style={{ width: radius * 2, height: radius * 2 }}
          ></div>
          <div 
            className="absolute rounded-full border border-slate/5 dark:border-white/5 pointer-events-none transition-all duration-500"
            style={{ width: radius * 1.3, height: radius * 1.3 }}
          ></div>

          {/* Central Prism Bulb */}
          <div className="absolute z-10 flex items-center justify-center">
            {/* Glowing Aura Rings */}
            <div className="absolute w-16 h-16 sm:w-24 sm:h-24 rounded-full border border-primary/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
            <div className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-primary/10 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30" style={{ animationDelay: "1s" }}></div>
            
            {/* The Bulb from Logo */}
            <svg 
              viewBox="0 0 100 100" 
              className="w-12 h-12 sm:w-16 sm:h-16 drop-shadow-[0_0_15px_var(--color-primary)]" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="25" className="fill-primary">
                <animate attributeName="r" values="22;28;22" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>

          {/* Orbiting Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                
                {/* Node Label (hidden when expanded to prevent clutter) */}
                <div
                  className={`
                    absolute top-12 sm:top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-[10px] sm:text-[11px] font-semibold tracking-wider font-display
                    transition-all duration-300 pointer-events-none
                    ${isExpanded ? "opacity-0" : "text-ink/60 dark:text-slate/60"}
                  `}
                >
                  {item.title}
                </div>

                {/* Node Icon Circle */}
                <div
                  className={`
                  w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative
                  ${
                    isExpanded
                      ? "bg-primary text-white scale-125 border-transparent shadow-[0_0_20px_var(--color-primary)]"
                      : "bg-surface dark:bg-[#111111] text-ink dark:text-white border border-slate/20 dark:border-white/10 hover:border-primary/50 hover:text-primary transition-colors"
                  }
                  transition-all duration-300 transform
                `}
                >
                  <Icon size={isExpanded ? 18 : 16} strokeWidth={isExpanded ? 2 : 1.5} className="sm:w-5 sm:h-5" />
                </div>

                {/* Expanded Card Detail */}
                {isExpanded && (
                  <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] z-[300] animate-in fade-in zoom-in-95 duration-200">
                    <div className="rounded-xl bg-surface/95 dark:bg-[#0a0a0a]/95 backdrop-blur-xl border border-border dark:border-white/10 shadow-2xl p-4 sm:p-5">
                      
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Icon size={16} strokeWidth={2} />
                          <h3 className="font-display font-bold text-[15px] sm:text-base text-ink dark:text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(item.id);
                          }}
                          className="text-slate hover:text-ink dark:hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[11px] sm:text-xs text-slate dark:text-slate/80 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Tool Pills Grid */}
                      <div className="space-y-2">
                        <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate/50 mb-2">Popular Tools</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tools.map((tool, idx) => (
                            <Link 
                              key={idx} 
                              href={tool.path}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Badge 
                                variant="outline" 
                                className="text-[9px] sm:text-[10px] py-0.5 px-2 font-medium bg-transparent hover:bg-primary/5 dark:hover:bg-primary/10 border-slate/20 dark:border-white/10 text-slate dark:text-slate/90 transition-colors"
                              >
                                {tool.name}
                              </Badge>
                            </Link>
                          ))}
                          
                          <Link 
                            href={`/${item.id === 'pdf' ? 'tools/pdf' : item.id === 'qr' ? 'tools/qr' : item.id === 'calculators' ? 'tools/calculators' : item.id === 'text' ? 'tools/text' : item.id === 'dev' ? 'tools/dev' : item.id === 'seo' ? 'tools/seo' : item.id === 'convert' ? 'tools/convert' : item.id === 'image' ? 'image' : item.id === 'editing' ? 'editing' : item.id}`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Badge 
                              variant="default" 
                              className="text-[9px] sm:text-[10px] py-0.5 px-2 font-medium bg-primary/10 text-primary hover:bg-primary/20 border-transparent transition-colors group flex items-center gap-1"
                            >
                              View All
                              <ArrowRight size={8} className="group-hover:translate-x-0.5 transition-transform" />
                            </Badge>
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
