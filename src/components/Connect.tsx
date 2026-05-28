import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Link as LinkIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const integrations = [
  {
    id: 'facebook',
    name: 'Facebook Page',
    icon: 'f',
    color: 'bg-[#1877F2]'
  },
  {
    id: 'instagram',
    name: 'Instagram Business',
    icon: 'ig',
    color: 'bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]'
  },
  {
    id: 'x',
    name: 'Connect X',
    icon: '𝕏',
    color: 'bg-black border border-[#333]'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'in',
    color: 'bg-[#0A66C2]'
  }
];

export function Connect() {
  const navigate = useNavigate();
  const [connected, setConnected] = useState<Record<string, boolean>>({
    facebook: !!localStorage.getItem('facebook_token'),
    instagram: !!localStorage.getItem('instagram_token'),
    x: !!localStorage.getItem('x_token'),
    linkedin: false,
  });
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleConnect = async (id: string) => {
    if (id !== 'facebook' && id !== 'instagram' && id !== 'x') {
      setLoadingId(id);
      setTimeout(() => {
        setConnected(prev => ({ ...prev, [id]: true }));
        setLoadingId(null);
      }, 1500);
      return;
    }

    setLoadingId(id);
    
    if (id === 'facebook') {
      const facebookAuthUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${import.meta.env.VITE_FACEBOOK_APP_ID}&redirect_uri=${window.location.origin}/auth/callback/facebook&scope=pages_read_engagement,pages_manage_posts,pages_read_user_content,pages_manage_engagement&response_type=code`;
      window.location.href = facebookAuthUrl;
    } else if (id === 'instagram') {
      const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=${import.meta.env.VITE_INSTAGRAM_APP_ID}&redirect_uri=${window.location.origin}/auth/callback/instagram&scope=instagram_basic,instagram_manage_comments&response_type=code`;
      window.location.href = instagramAuthUrl;
    } else if (id === 'x') {
      // X OAuth 2.0 PKCE requires code_challenge. We use a simple static string for simulation/testing, 
      // but in production it should be a dynamically generated PCKE challenge.
      const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${import.meta.env.VITE_X_CLIENT_ID}&redirect_uri=${window.location.origin}/auth/callback/x&scope=tweet.read%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;
      window.location.href = xAuthUrl;
    }
  };

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4 relative overflow-hidden text-gray-100 font-sans selection:bg-brand/30">
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-brand opacity-5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-panel border border-panel-border rounded-3xl p-8 shadow-sm relative overflow-hidden"
        >
          <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center mb-6">
            <LinkIcon className="w-6 h-6 text-brand" />
          </div>

          <h2 className="text-xl font-bold mb-2 text-white">
            Connect your sources
          </h2>
          <p className="text-sm text-gray-400 mb-8 leading-relaxed">
            Connect your brand channels to start monitoring mentions and sentiment across the web. We also automatically scan public sources like Reddit and Google News.
          </p>

          <div className="space-y-3 mb-8">
            {integrations.map(integration => {
              const isConnected = connected[integration.id];
              const isLoading = loadingId === integration.id;
              
              return (
                <div key={integration.id} className="flex items-center justify-between p-4 bg-[#0A0A0B] border border-panel-border rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${integration.color} flex items-center justify-center text-xs font-bold text-white`}>
                      {integration.icon}
                    </div>
                    <span className="font-semibold text-sm">{integration.name}</span>
                  </div>

                  <button
                    onClick={() => handleConnect(integration.id)}
                    disabled={isConnected || isLoading}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2 ${
                      isConnected 
                        ? 'bg-brand/10 text-brand' 
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    ) : isConnected ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Connected
                      </>
                    ) : (
                      'Connect'
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {Object.values(connected).some(Boolean) && (
            <button 
              onClick={handleContinue}
              className="w-full py-3 bg-brand hover:bg-brand-hover text-black rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              Continue to Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
