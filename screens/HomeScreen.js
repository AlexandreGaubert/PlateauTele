import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Animated,
  Easing,
  StatusBar
} from 'react-native';
import axios from 'axios'

import LineSeparator from '../components/LineSeparator'
import ExpandablePanel from '../components/ExpandablePanel'
import MyText from '../components/MyText'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    movies: [],
    topPosition: new Animated.Value(-100)

  }

  componentDidMount() {
    Animated.spring(
      this.state.topPosition,
      {
        toValue: 0,
        speed: 4,
        bounciness: 30
      }
    ).start()
  }

  render() {
      const roomType = "movie"
      const room = {
          _id: "lmzennlkjnl",
      }
      const cards = [
        {
          title: "Insaisissables 2",
          genre: "Action et aventure",
          img: "https://lh3.googleusercontent.com/E22eIrYJD0_zX90-OAjxzl5_p6Th_CnhN4JFYUrkUL-SG1fVgUMaKMw3jpORQaA2f3m7",
          actors: "Jesse Eisenberg, Mark Ruffalo, Morgan Freeman, Daniel Radcliffe, Woody Harrelson, Dave Franco, Lizzy Caplan".split(', '),
          producers: "Bobby Cohen".split(', '),
          director: "Jon M. Chu",
          writers: "Ed Solomon".split(', '),
          overview: "Un an après avoir déjoué le FBI et conquis le public avec leurs tours de magie à la Robin des Bois, les 4 Cavaliers refont surface avec une performance grâce à laquelle ils espèrent exposer au grand jour les pratiques malhonnêtes d'un magnat de la technologie",
        }
      ]



      const { navigation } = this.props;
      const state = this.state;
      return (
          <View style={styles.container}>
            <StatusBar hidden/>
            <LineSeparator text="CRÉER UNE SALLE"/>

            <TouchableOpacity style={[styles.button, null]} onPress={() => navigation.navigate('Room', {room, roomType, cards})}>
              <MyText style={styles.buttonText}>TROUVER UN FILM</MyText>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, null]} onPress={() => navigation.navigate('RecipeRoomCreation')}>
              <MyText style={styles.buttonText}>TROUVER UN PLAT</MyText>
            </TouchableOpacity>

            <LineSeparator text="OU"/>

            <TouchableOpacity style={[styles.button, null]} onPress={() => navigation.navigate('JoinRoom')}>
              <MyText style={styles.buttonText}>REJOINDRE UNE SALLE</MyText>
            </TouchableOpacity>

          </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 20,
    backgroundColor: "#4ECDC4"

  },
  button: {
    alignSelf: "stretch",
    height: "10%",
    backgroundColor: "#1A535C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {  width: 0,  height: 10,  },
    shadowRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.48,
    elevation: 5
  },
  buttonText: {
    fontSize: 25,
    color: "#F7FFF7"
  },
});
