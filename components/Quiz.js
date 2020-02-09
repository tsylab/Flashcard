import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { gray, green, red, lightBlue } from  '../utils/colors'

class Quiz extends Component {
  state = {
    deck: null,
    currQuestion: null,
    totalQuestions: null,
    correct: 0,
    display: 'question'
  }
  componentDidMount () {
    const { decks } = this.props,
          { id } = this.props.navigation.state.params;

    this.setState(() => ({
      deck: decks[id],
      currQuestion: 1,
      totalQuestions: decks[id].questions.length
    }));
  }
  nextQuestion(isCorrect) {
    let { correct, currQuestion } = this.state;
    if (isCorrect) correct++;
    currQuestion++;
    this.setState({
      correct,
      currQuestion,
      display: 'question',
    })
  }
  again() {
    this.setState({
      currQuestion: 1,
      correct: 0,
      display: 'question',
    })
  }
  render() {
    const { deck, currQuestion, correct, totalQuestions, display } = this.state;
    // Loading
    if (!deck) {
      return (
        <View></View>
      )
    // No questions
    } else if (totalQuestions === 0) {
      return (
        <View style={[styles.container, styles.center]}>
          <Text style={styles.noCard}>
            There's no cards in this deck!
          </Text>
        </View>
      )
    // Results
    } else {
      const { navigation } = this.props;
      if (currQuestion > totalQuestions) {
        return (
          <View style={[styles.container, styles.center]}>
            <View style={[styles.container, styles.center]}>
              <Text style={styles.title}>
                Quiz complete!
              </Text>
              <Text style={styles.title}>
                Correct answers:
              </Text>
              <Text style={[styles.amount, {fontSize: 34}]}>
                {`${correct}/${totalQuestions}`}
              </Text>
            </View>
            <View style={[styles.center, {flex: 0, marginVertical: 20}]}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: lightBlue}]}
                onPress={() => { this.again() }}
              >
                <Text style={styles.buttonText}>Try again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: lightBlue}]}
                onPress={() => navigation.goBack()}
              >
                <Text style={styles.buttonText}>Go back</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      } else {
        const mainText = deck.questions[currQuestion - 1][display];
        return (
          <View style={styles.container}>
            <Text style={styles.numberOfCards}>
              {`${currQuestion}/${totalQuestions}`}
            </Text>
            <View style={[styles.container, styles.center]}>
              <Text style={styles.title}>
                { mainText }
              </Text>
              <TouchableOpacity
                style={styles.answer}
                onPress={() => { this.setState({display: display === 'question' ? 'answer' : 'question'}) }}
              >
                <Text style={styles.answerText}>
                  { display === 'question' ? 'Show Answer' : 'Show Question' }
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.center, {flex: 0, marginVertical: 20}]}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: green}]}
                onPress={() => { this.nextQuestion(true) }}
              >
                <Text style={styles.buttonText}>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: red}]}
                onPress={() => { this.nextQuestion(false) }}
              >
                <Text style={styles.buttonText}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
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
    padding: 20,
    marginVertical: 6,
    marginHorizontal: 20,
    borderRadius: 10,
    width: 200
  },
  noCard: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  numberOfCards: {
    fontSize: 20,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  answer: {
    padding: 20,
  },
  answerText: {
    fontSize: 20,
    color: gray
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginHorizontal: 20,
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

export default connect(mapStateToProps)(Quiz)