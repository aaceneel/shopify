import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { NotificationSettings, MockOrder, NotificationHistory } from '@/types';
import { useNotificationStore } from '@/store/notificationStore';

// Configure notification handler
export const configureNotifications = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
};

// Request permissions
export const requestNotificationPermissions = async () => {
  if (Platform.OS === 'web') {
    return { status: false };
  }
  
  const { status } = await Notifications.requestPermissionsAsync();
  return { status: status === 'granted' };
};

// Format notification body with order details
export const formatNotificationBody = (template: string, order: MockOrder): string => {
  return template
    .replace('[STORE_NAME]', order.storeName)
    .replace('[ITEMS]', order.items.toString())
    .replace('[AMOUNT]', order.amount.toFixed(2));
};

// Schedule a notification
export const scheduleNotification = async (
  settings: NotificationSettings,
  order: MockOrder
): Promise<string | null> => {
  try {
    const title = settings.notificationTitle;
    const body = formatNotificationBody(settings.notificationBody, order);
    
    // Create notification content
    const notificationContent: Notifications.NotificationContentInput = {
      title,
      body,
      data: { order },
    };
    
    // Schedule the notification
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: notificationContent,
      trigger: null, // Send immediately
    });
    
    // Add to history
    const notification: NotificationHistory = {
      id: notificationId,
      title,
      body,
      timestamp: Date.now(),
      read: false,
      order,
    };
    
    useNotificationStore.getState().addNotification(notification);
    useNotificationStore.getState().updateLastNotificationTime(Date.now());
    
    return notificationId;
  } catch (error) {
    console.error('Failed to schedule notification:', error);
    return null;
  }
};

// Check if we should send a notification based on settings
export const shouldSendNotification = (
  settings: NotificationSettings,
  lastNotificationTime: number
): boolean => {
  if (!settings.enabled) return false;
  
  const now = Date.now();
  const timeSinceLastNotification = now - lastNotificationTime;
  
  // Check frequency
  switch (settings.frequency) {
    case 'realtime':
      return true;
    case '5min':
      return timeSinceLastNotification >= 5 * 60 * 1000;
    case '15min':
      return timeSinceLastNotification >= 15 * 60 * 1000;
    case '30min':
      return timeSinceLastNotification >= 30 * 60 * 1000;
    case 'hourly':
      return timeSinceLastNotification >= 60 * 60 * 1000;
    case 'daily':
      return timeSinceLastNotification >= 24 * 60 * 60 * 1000;
    default:
      return true;
  }
};
