import React from 'react'
import axios from 'axios'
import SocketIOClient from 'socket.io-client'
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Dimensions,
    Text,
    TouchableOpacity,
    View,
    Button,
    Picker,
    StatusBar,
    Alert
} from 'react-native';

import MySwiper from "../components/MySwiper";

export default class Room extends React.Component {
    state = {
        room: this.props.navigation.getParam('room', {}),
        roomType: this.props.navigation.getParam('roomType', null),
        cards: this.props.navigation.getParam('cards', []),
        user_id: '',
        cardIndex: 0,
        pageIndex: 1
    };

    static defaultProps = {
    }

    static navigationOptions = {
      header: null,
    };

    constructor(props) {
        super(props);

        this.onSwipedLeft = this.onSwipedLeft.bind(this);
        this.onSwipedRight = this.onSwipedRight.bind(this);
        this.onSwiped = this.onSwiped.bind(this);
    }

    onSwipedLeft(index) {
      const { cards } = this.state;
      const { _id } = this.state.room;
      const { user_id } = this.state;
      const card_id = cards[index]._id

      this.socket.emit('recipeSwipedLeft', {_id, user_id, card_id})
    }

    onSwipedRight(index) {
    }

    onSwiped(index) {
      this.setState(prevstate => {return {cardIndex: prevstate.cardIndex + 1}})
    }

    onSwipedAll() {

    }

    componentDidMount() {
      this.socket = SocketIOClient('http://192.168.1.96:8080')
      this.socket.on('user_id', (user_id) => {
        this.setState({user_id: user_id})
      })
      this.socket.emit('joinRoom', this.state.room._id)
    }

    renderNoMatch() {
        return(
          <View>
            <StatusBar hidden/>
            <Text>No Recipes found sorry...</Text>
          </View>
        )
    }

    renderCards(cards) {
        const { width, height } = Dimensions.get('window')
        return(
          <View style={{width: width, height: height}}>
            <StatusBar hidden/>
            <MySwiper
              cardIndex={this.state.cardIndex}
              onSwiped={this.onSwiped}
              onSwipedLeft={this.onSwipedLeft}
              onSwipedRight={this.onSwipedRight}
              cards={cards}
              onSwipedAll={this.onSwipedAll}
              roomType={this.state.roomType}
            />
          </View>
        )
    }


    render() {
        const { cards, user_id } = this.state;
        if (cards.length === 0) {
            return (this.renderNoMatch())
        }
        else {
            return (this.renderCards(cards))
        }
    }
}
