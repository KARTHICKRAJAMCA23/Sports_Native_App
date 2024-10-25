import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { serverAddress } from './Config';
import axios from 'axios';

function Playerlist({ navigation }) {
  const [data, setData] = useState([]);
  const gamesToDisplay = [
    'volleyball',
    'kabaddi',
    'cricket',
    'long jump',
    'kho kho',
    'tennis'
  ];

  // Fetch all player data
  const fetchPlayerData = () => {
    axios
      .get(`${serverAddress}/api/player`)
      .then((res) => {
        if (res.data.Status === 'Success') {
          const filteredData = res.data.Result.filter((player) =>
            gamesToDisplay.includes(player.games.toLowerCase())
          );
          setData(filteredData);
        } else {
          Alert.alert('Error', 'Failed to fetch player data.');
        }
      })
      .catch((err) => {
        console.error(err);
        Alert.alert('Error', 'An error occurred while fetching data.');
      });
  };

  useEffect(() => {
    fetchPlayerData();
  }, []);

  // Function to group players by their games and count players in each game
  const groupPlayersByGame = () => {
    const groupedData = {};

    data.forEach((player) => {
      const gameName = player.games;
      if (groupedData[gameName]) {
        groupedData[gameName].players.push(player);
      } else {
        groupedData[gameName] = { players: [player], playerCount: 0 };
      }
    });

    for (const gameName in groupedData) {
      groupedData[gameName].playerCount = groupedData[gameName].players.length;
    }

    return groupedData;
  };

  const groupedPlayers = groupPlayersByGame();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Player List</Text>
      {Object.keys(groupedPlayers).length === 0 ? (
        <Text style={styles.noPlayersText}>No players available for the selected games.</Text>
      ) : (
        Object.keys(groupedPlayers).map((gameName, index) => (
          <View key={index}>
            <Text style={styles.gameTitle}>
              {gameName} ({groupedPlayers[gameName].playerCount} players)
            </Text>
            {groupedPlayers[gameName].players.map((player, playerIndex) => (
              <View key={playerIndex} style={styles.playerCard}>
                <Text style={styles.playerName}>Reg Time: {player.dateTime}</Text>
                <Text style={styles.playerName}>Name: {player.name}</Text>
                <Text style={styles.playerGame}>Game: {player.games}</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile', { id: player._id })}  // Navigating to profile page
                  style={styles.viewProfileButton}
                >
                  <Text style={styles.buttonText}>Player Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  noPlayersText: {
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  playerCard: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  playerName: {
    fontSize: 18,
  },
  playerGame: {
    fontSize: 16,
    marginTop: 5,
    color: 'darkslategray',
  },
  viewProfileButton: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Playerlist;
