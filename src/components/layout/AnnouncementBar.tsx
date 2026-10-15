import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { X } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { brandConfig } = useStore();
  const [dismissed, setDismissed] = useState(false);

  if (!brandConfig.showAnnouncement || dismissed || !brandConfig.announcementText) {
    return null;
  }

  return (
    <div className="bg-[#263D32] text-[#F8F5EF] text-[11px] md:text-xs tracking-[0.08em] py-2 px-4 transition-all duration-300 relative z-40 border-b border-[#1A2B23]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6" /> {/* spacer for balance */}
        <p className="text-center font-normal uppercase tracking-wider flex-1 truncate px-2">
          {brandConfig.announcementText}
        </p>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#A8B5A0] hover:text-[#F8F5EF] p-0.5 rounded transition-colors focus:outline-none focus:ring-1 focus:ring-[#A8B5A0]"
          aria-label="Cerrar aviso"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};
