import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CompetitorChart } from './CompetitorChart';
import { MentionsFeed } from './MentionsFeed';

const metrics = [
  {
    id: 'sentiment',
    label: 'Sentiment Score',
    value: '78%',
    change: '+5.2%',
    subtext: 'Predominantly positive',
    valueColor: 'text-[#1D9E75]',
    hasCircleBg: true,
  },
  {
    id: 'total-mentions',
    label: 'Total Mentions',
    value: '12,482',
    hasProgressBar: true,
  },
  {
    id: 'negative-alerts',
    label: 'Negative Alerts',
    value: '14',
    subtext: 'Action required',
    valueColor: 'text-red-500',
    subtextColor: 'text-red-500/60 uppercase font-bold tracking-tighter',
  },
  {
    id: 'competitor',
    label: 'Competitors',
    value: '4,102',
    subtext: 'Share of voice: 22%',
  }
];

export function Dashboard() {
  const [connected, setConnected] = useState<string[]>([]);
  
  useEffect(() => {
    const list: string[] = [];
    if (localStorage.getItem('facebook_token')) list.push('Facebook');
    if (localStorage.getItem('instagram_token')) list.push('Instagram');
    if (localStorage.getItem('x_token')) list.push('X');
    setConnected(list);
  }, []);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      <header className="mb-0 flex justify-between items-end">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-white mb-1"
          >
            Reputation Overview
          </motion.h1>
          {connected.length > 0 && (
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-2">
              Connected: {connected.join(' • ')}
            </p>
          )}
        </div>
      </header>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            className="p-6 bg-panel rounded-3xl border border-panel-border relative overflow-hidden"
          >
            {metric.hasCircleBg && (
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-[#1D9E75] opacity-5 rounded-full"></div>
            )}
            
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">{metric.label}</p>
            
            {metric.change ? (
              <div className="flex items-end gap-2">
                <p className={`text-4xl font-bold ${metric.valueColor || 'text-white'}`}>{metric.value}</p>
                <span className="text-xs text-[#1D9E75] bg-[#1D9E75]/10 px-2 py-0.5 rounded-full mb-1">{metric.change}</span>
              </div>
            ) : (
              <p className={`text-4xl font-bold ${metric.valueColor || 'text-white'}`}>{metric.value}</p>
            )}

            {metric.hasProgressBar && (
              <div className="w-full h-1 bg-[#222] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-white w-2/3"></div>
              </div>
            )}

            {metric.subtext && (
              <p className={`text-[10px] ${metric.subtextColor || 'text-gray-500 italic'} mt-2`}>
                {metric.subtext}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="mb-8">
        <div className="h-[400px] flex flex-col">
          <CompetitorChart />
        </div>
      </div>

      {/* Mentions Feed Row */}
      <div className="h-[500px]">
        <MentionsFeed />
      </div>
    </div>
  );
}
