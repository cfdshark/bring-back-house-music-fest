export type Genre = 'all' | 'deep' | 'chicago' | 'disco' | 'acid';
export type FestivalDayFilter = 'all' | 'friday' | 'saturday' | 'sunday';

export interface Artist {
  id: string;
  name: string;
  subname?: string;
  genre: Genre;
  day?: 'friday' | 'saturday' | 'sunday';
  badge?: string;
  badgeColorKey?: 'primary' | 'secondary' | 'tertiary';
  label?: string;
  stage?: string;
  timeRange?: string;
  specialTag?: string;
  description?: string;
  image?: string;
  tier: 'headliner' | 'featured' | 'underground';
}

export interface Stage {
  id: string;
  num?: string;
  name: string;
  tagline: string;
  badge: string;
  capacity?: string;
  description: string;
  soundRig: string;
  reboundFoam?: string;
  peakBpm?: string;
  featureSpec?: string;
  vibeSignature: string;
  highlightLabel: string;
  highlightValue: string;
  iconName: string;
  accentColor: string;
}

export interface TicketPass {
  id: string;
  title: string;
  price: string;
  priceNote?: string;
  badgeText: string;
  badgeColorKey: 'tertiary' | 'secondary' | 'primary';
  subtitle: string;
  tierTag: string;
  isPopular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: 'outline' | 'gradient' | 'accent' | 'primary' | 'secondary';
}

export interface BeyondMusicFeature {
  id: string;
  category: string;
  categoryColorKey: 'secondary' | 'primary' | 'tertiary';
  title: string;
  description: string;
  imageUrl: string;
}

export interface CountdownState {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}
