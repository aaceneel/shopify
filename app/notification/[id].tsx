import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNotificationStore } from '@/store/notificationStore';
import Colors from '@/constants/colors';
import { formatDistanceToNow } from '@/utils/dateUtils';
import { ShoppingBag, Calendar, DollarSign, Package } from 'lucide-react-native';

export default function NotificationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { history, markAsRead } = useNotificationStore();
  
  // Find notification by id
  const notification = history.find((item) => item.id === id);
  
  // Mark as read when viewed
  useEffect(() => {
    if (notification && !notification.read) {
      markAsRead(id);
    }
  }, [id, notification, markAsRead]);
  
  // Handle back if notification not found
  if (!notification) {
    router.back();
    return null;
  }
  
  const { title, body, timestamp, order } = notification;
  const date = new Date(timestamp);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <ShoppingBag size={24} color={Colors.primary} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.time}>{formatDistanceToNow(timestamp)}</Text>
          </View>
        </View>
        
        <Text style={styles.body}>{body}</Text>
        
        <View style={styles.divider} />
        
        <Text style={styles.sectionTitle}>Order Details</Text>
        
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Calendar size={20} color={Colors.primary} />
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Date & Time</Text>
            <Text style={styles.detailValue}>
              {date.toLocaleDateString()} at {date.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <DollarSign size={20} color={Colors.primary} />
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Order Amount</Text>
            <Text style={styles.detailValue}>${order.amount.toFixed(2)}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <View style={styles.detailIconContainer}>
            <Package size={20} color={Colors.primary} />
          </View>
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailLabel}>Items</Text>
            <Text style={styles.detailValue}>{order.items} item(s)</Text>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Back to Notifications</Text>
      </TouchableOpacity>
      
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          This is a demo notification. In a real app, you would be able to view the actual order details.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.notification,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    color: Colors.inactive,
  },
  body: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 16,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.notification,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailTextContainer: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.inactive,
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    padding: 16,
    alignItems: 'center',
  },
  disclaimerText: {
    fontSize: 14,
    color: Colors.inactive,
    textAlign: 'center',
  },
});
