
import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js';

export type User = SupabaseUser;
export type Session = SupabaseSession;

export interface Resume {
  id: string;
  title: string;
}

export interface Job {
    id: string;
}

export interface OptimizationResult {
  id: string;
  score: number;
  missingKeywords: string[];
  coveredKeywords: string[];
  changeLog: string[];
  previewMarkdown: string;
}

export interface ToastMessage {
    message: string;
    type: 'success' | 'error';
}

export interface JobQueueItem {
  id: string;
  title: string;
  status: 'processing' | 'complete';
  result: OptimizationResult | null;
  metadata?: {
    company?: string;
    contentLanguage?: 'en' | 'ar';
  };
}
