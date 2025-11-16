
import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import type { Session } from './types';
import AuthPage from './pages/AuthPage';
import AppPage from './pages/AppPage';
import { Spinner } from './components/ui/Spinner';

// Mock session for development/UI review
const mockSession: Session = {
  access_token: 'mock-token',
  token_type: 'bearer',
  user: {
    id: 'mock-user-id',
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: new Date().toISOString(),
  },
  // Add other required Session properties with mock values if needed
  expires_in: 3600,
  refresh_token: 'mock-refresh-token',
  expires_at: Math.floor(Date.now() / 1000) + 3600,
};


const App: React.FC = () => {
  // const [session, setSession] = useState<Session | null>(null);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //     setLoading(false);
  //   });

  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-slate-50">
  //       <Spinner />
  //     </div>
  //   );
  // }
  
  // --- DEVELOPMENT ONLY: Force AppPage render ---
  // To see the AuthPage, comment out the line below and uncomment the original logic.
  return <AppPage key={mockSession.user.id} session={mockSession} />;

  /* --- ORIGINAL LOGIC ---
  return (
    <div className="min-h-screen bg-gray-900 text-slate-200">
      {!session ? <AuthPage /> : <AppPage key={session.user.id} session={session} />}
    </div>
  );
  */
};

export default App;