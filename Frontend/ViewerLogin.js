import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { serverAddress } from './Config';
import axios from 'axios';

const ViewerLogin = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password length
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    setError(''); // Reset error before each submission
    setLoading(true); // Start loading

    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // Stop loading
      return;
    }

    // Validate password length
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await axios.post(`${serverAddress}/api/login`, {
        email,
        password,
      });

      if (response.data.status === 'Success') {
        const id = response.data.playerId;
        // Navigate to the Dashboard screen with the player ID
        navigation.navigate('Dashboard', { id });

        // Optionally navigate to Clubadmin as a new screen
        // Remove this line if you want to navigate to just one screen
        navigation.navigate('Clubadmin', { id });
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginForm}>
        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : (
          <>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.header}>Login</Text>
            <TextInput
              placeholder="Enter Email"
              onChangeText={setEmail}
              value={email}
              style={styles.input}
              autoCompleteType="email"
              keyboardType="email-address"
              accessibilityLabel="Email input"
            />
            <TextInput
              placeholder="Enter Password"
              onChangeText={setPassword}
              value={password}
              style={styles.input}
              secureTextEntry={true}
              accessibilityLabel="Password input"
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginForm: {
    padding: 16,
    borderRadius: 8,
    width: '75%',
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ViewerLogin;
