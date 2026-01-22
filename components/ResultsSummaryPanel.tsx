import React from 'react';
import type { OptimizationResult, LanguageCode } from '../types';
import type { Translations } from '../translations';

interface ResultsSummaryPanelProps {
  result: OptimizationResult;
  t: Translations;
  isRTL: boolean;
  desiredOutputLang?: LanguageCode;
  resumeLang?: LanguageCode;
  jobDescriptionLang?: LanguageCode;
}

const MetricBar: React.FC<{ label: string; value?: number }> = ({ label, value }) => {
  const safeValue = value ?? 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-slate-800">{value !== undefined ? `${value}%` : '—'}</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-primary-500"
          style={{ width: `${Math.max(0, Math.min(100, safeValue))}%` }}
        />
      </div>
    </div>
  );
};

const languageLabel = (code: LanguageCode | undefined, t: Translations) => {
  if (code === 'ar') return t.languageArabic;
  if (code === 'en') return t.languageEnglish;
  return undefined;
};

const ResultsSummaryPanel: React.FC<ResultsSummaryPanelProps> = ({
  result,
  t,
  isRTL,
  desiredOutputLang,
  resumeLang,
  jobDescriptionLang,
}) => {
  const alignment = result.alignmentInsights;
  const matched = alignment?.matched?.length ? alignment.matched : result.coveredKeywords;
  const missing = alignment?.missing?.length ? alignment.missing : result.missingKeywords;
  const weak = alignment?.weak ?? [];
  const evidence = alignment?.evidence ?? [];
  const reliability = result.reliability ?? {};
  const evaluation = result.evaluation ?? {};
  const retrievedContexts = result.retrievalContexts ?? [];
  const translationNotes = result.translationNotes ?? [];
  const entities = result.extractedEntities;
  const extractedSkills = entities?.skills ?? [];
  const extractedTools = entities?.tools ?? [];
  const extractedEducation = entities?.education ?? [];
  const extractedExperience = entities?.experience ?? [];
  const formatScore = (value?: number) => {
    if (value === undefined) return undefined;
    const normalized = value <= 1 ? value * 100 : value;
    return `${Math.round(normalized)}%`;
  };

  const renderChips = (items: string[], colorClasses: string) => (
    <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
      {items.length === 0 ? (
        <span className="text-xs text-slate-400">—</span>
      ) : (
        items.map(item => (
          <span key={item} className={`px-2 py-1 text-xs rounded-full ${colorClasses}`}>
            {item}
          </span>
        ))
      )}
    </div>
  );

  return (
    <div className={`space-y-6 text-gray-800 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-400">{t.steps.results.label}</p>
        <h3 className="text-xl font-bold text-slate-900">{t.steps.results.title}</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="p-4 border border-slate-200 rounded-lg bg-white">
          <p className="text-sm font-medium text-slate-600">{t.matchScoreLabel}</p>
          <p className="text-5xl font-bold text-primary-600">
            {result.score}
            <span className="text-3xl">%</span>
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t.invalidJsonRateLabel}</span>
                <span className="font-semibold text-slate-800">
                  {reliability.invalidJsonRatePct !== undefined ? `${reliability.invalidJsonRatePct}%` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.latencyLabel}</span>
                <span className="font-semibold text-slate-800">
                  {reliability.latencySeconds !== undefined ? `${reliability.latencySeconds}s` : '—'}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span>{t.avgLatencyLabel}</span>
                <span className="font-semibold text-slate-800">
                  {reliability.avgLatencySeconds !== undefined ? `${reliability.avgLatencySeconds}s` : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{t.lastRunValidLabel}</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    reliability.lastRunValid
                      ? 'bg-green-100 text-green-700'
                      : reliability.lastRunValid === false
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {reliability.lastRunValid === undefined
                    ? '—'
                    : reliability.lastRunValid
                      ? t.statusValid
                      : t.statusInvalid}
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">{t.reliabilityTargets}</p>
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white">
          <h4 className="text-sm font-semibold text-slate-800">{t.translationTitle}</h4>
          <div className={`mt-3 flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
            {resumeLang && (
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {t.resumeLanguageLabel}: {languageLabel(resumeLang, t)}
              </span>
            )}
            {jobDescriptionLang && (
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {t.jobDescriptionLanguageLabel}: {languageLabel(jobDescriptionLang, t)}
              </span>
            )}
            {desiredOutputLang && (
              <span className="px-3 py-1 text-xs rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                {t.outputLanguageLabel}: {languageLabel(desiredOutputLang, t)}
              </span>
            )}
            {result.detectedResumeLang && (
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {t.detectedResumeLabel}: {languageLabel(result.detectedResumeLang, t)}
              </span>
            )}
            {result.detectedJobDescLang && (
              <span className="px-3 py-1 text-xs rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {t.detectedJobLabel}: {languageLabel(result.detectedJobDescLang, t)}
              </span>
            )}
          </div>
          {translationNotes.length > 0 && (
            <ul className="mt-3 space-y-1 text-sm text-slate-600 list-disc list-inside">
              {translationNotes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="p-4 border border-slate-200 rounded-lg bg-white">
          <h4 className="text-sm font-semibold text-slate-800">{t.groundedFeedbackTitle}</h4>
          <div className="mt-3 space-y-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.matchedLabel}</p>
              {renderChips(matched, 'bg-green-100 text-green-800')}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.missingLabel}</p>
              {renderChips(missing, 'bg-amber-100 text-amber-800')}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.weakLabel}</p>
              {renderChips(weak, 'bg-orange-100 text-orange-800')}
            </div>
          </div>
          {(evidence.length > 0 || retrievedContexts.length > 0) && (
            <div className="mt-4 space-y-2">
              {evidence.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.evidenceLabel}</p>
                  {evidence.map((item, index) => (
                    <div key={`${item.snippet}-${index}`} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="uppercase tracking-wide">{item.source}</span>
                        {formatScore(item.score) && <span className="font-semibold text-slate-700">{formatScore(item.score)}</span>}
                      </div>
                      <p className="mt-1 text-sm text-slate-700">{item.snippet}</p>
                      {item.note && <p className="mt-1 text-xs text-slate-500">{item.note}</p>}
                    </div>
                  ))}
                </div>
              )}
              {retrievedContexts.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.retrievalContextTitle}</p>
                  {retrievedContexts.map((ctx, index) => (
                    <div key={`${ctx.snippet}-${index}`} className="rounded-md border border-slate-200 bg-white p-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="uppercase tracking-wide">{ctx.source}</span>
                        {formatScore(ctx.score) && <span className="font-semibold text-slate-700">{formatScore(ctx.score)}</span>}
                      </div>
                      <p className="mt-1 text-sm text-slate-700">{ctx.snippet}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border border-slate-200 rounded-lg bg-white">
          <h4 className="text-sm font-semibold text-slate-800">{t.changeLog}</h4>
          <ul className="mt-2 text-sm list-disc list-inside text-slate-600 space-y-1">
            {result.changeLog.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="p-4 border border-slate-200 rounded-lg bg-white">
          <div>
            <h4 className="text-sm font-semibold text-slate-800">{t.structuredExtractionTitle}</h4>
            <p className="text-xs text-slate-500 mt-1">{t.structuredExtractionSubtitle}</p>
          </div>
          {entities ? (
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.skillsLabel}</p>
                {renderChips(extractedSkills, 'bg-slate-100 text-slate-800')}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.toolsLabel}</p>
                {renderChips(extractedTools, 'bg-slate-100 text-slate-800')}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.educationLabel}</p>
                <div className="mt-1 space-y-1 text-sm text-slate-700">
                  {extractedEducation.map(item => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t.experienceLabel}</p>
                <div className="mt-2 space-y-2">
                  {extractedExperience.map((exp, idx) => (
                    <div key={`${exp.role}-${exp.company ?? idx}`} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                      <p className="text-sm font-semibold text-slate-800">
                        {exp.role}
                        {exp.company ? ` @ ${exp.company}` : ''}
                      </p>
                      {exp.duration && <p className="text-xs text-slate-500">{exp.duration}</p>}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="mt-1 text-xs text-slate-600 list-disc list-inside space-y-1">
                          {exp.highlights.map((highlight, hIdx) => (
                            <li key={`${highlight}-${hIdx}`}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-500">—</p>
          )}
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h4 className="text-sm font-semibold text-slate-800">{t.evaluationTitle}</h4>
            <div className="mt-3 space-y-3">
              <MetricBar label={t.extractionAccuracyLabel} value={evaluation.extractionAccuracy} />
              <MetricBar label={t.matchingPrecisionLabel} value={evaluation.matchingPrecision} />
              <MetricBar label={t.retrievalRelevanceLabel} value={evaluation.retrievalRelevance} />
              <MetricBar label={t.feedbackQualityLabel} value={evaluation.feedbackQuality} />
            </div>
          </div>
          <div className="p-4 border border-slate-200 rounded-lg bg-white">
            <h4 className="text-sm font-semibold text-slate-800">{t.keywordAnalysis}</h4>
            <div className="mt-3 space-y-2">
              <p className="text-xs text-slate-500">
                {t.matchScoreLabel}: {result.score}%
              </p>
              <div className="flex flex-wrap gap-2">
                {result.coveredKeywords.map(k => (
                  <span key={k} className="px-2 py-1 text-xs text-green-800 bg-green-100 rounded-full">
                    {k}
                  </span>
                ))}
                {result.missingKeywords.map(k => (
                  <span key={k} className="px-2 py-1 text-xs text-amber-800 bg-amber-100 rounded-full">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSummaryPanel;
