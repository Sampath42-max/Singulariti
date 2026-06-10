"use client";
import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, ImageIcon, FileText, QrCode, Wand2, Calculator, Keyboard, Timer, Brush, Type, Code, Scale, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
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
  const [isMounted, setIsMounted] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [radius, setRadius] = useState<number>(250);
  
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

  // Mount check for hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle Window Resize for Mobile Responsiveness
  useEffect(() => {
    if (!isMounted) return;
    const handleResize = () => {
      if (window.innerWidth < 640) { // mobile
        setRadius(140);
      } else if (window.innerWidth < 1024) { // tablet
        setRadius(190);
      } else { // desktop
        setRadius(240);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMounted]);

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

  // Steady, periodic, synchronized motion
  useEffect(() => {
    if (!isMounted) return;
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.1) % 360; 
          return Number(newAngle.toFixed(3));
        });
      }, 30);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, isMounted]);

  const centerViewOnNode = (nodeId: string) => {
    if (!nodeRefs.current[nodeId]) return;
    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;
    
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
      0.6,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  if (!isMounted) {
    return (
      <div className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-visible mt-10 lg:mt-0 opacity-0"></div>
    );
  }

  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center overflow-visible mt-10 lg:mt-0"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-2xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000 ease-out"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          
          {/* Energy Beams emitting from the core to the nodes */}
          <svg className="absolute w-full h-full pointer-events-none overflow-visible z-0">
            <g style={{ transform: 'translate(50%, 50%)' }}>
              <defs>
                <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {timelineData.map((item, index) => {
                const pos = calculateNodePosition(index, timelineData.length);
                const isExpanded = expandedItems[item.id];
                return (
                  <line 
                    key={`beam-${item.id}`}
                    x1="0" y1="0" x2={pos.x} y2={pos.y}
                    stroke="var(--color-primary)"
                    strokeWidth={isExpanded ? "2.5" : "1"}
                    className={`transition-all duration-700 ${isExpanded ? "opacity-60 drop-shadow-[0_0_8px_var(--color-primary)]" : "opacity-15"}`}
                  />
                );
              })}
            </g>
          </svg>

          {/* Energy Rings - steady synced rotation */}
          <div 
            className="absolute rounded-full border border-slate/10 dark:border-white/5 pointer-events-none transition-all duration-500 flex items-center justify-center"
            style={{ width: radius * 2, height: radius * 2 }}
          >
            <div 
              className="absolute w-full h-full rounded-full border-t border-primary/40 blur-[1.5px]"
              style={{ transform: `rotate(-${rotationAngle * 1.5}deg)` }}
            ></div>
            <div 
              className="absolute w-full h-full rounded-full border-r border-primary/20 blur-[2px]"
              style={{ transform: `rotate(${rotationAngle * 2}deg)` }}
            ></div>
          </div>
          
          <div 
            className="absolute rounded-full border border-slate/5 dark:border-white/5 pointer-events-none transition-all duration-500 flex items-center justify-center"
            style={{ width: radius * 1.3, height: radius * 1.3 }}
          >
            <div 
              className="absolute w-full h-full rounded-full border-b border-primary/30 blur-[2px]"
              style={{ transform: `rotate(${rotationAngle * 1.5}deg)` }}
            ></div>
          </div>

          {/* Central High-Energy 3D Prism Core */}
          <div className="absolute z-10 flex items-center justify-center scale-[0.6] sm:scale-[0.8] lg:scale-100">
            {/* Massive intense background glow for energy emission */}
            <div className="absolute w-48 h-48 bg-primary/20 rounded-full blur-[60px] mix-blend-screen pointer-events-none">
              <div className="absolute inset-0 bg-teal-300/20 blur-[30px] animate-pulse"></div>
            </div>
            
            {/* True 3D Hollow Prism Geometry */}
            <div className="relative w-80 h-80 flex items-center justify-center drop-shadow-[0_0_30px_rgba(20,184,166,0.5)]">
              <svg 
                viewBox="0 0 100 100" 
                className="w-full h-full overflow-visible" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: `rotate(${rotationAngle * 0.5}deg)` }} 
              >
                {/* Back edges (creating true hollow 3D depth) */}
                <polygon points="50,25 25,75 75,75" className="stroke-primary/20" strokeWidth="0.5" />
                <line x1="50" y1="10" x2="50" y2="25" className="stroke-primary/30" strokeWidth="0.7" />
                <line x1="15" y1="85" x2="25" y2="75" className="stroke-primary/30" strokeWidth="0.7" />
                <line x1="85" y1="85" x2="75" y2="75" className="stroke-primary/30" strokeWidth="0.7" />
                
                {/* Front Wireframe */}
                <polygon points="50,10 15,85 85,85" className="stroke-primary" strokeWidth="1.5" strokeLinejoin="round" />
                
                {/* Inner perspective lines converging to the energy bulb */}
                <line x1="50" y1="10" x2="50" y2="60" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="15" y1="85" x2="50" y2="60" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="85" y1="85" x2="50" y2="60" className="stroke-primary" strokeWidth="1.5" strokeLinecap="round" />
                
                {/* Inner glowing bottom face */}
                <polygon points="15,85 85,85 50,60" className="fill-primary/10" />

                {/* The Integrated Pulsing Energy Bulb at vertex (50, 60) */}
                <g transform="translate(50, 60)">
                  <circle cx="0" cy="0" r="10" className="fill-primary drop-shadow-[0_0_20px_var(--color-primary)]">
                    <animate attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="0" cy="0" r="4" className="fill-white drop-shadow-[0_0_12px_white]">
                     <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>
          </div>

          {/* Orbiting Tool Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 300 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer flex flex-col items-center justify-center group"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                
                {/* Node Label */}
                <div
                  className={`
                    absolute top-16 sm:top-20 whitespace-nowrap
                    text-[10px] sm:text-[11px] font-bold tracking-wider font-display uppercase
                    transition-all duration-300 pointer-events-none
                    ${isExpanded ? "opacity-0" : "text-ink/90 dark:text-slate/80 group-hover:text-primary drop-shadow-sm"}
                  `}
                >
                  {item.title}
                </div>

                {/* Energy Absorbing Glass Nodes */}
                <div
                  className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative
                  transition-all duration-500
                  ${
                    isExpanded
                      ? "scale-110 shadow-[0_0_40px_rgba(20,184,166,0.6)] bg-primary border-2 border-primary"
                      : "scale-100 shadow-[0_0_20px_rgba(20,184,166,0.15)] border-2 border-primary/20 bg-white dark:bg-black hover:scale-110 hover:border-primary/80 hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] hover:bg-primary/5 dark:hover:bg-primary/10"
                  }
                `}
                >
                  {/* Energy Aura behind the icon */}
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-primary pointer-events-none" style={{ animationDuration: '4s', animationDelay: `${index * 0.2}s` }}></div>
                  
                  {/* The Icon */}
                  <Icon 
                    size={isExpanded ? 24 : 20} 
                    strokeWidth={isExpanded ? 2.5 : 2} 
                    className={`
                      sm:w-7 sm:h-7 transition-colors duration-500 relative z-10
                      ${isExpanded ? "text-white" : "text-slate-800 dark:text-slate-200 group-hover:text-primary"}
                    `} 
                  />
                </div>

                {/* Expanded Card Detail */}
                {isExpanded && (
                  <div className="absolute top-20 sm:top-24 left-1/2 -translate-x-1/2 w-[280px] sm:w-[320px] z-[300] animate-in fade-in zoom-in-95 duration-200">
                    <div className="rounded-xl bg-white/95 dark:bg-black/95 backdrop-blur-xl border-2 border-primary/30 shadow-[0_15px_50px_-10px_rgba(20,184,166,0.3)] p-4 sm:p-5">
                      
                      {/* Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2 text-primary">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <Icon size={16} strokeWidth={2.5} className="text-primary" />
                          </div>
                          <h3 className="font-display font-bold text-[16px] sm:text-lg text-slate-900 dark:text-white leading-tight">
                            {item.title}
                          </h3>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleItem(item.id);
                          }}
                          className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors p-1"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      {/* Description */}
                      <p className="text-[12px] sm:text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
                        {item.description}
                      </p>

                      {/* Tool Pills Grid */}
                      <div className="space-y-2.5">
                        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Popular Tools</div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.tools.map((tool, idx) => (
                            <Link 
                              key={idx} 
                              href={tool.path}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Badge 
                                variant="outline" 
                                className="text-[10px] sm:text-[11px] py-1 px-2.5 font-medium bg-transparent hover:bg-primary/10 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-primary transition-all hover:border-primary/50"
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
                              className="text-[10px] sm:text-[11px] py-1 px-2.5 font-medium bg-primary/15 text-primary hover:bg-primary border-transparent hover:text-white transition-all group flex items-center gap-1"
                            >
                              View All
                              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
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
