export type WhiteboardTool =
  | 'select'
  | 'pen'
  | 'pencil'
  | 'eraser'
  | 'text'
  | 'rect'
  | 'circle'
  | 'line'
  | 'arrow'
  | 'sticky'
  | 'image'
  | 'pan';

export interface BrushOptions {
  color: string;
  width: number;
  opacity: number;
}

export interface ShapeOptions {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  opacity: number;
}

export interface TextOptions {
  fontFamily: string;
  fontSize: number;
  color: string;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  backgroundColor: string;
}

export interface StickyNoteOptions {
  color: string;
  text: string;
}

export interface WhiteboardState {
  activeTool: WhiteboardTool;
  brush: BrushOptions;
  shape: ShapeOptions;
  text: TextOptions;
  sticky: StickyNoteOptions;
  zoom: number;
  panX: number;
  panY: number;
  canUndo: boolean;
  canRedo: boolean;
}

export const FONT_FAMILIES = [
  'Outfit',
  'Syne',
  'Inter',
  'Roboto',
  'Georgia',
  'Courier New'
];

export const STICKY_COLORS = [
  { name: 'Yellow', bg: '#FEF08A', text: '#854D0E' },
  { name: 'Blue', bg: '#BFDBFE', text: '#1E40AF' },
  { name: 'Green', bg: '#BBF7D0', text: '#166534' },
  { name: 'Pink', bg: '#FBCFE8', text: '#9D174D' },
  { name: 'Orange', bg: '#FED7AA', text: '#9A3412' },
  { name: 'Purple', bg: '#E9D5FF', text: '#6B21A8' }
];

export const PRESET_COLORS = [
  '#000000', // Black
  '#6B7280', // Gray
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Yellow
  '#10B981', // Green
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#FFFFFF', // White
  'transparent' // Transparent
];
