import React from 'react'
import axios from 'axios'
import { createStackNavigator } from 'react-navigation';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Button,
    Picker,
    StatusBar,
    TextInput,
    Dimensions
} from 'react-native';

import SelectButton from '../components/SelectButton'
import LineSeparator from '../components/LineSeparator'
import MyText from '../components/MyText'

export default class RecipeRoomCreation extends React.Component {
    state = {
      recipeType: '',
      difficulty: '',
      ingredient: '',
      price: '',
    };

    static defaultProps = {
    }

    static navigationOptions = {
      header: null,
    };

    constructor(props) {
        super(props);

        this.handleRecipeType = this.handleRecipeType.bind(this)
        this.handleDifficulty = this.handleDifficulty.bind(this)
        this.handleIngredient = this.handleIngredient.bind(this)
        this.resetForm = this.resetForm.bind(this)
    }

    resetForm() {
      this.setState({
        recipeType: '',
        difficulty: '',
        ingredient: '',
        price: ''
      })
    }

    handleRecipeType(recipeType) {
      this.setState({recipeType: recipeType})
    }

    handleDifficulty(difficulty) {
      this.setState({difficulty: difficulty})
    }

    handleIngredient(ingredient) {
      this.setState({ingredient: ingredient})
    }

    handlePrice(price) {
      this.setState({price: price})
    }

    render() {
      const { recipeType, difficulty } = this.state;
        return (
            <View style={mainStyles.container}>
                <StatusBar hidden/>
                <View style={mainStyles.FormContainer}>
                  <View>
                    <LineSeparator style={mainStyles.separator} text="TYPE DE RECETTE"/>
                    <ChooseRecipeType recipeType={recipeType} handleRecipeType={this.handleRecipeType}/>
                  </View>

                  <View>
                    <LineSeparator style={mainStyles.separator} text="DIFFICULTÉ"/>
                    <ChooseDifficulty difficulty={difficulty} handleDifficulty={this.handleDifficulty}/>
                  </View>

                  <View>
                    <LineSeparator style={mainStyles.separator} text="PRIX"/>
                    <ChoosePrice price={this.state.price} handlePrice={this.handlePrice}/>
                  </View>

                  <TouchableHighlight
                    style={[
                      mainStyles.button,
                      {
                        alignSelf: 'center',
                        width: "20%",
                        height: '5%',

                      }
                    ]}
                    onPress={this.resetForm}
                  >
                    <MyText style={[mainStyles.buttonText, {fontFamily: 'fontawesome', fontSize: 15}]}></MyText>
                  </TouchableHighlight>

                  <TouchableHighlight style={mainStyles.button} onPress={() => {
                      this.props.navigation.navigate('RoomLoading', {
                        roomType: 'recipe',
                        params: {
                          difficulty,
                          recipeType,
                        }
                      });
                    }}>
                    <MyText style={mainStyles.buttonText}>LANCER UNE SALLE</MyText>
                  </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const mainStyles = StyleSheet.create({
  container: {
    backgroundColor: "#4ECDC4",
    height: '100%'
  },
  FormContainer: {
    padding: 20,
    height: '100%',
    justifyContent: 'space-around'
  },
  button: {
    alignSelf: "stretch",
    height: "8%",
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
  }
})

const ChooseRecipeType = (props) => {
  const {recipeType, handleRecipeType} = props;
  const anySelected = recipeType.length === 0 ? true : false;

  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

      <SelectButton
        title="ENTRÉE"
        value="entrée"
        color="#1A535C"
        selectedValue={recipeType}
        anySelected={anySelected}
        handleChange={handleRecipeType}
      />

      <SelectButton
        title="PLAT"
        value="plat principal"
        color="#1A535C"
        selectedValue={recipeType}
        anySelected={anySelected}
        handleChange={handleRecipeType}
      />

      <SelectButton
        title="DESSERT"
        value="dessert"
        color="#1A535C"
        selectedValue={recipeType}
        anySelected={anySelected}
        handleChange={handleRecipeType}
      />

    </View>
  )
}

const difficultyColors = {
  vert: '#40994a',
  orange: '#f7df2a',
  rouge: '#a01609'
}

const ChooseDifficulty = (props) => {
  const {difficulty, handleDifficulty} = props;
  const anySelected = difficulty.length === 0 ? true : false;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <SelectButton
        title="FACILE"
        value="très facile"
        selectedValue={difficulty}
        color={difficultyColors.vert}
        anySelected={anySelected}
        handleChange={handleDifficulty}
      />
      <SelectButton
        title="MOYEN"
        value="facile"
        selectedValue={difficulty}
        color={difficultyColors.orange}
        anySelected={anySelected}
        handleChange={handleDifficulty}
      />
      <SelectButton
        title="DIFFICILE"
        value="niveau moyen"
        selectedValue={difficulty}
        color={difficultyColors.rouge}
        anySelected={anySelected}
        handleChange={handleDifficulty}
      />
    </View>
  )
}

const ChoosePrice = (props) => {
  const {price, handlePrice} = props;
  const anySelected = price.length === 0 ? true : false;
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
      <SelectButton
        title="€"
        value="€"
        selectedValue={price}
        color={"#1A535C"}
        anySelected={anySelected}
        handleChange={handlePrice}
      />
      <SelectButton
        title="€€"
        value="€€"
        selectedValue={price}
        color={"#1A535C"}
        anySelected={anySelected}
        handleChange={handlePrice}
      />
      <SelectButton
        title="€€€"
        value="€€€"
        selectedValue={price}
        color={"#1A535C"}
        anySelected={anySelected}
        handleChange={handlePrice}
      />
    </View>
  )
}


const ChooseIngredient = (props) => {
  return(
    <TextInput
      value={props.value}
      style={{height: 40}}
      placeholder='Ingrédient...'
      placeholderTextColor="gray"
      onChangeText={(text) => props.handleIngredient(text)}
    />
  )
}
