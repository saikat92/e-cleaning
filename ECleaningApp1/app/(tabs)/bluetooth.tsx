// app/(tabs)/bluetooth.tsx
// import { View, Text } from 'react-native';
// export default function Bluetooth() {
//   return <View><Text>Bluetooth Screen</Text></View>;
// }

import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';

export default function Bluetooth() {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchDevices = async () => {
    try {
      const available = await RNBluetoothClassic.getBondedDevices();
      setDevices(available);
    } catch (e) {
      console.error('Error listing devices', e);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    try {
      setLoading(true);
      const connected = await device.connect();
      if (connected) setConnectedDevice(device);
    } catch (e) {
      console.error('Connection failed', e);
    } finally {
      setLoading(false);
    }
  };

  const disconnectDevice = async () => {
    if (connectedDevice) {
      await connectedDevice.disconnect();
      setConnectedDevice(null);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Devices</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.address}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.deviceButton}
            onPress={() => connectToDevice(item)}
            disabled={!!connectedDevice || loading}
          >
            <Text style={styles.deviceText}>{item.name || item.address}</Text>
          </TouchableOpacity>
        )}
      />
      {connectedDevice ? (
        <View style={styles.statusBox}>
          <Text style={styles.connectedText}>Connected to {connectedDevice.name}</Text>
          <Button title="Disconnect" onPress={disconnectDevice} />
        </View>
      ) : (
        <Text style={styles.note}>Tap on a device to connect</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  deviceButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  deviceText: { fontSize: 16 },
  statusBox: { marginTop: 20, alignItems: 'center' },
  connectedText: { fontSize: 18, marginBottom: 10, color: 'green' },
  note: { marginTop: 10, fontStyle: 'italic' },
});
