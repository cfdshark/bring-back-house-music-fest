import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  ImageStyle,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { theme } from './theme';
import { FESTIVAL_INFO } from './festivalData';
import {
  GALLERY_FILTERS,
  METRIC_PODS,
  SPOTLIGHT_FILM,
  GALLERY_ITEMS,
  DISPOSABLE_PHOTOS,
} from './galleryData';
import { GalleryCategory, GalleryItem } from './galleryTypes';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface GalleryPageProps {
  onNavigate?: (screen: Screen) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;

  const [activeFilter, setActiveFilter] = useState<GalleryCategory>('all');
  const [viewMode, setViewMode] = useState<'curated' | 'timeline'>('curated');
  const [isPlayingSoundboard, setIsPlayingSoundboard] = useState<boolean>(false);
  const [soundboardSec, setSoundboardSec] = useState<number>(522); // 08:42
  const [isSpotlightVideoOpen, setIsSpotlightVideoOpen] = useState<boolean>(false);
  const [activePreviewItem, setActivePreviewItem] = useState<GalleryItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Equalizer animation bar heights
  const [waveHeights, setWaveHeights] = useState<number[]>([
    16, 32, 44, 24, 36, 48, 28, 20, 40, 32, 16, 44, 24, 12, 36, 20,
  ]);

  useEffect(() => {
    let interval: any;
    if (isPlayingSoundboard) {
      interval = setInterval(() => {
        setSoundboardSec((prev) => prev + 1);
        setWaveHeights((prev) =>
          prev.map(() => Math.floor(Math.random() * 40) + 8)
        );
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlayingSoundboard]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const handleSubscribe = () => {
    if (newsletterEmail.trim().length > 0) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setNewsletterEmail('');
      }, 3000);
    }
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
              <Text style={styles.headerDatePillText}>{FESTIVAL_INFO.dates}</Text>
            </View>
          </View>

          {/* Desktop Nav Pills */}
          <View style={styles.navContainerPill}>
            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('landing')}
            >
              <Text style={styles.navPillLinkText}>Lineup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('schedule')}
            >
              <Text style={styles.navPillLinkText}>Schedule</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('stages')}
            >
              <Text style={styles.navPillLinkText}>Stages</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('merch')}
            >
              <Text style={styles.navPillLinkText}>Merch & Goods</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('passes')}
            >
              <Text style={styles.navPillLinkText}>Passes / VIP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => {}}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>
                Gallery
              </Text>
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
        <View style={styles.contentWrapper}>
          {/* ─────────────────────────────────────────────────────────
              SECTION 1: HEADER & VAULT METRICS
              ───────────────────────────────────────────────────────── */}
          <View style={styles.sectionHeader}>
            <View style={[styles.titleActionRow, !isDesktop && styles.titleActionRowMobile]}>
              <View style={styles.titleCol}>
                <View style={styles.headerBadgesRow}>
                  <View style={styles.headerBadgeArchive}>
                    <Text style={styles.headerBadgeArchiveText}>ARCHIVE RELEASE v2.5</Text>
                  </View>
                  <View style={styles.headerBadgeScans}>
                    <Text style={styles.headerBadgeScansText}>35MM FILM & 4K MASTER SCANS</Text>
                  </View>
                  <View style={styles.headerBadgeAudio}>
                    <Text style={styles.headerBadgeAudioText}>LOSSLESS AUDIO 96KHZ</Text>
                  </View>
                </View>

                <View style={styles.h1Wrapper}>
                  <Text style={[styles.mainH1, !isDesktop && styles.mainH1Mobile]}>
                    VISUAL ARCHIVE &{' '}
                    <Text style={styles.h1StickerText}>RECAP VAULT</Text>
                  </Text>
                </View>

                <Text style={styles.headerSubtext}>
                  Four-on-the-floor euphoria preserved in analog clarity and high-bandwidth 4K scans. Explore sweaty warehouse lasers, open lake breezes, and the tactile heartbeat of Chicago house music.
                </Text>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtonsCol}>
                <TouchableOpacity
                  style={styles.wallpapersBtn}
                  onPress={() => showToast('Downloading 4K Wallpaper ZIP (480MB)...')}
                  activeOpacity={0.85}
                >
                  <FestivalIcon name="folder_zip" size={20} color="#416400" />
                  <Text style={styles.wallpapersBtnText}>WALLPAPERS (4K ZIP)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitFanCamBtn}
                  onPress={() => showToast('Opening Fan Cam Upload Dropzone...')}
                  activeOpacity={0.85}
                >
                  <FestivalIcon name="cloud_upload" size={20} color="#1b1b1e" />
                  <Text style={styles.submitFanCamBtnText}>SUBMIT FAN CAM</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 4 Puffy Metric Pods */}
            <View style={[styles.metricPodsGrid, !isTablet && styles.metricPodsGridMobile]}>
              {METRIC_PODS.map((pod) => (
                <View key={pod.id} style={styles.metricPodCard}>
                  <View style={[styles.metricPuck, { backgroundColor: pod.bgPuck }]}>
                    <FestivalIcon
                      name={pod.icon as any}
                      size={20}
                      color="#18181B"
                    />
                  </View>
                  <View>
                    <Text style={styles.metricValue}>{pod.value}</Text>
                    <Text style={styles.metricLabel}>{pod.label}</Text>
                  </View>
                  <View style={[styles.metricDecorCircle, { backgroundColor: pod.decorBg }]} />
                </View>
              ))}
            </View>
          </View>

          {/* ─────────────────────────────────────────────────────────
              SECTION 2: SPOTLIGHT FESTIVAL FILM CARD
              ───────────────────────────────────────────────────────── */}
          <View style={styles.spotlightSection}>
            <View style={[styles.spotlightCard, !isDesktop && styles.spotlightCardMobile]}>
              {/* Media Inset Pod */}
              <View style={[styles.spotlightMediaPod, !isDesktop && styles.spotlightMediaPodMobile]}>
                <Image
                  source={{ uri: SPOTLIGHT_FILM.imageUrl }}
                  style={styles.spotlightImage as ImageStyle}
                  resizeMode="cover"
                />
                <View style={styles.spotlightOverlay}>
                  <View style={styles.spotlightTopBadgesRow}>
                    <View style={styles.aftermovieBadge}>
                      <Text style={styles.aftermovieBadgeText}>{SPOTLIGHT_FILM.formatBadge}</Text>
                    </View>
                    <View style={styles.runtimeBadge}>
                      <Text style={styles.runtimeBadgeText}>{SPOTLIGHT_FILM.runtime}</Text>
                    </View>
                  </View>

                  {/* Center Squish Play Button */}
                  <TouchableOpacity
                    style={styles.centerPlayBtn}
                    onPress={() => setIsSpotlightVideoOpen(true)}
                    activeOpacity={0.85}
                  >
                    <FestivalIcon name="play_arrow" size={42} color="#416400" />
                  </TouchableOpacity>

                  {/* Bottom Badges */}
                  <View style={styles.spotlightBottomBadgesRow}>
                    <View style={styles.directorsCutBadge}>
                      <Text style={styles.directorsCutBadgeText}>DIRECTOR'S CUT</Text>
                    </View>
                    <View style={styles.acousticsBadge}>
                      <Text style={styles.acousticsBadgeText}>VOID ACOUSTICS 96KHZ</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Information & Narrative Panel */}
              <View style={styles.spotlightInfoPanel}>
                <View>
                  <View style={styles.featureArchiveRow}>
                    <View style={styles.featureArchiveBadge}>
                      <Text style={styles.featureArchiveBadgeText}>FEATURE ARCHIVE</Text>
                    </View>
                    <Text style={styles.releasedSeptText}>RELEASED SEPT 2024</Text>
                  </View>
                  <Text style={styles.spotlightTitle}>{SPOTLIGHT_FILM.title}</Text>
                  <Text style={styles.spotlightDescription}>{SPOTLIGHT_FILM.description}</Text>
                </View>

                {/* Director Pill */}
                <View style={styles.directorPill}>
                  <View style={styles.directorLeft}>
                    <View style={styles.directorInitialsCircle}>
                      <Text style={styles.directorInitialsText}>MT</Text>
                    </View>
                    <View>
                      <Text style={styles.directorName}>{SPOTLIGHT_FILM.directorName}</Text>
                      <Text style={styles.directorSpecs}>{SPOTLIGHT_FILM.cameraSpec}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.shareBtn}
                    onPress={() => showToast('Copied Aftermovie Link to Clipboard!')}
                    activeOpacity={0.8}
                  >
                    <FestivalIcon name="share" size={20} color="#1b1b1e" />
                  </TouchableOpacity>
                </View>

                {/* Bottom ProRes Bar */}
                <View style={styles.proResRow}>
                  <View style={styles.proResLeft}>
                    <View style={styles.proResDot} />
                    <Text style={styles.proResText}>PRO RES 4444 XQ AVAILABLE ON REQUEST</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.creditsLink}
                    onPress={() => showToast('Full Festival Film Credits Loaded')}
                  >
                    <Text style={styles.creditsLinkText}>CREDITS</Text>
                    <FestivalIcon name="arrow_forward" size={16} color="#ab3500" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* ─────────────────────────────────────────────────────────
              SECTION 3: FILTER & LAYOUT SWITCH BAR
              ───────────────────────────────────────────────────────── */}
          <View style={styles.filterSection}>
            <View style={[styles.filterSwitchBar, !isTablet && styles.filterSwitchBarMobile]}>
              {/* Filter Chips */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterChipsRow}
              >
                {GALLERY_FILTERS.map((filter) => {
                  const isActive = activeFilter === filter.id;
                  return (
                    <TouchableOpacity
                      key={filter.id}
                      style={[
                        styles.filterChipBtn,
                        isActive && styles.filterChipBtnActive,
                      ]}
                      onPress={() => setActiveFilter(filter.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.filterChipText,
                          isActive && styles.filterChipTextActive,
                        ]}
                      >
                        {filter.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* View Mode Switch */}
              <View style={styles.viewModeWrap}>
                <Text style={styles.viewModeLabel}>VIEW MODE:</Text>
                <View style={styles.viewModeCapsule}>
                  <TouchableOpacity
                    style={[
                      styles.viewModeBtn,
                      viewMode === 'curated' && styles.viewModeBtnActive,
                    ]}
                    onPress={() => setViewMode('curated')}
                    activeOpacity={0.8}
                  >
                    <FestivalIcon
                      name="grid_view"
                      size={14}
                      color={viewMode === 'curated' ? '#fbf8fc' : '#424936'}
                    />
                    <Text
                      style={[
                        styles.viewModeBtnText,
                        viewMode === 'curated' && styles.viewModeBtnTextActive,
                      ]}
                    >
                      Curated
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.viewModeBtn,
                      viewMode === 'timeline' && styles.viewModeBtnActive,
                    ]}
                    onPress={() => setViewMode('timeline')}
                    activeOpacity={0.8}
                  >
                    <FestivalIcon
                      name="view_quilt"
                      size={14}
                      color={viewMode === 'timeline' ? '#fbf8fc' : '#424936'}
                    />
                    <Text
                      style={[
                        styles.viewModeBtnText,
                        viewMode === 'timeline' && styles.viewModeBtnTextActive,
                      ]}
                    >
                      Timeline
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* ─────────────────────────────────────────────────────────
              SECTION 4: CURATED PHOTOGRAPHIC SOUNDWAVES GALLERY
              ───────────────────────────────────────────────────────── */}
          <View style={styles.galleryGridSection}>
            <View
              style={[
                styles.galleryCardsGrid,
                viewMode === 'timeline' && styles.galleryCardsGridTimeline,
                !isTablet && styles.galleryCardsGridMobile,
              ]}
            >
              {filteredItems.map((item) => (
                <View key={item.id} style={styles.galleryCard}>
                  <View>
                    {/* Photo Inset Container */}
                    <View style={styles.galleryCardPhotoWrap}>
                      <Image
                        source={{ uri: item.imageUrl }}
                        style={styles.galleryCardPhoto as ImageStyle}
                        resizeMode="cover"
                      />
                      {/* Floating Tactile Stickers */}
                      <View style={styles.photoStickersWrap}>
                        <View style={styles.stagePillSticker}>
                          <Text style={styles.stagePillStickerText}>{item.stageBadge}</Text>
                        </View>
                        <View style={styles.timeTagSticker}>
                          <Text style={styles.timeTagStickerText}>{item.timeTag}</Text>
                        </View>
                      </View>

                      {/* Download Quick Action */}
                      <TouchableOpacity
                        style={styles.photoDownloadBtn}
                        onPress={() => showToast(`Downloaded 4K Master: ${item.title}`)}
                        activeOpacity={0.8}
                      >
                        <FestivalIcon name="download" size={20} color="#1b1b1e" />
                      </TouchableOpacity>
                    </View>

                    {/* Metadata & Story Block */}
                    <View style={styles.galleryCardMetaBlock}>
                      <View style={styles.galleryCardTagRow}>
                        <View style={styles.tagDotWrap}>
                          <View
                            style={[
                              styles.tagDot,
                              { backgroundColor: item.dotColor || '#fe6a34' },
                            ]}
                          />
                          <Text style={styles.tagText}>{item.tag}</Text>
                        </View>
                        <Text style={styles.bpmText}>{item.bpm}</Text>
                      </View>

                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                    </View>
                  </View>

                  {/* Camera Spec Bottom Strip */}
                  <View style={styles.cameraSpecStrip}>
                    <View style={styles.cameraSpecLeft}>
                      <FestivalIcon
                        name={item.specIcon as any}
                        size={16}
                        color={theme.colors.primary}
                      />
                      <Text style={styles.cameraSpecText}>{item.specName}</Text>
                    </View>
                    <View style={styles.isoPill}>
                      <Text style={styles.isoPillText}>{item.specTag}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* ─────────────────────────────────────────────────────────
              SECTION 5: COMMUNITY MEMORY VAULT & SOUNDBOARD PLAYER
              ───────────────────────────────────────────────────────── */}
          <View style={styles.communitySection}>
            <View style={[styles.communityGrid, !isDesktop && styles.communityGridMobile]}>
              {/* POD A: THE DISPOSABLE CAMERA EXPERIMENT (7 COLS) */}
              <View style={[styles.disposablePod, isDesktop && { flex: 7 }]}>
                <View>
                  <View style={styles.disposableHeaderRow}>
                    <View style={styles.communityProjectBadge}>
                      <Text style={styles.communityProjectBadgeText}>COMMUNITY ARCHIVE PROJECT</Text>
                    </View>
                    <Text style={styles.camerasCountText}>340 CAMERAS COLLECTED</Text>
                  </View>

                  <Text style={styles.disposableTitle}>The 35mm Disposable Camera Experiment</Text>
                  <Text style={styles.disposableSubtext}>
                    We distributed 500 single-use Fuji film cameras to dancers at entrance gates with one instruction:{' '}
                    <Text style={{ fontWeight: '700', color: '#1b1b1e' }}>
                      “Photograph what house music feels like.”
                    </Text>{' '}
                    Here are the unedited, candid contact sheets scanned at 4800dpi.
                  </Text>

                  {/* Contact Sheet 3-Strip Preview */}
                  <View style={styles.contactSheetGrid}>
                    {DISPOSABLE_PHOTOS.map((photo) => (
                      <View key={photo.id} style={styles.contactPhotoCard}>
                        <Image
                          source={{ uri: photo.imageUrl }}
                          style={styles.contactPhoto as ImageStyle}
                          resizeMode="cover"
                        />
                        <View style={styles.photoCodeBadge}>
                          <Text style={styles.photoCodeText}>{photo.code}</Text>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>

                {/* Bottom Batch 04 Row */}
                <View style={styles.batchNoticeRow}>
                  <View style={styles.batchNoticeLeft}>
                    <FestivalIcon name="auto_awesome" size={22} color={theme.colors.primary} />
                    <Text style={styles.batchNoticeText}>Full Contact Sheet Batch 04 Available</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.viewRollsBtn}
                    onPress={() => showToast('Opening Archive with 500 Rolls...')}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.viewRollsBtnText}>VIEW ALL 500 ROLLS</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* POD B: LIVE SOUNDBOARD TAPE PLAYER & UPLOAD (5 COLS) */}
              <View style={[styles.soundboardCol, isDesktop && { flex: 5 }]}>
                {/* Live Soundboard Player Widget */}
                <View style={styles.soundboardWidget}>
                  <View style={styles.soundboardTopRow}>
                    <View style={styles.soundboardLiveIndicator}>
                      <View style={styles.soundboardLiveDot} />
                      <Text style={styles.soundboardLiveText}>STREAMING ARCHIVE TAPE</Text>
                    </View>
                    <View style={styles.tapeSidePill}>
                      <Text style={styles.tapeSideText}>TAPE #24 / SIDE A</Text>
                    </View>
                  </View>

                  <View style={styles.soundboardCardInner}>
                    <View style={styles.soundboardTrackRow}>
                      <View>
                        <Text style={styles.soundboardTrackTitle}>Frankie's Legacy Set</Text>
                        <Text style={styles.soundboardTrackLocation}>Live from Sunset Cove Sanctuary</Text>
                      </View>
                      <TouchableOpacity
                        style={[
                          styles.soundboardPlayBtn,
                          isPlayingSoundboard && styles.soundboardPlayBtnActive,
                        ]}
                        onPress={() => setIsPlayingSoundboard(!isPlayingSoundboard)}
                        activeOpacity={0.85}
                      >
                        <FestivalIcon
                          name={isPlayingSoundboard ? 'pause' : 'play_arrow'}
                          size={24}
                          color={isPlayingSoundboard ? '#ffffff' : '#416400'}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Animated Waveform Visualization */}
                    <View style={styles.waveformContainer}>
                      {waveHeights.map((h, idx) => (
                        <View
                          key={idx}
                          style={[
                            styles.waveBar,
                            {
                              height: h,
                              backgroundColor:
                                idx % 4 === 0
                                  ? '#1b1b1e'
                                  : idx % 4 === 1
                                  ? '#a3e635'
                                  : idx % 4 === 2
                                  ? '#fe6a34'
                                  : '#b4136d',
                            },
                          ]}
                        />
                      ))}
                    </View>

                    <View style={styles.waveformTimeRow}>
                      <Text style={styles.waveformTimeText}>{formatTime(soundboardSec)}</Text>
                      <Text style={styles.waveformTimeText}>1:45:00</Text>
                    </View>
                  </View>
                </View>

                {/* Upload Dropzone Pod */}
                <View style={styles.uploadDropzoneCard}>
                  <View style={styles.uploadPuck}>
                    <FestivalIcon name="cloud_upload" size={24} color="#390c00" />
                  </View>
                  <Text style={styles.uploadTitle}>Contribute To The 2025 Archive</Text>
                  <Text style={styles.uploadDescription}>
                    Drop your full-resolution 4K clips, iPhone rolls, and sound snippets. Selected entries receive 2026 Weekend VIP Passes.
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadBtn}
                    onPress={() => showToast('Opening System File Picker...')}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.uploadBtnText}>SELECT PHOTO / VIDEO FILES</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            06 — SITE FOOTER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.footerContainer}>
          <View style={styles.footerInner}>
            <View style={[styles.footerGrid, !isDesktop && styles.footerGridMobile]}>
              {/* Col 1: Brand & Ethos */}
              <View style={[styles.footerCol1, isDesktop && { flex: 5 }]}>
                <View style={styles.footerBrandRow}>
                  <View style={styles.footerLogoBadge}>
                    <Text style={styles.footerLogoText}>{FESTIVAL_INFO.shortName}</Text>
                  </View>
                  <View style={styles.footerSquishBadge}>
                    <Text style={styles.footerSquishText}>SQUISH FACTOR 10/10</Text>
                  </View>
                </View>
                <Text style={styles.footerDescription}>
                  Born in the underground warehouses of Chicago. Engineered with high-rebound dancefloor foam acoustics and kinetic house culture.
                </Text>
                <View style={styles.footerPillsRow}>
                  <View style={styles.footerSmallPill}>
                    <Text style={styles.footerSmallPillText}>4 STAGES</Text>
                  </View>
                  <View style={styles.footerSmallPillRotated1}>
                    <Text style={styles.footerSmallPillText}>120BPM TO 134BPM</Text>
                  </View>
                  <View style={styles.footerSmallPillRotated2}>
                    <Text style={styles.footerSmallPillText}>WEIGHTLESS COMFORT</Text>
                  </View>
                </View>
              </View>

              {/* Col 2: Navigation Links */}
              <View style={[styles.footerCol2, isDesktop && { flex: 3 }]}>
                <Text style={styles.footerNavTitle}>Navigate</Text>
                <TouchableOpacity onPress={() => onNavigate?.('landing')}>
                  <Text style={styles.footerNavLink}>Artist Lineup 2025</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('schedule')}>
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
                  <Text style={[styles.footerNavLink, { fontWeight: '700', color: theme.colors.onSurface }]}>Footage Archive</Text>
                </TouchableOpacity>
              </View>

              {/* Col 3: Newsletter */}
              <View style={[styles.footerCol3, isDesktop && { flex: 4 }]}>
                <Text style={styles.footerNavTitle}>Club Newsletter</Text>
                <Text style={styles.footerNewsletterSubtitle}>
                  Get secret stage drop alerts, afterparty coordinates, and tactile shoe collabs.
                </Text>
                <View style={styles.newsletterInputWrap}>
                  <TextInput
                    style={styles.newsletterInput}
                    placeholder="jack@housemusic.club"
                    placeholderTextColor="#424936"
                    value={newsletterEmail}
                    onChangeText={setNewsletterEmail}
                  />
                  <TouchableOpacity
                    style={styles.newsletterBtn}
                    onPress={handleSubscribe}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.newsletterBtnText}>
                      {isSubscribed ? 'JOINED!' : 'JOIN'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.audioPoweredRow}>
                  <FestivalIcon name="volume_up" size={16} color={theme.colors.onSurfaceVariant} />
                  <Text style={styles.audioPoweredText}>
                    POWERED BY FUNKTION-ONE & SLYDE ACOUSTIC FOAM
                  </Text>
                </View>
              </View>
            </View>

            {/* Bottom copyright row */}
            <View style={[styles.footerBottomBar, !isTablet && styles.footerBottomBarMobile]}>
              <Text style={styles.footerCopyright}>
                © 2025 Bring Back House Music Festival. All rights reserved. Crafted with Tactile Toy Ergonomics.
              </Text>
              <View style={styles.footerLegalLinks}>
                <TouchableOpacity><Text style={styles.footerLegalText}>Privacy</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerLegalText}>Safety Guidelines</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerLegalText}>Accessibility</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ─────────────────────────────────────────────────────────
          SPOTLIGHT VIDEO MODAL
          ───────────────────────────────────────────────────────── */}
      <Modal
        visible={isSpotlightVideoOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSpotlightVideoOpen(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{SPOTLIGHT_FILM.title}</Text>
              <TouchableOpacity
                onPress={() => setIsSpotlightVideoOpen(false)}
                style={styles.modalCloseBtn}
              >
                <FestivalIcon name="close" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalVideoPlaceholder}>
              <Image
                source={{ uri: SPOTLIGHT_FILM.imageUrl }}
                style={styles.modalImage as ImageStyle}
                resizeMode="cover"
              />
              <View style={styles.modalPlayPuck}>
                <FestivalIcon name="play_arrow" size={36} color="#ffffff" />
              </View>
              <Text style={styles.modalSimulatedText}>
                Streaming Master 4K Feed • Void Acoustics 96kHz Lossless
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* Floating feedback toast */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <FestivalIcon name="check_circle" size={18} color="#18181B" />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}
    </View>
  );
};

