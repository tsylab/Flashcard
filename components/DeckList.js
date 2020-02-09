import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadDecks } from '../actions'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { getDecks, loadDefaultStorage } from '../utils/api.js'
import { lightBlue } from  '../utils/colors'

function Item({ options, navigation }) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate(
        'Deck',
        { id: options.title }
      )}
    >
      <Text style={styles.title}>{options.title}</Text>
      <Text style={styles.amount}>{options.questions.length} card{options.questions.length !== 1 ? 's' : ''}</Text>
    </TouchableOpacity>
  );
}

class Decks extends Component {
  state = {
    decks: {}
  }
  componentDidMount () {
    const { dispatch } = this.props
    loadDefaultStorage().then(() => {
      getDecks().then((result) => {
        dispatch(loadDecks(result))
      })
    })
  }
  render() {
    const { decks, navigation } = this.props,
          decksArr = Object.keys(decks).sort();
    return (
      <View style={styles.container}>
        <FlatList
          data={decksArr}
          renderItem={({ item }) => <Item options={decks[item]} navigation={navigation} />}
          keyExtractor={item => item}
        ></FlatList>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: lightBlue,
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
  amount: {
    fontSize: 14,
    textAlign: 'center',
  },
});

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(Decks)
