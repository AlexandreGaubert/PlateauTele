import React, { Component } from 'react'
import {  Animated, Easing, Dimensions, ScrollView, Image, Modal, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native'

import LineSeparator from './LineSeparator'
import MyText from './MyText'

export default class RecipeExpanded extends Component {
  state = {
    height: new Animated.Value(0),
    rotate: new Animated.Value(0),
    expanded: this.props.expanded ? true : false
  }
  static defaultProps = {}

  constructor(props) {
      super(props);

      this.expand = this.expand.bind(this);
      this.collapse = this.collapse.bind(this);
      this.toggle = this.toggle.bind(this);
      this._onLayout = this._onLayout.bind(this);
  }

  toggle() {
    this.setState(prevstate => { return {expanded: !prevstate.expanded}})
  }

  expand() {
    Animated.spring(
      this.state.height,
      {
        toValue: 100,
        speed: 10,
      }
    ).start()
    Animated.spring(
      this.state.rotate,
      {
        toValue: 90,
        speed: 6,
      }
    ).start()
  }

  collapse() {
    Animated.spring(
      this.state.height,
      {
        toValue: 0,
        speed: 10,
      }
    ).start()
    Animated.spring(
      this.state.rotate,
      {
        toValue: 0,
        speed: 6,
      }
    ).start()
  }

  componentDidMount() {
    var { expanded } = this.state;

    if (expanded) this.expand()
  }

  componentDidUpdate() {
    var { expanded } = this.state;

    if (expanded) this.expand()
    else if (!expanded) this.collapse()
  }

  _onLayout(event) {
    this.setState({maxHeight: event.nativeEvent.layout.height});;
  }

  render() {
    const { children, title } = this.props;
    var { expanded, height, rotate } = this.state;
    rotate = rotate.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    })
    height = height.interpolate({
      inputRange: [0, 25, 50, 75, 100],
      outputRange: [0, .5, 0.75, 0.9, 1]
    })
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.toggle}>
          <Animated.Image
            style={[ styles.icon, {transform: [{rotate: rotate}]}]}
            source={require('../assets/images/chevron-right.png')}
          />
          <MyText style={styles.title}>{title}</MyText>
        </TouchableOpacity>

        <Animated.View style={[styles.content, {transform: [{scaleY: height}, {scaleX: height}]}]}>
          {expanded ? children : null}
        </Animated.View>

      </View>
    )
  }
}

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
      width: width,
    },
    button: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#1A535C',
      padding: 5,
      borderBottomWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
       width: 0,
       height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 7.49,
      elevation: 12,
    },
    icon: {
      width: 25,
      height: 25,
      marginLeft: 10,
      marginRight: 25,
    },
    title: {
      color: '#F7FFF7',
      fontSize: 20
    },
    content: {
    }
})
