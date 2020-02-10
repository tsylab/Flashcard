import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { addDeckToStorage } from '../utils/api.js'
import { gray, lightBlue, red } from  '../utils/colors'

const errEmpty = 'You need to fill Title field first!'
const errExists = 'Deck with the same name is already exists!'

class AddDeck extends Component {
  state = {
    deckName: null,
    error: null,
  }
  handleInputChange = (deckName) => {
    const { error } = this.state;
    const { decks } = this.props;
    const newState = { deckName };
    if (decks[deckName]) {
      newState.error = errExists;
    } else if (error && deckName) {
      newState.error = null;
    }
    this.setState(newState);
  }
  handleSubmit = () => {
    const { deckName, error } = this.state,
          { navigation, dispatch } = this.props;
    if (!deckName) {
      this.setState({
        error: errEmpty
      })
    } else if (!error) {
      const deck = {
        title: deckName,
        questions: []
      }
      dispatch(addDeck(deck));
      addDeckToStorage(deck).then(() => {
        this.setState({
          deckName: null,
          error: null
        });
        //navigation.goBack();
        navigation.navigate(
          'Deck',
          { id: deckName }
        );
      })
    }
  }
  render() {
    const { deckName, error } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}  behavior="padding" enabled>
        <View style={[styles.container, styles.center]}>
          <View style={styles.control}>
            <Text style={styles.caption}>
              Enter Deck Title
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.handleInputChange(text)}
              value={deckName}
            />
          </View>
          <View style={{height: 100}}>
            { error && (
              <Text style={styles.error}>
                { error }
              </Text>
            ) }
          </View>
        </View>
        <View style={[styles.center, styles.control, {flex: 0}]}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleSubmit}
          >
            <Text style={styles.buttonText}>Submmit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    fontSize: 26,
    borderColor: gray,
    borderWidth: 1
  },
  control: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: lightBlue,
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 200
  },
  error: {
    fontSize: 20,
    color: red
  },
  caption: {
    fontSize: 26
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  }
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(AddDeck)