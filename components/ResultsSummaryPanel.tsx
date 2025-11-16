import React from 'react';
import type { OptimizationResult } from '../types';
import type { Translations } from '../translations';

interface ResultsSummaryPanelProps {
  result: OptimizationResult;
  t: Translations;
  isRTL: boolean;
}

const ResultsSummaryPanel: React.FC<ResultsSummaryPanelProps> = ({ result, t, isRTL }) => (
  <div className={`space-y-6 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{t.steps.results.label}</p>
      <h3 className="text-xl font-bold text-slate-900">{t.steps.results.title}</h3>
    </div>

    <div className="p-4 text-center bg-primary-50 rounded-lg">
      <p className="text-sm font-medium text-primary-700">{t.matchScoreLabel}</p>
      <p className="text-5xl font-bold text-primary-600">
        {result.score}
        <span className="text-3xl">%</span>
      </p>
    </div>

    <div>
      <h4 className="font-semibold text-slate-800">{t.keywordAnalysis}</h4>
      <div className="flex flex-wrap gap-2 mt-2">
        {result.coveredKeywords.map(k => (
          <span key={k} className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
            {k}
          </span>
        ))}
        {result.missingKeywords.map(k => (
          <span key={k} className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded-full">
            {k}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold text-slate-800">{t.changeLog}</h4>
      <ul className="mt-2 text-sm list-disc list-inside text-slate-600 space-y-1">
        {result.changeLog.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  </div>
);

export default ResultsSummaryPanel;

