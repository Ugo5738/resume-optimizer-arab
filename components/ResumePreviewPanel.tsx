import React, { useCallback, useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import { CopyIcon, CheckIcon } from './ui/Icons';
import type { OptimizationResult } from '../types';
import type { Translations } from '../translations';

interface ResumePreviewPanelProps {
  result: OptimizationResult;
  t: Translations;
  isRTL: boolean;
}

const ResumePreviewPanel: React.FC<ResumePreviewPanelProps> = ({ result, t, isRTL }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!result.previewMarkdown) return;
    navigator.clipboard.writeText(result.previewMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [result.previewMarkdown]);

  const labelSpacing = isRTL ? 'mr-2' : 'ml-2';

  return (
    <div className="relative pt-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-slate-800">{t.optimizedPreview}</h4>
        <button
          onClick={handleCopy}
          className="inline-flex items-center px-2 py-1 text-xs border rounded-md text-slate-600 border-slate-300 hover:bg-slate-100"
        >
          {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <CopyIcon className="w-4 h-4" />}
          <span className={labelSpacing}>{copied ? t.copied : t.copyMarkdown}</span>
        </button>
      </div>
      <div
        className={`p-6 bg-white border border-slate-200 max-h-[60vh] overflow-y-auto rounded-md prose prose-sm ${isRTL ? 'text-right' : 'text-left'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <MarkdownRenderer content={result.previewMarkdown} />
      </div>
    </div>
  );
};

export default ResumePreviewPanel;

