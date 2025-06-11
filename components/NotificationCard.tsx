import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NotificationHistory } from '@/types';
import Colors from '@/constants/colors';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { ShoppingBag } from 'lucide-react-native';

interface NotificationCardProps {
  notification: NotificationHistory;
  onPress: (notification: NotificationHistory) => void;
}

export default function NotificationCard({ notification, onPress }: NotificationCardProps) {
  const { title, body, timestamp, read, order } = notification;
  
  return (
    <TouchableOpacity
      style={[styles.container, read && styles.readContainer]}
      onPress={() => onPress(notification)}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <ShoppingBag size={24} color={Colors.primary} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.time}>{formatDistanceToNow(timestamp)}</Text>
        </View>
        <Text style={styles.body} numberOfLines={2}>
          {body}
        </Text>
        {!read && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  readContainer: {
    opacity: 0.8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.notification,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  time: {
    fontSize: 12,
    color: Colors.inactive,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
    opacity: 0.8,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
  },
});
