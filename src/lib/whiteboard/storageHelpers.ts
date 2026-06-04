import * as fabric from 'fabric';

const STORAGE_KEY = 'singularity_whiteboard_save';

// Save canvas state to localStorage
export function saveBoardToStorage(canvas: fabric.Canvas): { success: boolean; error?: string } {
  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Storage is not available in server context.' };
    }

    // Get JSON representation including all custom properties
    const canvasJson = JSON.stringify((canvas as any).toJSON(['isSticky', 'selectable', 'hasControls']));
    
    // Attempt to store in localStorage
    localStorage.setItem(STORAGE_KEY, canvasJson);
    return { success: true };
  } catch (error: any) {
    console.error("Failed to save board locally:", error);
    
    let errorMsg = "Failed to save whiteboard.";
    if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
      errorMsg = "Browser local storage quota exceeded. Try deleting some drawings or images.";
    }
    return { success: false, error: errorMsg };
  }
}

// Load canvas state from localStorage
export function loadBoardFromStorage(canvas: fabric.Canvas): Promise<{ success: boolean; error?: string }> {
  return new Promise((resolve) => {
    try {
      if (typeof window === 'undefined') {
        return resolve({ success: false, error: 'Storage is not available in server context.' });
      }

      const savedData = localStorage.getItem(STORAGE_KEY);
      if (!savedData) {
        return resolve({ success: false, error: 'No saved whiteboard found in this browser.' });
      }

      // Parse JSON to verify correctness
      const parsedData = JSON.parse(savedData);

      // Load into fabric canvas
      canvas.loadFromJSON(parsedData, () => {
        // Post-load setup: ensure all objects have correct properties and render
        canvas.getObjects().forEach((obj) => {
          // Re-enable selections/controls as required
          obj.set({
            selectable: true,
            hasControls: true
          });
          obj.setCoords();
        });
        
        // Render canvas
        canvas.requestRenderAll();
        resolve({ success: true });
      });
    } catch (error: any) {
      console.error("Failed to load saved board:", error);
      resolve({ success: false, error: "The saved board data is corrupted or could not be loaded." });
    }
  });
}

// Clear saved board from localStorage
export function clearSavedBoard(): boolean {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Failed to clear saved board:", error);
    return false;
  }
}

// Check if a saved board exists in localStorage
export function hasSavedBoard(): boolean {
  try {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(STORAGE_KEY);
    }
    return false;
  } catch {
    return false;
  }
}
