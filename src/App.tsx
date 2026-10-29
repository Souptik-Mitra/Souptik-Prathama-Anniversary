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

import { Navbar } from './components/Navbar';
import { CoverHero } from './components/CoverHero';
import { ScrapbookGallery } from './components/ScrapbookGallery';
import { ClosingMessage } from './components/ClosingMessage';
import { PhotoLightbox } from './components/PhotoLightbox';
import { PhotoUploaderModal } from './components/PhotoUploaderModal';
import { ConfirmDeleteModal } from './components/ConfirmDeleteModal';
import { Phase2GuideModal } from './components/Phase2GuideModal';

export const App: React.FC = () => {
  const [profile] = useState<ScrapbookProfile>(initialProfile);
  const [photos, setPhotos] = useState<PhotoEntry[]>(allScrapbookPhotos);
  const [storageStatus] = useState(getStorageStatus());

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

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

  return (
    <div className="scrapbook-app-root">
      {/* Navigation Header */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
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
