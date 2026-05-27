import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { Connect } from './components/Connect';
import { supabase } from './lib/supabase';
import type { Session } from '@supabase/supabase-js';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-background text-gray-100 overflow-hidden font-sans selection:bg-brand/30">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden relative">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth z-0">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={!session ? <Auth /> : <Navigate to="/connect" replace />} 
        />
        <Route 
          path="/signup" 
          element={!session ? <Auth /> : <Navigate to="/connect" replace />} 
        />
        <Route 
          path="/connect" 
          element={session ? <Connect /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/dashboard" 
          element={session ? <ProtectedLayout><Dashboard /></ProtectedLayout> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={session ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
