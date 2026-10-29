import type {
  PhotoEntry,
  TimelineMilestone,
  LoveNote,
  LoveReason,
  FutureMemory,
  ScrapbookProfile,
} from '../types/scrapbook';
import { createRomanticPlaceholderSvg } from '../utils/placeholderImages';

export const initialProfile: ScrapbookProfile = {
  partner1: 'Prathama',
  partner2: 'Souptik',
  anniversaryDate: '1st November',
  coverTitle: 'Souptik ❤️ Prathama — Our Little Book of Us',
  coverSubtitle: 'A little collection of moments that mean everything.',
  isPhase1Placeholder: false,
};

export const sampleMilestones: TimelineMilestone[] = [
  {
    id: 'milestone-1',
    title: 'The Day We Met',
    date: '[ Month Year ]',
    location: '[ Location Placeholder ]',
    story:
      'A favorite memory will go here. In Phase 2, this will be your exact memory of when your paths first crossed, what you were wearing, or the first thing you talked about.',
    photoUrl: createRomanticPlaceholderSvg({
      title: 'The First Spark',
      subtitle: 'Photo placeholder: The day we met',
      theme: 'coffee',
    }),
    isPlaceholder: true,
    tag: 'Chapter 1',
    washiStyle: 'blush',
  },
  {
    id: 'milestone-2',
    title: 'Our Very First Date',
    date: '[ Month Year ]',
    location: '[ Cozy Café / Dinner Spot ]',
    story:
      'Add our story here. In Phase 2, describe the nervous butterflies, the endless conversation, and the moment you knew this was something special.',
    photoUrl: createRomanticPlaceholderSvg({
      title: 'First Date Table',
      subtitle: 'Photo placeholder: Nervous smiles & coffee',
      theme: 'fairylights',
    }),
    isPlaceholder: true,
    tag: 'Chapter 2',
    washiStyle: 'gold',
  },
  {
    id: 'milestone-3',
    title: 'Our First Adventure Away',
    date: '[ Month Year ]',
    location: '[ Road Trip / Getaway Spot ]',
    story:
      'A favorite memory will go here. Add your shared road trip playlist, getting lost along the way, or your favorite view from this adventure.',
    photoUrl: createRomanticPlaceholderSvg({
      title: 'The Open Road',
      subtitle: 'Photo placeholder: First trip together',
      theme: 'roadtrip',
    }),
    isPlaceholder: true,
    tag: 'Chapter 3',
    washiStyle: 'check',
  },
  {
    id: 'milestone-4',
    title: 'Cozy Everyday Magic',
    date: '[ Season / Month Year ]',
    location: '[ Our Favorite Quiet Corner ]',
    story:
      'Add our story here. The quiet evenings cooking together, lazy Sunday mornings, or rainy days watching movies tucked under blankets.',
    photoUrl: createRomanticPlaceholderSvg({
      title: 'Rainy Day Cocoon',
      subtitle: 'Photo placeholder: Cozy afternoons',
      theme: 'rainy',
    }),
    isPlaceholder: true,
    tag: 'Chapter 4',
    washiStyle: 'sage',
  },
  {
    id: 'milestone-5',
    title: 'One Year of Love & Laughs',
    date: '[ Anniversary Date ]',
    location: '[ 365 Days Together ]',
    story:
      '365 days of being best friends, teammates, and each other’s favorite person. In Phase 2, celebrate the biggest takeaway from your first year.',
    photoUrl: createRomanticPlaceholderSvg({
      title: 'One Year Together',
      subtitle: 'Photo placeholder: 365 Days of Us',
      theme: 'sunset',
    }),
    isPlaceholder: true,
    tag: 'Anniversary',
    washiStyle: 'kraft',
  },
];

