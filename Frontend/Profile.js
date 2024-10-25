import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { serverAddress } from './Config';

const Profile = () => {
  const [player, setPlayer] = useState({});
  const route = useRoute();
  const { id } = route.params;  // Get the player ID from navigation params

  useEffect(() => {
    // Fetch player details using the ID
    axios
      .get(`${serverAddress}/api/player/${id}`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setPlayer(res.data.Result);
        } else {
          Alert.alert('Error', 'Failed to fetch player details.');
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Error', 'An error occurred while fetching player details.');
      });
  }, [id]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Player Profile</Text>
      <Text style={styles.info}>Name: {player.name}</Text>
      <Text style={styles.info}>Gender: {player.gender}</Text>
      <Text style={styles.info}>DOB: {player.dateOfBirth}</Text>
      <Text style={styles.info}>Height: {player.height}</Text>
      <Text style={styles.info}>Weight: {player.weight}</Text>
      <Text style={styles.info}>Game: {player.games}</Text>
      <Text style={styles.info}>Place: {player.place}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Profile;
