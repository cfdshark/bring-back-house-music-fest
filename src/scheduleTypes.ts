export type FestivalDay = 'fri' | 'sat' | 'sun';

export type ScheduleVibe =
  | 'all'
  | 'Deep / Soulful'
  | 'Classic Chicago'
  | 'Acid & Raw'
  | 'Afro House / Melodic';

export type StageId =
  | 'all'
  | 'the-warehouse'
  | 'sunset-cove'
  | 'neon-groove-dome'
  | 'the-basement';

export interface PerformanceSlot {
  id: string;
  artist: string;
  subArtist?: string;
  stageId: 'the-warehouse' | 'sunset-cove' | 'neon-groove-dome' | 'the-basement';
  stageName: string;
  timeRange: string;
  genre: ScheduleVibe;
  subtitle: string;
  tag?: string;
  tagType?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  isHeadline?: boolean;
  isSpecialSunset?: boolean;
  isCollision?: boolean;
  isCurfew?: boolean;
  bpmNote?: string;
  hasWaveform?: boolean;
}

export interface TimeSlotRow {
  timeLabel: string;
  subTimeLabel?: string;
  timeColor?: string;
  performances: PerformanceSlot[];
}

export interface SavedSet {
  id: string;
  artist: string;
  time: string;
  stageName: string;
  colorHex: string;
}
