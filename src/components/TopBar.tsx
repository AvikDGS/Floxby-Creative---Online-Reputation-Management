import { Bell, ChevronDown, Search } from 'lucide-react';

export function TopBar() {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-[#0E0E10] border-b border-panel-border z-10 sticky top-0">
      <div className="flex items-center gap-4 flex-1">
        <div className="px-4 py-2 bg-[#1A1A1C] border border-[#333] rounded-lg flex items-center gap-3 cursor-pointer hover:bg-[#222] transition-colors">
          <span className="text-sm font-medium">Floxby Global</span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[#1D9E75] rounded-full ring-2 ring-[#0E0E10]"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-[#1D9E75] text-black flex items-center justify-center font-bold text-xs shadow-[0_0_15px_rgba(29,158,117,0.3)]">
          JD
        </div>
      </div>
    </header>
  );
}
