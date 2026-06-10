"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ArrowRight, ImageIcon, FileText, QrCode, Wand2,
  Calculator, Type, Code, Scale, Search, X
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { registry } from "@/registry";
import Link from "next/link";

// ─── Constants ──────────────────────────────────────────────────────────────
// The primary brand color in RGB for Canvas rendering
const PRIMARY_RGB = "20, 184, 166"; // Teal-500
const ORBIT_RY_RATIO = 0.38; // Perspective tilt of orbit ellipse (3D effect)

// ─── Icon map ─────────────────────────────────────────────────────────────────
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

// ─── Category path helper ─────────────────────────────────────────────────────
function categoryPath(id: string) {
  const special: Record<string, string> = {
    pdf: "tools/pdf",
    qr: "tools/qr",
    calculators: "tools/calculators",
    text: "tools/text",
    dev: "tools/dev",
    seo: "tools/seo",
    convert: "tools/convert",
    image: "image",
    editing: "editing",
  };
  return special[id] ?? id;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface ToolPreview { name: string; path: string; }
interface CategoryNode {
  id: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  tools: ToolPreview[];
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroOrbitalEcosystem() {
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const animRef = useRef<number>(0);
  const tRef = useRef(0);
  const angleRef = useRef(0);
  const activeRef = useRef<string | null>(null);

  // Keep ref in sync so the rAF loop reads current value without stale closure
  useEffect(() => { activeRef.current = activeId; }, [activeId]);

  // ─── Build data from registry ───────────────────────────────────────────────
  const nodes: CategoryNode[] = registry.categories.map(cat => {
    const allTools = cat.collections.flatMap(c => c.tools);
    return {
      id: cat.id,
      title: cat.name.replace(" Tools", ""),
      description: cat.description,
      Icon: iconMap[cat.id] ?? Search,
      tools: allTools.slice(0, 8).map(t => ({ name: t.name, path: t.path! })),
    };
  });

  // ─── Mount ──────────────────────────────────────────────────────────────────
  useEffect(() => { setMounted(true); }, []);

  // ─── Animation loop (60fps Canvas & DOM Transform Engine) ───────────────────
  const startAnimation = useCallback(() => {
    function loop() {
      const canvas = canvasRef.current;
      const stage = stageRef.current;
      const svgEl = svgRef.current;
      if (!canvas || !stage || !svgEl) return;
      const ctx = canvas.getContext("2d")!;

      tRef.current += 0.008;
      
      // Auto-rotate slowly, but smoothly seek to the active node if one is selected
      if (!activeRef.current) {
        angleRef.current += 0.0025;
      } else {
        // Find target angle to center the active node at the bottom (Math.PI / 2)
        const nodeIndex = nodes.findIndex(n => n.id === activeRef.current);
        if (nodeIndex !== -1) {
          const targetOffset = (nodeIndex / nodes.length) * Math.PI * 2;
          const desiredAngle = (Math.PI / 2) - targetOffset;
          
          // Smooth spring interpolation to target angle
          let diff = desiredAngle - (angleRef.current % (Math.PI * 2));
          // Normalize difference to -PI to PI
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          
          angleRef.current += diff * 0.06;
        }
      }
      
      const t = tRef.current;
      const orbitAngle = angleRef.current;

      // Handle Canvas Resizing (with High DPI / Retina Support for premium sharpness)
      const W = stage.offsetWidth;
      const H = stage.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
        ctx.scale(dpr, dpr);
      }
      ctx.clearRect(0, 0, W, H);

      // Extract precise SVG center coordinates relative to the Stage
      const svgRect = svgEl.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      const svgCx = svgRect.left - stageRect.left + svgRect.width / 2;
      const svgCy = svgRect.top - stageRect.top + svgRect.height / 2;

      // The Bulb is exactly at SVG coordinate (180, 175) in a 360x360 viewBox
      const scaleX = svgRect.width / 360;
      const scaleY = svgRect.height / 360;
      const bulbX = svgCx + (180 - 180) * scaleX; 
      const bulbY = svgCy + (175 - 180) * scaleY;

      // ── Canvas: Concentric Energy Ripples Emitting from Core ─────────────────
      const numRipples = 3;
      for (let r = 0; r < numRipples; r++) {
        const rippleT = (t * 0.8 + r / numRipples) % 1; // 0 to 1
        const rippleRadius = 30 + Math.pow(rippleT, 1.5) * 160;
        const rippleAlpha = (1 - rippleT) * 0.4;
        
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${PRIMARY_RGB}, ${rippleAlpha})`;
        ctx.lineWidth = 1.5 - rippleT;
        ctx.stroke();
      }
      // ── Canvas: Base Orbital Ring (Removed visual path line) ────────────────
      // The nodes will still follow this path mathematically.

      // Responsive orbit radius based on screen size
      const isMobile = W < 640;
      const R = Math.min(W, H) * (isMobile ? 0.46 : 0.43);

      nodes.forEach((node, i) => {
        const a = orbitAngle + (i / nodes.length) * Math.PI * 2;
        const nx = svgCx + Math.cos(a) * R;
        const ny = svgCy + Math.sin(a) * R * ORBIT_RY_RATIO;

        const isActive = activeRef.current === node.id;
        
        // Calculate dynamic flare/energy pulse
        const flarePhase = (t * 2 + i * 0.78) % (Math.PI * 2);
        const flareBase = Math.pow(Math.max(0, Math.sin(flarePhase)), 3);
        const flareAlpha = isActive ? 1 : flareBase * 0.7;

        // ── Canvas: Bezier Arc / Plasma Stream from Bulb to Node ────────────────
        const distance = Math.hypot(nx - bulbX, ny - bulbY);
        // Organic curve control points
        const cp1x = bulbX + (nx - bulbX) * 0.3 + Math.sin(t * 1.5 + i) * (distance * 0.15);
        const cp1y = bulbY + (ny - bulbY) * 0.3 + Math.cos(t * 1.5 + i) * (distance * 0.15);
        const cp2x = bulbX + (nx - bulbX) * 0.7 + Math.sin(t * 2.0 + i) * (distance * 0.1);
        const cp2y = bulbY + (ny - bulbY) * 0.7 + Math.cos(t * 2.0 + i) * (distance * 0.1);

        if (flareAlpha > 0.02 || isActive) {
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(bulbX, bulbY);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, nx, ny);

          const grad = ctx.createLinearGradient(bulbX, bulbY, nx, ny);
          grad.addColorStop(0, `rgba(${PRIMARY_RGB}, ${flareAlpha})`);
          grad.addColorStop(0.5, `rgba(${PRIMARY_RGB}, ${flareAlpha * 0.7})`);
          grad.addColorStop(1, `rgba(${PRIMARY_RGB}, ${isActive ? flareAlpha * 0.9 : 0})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = isActive ? 3.5 : (flareAlpha > 0.3 ? 2 : 1);
          ctx.shadowColor = `rgb(${PRIMARY_RGB})`;
          ctx.shadowBlur = isActive ? 25 : (flareAlpha > 0.3 ? 12 : 0);
          ctx.stroke();
          
          // ── Canvas: Plasma Sparks traveling along the Bezier Curve ────────────
          if (flareAlpha > 0.1 || isActive) {
            const numParticles = isActive ? 4 : 1;
            for (let p = 0; p < numParticles; p++) {
              const particleT = (t * (isActive ? 1.5 : 0.8) + i * 0.3 + p / numParticles) % 1;
              // Easing function to make it shoot fast then slow down slightly
              const easeT = 1 - Math.pow(1 - particleT, 2.5);
              
              // Calculate specific coordinate along the bezier curve
              const px = Math.pow(1 - easeT, 3) * bulbX 
                       + 3 * Math.pow(1 - easeT, 2) * easeT * cp1x 
                       + 3 * (1 - easeT) * Math.pow(easeT, 2) * cp2x 
                       + Math.pow(easeT, 3) * nx;
              const py = Math.pow(1 - easeT, 3) * bulbY 
                       + 3 * Math.pow(1 - easeT, 2) * easeT * cp1y 
                       + 3 * (1 - easeT) * Math.pow(easeT, 2) * cp2y 
                       + Math.pow(easeT, 3) * ny;

              ctx.beginPath();
              ctx.arc(px, py, isActive ? 2.5 : 1.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${isActive ? 1 : 0.7})`;
              ctx.shadowColor = `rgb(${PRIMARY_RGB})`;
              ctx.shadowBlur = 15;
              ctx.fill();
            }
          }
          ctx.restore();
        }

        // ── Canvas: Node Aura / Glow underneath the DOM element ─────────────────
        if (isActive || flareAlpha > 0.2) {
          const auraR = isActive ? 50 : 35;
          ctx.save();
          ctx.beginPath();
          ctx.arc(nx, ny, auraR, 0, Math.PI * 2);
          const aura = ctx.createRadialGradient(nx, ny, 0, nx, ny, auraR);
          const a0 = isActive ? 0.5 : flareAlpha * 0.45;
          aura.addColorStop(0, `rgba(${PRIMARY_RGB}, ${a0})`);
          aura.addColorStop(1, `rgba(${PRIMARY_RGB}, 0)`);
          ctx.fillStyle = aura;
          ctx.fill();
          ctx.restore();
        }

        // ── DOM: High Performance 3D Positioning ────────────────────────────────
        const el = document.getElementById(`orbit-node-${node.id}`);
        if (el) {
          // depth ranges from 0 (back) to 1 (front)
          const depth = (Math.sin(a) + 1) / 2;
          // Scale nodes down when they go to the back for true 3D perspective
          const scale = isActive ? 1.2 : 0.75 + depth * 0.35;
          const nodeSize = isMobile ? 48 : 64; // Base size
          const offset = nodeSize / 2;
          
          el.style.transform = `translate(${nx - offset}px, ${ny - offset}px) scale(${scale})`;
          el.style.zIndex = String(isActive ? 300 : Math.round(10 + depth * 40));
          // Dim opacity for nodes in the background
          el.style.opacity = String(isActive ? 1 : 0.5 + depth * 0.5);
        }
      });

      // ── DOM: Rotate SVG rings and Inner Geometry ────────────────────────────
      const ring1 = svgEl.querySelector<SVGGElement>("#halo-ring1");
      const ring2 = svgEl.querySelector<SVGGElement>("#halo-ring2");
      const innerHex = svgEl.querySelector<SVGGElement>("#inner-hex");
      if (ring1) ring1.setAttribute("transform", `rotate(${(t * 15 * 180) / Math.PI}, 180, 200)`);
      if (ring2) ring2.setAttribute("transform", `rotate(${(-t * 20 * 180) / Math.PI}, 180, 195)`);
      if (innerHex) innerHex.setAttribute("transform", `rotate(${(t * 5 * 180) / Math.PI}, 180, 175)`);

      animRef.current = requestAnimationFrame(loop);
    }

    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [nodes]);

  useEffect(() => {
    if (!mounted) return;
    const cancel = startAnimation();
    return cancel;
  }, [mounted, startAnimation]);

  // ─── Toggle active node ──────────────────────────────────────────────────────
  const toggle = (id: string) =>
    setActiveId(prev => (prev === id ? null : id));

  // ─── SSR Placeholder ─────────────────────────────────────────────────────────
  if (!mounted) {
    return <div className="relative w-full h-[340px] sm:h-[500px] lg:h-full lg:min-h-[600px] opacity-0" />;
  }

  return (
    <div
      ref={stageRef}
      className="relative w-full h-[380px] sm:h-[500px] lg:h-full lg:min-h-[600px] select-none mt-2 sm:mt-0"
      onClick={() => setActiveId(null)}
    >
      {/* High Performance Canvas for dynamic laser flares, sparks, and ripples */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Central 3D Prism Engine — Absolutely Centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <svg
          ref={svgRef}
          viewBox="0 0 360 360"
          className="w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] overflow-visible drop-shadow-[0_0_20px_rgba(20,184,166,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="sg-core-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </radialGradient>
            <filter id="sg-edge-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="sg-bulb-glow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="10" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Ambient Radiance */}
          <circle cx="180" cy="200" r="110" fill="url(#sg-core-glow)" />

          {/* Back/Inner Hollow Wireframe Faces */}
          <polygon points="180,42 90,225 270,225"
            stroke="var(--color-primary)" strokeWidth="1" strokeOpacity="0.15" fill="var(--color-primary)" fillOpacity="0.02" />
          <polygon points="180,72 108,210 252,210"
            stroke="var(--color-primary)" strokeWidth="0.8" strokeOpacity="0.2" fill="var(--color-primary)" fillOpacity="0.04" />

          {/* Depth Pillars connecting back and front */}
          <line x1="180" y1="42" x2="180" y2="72" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="90" y1="225" x2="108" y2="210" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1" />
          <line x1="270" y1="225" x2="252" y2="210" stroke="var(--color-primary)" strokeOpacity="0.3" strokeWidth="1" />

          {/* Outer Front Wireframe Glow Pass */}
          <polygon points="180,42 90,225 270,225"
            stroke="var(--color-primary)" strokeWidth="2.5" fill="none"
            filter="url(#sg-edge-glow)" opacity="0.6" />

          {/* Outer Front Wireframe Sharp Edge */}
          <polygon points="180,42 90,225 270,225" stroke="var(--color-primary)" strokeWidth="2" fill="none" />

          {/* Inner Converging Geometry to Bulb */}
          <line x1="180" y1="42" x2="180" y2="175" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="90" y1="225" x2="180" y2="175" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="270" y1="225" x2="180" y2="175" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Inner Floor Fill */}
          <polygon points="90,225 270,225 180,175" fill="var(--color-primary)" fillOpacity="0.08" />

          {/* Sci-Fi Tesseract Dashed Cross-Section */}
          <line x1="180" y1="42" x2="108" y2="210" stroke="var(--color-primary)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="180" y1="42" x2="252" y2="210" stroke="var(--color-primary)" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="90" y1="225" x2="252" y2="210" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="270" y1="225" x2="108" y2="210" stroke="var(--color-primary)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="4,4" />

          {/* The Energy Bulb (Exactly at Vertex 180, 175) */}
          <circle cx="180" cy="175" r="40" fill="url(#sg-core-glow)" />
          
          {/* Inner mechanical rotating hexagon inside the bulb */}
          <g id="inner-hex" stroke="var(--color-primary)" strokeWidth="1.5" strokeOpacity="0.6" fill="none">
            <polygon points="180,152 199,163.5 199,186.5 180,198 161,186.5 161,163.5" />
          </g>

          <circle cx="180" cy="175" r="24" fill="var(--color-primary)" fillOpacity="0.7" filter="url(#sg-bulb-glow)">
            <animate attributeName="r" values="20;26;20" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="175" r="12" fill="#ffffff" filter="url(#sg-bulb-glow)">
            <animate attributeName="r" values="10;14;10" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="180" cy="175" r="6" fill="#ffffff">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="0.75s" repeatCount="indefinite" />
          </circle>

        </svg>
      </div>

      {/* Orbiting Tool Nodes */}
      {nodes.map((node, i) => {
        const Icon = node.Icon;
        const isActive = activeId === node.id;
        
        return (
          <div
            key={node.id}
            id={`orbit-node-${node.id}`}
            className="absolute top-0 left-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] cursor-pointer group"
            style={{ willChange: "transform, opacity" }}
            onClick={e => { e.stopPropagation(); toggle(node.id); }}
          >
            {/* Ping Ring */}
            <span
              className="absolute inset-0 rounded-full border border-primary/60 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ animationDelay: `${i * 0.35}s`, animationDuration: "3s" }}
            />

            {/* Premium Glass Node Circle */}
            <div className={[
              "w-full h-full rounded-full flex items-center justify-center relative backdrop-blur-md",
              "border-[1.5px] transition-all duration-500 shadow-sm",
              isActive
                ? "border-primary bg-primary shadow-[0_0_40px_rgba(20,184,166,0.6),0_0_15px_rgba(20,184,166,0.4)_inset] scale-110"
                : "border-primary/40 bg-surface dark:bg-[#0a0a0a] group-hover:border-primary group-hover:bg-primary/10 dark:group-hover:bg-primary/20 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.5),inset_0_0_10px_rgba(20,184,166,0.2)]",
            ].join(" ")}>
              {/* Teal Icons for all states */}
              <Icon
                size={isActive ? 24 : 22}
                strokeWidth={isActive ? 2.5 : 2}
                className={[
                  "transition-all duration-500 relative z-10",
                  isActive
                    ? "text-white drop-shadow-[0_0_10px_white]"
                    : "text-primary drop-shadow-[0_0_8px_rgba(20,184,166,0.4)] group-hover:text-teal-300",
                ].join(" ")}
              />
            </div>

            {/* Orbit Label */}
            <div className={[
              "absolute top-[115%] left-1/2 -translate-x-1/2 whitespace-nowrap font-display font-bold tracking-widest uppercase transition-all duration-300 pointer-events-none drop-shadow-md",
              "text-[10px] sm:text-[11px]",
              isActive ? "opacity-0" : "text-slate dark:text-slate/90 group-hover:text-primary"
            ].join(" ")}>
              {node.title}
            </div>

            {/* Expanded Premium Detail Card */}
            {isActive && (
              <div
                className="absolute top-[125%] left-1/2 -translate-x-1/2 w-[280px] sm:w-[340px] animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300"
                style={{ zIndex: 400 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="rounded-2xl bg-surface/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl border border-primary/30 shadow-[0_20px_60px_-10px_rgba(20,184,166,0.4)] p-5 relative overflow-hidden">
                  
                  {/* Subtle Card Core Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

                  {/* Header */}
                  <div className="flex items-center justify-between mb-3 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                        <Icon size={16} strokeWidth={2.5} className="text-primary drop-shadow-[0_0_5px_rgba(20,184,166,0.5)]" />
                      </div>
                      <h3 className="font-display font-bold text-base text-ink dark:text-white tracking-tight">
                        {node.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setActiveId(null)}
                      className="text-slate hover:text-ink dark:hover:text-white transition-colors p-1"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] sm:text-[13px] text-slate dark:text-slate/80 leading-relaxed mb-5 relative z-10">
                    {node.description}
                  </p>

                  {/* Tool Pills Grid */}
                  <div className="relative z-10">
                    <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate/50 mb-2.5">
                      Popular Tools
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {node.tools.map((tool, idx) => (
                        <Link key={idx} href={tool.path} onClick={e => e.stopPropagation()}>
                          <Badge
                            variant="outline"
                            className="text-[11px] py-1 px-3 font-medium bg-surface dark:bg-[#0a0a0a] hover:bg-primary/10 border-slate/20 dark:border-white/10 text-slate dark:text-slate/90 hover:text-primary transition-all hover:border-primary/50 shadow-sm"
                          >
                            {tool.name}
                          </Badge>
                        </Link>
                      ))}
                      <Link href={`/${categoryPath(node.id)}`} onClick={e => e.stopPropagation()}>
                        <Badge
                          variant="default"
                          className="text-[11px] py-1 px-3 font-medium bg-primary/15 text-primary hover:bg-primary border-transparent hover:text-white transition-all flex items-center gap-1.5 shadow-sm group"
                        >
                          View All <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
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
  );
}
