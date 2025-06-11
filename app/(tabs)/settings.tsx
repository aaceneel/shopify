import React from 'react';
import { View, StyleSheet, ScrollView, Text, Switch, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@/store/settingsStore';
import { useNotificationStore } from '@/store/notificationStore';
import SettingItem from '@/components/SettingItem';
import NotificationPreview from '@/components/NotificationPreview';
import Colors from '@/constants/colors';
import { Bell, Palette, Image as ImageIcon, Trash2, Clock, DollarSign } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useSettingsStore();
  const { clearHistory } = useNotificationStore();
  
  // Format frequency for display
  const formatFrequency = (frequency: string): string => {
    switch (frequency) {
      case 'realtime': return 'Real-time';
      case '5min': return 'Every 5 minutes';
      case '15min': return 'Every 15 minutes';
      case '30min': return 'Every 30 minutes';
      case 'hourly': return 'Hourly';
      case 'daily': return 'Daily';
      default: return frequency;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <NotificationPreview settings={settings} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingsContainer}>
          <SettingItem
            label="Enable Notifications"
            value={
              <Switch
                value={settings.enabled}
                onValueChange={(value) => updateSettings({ enabled: value })}
                trackColor={{ false: Colors.inactive, true: Colors.primary }}
                thumbColor="#FFF"
              />
            }
            icon={<Bell size={20} color={Colors.primary} />}
            showChevron={false}
          />
          
          <SettingItem
            label="Notification Frequency"
            value={formatFrequency(settings.frequency)}
            onPress={() => router.push('/settings/notification-settings')}
            icon={<Clock size={20} color={Colors.primary} />}
          />
          
          <SettingItem
            label="Minimum Order Amount"
            value={`$${settings.minOrderAmount}`}
            onPress={() => router.push('/settings/notification-settings')}
            icon={<DollarSign size={20} color={Colors.primary} />}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Appearance</Text>
        <View style={styles.settingsContainer}>
          <SettingItem
            label="Store Name"
            value={settings.storeName}
            onPress={() => router.push('/settings/appearance')}
            icon={<Palette size={20} color={Colors.primary} />}
          />
          
          <SettingItem
            label="Custom Logo"
            value={
              settings.customLogo ? (
                <Image
                  source={{ uri: settings.customLogo }}
                  style={styles.logoPreview}
                />
              ) : (
                'Default'
              )
            }
            onPress={() => router.push('/settings/logo')}
            icon={<ImageIcon size={20} color={Colors.primary} />}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data</Text>
        <View style={styles.settingsContainer}>
          <SettingItem
            label="Clear Notification History"
            value="Delete all notifications"
            onPress={clearHistory}
            icon={<Trash2 size={20} color={Colors.error} />}
          />
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Shopify Notifications v1.0.0</Text>
        <Text style={styles.footerSubtext}>
          This is a demo app and is not affiliated with Shopify Inc.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  settingsContainer: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
  },
  logoPreview: {
    width: 24,
    height: 24,
    borderRadius: 4,
    marginRight: 8,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.inactive,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: Colors.inactive,
    textAlign: 'center',
  },
});
