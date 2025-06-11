import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { configureNotifications } from '@/utils/notifications';
import Colors from '@/constants/colors';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Configure notifications
    configureNotifications();
    
    // Hide splash screen
    SplashScreen.hideAsync();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.card,
          },
          headerTintColor: Colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="settings/notification-settings"
          options={{
            title: 'Notification Settings',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="settings/appearance"
          options={{
            title: 'Appearance',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="settings/logo"
          options={{
            title: 'Custom Logo',
            presentation: 'card',
          }}
        />
        <Stack.Screen
          name="notification/[id]"
          options={{
            title: 'Notification Details',
            presentation: 'card',
          }}
        />
      </Stack>
    </>
  );
}
