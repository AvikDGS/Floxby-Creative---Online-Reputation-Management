import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, MessageSquare, MonitorPlay, Sparkles, TrendingUp, X } from 'lucide-react';
import { mockMentions } from '../data';
import { Mention } from '../types';
import { clsx } from 'clsx';

function getSentimentBadge(sentiment: Mention['sentiment']) {
  switch (sentiment) {
    case 'Positive':
      return <span className="text-[10px] font-bold px-2 py-0.5 bg-[#1D9E75]/20 text-[#1D9E75] rounded uppercase">Positive</span>;
    case 'Negative':
      return <span className="text-[10px] font-bold px-2 py-0.5 bg-red-500/20 text-red-500 rounded uppercase">Negative</span>;
    default:
      return <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-500/20 text-gray-400 rounded uppercase">Neutral</span>;
  }
}

function SourceIconBadge({ source }: { source: Mention['source'] }) {
  switch (source) {
    case 'Twitter':
      return <div className="w-6 h-6 rounded-full bg-black border border-[#333] flex items-center justify-center text-[10px] font-bold">𝕏</div>;
    case 'Reddit':
      return <div className="w-6 h-6 rounded-full bg-[#FF4500] flex items-center justify-center text-[10px] font-bold text-white">r/</div>;
    case 'Instagram':
      return <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-[10px] font-bold text-white">ig</div>;
    case 'G2':
      return <div className="w-6 h-6 rounded-full bg-[#FF492C] flex items-center justify-center text-[10px] font-bold text-white">G2</div>;
    default:
      return <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-[10px] font-bold">{(source as string).substring(0, 2)}</div>;
  }
}

export function MentionsFeed() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const fetchMentions = () => {
    setLoading(true);
    const fbToken = localStorage.getItem('facebook_token') || '';
    const igToken = localStorage.getItem('instagram_token') || '';
    const xToken = localStorage.getItem('x_token') || localStorage.getItem('x_access_token') || '';
    
    fetch('/api/mentions?brand=Floxby', {
      headers: {
        'x-facebook-token': fbToken,
        'x-instagram-token': igToken,
        'x-token': xToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setMentions(data);
        } else {
          setMentions(mockMentions); // fallback
        }
      })
      .catch(err => {
        console.error('Failed to fetch mentions:', err);
        setMentions(mockMentions); // fallback
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMentions();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1 h-4 bg-[#1D9E75]"></span>
          Recent Mentions {loading && <span className="text-xs text-brand lowercase tracking-normal">(fetching...)</span>}
        </h3>
        <button 
          onClick={fetchMentions} 
          disabled={loading}
          className="text-xs font-bold px-3 py-1 bg-panel border border-panel-border rounded hover:bg-gray-800 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto w-full pr-2">
        <div className="space-y-4">
          {mentions.map((mention) => (
            <div key={mention.id} className="p-4 bg-panel border border-panel-border rounded-2xl hover:bg-[#1A1A1E] transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <SourceIconBadge source={mention.source} />
                  <span className="text-xs font-bold">{mention.authorHandle}</span>
                  <span className="text-[10px] text-gray-500 italic">{mention.timestamp}</span>
                </div>
                {getSentimentBadge(mention.sentiment)}
              </div>
              
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                {mention.content}
              </p>

              {expandedId !== mention.id && (
                <button 
                  onClick={() => toggleExpand(mention.id)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-brand hover:text-brand-hover transition-colors"
                >
                  <Sparkles className="w-3 h-3" />
                  AI Reply
                </button>
              )}

              <AnimatePresence>
                {expandedId === mention.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="overflow-hidden"
                  >
                    <div className={`bg-black/40 border ${mention.sentiment === 'Negative' ? 'border-red-500/30' : 'border-[#1D9E75]/30'} rounded-xl p-3 flex gap-3 relative`}>
                      <button 
                        onClick={() => toggleExpand(mention.id)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-white"
                      >
                         <X className="w-3 h-3" />
                      </button>
                      <Sparkles className={`w-4 h-4 shrink-0 mt-0.5 ${mention.sentiment === 'Negative' ? 'text-red-500' : 'text-[#1D9E75]'}`} />
                      <div className="text-xs text-gray-400 italic pr-6">
                        Suggested: "{mention.aiReplySuggested}"
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
