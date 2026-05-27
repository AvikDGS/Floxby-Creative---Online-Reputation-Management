import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname !== '/signup';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/connect');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            }
          }
        });
        if (error) throw error;
        // Depending on Supabase settings, email confirmation might be required
        navigate('/connect');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/connect`
        }
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message || 'An error occurred during Google authentication.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden text-gray-100 font-sans selection:bg-brand/30">
      {/* Background accents */}
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-brand opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-brand flex items-center justify-center text-black font-bold text-2xl shadow-[0_0_20px_rgba(29,158,117,0.4)]">
            F
          </div>
          <span className="font-bold text-2xl tracking-tight text-white italic">Floxby Creative</span>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-panel border border-panel-border rounded-3xl p-8 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand to-transparent opacity-50"></div>
          
          <h2 className="text-xl font-bold mb-1 text-white">
            {isLogin ? 'Welcome back' : 'Create an account'}
          </h2>
          <p className="text-sm text-gray-400 mb-8">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start monitoring your brand reputation today.'}
          </p>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm px-4 py-3 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Jane Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0A0A0B] border border-panel-border rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors placeholder:text-gray-600"
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Email Address</label>
              <input 
                type="email" 
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-panel-border rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors placeholder:text-gray-600"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest block">Password</label>
                {isLogin && <a href="#" className="text-xs text-brand hover:text-brand-hover">Forgot password?</a>}
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-panel-border rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors placeholder:text-gray-600"
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed text-black rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex items-center w-full gap-3">
              <div className="flex-1 h-px bg-panel-border"></div>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Or</span>
              <div className="flex-1 h-px bg-panel-border"></div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 bg-[#1A1A1C] hover:bg-[#222] border border-panel-border text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Link 
              to={isLogin ? '/signup' : '/login'}
              className="text-brand hover:text-brand-hover font-bold transition-colors focus:outline-none"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
