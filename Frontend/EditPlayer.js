import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { serverAddress } from './Config';

const EditPlayer = () => {
  const [data, setData] = useState({
    name: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    height: '',
    weight: '',
    games: '',
    place: '',
    email: '', // Include email in state for display purposes
  });

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  useEffect(() => {
    // Fetch player data from the server
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverAddress}/api/player/${id}`);
        const playerData = await response.json();
        setData(playerData);
      } catch (error) {
        console.error('Error fetching player data:', error);
        Alert.alert('Error', 'Failed to fetch player data. Please try again.');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    // Basic validation
    if (!data.name || !data.password || !data.gender || !data.dateOfBirth || !data.height || !data.weight || !data.games || !data.place) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const res = await axios.put(`${serverAddress}/api/player/${id}`, data);
      if (res.data.Status === 'Success') {
        Alert.alert('Success', 'Player data updated successfully.');
        navigation.navigate('Player');
      } else {
        Alert.alert('Error', 'Failed to update player data. Please try again.');
      }
    } catch (err) {
      console.error('Error updating player data:', err);
      Alert.alert('Error', 'Failed to update player data. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Player</Text>
      <Text style={styles.emailLabel}>Email:</Text>
      <Text style={styles.emailText}>{data.email}</Text>
      
      {/* Input fields */}
      <TextInput
        placeholder="Name"
        style={styles.input}
        onChangeText={(text) => setData({ ...data, name: text })}
        value={data.name}
      />
      <TextInput
        placeholder="Password" 
        style={styles.input}
        onChangeText={(text) => setData({ ...data, password: text })}
        value={data.password}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="Gender"
        style={styles.input}
        onChangeText={(text) => setData({ ...data, gender: text })}
        value={data.gender}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, dateOfBirth: text })}
        value={data.dateOfBirth}
        keyboardType='numeric'
        placeholder="DD-MM-YYYY"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, height: text })}
        value={data.height}
        placeholder="Height (cm)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, weight: text })}
        value={data.weight}
        placeholder="Weight (kg)"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, games: text })}
        value={data.games}
        placeholder="Games"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, place: text })}
        value={data.place}
        placeholder="Place"
      />
      <Button title="Update" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emailLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 15,
    color: 'gray',
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
});

export default EditPlayer;
