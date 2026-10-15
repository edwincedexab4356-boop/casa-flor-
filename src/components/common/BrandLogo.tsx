import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';

interface BrandLogoProps {
  className?: string;
  isScrolled?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = '' }) => {
  const { brandConfig } = useStore();
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {!imageError ? (
        <img
          src={brandConfig.logoPath}
          alt={brandConfig.brandName}
          onError={() => setImageError(true)}
          className="h-auto object-contain transition-opacity duration-300"
          style={{
            maxWidth: '100%',
            width: brandConfig.logoWidthDesktop,
          }}
        />
      ) : (
        /* Wordmark tipográfico temporal y elegante mientras se incorpora el archivo /images/casaflor-logo.png */
        <span
          className="font-editorial text-2xl md:text-3xl tracking-[0.2em] font-medium text-[#263D32] uppercase whitespace-nowrap"
          title={`${brandConfig.brandName} — Esperando logotipo en ${brandConfig.logoPath}`}
        >
          {brandConfig.brandName}
        </span>
      )}
    </div>
  );
};
