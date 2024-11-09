import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Index: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Both fields are required');
      return;
    }

    try {
      const response = await fetch('http://192.168.54.157:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      console.log("Access Token:", data?.access_token);  // Debugging purposes

      // Assuming data contains access_token
      const { access_token } = data;

      if (!access_token) {
        throw new Error('Access token is missing');
      }

      // Save token securely
      await AsyncStorage.setItem('token', access_token);

      // Navigate to the main map screen after login
      router.replace('/MapScreen');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default Index;
