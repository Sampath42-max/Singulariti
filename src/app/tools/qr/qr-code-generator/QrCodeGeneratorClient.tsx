"use client";

import React, { useState } from 'react';
import { ToolLayout } from '@/components/tools/ToolLayout';
import { QRPreview } from '@/components/tools/QRPreview';
import { Button } from '@/components/ui/Button';
import { generateQRSVG, exportQRToPDF, QRType, QRSettings, QRPDFExportSettings, formatQRPayload } from '@/lib/qr/qrHelpers';
import { downloadBlob, downloadURL } from '@/lib/downloadHelpers';
import { validateURL, validateEmail, validatePhone, validateUPI } from '@/lib/qr/qrValidation';
import { Settings, QrCode, FileText, Download, Trash, Sparkles } from 'lucide-react';

export interface QrCodeGeneratorClientProps {
  initialType?: QRType;
  isStandalone?: boolean;
  toolName?: string;
  toolDescription?: string;
  toolSeoTitle?: string;
  toolSeoDescription?: string;
  article?: string;
}

export function QrCodeGeneratorClient({
  initialType = 'url',
  isStandalone = false,
  toolName = "QR Code Generator",
  toolDescription = "Create highly customized QR codes for URLs, Wi-Fi networks, UPI payments, phone numbers, and contacts. Customize designs, add logos, and export to PNG, SVG, or PDF.",
  article
}: QrCodeGeneratorClientProps = {}) {
  const [qrType, setQrType] = useState<QRType>(initialType);
  
  // Customization Settings
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H'); // H is default to support logo overlay safely
  const [logoDataUrl, setLogoDataUrl] = useState<string | undefined>(undefined);
  const [logoSizePercent, setLogoSizePercent] = useState(20);
  const [fileName, setFileName] = useState('qr_code');

  // PDF Export Settings
  const [pdfPageSize, setPdfPageSize] = useState<'A4' | 'Letter'>('A4');
  const [pdfOrientation, setPdfOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [pdfPosition, setPdfPosition] = useState<'center' | 'top' | 'bottom'>('center');
  const [pdfTitle, setPdfTitle] = useState('Scan Me');
  const [pdfDescription, setPdfDescription] = useState('Point your device camera at this QR code.');

  // Form Field States
  const [text, setText] = useState('');
  const [url, setUrl] = useState('https://');
  
  // Email states
  const [email, setEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Phone states
  const [phone, setPhone] = useState('');

  // WhatsApp states
  const [waPhone, setWaPhone] = useState('');
  const [waMessage, setWaMessage] = useState('');

  // Wi-Fi states
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // vCard states
  const [vFirstName, setVFirstName] = useState('');
  const [vLastName, setVLastName] = useState('');
  const [vOrg, setVOrg] = useState('');
  const [vTitle, setVTitle] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vEmail, setVEmail] = useState('');
  const [vUrl, setVUrl] = useState('');
  const [vAddress, setVAddress] = useState('');

  // SMS states
  const [smsPhone, setSmsPhone] = useState('');
  const [smsMessage, setSmsMessage] = useState('');

  // UPI states
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [upiAmount, setUpiAmount] = useState('');
  const [upiNote, setUpiNote] = useState('');

  // Location states
  const [locLat, setLocLat] = useState('12.9716');
  const [locLng, setLocLng] = useState('77.5946');

  // UI state variables
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedPngUrl, setGeneratedPngUrl] = useState<string | null>(null);

  // Get formatted payload based on active form fields
  const getPayload = () => {
    switch (qrType) {
      case 'url':
        return formatQRPayload('url', { url });
      case 'email':
        return formatQRPayload('email', { email, subject: emailSubject, body: emailBody });
      case 'phone':
        return formatQRPayload('phone', { phone });
      case 'sms':
        return formatQRPayload('sms', { phone: smsPhone, message: smsMessage });
      case 'whatsapp':
        return formatQRPayload('whatsapp', { phone: waPhone, message: waMessage });
      case 'wifi':
        return formatQRPayload('wifi', { ssid: wifiSsid, password: wifiPassword, encryption: wifiEncryption, hidden: wifiHidden });
      case 'vcard':
        return formatQRPayload('vcard', { firstName: vFirstName, lastName: vLastName, organization: vOrg, title: vTitle, phone: vPhone, email: vEmail, url: vUrl, address: vAddress });
      case 'upi':
        return formatQRPayload('upi', { upiId, name: upiName, amount: upiAmount, note: upiNote });
      case 'location':
        return formatQRPayload('location', { lat: locLat, lng: locLng });
      case 'text':
      default:
        return formatQRPayload('text', { text });
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file for the logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleValidation = (): boolean => {
    setError(null);
    const payload = getPayload().trim();
    if (!payload) {
      setError('QR Code payload cannot be empty.');
      return false;
    }

    if (qrType === 'url' && !validateURL(url)) {
      setError('Please enter a valid website URL (starting with http:// or https://).');
      return false;
    }
    if (qrType === 'email' && !validateEmail(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (qrType === 'phone' && !validatePhone(phone)) {
      setError('Please enter a valid phone number.');
      return false;
    }
    if (qrType === 'sms' && !validatePhone(smsPhone)) {
      setError('Please enter a valid phone number for SMS.');
      return false;
    }
    if (qrType === 'whatsapp' && !validatePhone(waPhone)) {
      setError('Please enter a valid phone number for WhatsApp.');
      return false;
    }
    if (qrType === 'upi' && !validateUPI(upiId)) {
      setError('Please enter a valid UPI ID (e.g. someone@upi).');
      return false;
    }

    return true;
  };

  const handleDownloadPNG = () => {
    if (!handleValidation() || !generatedPngUrl) return;
    downloadURL(generatedPngUrl, `${fileName}.png`);
  };

  const handleDownloadSVG = async () => {
    if (!handleValidation()) return;
    setIsProcessing(true);
    try {
      const settings: QRSettings = { size, margin, foregroundColor, backgroundColor, errorCorrectionLevel, logoDataUrl, logoSizePercent };
      const svgText = await generateQRSVG(getPayload(), settings);
      const blob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      downloadBlob(blob, `${fileName}.svg`);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError('Failed to generate SVG download.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!handleValidation() || !generatedPngUrl) return;
    setIsProcessing(true);
    try {
      const pdfExportSettings: QRPDFExportSettings = {
        pageSize: pdfPageSize,
        orientation: pdfOrientation,
        position: pdfPosition,
        titleText: pdfTitle || undefined,
        descriptionText: pdfDescription || undefined
      };
      
      const pdfBlob = await exportQRToPDF(generatedPngUrl, pdfExportSettings);
      downloadBlob(pdfBlob, `${fileName}.pdf`);
    } catch (e) { const err = e as Error;
      console.error(err);
      setError('Failed to export QR code to PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setText('');
    setUrl('https://');
    setEmail('');
    setEmailSubject('');
    setEmailBody('');
    setPhone('');
    setSmsPhone('');
    setSmsMessage('');
    setWaPhone('');
    setWaMessage('');
    setWifiSsid('');
    setWifiPassword('');
    setWifiEncryption('WPA');
    setWifiHidden(false);
    setVFirstName('');
    setVLastName('');
    setVOrg('');
    setVTitle('');
    setVPhone('');
    setVEmail('');
    setVUrl('');
    setVAddress('');
    setUpiId('');
    setUpiName('');
    setUpiAmount('');
    setUpiNote('');
    setLogoDataUrl(undefined);
    setError(null);
    setFileName('qr_code');
  };

  const settings: QRSettings = {
    size,
    margin,
    foregroundColor,
    backgroundColor,
    errorCorrectionLevel,
    logoDataUrl,
    logoSizePercent
  };

  return (
    <ToolLayout
      howToUse={[
        "Enter the text, URL, or data you want to encode.",
        "Customize the colors, size, and error correction level if desired.",
        "The QR code will generate instantly in real-time.",
        "Click 'Download' to save the QR code as an image file."
]}
      faqs={[
        {
                "question": "Do these QR codes expire?",
                "answer": "No, they are static QR codes. As long as the destination URL or text remains valid, the QR code will work forever."
        },
        {
                "question": "Is my data sent to a server to generate the code?",
                "answer": "No, the QR code generation algorithm runs entirely locally in your web browser."
        }
]}
      
      title={toolName}
      description={toolDescription}
      categoryName="QR Tools"
      categoryHref="/tools/qr"
      error={error}
      onClearError={() => setError(null)}
      article={article}
    >
      <div className="bg-surface border border-border rounded-xl p-6 md:p-8 shadow-sm">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form and Settings panel (Left 7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input Type Selector and form fields */}
            <div className="p-5 bg-background border border-border rounded-xl space-y-4">
              {!isStandalone && (
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">
                    Select QR Type
                  </label>
                  <select
                    value={qrType}
                    onChange={(e) => { setQrType(e.target.value as QRType); setError(null); }}
                    className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary transition-colors"
                  >
                    <option value="url">Website URL</option>
                    <option value="text">Plain Text</option>
                    <option value="wifi">Wi-Fi Credentials</option>
                    <option value="upi">UPI Payment</option>
                    <option value="email">Email Message</option>
                    <option value="whatsapp">WhatsApp Link</option>
                    <option value="vcard">Contact Card (vCard)</option>
                    <option value="phone">Phone Number</option>
                    <option value="sms">SMS Message</option>
                    <option value="location">Google Maps Location</option>
                  </select>
                </div>
              )}

              {/* Dynamic form inputs based on QR type */}
              <div className="pt-2 border-t border-border/40">
                {qrType === 'url' && (
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">Website URL</label>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary font-sans"
                      placeholder="https://example.com"
                    />
                  </div>
                )}

                {qrType === 'text' && (
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">Plain Text</label>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="w-full h-24 p-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary resize-none font-sans"
                      placeholder="Type your text content here..."
                    />
                  </div>
                )}

                {qrType === 'wifi' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Network SSID (Name)</label>
                        <input
                          type="text"
                          value={wifiSsid}
                          onChange={(e) => setWifiSsid(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="My Wi-Fi SSID"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Password</label>
                        <input
                          type="password"
                          value={wifiPassword}
                          onChange={(e) => setWifiPassword(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="Password"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Security Encryption</label>
                        <select
                          value={wifiEncryption}
                          onChange={(e: any) => setWifiEncryption(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                        >
                          <option value="WPA">WPA / WPA2</option>
                          <option value="WEP">WEP</option>
                          <option value="nopass">Unsecured (Open)</option>
                        </select>
                      </div>
                      
                      <div className="flex items-center pt-6">
                        <label className="flex items-center text-sm text-slate select-none cursor-pointer">
                          <input
                            type="checkbox"
                            checked={wifiHidden}
                            onChange={(e) => setWifiHidden(e.target.checked)}
                            className="mr-2 accent-primary"
                          />
                          Network is Hidden
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {qrType === 'upi' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">UPI ID / VPA</label>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="merchant@upi"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Payee Name</label>
                        <input
                          type="text"
                          value={upiName}
                          onChange={(e) => setUpiName(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="John Doe Store"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Amount (INR) (Optional)</label>
                        <input
                          type="number"
                          value={upiAmount}
                          onChange={(e) => setUpiAmount(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="100.00"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Payment Note (Optional)</label>
                        <input
                          type="text"
                          value={upiNote}
                          onChange={(e) => setUpiNote(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                          placeholder="Dinner, Coffee etc."
                        />
                      </div>
                    </div>
                  </div>
                )}

                {qrType === 'email' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Recipient Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="recipient@example.com"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Subject (Optional)</label>
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="Inquiry"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Body Message (Optional)</label>
                      <textarea
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        className="w-full h-20 p-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none resize-none"
                        placeholder="Type message here..."
                      />
                    </div>
                  </div>
                )}

                {qrType === 'whatsapp' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Phone Number (with country code)</label>
                      <input
                        type="tel"
                        value={waPhone}
                        onChange={(e) => setWaPhone(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="919876543210"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Prefilled Message (Optional)</label>
                      <textarea
                        value={waMessage}
                        onChange={(e) => setWaMessage(e.target.value)}
                        className="w-full h-20 p-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none resize-none"
                        placeholder="Hello, I have an inquiry..."
                      />
                    </div>
                  </div>
                )}

                {qrType === 'vcard' && (
                  <div className="space-y-4 animate-in fade-in duration-200 max-h-[300px] overflow-y-auto pr-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">First Name</label>
                        <input
                          type="text"
                          value={vFirstName}
                          onChange={(e) => setVFirstName(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Last Name</label>
                        <input
                          type="text"
                          value={vLastName}
                          onChange={(e) => setVLastName(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Organization</label>
                        <input
                          type="text"
                          value={vOrg}
                          onChange={(e) => setVOrg(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="Company Inc."
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Job Title</label>
                        <input
                          type="text"
                          value={vTitle}
                          onChange={(e) => setVTitle(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="Director"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Mobile Number</label>
                        <input
                          type="tel"
                          value={vPhone}
                          onChange={(e) => setVPhone(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="+1234567890"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Email Address</label>
                        <input
                          type="email"
                          value={vEmail}
                          onChange={(e) => setVEmail(e.target.value)}
                          className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Website URL</label>
                      <input
                        type="text"
                        value={vUrl}
                        onChange={(e) => setVUrl(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Full Address</label>
                      <input
                        type="text"
                        value={vAddress}
                        onChange={(e) => setVAddress(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="123 Street, City, Country"
                      />
                    </div>
                  </div>
                )}

                {qrType === 'phone' && (
                  <div className="space-y-1.5 animate-in fade-in duration-200">
                    <label className="block text-[11px] font-sans text-slate font-bold uppercase tracking-wider">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                      placeholder="+1234567890"
                    />
                  </div>
                )}

                {qrType === 'sms' && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Recipient Number</label>
                      <input
                        type="tel"
                        value={smsPhone}
                        onChange={(e) => setSmsPhone(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none"
                        placeholder="+1234567890"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">SMS Message Body (Optional)</label>
                      <textarea
                        value={smsMessage}
                        onChange={(e) => setSmsMessage(e.target.value)}
                        className="w-full h-20 p-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none resize-none"
                        placeholder="Message content..."
                      />
                    </div>
                  </div>
                )}

                {qrType === 'location' && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Latitude</label>
                      <input
                        type="text"
                        value={locLat}
                        onChange={(e) => setLocLat(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary font-mono"
                        placeholder="e.g. 12.9716"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Longitude</label>
                      <input
                        type="text"
                        value={locLng}
                        onChange={(e) => setLocLng(e.target.value)}
                        className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary font-mono"
                        placeholder="e.g. 77.5946"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Customization Options box */}
            <div className="p-5 bg-background border border-border rounded-xl space-y-6">
              <h3 className="font-display font-bold text-[14px] text-ink flex items-center mb-1">
                <Settings className="w-4 h-4 mr-2 text-primary" /> QR Customization
              </h3>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Colors */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">QR Foreground Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-8 h-8 rounded border border-border p-1 bg-surface cursor-pointer"
                      />
                      <input
                        type="text"
                        value={foregroundColor}
                        onChange={(e) => setForegroundColor(e.target.value)}
                        className="w-full h-9 px-2.5 bg-surface border border-border rounded-lg text-xs text-ink outline-none"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">QR Background Color</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-8 h-8 rounded border border-border p-1 bg-surface cursor-pointer"
                      />
                      <input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-full h-9 px-2.5 bg-surface border border-border rounded-lg text-xs text-ink outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Size and margin */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">QR Resolution Size (px)</label>
                    <input
                      type="number"
                      min="120"
                      max="1024"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">QR Quiet Zone (Margin)</label>
                    <select
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                    >
                      <option value="0">0 (No Margin)</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="4">4 (Recommended)</option>
                      <option value="6">6</option>
                    </select>
                  </div>
                </div>

                {/* Error correction level */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Error Correction Level</label>
                    <select
                      value={errorCorrectionLevel}
                      onChange={(e: any) => setErrorCorrectionLevel(e.target.value)}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                    >
                      <option value="L">Level L (Low - 7%)</option>
                      <option value="M">Level M (Medium - 15%)</option>
                      <option value="Q">Level Q (Quartile - 25%)</option>
                      <option value="H">Level H (High - 30%)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Filename Output</label>
                    <input
                      type="text"
                      value={fileName}
                      onChange={(e) => setFileName(e.target.value)}
                      className="w-full h-10 px-3 bg-surface border border-border rounded-lg text-sm text-ink outline-none focus:border-primary"
                      placeholder="qr_code"
                    />
                  </div>
                </div>

                {/* Logo overlay box */}
                <div className="p-4 bg-background border border-border rounded-lg space-y-4">
                  <span className="block text-[11px] text-slate font-bold uppercase tracking-wider">Center Logo Overlay</span>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-center border border-dashed border-border hover:border-slate bg-surface p-4 rounded-lg text-center cursor-pointer transition-colors relative h-16">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-[12px] font-sans text-slate">
                        Upload Center Logo Image
                      </span>
                    </div>

                    {logoDataUrl && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] text-slate">
                          <span>Logo Size: {logoSizePercent}%</span>
                          <button onClick={() => setLogoDataUrl(undefined)} className="text-red-500 hover:underline">Remove</button>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="25"
                          value={logoSizePercent}
                          onChange={(e) => setLogoSizePercent(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* PDF Export Panel */}
            <div className="p-5 bg-background border border-border rounded-xl space-y-4">
              <h3 className="font-display font-bold text-[14px] text-ink flex items-center">
                <FileText className="w-4 h-4 mr-2 text-primary" /> PDF Export Formatting
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">PDF Page Size</label>
                  <select value={pdfPageSize} onChange={(e: any) => setPdfPageSize(e.target.value)} className="w-full h-9 px-3 bg-surface border border-border rounded-lg text-xs text-ink outline-none">
                    <option value="A4">A4</option>
                    <option value="Letter">Letter</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">PDF Orientation</label>
                  <select value={pdfOrientation} onChange={(e: any) => setPdfOrientation(e.target.value)} className="w-full h-9 px-3 bg-surface border border-border rounded-lg text-xs text-ink outline-none">
                    <option value="portrait">Portrait</option>
                    <option value="landscape">Landscape</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">QR Position on PDF</label>
                  <select value={pdfPosition} onChange={(e: any) => setPdfPosition(e.target.value)} className="w-full h-9 px-3 bg-surface border border-border rounded-lg text-xs text-ink outline-none">
                    <option value="center">Center</option>
                    <option value="top">Top</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Title Text (above QR)</label>
                  <input type="text" value={pdfTitle} onChange={(e) => setPdfTitle(e.target.value)} className="w-full h-9 px-3 bg-surface border border-border rounded-lg text-xs text-ink outline-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] text-slate font-bold uppercase tracking-wider">Description Text (below QR)</label>
                <input type="text" value={pdfDescription} onChange={(e) => setPdfDescription(e.target.value)} className="w-full h-9 px-3 bg-surface border border-border rounded-lg text-xs text-ink outline-none" />
              </div>
            </div>
          </div>

          {/* QR Preview Panel (Right 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-start h-fit lg:sticky lg:top-20 space-y-6">
            <h3 className="font-display font-bold text-[14px] text-ink w-full text-left">Live Preview</h3>
            
            <QRPreview
              value={getPayload()}
              settings={settings}
              onDataUrlGenerated={(url) => setGeneratedPngUrl(url)}
            />

            {generatedPngUrl && (
              <div className="w-full space-y-3 p-4 bg-background border border-border rounded-xl animate-in fade-in duration-200">
                <span className="block text-[11px] text-slate font-bold uppercase tracking-wider text-center">Export Actions</span>
                
                <div className="flex flex-col gap-2">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleDownloadPNG}
                    leftIcon={<Download className="w-4 h-4" />}
                    className="w-full"
                  >
                    Download PNG
                  </Button>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadSVG}
                      leftIcon={<Sparkles className="w-4 h-4" />}
                    >
                      Download SVG
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownloadPDF}
                      leftIcon={<FileText className="w-4 h-4" />}
                    >
                      Download PDF
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            <Button variant="ghost" size="sm" onClick={handleReset} className="w-full">
              Reset Form Fields
            </Button>
          </div>

        </div>

      </div>
    </ToolLayout>
  );
}
