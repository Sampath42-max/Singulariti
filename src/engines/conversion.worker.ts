// Conversion Web Worker
self.addEventListener('message', async (e) => {
  const { id, file, toFormat } = e.data; // toFormat e.g., 'image/png'
  
  try {
    const isSvgInput = file.type.includes('svg') || (file.name && file.name.toLowerCase().endsWith('.svg'));
    if (toFormat === 'image/svg+xml') {
      if (isSvgInput) {
        self.postMessage({ id, success: true, blob: file, originalSize: file.size, newSize: file.size });
        return;
      }
      
      let bitmap: ImageBitmap;
      try {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        bitmap = await createImageBitmap(file);
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${bitmap.width}" height="${bitmap.height}"><image href="${dataUrl}" width="100%" height="100%"/></svg>`;
        const blob = new Blob([svgString], { type: 'image/svg+xml' });
        self.postMessage({ id, success: true, blob, originalSize: file.size, newSize: blob.size });
      } catch {
        throw new Error("The source image could not be decoded or is an invalid format.");
      }
      return;
    }

    let bitmap: ImageBitmap;
    try {
      bitmap = await createImageBitmap(file);
    } catch {
      if (isSvgInput) {
        const text = await file.text();
        let newText = text;
        if (!text.includes('width=') && text.includes('viewBox=')) {
           const match = text.match(/viewBox=["'][^"']*?([\d\.]+)\s+([\d\.]+)["']/);
           if (match) {
              newText = text.replace('<svg ', `<svg width="${match[1]}" height="${match[2]}" `);
           }
        }
        if (!newText.includes('width=')) {
           newText = newText.replace('<svg ', '<svg width="1024" height="1024" ');
        }
        const newBlob = new Blob([newText], { type: 'image/svg+xml' });
        bitmap = await createImageBitmap(newBlob);
      } else {
        throw new Error("The source image could not be decoded or is an invalid format.");
      }
    }
    
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Draw white background in case we convert PNG with alpha to JPG
    if (toFormat === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    
    ctx.drawImage(bitmap, 0, 0);
    
    const blob = await canvas.convertToBlob({
      type: toFormat,
      quality: toFormat === 'image/jpeg' || toFormat === 'image/webp' ? 0.9 : undefined
    });
    
    self.postMessage({ id, success: true, blob, originalSize: file.size, newSize: blob.size });
  } catch (error) {
    self.postMessage({ id, success: false, error: error instanceof Error ? error.message : String(error) });
  }
});
