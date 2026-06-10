import React from 'react';
import { 
  // Compressors
  Minimize, Shrink,
  // Converters
  ArrowRightLeft, FileImage, FileText, FileCode2, Binary, Frame, CodeXml, Combine, Replace,
  // Editing
  Crop, Maximize, RotateCw, FlipHorizontal, Wand2, Filter, Sun, Palette, Blend, Stamp, Type as TypeIcon, Search, Pipette, Droplets, Zap, Image as ImageIcon,
  // PDF
  SplitSquareHorizontal, FileMinus, FileOutput, FileLock2, LockOpen, PenTool, FileDigit, FileText as PdfFile, FileWarning,
  // Dev
  Braces, ListTree, Database, KeyRound, Link, Regex, Hash, CheckCircle2, Minimize2, Code, ShieldCheck, Bug, BoxSelect,
  // Calculators
  Calculator, Landmark, TrendingUp, Banknote, CalendarClock, Activity, Tag, Percent, Fuel, Zap as ZapIcon, Coins, LineChart, Wallet,
  // SEO
  Globe2, Waypoints, BotMessageSquare, BarChart2, ScanSearch, LineChart as ChartLine, MonitorSmartphone,
  // Text
  BookType, CaseSensitive, ArrowDownAZ, WrapText, MailSearch, TextQuote, SpellCheck, RefreshCw, FileDiff,
  // Unit Conversion
  Ruler, Weight, Thermometer, SquareDashed, Beaker, Hourglass, Scale, Compass, Gauge,
  // QR
  QrCode, ScanLine, Wifi, Smartphone, Mail, Briefcase, Globe
} from 'lucide-react';

interface ToolIconProps {
  toolId: string;
  className?: string; 
  fallback?: React.ReactNode;
}

