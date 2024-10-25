import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  StyleSheet,
  Alert,
} from 'react-native';
import { serverAddress } from './Config';
import axios from 'axios';

function Player({ navigation }) {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Function to fetch player data from the server
  const fetchPlayerData = () => {
    axios
      .get(`${serverAddress}/getPlayer`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          setData(res.data.Result);
        } else {
          Alert.alert('Error', 'Failed to fetch player data.');
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setRefreshing(false)); 
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  const handleDelete = (id) => {
    // Display a confirmation dialog before deleting
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this player?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            axios
              .delete(`${serverAddress}/api/player/${id}`)
              .then((res) => {
                if (res.data.Status === 'Success') {
                  Alert.alert('Success', 'Player deleted successfully');
                  fetchPlayerData();
                } else {
                  Alert.alert('Error', 'Failed to delete player data. Please try again.');
                }
              })
              .catch((err) => {
                console.error('Error deleting player data:', err);
                Alert.alert('Error', 'Failed to delete player data. Please try again.');
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  // Function to handle the pull-to-refresh action
  const onRefresh = () => {
    setRefreshing(true);
    fetchPlayerData(); 
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.heading}>Player List</Text>
      <View style={styles.playerList}>
        {data.map((player) => (
          <View key={player._id} style={styles.playerCard}>
            <Text style={styles.playerName}>Name: {player.name}</Text>
            <Text style={styles.playerEmail}>Email: {player.email}</Text>
            <Text style={styles.playerGame}>Game: {player.games}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('EditPlayer', { id: player._id });
                }}
                style={styles.editButton}
              >
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(player._id)}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile', { id: player._id })}
                style={styles.viewProfileButton}
              >
                <Text style={styles.buttonText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7', // Added background color for better contrast
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  playerList: {
    width: '100%',
  },
  playerCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    padding: 10,
    backgroundColor: '#fff', // Set background color for player cards
    borderRadius: 8,
    shadowColor: '#000', // Shadow effect for better depth
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow effect
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerEmail: {
    fontSize: 16,
    marginTop: 5,
    color: 'gray',
  },
  playerGame: {
    fontSize: 16,
    marginTop: 5,
    color: 'darkslategray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
  viewProfileButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    width: '30%',
  },
});

export default Player;
