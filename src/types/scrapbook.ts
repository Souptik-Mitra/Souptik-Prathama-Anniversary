export type PhotoCategory = 'all' | 'dates' | 'adventures' | 'everyday' | 'uploaded';

export type WashiTapeStyle = 'blush' | 'kraft' | 'gold' | 'check' | 'sage';

export interface PhotoEntry {
  id: string;
  url: string;
  caption?: string;
  date?: string;
  location?: string;
  category?: 'all' | 'dates' | 'adventures' | 'everyday' | 'uploaded';
  likes: number;
  isPlaceholder: boolean;
  rotationDeg: number;
  washiStyle: WashiTapeStyle;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
  createdAt?: string;
  note?: string;
}

export interface TimelineMilestone {
  id: string;
  title: string;
  date: string;
  location?: string;
  story: string;
  photoUrl: string;
  isPlaceholder: boolean;
  tag: string;
  washiStyle: WashiTapeStyle;
}

export interface LoveNote {
  id: string;
  title: string;
  preview: string;
  fullLetter: string;
  date: string;
  signOff: string;
  stampType: 'heart' | 'rose' | 'seal';
  paperStyle: 'cream' | 'kraft' | 'lined';
  isPlaceholder: boolean;
}

export interface LoveReason {
  id: string;
  number: number;
  title: string;
  description: string;
  iconName: 'heart' | 'coffee' | 'sparkles' | 'compass' | 'music' | 'sun';
  isPlaceholder: boolean;
}

export interface FutureMemory {
  id: string;
  title: string;
  category: string;
  iconName: string;
  isUserAdded?: boolean;
}

export interface ScrapbookProfile {
  partner1: string;
  partner2: string;
  anniversaryDate: string;
  coverTitle: string;
  coverSubtitle: string;
  isPhase1Placeholder: boolean;
}
