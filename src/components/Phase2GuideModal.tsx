import React from 'react';
import { X, CheckSquare, Camera, Heart, Calendar, Shield, MessageSquareHeart } from 'lucide-react';

interface Phase2GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Phase2GuideModal: React.FC<Phase2GuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const items = [
    {
      icon: <Camera size={20} color="var(--rose-main)" />,
      title: '1. Photos of You Two',
      desc: 'Send your real photos in any format (JPG, PNG, WebP). You can send them in batches or upload them directly into the scrapbook!',
    },
    {
      icon: <Heart size={20} color="var(--rose-deep)" />,
      title: '2. Names or Nicknames',
      desc: 'The names you want displayed on the cover page and throughout the scrapbook (e.g. "Emma & James" or your personal nicknames).',
    },
    {
      icon: <Calendar size={20} color="var(--gold-antique)" />,
      title: '3. Anniversary Date & Timeline Dates',
      desc: 'The official anniversary date, plus any milestone dates you want on the timeline (when you met, first date, memorable trips, etc.).',
    },
    {
      icon: <MessageSquareHeart size={20} color="var(--rose-main)" />,
      title: '4. Captions, Inside Jokes & Love Notes',
      desc: 'Optional captions for specific photos, your personal love letters for the envelopes, or reasons why you love her.',
    },
    {
      icon: <Shield size={20} color="var(--sage-main)" />,
      title: '5. Privacy & Storage Preferences',
      desc: 'Let us know if you want the website to be public or access-protected with a simple password/PIN, and if you want Supabase/Firebase cloud storage enabled.',
    },
  ];

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phase2-guide-title"
      onClick={onClose}
    >
      <div
        className="modal-content scrapbook-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '36px' }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          <div>
            <div className="section-badge" style={{ marginBottom: '6px' }}>
              <CheckSquare size={13} />
              <span>Phase 2 Checklist</span>
            </div>
            <h3 id="phase2-guide-title" style={{ fontSize: '1.7rem', color: 'var(--ink-primary)' }}>
              How We Personalize in Phase 2
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close checklist"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink-secondary)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={22} />
          </button>
        </div>

        <p
          style={{
            fontSize: '0.94rem',
            color: 'var(--ink-secondary)',
            marginBottom: '24px',
            lineHeight: '1.5',
          }}
        >
          Phase 1 layout is ready! Whenever you are ready to transition to Phase 2, you can provide any of these items to customize the book. None are strictly required—if you only provide photos, we will build a beautiful photo-first scrapbook!
        </p>

        {/* Checklist items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 18px',
                borderRadius: '12px',
                backgroundColor: '#FAF5EE',
                border: '1px solid rgba(220, 205, 190, 0.45)',
              }}
            >
              <div style={{ marginTop: '2px', flexShrink: 0 }}>{item.icon}</div>
              <div>
                <h4 style={{ fontSize: '1rem', color: 'var(--ink-primary)', marginBottom: '4px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', lineHeight: '1.45' }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'right' }}>
          <button onClick={onClose} className="btn-scrapbook-primary" style={{ padding: '10px 24px' }}>
            Got It!
          </button>
        </div>
      </div>
    </div>
  );
};
