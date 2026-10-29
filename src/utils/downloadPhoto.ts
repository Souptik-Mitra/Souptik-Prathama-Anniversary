import type { PhotoEntry } from '../types/scrapbook';

/**
 * Creates a clean, sensible filename for the downloaded photo.
 * Examples: `souptik-prathama-memory-1.jpg` or `souptik-prathama-our-first-date.jpg`
 */
export function generateDownloadFilename(photo: PhotoEntry, index?: number): string {
  if (photo.caption && photo.caption.trim()) {
    const slug = photo.caption
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);
    if (slug) {
      return `souptik-prathama-${slug}.jpg`;
    }
  }

  // Extract number from url if it matches /photos/X.jpeg
  const match = photo.url.match(/\/photos\/([0-9]+)\./i);
  if (match && match[1]) {
    return `souptik-prathama-memory-${match[1]}.jpg`;
  }

  const num = typeof index === 'number' ? index + 1 : photo.id.replace(/\D/g, '') || 'photo';
  return `souptik-prathama-memory-${num}.jpg`;
}

/**
 * Downloads an individual photo to the user's device.
 * Handles server-side authorized downloads, base64 data URLs, and remote URLs.
 */
export async function downloadPhoto(photo: PhotoEntry, index?: number): Promise<void> {
  const filename = generateDownloadFilename(photo, index);

  try {
    // Case 1: Data URL (e.g. freshly uploaded photo in local storage)
    if (photo.url.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = photo.url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    // Case 2: Local photo served by scrapbook (e.g. /photos/1.jpeg)
    if (photo.url.startsWith('/photos/')) {
      const photoName = photo.url.replace('/photos/', '');
      const downloadEndpoint = `/api/download/${encodeURIComponent(photoName)}?filename=${encodeURIComponent(filename)}`;

      // Use fetch to check authorized response first
      const res = await fetch(downloadEndpoint);
      if (!res.ok) {
        throw new Error(`Download failed with status ${res.status}`);
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
      return;
    }

    // Case 3: Remote photo URL (handle CORS safely by downloading blob)
    const res = await fetch(photo.url, { mode: 'cors' });
    if (!res.ok) {
      throw new Error(`Could not fetch photo (${res.status})`);
    }

    const blob = await res.blob();
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  } catch (err) {
    console.error('Failed to download photo:', err);
    throw new Error('Could not download this photo. Please try again.');
  }
}
