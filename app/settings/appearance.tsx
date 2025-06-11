import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSettingsStore } from '@/store/settingsStore';
import Colors from '@/constants/colors';
import NotificationPreview from '@/components/NotificationPreview';

export default function AppearanceScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useSettingsStore();
  
  const [storeName, setStoreName] = useState(settings.storeName);
  const [notificationTitle, setNotificationTitle] = useState(settings.notificationTitle);
  const [notificationBody, setNotificationBody] = useState(settings.notificationBody);
  const [notificationColor, setNotificationColor] = useState(settings.notificationColor);
  
  // Color options
  const colorOptions = [
    { value: '#F5F5F5', label: 'Light Gray' },
    { value: '#E8F5E9', label: 'Light Green' },
    { value: '#E3F2FD', label: 'Light Blue' },
    { value: '#FFF3E0', label: 'Light Orange' },
    { value: '#F3E5F5', label: 'Light Purple' },
    { value: '#FFFFFF', label: 'White' },
  ];
  
  // Save settings and go back
  const saveSettings = () => {
    updateSettings({
      storeName,
      notificationTitle,
      notificationBody,
      notificationColor,
    });
    router.back();
  };
  
  // Preview settings
  const previewSettings = {
    ...settings,
    storeName,
    notificationTitle,
    notificationBody,
    notificationColor,
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <NotificationPreview settings={previewSettings} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Store Information</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Store Name</Text>
          <TextInput
            style={styles.input}
            value={storeName}
            onChangeText={setStoreName}
            placeholder="Your Store Name"
            placeholderTextColor={Colors.inactive}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Content</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notification Title</Text>
          <TextInput
            style={styles.input}
            value={notificationTitle}
            onChangeText={setNotificationTitle}
            placeholder="New Order"
            placeholderTextColor={Colors.inactive}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Notification Body</Text>
          <Text style={styles.helperText}>
            Use [STORE_NAME], [ITEMS], and [AMOUNT] as placeholders
          </Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notificationBody}
            onChangeText={setNotificationBody}
            placeholder="[STORE_NAME] You have a new order for [ITEMS] items totaling $[AMOUNT] from Online Store."
            placeholderTextColor={Colors.inactive}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Color</Text>
        <View style={styles.colorOptions}>
          {colorOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.colorOption,
                { backgroundColor: option.value },
                notificationColor === option.value && styles.selectedColorOption,
              ]}
              onPress={() => setNotificationColor(option.value)}
            />
          ))}
        </View>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: Colors.text,
  },
  textArea: {
    minHeight: 80,
    paddingTop: 12,
  },
  helperText: {
    fontSize: 12,
    color: Colors.inactive,
    marginBottom: 4,
  },
  colorOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -8,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedColorOption: {
    borderWidth: 3,
    borderColor: Colors.primary,
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
