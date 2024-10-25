import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';

function Dashboard({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Sports Events Management App</Text>
        </View>

        <View style={styles.rowContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Player')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>All Players</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Playerlist')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Player List</Text>
          </TouchableOpacity>
        </View>

        {/* Volleyball Section */}
        <View style={styles.imageContainer}>
          <Text style={styles.gameTitleTop}>CLUB REGISTATION</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('AddPlayer', { game: 'clubregistation' })}
            style={styles.gameButton}
          >
            <Image source={require('./image/9003013.jpg')} style={styles.image} />
          </TouchableOpacity>
        </View>
        
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
  },
  footerText: {
    fontSize: 20,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: 'black',
    margin: 70,
    marginBottom: 40,
    height: 280,
    position: 'relative', // Allows for absolute positioning of the title
  },
  gameTitleTop: {
    position: 'absolute',
    top: -50,
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
});

export default Dashboard;