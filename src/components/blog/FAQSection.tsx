"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQItem } from '@/lib/blog';

interface FAQSectionProps {
  faqs: FAQItem[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!faqs || faqs.length === 0) return null;

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-6 pt-8 border-t border-border/60">
      <h3 className="font-display font-bold text-xl text-ink flex items-center gap-2 mb-6">
        <HelpCircle className="w-5 h-5 text-primary" /> Frequently Asked Questions
      </h3>
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="border border-border bg-surface rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-display font-bold text-[15px] text-ink hover:text-primary transition-colors focus:outline-none"
              >
                <span>{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-slate flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-0 text-sm font-sans text-slate leading-relaxed border-t border-border/40 animate-in fade-in duration-200">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
