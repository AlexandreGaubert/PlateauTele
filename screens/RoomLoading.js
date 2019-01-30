import React from 'react'
import axios from 'axios'
import SocketIOClient from 'socket.io-client'

import RoomLoadingView from '../components/RoomLoadingView'

import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';

import { IP } from '../config.js'

export default class RoomLoading extends React.Component {
    state = {
        ready: false,
        roomType: this.props.navigation.getParam('roomType', null),
        params: this.props.navigation.getParam('params', {}),
    };

    static defaultProps = {}

    static navigationOptions = {
      header: null,
    };

    constructor(props) {
        super(props);

        this.initMovieRoom = this.initMovieRoom.bind(this);
        this.initRecipeRoom = this.initRecipeRoom.bind(this);
    }

    //MOVIES
    initMovieRoom() {
      const {genre, type} = this.state.params;
      const { roomType } = this.state;
      axios.post(`http://${IP}:8080/movie/get/withParams`, {
        genre: genre,
        type: type
      })
        .then(res => {
          this.setState({
            cards: res.data,
          })
          var cards_ids = res.data.map(card => card._id);

          return axios.post(`http://${IP}:8080/room/create`, {
              roomType,
              cards_ids
          })
        })
        .then(res => {
          this.setState({
            room: res.data,
            ready: true
          })
        })
        .catch(err => {
          console.log(err);
        })
        .catch(err => {
          console.log(err);
        })
    }

    //RECIPES
    initRecipeRoom() {
      const {recipeType, difficulty} = this.state.params
      const { roomType } = this.state;
      // console.log(`http://${IP}:8080/room/create`);
      this.socket = SocketIOClient(`http://169.254.70.42:8080`)

      console.log(`http://${IP}:8080/recipe/get/withParams`);
      axios.post(`http://${IP}:8080/recipe/get/withParams`, {
        recipeType: recipeType,
        difficulty: difficulty
      })
        .then(res => {

          this.setState({
            cards: res.data,
          })
          var cards_ids = res.data.map(card => card._id);

          return axios.post(`http://${IP}:8080/room/create`, {
              roomType,
              cards_ids
          })
        })
        .then(res => {
          this.setState({
            room: res.data,
            ready: true
          })
        })
        .catch(err => {
          console.log(err);
        })
        .catch(err => {
          console.log(err);
        })
    }

    componentDidMount() {
      const roomType = this.state.roomType;
      console.log(roomType);
      if (roomType === "movie")
        this.initMovieRoom();
      else if (roomType === "recipe")
        this.initRecipeRoom();

    }

    renderLoading() {
        return(
            <RoomLoadingView/>
        )
    }

    render() {
        const { ready, room, cards, roomType } = this.state;
        if (ready)
            return this.props.navigation.navigate('Room', {room, cards, roomType})
        else
            return this.renderLoading()
    }
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent:  'center'
  },
  loaderWrapper: {
    justifyContent: 'center'
  },
  loaderLabel: {
    fontSize: 30,
    marginBottom: 15,
    color: "#1A535C"
  }
})
