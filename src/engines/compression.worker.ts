// Compression Web Worker
self.addEventListener('message', async (e) => {
  const { id, file, quality, maxWidth } = e.data;
  
  try {
    if (file.type === 'image/svg+xml') {
      const text = await file.text();
      // Simple SVG compression: remove comments, extra whitespaces, newlines, and empty tags
      let compressedText = text
        .replace(/<!--[\s\S]*?-->/g, '') // remove comments
        .replace(/>\s+</g, '><') // remove whitespace between tags
        .replace(/\s{2,}/g, ' ') // collapse multiple spaces
        .replace(/[\r\n]+/g, ' ') // remove newlines
        .trim();
        
      const blob = new Blob([compressedText], { type: 'image/svg+xml' });
      if (blob.size >= file.size) {
        self.postMessage({ id, success: true, useOriginal: true, originalSize: file.size, compressedSize: file.size });
      } else {
        self.postMessage({ id, success: true, useOriginal: false, blob, originalSize: file.size, compressedSize: blob.size });
      }
      return;
    }

    const bitmap = await createImageBitmap(file);
    let width = bitmap.width;
    let height = bitmap.height;
    
    if (maxWidth && width > maxWidth) {
      height = Math.floor(height * (maxWidth / width));
      width = maxWidth;
    }
    
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    ctx.drawImage(bitmap, 0, 0, width, height);
    
    let type = file.type;
    
    // Natively, Canvas PNG export is lossless and unoptimized, causing massive file sizes.
    // To actually achieve "compression" for PNGs in the browser, we must use WebP.
    if (type === 'image/png') {
      type = 'image/webp';
    }
    
    const blob = await canvas.convertToBlob({
      type: type,
      quality: quality || 0.8
    });
    
    // Ensure we don't increase the file size
    if (blob.size >= file.size && !maxWidth) {
      self.postMessage({ id, success: true, useOriginal: true, originalSize: file.size, compressedSize: file.size });
    } else {
      self.postMessage({ id, success: true, useOriginal: false, blob, originalSize: file.size, compressedSize: blob.size });
    }
  } catch (error: any) {
    self.postMessage({ id, success: false, error: error.message });
  }
});
