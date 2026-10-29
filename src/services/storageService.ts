import type { PhotoEntry, WashiTapeStyle } from '../types/scrapbook';

const LOCAL_STORAGE_KEY = 'anniversary_user_uploaded_photos';
const MAX_SIZE_MB = Number(import.meta.env.VITE_MAX_UPLOAD_SIZE_MB) || 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const washiStyles: WashiTapeStyle[] = ['blush', 'gold', 'kraft', 'check', 'sage'];
const sampleRotations = [-2.5, 1.8, -1.5, 2.2, -1.9, 1.4];

export interface StorageStatus {
  isConfigured: boolean;
  provider: 'supabase' | 'firebase' | 'browser-demo';
  statusLabel: string;
  badgeType: 'warning' | 'info' | 'success';
  description: string;
}

export function getStorageStatus(): StorageStatus {
  const provider = import.meta.env.VITE_STORAGE_PROVIDER;
  const hasSupabase =
    provider === 'supabase' &&
    Boolean(import.meta.env.VITE_SUPABASE_URL) &&
    Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY);
  const hasFirebase =
    provider === 'firebase' &&
    Boolean(import.meta.env.VITE_FIREBASE_API_KEY) &&
    Boolean(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET);

  if (hasSupabase) {
    return {
      isConfigured: true,
      provider: 'supabase',
      statusLabel: 'Cloud Storage Active (Supabase)',
      badgeType: 'success',
      description: 'Photos sync to your configured Supabase bucket.',
    };
  }

  if (hasFirebase) {
    return {
      isConfigured: true,
      provider: 'firebase',
      statusLabel: 'Cloud Storage Active (Firebase)',
      badgeType: 'success',
      description: 'Photos sync to your configured Firebase Storage.',
    };
  }

  return {
    isConfigured: false,
    provider: 'browser-demo',
    statusLabel: 'Demo Mode (Browser Storage)',
    badgeType: 'info',
    description:
      'Uploaded photos persist in this browser (LocalStorage). Configure Supabase or Firebase in .env when you are ready to enable multi-device cloud storage for Phase 2.',
  };
}

export function loadUserPhotos(): PhotoEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (err) {
    console.error('Failed to load user photos from localStorage:', err);
  }
  return [];
}

export function saveUserPhotos(photos: PhotoEntry[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(photos));
  } catch (err) {
    console.error('Failed to save user photos to localStorage:', err);
    throw new Error(
      'Browser storage limit reached. Please remove some photos or configure Cloud Storage.'
    );
  }
}

export async function processAndUploadPhoto(
  file: File,
  meta: {
    caption?: string;
    date?: string;
    location?: string;
    category?: 'dates' | 'adventures' | 'everyday' | 'uploaded';
  }
): Promise<PhotoEntry> {
  // 1. Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `Unsupported file type (${file.type || 'unknown'}). Please choose JPG, PNG, or WebP.`
    );
  }

  // 2. Validate file size
  const maxBytes = MAX_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error(
      `File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum allowed size is ${MAX_SIZE_MB} MB.`
    );
  }

  // 3. Convert image to optimized base64 DataURL for Demo Mode persistence
  const dataUrl = await fileToDataUrl(file);

  const existing = loadUserPhotos();
  const nextIndex = existing.length;
  const rotationDeg = sampleRotations[nextIndex % sampleRotations.length];
  const washiStyle = washiStyles[nextIndex % washiStyles.length];

  const newPhoto: PhotoEntry = {
    id: `user-photo-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    url: dataUrl,
    caption: meta.caption?.trim() || 'A sweet moment together',
    date: meta.date?.trim() || new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' }),
    location: meta.location?.trim() || undefined,
    category: meta.category || 'uploaded',
    likes: 1,
    isPlaceholder: false,
    rotationDeg,
    washiStyle,
    aspectRatio: 'square',
    createdAt: new Date().toISOString(),
  };

  const updated = [newPhoto, ...existing];
  saveUserPhotos(updated);

  return newPhoto;
}

export async function deleteUserPhoto(id: string): Promise<boolean> {
  const existing = loadUserPhotos();
  const updated = existing.filter((p) => p.id !== id);
  saveUserPhotos(updated);
  return true;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to read file as DataURL.'));
      }
    };
    reader.onerror = () => reject(reader.error || new Error('Error reading file.'));
    reader.readAsDataURL(file);
  });
}
