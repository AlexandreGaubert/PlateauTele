import React from 'react'
import axios from 'axios'
import { createStackNavigator } from 'react-navigation';
import {
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Picker,
    Dimensions,
    TouchableHighlight
} from 'react-native';

import SelectButton from '../components/SelectButton'
import LineSeparator from '../components/LineSeparator'

const genres = [
  {
    eng: "Action & Adventure",
    fr: "Action Et Aventure"
  },
  {
    eng: "Sci-Fi & Fantastic",
    fr: "Science-Fiction Et Fantastique"
  },
]

export default class MovieRoomCreation extends React.Component {
    state = {
        type: '',
        availableGenres: [],
        genres: [],
        genre: '',
        selectedGenres: [],
        guest: '',
        selectedGuests: []
    };

    static defaultProps = {}

    static navigationOptions = {
      header: null
    }

    constructor(props) {
        super(props);

        this.handleType = this.handleType.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleGenreAdd = this.handleGenreAdd.bind(this);
        this.handleGenreRemove = this.handleGenreRemove.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);
        this.handleGuestAdd = this.handleGuestAdd.bind(this);
        this.handleGuestRemove = this.handleGuestRemove.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    handleGenreChange(genre) {
        this.setState(prevstate => {
            return {
                selectedGenres: [...prevstate.selectedGenres, JSON.parse(genre)],
                genre: ''
            };
        })
    }

    handleGenreAdd() {
    }

    handleGenreRemove(id) {
        this.setState(prevstate => { return {selectedGenres: prevstate.selectedGenres.filter(genre => genre.id !== id)}})
    }

    handleGuestChange(e) {
        this.setState({guest: e.target.value})
    }

    handleGuestAdd() {
        this.setState(prevstate => {
            return {
                selectedGuests: [...prevstate.selectedGuests, prevstate.guest],
                guest: ''
            };
        })
    }

    handleGuestRemove(guest) {
        this.setState(prevstate => { return {selectedGuests: prevstate.selectedGuests.filter(guest => guest !== guest)}})
    }

    handleType(type) {
        this.setState({
            type: type
        })
    }

    resetForm() {
      this.setState({
        genre: '',
        type: ''
      })
    }

    submitForm() {
      const { genre, type } = this.state;

      this.props.navigation.navigate('RoomLoading', {
        roomType: 'movie',
        params: {
          genre,
          type
        }
      });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden/>
                <View style={styles.FormContainer}>

                  <View>
                    <LineSeparator style={styles.separator} text="FILM OU SÉRIE"/>
                    <TypeSelector handleType={this.handleType} type={this.state.type}/>
                  </View>

                  <View>
                    <LineSeparator style={styles.separator} text="GENRE"/>
                    <GenreSelector genreChange={this.handleGenreChange} genreAdd={this.handleGenreAdd} availableGenres={genres}/>
                  </View>

                  <GenreDisplayer controlFunc={this.handleGenreRemove} selectedGenres={this.state.selectedGenres}/>

                    {/*<GuestSelector guest={this.state.guest} guestChange={this.handleGuestChange} guestAdd={this.handleGuestAdd}/>*/}

                    {/*<GuestDisplayer selectedGuests={this.state.selectedGuests} guestRemove={this.handleGuestRemove}/>*/}

                  <ResetButton resetForm={this.resetForm}/>

                  <SubmitButton submitForm={this.submitForm}/>

                </View>
            </View>
        )
    }
}

const SubmitButton = (props) => {
  return (
    <TouchableHighlight style={styles.button} onPress={props.submitForm}>
      <Text style={styles.buttonText}>LANCER UNE SALLE</Text>
    </TouchableHighlight>
  )
}

const ResetButton = (props) => {
  return (
    <TouchableHighlight
      style={[
        styles.button,
        {
          alignSelf: 'center',
          width: Dimensions.get('window').width/5,
          height: 25
        }
      ]}
      onPress={props.resetForm}
    >
      <Text style={[styles.buttonText, {fontSize: 15}]}>RESET</Text>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#4ECDC4'
  },
  FormContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-around',
    padding: 20,
  },
  genreSelector: {

  },
  button: {
    alignSelf: "stretch",
    height: 40,
    backgroundColor: "#1A535C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {  width: 0,  height: 10,  },
    shadowRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.48,
    elevation: 5
  },
  buttonText: {
    fontSize: 20,
    color: "#F7FFF7"
  },
  separator: {
    marginBottom: 10
  },
  genreDisplayer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

const TypeSelector = (props) => {
    const { handleType, type } = props;
    const anySelected = type.length === 0 ? true : false;
    return (
        <View style={typeStyles.container}>
          <SelectButton
            title="FILM"
            value="film"
            color="#1A535C"
            selectedValue={type}
            anySelected={anySelected}
            handleChange={handleType}
          />
          <SelectButton
            title="SÉRIE"
            value="série"
            color="#1A535C"
            selectedValue={type}
            anySelected={anySelected}
            handleChange={handleType}
          />
        </View>
    )
}

const typeStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
     width: 0,
     height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: '#1A535C'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: "#F7FFF7"
  },
  buttonSelected: {
    backgroundColor: 'grey'
  },
})

const GenreSelector = (props) => {
    return (
        <View className={"genreSelector"}>
            <Picker
                selectedValue={props.value}
                // style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => props.genreChange(itemValue)}>
                {props.availableGenres.map((genre, key) => {
                    return <Picker.Item key={key} label={genre.fr} value={genre.eng}/>
                })}
            </Picker>
        </View>

    )
}

const GenreDisplayer = (props) => {
    return (
        <View style={styles.genreDisplayer}>
            {props.selectedGenres.map((genre, key) => {
                return (<Button key={key} title={genre.name} onPress={() => props.controlFunc(genre.id)}/>)
            })}
        </View>
    )
}

const GuestSelector = (props) => {
    return (
        <span className={"guestSelector"}>

            <input onChange={props.guestChange} value={props.guest}/>
            <button onClick={props.guestAdd}>+</button>


        </span>
    )
}

const GuestDisplayer = (props) => {
    return (
        <span className={"guestDisplayer"}>
            {props.selectedGuests.map((guest, key) => {
                return <button onClick={() => props.guestRemove(guest)}>{guest}</button>
            })}

        </span>
    )
}
