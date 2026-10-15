import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Check } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
      <div className="bg-[#263D32] text-[#F8F5EF] px-4 py-3 rounded-xs shadow-xl border border-[#A8B5A0]/20 flex items-center gap-3 text-xs tracking-wide">
        <div className="w-5 h-5 rounded-full bg-[#A8B5A0]/25 flex items-center justify-center text-[#F8F5EF] shrink-0">
          <Check size={12} />
        </div>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
