import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ImageStyle,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { theme } from './theme';
import { FESTIVAL_INFO } from './festivalData';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface PassesPageProps {
  onNavigate?: (screen: Screen) => void;
}

interface PassTier {
  id: string;
  name: string;
  category: '3day' | 'single' | 'cabanas' | 'hotel';
  price: number;
  badge: string;
  badgeType: 'standard' | 'luxury' | 'exclusive' | 'group';
  statusNote: string;
  description: string;
  perks: string[];
  isHero?: boolean;
  images?: { label: string; url: string }[];
  footerNote?: string;
  soldPercentage?: string;
}

interface AddonItem {
  id: string;
  name: string;
  price: number;
  description: string;
  badge: string;
  badgeColor?: string;
}

const PASS_TIERS: PassTier[] = [
  {
    id: 'ga',
    name: '3-Day General Admission',
    category: '3day',
    price: 189,
    badge: 'Standard Entry',
    badgeType: 'standard',
    statusNote: 'ALL 3 DAYS',
    description:
      'Full access to all 4 dance stages across Northerly Island Chicago, tactile sound floors, hydration hubs, and official food sanctuary gardens.',
    perks: [
      'Access to all 4 main stages (120-134 BPM)',
      'High-rebound foam sub-floor arena access',
      'Tactile waterproof RFID collectible wristband',
      'Free refillable water station network',
    ],
    soldPercentage: 'Tier 2 of 3 • 72% Sold',
  },
  {
    id: 'vip',
    name: '3-Day VIP Groove Pass',
    category: '3day',
    price: 349,
    badge: 'Curated Luxury',
    badgeType: 'luxury',
    statusNote: 'LIMITED ALLOCATION',
    isHero: true,
    description:
      'Elevated lakeside viewing lounges, private air-conditioned restrooms, fast-track RFID access, and complimentary official 2025 vinyl EP.',
    images: [
      {
        label: 'Elevated Deck',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFvOlzSLoPZVElEvl0PZSQjXGMHTBvGEILSqLLPEqMhQTNbk58Zl02XImRjbXAg3B4n8Z5F-S-V1hlw8waIvNmEiJVZWJ0qHj--ykErZk0mGPAYpSsfAsnXlxgF0jzEH-bKiB9afEOTmbA4-7_J-WDtcCavmQ3ITqhPB5Muqom8khyXTZF8Yuma-1jgyIooncPZsquchoiwP6s1e55i7e0gGXSa-7KAsc9--8k-9ur3ARVS4v4iNwGdQ',
      },
      {
        label: '2025 Vinyl EP',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmI8bntTNdSQyQvu-fhCF4YBTWY4CU_Zh0oLLVnAeuk6jB7tv97tEkU8IikubLJRK6L4d9TMzEf4tM5P1iMbU_SYp10JOp9nCqp6-ZRuKEdfhcOxomPDDW2bRxNdefxW5L_7zz7Y5cJqD4vawxrxWEI3tcheL3Zcphaau4EKIpJZRQljzndau_1M3KtX85xZTudkDLQ7r8MHu7Zmkz8D8YsJ5wF5RuMYhuQD0tLpZj2e56OPDbOUon5Q',
      },
      {
        label: 'AC Suites & Bar',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Wws5Glf0wOdrDTv-WEkW6_pGjgFdINYdXiZhCKjlSk5FyMCdtr7KGI5-k9fXMQuLQhTTCF7WyP2Twol3B3_1xyHJrrXOUapTaj4ZiP1VjcneliqzZSWxm2hjeXJDVGdgfvDjJmShgPGKKUd7_znwVdAKGukvMz_8sasJcrRUWzNB3KF3dwn96DBgQJ-DoVbI7XygbsLMtsb7CI4RF4zv6KUJo9MYZFljtxQKeIXGFg1gx3A3708wLw',
      },
    ],
    perks: [
      'Express fast-track RFID lane at all gates',
      'Elevated Lake Michigan stage viewing platforms',
      'Private air-conditioned restroom suites',
      'Limited 2025 festival 12" vinyl drop included',
      'Dedicated mixology bars with house signature drinks',
      'Tactile foam souvenir locker voucher ($35 value)',
    ],
    soldPercentage: 'Tier 2 Price Locked',
  },
  {
    id: 'backstage',
    name: 'Ultimate Backstage & Sound Sanctuary',
    category: '3day',
    price: 699,
    badge: 'Capped at 250 Total',
    badgeType: 'exclusive',
    statusNote: 'Only 31 Remaining',
    description:
      'Unrestricted artist backstage access, elevated sound booth platforms directly alongside headliners, fully open premium bar, and golf cart lake transfers.',
    perks: [
      'Stage-side artist sound booth viewing decks',
      'Open top-shelf bar & curated chef tastings',
      'Direct backstage golf-cart transit shuttles',
      'Guaranteed afterparty access at Smartbar',
    ],
    footerNote: 'Includes Custom Artist Jacket',
  },
  {
    id: 'cabana',
    name: 'VIP Sky Lounge Private Cabana',
    category: 'cabanas',
    price: 2400,
    badge: 'Groups of 8',
    badgeType: 'group',
    statusNote: 'Private Lounge',
    description:
      'Dedicated bottle service, private foam sunbed cabana directly overlooking Main Stage, express entry, and personal host concierge.',
    perks: [
      'Custom plush lounge with shade sail & foam couches',
      '3 premium bottle selections with curated mixers',
      'Dedicated security & cocktail server staff',
      'All VIP amenities included for up to 8 guests',
    ],
    footerNote: 'Host Concierge Assigned Upon Booking',
  },
];

