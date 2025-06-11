export interface NotificationSettings {
  frequency: 'realtime' | '5min' | '15min' | '30min' | 'hourly' | 'daily';
  maxNotifications: number;
  minOrderAmount: number;
  enabled: boolean;
  storeName: string;
  notificationTitle: string;
  notificationBody: string;
  notificationColor: string;
  customLogo: string | null;
}

export interface MockOrder {
  id: string;
  amount: number;
  items: number;
  timestamp: number;
  storeName: string;
}

export interface NotificationHistory {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  order: MockOrder;
}
