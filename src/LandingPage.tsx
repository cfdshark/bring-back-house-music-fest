import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  ImageStyle,
} from 'react-native';
import { theme } from './theme';
import {
  FESTIVAL_INFO,
  DAY_FILTERS,
  HEADLINERS,
  UNDERGROUND_SELECTORS,
  STAGES,
  PASSES,
  BEYOND_MUSIC_FEATURES,
} from './festivalData';
import { FestivalDayFilter, CountdownState } from './types';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface LandingPageProps {
  onNavigate?: (screen: Screen) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const [activeDay, setActiveDay] = useState<FestivalDayFilter>('all');
  const [bookmarkedArtists, setBookmarkedArtists] = useState<string[]>([]);
  const [isAnthemPlaying, setIsAnthemPlaying] = useState<boolean>(false);
  const [showAnthemDrawer, setShowAnthemDrawer] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 142,
    hours: 5,
    mins: 34,
    secs: 51,
  });

  const scrollViewRef = useRef<ScrollView>(null);
  const lineupRef = useRef<View>(null);
  const stagesRef = useRef<View>(null);
  const passesRef = useRef<View>(null);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleBookmark = (id: string) => {
    setBookmarkedArtists((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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

  const scrollToSection = (ref: React.RefObject<View>) => {
    ref.current?.measureLayout(
      scrollViewRef.current as any,
      (x, y) => scrollViewRef.current?.scrollTo({ y, animated: true }),
      () => {}
    );
  };

  const filteredArtists = HEADLINERS.filter(
    (a) => activeDay === 'all' || a.day === activeDay
  );

  return (
    <View style={styles.rootContainer}>
      {/* ─────────────────────────────────────────────────────────
          00 — FIXED TOP HEADER
          ───────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerInner}>
          {/* Logo & Tag Sticker */}
          <View style={styles.headerLeftGroup}>
            <TouchableOpacity
              style={styles.logoBadge}
              onPress={() => scrollViewRef.current?.scrollTo({ y: 0, animated: true })}
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
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => scrollToSection(lineupRef)}
              activeOpacity={0.8}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>Lineup</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('schedule')}
              activeOpacity={0.8}
            >
              <Text style={styles.navPillLinkText}>Schedule</Text>
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

          {/* Right Action Group */}
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
        ref={scrollViewRef}
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Marquee Ticker */}
        <View style={styles.marqueeTicker}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tickerRow}>
              <View style={styles.tickerItem}>
                <FestivalIcon name="graphic_eq" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>CHICAGO LAKESHORE PARK • AUGUST 22-24, 2025</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="bolt" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>SQUISH FACTOR 10/10 HIGH-REBOUND FOAM TURF</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="album" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>FOUR-ON-THE-FLOOR CULTURE REVIVAL</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="star" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>TIER 1 GA ALMOST SOLD OUT (94% ALLOCATED)</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="graphic_eq" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>CHICAGO LAKESHORE PARK • AUGUST 22-24, 2025</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="bolt" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>SQUISH FACTOR 10/10 HIGH-REBOUND FOAM TURF</Text>
              </View>
              <Text style={styles.tickerStar}>★</Text>
              <View style={styles.tickerItem}>
                <FestivalIcon name="album" size={16} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.tickerText}>FOUR-ON-THE-FLOOR CULTURE REVIVAL</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ─────────────────────────────────────────────────────────
            01 — HERO SECTION (media_1790992067894.png)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={styles.heroCenterCol}>
            {/* Tactile Pill Badge Banner */}
            <View style={styles.heroPillBanner}>
              <View style={styles.pulsingDot} />
              <Text style={styles.heroPillBannerText}>
                FOUR-ON-THE-FLOOR EUPHORIA • THREE DAYS BY LAKE MICHIGAN
              </Text>
              <View style={styles.editionBadge}>
                <Text style={styles.editionBadgeText}>2025 EDITION</Text>
              </View>
            </View>

            {/* Main Headline with Floated Badges */}
            <View style={styles.headlineWrapper}>
              {/* Playful Floated Sticker Badges matching reference screenshot */}
              <View style={styles.stickerTopRight}>
                <Text style={styles.stickerTopRightText}>★ 100% PURE BOUNCE ★</Text>
              </View>
              <View style={styles.stickerBottomLeft}>
                <Text style={styles.stickerBottomLeftText}>ORIGINAL CHICAGO SOUL</Text>
              </View>

              <Text style={styles.mainHeadline}>BRING BACK HOUSE MUSIC</Text>
            </View>

            {/* Subtitle */}
            <Text style={styles.heroSubtitle}>
              The definitive open-air pilgrimage dedicated to tactile rhythms, heavyweight bassline therapy, and cloud-soft foam floor acoustics.
            </Text>

            {/* Action Buttons Row */}
            <View style={styles.heroActionsRow}>
              <TouchableOpacity
                style={styles.heroPassesBtn}
                onPress={() => scrollToSection(passesRef)}
                activeOpacity={0.85}
              >
                <FestivalIcon name="confirmation_number" size={20} color="#ffffff" />
                <Text style={styles.heroPassesBtnText}>GRAB 2025 PASSES</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.heroAnthemBtn}
                onPress={() => {
                  setShowAnthemDrawer(true);
                  setIsAnthemPlaying(true);
                }}
                activeOpacity={0.85}
              >
                <FestivalIcon name="play_circle" size={20} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.heroAnthemBtnText}>LISTEN TO ANTHEM</Text>
              </TouchableOpacity>
            </View>

            {/* Tactile Countdown Pod */}
            <View style={styles.countdownPod}>
              <Text style={styles.countdownLabel}>COUNTDOWN TO DROP:</Text>
              <View style={styles.countdownDigitsRow}>
                <View style={styles.countdownUnit}>
                  <Text style={styles.countdownUnitText}>{countdown.days} DAYS</Text>
                </View>
                <Text style={styles.countdownColon}>:</Text>
                <View style={styles.countdownUnit}>
                  <Text style={styles.countdownUnitText}>
                    {countdown.hours < 10 ? `0${countdown.hours}` : countdown.hours} HRS
                  </Text>
                </View>
                <Text style={styles.countdownColon}>:</Text>
                <View style={styles.countdownUnit}>
                  <Text style={styles.countdownUnitText}>
                    {countdown.mins < 10 ? `0${countdown.mins}` : countdown.mins} MINS
                  </Text>
                </View>
                <Text style={styles.countdownColon}>:</Text>
                <View style={styles.countdownUnitActive}>
                  <Text style={styles.countdownUnitActiveText}>
                    {countdown.secs < 10 ? `0${countdown.secs}` : countdown.secs} SEC
                  </Text>
                </View>
              </View>
            </View>

            {/* Festival Showcase Hero Image Container */}
            <View style={styles.heroImageContainer}>
              <Image
                source={{ uri: FESTIVAL_INFO.heroImageUrl }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroImageOverlay} />

              {/* Top corner live feed sticker */}
              <View style={styles.heroLiveSticker}>
                <View style={styles.liveIndicatorDot} />
                <Text style={styles.heroLiveStickerText}>MAIN ARENA • LIVE FEED</Text>
              </View>

              {/* Bottom bar specs */}
              <View style={styles.heroImageBottomBar}>
                <View style={styles.heroQuadSoundBadge}>
                  <FestivalIcon name="volume_up" size={18} color={theme.colors.secondaryContainer} />
                  <Text style={styles.heroQuadSoundText}>140,000 WATT TACTILE QUAD SOUND</Text>
                </View>

                <View style={styles.heroTagsRow}>
                  <View style={styles.heroZeroFatigueBadge}>
                    <Text style={styles.heroZeroFatigueText}>ZERO PAVEMENT FATIGUE</Text>
                  </View>
                  <View style={styles.heroArtistsBadge}>
                    <Text style={styles.heroArtistsBadgeText}>42 ARTISTS</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            02 — INTERACTIVE SQUISH METER BAR
            ───────────────────────────────────────────────────────── */}
        <View style={styles.squishMeterSection}>
          <View style={styles.squishMeterInner}>
            <View style={styles.squishMeterLeft}>
              <View style={styles.squishMeterIconCircle}>
                <FestivalIcon name="sports_kabaddi" size={24} color="#ffffff" />
              </View>
              <View style={styles.squishMeterTextCol}>
                <Text style={styles.squishMeterTitle}>HIGH-REBOUND DANCEFLOOR METER</Text>
                <Text style={styles.squishMeterSub}>
                  Patented 60mm cellular spring foam layer keeps dancers moving 10+ hours fatigue-free.
                </Text>
              </View>
            </View>

            {/* Squish Meter Capsules */}
            <View style={styles.squishCapsulesPod}>
              <Text style={styles.squishCapsulesLabel}>SQUISH FACTOR:</Text>
              <View style={styles.squishCapsulesRow}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <View key={i} style={styles.squishPillGreen} />
                ))}
                <View style={styles.squishPillOrange} />
              </View>
              <View style={styles.squishFactorScorePill}>
                <Text style={styles.squishFactorScoreText}>10 / 10</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            03 — LINEUP SECTION / SOUND ROSTER (media_1790992084621.png)
            ───────────────────────────────────────────────────────── */}
        <View ref={lineupRef} style={styles.lineupSection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <View style={styles.purityBadge}>
                <Text style={styles.purityBadgeText}>CURATED PURITY</Text>
              </View>
              <Text style={styles.sectionHeadline}>2025 SOUND ROSTER</Text>
              <Text style={styles.sectionSubtitle}>
                Direct pioneers from Chicago, Detroit, London, and Berlin performing non-stop vinyl and analog live sessions.
              </Text>
            </View>

            {/* Day Filter Pills - Right Aligned matching reference screenshot */}
            <View style={styles.filterChipsRow}>
              {DAY_FILTERS.map((f) => {
                const isActive = activeDay === f.value;
                return (
                  <TouchableOpacity
                    key={f.value}
                    style={[
                      styles.filterChipBtn,
                      isActive && styles.filterChipBtnActive,
                    ]}
                    onPress={() => setActiveDay(f.value)}
                    activeOpacity={0.85}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        isActive && styles.filterChipTextActive,
                      ]}
                    >
                      {f.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Bento Artist Grid */}
          <View style={styles.artistGrid}>
            {filteredArtists.map((artist) => {
              const isBookmarked = bookmarkedArtists.includes(artist.id);
              const isHoneyDijon = artist.name === 'HONEY DIJON';

              return (
                <View key={artist.id} style={styles.artistCard}>
                  <View>
                    <View style={styles.artistCardTopRow}>
                      <View
                        style={[
                          styles.artistBadgePill,
                          artist.badgeColorKey === 'secondary'
                            ? styles.badgeSecondary
                            : artist.badgeColorKey === 'tertiary'
                            ? styles.badgeTertiary
                            : styles.badgePrimary,
                        ]}
                      >
                        <Text
                          style={[
                            styles.artistBadgePillText,
                            artist.badgeColorKey === 'secondary'
                              ? styles.badgeSecondaryText
                              : artist.badgeColorKey === 'tertiary'
                              ? styles.badgeTertiaryText
                              : styles.badgePrimaryText,
                          ]}
                        >
                          {artist.badge}
                        </Text>
                      </View>
                      <Text style={styles.artistStageText}>{artist.stage}</Text>
                    </View>

                    {/* Artist Image Pod with Thick Corners and Border */}
                    <View style={styles.artistImageContainer}>
                      {artist.image && (
                        <Image
                          source={{ uri: artist.image }}
                          style={styles.artistImage}
                          resizeMode="cover"
                        />
                      )}
                      {artist.specialTag && (
                        <View style={styles.artistImageTagPill}>
                          <Text style={styles.artistImageTagText}>{artist.specialTag}</Text>
                        </View>
                      )}
                    </View>

                    {/* Artist Name: HONEY DIJON in bright orange as shown in reference */}
                    <Text
                      style={[
                        styles.artistName,
                        isHoneyDijon && styles.artistNameOrange,
                      ]}
                    >
                      {artist.name}
                    </Text>
                    <Text style={styles.artistDescription}>{artist.description}</Text>
                  </View>

                  <View style={styles.artistCardBottomRow}>
                    <View style={styles.artistTimePill}>
                      <Text style={styles.artistTimeText}>{artist.timeRange}</Text>
                    </View>
                    <TouchableOpacity
                      style={[
                        styles.bookmarkBtn,
                        isBookmarked && styles.bookmarkBtnActive,
                      ]}
                      onPress={() => toggleBookmark(artist.id)}
                      activeOpacity={0.85}
                    >
                      <FestivalIcon
                        name={isBookmarked ? 'verified' : 'bookmark_add'}
                        size={20}
                        color={isBookmarked ? '#ffffff' : theme.colors.onSurface}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Secondary Artist Tactile Pills Matrix */}
          <View style={styles.secondaryRosterBox}>
            <View style={styles.secondaryRosterHeader}>
              <View>
                <Text style={styles.secondaryRosterSubtitle}>PLUS CRATE DIGGERS & RESIDENTS</Text>
                <Text style={styles.secondaryRosterTitle}>DISCOVERY WAVE A-Z</Text>
              </View>
              <View style={styles.actsCountPill}>
                <Text style={styles.actsCountText}>24 ADDITIONAL ACTS</Text>
              </View>
            </View>

            <View style={styles.secondaryPillsWrap}>
              {UNDERGROUND_SELECTORS.map((act, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.secondaryActPill}
                  activeOpacity={0.8}
                >
                  <FestivalIcon name="album" size={15} color={theme.colors.onSurface} />
                  <Text style={styles.secondaryActText}>{act}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            04 — 4 TACTILE SANCTUARIES / STAGES (media_1790992097803.png)
            ───────────────────────────────────────────────────────── */}
        <View ref={stagesRef} style={styles.stagesSection}>
          <View style={styles.stagesCenterHeader}>
            <View style={styles.ergonomicsBadge}>
              <Text style={styles.ergonomicsBadgeText}>ACOUSTIC TOY ERGONOMICS</Text>
            </View>
            <Text style={styles.stagesHeadline}>4 TACTILE SANCTUARIES</Text>
            <Text style={styles.stagesSubtitle}>
              Engineered from the ground up with shock-absorbing foam subflooring and custom Funktion-One arrays tailored for body resonance.
            </Text>
          </View>

          <View style={styles.stagesGrid}>
            {STAGES.map((stage) => {
              const isWarehouse = stage.id === 'warehouse';
              const isSunsetCove = stage.id === 'sunset-cove';
              const isDome = stage.id === 'neon-groove';
              const isBasement = stage.id === 'the-basement';

              return (
                <View key={stage.id} style={styles.stageCard}>
                  <View>
                    <View style={styles.stageCardTopRow}>
                      <View style={styles.stageNumPill}>
                        <Text style={styles.stageNumText}>{stage.num}</Text>
                      </View>
                      <View
                        style={[
                          styles.stageCapacityPill,
                          isWarehouse && styles.stageCapacityLime,
                          isSunsetCove && styles.stageCapacityPeach,
                          isDome && styles.stageCapacityPink,
                          isBasement && styles.stageCapacityLime,
                        ]}
                      >
                        <Text
                          style={[
                            styles.stageCapacityText,
                            isWarehouse && styles.stageCapacityTextLime,
                            isSunsetCove && styles.stageCapacityTextPeach,
                            isDome && styles.stageCapacityTextPink,
                            isBasement && styles.stageCapacityTextLime,
                          ]}
                        >
                          CAPACITY: {stage.capacity}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.stageName}>{stage.name}</Text>
                    <Text style={styles.stageTagline}>{stage.tagline}</Text>

                    <View style={styles.stageSpecsWrap}>
                      <View style={styles.stageSpecPill}>
                        <Text style={styles.stageSpecText}>{stage.soundRig}</Text>
                      </View>

                      {isWarehouse ? (
                        <View style={styles.stageSpecPillPeach}>
                          <Text style={styles.stageSpecTextPeach}>Rebound Foam: 80mm</Text>
                        </View>
                      ) : isSunsetCove ? (
                        <View style={styles.stageSpecPillLime}>
                          <Text style={styles.stageSpecTextLime}>Boardwalk Foam Pad</Text>
                        </View>
                      ) : isDome ? (
                        <View style={styles.stageSpecPillRose}>
                          <Text style={styles.stageSpecTextRose}>High-Grip Tactile Sole</Text>
                        </View>
                      ) : (
                        <View style={styles.stageSpecPillPeachRotated}>
                          <Text style={styles.stageSpecTextPeach}>Ultra-Dense Sub Base</Text>
                        </View>
                      )}

                      {isWarehouse ? (
                        <View style={styles.stageSpecPillPink}>
                          <Text style={styles.stageSpecTextPink}>Peak BPM: 128</Text>
                        </View>
                      ) : isSunsetCove ? (
                        <View style={styles.stageSpecPill}>
                          <Text style={styles.stageSpecText}>Golden Hour Special</Text>
                        </View>
                      ) : isDome ? (
                        <View style={styles.stageSpecPill}>
                          <Text style={styles.stageSpecText}>360° Visual Projections</Text>
                        </View>
                      ) : (
                        <View style={styles.stageSpecPill}>
                          <Text style={styles.stageSpecText}>No Phone Policy</Text>
                        </View>
                      )}
                    </View>
                  </View>

                  <View style={styles.stageCardBottomRow}>
                    <View style={styles.stageFeatureRow}>
                      <FestivalIcon name={stage.iconName as any} size={18} color={theme.colors.primary} />
                      <Text style={styles.stageFeatureText}>{stage.featureSpec}</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => onNavigate?.('stages')}
                      style={styles.exploreSpecsBtn}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.exploreSpecsText}>EXPLORE SPECS →</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            05 — PASS TIERS QUICK LOOK
            ───────────────────────────────────────────────────────── */}
        <View ref={passesRef} style={styles.passesSection}>
          <View style={styles.passesCenterHeader}>
            <View style={styles.passesBadgePill}>
              <Text style={styles.passesBadgeText}>WRISTBANDS & BADGES</Text>
            </View>
            <Text style={styles.passesHeadline}>CHOOSE YOUR PASS</Text>
            <Text style={styles.passesSubtitle}>
              All passes include official high-rebound festival slide footwear and RFID wristband with seamless cash-free access.
            </Text>
          </View>

          <View style={styles.passesGrid}>
            {PASSES.map((pass) => {
              const isVip = pass.isPopular;
              return (
                <View
                  key={pass.id}
                  style={[
                    styles.passCard,
                    isVip && styles.passCardFeatured,
                  ]}
                >
                  {isVip && (
                    <View style={styles.passPopularSticker}>
                      <Text style={styles.passPopularStickerText}>MOST POPULAR BOUNCE</Text>
                    </View>
                  )}

                  <View>
                    <View style={styles.passCardTopRow}>
                      <View style={styles.passTierTagPill}>
                        <Text style={styles.passTierTagText}>{pass.tierTag}</Text>
                      </View>
                      <Text
                        style={[
                          styles.passAvailabilityText,
                          isVip && styles.passAvailabilityVip,
                        ]}
                      >
                        {pass.badgeText}
                      </Text>
                    </View>

                    <Text style={styles.passTitle}>{pass.title}</Text>

                    <View style={styles.passPriceRow}>
                      <Text
                        style={[
                          styles.passPrice,
                          isVip && styles.passPriceVip,
                        ]}
                      >
                        {pass.price}
                      </Text>
                      <Text style={styles.passPriceNote}>{pass.priceNote}</Text>
                    </View>

                    <Text style={styles.passSubtitleText}>{pass.subtitle}</Text>

                    <View style={styles.passFeaturesList}>
                      {pass.features.map((feat, idx) => (
                        <View key={idx} style={styles.passFeatureRow}>
                          <FestivalIcon
                            name="check_circle"
                            size={18}
                            color={isVip ? theme.colors.secondaryContainer : theme.colors.primary}
                          />
                          <Text style={styles.passFeatureText}>{feat}</Text>
                        </View>
                      ))}
                    </View>
                  </View>

                  <View style={styles.passCardCtaContainer}>
                    <TouchableOpacity
                      style={[
                        styles.passCtaBtn,
                        isVip ? styles.passCtaBtnVip : styles.passCtaBtnStandard,
                      ]}
                      onPress={() => onNavigate?.('passes')}
                      activeOpacity={0.85}
                    >
                      <Text
                        style={[
                          styles.passCtaBtnText,
                          isVip && styles.passCtaBtnTextVip,
                        ]}
                      >
                        {pass.buttonText}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            06 — BEYOND THE FLOOR (LIFESTYLE FEATURES)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.lifestyleSection}>
          <View style={styles.lifestyleHeaderRow}>
            <View>
              <View style={styles.vibeBadgePill}>
                <Text style={styles.vibeBadgeText}>VIBE INFRASTRUCTURE</Text>
              </View>
              <Text style={styles.lifestyleHeadline}>BEYOND THE FLOOR</Text>
              <Text style={styles.lifestyleSubtitle}>
                Nourishment, vinyl culture, and sensory rejuvenation designed to sustain your spirit all weekend.
              </Text>
            </View>
            <View style={styles.lifestyleCommunityTag}>
              <View style={styles.communityDot} />
              <Text style={styles.communityTagText}>CURATED FOR CHICAGO COMMUNITY</Text>
            </View>
          </View>

          <View style={styles.lifestyleGrid}>
            {BEYOND_MUSIC_FEATURES.map((item) => (
              <View key={item.id} style={styles.lifestyleCard}>
                <View style={styles.lifestyleImageWrapper}>
                  <Image
                    source={{ uri: item.imageUrl }}
                    style={styles.lifestyleImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.lifestyleCategoryPill}>
                  <Text style={styles.lifestyleCategoryText}>{item.category}</Text>
                </View>
                <Text style={styles.lifestyleTitle}>{item.title}</Text>
                <Text style={styles.lifestyleDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            07 — FOOTER & NEWSLETTER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.footerSection}>
          <View style={styles.footerGrid}>
            {/* Left Brand Col */}
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

            {/* Middle Nav Links */}
            <View style={styles.footerNavCol}>
              <Text style={styles.footerNavHeader}>Navigate</Text>
              <TouchableOpacity onPress={() => scrollToSection(lineupRef)}>
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
                <Text style={styles.footerNavLink}>Footage Archive</Text>
              </TouchableOpacity>
            </View>

            {/* Right Newsletter Col */}
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

          {/* Subfooter Row */}
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

      {/* ─────────────────────────────────────────────────────────
          08 — SIMULATED ANTHEM PLAYER DRAWER
          ───────────────────────────────────────────────────────── */}
      {showAnthemDrawer && (
        <View style={styles.anthemPlayerDrawer}>
          <View style={styles.anthemDrawerHeader}>
            <View style={styles.anthemLiveIndicator}>
              <View style={styles.anthemPingDot} />
              <Text style={styles.anthemLiveText}>NOW SPINNING PREVIEW</Text>
            </View>
            <TouchableOpacity
              style={styles.anthemCloseBtn}
              onPress={() => setShowAnthemDrawer(false)}
            >
              <FestivalIcon name="close" size={16} color={theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <View style={styles.anthemTrackRow}>
            <View style={styles.anthemBpmBadge}>
              <Text style={styles.anthemBpmText}>124</Text>
            </View>
            <View style={styles.anthemTrackMeta}>
              <Text style={styles.anthemTrackTitle} numberOfLines={1}>
                Bring Back House Anthem (Club Dub)
              </Text>
              <Text style={styles.anthemTrackArtist} numberOfLines={1}>
                Kerri Chandler & Derrick Carter
              </Text>
            </View>
            <TouchableOpacity
              style={styles.anthemPlayToggleBtn}
              onPress={() => setIsAnthemPlaying(!isAnthemPlaying)}
            >
              <FestivalIcon
                name={isAnthemPlaying ? 'pause' : 'play_arrow'}
                size={22}
                color={theme.colors.onPrimaryContainer}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
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

  /* Marquee Ticker */
  marqueeTicker: {
    backgroundColor: theme.colors.primaryContainer,
    paddingVertical: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    paddingHorizontal: 16,
  },
  tickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tickerStar: {
    fontSize: 14,
    fontWeight: '900',
    color: theme.colors.onPrimaryContainer,
  },

  /* Hero Section */
  heroSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 48,
  },
  heroCenterCol: {
    alignItems: 'center',
    textAlign: 'center',
  },
  heroPillBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    marginBottom: 20,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondaryContainer,
  },
  heroPillBannerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onSurface,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  editionBadge: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  editionBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onSecondaryFixed,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  /* Headline & Stickers */
  headlineWrapper: {
    position: 'relative',
    marginVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1000,
    width: '100%',
  },
  mainHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 72 : 42,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1.8,
    textAlign: 'center',
    lineHeight: Platform.OS === 'web' ? 76 : 46,
  },
  stickerTopRight: {
    position: 'absolute',
    top: Platform.OS === 'web' ? -18 : -10,
    right: Platform.OS === 'web' ? 12 : 0,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '6deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stickerTopRightText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onPrimaryContainer,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  stickerBottomLeft: {
    position: 'absolute',
    bottom: Platform.OS === 'web' ? -14 : -8,
    left: Platform.OS === 'web' ? 12 : 0,
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-6deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stickerBottomLeftText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onTertiaryContainer,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  heroSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 680,
    marginVertical: 16,
  },

  /* Actions */
  heroActionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  heroPassesBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 30,
    paddingVertical: 14,
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
  heroPassesBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroAnthemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 26,
    paddingVertical: 14,
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
  heroAnthemBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    color: theme.colors.onPrimaryContainer,
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
  },

  /* Countdown Pod */
  countdownPod: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: theme.colors.surfaceContainerLow,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    marginTop: 8,
    marginBottom: 28,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  countdownLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    paddingHorizontal: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  countdownDigitsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countdownUnit: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 5,
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
  countdownUnitText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  countdownColon: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  countdownUnitActive: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
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
  countdownUnitActiveText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
  },

  /* Hero Image Pod */
  heroImageContainer: {
    width: '100%',
    height: Platform.OS === 'web' ? 540 : 380,
    borderRadius: 44,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#18181B',
    position: 'relative',
    backgroundColor: theme.colors.surfaceContainerHigh,
    marginTop: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  heroImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  heroImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  heroLiveSticker: {
    position: 'absolute',
    top: 18,
    left: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  liveIndicatorDot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: theme.colors.primaryContainer,
  },
  heroLiveStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  heroImageBottomBar: {
    position: 'absolute',
    bottom: 18,
    left: 18,
    right: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroQuadSoundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 16,
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
  heroQuadSoundText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  heroTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroZeroFatigueBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  heroZeroFatigueText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  heroArtistsBadge: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  heroArtistsBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
    textTransform: 'uppercase',
  },

  /* Squish Meter Section */
  squishMeterSection: {
    width: '100%',
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingVertical: 22,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#18181B',
  },
  squishMeterInner: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  squishMeterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
    minWidth: 280,
  },
  squishMeterIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
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
  squishMeterTextCol: {
    flex: 1,
  },
  squishMeterTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  squishMeterSub: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  squishCapsulesPod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 6,
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
  squishCapsulesLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  squishCapsulesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  squishPillGreen: {
    width: 14,
    height: 24,
    borderRadius: 7,
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 1.5,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  squishPillOrange: {
    width: 14,
    height: 24,
    borderRadius: 7,
    backgroundColor: theme.colors.secondaryContainer,
    borderWidth: 1.5,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  squishFactorScorePill: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  squishFactorScoreText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  /* Lineup Section */
  lineupSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 36,
  },
  purityBadge: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  purityBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },
  sectionHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 48 : 34,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  sectionSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 520,
    marginTop: 6,
    lineHeight: 22,
  },
  filterChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  filterChipBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  filterChipBtnActive: {
    backgroundColor: '#1b1b1e',
  },
  filterChipText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  filterChipTextActive: {
    color: '#ffffff',
    fontWeight: '800',
  },

  /* Artist Grid */
  artistGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    marginBottom: 40,
  },
  artistCard: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
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
  artistCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  artistBadgePill: {
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
  badgePrimary: {
    backgroundColor: theme.colors.primaryContainer,
  },
  badgeSecondary: {
    backgroundColor: theme.colors.secondaryFixed,
  },
  badgeTertiary: {
    backgroundColor: theme.colors.tertiaryContainer,
  },
  artistBadgePillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  badgePrimaryText: {
    color: theme.colors.onPrimaryContainer,
  },
  badgeSecondaryText: {
    color: theme.colors.onSecondaryFixed,
  },
  badgeTertiaryText: {
    color: theme.colors.onTertiaryContainer,
  },
  artistStageText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  artistImageContainer: {
    width: '100%',
    height: 240,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceContainerHigh,
    position: 'relative',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  artistImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  artistImageTagPill: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
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
  artistImageTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  artistName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 26,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  artistNameOrange: {
    color: theme.colors.secondaryContainer,
  },
  artistDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onSurfaceVariant,
    marginTop: 6,
  },
  artistCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1.5,
    borderTopColor: theme.colors.surfaceContainerHigh,
  },
  artistTimePill: {
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  artistTimeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.surfaceContainer,
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
  bookmarkBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
  },

  /* Secondary Roster */
  secondaryRosterBox: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: 24,
    padding: 28,
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
  secondaryRosterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',
    gap: 8,
  },
  secondaryRosterSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.secondaryContainer,
    textTransform: 'uppercase',
  },
  secondaryRosterTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  actsCountPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 5,
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
  actsCountText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  secondaryPillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  secondaryActPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
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
  secondaryActText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },

  /* Stages Section (media_1790992097803.png) */
  stagesSection: {
    width: '100%',
    backgroundColor: theme.colors.surfaceContainer,
    paddingVertical: 56,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#18181B',
  },
  stagesCenterHeader: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 36,
  },
  ergonomicsBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  ergonomicsBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  stagesHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 48 : 34,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  stagesSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 680,
    marginTop: 8,
    lineHeight: 24,
  },
  stagesGrid: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  stageCard: {
    flex: 1,
    minWidth: 340,
    backgroundColor: '#ffffff',
    borderRadius: 36,
    padding: 32,
    borderWidth: 2.5,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  stageNumPill: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stageNumText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  stageCapacityPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  stageCapacityLime: {
    backgroundColor: theme.colors.primaryContainer,
  },
  stageCapacityPeach: {
    backgroundColor: theme.colors.secondaryFixed,
  },
  stageCapacityPink: {
    backgroundColor: theme.colors.tertiaryFixed,
  },
  stageCapacityText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  stageCapacityTextLime: {
    color: theme.colors.onPrimaryFixedVariant,
  },
  stageCapacityTextPeach: {
    color: theme.colors.onSecondaryFixedVariant,
  },
  stageCapacityTextPink: {
    color: theme.colors.onTertiaryFixedVariant,
  },
  stageName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 30,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  stageTagline: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
    marginTop: 8,
  },
  stageSpecsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 18,
  },
  stageSpecPill: {
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 14,
    paddingVertical: 6,
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
  stageSpecPillPeach: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageSpecPillPeachRotated: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 6,
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
  stageSpecPillLime: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageSpecPillRose: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageSpecPillPink: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 6,
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
  stageSpecText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  stageSpecTextPeach: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
  },
  stageSpecTextLime: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
  },
  stageSpecTextRose: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
  },
  stageSpecTextPink: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
  },
  stageCardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 18,
    borderTopWidth: 2,
    borderTopColor: theme.colors.surfaceContainerHigh,
    flexWrap: 'wrap',
    gap: 10,
  },
  stageFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stageFeatureText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '600',
  },
  exploreSpecsBtn: {
    paddingVertical: 4,
  },
  exploreSpecsText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.secondary,
    textTransform: 'uppercase',
  },

  /* Passes Section */
  passesSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 56,
  },
  passesCenterHeader: {
    alignItems: 'center',
    textAlign: 'center',
    maxWidth: 680,
    alignSelf: 'center',
    marginBottom: 44,
  },
  passesBadgePill: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  passesBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  passesHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 48 : 34,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  passesSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 24,
  },
  passesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    alignItems: 'stretch',
  },
  passCard: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 28,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
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
  passCardFeatured: {
    borderWidth: 2.5,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0px 6px 0px #18181B',
          transform: 'translateY(-6px)',
        } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  passPopularSticker: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  passPopularStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  passCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  passTierTagPill: {
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  passTierTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  passAvailabilityText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.error,
    textTransform: 'uppercase',
  },
  passAvailabilityVip: {
    color: theme.colors.secondary,
  },
  passTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  passPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginVertical: 12,
  },
  passPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 44,
    fontWeight: '900',
    color: theme.colors.onSurface,
    lineHeight: 46,
  },
  passPriceVip: {
    color: theme.colors.secondaryContainer,
  },
  passPriceNote: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
  },
  passSubtitleText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16,
  },
  passFeaturesList: {
    gap: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceContainerHigh,
  },
  passFeatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  passFeatureText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurface,
  },
  passCardCtaContainer: {
    paddingTop: 28,
  },
  passCtaBtn: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  passCtaBtnStandard: {
    backgroundColor: theme.colors.surfaceContainerLow,
  },
  passCtaBtnVip: {
    backgroundColor: theme.colors.secondaryContainer,
  },
  passCtaBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  passCtaBtnTextVip: {
    color: '#ffffff',
  },

  /* Lifestyle Features (Beyond the Floor) */
  lifestyleSection: {
    width: '100%',
    backgroundColor: theme.colors.surfaceContainerLow,
    paddingVertical: 56,
  },
  lifestyleHeaderRow: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 16,
    marginBottom: 36,
  },
  vibeBadgePill: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1deg' }],
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  vibeBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },
  lifestyleHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: Platform.OS === 'web' ? 48 : 34,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  lifestyleSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 520,
    marginTop: 6,
    lineHeight: 22,
  },
  lifestyleCommunityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  communityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  communityTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  lifestyleGrid: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
  },
  lifestyleCard: {
    flex: 1,
    minWidth: 320,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
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
  lifestyleImageWrapper: {
    width: '100%',
    height: 190,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: theme.colors.surfaceContainer,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#18181B',
  },
  lifestyleImage: {
    width: '100%',
    height: '100%',
  } as ImageStyle,
  lifestyleCategoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: '#18181B',
    marginBottom: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  lifestyleCategoryText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  lifestyleTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  lifestyleDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 19,
    color: theme.colors.onSurfaceVariant,
    marginTop: 6,
  },

  /* Footer & Newsletter */
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

  /* Subfooter */
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

  /* Floating Anthem Drawer */
  anthemPlayerDrawer: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 100,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    width: 340,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  anthemDrawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  anthemLiveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  anthemPingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.secondaryContainer,
  },
  anthemLiveText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  anthemCloseBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  anthemTrackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  anthemBpmBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#1b1b1e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  anthemBpmText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: '#ffffff',
  },
  anthemTrackMeta: {
    flex: 1,
    minWidth: 0,
  },
  anthemTrackTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  anthemTrackArtist: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  anthemPlayToggleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
});
