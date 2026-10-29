import React from 'react';
import confetti from 'canvas-confetti';
import { Heart, ArrowUp, PartyPopper } from 'lucide-react';
import type { ScrapbookProfile } from '../types/scrapbook';

interface ClosingMessageProps {
  profile: ScrapbookProfile;
  onOpenChecklist: () => void;
}

export const ClosingMessage: React.FC<ClosingMessageProps> = ({
  profile,
  onOpenChecklist,
}) => {
  const handleCelebrate = () => {
    // Romantic warm confetti burst (pinks, golds, creams, rose)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D47A83', '#E8B4B8', '#C89B59', '#FAF6F0', '#B7525E'],
    });

    // Secondary burst of little hearts/stars
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#D47A83', '#C89B59'],
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#E8B4B8', '#C89B59'],
      });
    }, 250);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="closing"
      aria-label="Closing Anniversary Note"
      style={{
        padding: '110px 20px 80px 20px',
        position: 'relative',
        backgroundColor: '#FAF5EE',
        borderTop: '1px solid rgba(220, 208, 195, 0.6)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '780px' }}>
        {/* Main Closing Scrapbook Card */}
        <div
          className="scrapbook-card"
          style={{
            backgroundColor: '#FFFDF9',
            padding: '50px 40px',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-polaroid-hover)',
            border: '2px solid rgba(212, 188, 168, 0.45)',
            position: 'relative',
          }}
        >
          {/* Top Washi Tape */}
          <div className="washi-tape washi-gold" style={{ top: '-18px', width: '140px' }} />

          {/* Heart Emblem */}
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'var(--rose-blush)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px auto',
              color: 'var(--rose-main)',
              border: '1px solid rgba(212, 122, 131, 0.3)',
            }}
          >
            <Heart size={28} fill="var(--rose-main)" />
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              color: 'var(--ink-primary)',
              marginBottom: '16px',
            }}
          >
            Happy 1st Anniversary!
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.45rem',
              color: 'var(--ink-secondary)',
              lineHeight: '1.5',
              maxWidth: '600px',
              margin: '0 auto 24px auto',
            }}
          >
            “365 days of laughter, patience, adventures, and quiet joys. Dedicated to {profile.partner2} & {profile.partner1} • {profile.anniversaryDate}. Thank you for making every day brighter just by being you.”
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '14px',
              flexWrap: 'wrap',
            }}
          >
            {/* Confetti Celebration Button */}
            <button
              onClick={handleCelebrate}
              className="btn-scrapbook-primary"
              style={{ padding: '14px 28px', fontSize: '1rem' }}
            >
              <PartyPopper size={18} />
              <span>Celebrate 1 Year! 🎉</span>
            </button>

            {/* Back to the Beginning Button */}
            <button
              onClick={handleScrollToTop}
              className="btn-scrapbook-secondary"
              style={{ padding: '13px 24px', fontSize: '0.95rem' }}
            >
              <ArrowUp size={16} />
              <span>Back to the Beginning</span>
            </button>
          </div>

          {/* Wax Seal at Bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '-24px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
            }}
          >
            <div className="wax-seal">
              ♥
            </div>
          </div>
        </div>

        {/* Footer Credits & Phase 2 Checklist Callout */}
        <div style={{ marginTop: '60px', color: 'var(--ink-muted)', fontSize: '0.88rem' }}>
          <p style={{ marginBottom: '8px' }}>
            Crafted with love for our 1st Anniversary • Ready for Phase 2 Personalization
          </p>
          <button
            onClick={onOpenChecklist}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--rose-deep)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            View Phase 2 Personalization Checklist →
          </button>
        </div>
      </div>
    </section>
  );
};
