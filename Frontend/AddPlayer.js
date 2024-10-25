import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { serverAddress } from './Config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const AddPlayer = ({ route }) => {
  const { game } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(''); // Consider adding a DatePicker for better user experience
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [games, setGames] = useState(game);
  const [place, setPlace] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const navigation = useNavigation();

  const handleAddPlayer = () => {
    // Validate fields
    if (!email || !password || !firstName || !lastName || !dateOfBirth || !gender || !height || !weight || !games || !place || !contactNumber) {
      Alert.alert('All fields are required');
      return;
    }

    // Email validation (simple regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address');
      return;
    }

    // Format date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS
    const dateTime = `${formattedDate} ${formattedTime}`;

    const playerData = {
      email,
      password,
      name: `${firstName} ${lastName}`,
      dateOfBirth,
      gender,
      height,
      weight,
      games,
      place,
      contactNumber,
      dateTime,
    };

    // Send POST request to the server
    fetch(`${serverAddress}/api/addPlayer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        Alert.alert('Player added successfully');
        navigation.navigate('Dashboard');
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Alert.alert('An error occurred while adding the player. Please try again.');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{game} Game</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        keyboardType="email-address" // Improve keyboard experience
        autoCapitalize="none" // Prevent capitalization of email
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        value={firstName}
        placeholder="First Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        value={lastName}
        placeholder="Last Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setContactNumber}
        value={contactNumber}
        placeholder="Contact Number"
        keyboardType="phone-pad"
      />
      <Picker
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>
      <TextInput
        style={styles.input}
        onChangeText={setPlace}
        value={place}
        placeholder="Place (e.g., City, Country)"
      />
      <TextInput
        style={styles.input}
        onChangeText={setHeight}
        value={height}
        placeholder="Height (e.g., 180 cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        placeholder="Weight (e.g., 75 kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={setDateOfBirth} // Add date input field for DOB
        value={dateOfBirth}
        placeholder="Date of Birth (YYYY-MM-DD)"
      />
      <Button title="Add Player" onPress={handleAddPlayer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AddPlayer;
