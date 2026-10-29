import type { PhotoEntry, WashiTapeStyle } from '../types/scrapbook';

const washiStyles: WashiTapeStyle[] = ['blush', 'gold', 'kraft', 'check', 'sage'];
const rotations = [-2.2, 1.5, -1.7, 2.1, -1.3, 1.8, -2.4, 1.2, -1.6, 2.0, -1.9, 1.6];
const aspectRatios: ('portrait' | 'square' | 'landscape')[] = [
  'portrait',
  'square',
  'portrait',
  'portrait',
  'square',
  'portrait',
  'landscape',
];

// All photo filenames from the Photos folder in order
const photoFileNumbers = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28,
  30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 53, 54, 55, 56, 57, 58, 59, 60,
];

export const allScrapbookPhotos: PhotoEntry[] = photoFileNumbers.map((num, idx) => ({
  id: `anniversary-photo-${num}`,
  url: `/photos/${num}.jpeg`,
  caption: '', // No quotes as requested
  likes: 0,
  isPlaceholder: false,
  rotationDeg: rotations[idx % rotations.length],
  washiStyle: washiStyles[idx % washiStyles.length],
  aspectRatio: aspectRatios[idx % aspectRatios.length],
  category: 'all',
}));
