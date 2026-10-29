import React, { useState } from 'react';
import { Heart, Music, VolumeX, ImagePlus, Menu, X, BookOpen } from 'lucide-react';
import { ambientMusicPlayer } from '../utils/ambientAudio';

interface NavbarProps {
  onOpenUpload: () => void;
  onOpenChecklist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUpload,
  onOpenChecklist,
}) => {
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMusic = async () => {
    const playing = await ambientMusicPlayer.toggle();
    setIsPlayingMusic(playing);
  };

  const navLinks = [
    { label: 'Cover', href: '#cover' },
    { label: 'Scrapbook Photos', href: '#scrapbook' },
    { label: 'Celebrate', href: '#closing' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        backgroundColor: 'rgba(255, 253, 249, 0.94)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(220, 208, 195, 0.55)',
        boxShadow: '0 2px 10px rgba(50, 35, 25, 0.03)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '68px',
        }}
      >
        {/* Brand / Logo */}
        <a
          href="#cover"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            color: 'var(--ink-primary)',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'var(--rose-blush)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--rose-main)',
              border: '1px solid rgba(212, 122, 131, 0.3)',
            }}
          >
            <Heart size={18} fill="var(--rose-main)" />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 700,
                fontSize: '1.15rem',
                letterSpacing: '0.2px',
                lineHeight: 1.15,
              }}
            >
              Souptik & Prathama
            </div>
            <div
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '0.98rem',
                color: 'var(--rose-deep)',
                fontWeight: 600,
              }}
            >
              1st Anniversary • 1st November
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Scrapbook navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                textDecoration: 'none',
                color: 'var(--ink-secondary)',
                fontSize: '0.92rem',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--rose-main)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-secondary)')}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Ambient Music Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isPlayingMusic ? 'Mute ambient melody' : 'Play soft music box chime'}
            aria-label={isPlayingMusic ? 'Mute ambient melody' : 'Play soft music box chime'}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(138, 114, 98, 0.25)',
              background: isPlayingMusic ? 'var(--rose-blush)' : 'var(--bg-warm-white)',
              color: isPlayingMusic ? 'var(--rose-deep)' : 'var(--ink-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s ease',
            }}
          >
            {isPlayingMusic ? (
              <Music size={18} style={{ animation: 'floatGentle 2s infinite ease-in-out' }} />
            ) : (
              <VolumeX size={18} />
            )}
          </button>

          {/* Upload Button */}
          <button
            onClick={onOpenUpload}
            className="btn-scrapbook-primary"
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
          >
            <ImagePlus size={16} />
            <span className="upload-btn-text">Add Memory</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink-primary)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card-paper)',
            borderBottom: '1px solid rgba(220, 208, 195, 0.7)',
            padding: '16px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              style={{
                textDecoration: 'none',
                color: 'var(--ink-primary)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '6px 0',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ paddingTop: '8px', borderTop: '1px dashed #E2D5C8', display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChecklist();
              }}
              className="btn-scrapbook-secondary"
              style={{ width: '100%', fontSize: '0.88rem' }}
            >
              <BookOpen size={16} />
              Personalize
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .upload-btn-text {
            display: none;
          }
        }
        @media (min-width: 821px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
