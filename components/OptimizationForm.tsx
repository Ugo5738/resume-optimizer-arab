
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { UploadIcon } from './ui/Icons';
import { useTranslations } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';

interface OptimizationFormProps {
    onStartOptimization: (data: {
        resumeFile: File | null;
        resumeText: string;
        jobDescription: string;
        customInstructions: string;
        jobTitle: string;
        companyName: string;
        contentLanguage: 'en' | 'ar';
    }) => Promise<void>;
}

const OptimizationForm: React.FC<OptimizationFormProps> = ({ onStartOptimization }) => {
    const t = useTranslations();
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [customInstructions, setCustomInstructions] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [contentLanguage, setContentLanguage] = useState<'en' | 'ar'>(language);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
            setResumeText('');
            setError(null);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!resumeFile && !resumeText.trim()) {
            setError(t.errorResumeMissing);
            return;
        }
        if (!jobDescription.trim()) {
            setError(t.errorJobMissing);
            return;
        }

        setIsLoading(true);
        await onStartOptimization({
            resumeFile,
            resumeText,
            jobDescription,
            customInstructions,
            jobTitle,
            companyName,
            contentLanguage,
        });
        setIsLoading(false);
    };
    
    const baseTextareaClasses = 'block w-full text-sm bg-gray-700 text-slate-200 border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-400';
    const getTextareaClasses = (contentLang?: 'en' | 'ar') => {
        const rtl = isRTL || contentLang === 'ar';
        return `${baseTextareaClasses} ${rtl ? 'text-right' : 'text-left'}`;
    };

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* --- Language & Job Meta --- */}
                <div className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-100">{t.contentLanguageLabel}</label>
                        <div className="flex rounded-md bg-gray-700 p-1">
                            {(['en', 'ar'] as const).map(lang => (
                                <button
                                    key={lang}
                                    type="button"
                                    onClick={() => setContentLanguage(lang)}
                                    className={`flex-1 py-2 text-sm rounded-md transition ${
                                        contentLanguage === lang ? 'bg-primary-500 text-white' : 'text-slate-300'
                                    }`}
                                >
                                    {lang === 'en' ? t.languageEnglish : t.languageArabic}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-100">{t.jobTitleLabel}</label>
                        <input
                            type="text"
                            value={jobTitle}
                            onChange={e => setJobTitle(e.target.value)}
                            placeholder={t.jobTitlePlaceholder}
                            className="block w-full px-3 py-2 text-sm bg-gray-700 text-slate-200 border border-gray-600 rounded-md placeholder:text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-100">{t.companyLabel}</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={e => setCompanyName(e.target.value)}
                            placeholder={t.companyPlaceholder}
                            className="block w-full px-3 py-2 text-sm bg-gray-700 text-slate-200 border border-gray-600 rounded-md placeholder:text-gray-400 focus:ring-primary-500 focus:border-primary-500"
                            dir={isRTL ? 'rtl' : 'ltr'}
                        />
                    </div>
                </div>

                {/* --- 1. Resume --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">{t.resumeSectionTitle}</h2>
                    <p className="text-sm text-slate-400">{t.resumeSectionDescription}</p>
                     <label className="block w-full px-12 py-6 text-center border-2 border-dashed rounded-md cursor-pointer border-gray-600 hover:border-primary-400 bg-gray-900/50">
                        <UploadIcon className="w-8 h-8 mx-auto text-slate-500" />
                        <span className="mt-2 block text-sm font-medium text-slate-300">
                            {resumeFile ? resumeFile.name : t.uploadLabel}
                        </span>
                        <input type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.docx,text/plain" />
                    </label>
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-2 text-sm text-slate-400">{t.orDivider}</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>
                    <textarea
                        value={resumeText}
                        onChange={e => { setResumeText(e.target.value); setResumeFile(null); setError(null); }}
                        rows={8}
                        placeholder={t.resumePlaceholder}
                        className={getTextareaClasses(contentLanguage)}
                    />
                </div>

                {/* --- 2. Job Description --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">{t.jobSectionTitle}</h2>
                    <p className="text-sm text-slate-400">{t.jobSectionDescription}</p>
                    <textarea
                        value={jobDescription}
                        onChange={e => { setJobDescription(e.target.value); setError(null); }}
                        rows={10}
                        placeholder={t.jobDescriptionPlaceholder}
                        className={getTextareaClasses(contentLanguage)}
                        required
                    />
                </div>
                
                {/* --- 3. Custom Instructions --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">{t.customSectionTitle}</h2>
                    <p className="text-sm text-slate-400">{t.customSectionDescription}</p>
                    <textarea
                        value={customInstructions}
                        onChange={e => setCustomInstructions(e.target.value)}
                        rows={4}
                        placeholder={t.customPlaceholder}
                        className={getTextareaClasses(contentLanguage)}
                    />
                </div>

                {/* --- Submit --- */}
                <div>
                     {error && <p className="mb-4 text-sm text-center text-red-400">{error}</p>}
                    <Button type="submit" isLoading={isLoading} className="w-full text-base py-3">
                        {t.analyzeButton}
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default OptimizationForm;