const ADDONS: AddonItem[] = [
  {
    id: 'afterparty',
    name: 'Official Afterparty Pass',
    price: 95,
    description: '3 nights of warehouse sessions until 6:00 AM at secret Fulton Market spaces.',
    badge: 'Only 112 Passes Left',
    badgeColor: '#ab3500',
  },
  {
    id: 'vinyl',
    name: 'Collector 2xLP Vinyl Boxset',
    price: 45,
    description: 'Mastered on 180g heavy wax with unreleased festival mixes & etched artwork.',
    badge: 'Ships with Wristband',
    badgeColor: '#424936',
  },
  {
    id: 'locker',
    name: 'Locker & Charger Hub',
    price: 35,
    description: 'Keyless 3-day locker with unlimited swap-and-go phone charging batteries.',
    badge: 'Fast Sellout',
    badgeColor: '#446900',
  },
  {
    id: 'tour',
    name: 'Audio Architecture Tour',
    price: 60,
    description: 'Guided behind-the-scenes walking demo of the Funktion-One sound system design.',
    badge: 'Fri Aug 22 • 1:00 PM',
    badgeColor: '#424936',
  },
];

export const PassesPage: React.FC<PassesPageProps> = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;

  const [selectedCategory, setSelectedCategory] = useState<'3day' | 'single' | 'cabanas' | 'hotel'>('3day');
  const [selectedPassId, setSelectedPassId] = useState<string>('vip');
  const [passQuantity, setPassQuantity] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [refundProtection, setRefundProtection] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const selectedTier = PASS_TIERS.find((t) => t.id === selectedPassId) || PASS_TIERS[1];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
    const item = ADDONS.find((a) => a.id === id);
    if (item) {
      const isAdding = !selectedAddons.includes(id);
      showToast(isAdding ? `Added ${item.name}` : `Removed ${item.name}`);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const passSubtotal = selectedTier.price * passQuantity;
  const shippingFee = 7.5;
  const protectionFee = refundProtection ? 19.0 : 0.0;
  const totalAmount = passSubtotal + addonsTotal + shippingFee + protectionFee;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleCheckout = (method: 'wallet' | 'card') => {
    alert(
      `Order Confirmed!\n\nPass: ${selectedTier.name} (Qty: ${passQuantity})\nTotal: $${totalAmount.toFixed(
        2
      )} USD\nMethod: ${method === 'wallet' ? 'Apple Pay / GPay' : 'Card Checkout'}\n\nYour RFID Wristband package will be dispatched with priority tracking.`
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
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => {}}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>
                Passes / VIP
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navPillLink}
              onPress={() => onNavigate?.('gallery')}
            >
              <Text style={styles.navPillLinkText}>Gallery</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.headerRightGroup}>
            <TouchableOpacity
              style={styles.headerPassesBtn}
              onPress={() => {}}
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
              01 — HERO / TITLE HEADER SECTION
              ───────────────────────────────────────────────────────── */}
          <View style={styles.heroSection}>
            <View style={styles.heroBadgesRow}>
              <View style={styles.heroBadgeTier}>
                <FestivalIcon
                  name="verified"
                  size={16}
                  color={theme.colors.onPrimaryContainer}
                />
                <Text style={styles.heroBadgeTierText}>TIER 2 LIVE NOW</Text>
              </View>

              <View style={styles.heroBadgeCabanas}>
                <FestivalIcon
                  name="local_fire_department"
                  size={16}
                  color={theme.colors.onTertiaryContainer}
                />
                <Text style={styles.heroBadgeCabanasText}>84% OF CABANAS RESERVED</Text>
              </View>

              <View style={styles.heroBadgeZeroFees}>
                <FestivalIcon
                  name="all_inclusive"
                  size={16}
                  color={theme.colors.onSurface}
                />
                <Text style={styles.heroBadgeZeroFeesText}>ZERO SURPRISE SERVICE FEES</Text>
              </View>
            </View>

            <View style={[styles.heroHeaderSplit, !isDesktop && styles.heroHeaderSplitMobile]}>
              <View style={styles.heroTitleCol}>
                <Text style={[styles.heroTitle, !isDesktop && styles.heroTitleMobile]}>
                  Passes, VIP & Travel
                </Text>
                <Text style={styles.heroSubtitle}>
                  Secure verified RFID NFC wristbands and curated lakeside hospitality. Zero hidden handling fees at checkout. Pure bounce guaranteed.
                </Text>
              </View>

              {/* Squish Factor Metric Pill */}
              <View style={styles.squishMeterPill}>
                <View style={styles.squishMeterTopRow}>
                  <Text style={styles.squishMeterLabel}>Dancefloor Rebound Factor</Text>
                  <Text style={styles.squishMeterScore}>10 / 10 SQUISH</Text>
                </View>
                <View style={styles.squishCapsulesRow}>
                  {Array.from({ length: 10 }).map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.squishCapsule,
                        i === 9 && styles.squishCapsuleActive,
                      ]}
                    />
                  ))}
                </View>
              </View>
            </View>

            {/* Category Filter Tabs */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filterTabsScroll}
              contentContainerStyle={styles.filterTabsContent}
            >
              {[
                { id: '3day', label: '3-Day Weekend Passes' },
                { id: 'single', label: 'Single Day Tickets' },
                { id: 'cabanas', label: 'Backstage Cabanas' },
                { id: 'hotel', label: 'Hotel Packages' },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <TouchableOpacity
                    key={tab.id}
                    style={[
                      styles.filterTabBtn,
                      isActive && styles.filterTabBtnActive,
                    ]}
                    onPress={() => setSelectedCategory(tab.id as any)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.filterTabBtnText,
                        isActive && styles.filterTabBtnTextActive,
                      ]}
                    >
                      {tab.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* ─────────────────────────────────────────────────────────
              02 — MAIN 2-COLUMN LAYOUT (LEFT: TIERS & ADDONS, RIGHT: CART)
              ───────────────────────────────────────────────────────── */}
          <View style={[styles.mainGrid, !isDesktop && styles.mainGridMobile]}>
            {/* LEFT COLUMN: PASSES SELECTION & ADDONS */}
            <View style={[styles.leftCol, isDesktop && { flex: 7 }]}>
              {/* Pass Tiers Stack */}
              <View style={styles.passTiersStack}>
                {/* TIER 1: GENERAL ADMISSION */}
                <View
                  style={[
                    styles.tierCard,
                    selectedPassId === 'ga' && styles.tierCardActiveBorder,
                  ]}
                >
                  <View style={styles.tierHeaderRow}>
                    <View>
                      <View style={styles.tierBadgeRow}>
                        <View style={styles.tierBadgePillStandard}>
                          <Text style={styles.tierBadgeTextStandard}>Standard Entry</Text>
                        </View>
                        <Text style={styles.tierStatusNote}>ALL 3 DAYS</Text>
                      </View>
                      <Text style={styles.tierTitle}>3-Day General Admission</Text>
                    </View>
                    <View style={styles.tierPriceGroup}>
                      <Text style={styles.tierPrice}>$189</Text>
                      <View style={styles.tierZeroFeesBadge}>
                        <Text style={styles.tierZeroFeesText}>+$0 Hidden Fees</Text>
                      </View>
                    </View>
                  </View>

                  <Text style={styles.tierDescription}>
                    Full access to all 4 dance stages across Northerly Island Chicago, tactile sound floors, hydration hubs, and official food sanctuary gardens.
                  </Text>

                  <View style={styles.tierPerksGrid}>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Access to all 4 main stages (120-134 BPM)</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>High-rebound foam sub-floor arena access</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Tactile waterproof RFID collectible wristband</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Free refillable water station network</Text>
                    </View>
                  </View>

                  <View style={styles.tierFooterRow}>
                    <Text style={styles.tierSoldText}>Tier 2 of 3 • 72% Sold</Text>
                    <TouchableOpacity
                      style={styles.tierAddBtn}
                      onPress={() => {
                        setSelectedPassId('ga');
                        showToast('Selected 3-Day General Admission');
                      }}
                      activeOpacity={0.85}
                    >
                      <FestivalIcon name="add" size={18} color="#ffffff" />
                      <Text style={styles.tierAddBtnText}>Add To Order</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TIER 2: VIP GROOVE PASS (HIGHLIGHTED HERO TIER) */}
                <View style={styles.tierHeroCard}>
                  {/* Neo-Brutalist Floating Sticker */}
                  <View style={styles.heroSticker}>
                    <FestivalIcon name="star" size={18} color={theme.colors.onPrimaryContainer} />
                    <Text style={styles.heroStickerText}>MOST POPULAR • 10/10 COMFORT</Text>
                  </View>

                  <View style={styles.tierHeaderRow}>
                    <View>
                      <View style={styles.tierBadgeRow}>
                        <View style={styles.tierBadgePillLuxury}>
                          <Text style={styles.tierBadgeTextLuxury}>Curated Luxury</Text>
                        </View>
                        <Text style={styles.tierStatusNote}>LIMITED ALLOCATION</Text>
                      </View>
                      <Text style={styles.tierTitle}>3-Day VIP Groove Pass</Text>
                    </View>
                    <View style={styles.tierPriceGroup}>
                      <Text style={styles.tierPrice}>$349</Text>
                      <Text style={styles.tierKlarnaText}>
                        or 4x <Text style={{ fontWeight: '800', color: theme.colors.onSurface }}>$87.25</Text> with Klarna
                      </Text>
                    </View>
                  </View>

                  {/* Visual Inset Pod with Festival VIP Perk Photography */}
                  <View style={[styles.vipPhotosRow, !isTablet && styles.vipPhotosRowMobile]}>
                    <View style={styles.vipPhotoCard}>
                      <Image
                        source={{
                          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFvOlzSLoPZVElEvl0PZSQjXGMHTBvGEILSqLLPEqMhQTNbk58Zl02XImRjbXAg3B4n8Z5F-S-V1hlw8waIvNmEiJVZWJ0qHj--ykErZk0mGPAYpSsfAsnXlxgF0jzEH-bKiB9afEOTmbA4-7_J-WDtcCavmQ3ITqhPB5Muqom8khyXTZF8Yuma-1jgyIooncPZsquchoiwP6s1e55i7e0gGXSa-7KAsc9--8k-9ur3ARVS4v4iNwGdQ',
                        }}
                        style={styles.vipPhoto as ImageStyle}
                        resizeMode="cover"
                      />
                      <View style={styles.vipPhotoBadge}>
                        <Text style={styles.vipPhotoBadgeText}>Elevated Deck</Text>
                      </View>
                    </View>

                    <View style={styles.vipPhotoCard}>
                      <Image
                        source={{
                          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmI8bntTNdSQyQvu-fhCF4YBTWY4CU_Zh0oLLVnAeuk6jB7tv97tEkU8IikubLJRK6L4d9TMzEf4tM5P1iMbU_SYp10JOp9nCqp6-ZRuKEdfhcOxomPDDW2bRxNdefxW5L_7zz7Y5cJqD4vawxrxWEI3tcheL3Zcphaau4EKIpJZRQljzndau_1M3KtX85xZTudkDLQ7r8MHu7Zmkz8D8YsJ5wF5RuMYhuQD0tLpZj2e56OPDbOUon5Q',
                        }}
                        style={styles.vipPhoto as ImageStyle}
                        resizeMode="cover"
                      />
                      <View style={styles.vipPhotoBadge}>
                        <Text style={styles.vipPhotoBadgeText}>2025 Vinyl EP</Text>
                      </View>
                    </View>

                    <View style={styles.vipPhotoCard}>
                      <Image
                        source={{
                          uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9Wws5Glf0wOdrDTv-WEkW6_pGjgFdINYdXiZhCKjlSk5FyMCdtr7KGI5-k9fXMQuLQhTTCF7WyP2Twol3B3_1xyHJrrXOUapTaj4ZiP1VjcneliqzZSWxm2hjeXJDVGdgfvDjJmShgPGKKUd7_znwVdAKGukvMz_8sasJcrRUWzNB3KF3dwn96DBgQJ-DoVbI7XygbsLMtsb7CI4RF4zv6KUJo9MYZFljtxQKeIXGFg1gx3A3708wLw',
                        }}
                        style={styles.vipPhoto as ImageStyle}
                        resizeMode="cover"
                      />
                      <View style={styles.vipPhotoBadge}>
                        <Text style={styles.vipPhotoBadgeText}>AC Suites & Bar</Text>
                      </View>
                    </View>
                  </View>

                  {/* Bulleted VIP Privileges */}
                  <View style={styles.tierPerksGrid}>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Express fast-track RFID lane at all gates</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Elevated Lake Michigan stage viewing platforms</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Private air-conditioned restroom suites</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Limited 2025 festival 12" vinyl drop included</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Dedicated mixology bars with house signature drinks</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={[styles.tierPerkText, { fontWeight: '600' }]}>Tactile foam souvenir locker voucher ($35 value)</Text>
                    </View>
                  </View>

                  {/* Selected In Cart Banner */}
                  <View style={styles.vipCartStatusBanner}>
                    <View style={styles.vipCartStatusLeft}>
                      <View style={styles.vipCartStatusDot} />
                      <Text style={styles.vipCartStatusText}>Selected in your cart</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.vipSelectedBtn}
                      onPress={() => {
                        setSelectedPassId('vip');
                        showToast('VIP Groove Pass Selected');
                      }}
                      activeOpacity={0.85}
                    >
                      <FestivalIcon name="check" size={18} color="#ffffff" />
                      <Text style={styles.vipSelectedBtnText}>Selected</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TIER 3: ULTIMATE BACKSTAGE SANCTUARY */}
                <View
                  style={[
                    styles.tierCard,
                    selectedPassId === 'backstage' && styles.tierCardActiveBorder,
                  ]}
                >
                  <View style={styles.tierHeaderRow}>
                    <View>
                      <View style={styles.tierBadgeRow}>
                        <View style={styles.tierBadgePillTertiary}>
                          <Text style={styles.tierBadgeTextTertiary}>Capped at 250 Total</Text>
                        </View>
                        <Text style={styles.tierRemainingBadge}>Only 31 Remaining</Text>
                      </View>
                      <Text style={styles.tierTitle}>Ultimate Backstage & Sound Sanctuary</Text>
                    </View>
                    <View style={styles.tierPriceGroup}>
                      <Text style={styles.tierPrice}>$699</Text>
                      <Text style={styles.tierInclusiveNote}>All Inclusive Bar & Dining</Text>
                    </View>
                  </View>

                  <Text style={styles.tierDescription}>
                    Unrestricted artist backstage access, elevated sound booth platforms directly alongside headliners, fully open premium bar, and golf cart lake transfers.
                  </Text>

                  <View style={styles.tierPerksGrid}>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Stage-side artist sound booth viewing decks</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Open top-shelf bar & curated chef tastings</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Direct backstage golf-cart transit shuttles</Text>
                    </View>
                    <View style={styles.tierPerkItem}>
                      <FestivalIcon name="check_circle" size={18} color={theme.colors.primary} />
                      <Text style={styles.tierPerkText}>Guaranteed afterparty access at Smartbar</Text>
                    </View>
                  </View>

                  <View style={styles.tierFooterRow}>
                    <Text style={styles.tierSoldText}>Includes Custom Artist Jacket</Text>
                    <TouchableOpacity
                      style={styles.tierAddBtn}
                      onPress={() => {
                        setSelectedPassId('backstage');
                        showToast('Selected Ultimate Backstage Pass');
                      }}
                      activeOpacity={0.85}
                    >
                      <FestivalIcon name="add" size={18} color="#ffffff" />
                      <Text style={styles.tierAddBtnText}>Add To Order</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* TIER 4: PRIVATE CABANA */}
                <View style={styles.cabanaCard}>
                  <View style={[styles.cabanaHeaderRow, !isTablet && styles.cabanaHeaderRowMobile]}>
                    <View style={{ flex: 1 }}>
                      <View style={styles.tierBadgeRow}>
                        <View style={styles.cabanaBadgePill}>
                          <Text style={styles.cabanaBadgeText}>Groups of 8</Text>
                        </View>
                        <Text style={styles.tierStatusNote}>Private Lounge</Text>
                      </View>
                      <Text style={styles.tierTitle}>VIP Sky Lounge Private Cabana</Text>
                      <Text style={styles.cabanaDescription}>
                        Dedicated bottle service, private foam sunbed cabana directly overlooking Main Stage.
                      </Text>
                    </View>
                    <View style={styles.cabanaRightCol}>
                      <Text style={styles.cabanaPrice}>$2,400</Text>
                      <TouchableOpacity
                        style={styles.cabanaRequestBtn}
                        onPress={() => {
                          setSelectedPassId('cabana');
                          showToast('Private Cabana Reservation Requested');
                        }}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.cabanaRequestBtnText}>Request Reservation</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>

              {/* ─────────────────────────────────────────────────────────
                  EXPERIENCE ADD-ONS SECTION
                  ───────────────────────────────────────────────────────── */}
              <View style={styles.addonsSection}>
                <View style={styles.addonsHeaderRow}>
                  <View>
                    <Text style={styles.addonsTitle}>Upgrade Your Experience</Text>
                    <Text style={styles.addonsSubtitle}>
                      Reserve high-demand equipment, lockers, and afterparty entries.
                    </Text>
                  </View>
                  <View style={styles.addonsBadgePill}>
                    <Text style={styles.addonsBadgeText}>ADDON PERKS</Text>
                  </View>
                </View>

                <View style={[styles.addonsGrid, !isTablet && styles.addonsGridMobile]}>
                  {ADDONS.map((addon) => {
                    const isAdded = selectedAddons.includes(addon.id);
                    return (
                      <View key={addon.id} style={styles.addonCard}>
                        <View style={styles.addonCardTop}>
                          <View style={{ flex: 1, paddingRight: 8 }}>
                            <Text style={styles.addonName}>{addon.name}</Text>
                            <Text style={styles.addonDescription}>{addon.description}</Text>
                          </View>
                          <Text style={styles.addonPrice}>${addon.price}</Text>
                        </View>

                        <View style={styles.addonCardBottom}>
                          <Text
                            style={[
                              styles.addonBadge,
                              addon.badgeColor ? { color: addon.badgeColor } : {},
                            ]}
                          >
                            {addon.badge}
                          </Text>
                          <TouchableOpacity
                            style={[
                              styles.addonBtn,
                              isAdded && styles.addonBtnActive,
                            ]}
                            onPress={() => toggleAddon(addon.id)}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[
                                styles.addonBtnText,
                                isAdded && styles.addonBtnTextActive,
                              ]}
                            >
                              {isAdded ? 'Added ✓' : 'Add +'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>

              {/* ─────────────────────────────────────────────────────────
                  LAKE MICHIGAN VENUE AMBIENT CARD
                  ───────────────────────────────────────────────────────── */}
              <View style={[styles.ambientCard, !isTablet && styles.ambientCardMobile]}>
                <View style={[styles.ambientImageCol, !isTablet && styles.ambientImageColMobile]}>
                  <Image
                    source={{
                      uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAmgIyQf_k8sN6wxCquX3CGLTF9KK-VW1DcZ7cHt_xn_LgsU8opwP5Fmi_xTLAoggw-gpBC1Nv6Mw8cqtTvgZ_0kp8tyU4YUWQ7c9rwkXMSV02KTi0fSIDJ4tKaFdS2AIpd9F-zssJSUcjTm49MXEv5cO87qzlnNccDZnxiN8gVVHtGUDW2yan0tM2kMp6HOmGEwWT4dFqCWF2iRxR9Ufxo9eQbn5EaIxnyQdu5d0ufSdOXAH3eaoy2rw',
                    }}
                    style={styles.ambientImage as ImageStyle}
                    resizeMode="cover"
                  />
                  <View style={styles.ambientImageBadge}>
                    <Text style={styles.ambientImageBadgeText}>Northerly Island • Chicago, IL</Text>
                  </View>
                </View>

                <View style={styles.ambientTextCol}>
                  <View style={styles.ambientPill}>
                    <Text style={styles.ambientPillText}>Lakeside Acoustics</Text>
                  </View>
                  <Text style={styles.ambientTitle}>Engineered For Zero Fatigue</Text>
                  <Text style={styles.ambientDescription}>
                    Every stage incorporates proprietary Slyde high-rebound kinetic foam tiles beneath the turf, absorbing 48% of dance impact so your legs stay fresh through Sunday night.
                  </Text>
                  <View style={styles.ambientFeaturesRow}>
                    <View style={styles.ambientFeatureItem}>
                      <FestivalIcon name="check" size={16} color={theme.colors.primary} />
                      <Text style={styles.ambientFeatureText}>360° Lake Views</Text>
                    </View>
                    <View style={styles.ambientFeatureItem}>
                      <FestivalIcon name="check" size={16} color={theme.colors.primary} />
                      <Text style={styles.ambientFeatureText}>Water Taxis</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* ─────────────────────────────────────────────────────────
                RIGHT COLUMN: STICKY CHECKOUT SUMMARY (4-5 COLS)
                ───────────────────────────────────────────────────────── */}
            <View style={[styles.rightCol, isDesktop && { flex: 5 }]}>
              <View style={styles.cartCard}>
                {/* Header */}
                <View style={styles.cartHeaderRow}>
                  <View style={styles.cartHeaderLeft}>
                    <FestivalIcon name="shopping_bag" size={22} color={theme.colors.onSurface} />
                    <Text style={styles.cartHeaderTitle}>Order Summary</Text>
                  </View>
                  <View style={styles.cartItemCountPill}>
                    <Text style={styles.cartItemCountText}>
                      {passQuantity + selectedAddons.length} ITEM{passQuantity + selectedAddons.length > 1 ? 'S' : ''}
                    </Text>
                  </View>
                </View>

                {/* Selected Pass Item */}
                <View style={styles.cartPassItem}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cartPassName}>{selectedTier.name}</Text>
                    <Text style={styles.cartPassMeta}>Aug 22-24 • Northerly Island</Text>
                    <Text style={styles.cartPassTierLock}>{selectedTier.soldPercentage || 'Tier Price Locked'}</Text>
                  </View>
                  <View style={styles.cartPassRight}>
                    <Text style={styles.cartPassPrice}>${selectedTier.price * passQuantity}.00</Text>
                    <View style={styles.qtyStepper}>
                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => setPassQuantity((q) => Math.max(1, q - 1))}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.stepperBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.stepperQtyText}>{passQuantity}</Text>
                      <TouchableOpacity
                        style={styles.stepperBtn}
                        onPress={() => setPassQuantity((q) => q + 1)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.stepperBtnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* Selected Addons in Cart */}
                {selectedAddons.map((addonId) => {
                  const addon = ADDONS.find((a) => a.id === addonId);
                  if (!addon) return null;
                  return (
                    <View key={addon.id} style={styles.cartAddonRow}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.cartAddonName}>{addon.name}</Text>
                        <Text style={styles.cartAddonMeta}>Addon Pass</Text>
                      </View>
                      <Text style={styles.cartAddonPrice}>${addon.price}.00</Text>
                      <TouchableOpacity
                        onPress={() => toggleAddon(addon.id)}
                        style={styles.cartRemoveAddonBtn}
                      >
                        <FestivalIcon name="close" size={14} color="#ba1a1a" />
                      </TouchableOpacity>
                    </View>
                  );
                })}

                {/* Zero Fees Callout Banner */}
                <View style={styles.zeroFeesBanner}>
                  <FestivalIcon name="price_check" size={24} color={theme.colors.primary} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.zeroFeesTitle}>100% Transparent Pricing</Text>
                    <Text style={styles.zeroFeesSubtitle}>We never charge hidden ticketing convenience fees.</Text>
                  </View>
                </View>

                {/* Refund Protection Chunky Toggle */}
                <View style={styles.refundProtectionCard}>
                  <View style={{ flex: 1, paddingRight: 8 }}>
                    <View style={styles.refundTitleRow}>
                      <Text style={styles.refundTitle}>100% Refund Protection</Text>
                      <View style={styles.refundBadge}>
                        <Text style={styles.refundBadgeText}>RECOMMENDED</Text>
                      </View>
                    </View>
                    <Text style={styles.refundSubtitle}>
                      Full refund if illness or flight delays occur (+$19.00).
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={[
                      styles.chunkyToggleTrack,
                      refundProtection && styles.chunkyToggleTrackActive,
                    ]}
                    onPress={() => setRefundProtection(!refundProtection)}
                    activeOpacity={0.85}
                  >
                    <View
                      style={[
                        styles.chunkyToggleThumb,
                        refundProtection && styles.chunkyToggleThumbActive,
                      ]}
                    />
                  </TouchableOpacity>
                </View>

                {/* Cost Calculations */}
                <View style={styles.costCalculationsWrap}>
                  <View style={styles.costLine}>
                    <Text style={styles.costLabel}>Pass Subtotal</Text>
                    <Text style={styles.costValue}>${passSubtotal.toFixed(2)}</Text>
                  </View>

                  {addonsTotal > 0 && (
                    <View style={styles.costLine}>
                      <Text style={styles.costLabel}>Addons Subtotal</Text>
                      <Text style={styles.costValue}>${addonsTotal.toFixed(2)}</Text>
                    </View>
                  )}

                  <View style={styles.costLine}>
                    <Text style={styles.costLabel}>RFID Wristband Express Shipping (Eco Pouch)</Text>
                    <Text style={styles.costValue}>${shippingFee.toFixed(2)}</Text>
                  </View>

                  <View style={styles.costLine}>
                    <Text style={styles.costLabel}>Processing & Venue Surcharge</Text>
                    <Text style={styles.costWaived}>$0.00 (WAIVED)</Text>
                  </View>

                  {refundProtection && (
                    <View style={styles.costLine}>
                      <Text style={styles.costLabel}>Comprehensive Booking Protection</Text>
                      <Text style={styles.costValue}>$19.00</Text>
                    </View>
                  )}
                </View>

                {/* Total Pill */}
                <View style={styles.totalPill}>
                  <View>
                    <Text style={styles.totalLabel}>Total Due Today</Text>
                    <Text style={styles.totalSubtext}>Tax & shipping included</Text>
                  </View>
                  <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
                </View>

                {/* Big Action Buttons */}
                <View style={styles.checkoutButtonsCol}>
                  <TouchableOpacity
                    style={styles.applePayBtn}
                    onPress={() => handleCheckout('wallet')}
                    activeOpacity={0.85}
                  >
                    <FestivalIcon name="account_balance_wallet" size={20} color="#ffffff" />
                    <Text style={styles.applePayBtnText}>Express Apple Pay / GPay</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cardCheckoutBtn}
                    onPress={() => handleCheckout('card')}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.cardCheckoutBtnText}>Checkout With Card</Text>
                    <FestivalIcon name="arrow_forward" size={20} color="#ffffff" />
                  </TouchableOpacity>
                </View>

                {/* Guarantee Badge */}
                <View style={styles.guaranteeRow}>
                  <FestivalIcon name="verified_user" size={18} color={theme.colors.primary} />
                  <Text style={styles.guaranteeText}>100% Verified RFID Ticket Guarantee</Text>
                </View>

                {/* Payment Methods */}
                <View style={styles.paymentMethodsRow}>
                  <Text style={styles.paymentMethodLogo}>VISA</Text>
                  <Text style={styles.paymentBullet}>•</Text>
                  <Text style={styles.paymentMethodLogo}>MC</Text>
                  <Text style={styles.paymentBullet}>•</Text>
                  <Text style={styles.paymentMethodLogo}>AMEX</Text>
                  <Text style={styles.paymentBullet}>•</Text>
                  <Text style={styles.paymentMethodLogo}>KLARNA</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ─────────────────────────────────────────────────────────
              03 — FAQ ACCORDION NEO-BRUTALIST STRIP
              ───────────────────────────────────────────────────────── */}
          <View style={styles.faqSection}>
            <View style={[styles.faqHeaderRow, !isTablet && styles.faqHeaderRowMobile]}>
              <View>
                <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                <Text style={styles.faqSubtitle}>
                  Everything you need to know about wristbands, transfers, and venue comfort.
                </Text>
              </View>
              <View style={styles.faqSupportPill}>
                <FestivalIcon name="help_center" size={18} color={theme.colors.primary} />
                <Text style={styles.faqSupportText}>24/7 Concierge Support</Text>
              </View>
            </View>

            <View style={[styles.faqGrid, !isTablet && styles.faqGridMobile]}>
              <View style={styles.faqCard}>
                <Text style={styles.faqCardTitle}>When do wristbands ship?</Text>
                <Text style={styles.faqCardAnswer}>
                  All RFID tactile fabric wristbands ship via tracked USPS Priority by July 28, 2025 in our signature collector foam presentation case.
                </Text>
              </View>

              <View style={styles.faqCard}>
                <Text style={styles.faqCardTitle}>Can I transfer or resell?</Text>
                <Text style={styles.faqCardAnswer}>
                  Yes! Passes can be securely transferred via our official fan exchange at face value until August 15 with zero scalping fees permitted.
                </Text>
              </View>

              <View style={styles.faqCard}>
                <Text style={styles.faqCardTitle}>What is the age policy?</Text>
                <Text style={styles.faqCardAnswer}>
                  BBHM Fest is strictly 21+ for all general admission and VIP wristbands. Government photo ID or valid passport required at box office.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            04 — SITE FOOTER
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
                  <Text style={[styles.footerNavLink, { fontWeight: '700', color: theme.colors.onSurface }]}>Wristbands & Locker VIP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('gallery')}>
                  <Text style={styles.footerNavLink}>Footage Archive</Text>
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
   Exact pixel & rem match to scratch/passes_mockup.html
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

  // HERO SECTION
  heroSection: {
    paddingTop: 36,
    paddingBottom: 24,
    gap: 16,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
  },
  heroBadgeTier: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#a3e635',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  heroBadgeTierText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroBadgeCabanas: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffc2d7',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  heroBadgeCabanasText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ae0a69',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroBadgeZeroFees: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e4e1e6',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  heroBadgeZeroFeesText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  heroHeaderSplit: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 24,
    marginTop: 8,
  },
  heroHeaderSplitMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  heroTitleCol: {
    flex: 1,
    maxWidth: 720,
  },
  heroTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '900',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -1.5,
  },
  heroTitleMobile: {
    fontSize: 36,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 17,
    lineHeight: 26,
    color: '#424936',
    marginTop: 8,
  },

  // SQUISH METER
  squishMeterPill: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    minWidth: 240,
    gap: 8,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  squishMeterTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  squishMeterLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  squishMeterScore: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#446900',
    textTransform: 'uppercase',
  },
  squishCapsulesRow: {
    flexDirection: 'row',
    gap: 6,
    height: 12,
  },
  squishCapsule: {
    flex: 1,
    backgroundColor: '#a3e635',
    borderRadius: 9999,
  },
  squishCapsuleActive: {
    backgroundColor: '#b2f746',
  },

  // FILTER TABS
  filterTabsScroll: {
    marginTop: 12,
  },
  filterTabsContent: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  filterTabBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  filterTabBtnActive: {
    backgroundColor: '#a3e635',
    borderWidth: 2,
    borderColor: '#18181B',
  },
  filterTabBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '700',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  filterTabBtnTextActive: {
    color: '#416400',
  },

  // 02 — MAIN TWO-COLUMN GRID
  mainGrid: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  mainGridMobile: {
    flexDirection: 'column',
  },
  leftCol: {
    gap: 32,
  },
  rightCol: {
    width: '100%',
  },

  // PASS TIERS STACK
  passTiersStack: {
    gap: 24,
  },
  tierCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  tierCardActiveBorder: {
    borderColor: '#a3e635',
    borderWidth: 3,
  },
  tierHeroCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 3,
    borderColor: '#a3e635',
    position: 'relative',
    gap: 16,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0px 6px 0px #18181B',
          outline: '4px solid #a3e635',
        } as any)
      : {}),
  },
  heroSticker: {
    position: 'absolute',
    top: -16,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#a3e635',
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  heroStickerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tierHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#eae7eb',
    paddingBottom: 16,
  },
  tierBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  tierBadgePillStandard: {
    backgroundColor: '#eae7eb',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  tierBadgeTextStandard: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  tierBadgePillLuxury: {
    backgroundColor: '#ab3500',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  tierBadgeTextLuxury: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  tierBadgePillTertiary: {
    backgroundColor: '#b4136d',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  tierBadgeTextTertiary: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  tierStatusNote: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
  },
  tierRemainingBadge: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ba1a1a',
    textTransform: 'uppercase',
  },
  tierTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 26,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  tierPriceGroup: {
    alignItems: 'flex-end',
  },
  tierPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 36,
    fontWeight: '900',
    color: '#1b1b1e',
    letterSpacing: -1,
  },
  tierZeroFeesBadge: {
    backgroundColor: 'rgba(163, 230, 53, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  tierZeroFeesText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#334f00',
    textTransform: 'uppercase',
  },
  tierKlarnaText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#424936',
    marginTop: 2,
  },
  tierInclusiveNote: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
  },
  tierDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: '#424936',
  },
  tierPerksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tierPerkItem: {
    width: '48%',
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tierPerkText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#1b1b1e',
    flex: 1,
  },
  tierFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  tierSoldText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  tierAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fe6a34',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  tierAddBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  // VIP INSET PHOTOS
  vipPhotosRow: {
    flexDirection: 'row',
    gap: 12,
  },
  vipPhotosRowMobile: {
    flexDirection: 'column',
  },
  vipPhotoCard: {
    flex: 1,
    height: 120,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    backgroundColor: '#f0edf1',
  },
  vipPhoto: {
    width: '100%',
    height: '100%',
  },
  vipPhotoBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(27, 27, 30, 0.88)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  vipPhotoBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  vipCartStatusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f2f7',
    padding: 16,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  vipCartStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  vipCartStatusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fe6a34',
  },
  vipCartStatusText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  vipSelectedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 22,
    paddingVertical: 10,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  vipSelectedBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },

  // CABANA CARD
  cabanaCard: {
    backgroundColor: '#f0edf1',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  cabanaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  cabanaHeaderRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  cabanaBadgePill: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  cabanaBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  cabanaDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: '#424936',
    marginTop: 4,
  },
  cabanaRightCol: {
    alignItems: 'flex-end',
    gap: 8,
  },
  cabanaPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 32,
    fontWeight: '900',
    color: '#1b1b1e',
    letterSpacing: -1,
  },
  cabanaRequestBtn: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 3px 0px #18181B' } as any) : {}),
  },
  cabanaRequestBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },

  // ADDONS SECTION
  addonsSection: {
    gap: 16,
    marginTop: 8,
  },
  addonsHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addonsTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 28,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  addonsSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: '#424936',
  },
  addonsBadgePill: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  addonsBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },
  addonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  addonsGridMobile: {
    flexDirection: 'column',
  },
  addonCard: {
    flex: 1,
    minWidth: 280,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'space-between',
    gap: 16,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  addonCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  addonName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 17,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  addonDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 18,
    color: '#424936',
    marginTop: 4,
  },
  addonPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: '#1b1b1e',
  },
  addonCardBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#f0edf1',
    paddingTop: 12,
  },
  addonBadge: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  addonBtn: {
    backgroundColor: '#fe6a34',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  addonBtnActive: {
    backgroundColor: '#a3e635',
  },
  addonBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  addonBtnTextActive: {
    color: '#416400',
  },

  // AMBIENT CARD
  ambientCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    marginTop: 8,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  ambientCardMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  ambientImageCol: {
    width: '45%',
    height: 220,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#18181B',
    position: 'relative',
    backgroundColor: '#f0edf1',
  },
  ambientImageColMobile: {
    width: '100%',
  },
  ambientImage: {
    width: '100%',
    height: '100%',
  },
  ambientImageBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(27, 27, 30, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  ambientImageBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  ambientTextCol: {
    flex: 1,
    gap: 8,
  },
  ambientPill: {
    backgroundColor: '#ffd9e4',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  ambientPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#3e0022',
    textTransform: 'uppercase',
  },
  ambientTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  ambientDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: '#424936',
  },
  ambientFeaturesRow: {
    flexDirection: 'row',
    gap: 16,
    paddingTop: 4,
  },
  ambientFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ambientFeatureText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },

  // 03 — RIGHT STICKY CART COLUMN
  cartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 16,
    ...(Platform.OS === 'web'
      ? ({
          boxShadow: '0px 6px 0px #18181B',
          position: 'sticky',
          top: 96,
        } as any)
      : {}),
  },
  cartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eae7eb',
    paddingBottom: 12,
  },
  cartHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartHeaderTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  cartItemCountPill: {
    backgroundColor: '#a3e635',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  cartItemCountText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#416400',
    textTransform: 'uppercase',
  },
  cartPassItem: {
    backgroundColor: '#f6f2f7',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  cartPassName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  cartPassMeta: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#424936',
    marginTop: 2,
  },
  cartPassTierLock: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#446900',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  cartPassRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  cartPassPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: '#1b1b1e',
  },
  qtyStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepperBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  stepperBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#1b1b1e',
    lineHeight: 16,
  },
  stepperQtyText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#1b1b1e',
  },
  cartAddonRow: {
    backgroundColor: '#f6f2f7',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartAddonName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  cartAddonMeta: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 11,
    color: '#424936',
  },
  cartAddonPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#1b1b1e',
  },
  cartRemoveAddonBtn: {
    padding: 4,
  },

  // ZERO FEES BANNER
  zeroFeesBanner: {
    backgroundColor: 'rgba(163, 230, 53, 0.25)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  zeroFeesTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  zeroFeesSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: '#424936',
  },

  // REFUND PROTECTION TOGGLE
  refundProtectionCard: {
    backgroundColor: '#f6f2f7',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  refundTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  refundTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  refundBadge: {
    backgroundColor: '#ffdbd0',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 9999,
  },
  refundBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 9,
    fontWeight: '800',
    color: '#390c00',
    textTransform: 'uppercase',
  },
  refundSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: '#424936',
    marginTop: 2,
  },
  chunkyToggleTrack: {
    width: 52,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e4e1e6',
    padding: 3,
    borderWidth: 2,
    borderColor: '#18181B',
    justifyContent: 'center',
  },
  chunkyToggleTrackActive: {
    backgroundColor: '#a3e635',
  },
  chunkyToggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#1b1b1e',
  },
  chunkyToggleThumbActive: {
    alignSelf: 'flex-end',
  },

  // COST CALCULATIONS
  costCalculationsWrap: {
    borderTopWidth: 1,
    borderTopColor: '#eae7eb',
    paddingTop: 12,
    gap: 8,
  },
  costLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  costLabel: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#424936',
    flex: 1,
    paddingRight: 8,
  },
  costValue: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    fontWeight: '600',
    color: '#1b1b1e',
  },
  costWaived: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#446900',
    textTransform: 'uppercase',
  },

  // TOTAL PILL
  totalPill: {
    backgroundColor: '#f0edf1',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#18181B',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    textTransform: 'uppercase',
  },
  totalSubtext: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 11,
    color: '#424936',
  },
  totalAmount: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 32,
    fontWeight: '900',
    color: '#1b1b1e',
    letterSpacing: -1,
  },

  // ACTION BUTTONS
  checkoutButtonsCol: {
    gap: 10,
  },
  applePayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#1b1b1e',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  applePayBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  cardCheckoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fe6a34',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  cardCheckoutBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  guaranteeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  guaranteeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: '#424936',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  paymentMethodsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    opacity: 0.6,
  },
  paymentMethodLogo: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#424936',
    letterSpacing: 1,
  },
  paymentBullet: {
    fontSize: 10,
    color: '#424936',
  },

  // 04 — FAQ ACCORDION SECTION
  faqSection: {
    backgroundColor: '#f6f2f7',
    borderRadius: 20,
    padding: 28,
    borderWidth: 2,
    borderColor: '#18181B',
    marginTop: 48,
    gap: 20,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 4px 0px #18181B' } as any) : {}),
  },
  faqHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eae7eb',
    paddingBottom: 16,
  },
  faqHeaderRowMobile: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 12,
  },
  faqTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 28,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  faqSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    color: '#424936',
    marginTop: 2,
  },
  faqSupportPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  faqSupportText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  faqGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  faqGridMobile: {
    flexDirection: 'column',
  },
  faqCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 8,
    ...(Platform.OS === 'web' ? ({ boxShadow: '0px 2px 0px #18181B' } as any) : {}),
  },
  faqCardTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 16,
    fontWeight: '800',
    color: '#1b1b1e',
    textTransform: 'uppercase',
  },
  faqCardAnswer: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 20,
    color: '#424936',
  },

  // 05 — SITE FOOTER
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
