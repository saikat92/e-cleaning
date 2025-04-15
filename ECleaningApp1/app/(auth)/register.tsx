import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { useState } from 'react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registered successfully!');
      router.replace('/(auth)/login');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Yourself</Text>
      <TextInput style={styles.input} placeholder="Enter Full Name" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Enter Email" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter Password" secureTextEntry onChangeText={setPassword} />
      <Button title="Register" onPress={handleRegister} />
      <Link href="/(auth)/login" style={styles.link}>Already have an account?</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 20, borderRadius: 5 },
  link: { marginTop: 15, textAlign: 'center', color: 'blue' },
});