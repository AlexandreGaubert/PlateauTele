import React, { Component } from "react"
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Bars } from 'react-native-loader';

export default class RoomLoadingView extends Component {
   static defaultProps = {
   }
   state = {

   }
   constructor(props) {
     super(props)

   }
   render() {
     return (
       <View style={styles.loaderContainer}>
           <View style={styles.loaderWrapper}>
            <Text style={styles.loaderLabel}>Chargement de la salle...</Text>
            <Bars size={30} color="#1A535C"/>
           </View>
       </View>
		 )
   }
 }

 const styles = StyleSheet.create({
   loaderContainer: {
     flex: 1,
     alignItems: 'center',
     justifyContent:  'center'
   },
   loaderWrapper: {
     justifyContent: 'center',
     alignItems: 'center'
   },
   loaderLabel: {
     textAlign: 'center',
     fontSize: 30,
     marginBottom: 15,
     color: "#1A535C"
   }
 })
