# Bring Back House Music Fest (TypeScript & React Native)

A React Native project built entirely in TypeScript for the **Bring Back House Music Festival 2025** in Chicago, IL.

## Project Structure

```
├── App.tsx                     # Main application entry point in TypeScript
├── src/
│   ├── theme.ts                # Extracted festival design system (colors, typography, spacing, radius)
│   ├── types.ts                # Strict TypeScript interfaces & types (Artists, Stages, Passes, etc.)
│   ├── festivalData.ts         # Festival lineup, stages, passes, features and schedule data
│   ├── FestivalIcon.tsx        # High-performance universal vector icon renderer
│   ├── LandingPage.tsx         # Full-featured festival landing page component
│   └── index.ts                # Public exports
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Project dependencies and npm scripts
```

## Features Included
1. **Extracted Design System / Theme (`src/theme.ts`)**:
   - Complete color tokens: surface containers, electric lavender (`#ddb7ff`), neon coral (`#ffb4a3`), acid mint (`#4ae176`), overlays, and dark backgrounds.
   - Standardized typography, border radii, and spacing tokens.
2. **Hero Section**:
   - High-impact festival background and laser overlays.
   - Live real-time bass countdown timer (Days, Hours, Minutes, Seconds).
   - Audio spec HUD with live frequency equalizer bars.
3. **Official Lineup**:
   - Interactive genre filter chips (**All Artists**, **Deep House**, **Chicago Classic**, **Disco & Soul**, **Acid & Tech**).
   - Colossal headliners flow billboard (Kerri Chandler, Honey Dijon, The Blessed Madonna, Green Velvet, Moodymann, Derrick Carter).
   - Featured artist cards with badges, stages, and descriptions.
   - Underground masters and selectors matrix.
4. **Acoustic Architecture / Stages**:
   - Detailed sound engineering cards for **The Warehouse**, **Sunset Cove**, **Neon Groove Dome**, and **The Basement**.
5. **Passes & VIP Tiers**:
   - Tier 1 GA ($189), VIP Groove ($349, featured with glow & popular banner), and Ultimate Backstage ($699) with full perk lists.
   - Trust and assurance badges (Official tickets, payment plans, fan exchange, worldwide shipping).
6. **Beyond The Music & Grounds Map**:
   - Culinary market, vinyl record fair, sanctuary decompression decks, and transit guide.
7. **Interactive Elements & Footer**:
   - Newsletter registration, official playlist launcher, sound & vision partner acknowledgments, and footer navigation.
