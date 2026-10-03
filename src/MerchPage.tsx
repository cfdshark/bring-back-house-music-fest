import React, { useState } from 'react';
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
  MERCH_CATEGORIES,
  SPOTLIGHT_TEE,
  SPOTLIGHT_TUMBLER,
  CATALOG_ITEMS,
} from './merchData';
import { MerchCategory, CartItem } from './merchTypes';
import { FestivalIcon } from './FestivalIcon';
import { Screen } from '../App';

interface MerchPageProps {
  onNavigate?: (screen: Screen) => void;
}

export const MerchPage: React.FC<MerchPageProps> = ({ onNavigate }) => {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;

  const [activeCategory, setActiveCategory] = useState<MerchCategory>('all');
  const [fulfillmentMode, setFulfillmentMode] = useState<'pickup' | 'ship'>('pickup');
  const [selectedColor, setSelectedColor] = useState<string>('Mineral Charcoal');
  const [selectedSize, setSelectedSize] = useState<string>('L');
  const [isCartModalVisible, setIsCartModalVisible] = useState<boolean>(false);
  const [isSizeGuideModalVisible, setIsSizeGuideModalVisible] = useState<boolean>(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Cart state initialized with the 2 spotlight items ($48 + $34 = $82)
  const [cart, setCart] = useState<CartItem[]>([
    { name: 'TR-909 Acid-Wash Tee (L)', price: 48, variant: 'Mineral Charcoal', qty: 1 },
    { name: 'Acoustic Hydro Tumbler', price: 34, variant: 'Obsidian Wave', qty: 1 },
  ]);

  const totalCartQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalCartPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addItemToCart = (name: string, price: number, variant: string = '') => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === name && i.variant === variant);
      if (existing) {
        return prev.map((i) =>
          i.name === name && i.variant === variant ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { name, price, variant, qty: 1 }];
    });
    setFeedbackToast(`Added "${name}" to Bag!`);
    setTimeout(() => setFeedbackToast(null), 2200);
  };

  const updateCartItemQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const item = updated[index];
      if (item) {
        const newQty = item.qty + delta;
        if (newQty <= 0) {
          return updated.filter((_, i) => i !== index);
        } else {
          updated[index] = { ...item, qty: newQty };
          return updated;
        }
      }
      return prev;
    });
  };

  const removeCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
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

  const filteredCatalog = CATALOG_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

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
              style={[styles.navPillLink, styles.navPillLinkActive]}
              onPress={() => {}}
            >
              <Text style={[styles.navPillLinkText, styles.navPillLinkTextActive]}>
                Merch &amp; Goods
              </Text>
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
              <Text style={styles.tickerItem}>⚡ DROP 01 LIVE</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>TR-909 CAPSULE COLLECTION</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>
                CONTACTLESS LOCKER PICKUP ON-SITE AT NORTH GATE
              </Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>SQUISH FACTOR 10/10 TESTED</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>WORLDWIDE INSURED DISPATCH</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>FREE FESTIVAL HYDRATION WITH TUMBLER</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>⚡ DROP 01 LIVE</Text>
              <Text style={styles.tickerDot}>•</Text>
              <Text style={styles.tickerItem}>TR-909 CAPSULE COLLECTION</Text>
            </View>
          </ScrollView>
        </View>

        {/* ─────────────────────────────────────────────────────────
            01 — HEADER BANNER & FULFILLMENT SWITCHER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.sectionContainer}>
          <View style={[styles.bannerHeaderRow, { flexDirection: isDesktop ? 'row' : 'column', alignItems: isDesktop ? 'flex-end' : 'flex-start' }]}>
            <View style={styles.bannerLeftCol}>
              <View style={styles.bannerBadgesWrap}>
                <View style={styles.badgeOrangeRotated}>
                  <Text style={styles.badgeOrangeText}>CAPSULE 01 DROP</Text>
                </View>
                <View style={styles.badgePinkRotated}>
                  <Text style={styles.badgePinkText}>LIMITED EDITION OF 500</Text>
                </View>
                <View style={styles.badgeWhitePill}>
                  <Text style={styles.badgeWhiteText}>100% RECYCLED HEAVYWEIGHT</Text>
                </View>
              </View>

              <Text style={[styles.bannerHeadline, { fontSize: isDesktop ? 56 : isTablet ? 42 : 32 }]}>
                MERCH &amp; GOODS VAULT
              </Text>
              <Text style={styles.bannerSubtitle}>
                Tactile festival apparel, acoustic defense gear, and warehouse-grade ware
                engineered for weightless bounce from sunset till the sunrise session.
              </Text>
            </View>

            {/* Fulfillment Switcher Pill */}
            <View style={[styles.fulfillmentWrap, { alignItems: isDesktop ? 'flex-end' : 'flex-start' }]}>
              <Text style={styles.fulfillmentLabel}>Select Order Fulfillment</Text>
              <View style={styles.fulfillmentPill}>
                <TouchableOpacity
                  style={[
                    styles.fulfillmentBtn,
                    fulfillmentMode === 'pickup' && styles.fulfillmentBtnActive,
                  ]}
                  onPress={() => setFulfillmentMode('pickup')}
                  activeOpacity={0.85}
                >
                  <FestivalIcon
                    name="lock"
                    size={18}
                    color={
                      fulfillmentMode === 'pickup'
                        ? theme.colors.onPrimaryContainer
                        : theme.colors.onSurfaceVariant
                    }
                  />
                  <Text
                    style={[
                      styles.fulfillmentBtnText,
                      fulfillmentMode === 'pickup' && styles.fulfillmentBtnTextActive,
                    ]}
                  >
                    North Gate Locker Pickup
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.fulfillmentBtn,
                    fulfillmentMode === 'ship' && styles.fulfillmentBtnActive,
                  ]}
                  onPress={() => setFulfillmentMode('ship')}
                  activeOpacity={0.85}
                >
                  <FestivalIcon
                    name="local_shipping"
                    size={18}
                    color={
                      fulfillmentMode === 'ship'
                        ? theme.colors.onPrimaryContainer
                        : theme.colors.onSurfaceVariant
                    }
                  />
                  <Text
                    style={[
                      styles.fulfillmentBtnText,
                      fulfillmentMode === 'ship' && styles.fulfillmentBtnTextActive,
                    ]}
                  >
                    Worldwide Delivery
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            02 — FEATURED SPOTLIGHT HERO SECTION (2 CARDS)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.sectionContainer}>
          <View style={[styles.spotlightGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
            {/* Spotlight Item 1: TR-909 Acid-Wash Vintage Tee */}
            <View style={[styles.spotlightTeeCard, { flex: isDesktop ? 7 : undefined }]}>
              <View style={styles.spotlightTopRow}>
                <View style={styles.spotlightBadgeGroup}>
                  <View style={styles.spotlightHeroBadge}>
                    <Text style={styles.spotlightHeroBadgeText}>HERO DROP</Text>
                  </View>
                  <View style={styles.spotlightGsmBadge}>
                    <Text style={styles.spotlightGsmBadgeText}>HEAVY COTTON 280GSM</Text>
                  </View>
                </View>
                <Text style={styles.spotlightPrice}>${SPOTLIGHT_TEE.price}.00</Text>
              </View>

              {/* Inset Product Pod */}
              <View style={styles.spotlightImagePod}>
                <View style={styles.spotlightImageStickerTee}>
                  <Text style={styles.spotlightImageStickerTeeText}>OFFICIAL RETRO VIBE</Text>
                </View>
                <Image
                  source={{ uri: SPOTLIGHT_TEE.imageUrl }}
                  style={styles.spotlightImage as ImageStyle}
                  resizeMode="contain"
                />
              </View>

              {/* Spec Controls */}
              <View style={styles.spotlightDetailsCol}>
                <View>
                  <View style={styles.titleRow}>
                    <Text style={styles.spotlightTitle}>{SPOTLIGHT_TEE.title}</Text>
                    <View style={styles.inStockBadgeRow}>
                      <View style={styles.pingDot} />
                      <Text style={styles.inStockText}>In Stock (Locker Ready)</Text>
                    </View>
                  </View>
                  <Text style={styles.spotlightDescription}>{SPOTLIGHT_TEE.description}</Text>
                </View>

                {/* Color Puck Swatches */}
                <View style={styles.colorwaysSection}>
                  <Text style={styles.colorwayLabel}>
                    Colorways: <Text style={styles.colorwayLabelBold}>{selectedColor}</Text>
                  </Text>
                  <View style={styles.colorPuckRow}>
                    {SPOTLIGHT_TEE.options?.washes?.map((wash) => {
                      const isSelected = selectedColor === wash.name;
                      return (
                        <TouchableOpacity
                          key={wash.name}
                          style={[
                            styles.colorPuck,
                            { backgroundColor: wash.colorHex },
                            isSelected && styles.colorPuckSelected,
                          ]}
                          onPress={() => setSelectedColor(wash.name)}
                          activeOpacity={0.8}
                        >
                          {isSelected && (
                            <FestivalIcon
                              name="check"
                              size={16}
                              color={wash.colorHex === '#1F1F23' ? '#ffffff' : '#18181B'}
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>

                {/* Size Selector & Add CTA */}
                <View style={[styles.sizeCtaRow, { flexDirection: isTablet ? 'row' : 'column', alignItems: isTablet ? 'center' : 'stretch' }]}>
                  <View style={styles.sizePillGroup}>
                    {SPOTLIGHT_TEE.options?.sizes?.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <TouchableOpacity
                          key={size}
                          style={[
                            styles.sizeBtn,
                            isSelected && styles.sizeBtnActive,
                          ]}
                          onPress={() => setSelectedSize(size)}
                          activeOpacity={0.8}
                        >
                          <Text
                            style={[
                              styles.sizeBtnText,
                              isSelected && styles.sizeBtnTextActive,
                            ]}
                          >
                            {size}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity
                    style={styles.claimTeeBtn}
                    onPress={() =>
                      addItemToCart(
                        `TR-909 Acid-Wash Tee (${selectedSize})`,
                        SPOTLIGHT_TEE.price,
                        selectedColor
                      )
                    }
                    activeOpacity={0.85}
                  >
                    <FestivalIcon name="shopping_bag" size={20} color="#ffffff" />
                    <Text style={styles.claimTeeBtnText}>
                      CLAIM TEE • ${SPOTLIGHT_TEE.price}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Spotlight Item 2: Acoustic Hydro Tumbler */}
            <View style={[styles.spotlightTumblerCard, { flex: isDesktop ? 5 : undefined }]}>
              <View style={styles.spotlightTopRow}>
                <View style={styles.spotlightBadgeGroup}>
                  <View style={styles.spotlightPinkBadge}>
                    <Text style={styles.spotlightPinkBadgeText}>FESTIVAL ESSENTIAL</Text>
                  </View>
                  <View style={styles.spotlightRefillBadge}>
                    <Text style={styles.spotlightRefillBadgeText}>FREE REFILLS</Text>
                  </View>
                </View>
                <Text style={styles.spotlightPrice}>${SPOTLIGHT_TUMBLER.price}.00</Text>
              </View>

              {/* Inset Pod */}
              <View style={styles.spotlightImagePod}>
                <View style={styles.spotlightImageStickerTumbler}>
                  <Text style={styles.spotlightImageStickerTumblerText}>
                    ❄️ 24-HR ICE LOCK
                  </Text>
                </View>
                <Image
                  source={{ uri: SPOTLIGHT_TUMBLER.imageUrl }}
                  style={styles.spotlightImage as ImageStyle}
                  resizeMode="contain"
                />
              </View>

              {/* Spec Controls */}
              <View style={styles.spotlightDetailsCol}>
                <View>
                  <Text style={styles.spotlightTitle}>{SPOTLIGHT_TUMBLER.title}</Text>
                  <Text style={styles.spotlightDescription}>
                    {SPOTLIGHT_TUMBLER.description}
                  </Text>
                </View>

                {/* Feature Pills */}
                <View style={styles.tumblerFeatureGrid}>
                  <View style={styles.tumblerFeaturePill}>
                    <FestivalIcon
                      name="water_drop"
                      size={20}
                      color={theme.colors.secondary}
                    />
                    <Text style={styles.tumblerFeatureText}>Unlimited Free Water</Text>
                  </View>
                  <View style={styles.tumblerFeaturePill}>
                    <FestivalIcon
                      name="ac_unit"
                      size={20}
                      color={theme.colors.primary}
                    />
                    <Text style={styles.tumblerFeatureText}>Double-Wall Chill</Text>
                  </View>
                </View>

                {/* Add CTA */}
                <TouchableOpacity
                  style={styles.addTumblerBtn}
                  onPress={() =>
                    addItemToCart(
                      SPOTLIGHT_TUMBLER.title,
                      SPOTLIGHT_TUMBLER.price,
                      'Laser Stainless'
                    )
                  }
                  activeOpacity={0.85}
                >
                  <FestivalIcon
                    name="add_shopping_cart"
                    size={20}
                    color={theme.colors.onPrimaryContainer}
                  />
                  <Text style={styles.addTumblerBtnText}>
                    ADD TO LOCKER • ${SPOTLIGHT_TUMBLER.price}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            03 — PRE-ORDER & FESTIVAL PERKS BAR (3 CARDS)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.sectionContainer}>
          <View style={[styles.perksGrid, { flexDirection: isTablet ? 'row' : 'column' }]}>
            <View style={[styles.perkCardOrange, { flex: isTablet ? 1 : undefined }]}>
              <View style={styles.perkIconCircle}>
                <FestivalIcon
                  name="pin_drop"
                  size={26}
                  color={theme.colors.secondary}
                />
              </View>
              <Text style={styles.perkTitleOrange}>Zero-Wait Lockers</Text>
              <Text style={styles.perkTextOrange}>
                Pre-order merch before August 10th and pick up securely at the North Gate
                VIP Lockers using your digital wristband QR code.
              </Text>
            </View>

            <View style={[styles.perkCardLime, { flex: isTablet ? 1 : undefined }]}>
              <View style={styles.perkIconCircle}>
                <FestivalIcon name="tag" size={26} color={theme.colors.primary} />
              </View>
              <Text style={styles.perkTitleLime}>Numbered Archive Runs</Text>
              <Text style={styles.perkTextLime}>
                Every garment is serialized with an NFC weave tag pointing to the master
                vinyl audio stems recorded live during BBHM warehouse sets.
              </Text>
            </View>

            <View style={[styles.perkCardPink, { flex: isTablet ? 1 : undefined }]}>
              <View style={styles.perkIconCircle}>
                <FestivalIcon
                  name="recycling"
                  size={26}
                  color={theme.colors.tertiary}
                />
              </View>
              <Text style={styles.perkTitlePink}>Circularity &amp; Refills</Text>
              <Text style={styles.perkTextPink}>
                Bring your tumbler back each festival year for life to unlock 15% off
                backstage juice elixirs and cold brewed house blends.
              </Text>
            </View>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            04 — FILTER & CATALOG SECTION (6 PRODUCTS)
            ───────────────────────────────────────────────────────── */}
        <View style={styles.sectionContainer}>
          {/* Filter Bar */}
          <View style={[styles.catalogFilterBar, { flexDirection: isTablet ? 'row' : 'column', alignItems: isTablet ? 'center' : 'flex-start' }]}>
            <View style={styles.catalogFilterLeft}>
              <Text style={styles.catalogHeading}>Official Catalog</Text>
              <View style={styles.categoryPillsWrap}>
                {MERCH_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <TouchableOpacity
                      key={cat.id}
                      style={[
                        styles.catFilterPill,
                        isActive && styles.catFilterPillActive,
                      ]}
                      onPress={() => setActiveCategory(cat.id)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.catFilterPillText,
                          isActive && styles.catFilterPillTextActive,
                        ]}
                      >
                        {cat.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.sortContainer}>
              <Text style={styles.sortLabel}>Sort by:</Text>
              <View style={styles.sortPill}>
                <Text style={styles.sortPillText}>FEATURED DROP</Text>
                <FestivalIcon name="expand_more" size={18} color="#18181B" />
              </View>
            </View>
          </View>

          {/* Product Grid: 6 Distinct Items */}
          <View style={[styles.catalogGrid, { flexDirection: 'row', flexWrap: 'wrap' }]}>
            {filteredCatalog.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.productCard,
                  { width: isDesktop ? '31.8%' : isTablet ? '48%' : '100%' },
                ]}
              >
                <View>
                  {/* Image Pod */}
                  <View
                    style={[
                      styles.productImagePod,
                      { backgroundColor: item.bgTint || '#F4F2F7' },
                    ]}
                  >
                    {item.badge && (
                      <View
                        style={[
                          styles.productBadgePill,
                          item.badgeType === 'secondary'
                            ? styles.badgeSecondary
                            : item.badgeType === 'tertiary'
                            ? styles.badgeTertiary
                            : styles.badgePrimary,
                        ]}
                      >
                        <Text style={styles.productBadgePillText}>{item.badge}</Text>
                      </View>
                    )}
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.productImage as ImageStyle}
                      resizeMode="contain"
                    />
                  </View>

                  {/* Header info */}
                  <View style={styles.productInfoRow}>
                    <View style={styles.productCategoryPill}>
                      <Text style={styles.productCategoryText}>
                        {item.categoryLabel || item.category}
                      </Text>
                    </View>
                    <Text style={styles.productPrice}>${item.price}.00</Text>
                  </View>

                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productDescription}>{item.description}</Text>
                </View>

                {/* Footer spec and Add button */}
                <View style={styles.productBottomRow}>
                  <View style={styles.productSpecWrap}>
                    {item.specIcon && (
                      <FestivalIcon
                        name={item.specIcon as any}
                        size={16}
                        color={
                          item.badgeType === 'secondary'
                            ? theme.colors.secondary
                            : theme.colors.primary
                        }
                      />
                    )}
                    <Text
                      style={[
                        styles.productSpecText,
                        item.specIcon && styles.productSpecTextHighlighted,
                      ]}
                    >
                      {item.squishRating || item.specPill || 'SQUISH: 10/10'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.productAddBtn}
                    onPress={() => addItemToCart(item.title, item.price)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.productAddBtnText}>ADD • ${item.price}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            05 — FIT GUIDE BANNER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.sectionContainer}>
          <View style={[styles.fitGuideBanner, { flexDirection: isTablet ? 'row' : 'column', alignItems: isTablet ? 'center' : 'flex-start' }]}>
            <View style={[styles.fitGuideLeft, { flex: isTablet ? 1 : undefined }]}>
              <View style={styles.fitGuideIconCircle}>
                <FestivalIcon name="straighten" size={32} color="#18181B" />
              </View>
              <View style={styles.fitGuideTextCol}>
                <View style={styles.fitGuideBadge}>
                  <Text style={styles.fitGuideBadgeText}>BOUNCE &amp; DRAPE</Text>
                </View>
                <Text style={styles.fitGuideTitle}>Not Sure About Your Rave Fit?</Text>
                <Text style={styles.fitGuideSubtitle}>
                  Our tees feature an authentic early 90s dropped shoulder cut. If you
                  prefer a fitted silhouette, size down. For the authentic acid warehouse
                  drape, stay true to size.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.fitGuideBtn}
              onPress={() => setIsSizeGuideModalVisible(true)}
              activeOpacity={0.85}
            >
              <Text style={styles.fitGuideBtnText}>VIEW MEASUREMENT GRID</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ─────────────────────────────────────────────────────────
            06 — FOOTER
            ───────────────────────────────────────────────────────── */}
        <View style={styles.footerContainer}>
          <View style={styles.footerInner}>
            <View style={[styles.footerGrid, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              {/* Brand Column */}
              <View style={[styles.footerCol1, { flex: isDesktop ? 5 : undefined }]}>
                <View style={styles.footerBrandRow}>
                  <View style={styles.footerBrandPill}>
                    <Text style={styles.footerBrandText}>{FESTIVAL_INFO.shortName}</Text>
                  </View>
                  <View style={styles.footerSquishBadge}>
                    <Text style={styles.footerSquishText}>SQUISH FACTOR 10/10</Text>
                  </View>
                </View>
                <Text style={styles.footerDescription}>
                  Born in the underground warehouses of Chicago. Engineered with
                  high-rebound dancefloor foam acoustics and kinetic house culture.
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

              {/* Navigate Column */}
              <View style={[styles.footerCol2, { flex: isDesktop ? 3 : undefined }]}>
                <Text style={styles.footerNavTitle}>NAVIGATE</Text>
                <TouchableOpacity onPress={() => onNavigate?.('landing')}>
                  <Text style={styles.footerNavLink}>Artist Lineup 2025</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('schedule')}>
                  <Text style={styles.footerNavLink}>Weekend Timetable</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('stages')}>
                  <Text style={styles.footerNavLink}>Tactile Foam Arenas</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Text style={[styles.footerNavLink, { color: theme.colors.primary }]}>
                    Drop 01 Official Merch
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('passes')}>
                  <Text style={styles.footerNavLink}>Wristbands &amp; Locker VIP</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onNavigate?.('gallery')}>
                  <Text style={styles.footerNavLink}>Footage Archive</Text>
                </TouchableOpacity>
              </View>

              {/* Newsletter Column */}
              <View style={[styles.footerCol3, { flex: isDesktop ? 4 : undefined }]}>
                <Text style={styles.footerNavTitle}>CLUB NEWSLETTER</Text>
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

                <View style={styles.audioPoweredRow}>
                  <FestivalIcon name="volume_up" size={16} color={theme.colors.onSurfaceVariant} />
                  <Text style={styles.audioPoweredText}>
                    POWERED BY FUNCTION-ONE &amp; SLYDE ACOUSTIC FOAM
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.footerBottomBar, { flexDirection: isTablet ? 'row' : 'column' }]}>
              <Text style={styles.footerCopyright}>
                © 2025 Bring Back House Music Festival. All rights reserved. Crafted with
                Tactile Toy Ergonomics.
              </Text>
              <View style={styles.footerLegalLinks}>
                <TouchableOpacity>
                  <Text style={styles.footerLegalText}>Privacy</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLegalText}>Safety Guidelines</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.footerLegalText}>Accessibility</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom padding for fixed quick-bag pill */}
        <View style={{ height: 110 }} />
      </ScrollView>

      {/* ─────────────────────────────────────────────────────────
          07 — FLOATING QUICK-BAG PILL BAR
          ───────────────────────────────────────────────────────── */}
      <View style={styles.floatingCartPillContainer}>
        <View style={styles.floatingCartPill}>
          <TouchableOpacity
            style={styles.floatingCartLeft}
            onPress={() => setIsCartModalVisible(true)}
            activeOpacity={0.85}
          >
            <View style={styles.cartIconCircle}>
              <FestivalIcon name="shopping_bag" size={20} color="#ffffff" />
              <View style={styles.cartBadgeBubble}>
                <Text style={styles.cartBadgeBubbleText}>{totalCartQty}</Text>
              </View>
            </View>
            <View style={styles.cartTextCol}>
              <Text style={styles.cartTitleText}>YOUR FESTIVAL BAG</Text>
              <Text style={styles.cartSummaryText}>
                {totalCartQty} items •{' '}
                <Text style={styles.cartSummaryPrice}>${totalCartPrice.toFixed(2)} USD</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickCheckoutBtn}
            onPress={() => setIsCartModalVisible(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.quickCheckoutBtnText}>LOCKER CHECKOUT</Text>
            <FestivalIcon
              name="arrow_forward"
              size={18}
              color={theme.colors.onPrimaryContainer}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ─────────────────────────────────────────────────────────
          08 — CART / LOCKER CHECKOUT MODAL DRAWER
          ───────────────────────────────────────────────────────── */}
      <Modal
        visible={isCartModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsCartModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.cartModalCard}>
            <View style={styles.cartModalHeader}>
              <View style={styles.cartModalHeaderTitleGroup}>
                <Text style={styles.cartModalTitle}>FESTIVAL LOCKER CART</Text>
                <View style={styles.cartModalFulfillmentBadge}>
                  <Text style={styles.cartModalFulfillmentBadgeText}>
                    {fulfillmentMode === 'pickup'
                      ? 'NORTH GATE LOCKERS'
                      : 'WORLDWIDE COURIER'}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setIsCartModalVisible(false)}
                style={styles.closeModalBtn}
              >
                <FestivalIcon name="close" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.cartItemList} showsVerticalScrollIndicator={false}>
              {cart.length === 0 ? (
                <View style={styles.emptyCartBox}>
                  <FestivalIcon name="shopping_bag" size={48} color="#727a64" />
                  <Text style={styles.emptyCartTitle}>Your Bag is Empty</Text>
                  <Text style={styles.emptyCartSubtitle}>
                    Add tactile acid-wash tees, hydro tumblers, or acoustic gear above.
                  </Text>
                </View>
              ) : (
                cart.map((item, idx) => (
                  <View key={`${item.name}-${idx}`} style={styles.cartItemRow}>
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.name}</Text>
                      {item.variant ? (
                        <Text style={styles.cartItemVariant}>Color: {item.variant}</Text>
                      ) : null}
                      <Text style={styles.cartItemPrice}>${item.price}.00 each</Text>
                    </View>

                    <View style={styles.cartQtyControls}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartItemQty(idx, -1)}
                      >
                        <Text style={styles.qtyBtnText}>-</Text>
                      </TouchableOpacity>
                      <Text style={styles.qtyDisplay}>{item.qty}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateCartItemQty(idx, 1)}
                      >
                        <Text style={styles.qtyBtnText}>+</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.removeItemBtn}
                        onPress={() => removeCartItem(idx)}
                      >
                        <FestivalIcon name="close" size={16} color="#ba1a1a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>

            {cart.length > 0 && (
              <View style={styles.cartModalFooter}>
                <View style={styles.cartSummaryRow}>
                  <Text style={styles.cartSummaryLabel}>Subtotal</Text>
                  <Text style={styles.cartSummaryVal}>${totalCartPrice.toFixed(2)}</Text>
                </View>
                <View style={styles.cartSummaryRow}>
                  <Text style={styles.cartSummaryLabel}>North Gate Locker Reservation</Text>
                  <Text style={styles.cartSummaryFree}>FREE (PERK)</Text>
                </View>
                <View style={styles.cartSummaryTotalRow}>
                  <Text style={styles.cartTotalLabel}>Total Due</Text>
                  <Text style={styles.cartTotalVal}>${totalCartPrice.toFixed(2)} USD</Text>
                </View>

                <TouchableOpacity
                  style={styles.modalCheckoutConfirmBtn}
                  onPress={() => {
                    alert(
                      `Order confirmed for ${totalCartQty} items ($${totalCartPrice.toFixed(
                        2
                      )} USD)!\n\nYour pickup QR code has been issued for North Gate Locker Station.`
                    );
                    setCart([]);
                    setIsCartModalVisible(false);
                  }}
                  activeOpacity={0.85}
                >
                  <FestivalIcon name="lock" size={20} color="#18181B" />
                  <Text style={styles.modalCheckoutConfirmBtnText}>
                    COMPLETE LOCKER ORDER • ${totalCartPrice.toFixed(2)}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* ─────────────────────────────────────────────────────────
          09 — SIZING MEASUREMENT GRID MODAL
          ───────────────────────────────────────────────────────── */}
      <Modal
        visible={isSizeGuideModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsSizeGuideModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.sizeGuideModalCard}>
            <View style={styles.cartModalHeader}>
              <View>
                <Text style={styles.cartModalTitle}>RAVE DRAPE MEASUREMENT GRID</Text>
                <Text style={styles.sizeGuideSubtitle}>
                  All measurements given in inches (flat-lay width &amp; length)
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsSizeGuideModalVisible(false)}
                style={styles.closeModalBtn}
              >
                <FestivalIcon name="close" size={20} color="#18181B" />
              </TouchableOpacity>
            </View>

            <View style={styles.sizeTable}>
              <View style={styles.tableHeaderRow}>
                <Text style={[styles.tableHeaderCell, { fontWeight: '800' }]}>SIZE</Text>
                <Text style={styles.tableHeaderCell}>CHEST WIDTH</Text>
                <Text style={styles.tableHeaderCell}>BODY LENGTH</Text>
                <Text style={styles.tableHeaderCell}>SHOULDER DROP</Text>
              </View>
              {[
                { size: 'S', chest: '22.0"', length: '28.0"', drop: '2.5"' },
                { size: 'M', chest: '23.5"', length: '29.0"', drop: '3.0"' },
                { size: 'L', chest: '25.0"', length: '30.0"', drop: '3.5"' },
                { size: 'XL', chest: '26.5"', length: '31.0"', drop: '4.0"' },
                { size: 'XXL', chest: '28.0"', length: '32.0"', drop: '4.5"' },
              ].map((row, i) => (
                <View
                  key={row.size}
                  style={[
                    styles.tableRow,
                    i % 2 === 1 && { backgroundColor: '#f6f2f7' },
                  ]}
                >
                  <Text style={[styles.tableCell, { fontWeight: '800' }]}>{row.size}</Text>
                  <Text style={styles.tableCell}>{row.chest}</Text>
                  <Text style={styles.tableCell}>{row.length}</Text>
                  <Text style={styles.tableCell}>{row.drop}</Text>
                </View>
              ))}
            </View>

            <View style={styles.sizeGuideFooterNote}>
              <FestivalIcon name="verified" size={18} color={theme.colors.primary} />
              <Text style={styles.sizeGuideFooterNoteText}>
                Free size exchanges available 24/7 at North Gate Concierge Desk during
                festival weekend.
              </Text>
            </View>
          </View>
        </View>
      </Modal>

      {/* ─────────────────────────────────────────────────────────
          10 — TOAST NOTIFICATION
          ───────────────────────────────────────────────────────── */}
      {feedbackToast && (
        <View style={styles.toastContainer}>
          <FestivalIcon name="check_circle" size={18} color="#18181B" />
          <Text style={styles.toastText}>{feedbackToast}</Text>
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

  // Fixed Header
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'rgba(251, 248, 252, 0.95)',
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    justifyContent: 'center',
    zIndex: 50,
  },
  headerInner: {
    width: '100%',
    maxWidth: 1440,
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
    color: '#ffffff',
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
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
    color: theme.colors.onTertiaryContainer,
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
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
    color: '#ffffff',
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
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

  // Scroll Container
  scrollContainer: {
    flex: 1,
    marginTop: 80,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  // Marquee Ticker
  marqueeTicker: {
    width: '100%',
    backgroundColor: theme.colors.primaryContainer,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    paddingVertical: 10,
  },
  tickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    gap: 18,
  },
  tickerItem: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  tickerDot: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '900',
    fontSize: 14,
  },

  // Section Container
  sectionContainer: {
    width: '100%',
    maxWidth: 1440,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 20,
  },

  // 01 — Banner Row & Fulfillment
  bannerHeaderRow: {
    justifyContent: 'space-between',
    gap: 28,
  },
  bannerLeftCol: {
    flex: 1,
    maxWidth: 780,
  },
  bannerBadgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  badgeOrangeRotated: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-2.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  badgeOrangeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgePinkRotated: {
    backgroundColor: theme.colors.tertiaryFixed,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '1.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  badgePinkText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  badgeWhitePill: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  badgeWhiteText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerHeadline: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '900',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -1.5,
    marginVertical: 8,
  },
  bannerSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 18,
    lineHeight: 28,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 620,
    marginTop: 4,
  },
  fulfillmentWrap: {
    gap: 8,
    marginBottom: 6,
  },
  fulfillmentLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  fulfillmentPill: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceContainer,
    padding: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    gap: 4,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  fulfillmentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  fulfillmentBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  fulfillmentBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  fulfillmentBtnTextActive: {
    color: theme.colors.onPrimaryContainer,
    fontWeight: '800',
  },

  // 02 — Spotlight Cards
  spotlightGrid: {
    gap: 24,
  },
  spotlightTeeCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
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
  spotlightTumblerCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
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
  spotlightTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  spotlightBadgeGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  spotlightHeroBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-1deg' }],
  },
  spotlightHeroBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  spotlightGsmBadge: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  spotlightGsmBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  spotlightPinkBadge: {
    backgroundColor: theme.colors.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '2deg' }],
  },
  spotlightPinkBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onTertiaryContainer,
    textTransform: 'uppercase',
  },
  spotlightRefillBadge: {
    backgroundColor: theme.colors.secondaryFixed,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  spotlightRefillBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  spotlightPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.onSurface,
  },

  spotlightImagePod: {
    position: 'relative',
    width: '100%',
    minHeight: 400,
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },
  spotlightImageStickerTee: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: theme.colors.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '3deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  spotlightImageStickerTeeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  spotlightImageStickerTumbler: {
    position: 'absolute',
    top: 14,
    left: 14,
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    transform: [{ rotate: '-3deg' }],
    zIndex: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  spotlightImageStickerTumblerText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  spotlightImage: {
    width: '100%',
    height: 360,
  },

  spotlightDetailsCol: {
    gap: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  spotlightTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  inStockBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  inStockText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  spotlightDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
    marginTop: 6,
  },

  colorwaysSection: {
    gap: 8,
  },
  colorwayLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  colorwayLabelBold: {
    fontWeight: '900',
    color: theme.colors.onSurface,
  },
  colorPuckRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  colorPuck: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  colorPuckSelected: {
    borderWidth: 3,
    borderColor: '#18181B',
    transform: [{ scale: 1.1 }],
  },

  sizeCtaRow: {
    justifyContent: 'space-between',
    gap: 16,
    paddingTop: 4,
  },
  sizePillGroup: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  sizeBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    backgroundColor: theme.colors.surface,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  sizeBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
  },
  sizeBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onSurface,
  },
  sizeBtnTextActive: {
    color: theme.colors.onPrimaryContainer,
  },
  claimTeeBtn: {
    backgroundColor: theme.colors.secondaryContainer,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  claimTeeBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  tumblerFeatureGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  tumblerFeaturePill: {
    flex: 1,
    backgroundColor: theme.colors.surfaceContainer,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tumblerFeatureText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  addTumblerBtn: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  addTumblerBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // 03 — Perks Cards
  perksGrid: {
    gap: 20,
  },
  perkCardOrange: {
    backgroundColor: theme.colors.secondaryFixed,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    gap: 8,
    transform: [{ rotate: '-0.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  perkCardLime: {
    backgroundColor: theme.colors.primaryFixed,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    gap: 8,
    transform: [{ rotate: '0.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  perkCardPink: {
    backgroundColor: theme.colors.tertiaryFixed,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    gap: 8,
    transform: [{ rotate: '-0.5deg' }],
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  perkIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  perkTitleOrange: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.onSecondaryFixed,
    textTransform: 'uppercase',
  },
  perkTextOrange: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onSecondaryFixedVariant,
  },
  perkTitleLime: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.onPrimaryFixed,
    textTransform: 'uppercase',
  },
  perkTextLime: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onPrimaryFixedVariant,
  },
  perkTitlePink: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.onTertiaryFixed,
    textTransform: 'uppercase',
  },
  perkTextPink: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 20,
    color: theme.colors.onTertiaryFixedVariant,
  },

  // 04 — Catalog Section
  catalogFilterBar: {
    justifyContent: 'space-between',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    marginBottom: 28,
    gap: 16,
  },
  catalogFilterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flexWrap: 'wrap',
  },
  catalogHeading: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
  },
  categoryPillsWrap: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  catFilterPill: {
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  catFilterPillActive: {
    backgroundColor: '#1b1b1e',
  },
  catFilterPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  catFilterPillTextActive: {
    color: '#ffffff',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  sortPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: '#18181B',
    textTransform: 'uppercase',
  },

  catalogGrid: {
    gap: 24,
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 20,
    justifyContent: 'space-between',
    minHeight: 460,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {
          shadowColor: '#18181B',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
        }),
  },
  productImagePod: {
    position: 'relative',
    width: '100%',
    height: 270,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  productBadgePill: {
    position: 'absolute',
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    zIndex: 10,
  },
  badgePrimary: {
    backgroundColor: theme.colors.primaryContainer,
    transform: [{ rotate: '-2deg' }],
  },
  badgeSecondary: {
    backgroundColor: theme.colors.secondaryFixed,
    transform: [{ rotate: '2deg' }],
  },
  badgeTertiary: {
    backgroundColor: theme.colors.tertiaryFixed,
    transform: [{ rotate: '-1.5deg' }],
  },
  productBadgePillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: '#18181B',
    textTransform: 'uppercase',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  productInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  productCategoryPill: {
    backgroundColor: theme.colors.surfaceContainer,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
  },
  productCategoryText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  productPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.onSurface,
  },
  productTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  productDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    lineHeight: 18,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 16,
  },
  productBottomRow: {
    borderTopWidth: 2,
    borderTopColor: theme.colors.surfaceContainer,
    paddingTop: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productSpecWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  productSpecText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  productSpecTextHighlighted: {
    color: theme.colors.onSurface,
  },
  productAddBtn: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  productAddBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },

  // 05 — Fit Guide Banner
  fitGuideBanner: {
    backgroundColor: '#1b1b1e',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 32,
    justifyContent: 'space-between',
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
  fitGuideLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  fitGuideIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shrink: 0,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #ffffff' } as any)
      : {}),
  },
  fitGuideTextCol: {
    gap: 6,
  },
  fitGuideBadge: {
    backgroundColor: theme.colors.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  fitGuideBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fitGuideTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 24,
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  fitGuideSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 15,
    lineHeight: 22,
    color: theme.colors.surfaceVariant,
    maxWidth: 600,
  },
  fitGuideBtn: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #A3E635' } as any)
      : {}),
  },
  fitGuideBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // 06 — Footer
  footerContainer: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    paddingTop: 48,
    paddingBottom: 36,
  },
  footerInner: {
    width: '100%',
    maxWidth: 1440,
    alignSelf: 'center',
    paddingHorizontal: 24,
  },
  footerGrid: {
    gap: 36,
    marginBottom: 40,
  },
  footerCol1: {
    gap: 16,
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  footerBrandPill: {
    backgroundColor: '#1b1b1e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
  },
  footerBrandText: {
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
  footerSquishText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  footerDescription: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.onSurfaceVariant,
    maxWidth: 420,
  },
  footerPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  footerSmallPill: {
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
  footerSmallPillRotated1: {
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
  footerSmallPillRotated2: {
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
  footerSmallPillText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },
  footerCol2: {
    gap: 8,
  },
  footerNavTitle: {
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
  footerCol3: {
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
  audioPoweredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  audioPoweredText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  footerBottomBar: {
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    paddingTop: 24,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
  },
  footerCopyright: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
  },
  footerLegalLinks: {
    flexDirection: 'row',
    gap: 20,
  },
  footerLegalText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.onSurface,
    textTransform: 'uppercase',
  },

  // 07 — Floating Bag Bar
  floatingCartPillContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 40,
    pointerEvents: 'box-none',
  },
  floatingCartPill: {
    width: '92%',
    maxWidth: 560,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
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
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 6,
    flex: 1,
  },
  cartIconCircle: {
    position: 'relative',
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.secondaryContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeBubble: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 1,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeBubbleText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.onPrimaryContainer,
  },
  cartTextCol: {
    flexDirection: 'column',
  },
  cartTitleText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
    textTransform: 'uppercase',
  },
  cartSummaryText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  cartSummaryPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontWeight: '800',
    color: '#18181B',
  },
  quickCheckoutBtn: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 2px 0px #18181B' } as any)
      : {}),
  },
  quickCheckoutBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // 08 — Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 27, 30, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cartModalCard: {
    width: '100%',
    maxWidth: 580,
    maxHeight: '85%',
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 8px 0px #18181B' } as any)
      : {}),
  },
  cartModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    paddingBottom: 16,
    marginBottom: 16,
  },
  cartModalHeaderTitleGroup: {
    gap: 6,
  },
  cartModalTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 22,
    fontWeight: '900',
    color: '#18181B',
    textTransform: 'uppercase',
  },
  cartModalFulfillmentBadge: {
    backgroundColor: theme.colors.primaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    borderWidth: 1,
    borderColor: '#18181B',
    alignSelf: 'flex-start',
  },
  cartModalFulfillmentBadgeText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
  },
  closeModalBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartItemList: {
    maxHeight: 360,
  },
  emptyCartBox: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 12,
  },
  emptyCartTitle: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 20,
    fontWeight: '800',
    color: '#18181B',
    textTransform: 'uppercase',
  },
  emptyCartSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 320,
  },
  cartItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainer,
  },
  cartItemInfo: {
    flex: 1,
    gap: 2,
  },
  cartItemName: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 15,
    fontWeight: '800',
    color: '#18181B',
  },
  cartItemVariant: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
  },
  cartItemPrice: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.primary,
  },
  cartQtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: '#18181B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#18181B',
  },
  qtyDisplay: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B',
    minWidth: 20,
    textAlign: 'center',
  },
  removeItemBtn: {
    marginLeft: 6,
    padding: 4,
  },
  cartModalFooter: {
    borderTopWidth: 2,
    borderTopColor: '#18181B',
    paddingTop: 16,
    marginTop: 12,
    gap: 8,
  },
  cartSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cartSummaryLabel: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
  },
  cartSummaryVal: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '800',
    color: '#18181B',
  },
  cartSummaryFree: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  cartSummaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: theme.colors.surfaceContainer,
  },
  cartTotalLabel: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: '#18181B',
    textTransform: 'uppercase',
  },
  cartTotalVal: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 18,
    fontWeight: '900',
    color: '#18181B',
  },
  modalCheckoutConfirmBtn: {
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {}),
  },
  modalCheckoutConfirmBtnText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 14,
    fontWeight: '900',
    color: theme.colors.onPrimaryContainer,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Sizing Modal
  sizeGuideModalCard: {
    width: '100%',
    maxWidth: 620,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#18181B',
    padding: 24,
    gap: 16,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 8px 0px #18181B' } as any)
      : {}),
  },
  sizeGuideSubtitle: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  sizeTable: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#18181B',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceContainerLow,
    borderBottomWidth: 2,
    borderBottomColor: '#18181B',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  tableHeaderCell: {
    flex: 1,
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 12,
    color: '#18181B',
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surfaceContainer,
  },
  tableCell: {
    flex: 1,
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: '#18181B',
  },
  sizeGuideFooterNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 4,
  },
  sizeGuideFooterNoteText: {
    fontFamily: Platform.OS === 'web' ? 'DM Sans, sans-serif' : 'DM Sans',
    fontSize: 13,
    color: theme.colors.onSurfaceVariant,
  },

  // Toast
  toastContainer: {
    position: 'absolute',
    top: 96,
    alignSelf: 'center',
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    zIndex: 100,
    ...(Platform.OS === 'web'
      ? ({ boxShadow: '0px 4px 0px #18181B' } as any)
      : {}),
  },
  toastText: {
    fontFamily: Platform.OS === 'web' ? 'Outfit, sans-serif' : 'Outfit',
    fontSize: 13,
    fontWeight: '800',
    color: '#18181B',
  },
});
