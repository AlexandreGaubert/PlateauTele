import React, { Component } from 'react'
import {
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
  Button,
  StyleSheet,
  View,
  StatusBar,
  Dimensions
} from 'react-native'

import MovieCard from './MovieCard'
import ExpandablePanel from './ExpandablePanel'
import LineSeparator from './LineSeparator'
import MyText from './MyText'

export default class MovieExpanded extends Component {
  render() {
    const { movie } = this.props;

    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <Modal
          animationType="fade"
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={this.props.closeModal}
        >
          <ScrollView>
              <Image
                style={{aspectRatio: 2/3}}
                source={{uri: movie.img}}
                resizeMode="stretch"
              />
              <View>
                <MyText bold style={styles.title}>{movie.title}</MyText>
                <MyText size={15} center style={{marginVertical: 10}}>{movie.director}</MyText>
              </View>

              <View style={{backgroundColor: "#FFFFFF"}}>

                <ExpandablePanel expanded title="SYNOPSIS">
                  <MyText style={styles.overview}>{movie.overview}</MyText>
                </ExpandablePanel>

                <ExpandablePanel title="CRÉDITS">
                  <CastingPanel movie={movie}/>
                </ExpandablePanel>

              </View>
              <TouchableOpacity onPress={this.props.closeModal} style={styles.closeIcon}>
                <Image
                  style={{width: 30, height: 30}}
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/bold-ui/100/close-512.png'}}
                />
              </TouchableOpacity>
          </ScrollView>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    overview: {
      textAlign: "center",
      fontSize: 20,
      padding: 5
    },
    title: {
      fontSize: 35,
      textAlign: "center",
    },

    closeIcon: {
      position: 'absolute',
      right: 10,
      top: 10
    }
})

const CastingPanel = (props) => {
  const { movie } = props;
  return (
    <View style={castingPanelStyles.container}>

      <View style={castingPanelStyles.group}>
        <LineSeparator style={castingPanelStyles.lineSeparator} text={"ACTEURS"}/>
        {movie.actors.map((actor, key) => {
          return <MyText style={castingPanelStyles.item} key={key}>{actor}</MyText>
        })}
      </View>

      <View style={castingPanelStyles.group}>
        <LineSeparator style={castingPanelStyles.lineSeparator} text={"PRODUCTEUR" + (movie.producers.length > 1 ? "S" : "")}/>
        {movie.producers.map((producer, key) => {
          return <MyText style={castingPanelStyles.item} key={key}>{producer}</MyText>
        })}
      </View>

      <View style={castingPanelStyles.group}>
        <LineSeparator style={castingPanelStyles.lineSeparator} text={"SCÉNARISTE" + (movie.writers.length > 1 ? "S" : "")}/>
        {movie.writers.map((writer, key) => {
          return <MyText style={castingPanelStyles.item} key={key}>{writer}</MyText>
        })}
      </View>
    </View>
  );
}

const castingPanelStyles = StyleSheet.create({
  container: {
  },
  group: {
    alignItems: 'center'
  },
  lineSeparator: {
    marginVertical: 20
  },
  item: {
    fontSize: 20
  }
})
