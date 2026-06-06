import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';

/**
 * Supported QR Types
 */
export type QRType =
  | 'text'
  | 'url'
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'wifi'
  | 'vcard'
  | 'sms'
  | 'upi'
  | 'location';

/**
 * WI-FI Settings
 */
export interface WiFiPayload {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

/**
 * vCard Settings
 */
export interface vCardPayload {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  phone?: string;
  email?: string;
  url?: string;
  address?: string;
}

/**
 * UPI Settings
 */
export interface UPIPayload {
  upiId: string;
  name: string;
  amount?: string;
  note?: string;
}

/**
 * Customization Options
 */
export interface QRSettings {
  size: number;
  margin: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoDataUrl?: string;
  logoSizePercent?: number; // e.g. 20 (meaning 20% of QR size)
  fileName?: string;
}

/**
 * Format string payload based on type
 */
export function formatQRPayload(type: QRType, data: any): string {
  switch (type) {
    case 'url':
      return data.url;
    case 'email':
      return `mailto:${data.email}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`;
    case 'phone':
      return `tel:${data.phone}`;
    case 'sms':
      return `SMSTO:${data.phone}:${data.message || ''}`;
    case 'whatsapp':
      return `https://wa.me/${data.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(data.message || '')}`;
    case 'wifi': {
      const wifi = data as WiFiPayload;
      return `WIFI:S:${wifi.ssid};T:${wifi.encryption};P:${wifi.password || ''};H:${wifi.hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const card = data as vCardPayload;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${card.lastName};${card.firstName};;;`,
        `FN:${card.firstName} ${card.lastName}`,
        card.organization ? `ORG:${card.organization}` : '',
        card.title ? `TITLE:${card.title}` : '',
        card.phone ? `TEL;TYPE=CELL:${card.phone}` : '',
        card.email ? `EMAIL;TYPE=PREF,INTERNET:${card.email}` : '',
        card.url ? `URL:${card.url}` : '',
        card.address ? `ADR:;;${card.address};;;;` : '',
        'END:VCARD'
      ].filter(Boolean).join('\n');
    }
    case 'upi': {
      const upi = data as UPIPayload;
      let url = `upi://pay?pa=${upi.upiId}&pn=${encodeURIComponent(upi.name)}&cu=INR`;
      if (upi.amount) url += `&am=${upi.amount}`;
      if (upi.note) url += `&tn=${encodeURIComponent(upi.note)}`;
      return url;
    }
    case 'location':
      return `https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`;
    case 'text':
    default:
      return data.text;
  }
}

/**
 * Generate QR code as Data URL (PNG) with logo overlay if needed
 */
export async function generateQRDataURL(
  payload: string,
  settings: QRSettings
): Promise<string> {
  const qrOptions = {
    errorCorrectionLevel: settings.errorCorrectionLevel,
    margin: settings.margin,
    width: settings.size,
    color: {
      dark: settings.foregroundColor,
      light: settings.backgroundColor
    }
  };

  const tempCanvas = document.createElement('canvas');
  await QRCode.toCanvas(tempCanvas, payload, qrOptions);

  if (settings.logoDataUrl) {
    const ctx = tempCanvas.getContext('2d');
    if (ctx) {
      const logoImg = new Image();
      logoImg.src = settings.logoDataUrl;
      await new Promise<void>((resolve) => {
        logoImg.onload = () => resolve();
        logoImg.onerror = () => resolve(); // continue if logo fails to load
      });

      const qrSize = tempCanvas.width;
      const logoPercent = (settings.logoSizePercent ?? 20) / 100;
      const logoSize = qrSize * logoPercent;
      const logoPos = (qrSize - logoSize) / 2;

      // Draw white background card for the logo (to make it pop)
      ctx.fillStyle = settings.backgroundColor;
      ctx.fillRect(logoPos - 2, logoPos - 2, logoSize + 4, logoSize + 4);
      
      // Draw the logo centered
      ctx.drawImage(logoImg, logoPos, logoPos, logoSize, logoSize);
    }
  }

  return tempCanvas.toDataURL('image/png');
}

/**
 * Generate QR code as SVG String
 */
export async function generateQRSVG(
  payload: string,
  settings: QRSettings
): Promise<string> {
  const qrOptions = {
    errorCorrectionLevel: settings.errorCorrectionLevel,
    margin: settings.margin,
    width: settings.size,
    color: {
      dark: settings.foregroundColor,
      light: settings.backgroundColor
    }
  };

  return QRCode.toString(payload, { ...qrOptions, type: 'svg' });
}

/**
 * PDF Export Settings
 */
export interface QRPDFExportSettings {
  pageSize: 'A4' | 'Letter';
  orientation: 'portrait' | 'landscape';
  position: 'center' | 'top' | 'bottom';
  titleText?: string;
  descriptionText?: string;
}

/**
 * Export QR to PDF using jsPDF
 */
