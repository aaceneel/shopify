import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useSettingsStore } from '@/store/settingsStore';
import Colors from '@/constants/colors';
import { Image as ImageIcon, Upload, Trash2 } from 'lucide-react-native';
import NotificationPreview from '@/components/NotificationPreview';

export default function LogoScreen() {
  const router = useRouter();
  const { settings, updateSettings } = useSettingsStore();
  const [logo, setLogo] = useState(settings.customLogo);
  
  // Pick image from library
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setLogo(result.assets[0].uri);
    }
  };
  
  // Remove logo
  const removeLogo = () => {
    setLogo(null);
  };
  
  // Save logo and go back
  const saveLogo = () => {
    updateSettings({ customLogo: logo });
    router.back();
  };
  
  // Preview settings
  const previewSettings = {
    ...settings,
    customLogo: logo,
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <NotificationPreview settings={previewSettings} />
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Logo</Text>
        <View style={styles.logoContainer}>
          {logo ? (
            <Image source={{ uri: logo }} style={styles.logoPreview} />
          ) : (
            <View style={styles.logoPlaceholder}>
              <ImageIcon size={40} color={Colors.inactive} />
              <Text style={styles.placeholderText}>No Logo Selected</Text>
            </View>
          )}
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Upload size={20} color="#FFF" />
            <Text style={styles.buttonText}>Choose Image</Text>
          </TouchableOpacity>
          
          {logo && (
            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={removeLogo}>
              <Trash2 size={20} color="#FFF" />
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.helperText}>
          For best results, use a square image with a transparent background.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveLogo}>
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
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoPreview: {
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: Colors.inactive,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  dangerButton: {
    backgroundColor: Colors.error,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '500',
    marginLeft: 8,
  },
  helperText: {
    fontSize: 14,
    color: Colors.inactive,
    textAlign: 'center',
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
