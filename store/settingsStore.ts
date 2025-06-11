import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NotificationSettings } from '@/types';
import Colors from '@/constants/colors';

interface SettingsState {
  settings: NotificationSettings;
  updateSettings: (settings: Partial<NotificationSettings>) => void;
  resetSettings: () => void;
}

const DEFAULT_SETTINGS: NotificationSettings = {
  frequency: '15min',
  maxNotifications: 10,
  minOrderAmount: 0,
  enabled: true,
  storeName: 'Your Store',
  notificationTitle: 'New Order',
  notificationBody: '[STORE_NAME] You have a new order for [ITEMS] items totaling $[AMOUNT] from Online Store.',
  notificationColor: Colors.primary,
  customLogo: null,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'shopify-notification-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
