import React from 'react'
import axios from 'axios'
import { createStackNavigator } from 'react-navigation';

import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button,
    Picker
} from 'react-native';

const api_key = '3f1f89fc3203c24695ee439ffd7039c7';



export default class RoomForm extends React.Component {
    state = {
        listType: null,
        availableGenres: [],
        genres: [],
        genre: null,
        selectedGenres: [],
        guest: '',
        selectedGuests: []
    };

    static defaultProps = {
    }

    constructor(props) {
        super(props);

        this.handleListTypeChange = this.handleListTypeChange.bind(this);
        this.handleGenreChange = this.handleGenreChange.bind(this);
        this.handleGenreAdd = this.handleGenreAdd.bind(this);
        this.handleGenreRemove = this.handleGenreRemove.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);
        this.handleGuestAdd = this.handleGuestAdd.bind(this);
        this.handleGuestRemove = this.handleGuestRemove.bind(this);
    }

    componentDidMount() {
        axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=3f1f89fc3203c24695ee439ffd7039c7&language=fr-FR&page=1\n')
            .then(res => {
                this.setState({availableGenres: res.data.genres})
            })
            .catch(err => {
                console.log(err);
            })
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

    handleListTypeChange(e) {
        this.setState({
            listType: e.target.value
        })
    }

    render() {
        return (
            <View>
                <View style={styles.FormContainer}>
                    <TypeSelector/>

                    <GenreSelector genreChange={this.handleGenreChange} genreAdd={this.handleGenreAdd} availableGenres={this.state.availableGenres}/>

                    <GenreDisplayer controlFunc={this.handleGenreRemove} selectedGenres={this.state.selectedGenres}/>

                    {/*<GuestSelector guest={this.state.guest} guestChange={this.handleGuestChange} guestAdd={this.handleGuestAdd}/>*/}

                    {/*<GuestDisplayer selectedGuests={this.state.selectedGuests} guestRemove={this.handleGuestRemove}/>*/}

                    {/*<Link to={{ pathname: '/room/creation', state: { genres: this.state.selectedGenres} }}>Create room</Link>*/}

                    <Button title="START" onPress={() => {
                      this.props.navigation.navigate('RoomLoading', {
                        genres: this.state.selectedGenres
                      });
                    }}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  FormContainer: {
    display: "flex",
    flexDirection: "column",
    padding: 20
  },
  typeSelector: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly"
  },
  typeSelectorButton: {
    margin: "auto",
  },
  genreSelector: {

  },
  genreDisplayer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap"
  }
});

const TypeSelector = (props) => {
    return (
        <View style={styles.typeSelector}>
            <Button onPress={() => {} } style={styles.typeSelectorButton} title="FILM"/>
            <Button onPress={() => {} } style={styles.typeSelectorButton} title="SERIE"/>
        </View>
    )
}

const GenreSelector = (props) => {
    return (
        <View className={"genreSelector"}>
            <Picker
                selectedValue={props.value}
                // style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => props.genreChange(itemValue)}>
                {props.availableGenres.map((genre, key) => {
                    return <Picker.Item key={key} label={genre.name} value={`{"id" : ${genre.id}, "name": "${genre.name}"}`}/>
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
