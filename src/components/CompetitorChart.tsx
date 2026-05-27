import { motion } from 'motion/react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { mockChartData } from '../data';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-panel border border-panel-border p-3 rounded-lg shadow-xl text-sm">
        <p className="font-medium text-gray-200 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex flex-col gap-1">
            <span className="block text-xs" style={{ color: entry.color }}>
              {entry.name}: <span className="font-medium">{entry.value} mentions</span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export function CompetitorChart() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="w-1 h-4 bg-[#1D9E75]"></span>
          Competitor Comparison
        </h3>
        <select className="bg-panel border border-panel-border text-gray-400 text-[10px] font-bold uppercase tracking-wider rounded px-3 py-1.5 focus:outline-none focus:border-brand">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
        </select>
      </div>
      
      <div className="flex-1 bg-panel border border-panel-border rounded-3xl p-6 flex flex-col min-h-[250px] shadow-sm">
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 'bold' }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#6B7280', fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#1F2433' }} />
              <Bar dataKey="floxby" name="Floxby Creative" fill="#1D9E75" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="competitorA" name="Adobe" fill="#4B5563" radius={[4, 4, 0, 0]} barSize={24} />
              <Bar dataKey="competitorB" name="Canva" fill="#374151" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
}
