import React from 'react';
import type { PhotoEntry } from '../types/scrapbook';
import { PhotoCard } from './PhotoCard';
import { Camera, ImagePlus, Heart } from 'lucide-react';

interface ScrapbookGalleryProps {
  photos: PhotoEntry[];
  onOpenPhoto: (index: number) => void;
  onLikePhoto: (id: string) => void;
  onDeletePhoto: (id: string) => void;
  onOpenUpload: () => void;
  onDownload: (photo: PhotoEntry) => Promise<void>;
}

export const ScrapbookGallery: React.FC<ScrapbookGalleryProps> = ({
  photos,
  onOpenPhoto,
  onLikePhoto,
  onDeletePhoto,
  onOpenUpload,
  onDownload,
}) => {
  return (
    <section
      id="scrapbook"
      aria-label="Photo Scrapbook Album"
      style={{
        padding: '70px 20px 100px 20px',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Title Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div className="section-badge">
            <Heart size={14} fill="var(--rose-main)" />
            <span>Our Memories</span>
          </div>
          <h2 className="section-title">Our Scrapbook Album</h2>
          <p className="section-subtitle">
            {photos.length} polaroids of us together — captured moments from our first year.
          </p>
        </div>

        {/* Gallery Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '40px',
            padding: '12px 22px',
            background: 'rgba(255, 253, 249, 0.8)',
            border: '1px solid rgba(220, 208, 195, 0.6)',
            borderRadius: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-secondary)', fontSize: '0.92rem', fontWeight: 600 }}>
            <Camera size={18} style={{ color: 'var(--rose-main)' }} />
            <span>{photos.length} Memories in Album</span>
          </div>

          <button
            onClick={onOpenUpload}
            className="btn-scrapbook-primary"
            style={{ fontSize: '0.88rem', padding: '9px 20px' }}
          >
            <ImagePlus size={16} />
            <span>Add More Photos</span>
          </button>
        </div>

        {/* Polaroid Grid Layout */}
        {photos.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#FFFDF9',
              borderRadius: '16px',
              border: '1px dashed #D2C0AD',
            }}
          >
            <Camera size={36} style={{ color: 'var(--ink-muted)', marginBottom: '12px' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>No photos in the album yet</h3>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Add your first photo to the scrapbook!
            </p>
            <button onClick={onOpenUpload} className="btn-scrapbook-primary">
              <ImagePlus size={16} />
              <span>Add a Photo</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '36px 26px',
              alignItems: 'start',
            }}
            className="polaroid-grid"
          >
            {photos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onOpen={() => onOpenPhoto(index)}
                onLike={onLikePhoto}
                onDelete={onDeletePhoto}
                onDownload={onDownload}
              />
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .polaroid-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)) !important;
            gap: 24px 16px !important;
          }
        }
      `}</style>
    </section>
  );
};
