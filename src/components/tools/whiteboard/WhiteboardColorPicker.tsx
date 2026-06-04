import React from 'react';
import { PRESET_COLORS } from '@/lib/whiteboard/whiteboardTypes';

interface WhiteboardColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  allowTransparent?: boolean;
}

export function WhiteboardColorPicker({
  label,
  value,
  onChange,
  allowTransparent = false
}: WhiteboardColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-sans font-medium text-slate">{label}</span>
        <div className="flex items-center gap-1.5">
          {/* Custom Color Input */}
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-border cursor-pointer hover:scale-105 transition-transform">
            <input
              type="color"
              value={value === 'transparent' ? '#ffffff' : value}
              onChange={(e) => onChange(e.target.value)}
              className="absolute inset-0 w-full h-full p-0 border-0 cursor-pointer scale-150"
            />
          </div>
          <span className="text-[11px] font-mono text-slate uppercase">
            {value === 'transparent' ? 'none' : value}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {PRESET_COLORS.map((color) => {
          if (color === 'transparent' && !allowTransparent) return null;
          
          const isSelected = value === color;
          
          return (
            <button
              key={color}
              onClick={() => onChange(color)}
              className={`
                w-7 h-7 rounded-md border transition-all duration-150 cursor-pointer relative hover:scale-105
                ${isSelected ? 'border-primary ring-2 ring-primary/20 scale-105' : 'border-border'}
              `}
              style={{
                backgroundColor: color === 'transparent' ? 'transparent' : color
              }}
              title={color === 'transparent' ? 'No color (transparent)' : color}
            >
              {color === 'transparent' && (
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <div className="w-[120%] h-0.5 bg-red-500 rotate-45"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
