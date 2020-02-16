import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray, lightBlue } from  '../utils/colors'

/**
 * Represented specific Deck with a way to add new Card or start Quiz
 * Connected to Redux store
 */

class Deck extends Component {
  render() {
    const { decks, navigation } = this.props,
          { id } = this.props.navigation.state.params,
          deck = decks[id];

    if (!deck) {
      return (
        <View></View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View style={[styles.container, styles.center]}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.amount}>{deck.questions.length}  card{deck.questions.length !== 1 ? 's' : ''}</Text>
          </View>
          <View style={[styles.center, {flex: 0, marginVertical: 20}]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(
                'AddCard',
                { id: deck.title }
              )}
            >
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate(
                'Quiz',
                { id: deck.title }
              )}
            >
              <Text style={styles.buttonText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
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
  button: {
    backgroundColor: lightBlue,
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 200
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  amount: {
    fontSize: 24,
    textAlign: 'center',
    color: gray
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

export default connect(mapStateToProps)(Deck)