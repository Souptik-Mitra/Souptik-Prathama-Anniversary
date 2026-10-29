import React from 'react';
import { Heart, Sparkles, Calendar, BookHeart } from 'lucide-react';
import type { ScrapbookProfile } from '../types/scrapbook';

interface CoverHeroProps {
  profile: ScrapbookProfile;
}

export const CoverHero: React.FC<CoverHeroProps> = ({ profile }) => {
  const handleScrollToScrapbook = () => {
    const el = document.getElementById('scrapbook');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="cover"
      aria-label="Scrapbook Album Cover"
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '50px 20px 80px 20px',
        overflow: 'hidden',
      }}
    >
      {/* Decorative Floating Hearts (Gentle CSS animation) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: '12%',
            left: '8%',
            color: 'var(--rose-soft)',
            opacity: 0.45,
            fontSize: '1.8rem',
            animation: 'floatGentle 6s infinite ease-in-out',
          }}
        >
          ♥
        </span>
        <span
          style={{
            position: 'absolute',
            top: '25%',
            right: '10%',
            color: 'var(--gold-antique)',
            opacity: 0.35,
            fontSize: '1.4rem',
            animation: 'floatGentle 8s infinite ease-in-out 1s',
          }}
        >
          ✦
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '22%',
            left: '12%',
            color: 'var(--rose-main)',
            opacity: 0.35,
            fontSize: '2rem',
            animation: 'floatGentle 7s infinite ease-in-out 2s',
          }}
        >
          ♥
        </span>
        <span
          style={{
            position: 'absolute',
            bottom: '18%',
            right: '14%',
            color: 'var(--sage-main)',
            opacity: 0.4,
            fontSize: '1.5rem',
            animation: 'floatGentle 9s infinite ease-in-out 1.5s',
          }}
        >
          ✿
        </span>
      </div>

      {/* Main Scrapbook Cover Book / Card */}
      <div
        className="scrapbook-cover-card"
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '780px',
          width: '100%',
          backgroundColor: '#FFFDF9',
          borderRadius: '24px',
          padding: '54px 44px',
          boxShadow:
            '0 25px 60px -15px rgba(65, 42, 32, 0.16), 0 0 0 1px rgba(212, 188, 168, 0.45)',
          border: '10px solid #F6EEE2',
          textAlign: 'center',
        }}
      >
        {/* Scrapbook Top Washi Tape */}
        <div
          className="washi-tape washi-blush"
          style={{
            top: '-20px',
            width: '150px',
            height: '34px',
          }}
        />

        {/* Top Postmark / Stamp Tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <div className="postage-stamp">
            <Calendar size={13} style={{ color: 'var(--rose-main)' }} />
            <span>{profile.anniversaryDate}</span>
          </div>

          <div
            className="postage-stamp"
            style={{
              borderColor: 'var(--gold-antique)',
              backgroundColor: '#FFFDF4',
            }}
          >
            <Sparkles size={13} style={{ color: 'var(--gold-antique)' }} />
            <span>365 Days of Memories</span>
          </div>
        </div>

        {/* Scrapbook Title */}
        <h1
          style={{
            fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
            color: 'var(--ink-primary)',
            letterSpacing: '-0.5px',
            marginBottom: '14px',
            lineHeight: 1.15,
          }}
        >
          {profile.coverTitle}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
            fontFamily: 'var(--font-hand)',
            color: 'var(--ink-secondary)',
            fontWeight: 600,
            maxWidth: '560px',
            margin: '0 auto 30px auto',
            lineHeight: 1.4,
          }}
        >
          “{profile.coverSubtitle}”
        </p>

        {/* Couple Tag Box (Highlighted as Phase 1 Placeholder) */}
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px 28px',
            borderRadius: '16px',
            background: 'linear-gradient(145deg, #FAF4EB 0%, #F4ECE0 100%)',
            border: '1px dashed #D2C0AD',
            margin: '0 auto 36px auto',
            maxWidth: '100%',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 3vw, 1.7rem)',
              color: 'var(--rose-deep)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <span>{profile.partner2}</span>
            <Heart size={20} fill="var(--rose-main)" color="var(--rose-main)" />
            <span>{profile.partner1}</span>
          </div>
          <span
            style={{
              fontSize: '0.86rem',
              color: 'var(--ink-secondary)',
              marginTop: '4px',
              fontFamily: 'var(--font-hand)',
              fontWeight: 600,
              letterSpacing: '0.3px',
            }}
          >
            Our First Anniversary • 1st November
          </span>
        </div>

        {/* Action Button: "Open our scrapbook" */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <button
            onClick={handleScrollToScrapbook}
            className="btn-scrapbook-primary"
            style={{
              padding: '16px 36px',
              fontSize: '1.15rem',
            }}
          >
            <BookHeart size={22} />
            <span>Open Our Scrapbook</span>
          </button>

          <span
            style={{
              fontFamily: 'var(--font-hand)',
              fontSize: '1.25rem',
              color: 'var(--rose-deep)',
              fontWeight: 600,
            }}
          >
            Turn the page to see our year together ↓
          </span>
        </div>

        {/* Wax Seal Stamp in bottom right corner */}
        <div
          style={{
            position: 'absolute',
            bottom: '-24px',
            right: '28px',
            zIndex: 10,
          }}
        >
          <div className="wax-seal" title="1st Anniversary Seal">
            1st
          </div>
        </div>
      </div>
    </section>
  );
};
