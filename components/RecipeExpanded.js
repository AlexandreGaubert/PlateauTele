import React, { Component } from 'react'
import {  Easing, Dimensions, ScrollView, Image, Modal, TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native'

import LineSeparator from './LineSeparator'
import MyText from './MyText'

export default class RecipeExpanded extends Component {
  state = {
    ingredientsExpanded: false,
    instructionsExpanded: false,
  }

  constructor(props) {
      super(props);

      this.toggleIngredients = this.toggleIngredients.bind(this)
      this.toggleInstructions = this.toggleInstructions.bind(this)
  }

  toggleIngredients(panelAnimValue, iconAnimValue) {
    this.setState(prevstate => { return {ingredientsExpanded: !prevstate.ingredientsExpanded}})
  }

  toggleInstructions(panelAnimValue, iconAnimValue) {
    this.setState(prevstate => { return {instructionsExpanded: !prevstate.instructionsExpanded}})
  }

  render() {
    const { recipe, modalVisible, closeModal } = this.props;
    const { ingredientsExpanded, instructionsExpanded } = this.state;
    const { winWidth, winHeight } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <ScrollView style={{flex: 1, width: winWidth, height: winHeight}}>
              <Image
                style={{aspectRatio: 1}}
                source={{uri: recipe.img}}
              />

              <TimingPanel recipe={recipe}/>

              <ToggleButton title="Ingrédients" toggleFunction={this.toggleIngredients} expanded={ingredientsExpanded}/>
              {ingredientsExpanded ? <IngredientsPanel ingredients={recipe.ingredients}/> : null}

              <ToggleButton title="Instructions" toggleFunction={this.toggleInstructions} expanded={instructionsExpanded}/>
              {instructionsExpanded ? <InstructionsPanel instructions={recipe.instructions}/> : null}

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

const TimingPanel = (props) => {
  const {recipe} = props;
  return (
    <View style={timingStyles.container}>
      {recipe.prep_time.length === 0 ? null :
        <View style={timingStyles.timingContainer}>
          <MyText style={timingStyles.label}>Preparation</MyText>
          <MyText style={timingStyles.timing}>{recipe.prep_time}</MyText>
        </View>
      }

      {recipe.cook_time.length === 0 ? null : <MyText style={{fontSize: 20}}>|</MyText>}

      {recipe.cook_time.length === 0 ? null :
        <View style={timingStyles.timingContainer}>
          <MyText style={timingStyles.label}>Cuisson</MyText>
          <MyText style={timingStyles.timing}>{recipe.cook_time}</MyText>
        </View>
      }

      {recipe.rest_time.length === 0 ? null : <MyText style={{fontSize: 20}}>|</MyText>}

      {recipe.rest_time.length === 0 ? null :
        <View style={timingStyles.timingContainer}>
          <MyText style={timingStyles.label}>Repos</MyText>
          <MyText style={timingStyles.timing}>{recipe.rest_time}</MyText>
        </View>
      }
    </View>
  )
}

const timingStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#1A535C',
    marginVertical: 10
  },
  timingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  timing: {
    fontSize: 20,
    color: '#F7FFF7'

  },
  label: {
    color: '#F7FFF7'
  }
})

const ToggleButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.toggleFunction}
      style={{alignItems: 'center'}}
    >
      <LineSeparator text={props.title} textStyle={{fontSize: 20}}/>
      <Image
        style={{width: 25, height: 25, transform: [{rotate: props.expanded ? '-90deg' : '90deg'}]}}
        source={require('../assets/images/chevron-right.png')}
      />
    </TouchableOpacity>
  )
}

const IngredientsPanel = (props) => {
  const { ingredients } = props;
  return(
    <View style={{flexDirection: 'column'}}>
      {ingredients.map((ingredient, key) => {
        return (
          <View key={key} style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image style={{width: 50, height: 50}} source={{uri: ingredient.icon}}/>
            <MyText>{ingredient.ingredient}</MyText>
          </View>
        )
      })}
    </View>
  )
}

const InstructionsPanel = (props) => {
  const { instructions } = props;
  return (
    <View>
      {instructions.map((instruction, key) => {
        return (
          <View style={{marginTop: 10}} key={key}>
            <MyText style={{textAlign: 'center', fontSize: 15, fontWeight: 'bold'}}>Etape {key+1}</MyText>
            <MyText style={{textAlign: 'center'}}>{instruction}</MyText>
            <MyText style={{textAlign: 'center'}}>---</MyText>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    closeIcon: {
      position: 'absolute',
      right: 10,
      top: 10
    }
})
