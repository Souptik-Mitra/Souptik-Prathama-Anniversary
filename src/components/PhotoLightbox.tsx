import React, { useEffect } from 'react';
import type { PhotoEntry } from '../types/scrapbook';
import { X, ChevronLeft, ChevronRight, Calendar, MapPin, Heart, Download, Loader2 } from 'lucide-react';

interface PhotoLightboxProps {
  photos: PhotoEntry[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  onLike: (id: string) => void;
  onDownload: (photo: PhotoEntry) => Promise<void>;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
  onLike,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = React.useState(false);
  const photo = photos[currentIndex];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onNavigate((currentIndex - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        onNavigate((currentIndex + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, photos.length, onClose, onNavigate]);

  if (!isOpen || !photo) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + photos.length) % photos.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % photos.length);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Photo Lightbox"
      onClick={onClose}
      style={{
        backgroundColor: 'rgba(25, 18, 15, 0.88)',
        zIndex: 1100,
      }}
    >
      {/* Top Close Bar */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1200,
        }}
      >
        <span style={{ color: '#E2D5C8', fontSize: '0.9rem' }}>
          {currentIndex + 1} / {photos.length}
        </span>

        <button
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            color: '#FFF',
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        aria-label="Previous photo"
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 253, 249, 0.85)',
          border: 'none',
          color: 'var(--ink-primary)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 1200,
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronLeft size={28} />
      </button>

      <button
        onClick={handleNext}
        aria-label="Next photo"
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(255, 253, 249, 0.85)',
          border: 'none',
          color: 'var(--ink-primary)',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          zIndex: 1200,
          transition: 'all 0.2s ease',
        }}
      >
        <ChevronRight size={28} />
      </button>

      {/* Main Lightbox Polaroid Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '820px',
          width: '100%',
          backgroundColor: '#FFFDF9',
          padding: '24px 24px 28px 24px',
          borderRadius: '12px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxHeight: '88vh',
        }}
      >
        {/* Large Image Frame */}
        <div
          style={{
            width: '100%',
            maxHeight: '62vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1E1714',
            borderRadius: '6px',
            overflow: 'hidden',
          }}
        >
          <img
            src={photo.url}
            alt={photo.caption}
            style={{
              maxWidth: '100%',
              maxHeight: '62vh',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </div>

        {/* Caption & Info Panel */}
        <div
          style={{
            width: '100%',
            marginTop: '16px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.6rem',
                color: 'var(--ink-primary)',
                fontWeight: 600,
              }}
            >
              {photo.caption || `Photo #${currentIndex + 1}`}
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '4px',
                fontSize: '0.85rem',
                color: 'var(--ink-muted)',
              }}
            >
              {photo.date && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={13} />
                  <span>{photo.date}</span>
                </span>
              )}
              {photo.location && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} />
                  <span>{photo.location}</span>
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Download Button */}
            <button
              onClick={async () => {
                if (isDownloading) return;
                setIsDownloading(true);
                try {
                  await onDownload(photo);
                } finally {
                  setIsDownloading(false);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(138, 114, 98, 0.3)',
                background: '#FFFDF9',
                color: 'var(--ink-primary)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isDownloading ? (
                <Loader2 size={16} style={{ animation: 'spin 1s infinite linear' }} />
              ) : (
                <Download size={16} />
              )}
              <span>{isDownloading ? 'Saving...' : 'Download'}</span>
            </button>

            {/* Like Heart Button */}
            <button
              onClick={() => onLike(photo.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid rgba(212, 122, 131, 0.4)',
                background: photo.likes > 0 ? 'var(--rose-blush)' : '#FFFDF9',
                color: 'var(--rose-deep)',
                fontWeight: 600,
                fontSize: '0.88rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Heart size={16} fill={photo.likes > 0 ? 'var(--rose-main)' : 'none'} />
              <span>{photo.likes} Likes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
