import React, { Component } from "react"
import { Image, ScrollView, Modal, TouchableHighlight, Button, StyleSheet, Text, View, Dimensions } from 'react-native'

import MyText from './MyText'

export default class RecipeCard extends Component {
   static defaultProps = {
     card: {}
   }
   state = {

   }
   constructor(props) {
     super(props)

   }
   render() {

		 const { card } = this.props;
     return (
       <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
           style={styles.image}
            source={{uri: card.img}}
            resizeMode="stretch"
          />
        </View>

       <View style={styles.infos}>
         <View style={styles.difficultyAndTime}>
           <MyText style={styles.infosText}>{card.recipeType.slice(0,1).toUpperCase() + card.recipeType.slice(1, card.recipeType.length)}</MyText>
           <MyText style={styles.infosText}>|</MyText>
           <MyText style={styles.infosText}>{card.difficulty.slice(0,1).toUpperCase() + card.difficulty.slice(1, card.difficulty.length)}</MyText>
           <MyText style={styles.infosText}>|</MyText>
           <MyText style={styles.infosText}>{card.total_time}</MyText>
         </View>
         <View style={{flex: 1, justifyContent: 'center'}}>
            <MyText center style={{...styles.title}}>{card.title}</MyText>
         </View>

       </View>
      </View>
		 )
   }
 }

 var winWidth = Dimensions.get('window').width
 var winHeight = Dimensions.get('window').height

 const styles = StyleSheet.create({
   container: {
     width: winWidth - 40,
     height: winHeight - 160,
     backgroundColor: "#ffffff",
   },

   title: {
     fontSize: 25,
     margin: 'auto'
   },

   imageContainer: {
     flex: 1.5,
     shadowColor: "#000",
     shadowOffset: {
     	width: 0,
     	height: 6,
     },
     shadowOpacity: 0.37,
     shadowRadius: 7.49,

     elevation: 12,
     backgroundColor: '#F7FFF7',
     margin: 10
   },
	 image: {
		 flex: 1,
		 height: undefined,
		 width: undefined,
	 },
   infos: {
     flex: 1,
     backgroundColor:  '#F7FFF7'
   },
   difficultyAndTime: {
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     alignItems: "center",
     backgroundColor: '#1A535C',
     height: "25%"
   },
   infosText: {
     fontSize: 20,
     // fontWeight: 'bold',
     textAlign: "center",
     color: '#F7FFF7'
   }
 })
