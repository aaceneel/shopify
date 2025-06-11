import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { useNotificationStore } from '@/store/notificationStore';
import { useSettingsStore } from '@/store/settingsStore';
import { generateMockOrder } from '@/utils/mockData';
import { scheduleNotification, shouldSendNotification, requestNotificationPermissions } from '@/utils/notifications';
import NotificationCard from '@/components/NotificationCard';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';
import { Bell } from 'lucide-react-native';
import { NotificationHistory } from '@/types';

export default function NotificationsScreen() {
  const router = useRouter();
  const { history, addNotification, markAsRead, lastNotificationTime } = useNotificationStore();
  const { settings } = useSettingsStore();
  const [refreshing, setRefreshing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  // Check notification permissions on mount
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await requestNotificationPermissions();
      setPermissionGranted(status);
    };
    
    checkPermissions();
  }, []);

  // Handle notification press
  const handleNotificationPress = useCallback((notification: NotificationHistory) => {
    markAsRead(notification.id);
    router.push(`/notification/${notification.id}`);
  }, [markAsRead, router]);

  // Generate and send a test notification
  const sendTestNotification = useCallback(async () => {
    if (!permissionGranted) {
      const { status } = await requestNotificationPermissions();
      if (!status) return;
      setPermissionGranted(status);
    }
    
    const mockOrder = generateMockOrder(settings.storeName, settings.minOrderAmount);
    await scheduleNotification(settings, mockOrder);
  }, [settings, permissionGranted]);

  // Handle refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    
    if (shouldSendNotification(settings, lastNotificationTime)) {
      await sendTestNotification();
    }
    
    setRefreshing(false);
  }, [sendTestNotification, settings, lastNotificationTime]);

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NotificationCard
              notification={item}
              onPress={handleNotificationPress}
            />
          )}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <EmptyState
            title="No Notifications Yet"
            message="Pull down to refresh or tap the button below to generate a test notification."
          />
          <TouchableOpacity
            style={styles.testButton}
            onPress={sendTestNotification}
            activeOpacity={0.8}
          >
            <Bell size={20} color="#FFF" />
            <Text style={styles.testButtonText}>Send Test Notification</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {history.length > 0 && (
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={sendTestNotification}
          activeOpacity={0.8}
        >
          <Bell size={24} color="#FFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    marginTop: 20,
  },
  testButtonText: {
    color: '#FFF',
    fontWeight: '600',
    marginLeft: 8,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
