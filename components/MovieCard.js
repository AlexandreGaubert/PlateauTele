import React from 'react'
import {
    Image,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    Dimensions
} from 'react-native';

export default class MovieCard extends React.Component {
    render() {
        const { movie } = this.props;
        const { width, height } = Dimensions.get('window')
        return (
            <View style={{width: width - 40, height: height - 80}}>
                <Image
                  style={{flex: 1}}
                  resizeMode="stretch"
                  source={{uri: movie.img}}
                />
            </View>
        )
    }
}
