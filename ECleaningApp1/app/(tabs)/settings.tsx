import React, { useEffect, useState } from 'react';
import { View, Text, Switch, StyleSheet, Modal, TextInput, Button, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';

const SettingsScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState({ name: '', email: '', image: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const docRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfileData(docSnap.data() as any);
        } else {
          // fallback if document doesn't exist
          setProfileData({
            name: currentUser.displayName || 'No Name',
            email: currentUser.email || '',
            image: currentUser.photoURL || '',
          });
        }
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  

  const handleSave = async () => {
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, {
        name: profileData.name,
        email: profileData.email,
        image: profileData.image,
      });
      setModalVisible(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out successfully');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.heading, darkMode && styles.darkText]}>Settings</Text>

      {/* Profile Details */}
      <View style={styles.card}>
        {profileData.image ? (
          <Image source={{ uri: profileData.image }} style={styles.profileImage} />
        ) : null}
        <Text style={styles.label}>Name: <Text style={styles.value}>{profileData.name}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{profileData.email}</Text></Text>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.card}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#fff" : "#333"}
        />
      </View>

      {/* Manual Handbook */}
      <View style={styles.card}>
        <Text style={styles.label}>Manual Handbook</Text>
        <Text style={styles.value}>
          Learn how to use the E-Cleaning Device safely and effectively. Contact support@example.com for more help.
        </Text>
      </View>

      <View className="my-4">
        <Button title="Logout" color="red" onPress={handleLogout} />
      </View>

      {/* Edit Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.heading}>Edit Profile</Text>
            <TextInput
              style={styles.input}
              value={profileData.name}
              onChangeText={(text) => setProfileData({ ...profileData, name: text })}
              placeholder="Enter Name"
            />
            <TextInput
              style={styles.input}
              value={profileData.email}
              onChangeText={(text) => setProfileData({ ...profileData, email: text })}
              placeholder="Enter Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={profileData.image}
              onChangeText={(text) => setProfileData({ ...profileData, image: text })}
              placeholder="Profile Image URL"
            />
            <Button title="Save" onPress={handleSave} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  value: {
    fontWeight: 'normal',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000099',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 16,
    fontSize: 16,
    paddingVertical: 6,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
