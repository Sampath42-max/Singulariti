import React from 'react';
import { registry } from '@/registry';
import { Card } from '@/components/ui/Card';
import { Calculator } from 'lucide-react';

interface RelatedCalculatorsProps {
  currentToolId: string;
}

export function RelatedCalculators({ currentToolId }: RelatedCalculatorsProps) {
  const category = registry.categories.find(c => c.id === 'calculators');
  if (!category) return null;

  // Find all calculators
  const allCalculators = category.collections.flatMap(c => c.tools);
  
  // Find current tool collection
  const currentCollection = category.collections.find(col => 
    col.tools.some(t => t.id === currentToolId)
  );

  // Prioritize tools in the same collection
  let candidates = currentCollection 
    ? currentCollection.tools.filter(t => t.id !== currentToolId)
    : [];
  
  if (candidates.length < 4) {
    const remaining = allCalculators.filter(t => 
      t.id !== currentToolId && !candidates.some(c => c.id === t.id)
    );
    candidates = [...candidates, ...remaining];
  }

  const related = candidates.slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="space-y-6 w-full max-w-5xl">
      <h3 className="font-display font-bold text-xl text-ink border-b border-border pb-3 mb-6">
        Related Calculator Tools
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((tool) => (
          <Card
            key={tool.id}
            title={tool.name}
            description={tool.description}
            href={tool.path}
            icon={<Calculator className="w-6 h-6" />}
          />
        ))}
      </div>
    </div>
  );
}
