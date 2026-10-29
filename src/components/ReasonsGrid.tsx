import React from 'react';
import type { LoveReason } from '../types/scrapbook';
import { Heart, Sun, Coffee, Sparkles, Compass, Music } from 'lucide-react';

interface ReasonsGridProps {
  reasons: LoveReason[];
}

export const ReasonsGrid: React.FC<ReasonsGridProps> = ({ reasons }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'sun':
        return <Sun size={20} color="#D97706" />;
      case 'coffee':
        return <Coffee size={20} color="#854D0E" />;
      case 'sparkles':
        return <Sparkles size={20} color="#C05621" />;
      case 'compass':
        return <Compass size={20} color="#0D9488" />;
      case 'music':
        return <Music size={20} color="#7C3AED" />;
      default:
        return <Heart size={20} color="var(--rose-main)" />;
    }
  };

  return (
    <section
      id="reasons"
      aria-label="Reasons I Love You"
      style={{
        padding: '90px 20px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '45px' }}>
          <div className="section-badge">
            <Heart size={14} fill="var(--rose-main)" />
            <span>Favorite Things</span>
          </div>
          <h2 className="section-title">Little Reasons Why I Love You</h2>
          <p className="section-subtitle">
            Just a few of the thousands of tiny reasons that make every single day with you so special.
          </p>
          <div
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '4px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(200, 155, 89, 0.15)',
              fontSize: '0.8rem',
              color: '#8A5818',
              fontWeight: 600,
            }}
          >
            💡 Phase 1 Placeholder Cards — Replace or add to these in Phase 2
          </div>
        </div>

        {/* Reasons Sticky Note Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            maxWidth: '1080px',
            margin: '0 auto',
          }}
        >
          {reasons.map((reason, idx) => {
            const rotations = [-1.5, 1.2, -0.8, 1.6, -1.2, 0.9];
            const rot = rotations[idx % rotations.length];

            return (
              <div
                key={reason.id}
                className="scrapbook-card"
                style={{
                  transform: `rotate(${rot}deg)`,
                  backgroundColor: '#FFFDF8',
                  padding: '24px',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-card)',
                  border: '1px solid rgba(220, 205, 190, 0.55)',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) rotate(0deg)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-polaroid-hover)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `rotate(${rot}deg)`;
                  e.currentTarget.style.boxShadow = 'var(--shadow-card)';
                }}
              >
                {/* Cute Paper Pin at top center */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-7px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--rose-soft)',
                    border: '2px solid #FFF',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-hand)',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      color: 'var(--rose-deep)',
                    }}
                  >
                    Reason #{reason.number}
                  </span>

                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(244, 227, 227, 0.65)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {getIcon(reason.iconName)}
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: '1.2rem',
                    color: 'var(--ink-primary)',
                    marginBottom: '8px',
                  }}
                >
                  {reason.title}
                </h3>

                <p
                  style={{
                    fontSize: '0.92rem',
                    color: 'var(--ink-secondary)',
                    lineHeight: '1.5',
                  }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
