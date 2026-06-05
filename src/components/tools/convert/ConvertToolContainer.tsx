"use client";

import React, { useState, useEffect } from 'react';
import { ToolLayout } from '../shared/ToolLayout';
import { Button } from '@/components/ui/Button';

interface ConvertToolContainerProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
}

interface UnitOption {
  value: string;
  label: string;
  factor: number; // Multiplier to convert to base unit
}

export function ConvertToolContainer({ toolId, toolName, toolDescription }: ConvertToolContainerProps) {
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Define base units and ratios for each converter type
  const getUnitConfig = (): { category: string; units: UnitOption[] } => {
    switch (toolId) {
      case 'length-converter':
        return {
          category: 'Length',
          units: [
            { value: 'm', label: 'Meters (m)', factor: 1 },
            { value: 'km', label: 'Kilometers (km)', factor: 1000 },
            { value: 'cm', label: 'Centimeters (cm)', factor: 0.01 },
            { value: 'mm', label: 'Millimeters (mm)', factor: 0.001 },
            { value: 'mi', label: 'Miles (mi)', factor: 1609.344 },
            { value: 'yd', label: 'Yards (yd)', factor: 0.9144 },
            { value: 'ft', label: 'Feet (ft)', factor: 0.3048 },
            { value: 'in', label: 'Inches (in)', factor: 0.0254 }
          ]
        };
      case 'weight-converter':
        return {
          category: 'Weight',
          units: [
            { value: 'kg', label: 'Kilograms (kg)', factor: 1 },
            { value: 'g', label: 'Grams (g)', factor: 0.001 },
            { value: 'mg', label: 'Milligrams (mg)', factor: 0.000001 },
            { value: 'lb', label: 'Pounds (lb)', factor: 0.45359237 },
            { value: 'oz', label: 'Ounces (oz)', factor: 0.028349523 },
            { value: 'ton', label: 'Tons (t)', factor: 1000 }
          ]
        };
      case 'area-converter':
        return {
          category: 'Area',
          units: [
            { value: 'm2', label: 'Square Meters (m²)', factor: 1 },
            { value: 'km2', label: 'Square Kilometers (km²)', factor: 1000000 },
            { value: 'ft2', label: 'Square Feet (ft²)', factor: 0.092903 },
            { value: 'ac', label: 'Acres (ac)', factor: 4046.856 },
            { value: 'ha', label: 'Hectares (ha)', factor: 10000 }
          ]
        };
      case 'volume-converter':
        return {
          category: 'Volume',
          units: [
            { value: 'l', label: 'Liters (L)', factor: 1 },
            { value: 'ml', label: 'Milliliters (mL)', factor: 0.001 },
            { value: 'm3', label: 'Cubic Meters (m³)', factor: 1000 },
            { value: 'gal', label: 'Gallons (US)', factor: 3.78541 },
            { value: 'qt', label: 'Quarts', factor: 0.946353 },
            { value: 'cup', label: 'Cups', factor: 0.24 }
          ]
        };
      case 'speed-converter':
        return {
          category: 'Speed',
          units: [
            { value: 'mps', label: 'Meters per second (m/s)', factor: 1 },
            { value: 'kmh', label: 'Kilometers per hour (km/h)', factor: 0.277778 },
            { value: 'mph', label: 'Miles per hour (mph)', factor: 0.44704 },
            { value: 'knot', label: 'Knots', factor: 0.514444 }
          ]
        };
      case 'time-converter':
        return {
          category: 'Time',
          units: [
            { value: 's', label: 'Seconds (s)', factor: 1 },
            { value: 'min', label: 'Minutes (min)', factor: 60 },
            { value: 'hr', label: 'Hours (hr)', factor: 3600 },
            { value: 'day', label: 'Days', factor: 86400 },
            { value: 'week', label: 'Weeks', factor: 604800 },
            { value: 'yr', label: 'Years', factor: 31536000 }
          ]
        };
      case 'data-storage-converter':
        return {
          category: 'Data Storage',
          units: [
            { value: 'b', label: 'Bits (b)', factor: 0.125 },
            { value: 'B', label: 'Bytes (B)', factor: 1 },
            { value: 'KB', label: 'Kilobytes (KB)', factor: 1024 },
            { value: 'MB', label: 'Megabytes (MB)', factor: 1048576 },
            { value: 'GB', label: 'Gigabytes (GB)', factor: 1073741824 },
            { value: 'TB', label: 'Terabytes (TB)', factor: 1099511627776 }
          ]
        };
      case 'angle-converter':
        return {
          category: 'Angle',
          units: [
            { value: 'deg', label: 'Degrees (°)', factor: 1 },
            { value: 'rad', label: 'Radians (rad)', factor: 57.2958 },
            { value: 'grad', label: 'Gradians (grad)', factor: 0.9 }
          ]
        };
      case 'pressure-converter':
        return {
          category: 'Pressure',
          units: [
            { value: 'pa', label: 'Pascal (Pa)', factor: 1 },
            { value: 'bar', label: 'Bar', factor: 100000 },
            { value: 'psi', label: 'PSI (pound/sq in)', factor: 6894.76 },
            { value: 'atm', label: 'Atmosphere (atm)', factor: 101325 }
          ]
        };
      case 'energy-converter':
        return {
          category: 'Energy',
          units: [
            { value: 'j', label: 'Joules (J)', factor: 1 },
            { value: 'cal', label: 'Calories (cal)', factor: 4.184 },
            { value: 'kcal', label: 'Kilocalories (kcal)', factor: 4184 },
            { value: 'wh', label: 'Watt-hours (Wh)', factor: 3600 },
            { value: 'kwh', label: 'Kilowatt-hours (kWh)', factor: 3600000 },
            { value: 'btu', label: 'BTUs', factor: 1055.06 }
          ]
        };
      case 'power-converter':
        return {
          category: 'Power',
          units: [
            { value: 'w', label: 'Watts (W)', factor: 1 },
            { value: 'kw', label: 'Kilowatts (kW)', factor: 1000 },
            { value: 'hp', label: 'Horsepower (hp)', factor: 745.7 }
          ]
        };
      case 'frequency-converter':
        return {
          category: 'Frequency',
          units: [
            { value: 'hz', label: 'Hertz (Hz)', factor: 1 },
            { value: 'khz', label: 'Kilohertz (kHz)', factor: 1000 },
            { value: 'mhz', label: 'Megahertz (MHz)', factor: 1000000 },
            { value: 'ghz', label: 'Gigahertz (GHz)', factor: 1000000000 }
          ]
        };
      case 'number-base-converter':
        return {
          category: 'Number Base',
          units: [
            { value: '10', label: 'Decimal (Base 10)', factor: 10 },
            { value: '2', label: 'Binary (Base 2)', factor: 2 },
            { value: '8', label: 'Octal (Base 8)', factor: 8 },
            { value: '16', label: 'Hexadecimal (Base 16)', factor: 16 }
          ]
        };
      case 'fuel-efficiency-converter':
        return {
          category: 'Fuel Efficiency',
          units: [
            { value: 'mpg', label: 'Miles per Gallon (mpg)', factor: 1 },
            { value: 'kml', label: 'Kilometers per Liter (km/L)', factor: 0.42514 },
            { value: 'l100', label: 'Liters per 100km (L/100km)', factor: 0 } // handled custom
          ]
        };
      default:
        return { category: 'Units', units: [] };
    }
  };

  const { units } = getUnitConfig();

  // Initialize from/to units when config loads
  useEffect(() => {
    if (units.length > 1) {
      setFromUnit(units[0].value);
      setToUnit(units[1].value);
    }
  }, [toolId]);

  // Conversion calculations
  useEffect(() => {
    setError('');
    if (!inputValue || !fromUnit || !toUnit) {
      setResult('');
      return;
    }

    try {
      if (toolId === 'temperature-converter') {
        const temp = parseFloat(inputValue);
        if (isNaN(temp)) throw new Error('Invalid input number.');
        
        let celsius = temp;
        // Convert from input to Celsius
        if (fromUnit === 'f') celsius = (temp - 32) * 5 / 9;
        if (fromUnit === 'k') celsius = temp - 273.15;
        
        // Convert Celsius to target
        let converted = celsius;
        if (toUnit === 'f') converted = celsius * 9 / 5 + 32;
        if (toUnit === 'k') converted = celsius + 273.15;
        
        setResult(converted.toFixed(4).replace(/\.?0+$/, ''));
      } else if (toolId === 'number-base-converter') {
        const baseFrom = parseInt(fromUnit);
        const baseTo = parseInt(toUnit);
        // Parse input value according to from base
        const parsed = parseInt(inputValue.trim(), baseFrom);
        if (isNaN(parsed)) throw new Error(`Invalid base-${baseFrom} value.`);
        setResult(parsed.toString(baseTo).toUpperCase());
      } else if (toolId === 'fuel-efficiency-converter') {
        const val = parseFloat(inputValue);
        if (isNaN(val) || val <= 0) throw new Error('Value must be a positive number.');
        
        if (fromUnit === toUnit) {
          setResult(val.toString());
          return;
        }

        let mpgVal = val;
        // Convert to mpg base
        if (fromUnit === 'kml') mpgVal = val * 2.352146;
        if (fromUnit === 'l100') mpgVal = 235.2146 / val;

        let finalVal = mpgVal;
        // Convert from mpg to target
        if (toUnit === 'kml') finalVal = mpgVal * 0.4251437;
        if (toUnit === 'l100') finalVal = 235.2146 / mpgVal;

        setResult(finalVal.toFixed(4).replace(/\.?0+$/, ''));
      } else {
        // Standard conversions using factors
        const val = parseFloat(inputValue);
        if (isNaN(val)) throw new Error('Value must be a valid number.');
        
        const fromFactor = units.find(u => u.value === fromUnit)?.factor || 1;
        const toFactor = units.find(u => u.value === toUnit)?.factor || 1;
        
        const baseValue = val * fromFactor;
        const converted = baseValue / toFactor;
        setResult(converted.toFixed(6).replace(/\.?0+$/, ''));
      }
    } catch (err: any) {
      setError(err.message || 'Error occurred.');
      setResult('');
    }
  }, [inputValue, fromUnit, toUnit, toolId]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    if (!result) return;
    navigator.clipboard.writeText(result);
  };

  // Custom temperature options
  const tempUnits = [
    { value: 'c', label: 'Celsius (°C)', factor: 1 },
    { value: 'f', label: 'Fahrenheit (°F)', factor: 1 },
    { value: 'k', label: 'Kelvin (K)', factor: 1 }
  ];

  const activeUnits = toolId === 'temperature-converter' ? tempUnits : units;

  return (
    <ToolLayout
      utilityId={toolId}
      title={toolName}
      description={toolDescription}
      categoryName="Unit Conversion Tools"
      categoryPath="/tools/convert"
      howToUse={["Enter the value to convert.", "Select the input unit (From) and target unit (To).", "View the converted result instantly.", "Use the Swap button to reverse the units."]}
      faqs={[
        { question: "Is this calculation accurate?", answer: "Yes, all conversion scales use the standard international SI constants." }
      ]}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          {/* Input Value */}
          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">Input Value</label>
            <input 
              type="text" 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              placeholder="e.g. 1" 
              className="p-3.5 border border-border rounded-xl bg-background text-ink font-mono text-lg outline-none focus:border-primary/80" 
            />
          </div>

          {/* From Unit */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">From</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="p-3 border border-border rounded-xl bg-background text-ink text-[15px] font-sans outline-none focus:border-primary/80"
            >
              {activeUnits.map((u) => (
                <option key={u.value} value={u.value}>{u.label}</option>
              ))}
            </select>
          </div>

          {/* Swap & To Unit */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg" className="px-4 py-3 shrink-0" onClick={handleSwap}>Swap</Button>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-[13px] font-sans font-bold text-ink uppercase tracking-wider">To</label>
              <select
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
                className="p-3 border border-border rounded-xl bg-background text-ink text-[15px] font-sans outline-none focus:border-primary/80 w-full"
              >
                {activeUnits.map((u) => (
                  <option key={u.value} value={u.value}>{u.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Errors & Result */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 font-sans text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="p-6 bg-background rounded-xl border border-border mt-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
          <p className="text-[12px] uppercase font-sans font-semibold text-slate tracking-wider mb-2">Converted Value</p>
          {result ? (
            <h2 className="text-3xl md:text-4xl font-mono font-bold text-primary truncate max-w-full px-4">{result}</h2>
          ) : (
            <span className="text-slate font-mono">...</span>
          )}
          {result && (
            <Button size="sm" variant="outline" className="mt-4" onClick={handleCopy}>Copy Result</Button>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
