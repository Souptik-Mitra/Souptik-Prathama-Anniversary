import React, { useState, useRef } from 'react';
import {
  X,
  UploadCloud,
  Image,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
} from 'lucide-react';
import { processAndUploadPhoto } from '../services/storageService';
import type { StorageStatus } from '../services/storageService';
import type { PhotoEntry } from '../types/scrapbook';

interface PhotoUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  storageStatus: StorageStatus;
  onPhotoAdded: (photo: PhotoEntry) => void;
}

interface PreviewItem {
  file: File;
  previewUrl: string;
}

export const PhotoUploaderModal: React.FC<PhotoUploaderModalProps> = ({
  isOpen,
  onClose,
  storageStatus,
  onPhotoAdded,
}) => {
  const [selectedPreviews, setSelectedPreviews] = useState<PreviewItem[]>([]);
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState('');
  const category = 'uploaded';
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFilesSelected = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setErrorMessage(null);
    setSuccessCount(null);

    const newItems: PreviewItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrorMessage(`"${file.name}" is not a supported format. Please select JPG, PNG, or WebP.`);
        continue;
      }

      // Validate size (10 MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(`"${file.name}" exceeds the 10 MB limit.`);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      newItems.push({ file, previewUrl });
    }

    setSelectedPreviews((prev) => [...prev, ...newItems]);
  };

  const handleRemovePreview = (index: number) => {
    setSelectedPreviews((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].previewUrl);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFilesSelected(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPreviews.length === 0) {
      setErrorMessage('Please choose at least one photo to upload.');
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      let added = 0;
      for (const item of selectedPreviews) {
        const newPhoto = await processAndUploadPhoto(item.file, {
          caption: caption.trim() || undefined,
          date: date.trim() || undefined,
          category,
        });
        onPhotoAdded(newPhoto);
        added++;
      }

      setSuccessCount(added);
      // Clean up preview URLs
      selectedPreviews.forEach((item) => URL.revokeObjectURL(item.previewUrl));
      setSelectedPreviews([]);
      setCaption('');
      setDate('');

      // Auto close after brief success confirmation
      setTimeout(() => {
        onClose();
        setSuccessCount(null);
      }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setErrorMessage(msg);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    selectedPreviews.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    setSelectedPreviews([]);
    setErrorMessage(null);
    setSuccessCount(null);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
      onClick={handleClose}
    >
      <div
        className="modal-content scrapbook-card"
        onClick={(e) => e.stopPropagation()}
        style={{ padding: '32px' }}
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
            <h3 id="upload-modal-title" style={{ fontSize: '1.6rem', color: 'var(--ink-primary)' }}>
              Add a Memory
            </h3>
            <p style={{ color: 'var(--ink-secondary)', fontSize: '0.88rem' }}>
              Tape a new polaroid into your digital scrapbook
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close upload modal"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ink-secondary)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Demo Mode / Storage Explanation Banner (PRD Section 7 requirement) */}
        <div
          style={{
            padding: '12px 16px',
            borderRadius: '12px',
            backgroundColor:
              storageStatus.provider === 'browser-demo'
                ? 'rgba(200, 155, 89, 0.12)'
                : 'rgba(127, 158, 119, 0.15)',
            border:
              storageStatus.provider === 'browser-demo'
                ? '1px solid rgba(200, 155, 89, 0.35)'
                : '1px solid rgba(127, 158, 119, 0.4)',
            marginBottom: '20px',
            fontSize: '0.82rem',
            color: 'var(--ink-primary)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
          }}
        >
          <Info
            size={18}
            style={{
              color: storageStatus.provider === 'browser-demo' ? '#8A5818' : 'var(--sage-main)',
              flexShrink: 0,
              marginTop: '2px',
            }}
          />
          <div>
            <strong>{storageStatus.statusLabel}:</strong> {storageStatus.description}
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            role="alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              backgroundColor: '#FDE8E8',
              color: '#9E1C1C',
              border: '1px solid #F8B4B4',
              borderRadius: '10px',
              fontSize: '0.85rem',
              marginBottom: '16px',
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Alert */}
        {successCount !== null && (
          <div
            role="status"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 16px',
              backgroundColor: '#DEF7EC',
              color: '#03543F',
              border: '1px solid #84E1BC',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            <CheckCircle size={18} />
            <span>Successfully taped {successCount} memory to the scrapbook!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Drag & Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: isDragOver
                ? '2px dashed var(--rose-main)'
                : '2px dashed rgba(138, 114, 98, 0.35)',
              backgroundColor: isDragOver ? 'var(--rose-blush)' : '#FAF6F0',
              borderRadius: '16px',
              padding: '28px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              marginBottom: '20px',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFilesSelected(e.target.files)}
              style={{ display: 'none' }}
              aria-label="Upload photo files"
            />
            <div
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                backgroundColor: '#FFFDF9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px auto',
                color: 'var(--rose-main)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <UploadCloud size={26} />
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.98rem', color: 'var(--ink-primary)' }}>
              Click to browse or drop your photos here
            </div>
            <div style={{ color: 'var(--ink-muted)', fontSize: '0.8rem', marginTop: '4px' }}>
              Supports JPG, PNG, or WebP (up to 10 MB each)
            </div>
          </div>

          {/* Selected File Previews */}
          {selectedPreviews.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--ink-secondary)',
                  marginBottom: '10px',
                }}
              >
                Selected Photos ({selectedPreviews.length}):
              </div>
              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  paddingBottom: '8px',
                }}
              >
                {selectedPreviews.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      position: 'relative',
                      width: '84px',
                      height: '84px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid rgba(138, 114, 98, 0.25)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
                    }}
                  >
                    <img
                      src={item.previewUrl}
                      alt={`Preview ${idx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview(idx)}
                      aria-label="Remove photo"
                      style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        backgroundColor: 'rgba(0,0,0,0.65)',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Caption Input */}
          <div style={{ marginBottom: '16px' }}>
            <label
              htmlFor="photo-caption-input"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                marginBottom: '6px',
              }}
            >
              Handwritten Caption (optional)
            </label>
            <input
              id="photo-caption-input"
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g., That quiet Sunday morning coffee ☕"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(138, 114, 98, 0.3)',
                backgroundColor: '#FFFDF9',
                fontSize: '0.92rem',
                color: 'var(--ink-primary)',
              }}
            />
          </div>

          {/* Optional Date Input (Full width, uncategorized) */}
          <div style={{ marginBottom: '24px' }}>
            <label
              htmlFor="photo-date-input"
              style={{
                display: 'block',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--ink-primary)',
                marginBottom: '6px',
              }}
            >
              Date or Season (optional)
            </label>
            <input
              id="photo-date-input"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g., October 2025"
              style={{
                width: '100%',
                padding: '11px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(138, 114, 98, 0.3)',
                backgroundColor: '#FFFDF9',
                fontSize: '0.92rem',
                color: 'var(--ink-primary)',
              }}
            />
          </div>

          {/* Modal Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '12px',
              borderTop: '1px solid rgba(220, 208, 195, 0.5)',
              paddingTop: '18px',
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              disabled={isUploading}
              className="btn-scrapbook-secondary"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading || selectedPreviews.length === 0}
              className="btn-scrapbook-primary"
              style={{
                opacity: selectedPreviews.length === 0 ? 0.6 : 1,
                cursor: selectedPreviews.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {isUploading ? (
                <>
                  <Loader2 size={16} className="spin" style={{ animation: 'spin 1s infinite linear' }} />
                  <span>Taping to album...</span>
                </>
              ) : (
                <>
                  <Image size={16} />
                  <span>Tape {selectedPreviews.length > 1 ? `${selectedPreviews.length} Photos` : 'Photo'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
