import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Clubadmin from './Clubadmin';
import Home from './Home';
import AddPlayer from './AddPlayer';
import clubaddPlayer from './ClubAddPlayer';
import ViewerLogin from './ViewerLogin';
import AdminLogin from './AdminLogin';
import RegisterPage from './RegisterPage';
import Profile from './Profile';
import Player from './Player';
import EditPlayer from './EditPlayer';
import PlayerList from './Playerlist';

// Create Stack and Tab Navigators
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// Home Stack with Nested Screens
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={Home} 
        options={{ headerShown: true, title: 'Home' }} 
      />
      <HomeStack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ title: 'Profile' }} 
      />
      <HomeStack.Screen 
        name="AddPlayer" 
        component={AddPlayer} 
        options={{ title: 'Add Player' }} 
      />
       <HomeStack.Screen 
        name="ClubAddPlayer" 
        component={clubaddPlayer} 
        options={{ title: 'Add Player' }} 
      />
      <HomeStack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ title: 'Dashboard' }} 
      />
      <HomeStack.Screen 
        name="Clubadmin" 
        component={Clubadmin} 
        options={{ title: 'Club Admin' }} 
      />
      <HomeStack.Screen 
        name="Player" 
        component={Player} 
        options={{ title: 'Player' }} 
      />
      <HomeStack.Screen 
        name="EditPlayer" 
        component={EditPlayer} 
        options={{ title: 'Edit Player' }} 
      />
      <HomeStack.Screen 
        name="PlayerList" 
        component={PlayerList} 
        options={{ title: 'Player List' }} 
      />
    </HomeStack.Navigator>
  );
}

// Main App Component
function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="HomeStack"
          component={HomeStackScreen}
          options={{ headerShown: false, tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="ViewerLogin"
          component={ViewerLogin}
          options={{ tabBarLabel: 'Viewer Login' }}
        />
        <Tab.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{ tabBarLabel: 'Admin Login' }}
        />
        <Tab.Screen
          name="Register"
          component={RegisterPage}
          options={{ tabBarLabel: 'Register' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
