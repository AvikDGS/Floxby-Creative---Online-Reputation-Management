import { Activity, BarChart2, Bell, LayoutDashboard, MessageSquare, Settings, Users, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { label: 'Mentions', icon: MessageSquare, id: 'mentions' },
  { label: 'Competitors', icon: Users, id: 'competitors' },
  { label: 'Reports', icon: BarChart2, id: 'reports' },
  { label: 'Settings', icon: Settings, id: 'settings' },
];

export function Sidebar() {
  const [activeId, setActiveId] = useState('dashboard');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0E0E10] border-r border-panel-border flex flex-col h-full z-10 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center text-black font-bold text-xl">
          F
        </div>
        <span className="font-bold text-lg tracking-tight text-white italic">Floxby Creative</span>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col gap-2 overflow-y-auto">
        <div className="px-3 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
          Overview
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200",
                isActive 
                  ? "bg-brand text-black font-semibold" 
                  : "text-gray-400 font-medium hover:bg-brand/10 hover:text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </button>
          );
        })}

        <div className="mt-auto pt-4">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-200 text-gray-400 font-medium hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="p-4 bg-gradient-to-br from-[#1D9E75] to-[#12664d] rounded-2xl text-black">
          <p className="text-xs font-bold uppercase tracking-wider mb-1 text-left">Pro Account</p>
          <p className="text-sm mb-3 opacity-90 text-left">You're at 82% of mention limit.</p>
          <button className="w-full py-2 bg-black text-white hover:bg-gray-900 transition-colors rounded-lg text-sm font-bold">Upgrade</button>
        </div>
      </div>
    </aside>
  );
}
