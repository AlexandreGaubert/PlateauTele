import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text } from 'react-native';
// import { AppLoading, Asset, Font, Icon } from 'expo';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from './screens/HomeScreen'
import MovieRoomCreation from './screens/MovieRoomCreation'
import RecipeRoomCreation from './screens/RecipeRoomCreation'
import RoomLoading from './screens/RoomLoading'
import Room from './screens/Room'
import JoinRoom from './screens/JoinRoom'
import RoomLoadingView from './components/RoomLoadingView'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    MovieRoomCreation: MovieRoomCreation,
    RecipeRoomCreation: RecipeRoomCreation,
    RoomLoading: RoomLoading,
    RoomLoadingView: RoomLoadingView,
    Room: Room,
    JoinRoom: JoinRoom,
  },
  {
    initialRouteName: 'Home',
  }
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar hidden />}
          <AppNavigator />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
