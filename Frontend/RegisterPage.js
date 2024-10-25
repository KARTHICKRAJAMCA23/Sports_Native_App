import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { serverAddress } from './Config';

function Registerpage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();

  // Helper function to validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function to validate password strength
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async () => {
    setError(''); // Reset error message
    setLoading(true); // Start loading

    // Validate email
    if (!validateEmail(values.email)) {
      setError('Please enter a valid email address.');
      setLoading(false); // Stop loading
      return;
    }

    // Validate password strength
    if (!validatePassword(values.password)) {
      setError('Password must be at least 8 characters long, contain a number, and a special character.');
      setLoading(false); // Stop loading
      return;
    }

    // Ensure passwords match
    if (values.password !== values.confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false); // Stop loading
      return;
    }

    try {
      const response = await fetch(`${serverAddress}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        const responseText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Response: ${responseText}`);
      }
      const data = await response.json();

      if (data.message === 'User registered successfully') {
        // Registration successful, navigate to the login screen
        navigation.navigate('AdminLogin');
      } else if (data.message === 'Email is already in use') {
        setError('Email is already in use. Please use a different email.');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Network request error:', error);
      setError('An unexpected error occurred. Please try again later.');
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
            <Text style={styles.header}>Register</Text>
            <TextInput
              placeholder="Enter Email"
              onChangeText={(text) => setValues({ ...values, email: text })}
              style={styles.input}
              autoCompleteType="email"
              keyboardType="email-address"
              accessibilityLabel="Email input"
              value={values.email}
            />
            <TextInput
              placeholder="Enter Password"
              onChangeText={(text) => setValues({ ...values, password: text })}
              style={styles.input}
              secureTextEntry={true}
              accessibilityLabel="Password input"
              value={values.password}
            />
            <TextInput
              placeholder="Confirm Password"
              onChangeText={(text) => setValues({ ...values, confirmPassword: text })}
              style={styles.input}
              secureTextEntry={true}
              accessibilityLabel="Confirm Password input"
              value={values.confirmPassword}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

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

export default Registerpage;
