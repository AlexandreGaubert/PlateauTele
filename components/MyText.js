import React from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  PixelRatio
} from 'react-native';

export default class MyText extends React.Component {
  constructor(props) {
    super(props)

    this.getRatioFontSize = this.getRatioFontSize.bind(this);
  }

  getRatioFontSize(size) {
    let { width, height, scale } = Dimensions.get('window')

    let ratio = (width * 2) / 768; //dividing current width by dpi value of device which I've dev the app
    return size * ratio
  }

  render() {
    var { style, children, bold, center, size } = this.props;
    var fontSize = 0;

    if (style) {
      var fontSizeFromStyle = StyleSheet.flatten(style).fontSize;
      if (fontSizeFromStyle > 0)
        fontSize = fontSizeFromStyle;
    }
    if (size && size != fontSize) fontSize = size;
    if (fontSize == 0) fontSize = 14

    const defaultStyles = {
      fontSize: this.getRatioFontSize(fontSize),
      fontFamily: bold ? "montserrat-bold" : "montserrat",
      textAlign: center ? 'center' : "left",
    }

    return (
      <Text style={[style ? style : null, defaultStyles]}>
        {children}
      </Text>
    )
  }
}
