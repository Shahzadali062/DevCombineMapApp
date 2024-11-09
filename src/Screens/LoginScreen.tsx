import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginProps {
  navigation: any; // You can refine this type for stricter type-checking.
}

const LoginScreen: React.FC<LoginProps> = ({ navigation }) => {
  // State for form fields
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Function to handle login
  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Both fields are required');
      return;
    }
  
    try {
      const response = await axios.post<{ token: string }>('http://localhost:8080/login', {
        username,
        password,
      });
  
      const { token } = response.data;
  
      // Save the token securely
      await AsyncStorage.setItem('token', token);
  
      // Navigate to the main app screen upon successful login
      navigation.navigate('Main');
  
    } catch (error) {
      console.error('Login failed', error);
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

export default LoginScreen;
