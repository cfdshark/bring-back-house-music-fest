import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { LandingPage } from './src/LandingPage';
import { GalleryPage } from './src/GalleryPage';
import { MerchPage } from './src/MerchPage';
import { SchedulePage } from './src/SchedulePage';
import { StagesPage } from './src/StagesPage';
import { PassesPage } from './src/PassesPage';
import { theme } from './src/theme';

export type Screen = 'landing' | 'schedule' | 'stages' | 'merch' | 'passes' | 'gallery';

if (Platform.OS === 'web' && typeof document !== 'undefined') {
  if (!document.getElementById('bbhm-fonts')) {
    const link = document.createElement('link');
    link.id = 'bbhm-fonts';
    link.rel = 'stylesheet';
    link.href =
      'https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Outfit:wght@100..900&display=swap';
    document.head.appendChild(link);
  }
}

export default function App(): React.JSX.Element {
  const [activeScreen, setActiveScreen] = useState<Screen>('landing');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />

      {/* Screen Switcher Floating Tactile Pill */}
      <View style={styles.floatingNavPill}>
        <TouchableOpacity
          onPress={() => setActiveScreen('landing')}
          style={[
            styles.navPillBtn,
            activeScreen === 'landing' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'landing' && styles.navPillTextActive,
            ]}
          >
            Landing
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen('schedule')}
          style={[
            styles.navPillBtn,
            activeScreen === 'schedule' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'schedule' && styles.navPillTextActive,
            ]}
          >
            Schedule
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen('stages')}
          style={[
            styles.navPillBtn,
            activeScreen === 'stages' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'stages' && styles.navPillTextActive,
            ]}
          >
            Stages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen('merch')}
          style={[
            styles.navPillBtn,
            activeScreen === 'merch' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'merch' && styles.navPillTextActive,
            ]}
          >
            Merch
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen('passes')}
          style={[
            styles.navPillBtn,
            activeScreen === 'passes' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'passes' && styles.navPillTextActive,
            ]}
          >
            Passes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveScreen('gallery')}
          style={[
            styles.navPillBtn,
            activeScreen === 'gallery' && styles.navPillBtnActive,
          ]}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.navPillText,
              activeScreen === 'gallery' && styles.navPillTextActive,
            ]}
          >
            Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Active Screen Render */}
      {activeScreen === 'landing' ? (
        <LandingPage onNavigate={setActiveScreen} />
      ) : activeScreen === 'schedule' ? (
        <SchedulePage onNavigate={setActiveScreen} />
      ) : activeScreen === 'stages' ? (
        <StagesPage onNavigate={setActiveScreen} />
      ) : activeScreen === 'merch' ? (
        <MerchPage onNavigate={setActiveScreen} />
      ) : activeScreen === 'passes' ? (
        <PassesPage onNavigate={setActiveScreen} />
      ) : (
        <GalleryPage onNavigate={setActiveScreen} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  floatingNavPill: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 9999,
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceContainerLowest,
    padding: 6,
    borderRadius: theme.borderRadius.full,
    borderWidth: 2,
    borderColor: '#18181B',
    shadowColor: '#18181B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    gap: 4,
  },
  navPillBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: theme.borderRadius.full,
  },
  navPillBtnActive: {
    backgroundColor: theme.colors.primaryContainer,
    borderWidth: 2,
    borderColor: '#18181B',
    shadowColor: '#18181B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  navPillText: {
    color: theme.colors.onSurfaceVariant,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  navPillTextActive: {
    color: theme.colors.onPrimaryContainer,
  },
});
