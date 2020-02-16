import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCard } from '../actions'
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, TouchableOpacity  } from 'react-native'
import { addCardToDeck } from '../utils/api.js'
import { gray, lightBlue, red } from  '../utils/colors'

/**
 * Displays a form to add new Card to Deck
 * Connected to Redux store
 */

class AddCard extends Component {
  state = {
    question: null,
    answer: null,
    error: false
  }
  handleInputChange = (text, field) => {
    const { question, answer, error } = this.state;
    const newState = { question, answer };
    newState[field] = text;
    if (error && newState.question && newState.answer) newState.error = false;
    this.setState(newState);
  }
  handleSubmit = () => {
    const { question, answer } = this.state,
          { navigation, dispatch } = this.props,
          { id } = this.props.navigation.state.params
    if (!question || !answer) {
      this.setState({
        error: true
      })
    } else {
      const card = { question, answer }
      dispatch(addCard(id, card));
      addCardToDeck(id, card).then(() => {
        navigation.goBack();
      })
    }
  }
  render() {
    const { question, answer, error } = this.state;
    return (
      <KeyboardAvoidingView style={[styles.container, styles.center]}  behavior="padding" enabled>
        <View style={styles.control}>
          <Text style={styles.caption}>
            Enter Question
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleInputChange(text, 'question')}
            value={question}
          />
        </View>
        <View style={styles.control}>
          <Text style={styles.caption}>
            Enter Answer
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => this.handleInputChange(text, 'answer')}
            value={answer}
          />
        </View>
        <View style={{height: 100}}>
          { error && (
            <Text style={styles.error}>
              You need to fill both fields first!
            </Text>
          ) }
        </View>
        <View style={[styles.center, {flex: 0}]}>
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

export default connect()(AddCard)