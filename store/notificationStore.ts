import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationHistory, MockOrder } from '@/types';

interface NotificationState {
  history: NotificationHistory[];
  addNotification: (notification: NotificationHistory) => void;
  markAsRead: (id: string) => void;
  clearHistory: () => void;
  lastNotificationTime: number;
  updateLastNotificationTime: (time: number) => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      history: [],
      lastNotificationTime: 0,
      addNotification: (notification) => 
        set((state) => ({ 
          history: [notification, ...state.history].slice(0, 50) // Keep last 50 notifications
        })),
      markAsRead: (id) => 
        set((state) => ({
          history: state.history.map(notification => 
            notification.id === id 
              ? { ...notification, read: true } 
              : notification
          )
        })),
      clearHistory: () => set({ history: [] }),
      updateLastNotificationTime: (time) => set({ lastNotificationTime: time }),
    }),
    {
      name: 'shopify-notification-history',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
