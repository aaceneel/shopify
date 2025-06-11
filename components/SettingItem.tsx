import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';

interface SettingItemProps {
  label: string;
  value?: string | number | ReactNode;
  onPress?: () => void;
  icon?: ReactNode;
  showChevron?: boolean;
}

export default function SettingItem({
  label,
  value,
  onPress,
  icon,
  showChevron = true,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.valueContainer}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text style={styles.value}>{value}</Text>
        ) : (
          value
        )}
        {showChevron && onPress && <ChevronRight size={20} color={Colors.inactive} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  iconContainer: {
    marginRight: 12,
  },
  labelContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    color: Colors.inactive,
    marginRight: 8,
  },
});
