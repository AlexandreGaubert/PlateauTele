import React, { Component } from "react"
import axios from 'axios';
import QRCode from 'react-native-qrcode';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
    Text,
    TextInput,
    View,
    Button,
    Alert,
    StatusBar,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native'

import RoomLoadingView from '../components/RoomLoadingView'
import { IP } from '../config.js'

 export default class JoinRoom extends Component {
   static defaultProps = {

   }
   static navigationOptions = {
     header: null
   }
   state = {
     joinCode: '',
     loading: false
   }
   constructor(props) {
     super(props)
     this.handleJoinCode = this.handleJoinCode.bind(this)
     this.onSucces = this.onSucces.bind(this)
   }

   handleJoinCode(joinCode) {
     this.setState({joinCode: joinCode})
   }

   onSucces(e){
     this.setState({loading: true})

     Alert.alert(e.data);
     //
     // axios.post(`http://${IP}:8080/recipes/room/join`, {joinCode: e.data})
     // .then(res => {
     //   const { recipeRoom, recipes } = res.data;
     //   this.props.navigation.navigate('Room', {recipes})
     // })
     // .catch(err => {
     //   console.log(err);
     // })
   }

   renderLoading() {
      return (
        <RoomLoadingView/>
      )
   }

   renderForm() {
     return(
       <View style={styles.container}>
          <QRCodeScanner
            onRead={(e) => Alert.alert(e.data)}
            topContent={
              <Text>
                Scannez le QRcode d'un salle pour la rejoindre
              </Text>
            }
            bottomContent={
              <TouchableOpacity>
                <Text>OK. Got it!</Text>
              </TouchableOpacity>
            }
          />
       </View>
     )
   }

   render() {
     const {loading} = this.state;
     if (loading) return this.renderLoading()
     else return this.renderForm()
   }
 }

const { width, height } = Dimensions.get('window')

 const styles = StyleSheet.create({
   container: {
     flex: 1,
   },
   input: {
     height: 40,
     width: width/3,
     margin: 40
   },
   button: {

   }
 })
