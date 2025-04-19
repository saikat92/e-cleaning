import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

// 🥦 Veggie cleaning times (seconds)
const veggieData: { [key: string]: number } = {
  Tomato: 30,
  Potato: 90,
  Spinach: 75,
  Carrot: 80,
  Cabbage: 70,
};

const conveyorLength = 1.82; // meters

const AutoCleanScreen = () => {
  const [selectedVeggie, setSelectedVeggie] = useState("Tomato");
  const [timeRequired, setTimeRequired] = useState(60); // seconds
  const [motorRPM, setMotorRPM] = useState(0);
  const [running, setRunning] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const calculateRPM = (timeSec: number) => {
    // Calculate RPM from time & belt length → RPM = (60 * beltLength) / (timeRequired)
    const mps = conveyorLength / timeSec;
    const rpm = (mps * 60) / (2 * Math.PI * 0.05); // assuming pulley radius ≈ 5 cm
    return Math.round(rpm);
  };

  useEffect(() => {
    const time = veggieData[selectedVeggie];
    setTimeRequired(time);
    setCountdown(time);
    setMotorRPM(calculateRPM(time));
  }, [selectedVeggie]);

  const startCleaning = () => {
    setRunning(true);
    const id = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          setRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const stopCleaning = () => {
    if (intervalId) clearInterval(intervalId);
    setRunning(false);
    setCountdown(timeRequired);
  };

  const formatTime = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Auto-Clean Operation</Text>

      {/* 1. Select vegetable */}
      <Text style={styles.label}>Select Vegetable</Text>
      <Picker
        selectedValue={selectedVeggie}
        onValueChange={(itemValue) => setSelectedVeggie(itemValue)}
        style={styles.picker}
      >
        {Object.keys(veggieData).map((veg) => (
          <Picker.Item label={veg} value={veg} key={veg} />
        ))}
      </Picker>

      {/* 2. Time Required */}
      <Text style={styles.label}>Predefined Time (MM:SS)</Text>
      <TextInput
        style={styles.input}
        editable={false}
        value={`${Math.floor(timeRequired / 60)
          .toString()
          .padStart(2, "0")}:${(timeRequired % 60).toString().padStart(2, "0")}`}
      />

      {/* 3. Calculated RPM */}
      <Text style={styles.label}>Motor Speed (RPM)</Text>
      <TextInput style={styles.input} editable={false} value={motorRPM.toString()} />

      {/* 4. Start Button */}
      <TouchableOpacity
        style={[styles.button, running && { backgroundColor: "gray" }]}
        onPress={startCleaning}
        disabled={running}
      >
        <Text style={styles.buttonText}>{running ? "Running..." : "START CLEANING"}</Text>
      </TouchableOpacity>

      {/* 5. Status Section */}
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>
          Device Status: {running ? "Running ✅" : "Halt ⏹️"}
        </Text>
        <Text style={styles.statusText}>Motor Speed: {running ? motorRPM + " RPM (ON)" : "OFF"}</Text>
        <Text style={styles.statusText}>UV Lamp: {running ? "ON 🔆" : "OFF"}</Text>
        <Text style={styles.statusText}>Time Remaining: {formatTime(countdown)}</Text>
      </View>

      {/* 6. Emergency Stop Button */}
      {running && (
        <TouchableOpacity style={styles.emergencyButton} onPress={stopCleaning}>
          <Text style={styles.emergencyText}>EMERGENCY STOP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AutoCleanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 4,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statusBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 6,
  },
  emergencyButton: {
    backgroundColor: "#dc2626",
    padding: 14,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  emergencyText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
