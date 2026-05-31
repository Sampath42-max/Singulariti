// Conversion Web Worker
self.addEventListener('message', async (e) => {
  const { id, file, toFormat } = e.data; // toFormat e.g., 'image/png'
  
  try {
    const bitmap = await createImageBitmap(file);
    
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
  } catch (error: any) {
    self.postMessage({ id, success: false, error: error.message });
  }
});
