
import React from 'react';
import { Card } from './ui/Card';
import { Spinner } from './ui/Spinner';
import type { JobQueueItem } from '../types';
import { useTranslations } from '../translations';
import { useLanguage } from '../contexts/LanguageContext';

interface JobsQueueProps {
    jobs: JobQueueItem[];
    onSelectJob: (jobId: string) => void;
}

const JobsQueue: React.FC<JobsQueueProps> = ({ jobs, onSelectJob }) => {
    const t = useTranslations();
    const { language } = useLanguage();
    const isRTL = language === 'ar';
    if (jobs.length === 0) {
        return null;
    }

    return (
        <Card>
            <h2 className="text-lg font-semibold text-slate-100">{t.queueTitle}</h2>
            <div className="mt-4 flow-root">
                <ul role="list" className={`-my-4 divide-y divide-gray-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {jobs.map(job => (
                        <li key={job.id} className="py-4">
                            <button
                                onClick={() => job.status === 'complete' && onSelectJob(job.id)}
                                disabled={job.status !== 'complete'}
                                className={`flex items-center w-full space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse text-right' : 'text-left'} disabled:cursor-not-allowed group`}
                            >
                                <div className="flex-auto min-w-0">
                                    <p className="font-medium text-slate-200 truncate group-hover:text-primary-400 transition-colors">
                                        {job.title}
                                    </p>
                                    <p className="text-sm text-slate-400">
                                        {job.metadata?.company ? `${job.metadata.company} • ` : ''}ID: {job.id}
                                    </p>
                                </div>
                                {job.status === 'processing' && (
                                    <div className="flex items-center space-x-2 text-yellow-400">
                                        <span className="text-sm font-medium">{t.queueProcessing}</span>
                                        <Spinner />
                                    </div>
                                )}
                                {job.status === 'complete' && (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">
                                        {t.queueComplete}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
};

export default JobsQueue;
