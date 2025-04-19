import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ManualClean = () => {
  const [motorSpeed, setMotorSpeed] = useState('');
  const [motorRunning, setMotorRunning] = useState(false);
  const [uvOn, setUvOn] = useState(false);
  const [motorTime, setMotorTime] = useState(0);
  const [uvTime, setUvTime] = useState(0);
  const [emergencyStop, setEmergencyStop] = useState(false);

  useEffect(() => {
    let motorTimer: NodeJS.Timeout;
    if (motorRunning && !emergencyStop) {
      motorTimer = setInterval(() => {
        setMotorTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(motorTimer);
  }, [motorRunning, emergencyStop]);

  useEffect(() => {
    let uvTimer: NodeJS.Timeout;
    if (uvOn && !emergencyStop) {
      uvTimer = setInterval(() => {
        setUvTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(uvTimer);
  }, [uvOn, emergencyStop]);

  const handleEmergencyStop = () => {
    setMotorRunning(false);
    setUvOn(false);
    setEmergencyStop(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Motor Speed (RPM):</Text>
      <TextInput
        style={styles.input}
        value={motorSpeed}
        onChangeText={setMotorSpeed}
        keyboardType="numeric"
        placeholder="Enter RPM"
      />
      <View style={styles.buttonGroup}>
        <Button title="Start Motor" onPress={() => { setMotorRunning(true); setEmergencyStop(false); }} />
        <Button title="Stop Motor" onPress={() => setMotorRunning(false)} />
      </View>
      <Text style={styles.timer}>Motor Running Time: {formatTime(motorTime)}</Text>

      <Text style={styles.label}>UV Lamp:</Text>
      <View style={styles.buttonGroup}>
        <Button title="Lamp ON" onPress={() => { setUvOn(true); setEmergencyStop(false); }} />
        <Button title="Lamp OFF" onPress={() => setUvOn(false)} />
      </View>
      <Text style={styles.timer}>UV ON Time: {formatTime(uvTime)}</Text>

      <View style={styles.emergencyButton}>
        <Button title="🚨 Emergency Stop" color="red" onPress={handleEmergencyStop} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  timer: {
    fontSize: 16,
    marginTop: 10,
    fontStyle: 'italic',
  },
  emergencyButton: {
    marginTop: 30,
  },
});

export default ManualClean;
