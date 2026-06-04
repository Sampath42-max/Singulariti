Product Name:
Online Utility Tools Website

Product Type:
Frontend-only browser-based utility tools website.

Backend/API:
This project has no backend, no database, and no API server. All tools work inside the browser using frontend logic only.

Main Product Goal:
Users can open different utility tools from the homepage/category pages and perform image, PDF, QR, calculator, typing, timer, and whiteboard actions directly in the browser.

Main Categories:

1. Image Tools — 27 tools
Purpose:
Users can compress, convert, resize, and process images in the browser.

Expected behavior:
- User can open Image Tools category.
- User can open each individual image tool.
- User can upload valid image files.
- Invalid files should show validation errors.
- Empty upload should show a proper message.
- Tool should show preview/result where applicable.
- Download button should download the processed image.
- Reset/clear/remove buttons should work if available.

2. Image Editing Tools — 18 tools
Purpose:
Users can edit, crop, apply filters, enhance images, add text/logo/watermark, and export edited images.

Expected behavior:
- User can open each editing tool.
- User can upload a valid image.
- Editing controls should update preview.
- Crop/rotate/flip/filter/brightness/contrast/sharpen/denoise/watermark/text/logo tools should work if present.
- Export/download should produce the edited image.
- Reset/undo/clear should work if available.

3. PDF Tools — 15 tools
Purpose:
Users can merge, split, rotate, sign, compress, watermark, and manage PDF files in the browser.

Expected behavior:
- User can open PDF Tools category.
- User can open each PDF tool page.
- User can upload valid PDF files.
- Invalid file types should show validation errors.
- Empty upload should show a proper message.
- Merge/split/rotate/sign/compress/watermark/page management tools should work if present.
- Output download should work.
- Page number or page range validation should work where applicable.

4. QR Tools — 10 tools
Purpose:
Users can generate custom QR codes, style QR codes, download QR codes, and scan QR codes.

Expected behavior:
- User can open QR Tools category.
- User can open each QR tool.
- User can enter valid text/URL/contact/WiFi or other available QR data.
- Empty input should show validation.
- QR preview should generate correctly.
- Style/customization options should update QR preview if available.
- Download button should download QR image.
- QR scanner should handle valid and invalid QR input if scanner is available.

5. Calculator Tools — 21 tools
Purpose:
Users can calculate financial, mathematical, tax, health, date/time, and other metrics.

Expected behavior:
- User can open Calculator Tools category.
- User can open each calculator.
- Required fields should validate empty input.
- Invalid numbers should show errors.
- Calculate button should produce result.
- Reset/clear button should clear fields.
- Results should be formatted clearly.
- Negative, zero, and decimal values should be handled correctly depending on calculator logic.

6. Typing Speed Test
Purpose:
Users can measure WPM, accuracy, mistakes, typing progress, and final result.

Expected behavior:
- User can start typing test.
- Timer should run correctly.
- WPM should update/calculate correctly.
- Accuracy should calculate based on correct and incorrect typing.
- Mistakes should be counted.
- Restart/reset should work.
- Final results should show after completion.

7. Pomodoro Timer
Purpose:
Users can focus using work/break timers, task management, and ambient sounds.

Expected behavior:
- Start, pause, resume, and reset should work.
- Work session and break session should switch correctly.
- Long break should work if available.
- Task add/delete/complete should work if available.
- Ambient sound controls should work if available.
- Timer should not become negative.
- UI should remain responsive.

8. Online Whiteboard
Purpose:
Users can draw, write, sketch, add shapes, erase, and export their whiteboard.

Expected behavior:
- User can draw using mouse/touch.
- Brush size and color should change drawing output.
- Eraser should remove drawing.
- Shapes should work if available.
- Text tool should work if available.
- Undo/redo should work if available.
- Clear board should clear canvas.
- Export/download should save the whiteboard.
- Canvas should resize properly on desktop and mobile.

Global Website Behavior:

Homepage:
- All category cards should be visible.
- Tool counts should display correctly.
- “Open Tool” buttons should navigate to correct category/tool pages.
- New tools like Typing Speed Test, Pomodoro Timer, and Online Whiteboard should be visible and open correctly.

Navigation:
- Navbar links should work.
- Dropdown/menu links should work if present.
- Footer links should work.
- No broken internal routes.
- Browser back/forward navigation should work.

Responsive Design:
- Website should work on desktop, tablet, and mobile.
- No horizontal overflow.
- Cards/buttons/forms should not overlap.
- Tool pages should remain usable on small screens.

Validation:
- Empty inputs should show user-friendly messages.
- Invalid file types should be rejected.
- Invalid numbers should be rejected in calculators.
- Required fields should be clearly marked or validated.

Error Handling:
- Tool should not crash on bad input.
- Page should not become blank.
- Console should not show critical errors.
- Build should pass.
- Failed operations should show clear error messages.

Accessibility Basics:
- Buttons should be clickable.
- Inputs should be usable with keyboard.
- Labels/placeholders should be clear.
- Text should be readable.
- Focus states should be visible where possible.

Testing Priority:
Because this is a frontend-only product, prioritize:
1. Page loading
2. Broken routes
3. Console errors
4. Build errors
5. Tool opening/navigation
6. File upload validation
7. Download/export actions
8. Calculator result generation
9. Mobile responsiveness
10. Critical UI bugs

Do not create backend code.
Do not add database logic.
Do not add API routes.
Do not test server-side APIs.
Only test existing frontend/browser-side behavior.