/* ─────────────────────────────────────────────────────────
   STYLESHEET
   Exact match to scratch/gallery_mockup.html
   ───────────────────────────────────────────────────────── */
const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: '#fbf8fc',
  },

  // 00 — HEADER
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: 'rgba(251, 248, 252, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(24, 24, 27, 0.08)',
    ...(Platform.OS === 'web' ? ({ backdropFilter: 'blur(12px)' } as any) : {}),
  },
  headerInner: {
    height: 80,
    maxWidth: 1440,
    width: '100%',
    marginHorizontal: 'auto',
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
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  logoBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#fbf8fc',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  headerDatePill: {
    backgroundColor: '#ffc2d7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  headerDatePillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ae0a69',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  navContainerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f2f7',
    padding: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 4,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  navPillLink: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  navPillLinkActive: {
    backgroundColor: '#a3e635',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  navPillLinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: '#424936',
  },
  navPillLinkTextActive: {
    color: '#416400',
  },
  headerRightGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerPassesBtn: {
    backgroundColor: '#fe6a34',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  headerPassesBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  headerAvatarCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#446900',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },

  // SCROLL CONTENT
  scrollContainer: {
    flex: 1,
    marginTop: 80,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  contentWrapper: {
    maxWidth: 1440,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
  },

  // SECTION 1: HEADER & VAULT METRICS
  sectionHeader: {
    paddingTop: 36,
    paddingBottom: 24,
    gap: 32,
  },
  titleActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 24,
  },
  titleActionRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  titleCol: {
    flex: 1,
    maxWidth: 820,
    gap: 12,
  },
  headerBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  headerBadgeArchive: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  headerBadgeArchiveText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  headerBadgeScans: {
    backgroundColor: '#ffd9e4',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  headerBadgeScansText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#3e0022',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  headerBadgeAudio: {
    backgroundColor: '#ffdbd0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  headerBadgeAudioText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#390c00',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  h1Wrapper: {
    marginTop: 4,
  },
  mainH1: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 54,
    lineHeight: 58,
    fontWeight: '900',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -1.5,
  },
  mainH1Mobile: {
    fontSize: 34,
    lineHeight: 38,
  },
  h1StickerText: {
    backgroundColor: '#fe6a34',
    color: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  headerSubtext: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 17,
    lineHeight: 26,
    color: '#424936',
    maxWidth: 720,
  },
  actionButtonsCol: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  wallpapersBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#a3e635',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  wallpapersBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },
  submitFanCamBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  submitFanCamBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },

  // METRIC PODS
  metricPodsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  metricPodsGridMobile: {
    flexDirection: 'column',
  },
  metricPodCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'space-between',
    minHeight: 150,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  metricPuck: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    marginBottom: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  metricValue: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 40,
    lineHeight: 42,
    fontWeight: '900',
    color: '#1b1b1e',
    letterSpacing: -1,
  },
  metricLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 4,
  },
  metricDecorCircle: {
    position: 'absolute',
    right: -12,
    bottom: -12,
    width: 64,
    height: 64,
    borderRadius: 32,
    pointerEvents: 'none',
  },

  // SECTION 2: SPOTLIGHT FILM CARD
  spotlightSection: {
    paddingVertical: 16,
  },
  spotlightCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    gap: 32,
    alignItems: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  spotlightCardMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  spotlightMediaPod: {
    flex: 3,
    height: 380,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    backgroundColor: '#303033',
  },
  spotlightMediaPodMobile: {
    height: 260,
  },
  spotlightImage: {
    width: '100%',
    height: '100%',
  },
  spotlightOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(27, 27, 30, 0.45)',
    justifyContent: 'space-between',
    padding: 20,
  },
  spotlightTopBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aftermovieBadge: {
    backgroundColor: '#fe6a34',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  aftermovieBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  runtimeBadge: {
    backgroundColor: 'rgba(251, 248, 252, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  runtimeBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
  },
  centerPlayBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#a3e635',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  spotlightBottomBadgesRow: {
    flexDirection: 'row',
    gap: 8,
  },
  directorsCutBadge: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  directorsCutBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  acousticsBadge: {
    backgroundColor: '#b2f746',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  acousticsBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#121f00',
    textTransform: 'uppercase',
  },

  // SPOTLIGHT INFO PANEL
  spotlightInfoPanel: {
    flex: 2,
    gap: 20,
    justifyContent: 'space-between',
  },
  featureArchiveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  featureArchiveBadge: {
    backgroundColor: '#ffc2d7',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  featureArchiveBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ae0a69',
    textTransform: 'uppercase',
  },
  releasedSeptText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
  },
  spotlightTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.8,
  },
  spotlightDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 23,
    color: '#424936',
    marginTop: 8,
  },
  directorPill: {
    backgroundColor: '#f6f2f7',
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  directorLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  directorInitialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fe6a34',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#18181B',
  },
  directorInitialsText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '900',
    color: '#ffffff',
  },
  directorName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  directorSpecs: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: '#424936',
  },
  shareBtn: {
    backgroundColor: '#ffffff',
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  proResRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  proResLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  proResDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#a3e635',
    borderWidth: 1,
    borderColor: '#18181B',
  },
  proResText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  creditsLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  creditsLinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ab3500',
    textTransform: 'uppercase',
  },

  // SECTION 3: FILTER & VIEW MODE BAR
  filterSection: {
    paddingTop: 24,
    paddingBottom: 16,
  },
  filterSwitchBar: {
    backgroundColor: '#f6f2f7',
    padding: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  filterSwitchBarMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
    borderRadius: 20,
  },
  filterChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChipBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  filterChipBtnActive: {
    backgroundColor: '#a3e635',
    borderColor: '#18181B',
  },
  filterChipText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
  },
  filterChipTextActive: {
    color: '#416400',
  },
  viewModeWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingRight: 6,
  },
  viewModeLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  viewModeCapsule: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    padding: 3,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 4,
  },
  viewModeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 9999,
  },
  viewModeBtnActive: {
    backgroundColor: '#1b1b1e',
    borderWidth: 1,
    borderColor: '#18181B',
  },
  viewModeBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  viewModeBtnTextActive: {
    color: '#fbf8fc',
  },

  // SECTION 4: GALLERY CARDS GRID
  galleryGridSection: {
    paddingVertical: 16,
  },
  galleryCardsGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  galleryCardsGridTimeline: {
    flexWrap: 'wrap',
  },
  galleryCardsGridMobile: {
    flexDirection: 'column',
  },
  galleryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 16,
    justifyContent: 'space-between',
    minWidth: 280,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  galleryCardPhotoWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#18181B',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e4e1e6',
  },
  galleryCardPhoto: {
    width: '100%',
    height: '100%',
  },
  photoStickersWrap: {
    position: 'absolute',
    top: 10,
    left: 10,
    gap: 4,
    pointerEvents: 'none',
  },
  stagePillSticker: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
    alignSelf: 'flex-start',
    transform: [{ rotate: '-3deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  stagePillStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },
  timeTagSticker: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#18181B',
    alignSelf: 'flex-start',
  },
  timeTagStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  photoDownloadBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  galleryCardMetaBlock: {
    paddingTop: 16,
  },
  galleryCardTagRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  tagDotWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tagDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  bpmText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
  },
  cardTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  cardSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 18,
    color: '#424936',
    marginTop: 6,
  },
  cameraSpecStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(27, 27, 30, 0.08)',
    paddingTop: 12,
    marginTop: 16,
  },
  cameraSpecLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cameraSpecText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  isoPill: {
    backgroundColor: '#ffdbd0',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  isoPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#390c00',
    textTransform: 'uppercase',
  },

  // SECTION 5: COMMUNITY MEMORY VAULT & SOUNDBOARD
  communitySection: {
    paddingVertical: 24,
  },
  communityGrid: {
    flexDirection: 'row',
    gap: 24,
  },
  communityGridMobile: {
    flexDirection: 'column',
  },
  disposablePod: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    gap: 20,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  disposableHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  communityProjectBadge: {
    backgroundColor: '#ffdbd0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  communityProjectBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#390c00',
    textTransform: 'uppercase',
  },
  camerasCountText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
  },
  disposableTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  disposableSubtext: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: '#424936',
    marginTop: 6,
    maxWidth: 620,
  },
  contactSheetGrid: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#e4e1e6',
    padding: 12,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#18181B',
    marginTop: 20,
  },
  contactPhotoCard: {
    flex: 1,
    aspectRatio: 4 / 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#18181B',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#dcd9dd',
  },
  contactPhoto: {
    width: '100%',
    height: '100%',
  },
  photoCodeBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(27, 27, 30, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  photoCodeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 9,
    fontWeight: '800',
    color: '#ffffff',
  },
  batchNoticeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 2,
    borderTopColor: 'rgba(27, 27, 30, 0.08)',
    paddingTop: 16,
    gap: 12,
    flexWrap: 'wrap',
  },
  batchNoticeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  batchNoticeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  viewRollsBtn: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  viewRollsBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },

  // POD B: SOUNDBOARD & UPLOAD
  soundboardCol: {
    gap: 24,
  },
  soundboardWidget: {
    backgroundColor: '#f6f2f7',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 12,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  soundboardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soundboardLiveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  soundboardLiveDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#fe6a34',
    borderWidth: 1,
    borderColor: '#18181B',
  },
  soundboardLiveText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  tapeSidePill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  tapeSideText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  soundboardCardInner: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 12,
  },
  soundboardTrackRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  soundboardTrackTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  soundboardTrackLocation: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: '#424936',
  },
  soundboardPlayBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#a3e635',
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  soundboardPlayBtnActive: {
    backgroundColor: '#fe6a34',
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: 48,
    paddingVertical: 4,
  },
  waveBar: {
    flex: 1,
    borderRadius: 4,
  },
  waveformTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  waveformTimeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
  },

  // UPLOAD DROPZONE
  uploadDropzoneCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 6px 0px #18181B' } as any) : {}),
  },
  uploadPuck: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffd9e4',
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  uploadTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  uploadDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 18,
    color: '#424936',
    textAlign: 'center',
    maxWidth: 300,
  },
  uploadBtn: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    marginTop: 4,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  uploadBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  // 06 — SITE FOOTER
  footerContainer: {
    backgroundColor: '#f6f2f7',
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    marginTop: 64,
    paddingTop: 48,
    paddingBottom: 36,
  },
  footerInner: {
    maxWidth: 1440,
    width: '100%',
    marginHorizontal: 'auto',
    paddingHorizontal: 24,
  },
  footerGrid: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 48,
  },
  footerGridMobile: {
    flexDirection: 'column',
  },
  footerCol1: {
    gap: 16,
    alignItems: 'flex-start',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  footerLogoBadge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  footerLogoText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#fbf8fc',
    textTransform: 'uppercase',
  },
  footerSquishBadge: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
  },
  footerSquishText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },
  footerDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: '#424936',
    maxWidth: 420,
  },
  footerPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 8,
  },
  footerSmallPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  footerSmallPillRotated1: {
    backgroundColor: '#ffdbd0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  footerSmallPillRotated2: {
    backgroundColor: '#ffd9e4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  footerSmallPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#18181B',
  },
  footerCol2: {
    gap: 10,
  },
  footerNavTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  footerNavLink: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: '#424936',
    paddingVertical: 2,
  },
  footerCol3: {
    gap: 12,
  },
  footerNewsletterSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: '#424936',
  },
  newsletterInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  newsletterInput: {
    flex: 1,
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: '#1b1b1e',
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  newsletterBtn: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  newsletterBtnText: {
    color: '#416400',
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  audioPoweredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  audioPoweredText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#424936',
    letterSpacing: 0.5,
  },
  footerBottomBar: {
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    paddingTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  footerBottomBarMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  footerCopyright: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#424936',
  },
  footerLegalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  footerLegalText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },

  // MODAL
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(27, 27, 30, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 720,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 8px 0px #18181B' } as any) : {}),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  modalCloseBtn: {
    padding: 6,
  },
  modalVideoPlaceholder: {
    height: 360,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalImage: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  modalPlayPuck: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#fe6a34',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  modalSimulatedText: {
    position: 'absolute',
    bottom: 16,
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
    backgroundColor: 'rgba(27, 27, 30, 0.8)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },

  // TOAST
  toastContainer: {
    position: 'absolute',
    top: 96,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#a3e635',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    zIndex: 9999,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  toastText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
  },
});
