import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView, Alert, View } from 'react-native';
import { serverAddress } from './Config';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const ClubAddPlayer = ({ route }) => {
  const { game } = route.params;
  const [players, setPlayers] = useState([{
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    weight: '',
    place: '',
    age: '',
    clubName: '',
    mentorName: '',
    contactNumber: '',
    teamName: '',
  }]);

  const navigation = useNavigation();

  // Function to handle adding players to the server
  const handleAddPlayer = () => {
    const isValid = players.every(player => 
      Object.values(player).every(field => field.trim() !== '') // Check if all fields are filled
    );

    if (!isValid) {
      Alert.alert('All fields are required for each player');
      return;
    }

    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
    const formattedTime = `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;
    const dateTime = `${formattedDate} ${formattedTime}`;

    // Prepare players data for sending
    const playerData = players.map(player => ({
      ...player,
      dateTime,
    }));

    // Send the data to the server
    fetch(`${serverAddress}/api/addPlayers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(result => {
        console.log(result);
        Alert.alert('Players added successfully');
        navigation.navigate('Dashboard');
        navigation.navigate('Clubadmin');
      })
      .catch(error => {
        console.error('Fetch error:', error);
        Alert.alert('Failed to add players. Please try again.');
      });
  };

  // Function to add a new player input
  const addNewPlayer = () => {
    setPlayers(prevPlayers => [...prevPlayers, {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      gender: '',
      height: '',
      weight: '',
      place: '',
      age: '',
      clubName: '',
      mentorName: '',
      contactNumber: '',
      teamName: '',
    }]);
  };

  // Function to remove the last player input
  const removeLastPlayer = () => {
    if (players.length > 1) {
      setPlayers(prevPlayers => prevPlayers.slice(0, -1));
    } else {
      Alert.alert('At least one player is required');
    }
  };

  // Function to handle text change for player fields
  const handleInputChange = (index, field, value) => {
    const updatedPlayers = [...players];
    updatedPlayers[index][field] = value;
    setPlayers(updatedPlayers);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{game} Game</Text>
      {players.map((player, index) => (
        <View key={index} style={styles.playerContainer}>
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'firstName', text)}
            value={player.firstName}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'lastName', text)}
            value={player.lastName}
            placeholder="Last Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'dateOfBirth', text)}
            value={player.dateOfBirth}
            keyboardType="numeric"
            placeholder="DD-MM-YYYY"
          />
          <Picker
            selectedValue={player.gender}
            onValueChange={itemValue => handleInputChange(index, 'gender', itemValue)}
            style={styles.input}
          >
            <Picker.Item label="Select Gender" value="" />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'height', text)}
            value={player.height}
            placeholder="Height (e.g., 180 cm)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'weight', text)}
            value={player.weight}
            placeholder="Weight (e.g., 75 kg)"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'place', text)}
            value={player.place}
            placeholder="Place (e.g., City, Country)"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'age', text)}
            value={player.age}
            placeholder="Age"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'clubName', text)}
            value={player.clubName}
            placeholder="Club Name"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'contactNumber', text)}
            value={player.contactNumber}
            placeholder="Contact Number"
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            onChangeText={text => handleInputChange(index, 'teamName', text)}
            value={player.teamName}
            placeholder="Team Name"
          />
        </View>
      ))}
      <View style={styles.buttonContainer}>
        <Button title="Add More Players" onPress={addNewPlayer} />
        <Button title="Remove Last Player" onPress={removeLastPlayer} color="red" />
      </View>
      <Button title="Add Players" onPress={handleAddPlayer} />
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
  playerContainer: {
    marginBottom: 20,
    padding: 10,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default ClubAddPlayer;
