import React, { Component } from 'react'
import Swiper from 'react-native-deck-swiper'
import { Image, ScrollView, Modal, TouchableHighlight, Button, StyleSheet, Text, View, Dimensions } from 'react-native'

import RecipeExpanded from './RecipeExpanded';
import RecipeCard from './RecipeCard';

export default class MySwiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      swipedAllCards: false,
      swipeDirection: '',
      isSwipingBack: false,
      cardIndex: 0,
      modalVisible: false
    }

    this.setModalVisible = this.setModalVisible.bind(this)
  }
  renderCard = (card, index) => {
      return <RecipeCard card={card}/>
  };
  onSwipedAllCards = () => {
    this.setState({
      swipedAllCards: true
    })
  };

  swipeLeft = () => {
    this.swiper.swipeLeft()
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  render() {
    const {cardIndex} = this.props
    return (
      <View style={styles.container}>
        <RecipeExpanded modalVisible={this.state.modalVisible} closeModal={() => this.setModalVisible(false)} recipe={this.props.recipes[cardIndex]}/>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          verticalSwipe={false}
          cardVerticalMargin={80}
          cardHorizontalMargin={20}
          onSwipedLeft={this.props.onSwipedLeft}
          onSwipedRight={this.props.onSwipedRight}
          onSwiped={this.props.onSwiped}
          onTapCard={() => this.setModalVisible(!this.state.modalVisible)}
          cards={this.props.recipes}
          cardIndex={cardIndex}
          renderCard={this.renderCard}
          onSwipedAll={this.props.onSwipedAll}
          stackSize={3}
          stackSeparation={15}
          animateOverlayLabelsOpacity
          animateCardOpacity
          containerStyle={{backgroundColor: '#4ECDC4'}}
        >
        </Swiper>
      </View>
    )
  }
}

var fullHeight = Dimensions.get('window').height;
var fullWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    width: fullWidth
  },
})
