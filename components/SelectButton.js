import React from 'react'
import {
  TouchableHighlight,
  Text,
  StyleSheet,
  Animated
} from 'react-native'

import MyText from './MyText'

class SelectButton extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  }

  constructor(props) {
    super(props);

    this.animatedSelect = this.animatedSelect.bind(this);
    this.animatedDeselect = this.animatedDeselect.bind(this);
  }

  animatedSelect() {
    Animated.spring(
      this.state.opacity,
      {
        toValue: 1,
        speed: 10,
      }
    ).start()
  }

  animatedDeselect() {
    Animated.spring(
      this.state.opacity,
      {
        toValue: 0.5,
        speed: 1,
      }
    ).start()
  }

  componentDidMount() {
    const { anySelected, selectedValue, value } = this.props;
    const selected = this.props.selectedValue === this.props.value ? true : false;
    if (anySelected) {
      this.animatedSelect();
    }
    else {
      selected ? this.animatedSelect() : this.animatedDeselect();
    }
  }

  componentDidUpdate() {
    const { anySelected, selectedValue, value } = this.props;
    const selected = this.props.selectedValue === this.props.value ? true : false;
    if (anySelected) {
      this.animatedSelect();
    }
    else {
      selected ? this.animatedSelect() : this.animatedDeselect();
    }
  }

  render() {
    const {anySelected, color, title, handleChange, value, selectedValue} = this.props
    const {opacity} = this.state;
    return (
      <Animated.View
        style={{
          ...styles.button,
          opacity: opacity,
          backgroundColor: color,
        }}
      >
        <TouchableHighlight
          style={{padding: 10, width: '100%', alignItems: 'center', justifyContent: 'center'}}
          onPress={() => handleChange(value)}
          underlayColor={color}
        >
          <MyText size={19} style={styles.buttonText}>{title}</MyText>
        </TouchableHighlight>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#F7FFF7',
  },
})

export default SelectButton
