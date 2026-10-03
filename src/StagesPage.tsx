import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { theme } from './theme';
import { FESTIVAL_INFO } from './festivalData';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface StagesPageProps {
  onNavigate?: (screen: Screen) => void;
}

/**
 * Background SVG for Interactive Grounds Map
 */
const MapSvgOverlay: React.FC = () => {
  if (Platform.OS === 'web') {
    return React.createElement(
      'svg',
      {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.45,
          pointerEvents: 'none',
        },
        fill: 'none',
        preserveAspectRatio: 'xMidYMid slice',
        viewBox: '0 0 1000 500',
      },
      React.createElement('path', {
        d: 'M50 420 C 250 410, 420 440, 600 370 C 780 300, 850 180, 950 160',
        stroke: '#727a64',
        strokeDasharray: '12 12',
        strokeLinecap: 'round',
        strokeWidth: '6',
      }),
      React.createElement('path', {
        d: 'M120 120 C 280 200, 390 140, 520 230 C 650 320, 780 340, 910 390',
        stroke: '#727a64',
        strokeLinecap: 'round',
        strokeWidth: '4',
      }),
      React.createElement('circle', {
        cx: '210',
        cy: '180',
        fill: '#a3e635',
        fillOpacity: '0.12',
        r: '140',
      }),
      React.createElement('circle', {
        cx: '820',
        cy: '300',
        fill: '#fe6a34',
        fillOpacity: '0.12',
        r: '160',
      }),
      React.createElement('circle', {
        cx: '480',
        cy: '340',
        fill: '#b4136d',
        fillOpacity: '0.12',
        r: '120',
      })
    ) as any;
  }
  return null;
};