export const samplePhotos: PhotoEntry[] = [
  {
    id: 'photo-1',
    url: createRomanticPlaceholderSvg({
      title: 'Golden Hour Together',
      subtitle: 'Photo placeholder • Sunset stroll',
      theme: 'sunset',
    }),
    caption: 'A favorite memory goes here — "Golden hour walks with you"',
    date: '[ Date Placeholder ]',
    location: '[ Sunset Viewpoint ]',
    category: 'dates',
    likes: 12,
    isPlaceholder: true,
    rotationDeg: -2.2,
    washiStyle: 'blush',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-2',
    url: createRomanticPlaceholderSvg({
      title: 'Quiet Coffee Morning',
      subtitle: 'Photo placeholder • Warm mugs & laughter',
      theme: 'coffee',
    }),
    caption: 'Add a memory caption here — "That cozy Sunday morning"',
    date: '[ Date Placeholder ]',
    location: '[ Our Little Café ]',
    category: 'everyday',
    likes: 9,
    isPlaceholder: true,
    rotationDeg: 1.8,
    washiStyle: 'gold',
    aspectRatio: 'square',
  },
  {
    id: 'photo-3',
    url: createRomanticPlaceholderSvg({
      title: 'Stargazing On The Hill',
      subtitle: 'Photo placeholder • Midnight sky',
      theme: 'stars',
    }),
    caption: 'A note for you — "Under a billion stars, my favorite was you"',
    date: '[ Date Placeholder ]',
    location: '[ Quiet Countryside ]',
    category: 'adventures',
    likes: 16,
    isPlaceholder: true,
    rotationDeg: -1.4,
    washiStyle: 'kraft',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-4',
    url: createRomanticPlaceholderSvg({
      title: 'Twinkling Fairy Lights',
      subtitle: 'Photo placeholder • Evening celebration',
      theme: 'fairylights',
    }),
    caption: 'Add our story here — "Dinner by the warm lights"',
    date: '[ Date Placeholder ]',
    location: '[ Garden Patio ]',
    category: 'dates',
    likes: 14,
    isPlaceholder: true,
    rotationDeg: 2.5,
    washiStyle: 'check',
    aspectRatio: 'square',
  },
  {
    id: 'photo-5',
    url: createRomanticPlaceholderSvg({
      title: 'Road Trip Scenic Route',
      subtitle: 'Photo placeholder • Highway horizon',
      theme: 'roadtrip',
    }),
    caption: 'A favorite memory goes here — "Windows down and music up"',
    date: '[ Date Placeholder ]',
    location: '[ Coastal Highway ]',
    category: 'adventures',
    likes: 11,
    isPlaceholder: true,
    rotationDeg: -2.8,
    washiStyle: 'sage',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-6',
    url: createRomanticPlaceholderSvg({
      title: 'Afternoon In The Park',
      subtitle: 'Photo placeholder • Cherry blossom petals',
      theme: 'park',
    }),
    caption: 'Add our story here — "Picnics, snacks, and sweet talks"',
    date: '[ Date Placeholder ]',
    location: '[ Botanical Gardens ]',
    category: 'everyday',
    likes: 15,
    isPlaceholder: true,
    rotationDeg: 1.2,
    washiStyle: 'blush',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-7',
    url: createRomanticPlaceholderSvg({
      title: 'Bayside Shell Collecting',
      subtitle: 'Photo placeholder • Ocean breeze',
      theme: 'seaside',
    }),
    caption: 'A favorite memory goes here — "Finding seashells and watching the tide"',
    date: '[ Date Placeholder ]',
    location: '[ Sandy Cove ]',
    category: 'adventures',
    likes: 10,
    isPlaceholder: true,
    rotationDeg: -1.7,
    washiStyle: 'gold',
    aspectRatio: 'square',
  },
  {
    id: 'photo-8',
    url: createRomanticPlaceholderSvg({
      title: 'Cozy Bookshop & Rain',
      subtitle: 'Photo placeholder • Rainy day refuge',
      theme: 'rainy',
    }),
    caption: 'A note for you — "Hiding from the rain in the quiet bookshop"',
    date: '[ Date Placeholder ]',
    location: '[ Downtown Books ]',
    category: 'everyday',
    likes: 13,
    isPlaceholder: true,
    rotationDeg: 2.1,
    washiStyle: 'kraft',
    aspectRatio: 'portrait',
  },
];

