import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { theme } from './theme';
import { FESTIVAL_INFO } from './festivalData';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface SchedulePageProps {
  onNavigate?: (screen: Screen) => void;
}

interface SetItem {
  id: string;
  artist: string;
  stageId: 'warehouse' | 'cove' | 'dome' | 'basement';
  stageName: string;
  timeRange: string;
  tag: string;
  tagType?: 'warmup' | 'main' | 'headliner' | 'legend' | 'closing' | 'acid';
  description: string;
  bpm: string;
  spec: string;
  specIcon: string;
  isOnDeck?: boolean;
  foamEnergy?: number;
  vibe: string;
}

export const SchedulePage: React.FC<SchedulePageProps> = ({ onNavigate }) => {
  const [activeDay, setActiveDay] = useState<'fri' | 'sat' | 'sun'>('sat');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedVibe, setSelectedVibe] = useState<string>('all');
  const [bookmarkedArtists, setBookmarkedArtists] = useState<string[]>([
    'Peggy Gou',
    'Honey Dijon',
    'Kerri Chandler',
    'Masters At Work',
  ]);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [calendarSynced, setCalendarSynced] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const toggleBookmark = (artist: string) => {
    setBookmarkedArtists((prev) =>
      prev.includes(artist) ? prev.filter((a) => a !== artist) : [...prev, artist]
    );
  };

  const handleShare = () => {
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  const handleSubscribe = () => {
    if (newsletterEmail.trim().length > 0) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const STAGE_SETS: Record<'warehouse' | 'cove' | 'dome' | 'basement', SetItem[]> = {
    warehouse: [
      {
        id: 'w1',
        artist: 'Derrick Carter',
        stageId: 'warehouse',
        stageName: 'THE WAREHOUSE',
        timeRange: '16:30 - 18:00',
        tag: 'WARMUP',
        tagType: 'warmup',
        description: 'Pioneer Boompty Boomp grooves kicking off the main acoustic arena.',
        bpm: '124 BPM',
        spec: '124 BPM',
        specIcon: 'equalizer',
        vibe: 'classic',
      },
      {
        id: 'w2',
        artist: 'Peggy Gou',
        stageId: 'warehouse',
        stageName: 'THE WAREHOUSE',
        timeRange: '19:30 - 21:30',
        tag: 'MAIN EVENT',
        tagType: 'main',
        isOnDeck: true,
        description: 'High-energy kinetic 90s acid basslines, 808 breaks, and summer house anthems.',
        bpm: '128 BPM',
        spec: 'STAGE VISUALS 4K',
        specIcon: 'mic',
        foamEnergy: 5,
        vibe: 'classic',
      },
      {
        id: 'w3',
        artist: 'Honey Dijon',
        stageId: 'warehouse',
        stageName: 'THE WAREHOUSE',
        timeRange: '21:45 - 00:00',
        tag: 'HEADLINER',
        tagType: 'headliner',
        description: 'Chicago raw energy colliding with transatlantic ballroom ecstasy. Full 2hr extended journey.',
        bpm: '128 BPM EXTENDED',
        spec: '128 BPM EXTENDED',
        specIcon: 'graphic_eq',
        vibe: 'classic',
      },
    ],
    cove: [
      {
        id: 'c1',
        artist: 'Kerri Chandler',
        stageId: 'cove',
        stageName: 'SUNSET COVE',
        timeRange: '17:00 - 18:45',
        tag: 'SOUL DEEP',
        tagType: 'warmup',
        description: 'Reel-to-reel magnetic tape manipulation and raw Rhodes chords overlooking Lake Michigan.',
        bpm: '122 BPM',
        spec: 'LIVE HARDWARE',
        specIcon: 'piano',
        vibe: 'deep',
      },
      {
        id: 'c2',
        artist: 'Masters At Work',
        stageId: 'cove',
        stageName: 'SUNSET COVE',
        timeRange: '19:00 - 21:00',
        tag: 'LEGENDS',
        tagType: 'legend',
        description: 'Louie Vega & Kenny Dope in a marathon dual-rotary mixer set of unreleased dubplates.',
        bpm: '125 BPM',
        spec: 'VINYL ONLY',
        specIcon: 'album',
        vibe: 'classic',
      },
      {
        id: 'c3',
        artist: 'Folamour',
        stageId: 'cove',
        stageName: 'SUNSET COVE',
        timeRange: '21:15 - 23:30',
        tag: 'SUNSET FINALE',
        tagType: 'closing',
        description: 'Uplifting string arrangements, funk bass, and pure waterfront celebratory dance music.',
        bpm: '126 BPM',
        spec: '126 BPM',
        specIcon: 'flare',
        vibe: 'deep',
      },
    ],
    dome: [
      {
        id: 'd1',
        artist: 'Black Coffee',
        stageId: 'dome',
        stageName: 'NEON DOME',
        timeRange: '17:30 - 19:30',
        tag: 'AFRO-TECH',
        tagType: 'warmup',
        description: 'Poly-rhythmic percussive hypnosis inside the 360-degree spatial dome.',
        bpm: '123 BPM',
        spec: 'DOLBY ATMOS LIVE',
        specIcon: 'spatial_audio_off',
        vibe: 'afro',
      },
      {
        id: 'd2',
        artist: 'Chloé Caillet',
        stageId: 'dome',
        stageName: 'NEON DOME',
        timeRange: '19:45 - 21:15',
        tag: 'PARIS GROOVE',
        tagType: 'main',
        description: 'Chunky bounce, eclectic Latin percussions, and playful high-energy tempo switches.',
        bpm: '127 BPM',
        spec: '127 BPM',
        specIcon: 'speed',
        vibe: 'classic',
      },
      {
        id: 'd3',
        artist: 'Kaytranada (DJ Set)',
        stageId: 'dome',
        stageName: 'NEON DOME',
        timeRange: '21:30 - 23:45',
        tag: 'CLOSING LIVE',
        tagType: 'closing',
        description: 'Drunken groove swing, bass-heavy flip edits, and neon euphoria in the dome.',
        bpm: '120 BPM',
        spec: 'BASS PROFILE: HEAVY',
        specIcon: 'volume_up',
        vibe: 'afro',
      },
    ],
    basement: [
      {
        id: 'b1',
        artist: 'DJ Slicko & Glove',
        stageId: 'basement',
        stageName: 'THE BASEMENT',
        timeRange: '18:00 - 20:00',
        tag: 'CHICAGO GHETTO',
        tagType: 'warmup',
        description: 'Footwork battles and fast-paced 160/130 footwork-house crossovers on foam pads.',
        bpm: '140 BPM',
        spec: '140 BPM',
        specIcon: 'timer',
        vibe: 'acid',
      },
      {
        id: 'b2',
        artist: 'Green Velvet',
        stageId: 'basement',
        stageName: 'THE BASEMENT',
        timeRange: '20:15 - 22:00',
        tag: 'RAW ACID',
        tagType: 'acid',
        description: "Direct from Curtis Jones' lab: piercing 303 squelch, strobe flash, and laser vocals.",
        bpm: '132 BPM',
        spec: 'RELENTLESS 132 BPM',
        specIcon: 'flash_on',
        vibe: 'acid',
      },
      {
        id: 'b3',
        artist: 'Special Guest B2B',
        stageId: 'basement',
        stageName: 'THE BASEMENT',
        timeRange: '22:15 - 01:00',
        tag: 'SECRET AFTERHOURS',
        tagType: 'closing',
        description: 'Unannounced Detroit-to-Chicago warehouse masterclass. Vault access wristband needed.',
        bpm: '130 BPM',
        spec: 'LOCKER DROP ONLY',
        specIcon: 'key',
        vibe: 'acid',
      },
    ],
  };

  return (
    <View style={styles.rootContainer}>
      {/* ─────────────────────────────────────────────────────────
          00 — FIXED TOP HEADER
          ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <View style={styles.headerLeftGroup}>
            <TouchableOpacity
              style={styles.logoBadge}
              onPress={() => onNavigate?.('landing')}
              activeOpacity={0.85}
            >
              <Text style={styles.logoBadgeText}>{FESTIVAL_INFO.shortName}</Text>
            </TouchableOpacity>

            <View style={styles.headerDatePill}>
              <Text style={styles.headerDatePillText}>AUG 22-24, 2025 • CHICAGO</Text>
            </View>
          </View>

          {/* Desktop Nav Pills */}
          <View style={styles.navContainerPill}>
            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('landing')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Lineup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => {}}
              activeOpacity={0.8}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('stages')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Stages</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('merch')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Merch & Goods</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('passes')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Passes / VIP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('gallery')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              style={styles.headerPassesBtn}
              onPress={() => onNavigate?.('passes')}
              activeOpacity={0.85}
            >
              <Text style={styles.headerPassesBtnText}>GET PASSES</Text>
            </TouchableOpacity>

            <View style={styles.headerAvatarCircle}>
              <FestivalIcon name="person" size={18} color="#ffffff" />
            </View>
          </View>
        </View>
      </View>

      {/* ─────────────────────────────────────────────────────────
          SCROLLABLE CONTENT
          ───────────────────────────────────────────────────────── */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Marquee Ticker */}
        <View style={styles.marqueeTicker}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tickerRow}>
              <View style={styles.liveSyncLead}>
                <View style={styles.liveSyncPingDot} />
                <Text style={styles.liveSyncLeadText}>LIVE BROADCAST SYNC ACTIVE</Text>
              </View>
              <Text style={styles.tickerBullet}>•</Text>
              <Text style={styles.tickerText}>ACOUSTIC ABSORPTION FLOORING: ACTIVE AT ALL 4 FOAM ARENAS</Text>
              <Text style={styles.tickerBullet}>•</Text>
              <Text style={styles.tickerText}>WATER STATIONS: NEAR THE WAREHOUSE & SUNSET COVE</Text>
              <Text style={styles.tickerBullet}>•</Text>
              <Text style={styles.tickerText}>LAST ENTRY: 23:00 CST</Text>
              <Text style={styles.tickerBullet}>•</Text>
              <Text style={styles.tickerText}>ZERO CLASH ALGORITHM CALIBRATED</Text>
            </View>
          </ScrollView>

          <View style={styles.tickerTelemetryBadges}>
            <View style={styles.telemetryBadge}>
              <Text style={styles.telemetryBadgeText}>LATENCY 12ms</Text>
            </View>
            <View style={styles.telemetryBadge}>
              <Text style={styles.telemetryBadgeText}>BPM LOCK 124-132</Text>
            </View>
          </View>
        </View>

        {/* Main Planner Container */}
        <View style={styles.plannerMainContainer}>
          {/* Title + Planner Command Center */}
          <View style={styles.titleCommandRow}>
            <View style={styles.titleCol}>
              <View style={styles.headerStickersRow}>
                <View style={styles.revSyncSticker}>
                  <Text style={styles.revSyncStickerText}>REV 4.8.2 LIVE SYNC</Text>
                </View>
                <View style={styles.zeroClashSticker}>
                  <Text style={styles.zeroClashStickerText}>ZERO CLASHES ENGINE</Text>
                </View>
                <View style={styles.timezoneSticker}>
                  <Text style={styles.timezoneStickerText}>TIMEZONE: CST (CHICAGO)</Text>
                </View>
              </View>

              <Text style={styles.mainHeadline}>TIMETABLE & RUNS</Text>
              <Text style={styles.mainSubtitle}>
                Craft your personal warehouse itinerary across 4 tactile foam soundstages. Bookmark artists to construct an acoustic clash-free path.
              </Text>
            </View>

            {/* Quick Day Selector Pills */}
            <View style={styles.daySelectorPillsPod}>
              <TouchableOpacity
                style={[styles.daySelectorBtn, activeDay === 'fri' && styles.daySelectorBtnActive]}
                onPress={() => setActiveDay('fri')}
                activeOpacity={0.85}
              >
                <Text style={[styles.daySelectorBtnText, activeDay === 'fri' && styles.daySelectorBtnTextActive]}>
                  FRI AUG 22
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.daySelectorBtn, activeDay === 'sat' && styles.daySelectorBtnActive]}
                onPress={() => setActiveDay('sat')}
                activeOpacity={0.85}
              >
                <Text style={[styles.daySelectorBtnText, activeDay === 'sat' && styles.daySelectorBtnTextActive]}>
                  SAT AUG 23 (ACTIVE)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.daySelectorBtn, activeDay === 'sun' && styles.daySelectorBtnActive]}
                onPress={() => setActiveDay('sun')}
                activeOpacity={0.85}
              >
                <Text style={[styles.daySelectorBtnText, activeDay === 'sun' && styles.daySelectorBtnTextActive]}>
                  SUN AUG 24
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filter Control Pod & Schedule Tracker Banner */}
          <View style={styles.filterTrackerRow}>
            <View style={styles.filtersCol}>
              {/* Stage Pills */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPillsRow}>
                <Text style={styles.filterLabelPrefix}>STAGES:</Text>
                {[
                  { id: 'all', label: 'ALL STAGES (4)' },
                  { id: 'warehouse', label: 'THE WAREHOUSE' },
                  { id: 'cove', label: 'SUNSET COVE' },
                  { id: 'dome', label: 'NEON GROOVE DOME' },
                  { id: 'basement', label: 'THE BASEMENT' },
                ].map((stg) => {
                  const isActive = selectedStage === stg.id;
                  return (
                    <TouchableOpacity
                      key={stg.id}
                      style={[styles.filterChipBtn, isActive && styles.filterChipBtnActive]}
                      onPress={() => setSelectedStage(stg.id)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.filterChipBtnText, isActive && styles.filterChipBtnTextActive]}>
                        {stg.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Vibe Pills */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterPillsRow}>
                <Text style={styles.filterLabelPrefix}>VIBE DENSITY:</Text>
                {[
                  { id: 'all', label: 'ALL VIBES' },
                  { id: 'deep', label: 'DEEP & SOULFUL' },
                  { id: 'classic', label: 'CLASSIC CHICAGO JACK' },
                  { id: 'acid', label: 'ACID & RAW 303' },
                  { id: 'afro', label: 'AFRO & LATIN ROOTS' },
                ].map((v) => {
                  const isActive = selectedVibe === v.id;
                  return (
                    <TouchableOpacity
                      key={v.id}
                      style={[styles.vibeChipBtn, isActive && styles.vibeChipBtnActive]}
                      onPress={() => setSelectedVibe(v.id)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.vibeChipBtnText, isActive && styles.vibeChipBtnTextActive]}>
                        {v.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Schedule Tracker Sticky Widget */}
            <View style={styles.trackerWidgetCard}>
              <View style={styles.trackerLeftInfo}>
                <View style={styles.trackerCounterCircle}>
                  <Text style={styles.trackerCounterText}>{bookmarkedArtists.length}</Text>
                </View>
                <View style={styles.trackerTextCol}>
                  <Text style={styles.trackerSubLabel}>SQUISH PLANNER</Text>
                  <Text style={styles.trackerMainLabel}>{bookmarkedArtists.length} SETS SAVED</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.sharePlanBtn}
                onPress={handleShare}
                activeOpacity={0.85}
              >
                <FestivalIcon
                  name={copiedShare ? 'done_all' : 'ios_share'}
                  size={16}
                  color={theme.colors.onPrimaryContainer}
                />
                <Text style={styles.sharePlanBtnText}>
                  {copiedShare ? 'COPIED LINK!' : 'SHARE PLAN'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Live Stage Grid Container with Vertical Timeline */}
          <View style={styles.masterGridContainer}>
            {/* Stage Column Headers */}
            <View style={styles.stageHeadersRow}>
              {/* Stage 1 Header */}
              <View style={styles.stage1HeaderCard}>
                <View>
                  <Text style={styles.stage1SubTitle}>STAGE 01 • MAIN FOAM POD</Text>
                  <Text style={styles.stageCardTitle}>THE WAREHOUSE</Text>
                </View>
                <View style={styles.stage1BpmBadge}>
                  <Text style={styles.stage1BpmText}>130BPM</Text>
                </View>
              </View>

              {/* Stage 2 Header */}
              <View style={styles.stage2HeaderCard}>
                <View>
                  <Text style={styles.stage2SubTitle}>STAGE 02 • OPEN-AIR HARBOR</Text>
                  <Text style={styles.stageCardTitle}>SUNSET COVE</Text>
                </View>
                <View style={styles.stage2Badge}>
                  <Text style={styles.stage2BadgeText}>DISCO/JACK</Text>
                </View>
              </View>

              {/* Stage 3 Header */}
              <View style={styles.stage3HeaderCard}>
                <View>
                  <Text style={styles.stage3SubTitle}>STAGE 03 • 360° ACOUSTIC</Text>
                  <Text style={styles.stageCardTitle}>NEON DOME</Text>
                </View>
                <View style={styles.stage3Badge}>
                  <Text style={styles.stage3BadgeText}>IMMERSIVE</Text>
                </View>
              </View>

              {/* Stage 4 Header */}
              <View style={styles.stage4HeaderCard}>
                <View>
                  <Text style={styles.stage4SubTitle}>STAGE 04 • UNDERGROUND VAULT</Text>
                  <Text style={styles.stageCardTitle}>THE BASEMENT</Text>
                </View>
                <View style={styles.stage4Badge}>
                  <Text style={styles.stage4BadgeText}>ACID/303</Text>
                </View>
              </View>
            </View>

            {/* CURRENT TIME FLOATING MARKER */}
            <View style={styles.currentTimeMarkerRow}>
              <View style={styles.currentTimePill}>
                <View style={styles.currentTimePingDot} />
                <Text style={styles.currentTimeText}>CURRENTLY PLAYING • 21:15 CST</Text>
              </View>
              <View style={styles.currentTimeDashedLine} />
              <View style={styles.runningHotBadge}>
                <Text style={styles.runningHotBadgeText}>FOAM ARENAS RUNNING HOT</Text>
              </View>
            </View>

            {/* Master Columns Grid */}
            <View style={styles.stageColumnsGrid}>
              {(['warehouse', 'cove', 'dome', 'basement'] as const).map((stgKey) => {
                if (selectedStage !== 'all' && selectedStage !== stgKey) return null;
                const sets = STAGE_SETS[stgKey].filter(
                  (s) => selectedVibe === 'all' || s.vibe === selectedVibe
                );

                return (
                  <View key={stgKey} style={styles.stageSetsColumn}>
                    {sets.map((set) => {
                      const isBookmarked = bookmarkedArtists.includes(set.artist);
                      return (
                        <View
                          key={set.id}
                          style={[
                            styles.setCard,
                            set.isOnDeck && styles.setCardOnDeck,
                            stgKey === 'cove' && styles.setCardCove,
                            stgKey === 'dome' && styles.setCardDome,
                          ]}
                        >
                          {set.isOnDeck && (
                            <View style={styles.onDeckSticker}>
                              <Text style={styles.onDeckStickerText}>ON DECK NOW</Text>
                            </View>
                          )}

                          <View style={styles.setCardTopRow}>
                            <Text
                              style={[
                                styles.setTimeRangeText,
                                set.isOnDeck && styles.setTimeRangeTextOnDeck,
                              ]}
                            >
                              {set.timeRange}
                            </Text>
                            <View style={styles.setTagPill}>
                              <Text style={styles.setTagText}>{set.tag}</Text>
                            </View>
                          </View>

                          <Text
                            style={[
                              styles.setArtistName,
                              set.tagType === 'headliner' || set.isOnDeck
                                ? styles.setArtistNameLg
                                : styles.setArtistNameMd,
                            ]}
                          >
                            {set.artist}
                          </Text>

                          <Text style={styles.setDescription}>{set.description}</Text>

                          {/* Foam Squish Factor progress indicator if on deck */}
                          {set.foamEnergy && (
                            <View style={styles.foamEnergyBar}>
                              <Text style={styles.foamEnergyLabel}>ENERGY FOAM:</Text>
                              <View style={styles.foamEnergyDotsRow}>
                                <View style={styles.foamDotGreen} />
                                <View style={styles.foamDotGreen} />
                                <View style={styles.foamDotGreen} />
                                <View style={styles.foamDotGreen} />
                                <View style={styles.foamDotOrange} />
                              </View>
                            </View>
                          )}

                          <View style={styles.setCardBottomRow}>
                            <View style={styles.setSpecGroup}>
                              <FestivalIcon
                                name={set.specIcon as any}
                                size={16}
                                color={theme.colors.secondaryContainer}
                              />
                              <Text style={styles.setSpecText}>{set.spec}</Text>
                            </View>

                            <TouchableOpacity
                              style={[
                                styles.bookmarkSquareBtn,
                                isBookmarked && styles.bookmarkSquareBtnActive,
                              ]}
                              onPress={() => toggleBookmark(set.artist)}
                              activeOpacity={0.85}
                            >
                              <FestivalIcon
                                name={isBookmarked ? 'check' : 'add'}
                                size={20}
                                color={isBookmarked ? '#ffffff' : theme.colors.onSurface}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>

          {/* Clash Diagnostic & Acoustic Density Info Footer Bento */}
          <View style={styles.diagnosticsBentoGrid}>
            {/* Diagnostic 1: Clash Meter */}
            <View style={styles.diagnosticCard}>
              <View style={styles.diagnosticCardHeader}>
                <Text style={styles.diagnosticLabel}>ALGORITHM STATUS</Text>
                <View style={styles.zeroOverlapBadge}>
                  <Text style={styles.zeroOverlapBadgeText}>0% OVERLAP</Text>
                </View>
              </View>
              <Text style={styles.diagnosticTitle}>ZERO TIME CLASHES</Text>
              <Text style={styles.diagnosticDesc}>
                Your {bookmarkedArtists.length} bookmarked sets allow 15 minutes of buffer time to transition between physical foam stages.
              </Text>
              <View style={styles.diagnosticProgressTrack}>
                <View style={styles.diagnosticProgressFill} />
              </View>
            </View>

            {/* Diagnostic 2: Ear Health & Sound Foam */}
            <View style={styles.diagnosticCard}>
              <View style={styles.diagnosticCardHeader}>
                <Text style={styles.diagnosticLabel}>ACOUSTIC ERGONOMICS</Text>
                <View style={styles.safeDbBadge}>
                  <Text style={styles.safeDbBadgeText}>SAFE DB</Text>
                </View>
              </View>
              <Text style={styles.diagnosticTitle}>SLYDE DAMPENING TILES</Text>
              <Text style={styles.diagnosticDesc}>
                Engineered sound-absorption dance floors reduce sub-bass skeletal fatigue by up to 34%.
              </Text>
              <View style={styles.earPlugNoteRow}>
                <FestivalIcon name="hearing" size={18} color={theme.colors.secondaryContainer} />
                <Text style={styles.earPlugNoteText}>FREE HIGH-FIDELITY PLUGS AT INFIRMARY</Text>
              </View>
            </View>

            {/* Diagnostic 3: Sync to Apple / Google Calendar */}
            <View style={styles.diagnosticCardHighlight}>
              <View style={styles.diagnosticCardHeader}>
                <Text style={styles.diagnosticLabel}>DEVICE EXPORT</Text>
                <FestivalIcon name="sync" size={18} color={theme.colors.onSurface} />
              </View>
              <Text style={styles.diagnosticTitle}>EXPORT SQUISH ICAL</Text>
              <Text style={styles.diagnosticDesc}>
                Sync set alarms directly with vibrating haptic notifications 15m prior to each performance.
              </Text>
              <TouchableOpacity
                style={styles.syncCalendarBtn}
                onPress={() => {
                  setCalendarSynced(true);
                  setTimeout(() => setCalendarSynced(false), 2500);
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.syncCalendarBtnText}>
                  {calendarSynced ? 'CALENDAR SYNCED!' : 'SYNC TO CALENDAR'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <View style={styles.footerGrid}>
            <View style={styles.footerBrandCol}>
              <View style={styles.footerBrandRow}>
                <View style={styles.footerLogoBadge}>
                  <Text style={styles.footerLogoBadgeText}>{FESTIVAL_INFO.shortName}</Text>
                </View>
                <View style={styles.footerSquishBadge}>
                  <Text style={styles.footerSquishBadgeText}>SQUISH FACTOR 10/10</Text>
                </View>
              </View>
              <Text style={styles.footerBrandText}>
                Born in the underground warehouses of Chicago. Engineered with high-rebound dancefloor foam acoustics and kinetic house culture.
              </Text>
              <View style={styles.footerBadgesWrap}>
                <View style={styles.footerMiniPill}>
                  <Text style={styles.footerMiniPillText}>4 STAGES</Text>
                </View>
                <View style={styles.footerMiniPillOrange}>
                  <Text style={styles.footerMiniPillOrangeText}>120BPM TO 134BPM</Text>
                </View>
                <View style={styles.footerMiniPillPink}>
                  <Text style={styles.footerMiniPillPinkText}>WEIGHTLESS COMFORT</Text>
                </View>
              </View>
            </View>

            <View style={styles.footerNavCol}>
              <Text style={styles.footerNavHeader}>Navigate</Text>
              <TouchableOpacity onPress={() => onNavigate?.('landing')}>
                <Text style={styles.footerNavLink}>Artist Lineup 2025</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.footerNavLink}>Weekend Timetable</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('stages')}>
                <Text style={styles.footerNavLink}>Tactile Foam Arenas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('merch')}>
                <Text style={styles.footerNavLink}>Drop 01 Official Merch</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('passes')}>
                <Text style={styles.footerNavLink}>Wristbands & Locker VIP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('gallery')}>
                <Text style={styles.footerNavLink}>Footage Archive</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.footerNewsletterCol}>
              <Text style={styles.footerNavHeader}>Club Newsletter</Text>
              <Text style={styles.footerNewsletterSub}>
                Get secret stage drop alerts, afterparty coordinates, and tactile shoe collabs.
              </Text>

              <View style={styles.newsletterInputWrap}>
                <TextInput
                  style={styles.newsletterInput}
                  placeholder="jack@housemusic.club"
                  placeholderTextColor="rgba(66, 73, 54, 0.6)"
                  value={newsletterEmail}
                  onChangeText={setNewsletterEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.newsletterJoinBtn}
                  onPress={handleSubscribe}
                  activeOpacity={0.85}
                >
                  <Text style={styles.newsletterJoinBtnText}>
                    {isSubscribed ? 'JOINED!' : 'JOIN'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.poweredRow}>
                <FestivalIcon name="volume_up" size={16} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.poweredText}>
                  POWERED BY FUNCTION-ONE & SLYDE ACOUSTIC FOAM
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.subfooterRow}>
            <Text style={styles.subfooterCopy}>
              © 2025 Bring Back House Music Festival. All rights reserved. Crafted with Tactile Toy Ergonomics.
            </Text>
            <View style={styles.subfooterLinks}>
              <Text style={styles.subfooterLink}>Privacy</Text>
              <Text style={styles.subfooterLink}>Safety Guidelines</Text>
              <Text style={styles.subfooterLink}>Accessibility</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

/* ─────────────────────────────────────────────────────────
    STYLESHEET
    ───────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  /* Header */
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 50,
    backgroundColor: 'rgba(251, 248, 252, 0.95)',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
  },
  headerInner: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoBadge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  logoBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
    textTransform: 'uppercase',
  },
  headerDatePill: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  headerDatePillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onTertiaryContainer,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navContainerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 4,
    marginHorizontal: 12,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  navPillLink: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
  },
  navPillLinkActive: {
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  navPillLinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onSurfaceVariant,
    fontSize: 13,
    fontWeight: '700',
  },
  navPillLinkTextActive: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '800',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
  },
  headerPassesBtn: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  headerPassesBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  headerAvatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },

  /* Scroll Container */
  scrollContainer: {
    flex: 1,
    marginTop: 80,
  },
  scrollContent: {
    paddingBottom: 90,
  },

  /* Top Marquee */
  marqueeTicker: {
    backgroundColor: theme.colors.primaryContainer,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  liveSyncLead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveSyncPingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondaryContainer,
  },
  liveSyncLeadText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  tickerBullet: {
    fontSize: 14,
    color: theme.colors.onPrimaryContainer,
  },
  tickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tickerTelemetryBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 16,
  },
  telemetryBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  telemetryBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },

  /* Main Planner Container */
  plannerMainContainer: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 48,
    gap: 28,
  },

  /* Title Command Row */
  titleCommandRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 20,
  },
  titleCol: {
    flex: 1,
    minWidth: 320,
    gap: 8,
  },
  headerStickersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  revSyncSticker: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  revSyncStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },
  zeroClashSticker: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  zeroClashStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  timezoneSticker: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  timezoneStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  mainHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 72 : 40,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1.8,
    lineHeight: Platform.OS === 'web' ? 76 : 44,
    marginTop: 6,
  },
  mainSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 17,
    lineHeight: 26,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 620,
  },

  /* Day Selector Pills */
  daySelectorPillsPod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.surfaceContainerLow,
    padding: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  daySelectorBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
  },
  daySelectorBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  daySelectorBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  daySelectorBtnTextActive: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '800',
  },

  /* Filter Tracker Row */
  filterTrackerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  filtersCol: {
    flex: 2,
    minWidth: 320,
    gap: 10,
  },
  filterPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterLabelPrefix: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginRight: 4,
  },
  filterChipBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  filterChipBtnActive: {
    backgroundColor: '#1b1b1e',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  filterChipBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  filterChipBtnTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },
  vibeChipBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  vibeChipBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
  },
  vibeChipBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  vibeChipBtnTextActive: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '800',
  },

  /* Tracker Widget */
  trackerWidgetCard: {
    backgroundColor: '#ffffff',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flex: 1,
    minWidth: 280,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  trackerLeftInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trackerCounterCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
  },
  trackerCounterText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  trackerTextCol: {
    justifyContent: 'center',
  },
  trackerSubLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  trackerMainLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  sharePlanBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  sharePlanBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },

  /* Master Grid Container */
  masterGridContainer: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageHeadersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    paddingBottom: 20,
    marginBottom: 20,
  },
  stage1HeaderCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: 'rgba(163, 230, 53, 0.15)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stage1SubTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  stageCardTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginTop: 2,
  },
  stage1BpmBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stage1BpmText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
  },
  stage2HeaderCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: 'rgba(255, 219, 208, 0.3)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stage2SubTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },
  stage2Badge: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stage2BadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },
  stage3HeaderCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: 'rgba(255, 217, 228, 0.3)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stage3SubTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.tertiary,
    textTransform: 'uppercase',
  },
  stage3Badge: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stage3BadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
  },
  stage4HeaderCard: {
    flex: 1,
    minWidth: 220,
    backgroundColor: theme.colors.surfaceContainerHigh,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stage4SubTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  stage4Badge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stage4BadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
  },

  /* Current Time Floating Marker */
  currentTimeMarkerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 14,
  },
  currentTimePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  currentTimePingDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: theme.colors.secondaryContainer,
  },
  currentTimeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentTimeDashedLine: {
    flex: 1,
    height: 2,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    borderStyle: 'dashed',
  },
  runningHotBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
  },
  runningHotBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },

  /* Stage Columns Grid */
  stageColumnsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-start',
    marginTop: 8,
  },
  stageSetsColumn: {
    flex: 1,
    minWidth: 260,
    gap: 16,
  },
  setCard: {
    backgroundColor: theme.colors.surface,
    padding: 18,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  setCardOnDeck: {
    backgroundColor: 'rgba(163, 230, 53, 0.25)',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 5px 0px #18181B' } as any)
      : {}),
  },
  setCardCove: {
    backgroundColor: 'rgba(255, 219, 208, 0.25)',
  },
  setCardDome: {
    backgroundColor: 'rgba(255, 217, 228, 0.25)',
  },
  onDeckSticker: {
    position: 'absolute',
    top: -12,
    right: 16,
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  onDeckStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  setCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  setTimeRangeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
  },
  setTimeRangeTextOnDeck: {
    color: theme.colors.secondary,
    fontWeight: '900',
  },
  setTagPill: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  setTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  setArtistName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    marginVertical: 4,
  },
  setArtistNameLg: {
    fontSize: 22,
  },
  setArtistNameMd: {
    fontSize: 18,
  },
  setDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 12,
  },

  /* Foam Energy Indicator */
  foamEnergyBar: {
    backgroundColor: '#ffffff',
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  foamEnergyLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  foamEnergyDotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  foamDotGreen: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  foamDotOrange: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: theme.colors.secondaryContainer,
    borderWidth: 1,
    borderColor: '#18181B',
  },

  /* Card Bottom */
  setCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  setSpecGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  setSpecText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  bookmarkSquareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  bookmarkSquareBtnActive: {
    backgroundColor: theme.colors.secondaryContainer,
  },

  /* Diagnostics Bento Grid */
  diagnosticsBentoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  diagnosticCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  diagnosticCardHighlight: {
    flex: 1,
    minWidth: 280,
    backgroundColor: 'rgba(163, 230, 53, 0.2)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  diagnosticCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  diagnosticLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  zeroOverlapBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
  },
  zeroOverlapBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
  },
  safeDbBadge: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
  },
  safeDbBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
  },
  diagnosticTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  diagnosticDesc: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 14,
  },
  diagnosticProgressTrack: {
    width: '100%',
    height: 8,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#18181B',
    overflow: 'hidden',
  },
  diagnosticProgressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.primaryContainer,
  },
  earPlugNoteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  earPlugNoteText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  syncCalendarBtn: {
    width: '100%',
    backgroundColor: '#1b1b1e',
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  syncCalendarBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  /* Footer */
  footerSection: {
    width: '100%',
    backgroundColor: theme.colors.surfaceContainerLow,
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    marginTop: 56,
    paddingTop: 56,
    paddingBottom: 40,
  },
  footerGrid: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 32,
    justifyContent: 'space-between',
    marginBottom: 44,
  },
  footerBrandCol: {
    flex: 2,
    minWidth: 280,
    gap: 14,
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  footerLogoBadge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  footerLogoBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  footerSquishBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
  },
  footerSquishBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onPrimaryContainer,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  footerBrandText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 420,
  },
  footerBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  footerMiniPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  footerMiniPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  footerMiniPillOrange: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  footerMiniPillOrangeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  footerMiniPillPink: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  footerMiniPillPinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
    textTransform: 'uppercase',
  },
  footerNavCol: {
    flex: 1,
    minWidth: 160,
    gap: 10,
  },
  footerNavHeader: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  footerNavLink: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    paddingVertical: 2,
  },
  footerNewsletterCol: {
    flex: 2,
    minWidth: 280,
    gap: 12,
  },
  footerNewsletterSub: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  newsletterInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  newsletterInput: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 14,
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    color: theme.colors.onSurface,
  },
  newsletterJoinBtn: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  newsletterJoinBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  poweredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  poweredText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  subfooterRow: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  subfooterCopy: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
  },
  subfooterLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  subfooterLink: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
});
