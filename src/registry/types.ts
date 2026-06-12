export type EngineType = 'compression' | 'conversion' | 'editing' | 'utility' | 'developer' | 'single-editing' | 'qr-standalone' | 'text-tool' | 'unit-converter' | 'seo-tool' | 'animation';

export interface ToolRegistryItem {
  id: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  engine: EngineType;
  path: string; // e.g., '/image/compression/jpg-compressor'
  options?: any;
}

export interface CollectionRegistryItem {
  id: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  path: string; // e.g., '/image/compression'
  tools: ToolRegistryItem[];
}

export interface CategoryRegistryItem {
  id: string;
  name: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  path: string; // e.g., '/image'
  collections: CollectionRegistryItem[];
}

export interface EcosystemRegistry {
  categories: CategoryRegistryItem[];
}