export function ToolIcon({ toolId, className = "w-14 h-14" }: ToolIconProps) {
  const id = toolId.toLowerCase();

  // Determine the single most relevant icon for the tool
  let IconComponent: React.ElementType = Code;

  // ==========================================
  // IMAGE TOOLS
  // ==========================================
  if (id.includes('compressor') || id.includes('compress')) IconComponent = Minimize;
  else if (id.includes('crop')) IconComponent = Crop;
  else if (id.includes('resize')) IconComponent = Maximize;
  else if (id.includes('rotate')) IconComponent = RotateCw;
  else if (id.includes('flip')) IconComponent = FlipHorizontal;
  else if (id.includes('upscaler') || id.includes('enhance')) IconComponent = Wand2;
  else if (id.includes('blur')) IconComponent = Droplets;
  else if (id.includes('sharpen')) IconComponent = Zap;
  else if (id.includes('denoise') || id.includes('pixelate') || id.includes('filter')) IconComponent = Filter;
  else if (id.includes('brightness')) IconComponent = Sun;
  else if (id.includes('color-adjuster') || id.includes('palette')) IconComponent = Palette;
  else if (id.includes('grayscale') || id.includes('black-and-white')) IconComponent = Blend;
  else if (id.includes('watermark') || id.includes('stamp')) IconComponent = Stamp;
  else if (id.includes('add-text')) IconComponent = TypeIcon;
  else if (id.includes('metadata')) IconComponent = Search;
  else if (id.includes('dimension')) IconComponent = BoxSelect;
  else if (id.includes('color-picker')) IconComponent = Pipette;
  else if (id.includes('to-pdf')) IconComponent = PdfFile;
  else if (id.includes('to-jpg') || id.includes('to-png') || id.includes('to-webp')) IconComponent = FileImage;
  else if (id.includes('to-svg')) IconComponent = FileCode2;
  else if (id.includes('to-text')) IconComponent = FileText;
  else if (id.includes('base64')) IconComponent = Binary;

  // ==========================================
  // PDF TOOLS
  // ==========================================
  else if (id.includes('pdf')) {
    if (id === 'merge-pdf') IconComponent = Combine;
    else if (id === 'split-pdf') IconComponent = SplitSquareHorizontal;
    else if (id === 'rotate-pdf') IconComponent = RotateCw;
    else if (id === 'delete-pdf-pages') IconComponent = FileMinus;
    else if (id === 'rearrange-pdf-pages') IconComponent = ArrowRightLeft;
    else if (id === 'extract-pdf-pages') IconComponent = FileOutput;
    else if (id === 'compress-pdf') IconComponent = Minimize;
    else if (id === 'protect-pdf') IconComponent = FileLock2;
    else if (id === 'unlock-pdf') IconComponent = LockOpen;
    else if (id === 'sign-pdf') IconComponent = PenTool;
    else if (id === 'watermark-pdf') IconComponent = Stamp;
    else if (id === 'metadata-viewer') IconComponent = Search;
    else if (id === 'page-counter') IconComponent = FileDigit;
    else IconComponent = PdfFile;
  }
  
  // ==========================================
  // DEVELOPER TOOLS
  // ==========================================
  else if (id.includes('dev') || id.includes('json') || id.includes('xml') || id.includes('sql') || id.includes('jwt') || id.includes('yaml') || id.includes('hash')) {
    if (id.includes('json')) IconComponent = Braces;
    else if (id.includes('xml')) IconComponent = CodeXml;
    else if (id.includes('yaml')) IconComponent = ListTree;
    else if (id.includes('sql')) IconComponent = Database;
    else if (id.includes('jwt')) IconComponent = KeyRound;
    else if (id.includes('url')) IconComponent = Link;
    else if (id.includes('regex')) IconComponent = Regex;
    else if (id.includes('hash') || id.includes('md5') || id.includes('sha')) IconComponent = Hash;
    else if (id.includes('format') || id.includes('validator') || id.includes('lint')) IconComponent = CheckCircle2;
    else if (id.includes('minify')) IconComponent = Minimize2;
    else IconComponent = Code;
  }

  // ==========================================
  // CALCULATORS
  // ==========================================
  else if (id.includes('calculator') || id.includes('emi') || id.includes('tax') || id.includes('sip') || id.includes('bmi')) {
    if (id.includes('age') || id.includes('date') || id.includes('time')) IconComponent = CalendarClock;
    else if (id.includes('bmi') || id.includes('health') || id.includes('calorie')) IconComponent = Activity;
    else if (id.includes('margin') || id.includes('discount')) IconComponent = Tag;
    else if (id.includes('sip') || id.includes('investment') || id.includes('compound')) IconComponent = TrendingUp;
    else if (id.includes('emi') || id.includes('loan') || id.includes('mortgage')) IconComponent = Landmark;
    else if (id.includes('salary') || id.includes('tax') || id.includes('gst')) IconComponent = Banknote;
    else if (id.includes('electricity') || id.includes('power')) IconComponent = ZapIcon;
    else if (id.includes('fuel') || id.includes('mileage')) IconComponent = Fuel;
    else if (id.includes('percentage') || id.includes('profit')) IconComponent = Percent;
    else IconComponent = Calculator;
  }

  // ==========================================
  // SEO TOOLS
  // ==========================================
  else if (id.includes('seo') || id.includes('meta') || id.includes('sitemap') || id.includes('robot')) {
    if (id.includes('meta')) IconComponent = Globe2;
    else if (id.includes('sitemap')) IconComponent = Waypoints;
    else if (id.includes('robot')) IconComponent = BotMessageSquare;
    else if (id.includes('keyword')) IconComponent = BarChart2;
    else if (id.includes('checker') || id.includes('audit')) IconComponent = ScanSearch;
    else IconComponent = Globe2;
  }

  // ==========================================
  // TEXT TOOLS
  // ==========================================
  else if (id.includes('text') || id.includes('word') || id.includes('case') || id.includes('sort') || id.includes('lorem')) {
    if (id.includes('count')) IconComponent = BookType;
    else if (id.includes('case')) IconComponent = CaseSensitive;
    else if (id.includes('sort')) IconComponent = ArrowDownAZ;
    else if (id.includes('reverse')) IconComponent = RefreshCw;
    else if (id.includes('remove') || id.includes('line')) IconComponent = WrapText;
    else if (id.includes('email') || id.includes('extract')) IconComponent = MailSearch;
    else if (id.includes('replace')) IconComponent = Replace;
    else if (id.includes('compare') || id.includes('diff')) IconComponent = FileDiff;
    else if (id.includes('lorem')) IconComponent = TextQuote;
    else IconComponent = TypeIcon;
  }

  // ==========================================
  // UNIT CONVERTERS
  // ==========================================
  else if (id.includes('convert') || id.includes('length') || id.includes('weight')) {
    if (id.includes('length') || id.includes('distance')) IconComponent = Ruler;
    else if (id.includes('weight') || id.includes('mass')) IconComponent = Weight;
    else if (id.includes('temperature')) IconComponent = Thermometer;
    else if (id.includes('area')) IconComponent = SquareDashed;
    else if (id.includes('volume')) IconComponent = Beaker;
    else if (id.includes('time')) IconComponent = Hourglass;
    else if (id.includes('speed')) IconComponent = Gauge;
    else IconComponent = Scale;
  }

  // ==========================================
  // QR TOOLS
  // ==========================================
  else if (id.includes('qr-code') || id.includes('qr')) {
    if (id.includes('scanner')) IconComponent = ScanLine;
    else if (id.includes('wifi')) IconComponent = Wifi;
    else if (id.includes('vcard') || id.includes('contact')) IconComponent = Briefcase;
    else if (id.includes('phone') || id.includes('sms')) IconComponent = Smartphone;
    else if (id.includes('email')) IconComponent = Mail;
    else if (id.includes('url')) IconComponent = Globe;
    else IconComponent = QrCode;
  }

  // True Glassmorphism Aesthetic
  return (
    <div className={`relative flex items-center justify-center ${className} bg-white/60 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700/50 rounded-2xl group-hover:scale-105 group-hover:-translate-y-1 group-hover:shadow-[0_8px_30px_rgba(20,184,166,0.15)] group-hover:border-primary/30 group-hover:bg-primary/5 dark:group-hover:bg-primary/10 transition-all duration-300 overflow-hidden`}>
      {/* Inner top highlight for glass depth */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/10" />
      
      {/* The Icon */}
      {/* Stroke starts as neutral slate, but fill is vibrant primary for mobile users. On hover, the stroke becomes primary too. */}
      <IconComponent 
        className="w-7 h-7 text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors duration-300 drop-shadow-sm relative z-10" 
        strokeWidth={1.5} 
        fill="rgba(20, 184, 166, 0.2)" 
      />
    </div>
  );
}
