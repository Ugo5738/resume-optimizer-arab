
import React, { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { UploadIcon } from './ui/Icons';

interface OptimizationFormProps {
    onStartOptimization: (data: {
        resumeFile: File | null;
        resumeText: string;
        jobDescription: string;
        customInstructions: string;
    }) => Promise<void>;
}

const OptimizationForm: React.FC<OptimizationFormProps> = ({ onStartOptimization }) => {
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [resumeText, setResumeText] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [customInstructions, setCustomInstructions] = useState('');
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
            setError('Please upload a file or paste your resume text.');
            return;
        }
        if (!jobDescription.trim()) {
            setError('Please provide a job description.');
            return;
        }

        setIsLoading(true);
        await onStartOptimization({ resumeFile, resumeText, jobDescription, customInstructions });
        setIsLoading(false);
    };
    
    const commonTextareaClasses = "block w-full text-sm bg-gray-700 text-slate-200 border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 placeholder:text-gray-400";

    return (
        <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* --- 1. Resume --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">1. Your Resume</h2>
                    <p className="text-sm text-slate-400">Upload a PDF/DOCX or paste your resume text below.</p>
                     <label className="block w-full px-12 py-6 text-center border-2 border-dashed rounded-md cursor-pointer border-gray-600 hover:border-primary-400 bg-gray-900/50">
                        <UploadIcon className="w-8 h-8 mx-auto text-slate-500" />
                        <span className="mt-2 block text-sm font-medium text-slate-300">
                            {resumeFile ? resumeFile.name : 'Click to upload a file'}
                        </span>
                        <input type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.docx,text/plain" />
                    </label>
                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-700"></div>
                        <span className="px-2 text-sm text-slate-400">OR</span>
                        <div className="flex-grow border-t border-gray-700"></div>
                    </div>
                    <textarea
                        value={resumeText}
                        onChange={e => { setResumeText(e.target.value); setResumeFile(null); setError(null); }}
                        rows={8}
                        placeholder="Paste your resume text here..."
                        className={commonTextareaClasses}
                    />
                </div>

                {/* --- 2. Job Description --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">2. Job Description</h2>
                    <p className="text-sm text-slate-400">Paste the job description you're applying for.</p>
                    <textarea
                        value={jobDescription}
                        onChange={e => { setJobDescription(e.target.value); setError(null); }}
                        rows={10}
                        placeholder="Paste the full job description here..."
                        className={commonTextareaClasses}
                        required
                    />
                </div>
                
                {/* --- 3. Custom Instructions --- */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-100">3. Custom Instructions (Optional)</h2>
                    <p className="text-sm text-slate-400">Guide the AI with specific requests for even better results.</p>
                    <textarea
                        value={customInstructions}
                        onChange={e => setCustomInstructions(e.target.value)}
                        rows={4}
                        placeholder="e.g., 'Make the summary more concise.' or 'Emphasize my project management skills.'"
                        className={commonTextareaClasses}
                    />
                </div>

                {/* --- Submit --- */}
                <div>
                     {error && <p className="mb-4 text-sm text-center text-red-400">{error}</p>}
                    <Button type="submit" isLoading={isLoading} className="w-full text-base py-3">
                        Analyze & Optimize
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default OptimizationForm;
