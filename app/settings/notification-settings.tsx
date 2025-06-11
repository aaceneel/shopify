import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@/store/settingsStore';
import Slider from '@react-native-community/slider';
import Colors from '@/constants/colors';
import { NotificationSettings } from '@/types';

type FrequencyOption = NotificationSettings['frequency'];

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useSettingsStore();
  const [frequency, setFrequency] = useState<FrequencyOption>(settings.frequency);
  const [maxNotifications, setMaxNotifications] = useState(settings.maxNotifications);
  const [minOrderAmount, setMinOrderAmount] = useState(settings.minOrderAmount);

  // Save settings and go back
  const saveSettings = () => {
    updateSettings({
      frequency,
      maxNotifications,
      minOrderAmount,
    });
    router.back();
  };

  // Frequency options
  const frequencyOptions: { value: FrequencyOption; label: string }[] = [
    { value: 'realtime', label: 'Real-time' },
    { value: '5min', label: 'Every 5 minutes' },
    { value: '15min', label: 'Every 15 minutes' },
    { value: '30min', label: 'Every 30 minutes' },
    { value: 'hourly', label: 'Hourly' },
    { value: 'daily', label: 'Daily' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Frequency</Text>
        <View style={styles.optionsContainer}>
          {frequencyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                frequency === option.value && styles.selectedOption,
              ]}
              onPress={() => setFrequency(option.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  frequency === option.value && styles.selectedOptionText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Maximum Notifications</Text>
        <Text style={styles.sliderValue}>{maxNotifications} per day</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={50}
          step={1}
          value={maxNotifications}
          onValueChange={(value) => setMaxNotifications(value)}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.border}
          thumbTintColor={Colors.primary}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minimum Order Amount</Text>
        <Text style={styles.sliderValue}>${minOrderAmount.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={500}
          step={5}
          value={minOrderAmount}
          onValueChange={(value) => setMinOrderAmount(value)}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor={Colors.border}
          thumbTintColor={Colors.primary}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    backgroundColor: Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    color: Colors.text,
    fontSize: 14,
  },
  selectedOptionText: {
    color: '#FFF',
    fontWeight: '500',
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
