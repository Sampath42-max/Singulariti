import React from 'react';
import { 
  // Compressors
  Minimize, Shrink, FileArchive, 
  // Editing
  Crop, Maximize, RotateCw, FlipHorizontal, Wand2, Filter, Sun, Contrast, 
  Palette, Droplets, Zap, Blend, Stamp, Type as TypeIcon, ImagePlus, Combine,
  Search, Scan,
  // Converters
  ImageDown, PictureInPicture, Frame, Shapes, PenTool, 
  // PDF
  FileText, SplitSquareHorizontal, FileMinus, ArrowRightLeft, FileLock2, LockOpen, 
  Fingerprint, Blocks, FileOutput, FileDigit,
  // Dev
  Braces, CodeXml, ListTree, Database, Binary, KeyRound, ShieldCheck, Link, Regex,
  Hash, Code, TextSelect, ScanText, 
  // Calculators
  Calculator, Percent, Tag, TrendingUp, Landmark, PiggyBank, Banknote, 
  Zap as ZapIcon, Fuel, Receipt, CalendarClock, Activity, Scale,
  // SEO & Text (Updated)
  Globe2, Waypoints, BotMessageSquare, BarChart2, 
  BookType, SpellCheck, ArrowLeftRight, WrapText, MailSearch,
  // Unit Conversion (Updated)
  Ruler, Thermometer, SquareDashed, Beaker, Hourglass, Weight,
  // QR
  QrCode, ScanLine, Wifi, Smartphone, Mail, Phone, MessageSquare, Briefcase,
  // Fallbacks
  FileCode, Layers, RefreshCw, FileImage
} from 'lucide-react';
import { PremiumIconContainer } from '../ui/PremiumIconContainer';

