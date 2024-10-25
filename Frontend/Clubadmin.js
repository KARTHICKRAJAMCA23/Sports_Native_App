import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

function Clubadmin({ navigation }) {
  // State to manage the selected team
  const [selectedTeam, setSelectedTeam] = useState('volleyball'); // Default team

  // Sample teams
  const teams = [
    { name: 'Volleyball', image: require('./image/bg21.jpg') },
    { name: 'Tennis', image: require('./image/bg22.jpg') },
    { name: 'Kho Kho', image: require('./image/bg23.jpg') },
    { name: 'Long Jump', image: require('./image/bg24.jpg') },
    { name: 'Cricket', image: require('./image/bg28.jpeg') },
    { name: 'Kabaddi', image: require('./image/bg27.png') },
  ];

  // Filter teams based on selection (optional logic can be added here)
  const filteredTeams = teams.filter(team => team.name.toLowerCase() === selectedTeam.toLowerCase());

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sports Events Management App</Text>
        </View>

        <View style={styles.rowContainer}>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate('Player')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>All Players</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Playerlist')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Player List</Text>
          </TouchableOpacity>
        </View>

        {/* Team Selection */}
        <View style={styles.rowContainer}>
          {teams.map((team, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTeam(team.name)}
              style={[styles.teamButton, selectedTeam === team.name && styles.selectedTeam]}
            >
              <Text style={styles.buttonText}>{team.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Displaying the selected team section */}
        {filteredTeams.map((team, index) => (
          <View key={index} style={styles.imageContainer}>
            <Text style={styles.gameTitleTop}>{team.name.toUpperCase()}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ClubAddPlayer', { game: team.name.toLowerCase() })}
              style={styles.gameButton}
            >
              <Image source={team.image} style={styles.image} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    paddingHorizontal: 30,
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue',
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'darkblue',
    justifyContent: 'space-around', // Space the buttons evenly
  },
  footerText: {
    fontSize: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    marginBottom: 40,
    height: 280,
    position: 'relative', // Allows for absolute positioning of the title
  },
  gameTitleTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'blue',
    padding: 10,
    textAlign: 'center',
    zIndex: 1,
  },
  gameButton: {
    flex: 1,
    marginTop: 1, // Push the image down to avoid overlap with the title
  },
  teamButton: {
    padding: 10,
    backgroundColor: 'darkblue',
    borderRadius: 5,
  },
  selectedTeam: {
    backgroundColor: 'lightblue', // Highlight the selected team
  },
});

export default Clubadmin;
