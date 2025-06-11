import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NotificationSettings, MockOrder } from '@/types';
import Colors from '@/constants/colors';
import { formatNotificationBody } from '@/utils/notifications';
import { ShoppingBag } from 'lucide-react-native';

interface NotificationPreviewProps {
  settings: NotificationSettings;
  mockOrder?: MockOrder;
}

export default function NotificationPreview({ settings, mockOrder }: NotificationPreviewProps) {
  const defaultOrder: MockOrder = {
    id: '123',
    amount: 79.99,
    items: 2,
    timestamp: Date.now(),
    storeName: settings.storeName,
  };
  
  const order = mockOrder || defaultOrder;
  const body = formatNotificationBody(settings.notificationBody, order);
  
  return (
    <View style={[styles.container, { backgroundColor: settings.notificationColor || Colors.notification }]}>
      <View style={styles.header}>
        {settings.customLogo ? (
          <Image source={{ uri: settings.customLogo }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder}>
            <ShoppingBag size={20} color={Colors.primary} />
          </View>
        )}
        <View style={styles.headerTextContainer}>
          <Text style={styles.appName}>Shopify</Text>
          <Text style={styles.time}>now</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{settings.notificationTitle}</Text>
        <Text style={styles.body}>{body}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logo: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 8,
  },
  logoPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  appName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.inactive,
  },
  content: {
    marginLeft: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
  },
});