interface ToolIconProps {
  toolId: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function ToolIcon({ toolId, className = "w-6 h-6", fallback }: ToolIconProps) {
  const id = toolId.toLowerCase();

  let IconComponent: React.ElementType = FileCode;

  // ==========================================
  // IMAGE COMPRESSION
  // ==========================================
  if (id.includes('compression') || id.includes('compressor')) {
    if (id === 'image-compressor') IconComponent = Minimize;
    else if (id === 'jpg-compressor' || id === 'jpeg-compressor') IconComponent = Shrink;
    else if (id === 'png-compressor') IconComponent = FileArchive;
    else if (id === 'webp-compressor') IconComponent = Layers;
    else if (id === 'svg-compressor') IconComponent = PenTool;
    else IconComponent = Minimize;
  }
  // ==========================================
  // IMAGE CONVERSION
  // ==========================================
  else if (id.includes('conversion') || id.includes('-to-')) {
    if (id === 'jpg-to-png') IconComponent = ImagePlus;
    else if (id === 'png-to-jpg') IconComponent = ImageDown;
    else if (id === 'jpg-to-webp' || id === 'png-to-webp') IconComponent = PictureInPicture;
    else if (id === 'webp-to-jpg' || id === 'webp-to-png') IconComponent = Frame;
    else if (id === 'svg-to-png' || id === 'svg-to-jpg') IconComponent = Shapes;
    else if (id === 'png-to-svg' || id === 'jpg-to-svg') IconComponent = PenTool;
    else if (id === 'image-to-base64') IconComponent = Binary;
    else if (id === 'base64-to-image') IconComponent = Scan;
    else if (id === 'pdf-to-jpg') IconComponent = FileImage;
    else if (id === 'jpg-to-pdf') IconComponent = Combine;
    else if (id === 'pdf-to-text') IconComponent = ScanText;
    else IconComponent = ArrowRightLeft;
  }
  // ==========================================
  // IMAGE EDITING & UTILITIES
  // ==========================================
  else if (id === 'crop-image') { IconComponent = Crop; }
  else if (id === 'image-resizer') { IconComponent = Maximize; }
  else if (id === 'rotate-image') { IconComponent = RotateCw; }
  else if (id === 'flip-image') { IconComponent = FlipHorizontal; }
  else if (id === 'image-upscaler' || id === 'image-enhancer') { IconComponent = Wand2; }
  else if (id === 'blur-image') { IconComponent = Droplets; }
  else if (id === 'image-sharpen') { IconComponent = Zap; }
  else if (id === 'image-denoiser' || id === 'pixelate-image') { IconComponent = Filter; }
  else if (id === 'brightness-and-contrast-adjuster') { IconComponent = Sun; }
  else if (id === 'color-adjuster') { IconComponent = Palette; }
  else if (id === 'grayscale' || id.includes('black-and-white')) { IconComponent = Blend; }
  else if (id === 'add-watermark-to-image' || id === 'add-logo-overlay') { IconComponent = Stamp; }
  else if (id === 'add-text-on-image') { IconComponent = TypeIcon; }
  else if (id === 'image-metadata-viewer') { IconComponent = Search; }
  else if (id === 'image-dimension-checker') { IconComponent = Maximize; }
  else if (id === 'color-picker-from-image' || id === 'image-color-palette-extractor') { IconComponent = Palette; }
  
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
    else if (id === 'sign-pdf') IconComponent = Fingerprint;
    else if (id === 'watermark-pdf') IconComponent = Stamp;
    else if (id === 'metadata-viewer') IconComponent = Search;
    else if (id === 'page-counter') IconComponent = FileDigit;
    else IconComponent = FileText;
  }
  // ==========================================
  // DEVELOPER TOOLS
  // ==========================================
  else if (id.includes('json') || id.includes('yaml') || id.includes('xml') || id.includes('sql') || id.includes('encode') || id.includes('decode') || id.includes('hash') || id.includes('regex') || id.includes('jwt')) {
    if (id.includes('json')) IconComponent = Braces;
    else if (id.includes('xml')) IconComponent = CodeXml;
    else if (id.includes('yaml')) IconComponent = ListTree;
    else if (id.includes('sql')) IconComponent = Database;
    else if (id.includes('base64')) IconComponent = Binary;
    else if (id.includes('jwt')) IconComponent = KeyRound;
    else if (id.includes('url')) IconComponent = Link;
    else if (id.includes('regex')) IconComponent = Regex;
    else if (id.includes('hash') || id.includes('sha')) IconComponent = Hash;
    else if (id.includes('md5')) IconComponent = Fingerprint;
    else IconComponent = Code;
  }
  // ==========================================
  // CALCULATORS
  // ==========================================
  else if (id.includes('calculator') || id.includes('emi') || id.includes('sip') || id.includes('tax') || id.includes('margin') || id.includes('age') || id.includes('bmi')) {
    if (id.includes('age') || id.includes('time') || id.includes('date')) IconComponent = CalendarClock;
    else if (id.includes('bmi') || id.includes('health')) IconComponent = Activity;
    else if (id.includes('margin') || id.includes('discount')) IconComponent = Tag;
    else if (id.includes('sip') || id.includes('investment')) IconComponent = TrendingUp;
    else if (id.includes('emi') || id.includes('loan')) IconComponent = Landmark;
    else if (id.includes('salary') || id.includes('tax')) IconComponent = Banknote;
    else if (id.includes('electricity') || id.includes('power')) IconComponent = ZapIcon;
    else if (id.includes('fuel') || id.includes('mileage')) IconComponent = Fuel;
    else if (id.includes('percentage') || id.includes('gst')) IconComponent = Percent;
    else IconComponent = Calculator;
  }
  // ==========================================
  // SEO TOOLS (Updated)
  // ==========================================
  else if (id.includes('seo') || id.includes('meta') || id.includes('sitemap') || id.includes('robot') || id.includes('keyword')) {
    if (id.includes('meta')) IconComponent = Globe2;
    else if (id.includes('sitemap')) IconComponent = Waypoints;
    else if (id.includes('robot')) IconComponent = BotMessageSquare;
    else if (id.includes('keyword')) IconComponent = BarChart2;
    else IconComponent = Search;
  }
  // ==========================================
  // TEXT TOOLS (Updated)
  // ==========================================
  else if (id.includes('text') || id.includes('word') || id.includes('case') || id.includes('sort') || id.includes('lorem')) {
    if (id.includes('count')) IconComponent = BookType;
    else if (id.includes('case')) IconComponent = SpellCheck;
    else if (id.includes('sort')) IconComponent = ArrowDownAZ;
    else if (id.includes('reverse')) IconComponent = ArrowLeftRight;
    else if (id.includes('remove')) IconComponent = WrapText;
    else if (id.includes('email') || id.includes('extract')) IconComponent = MailSearch;
    else IconComponent = TypeIcon;
  }
  // ==========================================
  // UNIT CONVERTERS (Updated)
  // ==========================================
  else if (id.includes('convert') || id.includes('length') || id.includes('weight') || id.includes('temperature') || id.includes('area') || id.includes('volume')) {
    if (id.includes('length')) IconComponent = Ruler;
    else if (id.includes('weight') || id.includes('mass')) IconComponent = Weight;
    else if (id.includes('temperature')) IconComponent = Thermometer;
    else if (id.includes('area')) IconComponent = SquareDashed;
    else if (id.includes('volume')) IconComponent = Beaker;
    else if (id.includes('time')) IconComponent = Hourglass;
    else IconComponent = Scale;
  }
  // ==========================================
  // QR TOOLS (Updated)
  // ==========================================
  else if (id.includes('qr-code') || id.includes('qr')) {
    if (id.includes('scanner')) IconComponent = ScanLine;
    else if (id.includes('wifi')) IconComponent = Wifi;
    else if (id.includes('vcard')) IconComponent = Briefcase;
    else if (id.includes('phone') || id.includes('sms')) IconComponent = Smartphone;
    else if (id.includes('email')) IconComponent = Mail;
    else if (id.includes('text')) IconComponent = TypeIcon;
    else if (id.includes('url')) IconComponent = Globe2;
    else IconComponent = QrCode;

    // QR tools get a special treatment: a faded QrCode behind them
    if (IconComponent !== QrCode) {
      return (
        <PremiumIconContainer className="w-12 h-12">
          <div className="relative w-full h-full flex items-center justify-center">
            <QrCode className="w-8 h-8 opacity-15 absolute" strokeWidth={1.5} />
            <IconComponent className="w-5 h-5 relative z-10 drop-shadow-sm" strokeWidth={1.5} />
          </div>
        </PremiumIconContainer>
      );
    }
  }
  
  // Default fallback if no match
  if (!IconComponent && fallback) return <>{fallback}</>;

  return (
    <PremiumIconContainer className="w-12 h-12">
      <IconComponent className={className} />
    </PremiumIconContainer>
  );
}