export const sampleLoveNotes: LoveNote[] = [
  {
    id: 'note-1',
    title: 'To My Favorite Person',
    preview: 'Open this note: A sample letter for Phase 1...',
    fullLetter:
      'My Dearest,\n\nThis is a sample placeholder note for Phase 1. In Phase 2, this will be replaced with your genuine handwritten message or letter celebrating your first year together.\n\nFrom the small everyday moments to the unforgettable milestones, every memory with you is treasured. Can’t wait to fill this page with your real words!\n\nForever & always,',
    date: '[ Date Placeholder ]',
    signOff: '— [ Your Sign-off ]',
    stampType: 'heart',
    paperStyle: 'cream',
    isPlaceholder: true,
  },
  {
    id: 'note-2',
    title: 'The Little Things I Cherish',
    preview: 'Open this note: Remembering the quiet little moments...',
    fullLetter:
      'Sweetheart,\n\nPhase 1 placeholder copy: It’s often the unplanned, spontaneous moments that mean the most — the shared glances across a crowded room, holding hands on a cold evening, and making each other laugh till our cheeks ache.\n\nIn Phase 2, insert the specific inside jokes and small quirks you love most about her.\n\nWith all my love,',
    date: '[ Date Placeholder ]',
    signOff: '— [ Your Nickname ]',
    stampType: 'rose',
    paperStyle: 'lined',
    isPlaceholder: true,
  },
  {
    id: 'note-3',
    title: 'Looking Forward to What’s Next',
    preview: 'Open this note: Dreams and hopes for the chapters ahead...',
    fullLetter:
      'My love,\n\nPhase 1 placeholder copy: Year one was just the opening chapter of a beautiful book. Whatever adventures, quiet weekends, or surprises come next, I am grateful to experience every chapter by your side.\n\nIn Phase 2, add your personal anniversary dedication.\n\nAlways yours,',
    date: '[ 1st Anniversary Date ]',
    signOff: '— [ Your Name ]',
    stampType: 'seal',
    paperStyle: 'kraft',
    isPlaceholder: true,
  },
];

export const sampleReasons: LoveReason[] = [
  {
    id: 'reason-1',
    number: 1,
    title: 'Your Contagious Smile',
    description:
      'Placeholder #1: The way your eyes light up whenever you are excited or truly happy.',
    iconName: 'sun',
    isPlaceholder: true,
  },
  {
    id: 'reason-2',
    number: 2,
    title: 'Our Cozy Silences',
    description:
      'Placeholder #2: How comfortable and peaceful it feels just sitting next to you without saying a word.',
    iconName: 'coffee',
    isPlaceholder: true,
  },
  {
    id: 'reason-3',
    number: 3,
    title: 'Your Kindness & Heart',
    description:
      'Placeholder #3: The gentle care and warmth you show to everyone around you.',
    iconName: 'heart',
    isPlaceholder: true,
  },
  {
    id: 'reason-4',
    number: 4,
    title: 'The Way We Laugh',
    description:
      'Placeholder #4: All the silly nicknames, secret expressions, and inside jokes only we understand.',
    iconName: 'sparkles',
    isPlaceholder: true,
  },
  {
    id: 'reason-5',
    number: 5,
    title: 'Partner In Adventure',
    description:
      'Placeholder #5: Whether traveling far or trying a new recipe at 9 PM, everything is fun with you.',
    iconName: 'compass',
    isPlaceholder: true,
  },
  {
    id: 'reason-6',
    number: 6,
    title: 'Being My Safe Harbor',
    description:
      'Placeholder #6: No matter how hectic the world gets, being with you always feels like coming home.',
    iconName: 'music',
    isPlaceholder: true,
  },
];

export const sampleFutureMemories: FutureMemory[] = [
  {
    id: 'future-1',
    title: 'More spontaneous weekend road trips with no map',
    category: 'Travel',
    iconName: 'car',
  },
  {
    id: 'future-2',
    title: 'Stargazing on a quiet blanket night',
    category: 'Dates',
    iconName: 'stars',
  },
  {
    id: 'future-3',
    title: 'Mastering our favorite dessert recipe from scratch',
    category: 'Cozy',
    iconName: 'cake',
  },
  {
    id: 'future-4',
    title: 'Filling this scrapbook with a hundred more polaroids',
    category: 'Album',
    iconName: 'camera',
  },
];
