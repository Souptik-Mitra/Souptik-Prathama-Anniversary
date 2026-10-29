import React, { useState } from 'react';
import type { PhotoEntry } from '../types/scrapbook';
import { Heart, Trash2, Calendar, ZoomIn, Download, Check, Loader2 } from 'lucide-react';

interface PhotoCardProps {
  photo: PhotoEntry;
  onOpen: () => void;
  onLike: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload: (photo: PhotoEntry) => Promise<void>;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onOpen,
  onLike,
  onDelete,
  onDownload,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const isUploaded = photo.category === 'uploaded' || !photo.isPlaceholder;

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadSuccess(false);

    try {
      await onDownload(photo);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <article
      className="polaroid-frame"
      style={{
        transform: `rotate(${photo.rotationDeg}deg)`,
      }}
      aria-label={`Photo: ${photo.caption || 'Memory'}`}
    >
      {/* Washi Tape Strip */}
      <div className={`washi-tape washi-${photo.washiStyle}`} />

      {/* Uploaded Badge if applicable */}
      {isUploaded && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            backgroundColor: 'var(--sage-soft)',
            color: 'var(--sage-main)',
            border: '1px solid var(--sage-main)',
            borderRadius: '999px',
            padding: '2px 8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            zIndex: 6,
          }}
        >
          Your Photo
        </div>
      )}

      {/* Polaroid Image Area */}
      <div
        className="polaroid-image-container"
        style={{
          cursor: 'pointer',
          aspectRatio:
            photo.aspectRatio === 'portrait'
              ? '3 / 3.8'
              : photo.aspectRatio === 'landscape'
              ? '4 / 3'
              : '1 / 1',
        }}
        onClick={onOpen}
      >
        <img
          src={photo.url}
          alt={photo.caption || 'Memory photo'}
          loading="lazy"
        />

        {/* Hover Zoom Overlay Icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(43, 35, 32, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
          className="zoom-overlay"
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#FFFDF9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ink-primary)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }}
          >
            <ZoomIn size={20} />
          </div>
        </div>

        {/* Hover Quick Download Button on Polaroid Corner */}
        <button
          onClick={handleDownloadClick}
          aria-label="Download this photo"
          title="Download photo"
          className="photo-download-hover-badge"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            backgroundColor: 'rgba(255, 253, 249, 0.92)',
            backdropFilter: 'blur(4px)',
            color: 'var(--ink-primary)',
            border: '1px solid rgba(138, 114, 98, 0.3)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 3px 8px rgba(0,0,0,0.18)',
            zIndex: 8,
          }}
        >
          {isDownloading ? (
            <Loader2 size={15} style={{ animation: 'spin 1s infinite linear' }} />
          ) : downloadSuccess ? (
            <Check size={15} color="var(--sage-main)" />
          ) : (
            <Download size={15} />
          )}
        </button>
      </div>

      {/* Optional Caption (Hidden when empty so scrapbook is pure photos, no quotes) */}
      {photo.caption ? (
        <p className="polaroid-caption" title={photo.caption}>
          {photo.caption}
        </p>
      ) : null}

      {/* Bottom Metadata & Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '8px',
          borderTop: '1px dashed rgba(212, 188, 168, 0.45)',
          marginTop: '6px',
          fontSize: '0.8rem',
          color: 'var(--ink-muted)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {photo.date && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Calendar size={12} />
              <span>{photo.date}</span>
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Elegant Download Button in Bottom Bar */}
          <button
            onClick={handleDownloadClick}
            aria-label="Download photo"
            title="Download photo to your device"
            className="photo-download-btn"
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: downloadSuccess ? 'var(--sage-main)' : 'var(--ink-secondary)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 500,
              padding: '2px 6px',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
          >
            {isDownloading ? (
              <Loader2 size={14} style={{ animation: 'spin 1s infinite linear' }} />
            ) : downloadSuccess ? (
              <>
                <Check size={14} color="var(--sage-main)" />
                <span style={{ color: 'var(--sage-main)', fontSize: '0.78rem' }}>Saved</span>
              </>
            ) : (
              <>
                <Download size={14} />
                <span className="download-label" style={{ fontSize: '0.78rem' }}>Save</span>
              </>
            )}
          </button>

          {/* Like Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike(photo.id);
            }}
            aria-label={`Like photo. Currently ${photo.likes} likes`}
            style={{
              background: 'none',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: photo.likes > 0 ? 'var(--rose-main)' : 'var(--ink-muted)',
              cursor: 'pointer',
              fontSize: '0.82rem',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '6px',
              transition: 'transform 0.15s ease',
            }}
            onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(1.25)')}
            onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Heart
              size={14}
              fill={photo.likes > 0 ? 'var(--rose-main)' : 'transparent'}
            />
            <span>{photo.likes}</span>
          </button>

          {/* Delete Button for user-uploaded photos */}
          {isUploaded && onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(photo.id);
              }}
              aria-label="Delete this photo"
              title="Delete this photo"
              style={{
                background: 'none',
                border: 'none',
                color: '#A85D5D',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C92A2A')}
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>

      <style>{`
        .polaroid-frame:hover .zoom-overlay {
          opacity: 1 !important;
        }
        @media (min-width: 768px) {
          .photo-download-hover-badge {
            opacity: 0;
            transform: translateY(4px);
            transition: all 0.2s ease;
          }
          .polaroid-frame:hover .photo-download-hover-badge {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
        @media (max-width: 767px) {
          .photo-download-hover-badge {
            display: none !important;
          }
        }
      `}</style>
    </article>
  );
};
