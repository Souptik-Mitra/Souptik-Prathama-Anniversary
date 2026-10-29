import React, { useState, useEffect } from 'react';
import { initialProfile } from './data/sampleContent';
import { allScrapbookPhotos } from './data/scrapbookPhotos';
import type { PhotoEntry, ScrapbookProfile } from './types/scrapbook';
import {
  getStorageStatus,
  loadUserPhotos,
  deleteUserPhoto,
} from './services/storageService';
import { downloadPhoto } from './utils/downloadPhoto';

import { LoginPage } from './components/LoginPage';
import { Navbar } from './components/Navbar';
import { CoverHero } from './components/CoverHero';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { ClosingMessage } from './components/ClosingMessage';
import { PhotoLightbox } from './components/PhotoLightbox';
import { PhotoUploaderModal } from './components/PhotoUploaderModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Phase2GuideModal } from './components/Phase2GuideModal';
import { Heart, Loader2 } from 'lucide-react';

export const App: React.FC = () => {
  const [profile] = useState<ScrapbookProfile>(initialProfile);
  const [photos, setPhotos] = useState<PhotoEntry[]>(allScrapbookPhotos);
  const [storageStatus] = useState(getStorageStatus());

  // Authentication state
  const [authStatus, setAuthStatus] = useState<'checking' | 'unauthenticated' | 'authenticated'>('checking');

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Check server-side session authentication on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (res.ok) {
          setAuthStatus('authenticated');
        } else {
          setAuthStatus('unauthenticated');
        }
      })
      .catch(() => {
        setAuthStatus('unauthenticated');
      });
  }, []);

  // Load photos: combine any stored user uploads with all 58 scrapbook photos
  useEffect(() => {
    const userStored = loadUserPhotos();
    setPhotos([...userStored, ...allScrapbookPhotos]);
  }, []);

  // Handle Photo Likes
  const handleLikePhoto = (id: string) => {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, likes: photo.likes + 1 } : photo
      )
    );
  };

  // Handle Photo Download
  const handleDownloadPhoto = async (photo: PhotoEntry) => {
    const index = photos.findIndex((p) => p.id === photo.id);
    await downloadPhoto(photo, index !== -1 ? index : undefined);
  };

  // Handle New Photo Added from Uploader
  const handlePhotoAdded = (newPhoto: PhotoEntry) => {
    setPhotos((prev) => [newPhoto, ...prev]);
  };

  // Handle Delete Confirmation Request
  const handleDeleteRequest = (id: string) => {
    setDeleteTargetId(id);
  };

  // Confirm and Execute Deletion
  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    try {
      await deleteUserPhoto(deleteTargetId);
      setPhotos((prev) => prev.filter((p) => p.id !== deleteTargetId));
      if (lightboxIndex !== null) {
        setLightboxIndex(null);
      }
    } catch (err) {
      console.error('Failed to delete photo:', err);
    } finally {
      setDeleteTargetId(null);
    }
  };

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { method: 'POST' });
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setAuthStatus('unauthenticated');
    }
  };

  // 1. Initial Authentication Checking Screen
  if (authStatus === 'checking') {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-cream)',
          color: 'var(--ink-primary)',
          gap: '16px',
        }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--rose-blush)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--rose-main)',
            boxShadow: '0 4px 12px rgba(212, 122, 131, 0.25)',
          }}
        >
          <Heart size={26} fill="var(--rose-main)" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--ink-secondary)', fontSize: '0.95rem' }}>
          <Loader2 size={18} style={{ animation: 'spin 1s infinite linear' }} />
          <span>Opening our scrapbook...</span>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated Screen -> Show Romantic Login Page
  if (authStatus === 'unauthenticated') {
    return <LoginPage onLoginSuccess={() => setAuthStatus('authenticated')} />;
  }

  // 3. Authenticated -> Show Full Personalized Scrapbook
  return (
    <div className="scrapbook-app-root">
      {/* Navigation Header with Logout & Brand */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main>
        {/* Opening Album Cover: Souptik ❤️ Prathama — 1st November */}
        <CoverHero profile={profile} />

        {/* Pure Photo Scrapbook Gallery with individual download buttons */}
        <ScrapbookGallery
          photos={photos}
          onOpenPhoto={(idx) => setLightboxIndex(idx)}
          onLikePhoto={handleLikePhoto}
          onDeletePhoto={handleDeleteRequest}
          onOpenUpload={() => setIsUploadOpen(true)}
          onDownload={handleDownloadPhoto}
        />

        {/* Closing Anniversary Celebration */}
        <ClosingMessage
          profile={profile}
          onOpenChecklist={() => setIsChecklistOpen(true)}
        />
      </main>

      {/* Photo Lightbox Modal with Download control */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
          onLike={handleLikePhoto}
          onDownload={handleDownloadPhoto}
        />
      )}

      {/* Photo Upload Modal */}
      <PhotoUploaderModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        storageStatus={storageStatus}
        onPhotoAdded={handlePhotoAdded}
      />

      {/* Confirm Deletion Modal */}
      <ConfirmDeleteModal
        isOpen={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Personalization Guide Modal */}
      <Phase2GuideModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};

export default App;
