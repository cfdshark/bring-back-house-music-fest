export type GalleryCategory = 'all' | 'lasers' | 'sunset' | 'vinyl';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  subtitle: string;
  stageBadge: string;
  timeTag: string;
  tag: string;
  bpm: string;
  dotColor: string;
  imageUrl: string;
  specIcon: string;
  specName: string;
  specTag: string;
}

export interface MetricPod {
  id: string;
  value: string;
  label: string;
  icon: string;
  bgPuck: string;
  decorBg: string;
}

export interface DisposablePhoto {
  id: string;
  code: string;
  imageUrl: string;
  alt: string;
}