export async function exportQRToPDF(
  qrDataUrl: string,
  pdfSettings: QRPDFExportSettings
): Promise<Blob> {
  const doc = new jsPDF({
    orientation: pdfSettings.orientation,
    unit: 'pt',
    format: pdfSettings.pageSize
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const qrWidth = 200;
  const qrHeight = 200;

  // Calculate layout coordinates
  const qrX = (pageWidth - qrWidth) / 2;
  let qrY = (pageHeight - qrHeight) / 2; // default: center

  if (pdfSettings.position === 'top') {
    qrY = 120;
  } else if (pdfSettings.position === 'bottom') {
    qrY = pageHeight - qrHeight - 120;
  }

  // Draw Title Text above QR
  if (pdfSettings.titleText) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(15, 15, 24); // #0F0F18 (Singularity Ink Color)
    const textWidth = doc.getTextWidth(pdfSettings.titleText);
    doc.text(pdfSettings.titleText, (pageWidth - textWidth) / 2, qrY - 30);
  }

  // Add QR Code Image
  doc.addImage(qrDataUrl, 'PNG', qrX, qrY, qrWidth, qrHeight);

  // Draw Description Text below QR
  if (pdfSettings.descriptionText) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(107, 107, 128); // #6B6B80 (Singularity Slate Color)
    const textWidth = doc.getTextWidth(pdfSettings.descriptionText);
    doc.text(pdfSettings.descriptionText, (pageWidth - textWidth) / 2, qrY + qrHeight + 30);
  }

  return doc.output('blob');
}

/**
 * Scan Results Structure
 */
export interface QRScanResult {
  rawText: string;
  type: QRType | 'unknown';
  formattedOutput: string;
}

/**
 * Detect QR result details from raw scanned string
 */
export function detectQRResultType(rawText: string): QRScanResult {
  const trimmed = rawText.trim();
  
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return {
      rawText,
      type: 'url',
      formattedOutput: trimmed
    };
  }

  if (trimmed.toLowerCase().startsWith('mailto:')) {
    const parts = trimmed.substring(7).split('?');
    const email = parts[0];
    return {
      rawText,
      type: 'email',
      formattedOutput: `Email To: ${email}`
    };
  }

  if (trimmed.toLowerCase().startsWith('tel:')) {
    const phone = trimmed.substring(4);
    return {
      rawText,
      type: 'phone',
      formattedOutput: `Phone Number: ${phone}`
    };
  }

  if (trimmed.toLowerCase().startsWith('smsto:')) {
    const parts = trimmed.substring(6).split(':');
    const phone = parts[0];
    const message = parts[1] || '';
    return {
      rawText,
      type: 'sms',
      formattedOutput: `SMS to ${phone}${message ? `: "${message}"` : ''}`
    };
  }

  if (trimmed.toLowerCase().startsWith('https://wa.me/')) {
    return {
      rawText,
      type: 'whatsapp',
      formattedOutput: `WhatsApp Link: ${trimmed}`
    };
  }

  if (trimmed.toUpperCase().startsWith('WIFI:')) {
    // Format: WIFI:S:SSID;T:WPA;P:PASSWORD;;
    const ssidMatch = trimmed.match(/S:([^;]+)/i);
    const encryptionMatch = trimmed.match(/T:([^;]+)/i);
    const ssid = ssidMatch ? ssidMatch[1] : 'Unknown';
    const enc = encryptionMatch ? encryptionMatch[1] : 'Open';
    return {
      rawText,
      type: 'wifi',
      formattedOutput: `Wi-Fi Network: "${ssid}" (Security: ${enc})`
    };
  }

  if (trimmed.startsWith('BEGIN:VCARD')) {
    const fnMatch = trimmed.match(/FN:([^\n\r]+)/i);
    const telMatch = trimmed.match(/TEL;[^:]*:([^\n\r]+)/i);
    const fn = fnMatch ? fnMatch[1] : 'Contact';
    const tel = telMatch ? telMatch[1] : '';
    return {
      rawText,
      type: 'vcard',
      formattedOutput: `Contact Card (vCard): ${fn}${tel ? ` (${tel})` : ''}`
    };
  }

  if (trimmed.toLowerCase().startsWith('upi://')) {
    // upi://pay?pa=address&pn=name
    const url = new URL(trimmed);
    const address = url.searchParams.get('pa') || '';
    const name = url.searchParams.get('pn') || '';
    const amount = url.searchParams.get('am') || '';
    return {
      rawText,
      type: 'upi',
      formattedOutput: `UPI Payment: pay to ${name} (${address}) ${amount ? `Amount: INR ${amount}` : ''}`
    };
  }

  // Location checks (maps URL or geo:)
  if (trimmed.toLowerCase().startsWith('geo:') || trimmed.toLowerCase().includes('maps.google.com') || trimmed.toLowerCase().includes('google.com/maps')) {
    return {
      rawText,
      type: 'location',
      formattedOutput: `Location Coordinates: ${trimmed}`
    };
  }

  return {
    rawText,
    type: 'text',
    formattedOutput: rawText
  };
}
