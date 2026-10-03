export type MerchCategory = 'all' | 'apparel' | 'audio' | 'accessories' | 'drinkware' | 'collectibles';

export interface MerchItem {
  id: string;
  sku?: string;
  title: string;
  price: number;
  category: MerchCategory;
  categoryLabel?: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  stockStatus?: string;
  description: string;
  imageUrl?: string;
  iconName?: string;
  tagline?: string;
  features?: string[];
  squishRating?: string;
  specPill?: string;
  specIcon?: string;
  bgTint?: string;
  options?: {
    washes?: { name: string; colorHex: string }[];
    sizes?: string[];
  };
}

export interface CartItem {
  name: string;
  price: number;
  variant: string;
  qty: number;
}