export const StagesPage: React.FC<StagesPageProps> = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [highlightedStage, setHighlightedStage] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const warehouseRef = useRef<View>(null);
  const sunsetCoveRef = useRef<View>(null);
  const domeRef = useRef<View>(null);
  const basementRef = useRef<View>(null);

  const scrollToSection = (ref: React.RefObject<View>, stageId?: string) => {
    if (stageId) {
      setHighlightedStage(stageId);
      setTimeout(() => setHighlightedStage(null), 2500);
    }
    ref.current?.measureLayout(
      scrollViewRef.current as any,
      (_x, y) => scrollViewRef.current?.scrollTo({ y: Math.max(0, y - 90), animated: true }),
      () => {}
    );
  };

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
              <Text style={styles.headerDatePillText}>AUG 22-24, 2025 • CHICAGO</Text>
            </View>
          </View>

          {/* Center Navigation Pills */}
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
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => {}}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>Stages</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('merch')}
            >
              <Text style={styles.navPillLinkText}>Merch &amp; Goods</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('passes')}
            >
              <Text style={styles.navPillLinkText}>Passes / VIP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('gallery')}
            >
              <Text style={styles.navPillLinkText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          {/* Right Action Buttons */}
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
        {/* ─────────────────────────────────────────────────────────
            01 — TOP HERO SECTION
            ───────────────────────────────────────────────────────── */}
        <View style={styles.heroSection}>
          <View style={[styles.heroRow, { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'flex-end' : 'flex-start' }]}>
            <View style={styles.heroLeftCol}>
              <View style={styles.heroBadgesRow}>
                <View style={styles.badgeArchitecture}>
                  <Text style={styles.badgeArchitectureText}>AUDIO ARCHITECTURE 2025</Text>
                </View>
                <View style={styles.badgeRigs}>
                  <Text style={styles.badgeRigsText}>4 ACOUSTIC RIGS</Text>
                </View>
                <View style={styles.badgeDancefloors}>
                  <Text style={styles.badgeDancefloorsText}>HIGH REBOUND DANCEFLOORS</Text>
                </View>
              </View>

              <Text style={[styles.pageTitle, { fontSize: isDesktop ? 68 : isTablet ? 48 : 36, lineHeight: isDesktop ? 72 : isTablet ? 52 : 40 }]}>
                STAGES &amp; AUDIO SANCTUARIES
              </Text>
              <Text style={styles.pageSubtitle}>
                Custom-calibrated acoustic temples engineered for weightless bounce and zero ear fatigue. Powered by custom foam shock absorbers and pure kinetic sound design.
              </Text>
            </View>

            <View style={[styles.heroRightCol, { alignItems: isDesktop ? 'flex-end' : 'flex-start' }]}>
              <View style={styles.earplugsPill}>
                <FestivalIcon name="hearing" size={20} color={theme.colors.onPrimaryContainer} />
                <Text style={styles.earplugsPillText}>FREE HIGH-FIDELITY FOAM EARPLUGS AT EVERY INFO HUB</Text>
              </View>
              <View style={styles.safeSplRow}>
                <View style={styles.splDot} />
                <Text style={styles.safeSplText}>CALIBRATED TO SAFE SPL ≤ 102 DB PEAK</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            02 — INTERACTIVE GROUNDS MAP
            ───────────────────────────────────────────────────────── */}
        <View style={styles.mapSection}>
          <View style={styles.mapCard}>
            <View style={[styles.mapHeaderRow, { flexDirection: isTablet ? 'row' : 'column', alignItems: isTablet ? 'center' : 'flex-start' }]}>
              <View style={styles.mapTitleGroup}>
                <View style={styles.mapIconCircle}>
                  <FestivalIcon name="map" size={24} color="#ffffff" />
                </View>
                <View>
                  <Text style={styles.mapTitle}>INTERACTIVE GROUNDS MAP</Text>
                  <Text style={styles.mapSubtitle}>South Works Waterfront Park • 4 Stages, 6 Chill-Out Pods, 12 Hydration Points</Text>
                </View>
              </View>

              {/* Jump to stage pills */}
              <View style={styles.mapJumpPillsRow}>
                <TouchableOpacity
                  style={[styles.jumpPill, styles.jumpPillGreen]}
                  onPress={() => scrollToSection(warehouseRef, 'warehouse')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.jumpPillText}>01 Warehouse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.jumpPill, styles.jumpPillOrange]}
                  onPress={() => scrollToSection(sunsetCoveRef, 'sunset-cove')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.jumpPillText}>02 Sunset Cove</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.jumpPill, styles.jumpPillPink]}
                  onPress={() => scrollToSection(domeRef, 'dome')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.jumpPillText}>03 Groove Dome</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.jumpPill, styles.jumpPillDark]}
                  onPress={() => scrollToSection(basementRef, 'basement')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.jumpPillText}>04 Basement</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Interactive Grounds Canvas */}
            <View style={[styles.groundsCanvas, { height: isDesktop ? 460 : 380 }]}>
              {/* Background Topography & Acoustic Radii */}
              <MapSvgOverlay />

              {/* Stage Pin 01: Warehouse */}
              <TouchableOpacity
                style={[styles.stageMapPin, { top: '18%', left: isDesktop ? '14%' : '6%' }]}
                onPress={() => scrollToSection(warehouseRef, 'warehouse')}
                activeOpacity={0.9}
              >
                <View style={styles.pinPrimaryBadge}>
                  <View style={styles.pinIndicatorDotPrimary} />
                  <Text style={styles.pinPrimaryBadgeText}>01 The Warehouse</Text>
                </View>
                <View style={styles.pinSubPill}>
                  <Text style={styles.pinSubPillText}>15,000 CAP • INDOOR</Text>
                </View>
              </TouchableOpacity>

              {/* Stage Pin 02: Sunset Cove */}
              <TouchableOpacity
                style={[styles.stageMapPin, { top: '14%', right: isDesktop ? '16%' : '6%' }]}
                onPress={() => scrollToSection(sunsetCoveRef, 'sunset-cove')}
                activeOpacity={0.9}
              >
                <View style={styles.pinSecondaryBadge}>
                  <View style={styles.pinIndicatorDotSecondary} />
                  <Text style={styles.pinSecondaryBadgeText}>02 Sunset Cove</Text>
                </View>
                <View style={styles.pinSubPill}>
                  <Text style={styles.pinSubPillText}>LAKEFRONT • OPEN AIR</Text>
                </View>
              </TouchableOpacity>

              {/* Stage Pin 03: Neon Dome */}
              <TouchableOpacity
                style={[styles.stageMapPin, { bottom: '24%', left: isDesktop ? '35%' : '18%' }]}
                onPress={() => scrollToSection(domeRef, 'dome')}
                activeOpacity={0.9}
              >
                <View style={styles.pinTertiaryBadge}>
                  <View style={styles.pinIndicatorDotTertiary} />
                  <Text style={styles.pinTertiaryBadgeText}>03 Neon Dome</Text>
                </View>
                <View style={styles.pinSubPill}>
                  <Text style={styles.pinSubPillText}>360 SPATIAL AUDIO</Text>
                </View>
              </TouchableOpacity>

              {/* Stage Pin 04: The Basement */}
              <TouchableOpacity
                style={[styles.stageMapPin, { bottom: '16%', right: isDesktop ? '22%' : '8%' }]}
                onPress={() => scrollToSection(basementRef, 'basement')}
                activeOpacity={0.9}
              >
                <View style={styles.pinDarkBadge}>
                  <View style={styles.pinIndicatorDotDark} />
                  <Text style={styles.pinDarkBadgeText}>04 The Basement</Text>
                </View>
                <View style={styles.pinSubPill}>
                  <Text style={styles.pinSubPillText}>VINYL ONLY • NO PHONES</Text>
                </View>
              </TouchableOpacity>

              {/* Amenity pins */}
              <View style={[styles.amenityPin, { top: '48%', left: isDesktop ? '22%' : '8%' }]}>
                <FestivalIcon name="water_drop" size={16} color={theme.colors.primary} />
                <Text style={styles.amenityPinText}>Hydration Alley</Text>
              </View>

              <View style={[styles.amenityPin, { top: '52%', right: isDesktop ? '32%' : '14%' }]}>
                <FestivalIcon name="restaurant" size={16} color={theme.colors.secondary} />
                <Text style={styles.amenityPinText}>Local Food Trucks</Text>
              </View>

              <View style={[styles.amenityPinPink, { bottom: '44%', right: isDesktop ? '18%' : '4%' }]}>
                <FestivalIcon name="self_improvement" size={16} color={theme.colors.onTertiaryContainer} />
                <Text style={styles.amenityPinPinkText}>Chill Foam Oasis</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            03 — STAGE GUIDES (4 DETAILED ARTICLES)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.stageGuidesSection}>
          <View style={styles.stageGuidesHeaderRow}>
            <Text style={styles.stageGuidesHeaderTitle}>STAGE GUIDES</Text>
            <View style={styles.stageGuidesLine} />
            <View style={styles.stageGuidesBadge}>
              <Text style={styles.stageGuidesBadgeText}>4 UNIQUE EXPERIENCES</Text>
            </View>
          </View>

          {/* ═══════════════ STAGE 1: THE WAREHOUSE ═══════════════ */}
          <View
            ref={warehouseRef}
            style={[
              styles.stageArticleCard,
              highlightedStage === 'warehouse' && styles.stageArticleCardHighlighted,
            ]}
          >
            <View style={[styles.stageArticleGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              {/* Left Column: Description & Specs */}
              <View style={[styles.stageArticleContent, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageArticleBadgesRow}>
                  <View style={styles.stageSanctuaryBadge}>
                    <Text style={styles.stageSanctuaryBadgeText}>01 SANCTUARY</Text>
                  </View>
                  <View style={styles.stageRigBadgePrimary}>
                    <Text style={styles.stageRigBadgeText}>FUNKTION-ONE VERO VX</Text>
                  </View>
                  <View style={styles.stageCapacityBadge}>
                    <Text style={styles.stageCapacityBadgeText}>15,000 CAPACITY</Text>
                  </View>
                </View>

                <Text style={styles.stageArticleTitle}>The Warehouse</Text>
                <Text style={styles.stageArticleDesc}>
                  A monumental cathedral of raw brick, industrial steel beams, and custom floating acoustic baffles. Outfitted with high-rebound closed-cell dancefloor padding that cushions every step during 8-hour marathon sets.
                </Text>

                {/* Squish Meter Bar */}
                <View style={styles.stageSquishMeterCard}>
                  <View style={styles.stageSquishMeterHeader}>
                    <Text style={styles.stageSquishTitle}>Dancefloor Squish &amp; Energy Rebound</Text>
                    <View style={styles.stageSquishScorePill}>
                      <Text style={styles.stageSquishScoreText}>10 / 10 SQUISH</Text>
                    </View>
                  </View>
                  <View style={styles.stageSquishPillsRow}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <View key={i} style={styles.stageSquishBarGreen} />
                    ))}
                  </View>
                  <View style={styles.stageSquishSpecsRow}>
                    <View style={styles.specInline}>
                      <FestivalIcon name="speed" size={16} color={theme.colors.primary} />
                      <Text style={styles.specInlineText}>Low End: 28Hz - 110Hz</Text>
                    </View>
                    <View style={styles.specInline}>
                      <FestivalIcon name="volume_up" size={16} color={theme.colors.primary} />
                      <Text style={styles.specInlineText}>Rig SPL: 104dB Safe Peak</Text>
                    </View>
                  </View>
                </View>

                {/* Feature tags */}
                <View style={styles.featurePillsWrap}>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>ACOUSTIC FOAM DAMPENERS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>DUAL DELAY TOWERS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>MIST CHILL DUCTS</Text></View>
                </View>
              </View>

              {/* Right Column: Stage Image */}
              <View style={[styles.stageArticleImageCol, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageImageWrapper}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqQ3G12Re-JS3XjSrOM6QdznS1whzVPkj6jb_afZ5tnJIUYFbN4ePLjc0Ba8DKtZv0OXQEh7DLPiY9Dt7okEpiz18ry0ugLDBSAXJYwaqHLYXcey5NIDCZDhUMSXpFLUZcM6dC9hfXJVggEeDsLbfLrEd4hxMw93wGuwk0bONO8hvWdJ0nbgzbvWTQI-uWtOaJPoGkuodvjKunlTiqUfxHzYs076LnIhlbhYQUw0tlN0FkPCzO12dDfg' }}
                    style={styles.stageArticleImg}
                    resizeMode="cover"
                  />
                  <View style={styles.stageFeaturedActsPill}>
                    <View style={styles.pulsingDot} />
                    <Text style={styles.stageFeaturedActsText}>Featured Acts: Moodymann • Honey Dijon • Frankie Bones</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ═══════════════ STAGE 2: SUNSET COVE ═══════════════ */}
          <View
            ref={sunsetCoveRef}
            style={[
              styles.stageArticleCard,
              highlightedStage === 'sunset-cove' && styles.stageArticleCardHighlighted,
            ]}
          >
            <View style={[styles.stageArticleGrid, { flexDirection: isDesktop ? 'row-reverse' : 'column' }]}>
              {/* Right Column (on desktop): Description & Specs */}
              <View style={[styles.stageArticleContent, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageArticleBadgesRow}>
                  <View style={styles.stageSanctuaryBadgeOrange}>
                    <Text style={styles.stageSanctuaryBadgeOrangeText}>02 SANCTUARY</Text>
                  </View>
                  <View style={styles.stageRigBadgeOrange}>
                    <Text style={styles.stageRigBadgeOrangeText}>L-ACOUSTICS K2 ARRAY</Text>
                  </View>
                  <View style={styles.stageCapacityBadgePrimary}>
                    <Text style={styles.stageCapacityBadgePrimaryText}>LAKEFRONT OPEN AIR</Text>
                  </View>
                </View>

                <Text style={styles.stageArticleTitle}>Sunset Cove</Text>
                <Text style={styles.stageArticleDesc}>
                  Perched directly on Lake Michigan with unobstructed sunset views across the Chicago skyline. Equipped with curved line arrays configured for wind deflection and crisp, crystal-clear vocal house resonance.
                </Text>

                <View style={styles.stageSquishMeterCard}>
                  <View style={styles.stageSquishMeterHeader}>
                    <Text style={styles.stageSquishTitle}>Open Air Bass Dispersion Rating</Text>
                    <View style={styles.stageSquishScorePillOrange}>
                      <Text style={styles.stageSquishScoreTextOrange}>9.5 / 10 CRISP WARMTH</Text>
                    </View>
                  </View>
                  <View style={styles.stageSquishPillsRow}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                      <View key={i} style={styles.stageSquishBarOrange} />
                    ))}
                    <View style={styles.stageSquishBarMuted} />
                  </View>
                  <View style={styles.stageSquishSpecsRow}>
                    <View style={styles.specInline}>
                      <FestivalIcon name="wb_twilight" size={16} color={theme.colors.secondary} />
                      <Text style={styles.specInlineText}>Peak Golden Hour: 7:45 PM</Text>
                    </View>
                    <View style={styles.specInline}>
                      <FestivalIcon name="surround_sound" size={16} color={theme.colors.secondary} />
                      <Text style={styles.specInlineText}>Panflex Horizontal Directivity</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.featurePillsWrap}>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>NATURAL BREEZE DUCTS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>SAND-SAFE SLIDER CHIPS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>KS28 SUBWOOFER ARC</Text></View>
                </View>
              </View>

              {/* Left Column (on desktop): Stage Image */}
              <View style={[styles.stageArticleImageCol, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageImageWrapper}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuUpg1yQaNkoOGicpUDwxBflIoRZr9nr4FKFRFdI8px45mXpQp7kgKOvL5iK8zTE7n0KsOy9gms6fPTNtv6ninGkCJC76cUWQvIpiOeioUlxhvkgz0Jr4QQ2YBP0hCZsiOucgc8VW3tcfa_JmXr0Eet6ScfqEDK_VhVmZ0MuDavBCmuVOKBc0C6VKp1kih5FVIokZ8zJs-tVEgZ8fNoL5fsJJlVY1MqLRiWWJ1yNTXxQMtfBDxNp5cPA' }}
                    style={styles.stageArticleImg}
                    resizeMode="cover"
                  />
                  <View style={styles.stageFeaturedActsPill}>
                    <View style={[styles.pulsingDot, { backgroundColor: theme.colors.secondaryContainer }]} />
                    <Text style={styles.stageFeaturedActsText}>Featured Acts: Kerri Chandler • Masters At Work • Jayda G</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ═══════════════ STAGE 3: NEON GROOVE DOME ═══════════════ */}
          <View
            ref={domeRef}
            style={[
              styles.stageArticleCard,
              highlightedStage === 'dome' && styles.stageArticleCardHighlighted,
            ]}
          >
            <View style={[styles.stageArticleGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              {/* Left Column: Description & Specs */}
              <View style={[styles.stageArticleContent, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageArticleBadgesRow}>
                  <View style={styles.stageSanctuaryBadgePink}>
                    <Text style={styles.stageSanctuaryBadgePinkText}>03 SANCTUARY</Text>
                  </View>
                  <View style={styles.stageRigBadgePink}>
                    <Text style={styles.stageRigBadgePinkText}>VOID INCUBUS CUSTOM</Text>
                  </View>
                  <View style={styles.stageCapacityBadgePrimary}>
                    <Text style={styles.stageCapacityBadgePrimaryText}>360° SPATIAL FIELD</Text>
                  </View>
                </View>

                <Text style={styles.stageArticleTitle}>Neon Groove Dome</Text>
                <Text style={styles.stageArticleDesc}>
                  A futuristic geodesic sanctuary coated in sound-reactive tactile neon mesh. Red sound horns and 32-channel ambisonic spatial audio send rhythmic jack-tracks swirling around you in three physical dimensions.
                </Text>

                <View style={styles.stageSquishMeterCard}>
                  <View style={styles.stageSquishMeterHeader}>
                    <Text style={styles.stageSquishTitle}>Spatial Immersion &amp; Bass Punch</Text>
                    <View style={styles.stageSquishScorePillPink}>
                      <Text style={styles.stageSquishScoreTextPink}>10 / 10 3D FIELD</Text>
                    </View>
                  </View>
                  <View style={styles.stageSquishPillsRow}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <View key={i} style={styles.stageSquishBarPink} />
                    ))}
                  </View>
                  <View style={styles.stageSquishSpecsRow}>
                    <View style={styles.specInline}>
                      <FestivalIcon name="spatial_audio" size={16} color={theme.colors.tertiary} />
                      <Text style={styles.specInlineText}>32 Channel Ambisonics</Text>
                    </View>
                    <View style={styles.specInline}>
                      <FestivalIcon name="graphic_eq" size={16} color={theme.colors.tertiary} />
                      <Text style={styles.specInlineText}>Triple Hyperfold Subs</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.featurePillsWrap}>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>SCULPTED VOID HORNS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>360-DEGREE PROJECTION</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>SQUISH MAT REBOUND</Text></View>
                </View>
              </View>

              {/* Right Column: Stage Image */}
              <View style={[styles.stageArticleImageCol, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageImageWrapper}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyv0--wssslYOHmNguQ53C9Tx1oMtI2tqqdFkh81kW4mODjxqv0L-Y3IowFEXMeCaA_zTgH7cXSdtFFqh2QxyOwyd9bjCRekm1crZaxZRrpzHZwuvrqGbm4fSl3M2a2SGRSxUaPPFzWC2jsge_woj0TGg3D_Ewy3Jam4YPftn5c5TXmL35qIdx_RhDAZ_Nnr6fWtUAkX6THtgShsKDEv6IsPYrntzzbiElj3TyGPiJB35RTllQfHXVtA' }}
                    style={styles.stageArticleImg}
                    resizeMode="cover"
                  />
                  <View style={styles.stageFeaturedActsPill}>
                    <View style={[styles.pulsingDot, { backgroundColor: theme.colors.tertiary }]} />
                    <Text style={styles.stageFeaturedActsText}>Featured Acts: The Blessed Madonna • Derrick Carter • Folamour</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* ═══════════════ STAGE 4: THE BASEMENT ═══════════════ */}
          <View
            ref={basementRef}
            style={[
              styles.stageArticleCard,
              highlightedStage === 'basement' && styles.stageArticleCardHighlighted,
            ]}
          >
            <View style={[styles.stageArticleGrid, { flexDirection: isDesktop ? 'row-reverse' : 'column' }]}>
              {/* Right Column (on desktop): Description & Specs */}
              <View style={[styles.stageArticleContent, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageArticleBadgesRow}>
                  <View style={styles.stageSanctuaryBadgeDark}>
                    <Text style={styles.stageSanctuaryBadgeDarkText}>04 SANCTUARY</Text>
                  </View>
                  <View style={styles.stageRigBadgeOrangeLight}>
                    <Text style={styles.stageRigBadgeOrangeLightText}>ARS 9100 ROTARY MIXER</Text>
                  </View>
                  <View style={styles.stageZeroPhoneBadge}>
                    <Text style={styles.stageZeroPhoneBadgeText}>STRICT ZERO PHONE POLICY</Text>
                  </View>
                </View>

                <Text style={styles.stageArticleTitle}>The Basement</Text>
                <Text style={styles.stageArticleDesc}>
                  A subterranean, red-lit tribute to the original 1980s Chicago sound laboratories. Strict analog signal flow, custom wooden horn cabinets, audiophile vinyl pressing playback, and zero glowing screens allowed on the floor.
                </Text>

                <View style={styles.stageSquishMeterCard}>
                  <View style={styles.stageSquishMeterHeader}>
                    <Text style={styles.stageSquishTitle}>Analog Warmth &amp; Harmonic Purity</Text>
                    <View style={styles.stageSquishScorePillDark}>
                      <Text style={styles.stageSquishScoreTextDark}>PURE CLASS A TUBE</Text>
                    </View>
                  </View>
                  <View style={styles.stageSquishPillsRow}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                      <View key={i} style={styles.stageSquishBarDark} />
                    ))}
                  </View>
                  <View style={styles.stageSquishSpecsRow}>
                    <View style={styles.specInline}>
                      <FestivalIcon name="radio" size={16} color={theme.colors.onSurface} />
                      <Text style={styles.specInlineText}>4x Technics 1200 MK7</Text>
                    </View>
                    <View style={styles.specInline}>
                      <FestivalIcon name="phonelink_erase" size={16} color={theme.colors.onSurface} />
                      <Text style={styles.specInlineText}>Red Sticker Camera Seal</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.featurePillsWrap}>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>ISOLATED TURNTABLE PODS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>CUSTOM WOOD SUB BASKETS</Text></View>
                  <View style={styles.featureTagPill}><Text style={styles.featureTagText}>ALL-NIGHT DEEP ROTATION</Text></View>
                </View>
              </View>

              {/* Left Column (on desktop): Stage Image */}
              <View style={[styles.stageArticleImageCol, { flex: isDesktop ? 1 : undefined }]}>
                <View style={styles.stageImageWrapper}>
                  <Image
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcWhM2YspZ9yQYFCrS72NYehB8jA3C-lL1c9-GCHzCSnh67VEH50zLpTsTFyb_Q9mbj-yzP9vQ0yJtzgjwqomrOnykdWM1YtqXhpNYX3fM-YRNiGvYvjyUtNUXa9Sla65qUMsvVtyn4k8HfjN-AssDs9ZfsZPekAJzpslTDNvh-6Q2c1kkh6D3Q6ucpgAPWqlBwp-T1Z_9mEraiD-aR1BUh6HPbwaCvc1v5ghzCq6ukZNekon-KyNPPg' }}
                    style={styles.stageArticleImg}
                    resizeMode="cover"
                  />
                  <View style={styles.stageFeaturedActsPill}>
                    <View style={[styles.pulsingDot, { backgroundColor: theme.colors.onSurface }]} />
                    <Text style={styles.stageFeaturedActsText}>Featured Acts: Ron Trent • DJ Heather • Theo Parrish (6-hr set)</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            04 — ESSENTIAL VISITOR PROTOCOLS
            ───────────────────────────────────────────────────────── */}
        <View style={styles.protocolsSection}>
          <View style={styles.protocolsHeader}>
            <View style={styles.protocolsBadge}>
              <Text style={styles.protocolsBadgeText}>ESSENTIAL VISITOR PROTOCOLS</Text>
            </View>
            <Text style={[styles.protocolsTitle, { fontSize: isDesktop ? 40 : 28 }]}>
              Venue Policies &amp; Comfort Amenities
            </Text>
            <Text style={styles.protocolsSubtitle}>
              Everything designed for effortless transit, non-stop hydration, and auditory longevity.
            </Text>
          </View>

          <View style={[styles.protocolsGrid, { flexDirection: isDesktop ? 'row' : isTablet ? 'row' : 'column', flexWrap: 'wrap' }]}>
            {/* Card 1: Transit */}
            <View style={[styles.protocolCard, { width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%' }]}>
              <View style={styles.protocolTop}>
                <View style={styles.protocolIconCircleOrange}>
                  <FestivalIcon name="directions_subway" size={24} color={theme.colors.onSecondaryFixed} />
                </View>
                <Text style={styles.protocolCardTitle}>Transit &amp; CTA Access</Text>
                <Text style={styles.protocolCardDesc}>
                  Direct express shuttles from Roosevelt Green &amp; Red CTA stops run every 7 minutes. Dedicated bike valet parking with 1,200 secure slots directly outside the North gate.
                </Text>
              </View>
              <View style={styles.protocolTag}>
                <Text style={styles.protocolTagText}>FREE SHUTTLE WRISTBAND</Text>
              </View>
            </View>

            {/* Card 2: Bag Policy */}
            <View style={[styles.protocolCard, { width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%' }]}>
              <View style={styles.protocolTop}>
                <View style={styles.protocolIconCircleGreen}>
                  <FestivalIcon name="backpack" size={24} color={theme.colors.onPrimaryContainer} />
                </View>
                <Text style={styles.protocolCardTitle}>Tactile Bag Policy</Text>
                <Text style={styles.protocolCardDesc}>
                  Clear bags up to 12"x12"x6" and non-clear waist packs / cross-body bags up to 4.5"x6.5" permitted. Hydration packs must be empty upon security scan.
                </Text>
              </View>
              <View style={styles.protocolTag}>
                <Text style={styles.protocolTagText}>CLEAR BAGS &amp; FANNY PACKS OK</Text>
              </View>
            </View>

            {/* Card 3: Hearing Care */}
            <View style={[styles.protocolCard, { width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%' }]}>
              <View style={styles.protocolTop}>
                <View style={styles.protocolIconCirclePink}>
                  <FestivalIcon name="hearing_disabled" size={24} color={theme.colors.onTertiaryFixed} />
                </View>
                <Text style={styles.protocolCardTitle}>SafeSPL Hearing Care</Text>
                <Text style={styles.protocolCardDesc}>
                  Every stage utilizes dB-monitoring limiters. Visit any of our 4 Sound Health Booths for complimentary custom-fit high attenuation foam plugs and ear-clearing zones.
                </Text>
              </View>
              <View style={styles.protocolTagPink}>
                <Text style={styles.protocolTagPinkText}>100% EAR DEFENSE GUARANTEE</Text>
              </View>
            </View>

            {/* Card 4: Decompression Pod */}
            <View style={[styles.protocolCard, { width: isDesktop ? '23.5%' : isTablet ? '48%' : '100%' }]}>
              <View style={styles.protocolTop}>
                <View style={styles.protocolIconCircleGray}>
                  <FestivalIcon name="spa" size={24} color={theme.colors.onSurface} />
                </View>
                <Text style={styles.protocolCardTitle}>Foam Decompression Pod</Text>
                <Text style={styles.protocolCardDesc}>
                  A silent recovery lounge furnished with oversized contoured Slyde foam loungers, ambient 60BPM light pulsing, free electrolyte cold water, and zero strobe exposure.
                </Text>
              </View>
              <View style={styles.protocolTag}>
                <Text style={styles.protocolTagText}>OPEN 12:00 PM - 02:00 AM</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            05 — BOTTOM CTA BANNER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.ctaBannerSection}>
          <View style={[styles.ctaBannerCard, { flexDirection: isTablet ? 'row' : 'column', alignItems: isTablet ? 'center' : 'flex-start' }]}>
            <View style={[styles.ctaBannerTextCol, { flex: isTablet ? 1 : undefined }]}>
              <View style={styles.ctaPillWhite}>
                <Text style={styles.ctaPillWhiteText}>WEEKEND PASS INCLUDES UNLIMITED STAGE ROAMING</Text>
              </View>
              <Text style={[styles.ctaBannerTitle, { fontSize: isTablet ? 32 : 24 }]}>
                Ready to feel 128 BPM through your feet?
              </Text>
              <Text style={styles.ctaBannerSubtitle}>
                Explore single-day passes, weekend VIP foam platforms, and back-of-house rotary booth passes before tier 2 caps out.
              </Text>
            </View>

            <View style={styles.ctaBannerBtnsRow}>
              <TouchableOpacity
                style={styles.ctaPassesBtn}
                onPress={() => onNavigate?.('passes')}
                activeOpacity={0.85}
              >
                <Text style={styles.ctaPassesBtnText}>SECURE PASSES NOW</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.ctaScheduleBtn}
                onPress={() => onNavigate?.('schedule')}
                activeOpacity={0.85}
              >
                <Text style={styles.ctaScheduleBtnText}>FULL TIMETABLE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            06 — FOOTER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.footerSection}>
          <View style={[styles.footerGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            {/* Brand Column */}
            <View style={[styles.footerBrandCol, { flex: isDesktop ? 5 : undefined }]}>
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

            {/* Navigate Column */}
            <View style={[styles.footerNavCol, { flex: isDesktop ? 3 : undefined }]}>
              <Text style={styles.footerNavHeader}>Navigate</Text>
              <TouchableOpacity onPress={() => onNavigate?.('landing')}>
                <Text style={styles.footerNavLink}>Artist Lineup 2025</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('schedule')}>
                <Text style={styles.footerNavLink}>Weekend Timetable</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={[styles.footerNavLink, { color: theme.colors.primary }]}>Tactile Foam Arenas</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('merch')}>
                <Text style={styles.footerNavLink}>Drop 01 Official Merch</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('passes')}>
                <Text style={styles.footerNavLink}>Wristbands &amp; Locker VIP</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onNavigate?.('gallery')}>
                <Text style={styles.footerNavLink}>Footage Archive</Text>
              </TouchableOpacity>
            </View>

            {/* Club Newsletter Column */}
            <View style={[styles.footerNewsletterCol, { flex: isDesktop ? 4 : undefined }]}>
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
                  POWERED BY FUNCTION-ONE &amp; SLYDE ACOUSTIC FOAM
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.subfooterRow, { flexDirection: isTablet ? 'row' : 'column' }]}>
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
    width: 38,
    height: 38,
    borderRadius: 19,
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

  scrollContainer: {
    flex: 1,
    marginTop: 80,
  },
  scrollContent: {
    paddingBottom: 90,
  },

  /* 01 — Top Hero Section */
  heroSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 28,
  },
  heroRow: {
    justifyContent: 'space-between',
    gap: 28,
  },
  heroLeftCol: {
    flex: 1,
    maxWidth: 820,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  badgeArchitecture: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  badgeArchitectureText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeRigs: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  badgeRigsText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeDancefloors: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 16,
    paddingVertical: 5,
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
  badgeDancefloorsText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  pageTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1.5,
    marginVertical: 8,
  },
  pageSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 680,
    marginTop: 4,
  },
  heroRightCol: {
    gap: 10,
    marginBottom: 6,
  },
  earplugsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  earplugsPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  safeSplRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 4,
  },
  splDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondaryContainer,
  },
  safeSplText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* 02 — Grounds Map Section */
  mapSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 44,
  },
  mapCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 20,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  mapHeaderRow: {
    justifyContent: 'space-between',
    gap: 16,
  },
  mapTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  mapIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
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
  mapTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  mapSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  mapJumpPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  jumpPill: {
    backgroundColor: theme.colors.surfaceContainerHigh,
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
  jumpPillGreen: {
    backgroundColor: theme.colors.primaryContainer,
  },
  jumpPillOrange: {
    backgroundColor: theme.colors.secondaryFixed,
  },
  jumpPillPink: {
    backgroundColor: theme.colors.tertiaryFixed,
  },
  jumpPillDark: {
    backgroundColor: theme.colors.primaryFixedDim,
  },
  jumpPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },

  groundsCanvas: {
    position: 'relative',
    width: '100%',
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
  },

  /* Stage Map Pins */
  stageMapPin: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  pinPrimaryBadge: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  pinIndicatorDotPrimary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primaryContainer,
  },
  pinPrimaryBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  pinSecondaryBadge: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  pinIndicatorDotSecondary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.secondaryFixed,
  },
  pinSecondaryBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  pinTertiaryBadge: {
    backgroundColor: theme.colors.tertiary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  pinIndicatorDotTertiary: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.tertiaryContainer,
  },
  pinTertiaryBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  pinDarkBadge: {
    backgroundColor: theme.colors.inverseSurface,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  pinIndicatorDotDark: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primaryFixed,
  },
  pinDarkBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  pinSubPill: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    marginTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  pinSubPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Amenity Pins */
  amenityPin: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    zIndex: 5,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  amenityPinText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.onSurface,
  },
  amenityPinPink: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    zIndex: 5,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  amenityPinPinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
  },

  /* 03 — Stage Guides */
  stageGuidesSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    gap: 36,
    marginBottom: 44,
  },
  stageGuidesHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  stageGuidesHeaderTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 44,
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  stageGuidesLine: {
    flex: 1,
    height: 4,
    backgroundColor: theme.colors.surfaceContainerHighest,
    borderRadius: 2,
  },
  stageGuidesBadge: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 16,
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
  stageGuidesBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Stage Article Cards */
  stageArticleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
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
  stageArticleCardHighlighted: {
    borderColor: theme.colors.secondaryContainer,
    borderWidth: 3,
  },
  stageArticleGrid: {
    gap: 32,
    alignItems: 'center',
  },
  stageArticleContent: {
    gap: 16,
  },
  stageArticleBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },

  /* Badges */
  stageSanctuaryBadge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  stageSanctuaryBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  stageSanctuaryBadgeOrange: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  stageSanctuaryBadgeOrangeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  stageSanctuaryBadgePink: {
    backgroundColor: theme.colors.tertiary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  stageSanctuaryBadgePinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  stageSanctuaryBadgeDark: {
    backgroundColor: theme.colors.inverseSurface,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 3px 0px #18181B' } as any)
      : {}),
  },
  stageSanctuaryBadgeDarkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  stageRigBadgePrimary: {
    backgroundColor: theme.colors.primaryContainer,
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
  stageRigBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },

  stageCapacityBadge: {
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
  stageCapacityBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },

  stageRigBadgeOrange: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stageRigBadgeOrangeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },

  stageCapacityBadgePrimary: {
    backgroundColor: theme.colors.primaryContainer,
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
  stageCapacityBadgePrimaryText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },

  stageRigBadgePink: {
    backgroundColor: theme.colors.tertiaryContainer,
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
  stageRigBadgePinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },

  stageRigBadgeOrangeLight: {
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
  stageRigBadgeOrangeLightText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },

  stageZeroPhoneBadge: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  stageZeroPhoneBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  stageArticleTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 38,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  stageArticleDesc: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.onSurfaceVariant,
  },

  /* Squish Meter */
  stageSquishMeterCard: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.1)',
    gap: 12,
  },
  stageSquishMeterHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageSquishTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  stageSquishScorePill: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  stageSquishScoreText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
  },
  stageSquishScorePillOrange: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  stageSquishScoreTextOrange: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
  },
  stageSquishScorePillPink: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  stageSquishScoreTextPink: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
  },
  stageSquishScorePillDark: {
    backgroundColor: theme.colors.inverseSurface,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  stageSquishScoreTextDark: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.inverseOnSurface,
  },

  stageSquishPillsRow: {
    flexDirection: 'row',
    gap: 6,
    height: 12,
    width: '100%',
  },
  stageSquishBarGreen: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  stageSquishBarOrange: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  stageSquishBarPink: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.tertiary,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  stageSquishBarDark: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.onSurface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  stageSquishBarMuted: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.colors.surfaceContainerHighest,
    borderRadius: 6,
  },

  stageSquishSpecsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  specInline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  specInlineText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    fontWeight: '500',
  },

  featurePillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingTop: 4,
  },
  featureTagPill: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  featureTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* Article Images */
  stageArticleImageCol: {
    width: '100%',
  },
  stageImageWrapper: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
    aspectRatio: 4 / 3,
    backgroundColor: theme.colors.surfaceContainer,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  stageArticleImg: {
    width: '100%',
    height: '100%',
  },
  stageFeaturedActsPill: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(251, 248, 252, 0.94)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  pulsingDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  stageFeaturedActsText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },

  /* 04 — Essential Visitor Protocols */
  protocolsSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    gap: 24,
    marginBottom: 44,
  },
  protocolsHeader: {
    gap: 8,
  },
  protocolsBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  protocolsBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  protocolsTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  protocolsSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 600,
  },
  protocolsGrid: {
    gap: 20,
    justifyContent: 'space-between',
  },
  protocolCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    minHeight: 240,
    gap: 20,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  protocolTop: {
    gap: 12,
  },
  protocolIconCircleOrange: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.secondaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  protocolIconCircleGreen: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  protocolIconCirclePink: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.tertiaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  protocolIconCircleGray: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  protocolCardTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  protocolCardDesc: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.onSurfaceVariant,
  },
  protocolTag: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(27, 27, 30, 0.2)',
  },
  protocolTagText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  protocolTagPink: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#18181B',
  },
  protocolTagPinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },

  /* 05 — CTA Banner */
  ctaBannerSection: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    marginBottom: 44,
  },
  ctaBannerCard: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 24,
    padding: 32,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 24,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 6px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  ctaBannerTextCol: {
    gap: 8,
  },
  ctaPillWhite: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  ctaPillWhiteText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ctaBannerTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  ctaBannerSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    color: theme.colors.onPrimaryFixedVariant,
    maxWidth: 560,
  },
  ctaBannerBtnsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ctaPassesBtn: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 24,
    paddingVertical: 12,
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
  ctaPassesBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  ctaScheduleBtn: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 20,
    paddingVertical: 12,
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
  ctaScheduleBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  /* 06 — Footer */
  footerSection: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    paddingTop: 48,
    paddingBottom: 36,
  },
  footerGrid: {
    maxWidth: 1440,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 24,
    gap: 36,
    marginBottom: 40,
  },
  footerBrandCol: {
    gap: 16,
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerLogoBadge: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {}),
  },
  footerLogoBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  footerSquishBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
  },
  footerSquishBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  footerBrandText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 420,
  },
  footerBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footerMiniPill: {
    backgroundColor: theme.colors.surfaceContainerLowest,
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
    gap: 8,
  },
  footerNavHeader: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  footerNavLink: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    paddingVertical: 2,
  },

  footerNewsletterCol: {
    gap: 12,
  },
  footerNewsletterSub: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 380,
  },
  newsletterInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 4,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {}),
  },
  newsletterInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurface,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  newsletterJoinBtn: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 20,
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
    gap: 8,
  },
  poweredText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
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
    gap: 20,
  },
  subfooterLink: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
});
