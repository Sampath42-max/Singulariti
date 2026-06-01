import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function captureImageCard(elementId: string, filename: string = 'typing-result.png') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#0f172a', // slate-900 for dark mode background
      scale: 2, // high res
      useCORS: true,
      scrollY: -window.scrollY,
      windowWidth: document.documentElement.offsetWidth,
      windowHeight: document.documentElement.offsetHeight,
      onclone: (documentClone) => {
        const header = documentClone.getElementById('export-header');
        if (header) {
          header.style.display = 'flex';
        }
      }
    });
    
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = filename;
    link.click();
  } catch (error) {
    console.error('Error capturing image:', error);
  }
}

export async function generateCertificate(name: string, wpm: number, accuracy: number, date: string) {
  try {
    // Landscape A4 certificate
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const width = 297;
    const height = 210;

    // Background
    doc.setFillColor(15, 23, 42); // slate-900
    doc.rect(0, 0, width, height, 'F');
    
    // Outer Border
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, width - 20, height - 20);
    
    // Inner Decorative Border
    doc.setDrawColor(14, 165, 233); // sky-500
    doc.setLineWidth(2);
    doc.rect(14, 14, width - 28, height - 28);
    
    // Top banner
    doc.setFillColor(14, 165, 233);
    doc.rect(15, 15, width - 30, 20, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("S I N G U L A R I T I", width / 2, 28, { align: 'center' });

    // Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(42);
    doc.setFont("helvetica", "bold");
    doc.text("CERTIFICATE OF ACHIEVEMENT", width / 2, 75, { align: 'center' });

    // Subtitle
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(203, 213, 225); // slate-300
    doc.text("PROUDLY PRESENTED TO", width / 2, 95, { align: 'center' });

    // Name
    doc.setFontSize(38);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(56, 189, 248); // sky-400
    doc.text(name || "Typing Enthusiast", width / 2, 118, { align: 'center' });

    // Underline for name
    doc.setDrawColor(56, 189, 248);
    doc.setLineWidth(1);
    doc.line(width/2 - 60, 125, width/2 + 60, 125);

    // Description
    doc.setFontSize(16);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(255, 255, 255);
    doc.text("for outstanding performance in the Singulariti Typing Speed Test", width / 2, 142, { align: 'center' });
    
    // Metrics
    doc.setFontSize(26);
    doc.setFont("helvetica", "bold");
    doc.text(`${wpm} WPM`, width / 2 - 45, 168, { align: 'center' });
    doc.text(`${accuracy}% ACCURACY`, width / 2 + 45, 168, { align: 'center' });

    // Footer
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`Date: ${date}`, 30, height - 25);
    doc.text(`singulariti.in`, width - 30, height - 25, { align: 'right' });

    doc.save('singulariti-typing-certificate.pdf');
  } catch (error) {
    console.error('Error generating certificate:', error);
  }
}
