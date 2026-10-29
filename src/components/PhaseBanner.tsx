import React from 'react';
import { Info, BookCheck } from 'lucide-react';
import type { StorageStatus } from '../services/storageService';

interface PhaseBannerProps {
  storageStatus: StorageStatus;
  onOpenChecklist: () => void;
}

export const PhaseBanner: React.FC<PhaseBannerProps> = ({
  storageStatus,
  onOpenChecklist,
}) => {
  return (
    <aside
      aria-label="Phase 1 notification"
      style={{
        background: 'linear-gradient(90deg, #FBF0E4 0%, #F5E8E4 50%, #FAF0EE 100%)',
        borderBottom: '1px solid rgba(212, 122, 131, 0.25)',
        padding: '10px 16px',
        position: 'relative',
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.88rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-primary)' }}>
          <span
            style={{
              display: 'inline-flex',
              padding: '2px 8px',
              borderRadius: '999px',
              background: 'var(--rose-main)',
              color: '#FFF',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.5px',
            }}
          >
            PHASE 1
          </span>
          <span style={{ fontWeight: 600 }}>Visual Layout Preview</span>
          <span style={{ color: 'var(--ink-secondary)' }} className="banner-desc">
            — Featuring neutral sample entries & placeholder polaroids. Real photos will be added in Phase 2!
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Storage Status Tag */}
          <div
            title={storageStatus.description}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 10px',
              borderRadius: '999px',
              background: 'rgba(200, 155, 89, 0.18)',
              border: '1px solid rgba(200, 155, 89, 0.35)',
              color: '#7A5222',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'help',
            }}
          >
            <Info size={13} />
            <span>{storageStatus.statusLabel}</span>
          </div>

          {/* Phase 2 Checklist Button */}
          <button
            onClick={onOpenChecklist}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 12px',
              borderRadius: '999px',
              background: '#FFFDF9',
              border: '1px solid rgba(212, 122, 131, 0.35)',
              color: 'var(--rose-deep)',
              fontWeight: 600,
              fontSize: '0.8rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--rose-blush)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFDF9';
            }}
          >
            <BookCheck size={14} />
            <span>Phase 2 Checklist</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
