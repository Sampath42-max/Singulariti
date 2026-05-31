# Singulariti.in - Architecture & Technical Documentation

This document serves as a reference for future builds and expansions of the Singulariti ecosystem to ensure alignment with the Phase 1 Foundation.

## 1. Core Principles
* **Client-side Processing**: All processing (Image/PDF/Video) must happen locally in the browser using modern APIs (Canvas, WebAssembly, Web Workers). Files must never be uploaded to a server.
* **Registry-Driven**: The entire ecosystem (Navigation, Routing, SEO metadata) is generated from `src/registry/index.ts`. No hardcoded navigation elements.
* **Strict Design System**: Adhere exactly to the design tokens defined in `src/app/globals.css`. Do not introduce new colors, fonts, or ad-hoc Tailwind classes that violate the premium aesthetic.

## 2. Directory Structure
* `src/app/`: Next.js App Router structure. Contains static pages and dynamic routing for categories/collections/tools.
* `src/components/`: Shared UI components. 
  * `/ui`: Primitive components (Button, Card, Badge).
  * `/layout`: Header, Footer.
  * `/tool`: The `ToolEngine` component which renders the processing UI for all tools.
* `src/engines/`: Client-side Web Workers for heavy processing (e.g., `compression.worker.ts`).
* `src/hooks/`: React hooks for communicating with the web workers (e.g., `useCompression.ts`).
* `src/registry/`: The single source of truth for all tools, categories, and their metadata.

## 3. Adding a New Tool (e.g., in Image Tools)
To add a new tool to an existing category, you only need to:
1. Open `src/registry/index.ts`.
2. Locate the appropriate category and collection.
3. Append a new `ToolRegistryItem` object to the `tools` array.
4. The application will automatically:
   * Generate the static route (`/image/compression/my-new-tool`).
   * Add it to the collection page grid.
   * Add it to the featured tools list (if applicable).
   * Generate proper SEO metadata based on the registry object.
5. Ensure the chosen `engine` (e.g., 'compression') supports the specific operation required.

## 4. Adding a New Category (e.g., PDF Tools)
To introduce a new category (Phase 2+):
1. Update `src/registry/index.ts` to include the new `CategoryRegistryItem`.
2. Create the necessary processing engines in `src/engines/` and their respective hooks.
3. Update `src/components/tool/ToolEngine.tsx` to handle the new `engine` type.
4. Create `src/app/[category]/page.tsx` and dynamic sub-routes. The existing dynamic route logic in `/image` can be generalized or copied for the new category.

## 5. SEO Strategy
* SEO is managed via Next.js `generateMetadata()` in the dynamic route files (e.g., `src/app/image/[collection]/[tool]/page.tsx`).
* This reads from `seoTitle` and `seoDescription` in the registry.
* Future builds should add specific JSON-LD structures (like `SoftwareApplication` schema) within these pages.

## 6. Performance
* Ensure Web Workers are properly terminated to prevent memory leaks.
* Use `createImageBitmap` instead of standard Image objects for faster and non-blocking decoding.
* Keep dependencies lightweight. Avoid large component libraries (like MUI) and rely on custom-built, Tailwind-styled components.
