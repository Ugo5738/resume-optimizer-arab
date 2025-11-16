
import React, { useMemo } from 'react';

const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  const createMarkup = (markdown: string) => {
    let html = markdown
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold mt-6 mb-3">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mt-8 mb-4">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold">$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Lists
    html = html.replace(/^\s*\n\*/gm, '*');
    html = html.replace(/^\* (.*$)/gim, '<ul class="list-disc list-inside space-y-1 mb-4"><li>$1</li></ul>');
    html = html.replace(/<\/ul>\n<ul class="list-disc list-inside space-y-1 mb-4">/g, '');

    // Line breaks
    html = html.replace(/\n/g, '<br />');
    html = html.replace(/<br \/><(h[1-3]|ul|li)/g, '<$1');
    html = html.replace(/<br \/><br \/>/g, '<br />');

    return { __html: html };
  };

  const processedHtml = useMemo(() => createMarkup(content), [content]);

  return <div className="text-sm leading-relaxed text-gray-800" dangerouslySetInnerHTML={processedHtml} />;
};

export default MarkdownRenderer;
