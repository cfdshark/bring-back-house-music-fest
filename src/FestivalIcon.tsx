import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

export type IconName =
  | 'graphic_eq'
  | 'radio'
  | 'play_arrow'
  | 'play_circle'
  | 'pause'
  | 'close'
  | 'timer'
  | 'volume_up'
  | 'domain'
  | 'wb_twilight'
  | 'flare'
  | 'album'
  | 'bolt'
  | 'star'
  | 'stars'
  | 'sports_kabaddi'
  | 'bookmark_add'
  | 'bookmark'
  | 'bookmark_remove'
  | 'verified'
  | 'water'
  | 'blur_on'
  | 'visibility_off'
  | 'confirmation_number'
  | 'check_circle'
  | 'lock'
  | 'credit_card'
  | 'swap_horiz'
  | 'local_shipping'
  | 'navigation'
  | 'campaign'
  | 'music_note'
  | 'person'
  | 'shopping_bag'
  | 'tune'
  | 'photo_camera'
  | 'schedule'
  | 'filter_list'
  | 'arrow_forward'
  | 'ios_share'
  | 'equalizer'
  | 'mic'
  | 'piano'
  | 'hearing'
  | 'flash_on'
  | 'key'
  | 'speed'
  | 'spatial_audio_off'
  | 'spatial_audio'
  | 'done_all'
  | 'add'
  | 'check'
  | 'map'
  | 'directions_subway'
  | 'backpack'
  | 'hearing_disabled'
  | 'spa'
  | 'water_drop'
  | 'restaurant'
  | 'self_improvement'
  | 'surround_sound'
  | 'phonelink_erase'
  | 'pin_drop'
  | 'tag'
  | 'recycling'
  | 'ac_unit'
  | 'add_shopping_cart'
  | 'expand_more'
  | 'straighten'
  | 'local_fire_department'
  | 'all_inclusive'
  | 'price_check'
  | 'account_balance_wallet'
  | 'verified_user'
  | 'help_center'
  | 'folder_zip'
  | 'cloud_upload'
  | 'videocam'
  | 'favorite'
  | 'share'
  | 'grid_view'
  | 'view_quilt'
  | 'download'
  | 'lens'
  | 'auto_awesome'
  | 'sync';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const FestivalIcon: React.FC<IconProps> = ({ name, size = 18, color = '#1b1b1e', style }) => {
  const getSymbol = () => {
    switch (name) {
      case 'graphic_eq':
      case 'equalizer':
        return 'ılılı';
      case 'bolt':
      case 'flash_on':
        return '⚡';
      case 'radio':
        return '📻';
      case 'play_arrow':
      case 'play_circle':
        return '▶';
      case 'pause':
        return '❚❚';
      case 'close':
        return '✕';
      case 'timer':
      case 'schedule':
        return '⏱';
      case 'volume_up':
      case 'surround_sound':
        return '🔊';
      case 'domain':
        return '🏛';
      case 'wb_twilight':
        return '🌅';
      case 'flare':
        return '✨';
      case 'album':
        return '💿';
      case 'star':
      case 'stars':
        return '★';
      case 'sports_kabaddi':
        return '🤼';
      case 'bookmark_add':
      case 'bookmark':
        return '🔖';
      case 'bookmark_remove':
        return '🗑';
      case 'verified':
      case 'check_circle':
      case 'check':
        return '✓';
      case 'done_all':
        return '✓✓';
      case 'add':
        return '+';
      case 'water':
      case 'water_drop':
        return '💧';
      case 'blur_on':
        return '◎';
      case 'visibility_off':
      case 'phonelink_erase':
        return '👁';
      case 'confirmation_number':
        return '🎟';
      case 'lock':
        return '🔒';
      case 'credit_card':
        return '💳';
      case 'swap_horiz':
        return '⇄';
      case 'local_shipping':
        return '📦';
      case 'navigation':
        return '📍';
      case 'campaign':
        return '📣';
      case 'music_note':
        return '♫';
      case 'person':
        return '👤';
      case 'shopping_bag':
        return '🛍';
      case 'tune':
      case 'filter_list':
        return '≡';
      case 'photo_camera':
        return '📷';
      case 'arrow_forward':
        return '→';
      case 'ios_share':
        return '↗';
      case 'mic':
        return '🎤';
      case 'piano':
        return '🎹';
      case 'hearing':
        return '👂';
      case 'hearing_disabled':
        return '🔇';
      case 'key':
        return '🔑';
      case 'speed':
        return '⚡';
      case 'spatial_audio_off':
      case 'spatial_audio':
        return '🎧';
      case 'map':
        return '🗺';
      case 'directions_subway':
        return '🚇';
      case 'backpack':
        return '🎒';
      case 'spa':
      case 'self_improvement':
        return '🧘';
      case 'restaurant':
        return '🍴';
      case 'pin_drop':
        return '📍';
      case 'tag':
        return '🏷';
      case 'recycling':
        return '♻';
      case 'ac_unit':
        return '❄';
      case 'add_shopping_cart':
        return '🛒';
      case 'expand_more':
        return '▾';
      case 'straighten':
        return '📏';
      case 'local_fire_department':
        return '🔥';
      case 'all_inclusive':
        return '♾';
      case 'price_check':
        return '🏷';
      case 'account_balance_wallet':
        return '💳';
      case 'verified_user':
        return '🛡';
      case 'help_center':
        return '❓';
      case 'folder_zip':
        return '📁';
      case 'cloud_upload':
        return '☁';
      case 'videocam':
        return '🎥';
      case 'favorite':
        return '♥';
      case 'share':
        return '↗';
      case 'sync':
        return '🔄';
      case 'grid_view':
        return '⊞';
      case 'view_quilt':
        return '▥';
      case 'download':
        return '⬇';
      case 'lens':
        return '◉';
      case 'auto_awesome':
        return '✨';
      default:
        return '•';
    }
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Text
        style={[
          styles.symbolText,
          {
            fontSize: size * 0.72,
            lineHeight: size,
            color,
          },
        ]}
      >
        {getSymbol()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbolText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
