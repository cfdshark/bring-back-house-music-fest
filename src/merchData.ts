import { MerchCategory, MerchItem } from './merchTypes';

export const MERCH_CATEGORIES: { id: MerchCategory; label: string }[] = [
  { id: 'all', label: 'ALL GOODS (8)' },
  { id: 'apparel', label: 'APPAREL' },
  { id: 'audio', label: 'SOUND & AUDIO' },
  { id: 'accessories', label: 'ACCESSORIES' },
];

export const SPOTLIGHT_TEE: MerchItem = {
  id: 'spotlight-tee',
  sku: 'BBHM-25-T909',
  title: 'TR-909 Acid-Wash Tee',
  price: 48,
  category: 'apparel',
  badge: 'HERO DROP',
  badgeType: 'primary',
  stockStatus: 'In Stock (Locker Ready)',
  tagline: 'HEAVY COTTON 280GSM',
  description:
    'Custom oversized silhouette hand-treated with mineral wash. Featuring the legendary Japanese drum composer graphic across the back with ultraviolet-reactive neon foil highlights.',
  imageUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1VB1sZts4ZZOd45GQqJ1jZncyGaoB1dBWFspZBmX-7oFAnaJlQWmvZOa5IP9OfYY8LwXBkQIzx2TJrvW1Vnz6zlxJlXmqHS-4PIWgAYEL9MWLm4sCOWMo8VqjYzPb0RY6Mf6ONOaFm6N0Dyn10LqwB1OEf_vWfjDEKi5Hq2-6X3q0XUyktHh0Mz2QRHxxSaX9lQBijJ38xjy2_NSYpwvX_5GiO63dm0u_68TrK7cGnejaG6kpCLdh51-hED',
  options: {
    washes: [
      { name: 'Mineral Charcoal', colorHex: '#1F1F23' },
      { name: 'Acid Lime Fade', colorHex: '#a3e635' },
      { name: 'Bubblegum Haze', colorHex: '#ffc2d7' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
};

export const SPOTLIGHT_TUMBLER: MerchItem = {
  id: 'spotlight-tumbler',
  sku: 'BBHM-25-HYDRO',
  title: 'Acoustic Hydro Tumbler',
  price: 34,
  category: 'accessories',
  badge: 'FESTIVAL ESSENTIAL',
  badgeType: 'tertiary',
  tagline: 'FREE REFILLS',
  stockStatus: '24-HR ICE LOCK',
  description:
    'Double-wall vacuum 18/8 stainless steel cup laser-etched with the 2024–2025 DJ Console waveform seal. Includes spill-proof leak lock lid and official BBHM water station wristband perk.',
  imageUrl:
    'https://lh3.googleusercontent.com/aida/AEtjO1VxJOqRg7OdfKX0nJ2dAbRRPNGQwHsW0GAybZFRNsBMnmDz9xmorxaEySJcdZ1bwIwu07jEKS_co48ikjFlJbOGSjxEzSPJtZKwQXImA6lPwkpAW65CbavpdKlYW4IWbVBBUhE7KAh9AWsDPcbMDUA4ChUtKD84dVnNpviPhfZzSE47UUslbQ-JvzAQevq1IePu2PUr3fiCf7NPnY80lcQr6QuOgtvipKth_DpRipy9XBS37PPmuQp8qC4s',
  features: ['Unlimited Free Water', 'Double-Wall Chill'],
};

export const CATALOG_ITEMS: MerchItem[] = [
  {
    id: 'c1',
    title: 'Warehouse Crew Zip Hoodie',
    price: 88,
    category: 'apparel',
    categoryLabel: 'Apparel',
    badge: '460GSM TACTILE FOAM HOOD',
    badgeType: 'primary',
    bgTint: '#F4F2F7',
    description:
      'Engineered with acoustic hood insulation lining and raw metal YKK pull-ring. Mineral acid washed for a vintage 1991 rave finish.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDTPUzpjA04O_2Cs06fQ_vQVROgwbcwPBf2Dm0PjBka0CDXpkTn9h_8-i7l855U5CTL9p9-sAWT6aoJlIz0NoxXnHC_ayuoy2IVcEvL1VqWeOD_oO927dfPXYZBClVEOnDEWBK8IKuB6_1e3DZgeUsMozQsipFtGkpWSU4sByoKvejBCFxHYxUp1-6zy1InYAg4lFyFGOJ1jEJ0MEnKYzIHPMN9Y3n7U-g_fEd1DwjdQDyoTcU6uD941g',
    squishRating: '10/10 COMFORT',
  },
  {
    id: 'c2',
    title: 'Gold 45 RPM Vinyl Puck Set',
    price: 28,
    category: 'audio',
    categoryLabel: 'DJ Gear',
    badge: 'BRASS & BILLET ALUMINUM',
    badgeType: 'secondary',
    bgTint: '#FEF6EE',
    description:
      'Weighted aluminum dome adapters designed for rapid slipcueing. Custom laser-etched with classic 120–134 BPM calibration marks.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-vOaEmKi8JE3SuO6Xfzo277TQ3-HVK2yYfSGO-lLOU-woLy-IMwWgbiPotvLagA1TddzrYbb6DoCi1en-A9bEOhGMbyfdW8DHvloa0WB7ZfadwSq7EqcLJ4Oh8gP8DtcEt-D-EloIRCaxDffwYUrahMCbc_bHiAYv8XySBN1K09lKnxgCOB-NSC6OmOsA-DhmGWP4taXcI19qsY34149hDiAhVtzCjp1IJXiJ7b9ox4RP3vY4IdbLA',
    specPill: '4-PACK COLLECTOR TIN',
    specIcon: 'album',
  },
  {
    id: 'c3',
    title: 'SafeSPL Filtered Earplugs',
    price: 32,
    category: 'audio',
    categoryLabel: 'Audio Defense',
    badge: '-19DB FLAT ATTENUATION',
    badgeType: 'tertiary',
    bgTint: '#F3FCE8',
    description:
      'Engineered acoustic membrane ensures club sound punch without ear fatigue. Includes waterproof neon lanyard capsule.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCeoej9vsAK8BqgT9ArQ0U4zbJHwx6DzrsupCSpMv6fuTAX0YmtwUrXhHG7jM0Hx8cesDVftKclf-IaHU2uzqvMdMenyPkHbygXXGYLbcV0vqq2WIGpjccPc4TEHtu2qgwjHsAVRp7IDcqtMKYoxpNcwvMIWvm7XZ23A78ln5morJG7ckkbqUoyomngNFORySSC6Kef0Ng9BNtFL790aLejxWzIh0hnwMrsAFBITIlfcnBgLd24kmDg-g',
    specPill: 'PRO AUDIOLOGY RATED',
    specIcon: 'hearing',
  },
  {
    id: 'c4',
    title: 'Sub-Bass Ceramic & Coaster',
    price: 24,
    category: 'accessories',
    categoryLabel: 'Home Ware',
    badge: '14OZ HEAVY SLIPCAST',
    badgeType: 'primary',
    bgTint: '#FFF1F2',
    description:
      'Chunky tactile stoneware finished with matte blackboard glaze. Comes with silicone turntable slipmat silicone coaster.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnnkzG1N_gjTmRGtqTTCI9hcM0O-UpXOTvtyiK4JOWSgZFDkYGuKqTla1JDa6PXJo0scmWSJOtqArcQrxg6Z8tMPzBWMZeNBsHZQW_SFIs9z_iZ_ueH6K3sOy8U8VZwjmM0pV4aoVtahKY1VUzEmO39_sq4H1MGq_PL2ZI3ELrLi9iLpbXl9ldH_S4BbXP030zp8_jiWFXOboP_pAYLqNuF_HUICNBW0wcLmME-xP4TmePhSKAoppEMg',
    squishRating: 'DISHWASHER & MICROWAVE OK',
  },
  {
    id: 'c5',
    title: 'Official 2025 Screenprint',
    price: 35,
    category: 'accessories',
    categoryLabel: 'Print & Art',
    badge: '5-COLOR HAND PULLED',
    badgeType: 'primary',
    bgTint: '#F1F5F9',
    description:
      '18x24 inches on 100lb French Paper Speckletone. Hand numbered by the Chicago print studio with blacklight invisible ink watermark.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDyg9hU1F1VP99H4mfDIPOSb0sflibLuOGi8PUkxujrT1m7x17FbIdV9cl9aMI6V2lbYQdU-ESLTrNUu7AHbbLIu5kkhKa4SS1Ybu4eXHw5vNKLl6B1uC8fIYk6H41tHLIHTt5gqWINvzp9qhp7rAIs-wLsmKp1o9rRLkeKu9lCBM6h9lfrIul0lNXVNKOYCB8B3og8wvrAIjOJ9Iu2vZZ1qoVDPTurT3H3a5E6495ezVP0cO0Lb2NuGA',
    specPill: 'EDITION OF 300 ONLY',
  },
  {
    id: 'c6',
    title: 'Reflective Rave Utility Sling',
    price: 42,
    category: 'apparel',
    categoryLabel: 'Luggage',
    badge: 'WATERPROOF RIPSTOP',
    badgeType: 'secondary',
    bgTint: '#FDF4FF',
    description:
      'Engineered with squish-foam shoulder padding for 12-hour continuous dance sets. Holds phone, earplugs, water pouch, and pass.',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWr2VF87MWobNku9DU6nqt1CPUc6YyxMownTTk077e3K6W4KLVjokfi-tnT6_dOOtuHhLAaVLA3Fncz1LA9phE-D39IhVF7rZYlBLGDsdV0CnoezMmWknq-n84gHEF5-oiBuxNm36y4UWTX-9-UjqRNofp9C860HS3fwdqosB-_UTfMYcNBjyun7kt5KfbsM7gIKnaT25f_vM19V5uw5ssIPVCDVaE_IxcIE67rQZvlEFahotX8ehSXg',
    specPill: 'AIRPORT & STAGE APPROVED',
    specIcon: 'verified',
  },
];
