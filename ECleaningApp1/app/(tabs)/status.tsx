// app/status.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const getStatusIndicator = (status: string) => {
  let color = "gray";
  let icon = "circle";

  switch (status) {
    case "Ready":
      color = "green";
      icon = "check-circle";
      break;
    case "Busy":
      color = "orange";
      icon = "progress-clock";
      break;
    case "Disconnected":
      color = "red";
      icon = "close-circle";
      break;
  }

  return <MaterialCommunityIcons name={icon} size={24} color={color} />;
};

const StatusScreen = () => {
  // 🧪 MOCK DATA
  const bluetooth = {
    version: "v1.0.2",
    connected: true,
  };

  const motor = {
    distance: "120 cm",
    rpm: "1450",
    status: "Busy", // Ready, Busy, Disconnected
  };

  const uvLamp = {
    status: "Ready", // Ready, Busy, Disconnected
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Device Status</Text>

      {/* Bluetooth Status */}
      <View style={styles.card}>
        <Text style={styles.title}>Bluetooth</Text>
        <Text>Version: {bluetooth.version}</Text>
        <Text>Status: {bluetooth.connected ? "Connected ✅" : "Disconnected ❌"}</Text>
      </View>

      {/* Motor Status */}
      <View style={styles.card}>
        <Text style={styles.title}>Motor</Text>
        <Text>Distance: {motor.distance}</Text>
        <Text>RPM: {motor.rpm}</Text>
        <View style={styles.statusRow}>
          <Text>Status: {motor.status}</Text>
          {getStatusIndicator(motor.status)}
        </View>
      </View>

      {/* UV Lamp Status */}
      <View style={styles.card}>
        <Text style={styles.title}>UV Lamp</Text>
        <View style={styles.statusRow}>
          <Text>Status: {uvLamp.status}</Text>
          {getStatusIndicator(uvLamp.status)}
        </View>
      </View>
    </View>
  );
};

export default StatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 6,
  },
});
