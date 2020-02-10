import React, { Component } from 'react'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import { StyleSheet, View, StatusBar } from 'react-native'
import DeckList from './components/DeckList'
import Deck from './components/Deck'
import Quiz from './components/Quiz'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import Constants from 'expo-constants'
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator  } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { white, blue } from  './utils/colors'
import { setLocalNotification, clearLocalNotification } from './utils/notification'

function MyStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createAppContainer(createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: blue,
    style: {
      height: 56,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}))

const AppNavigation = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      headerShown: false
    }
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTitle: 'Deck',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.id}'s Quiz`,
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }),
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTitle: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: blue,
      }
    }
  }
}))

export default class App extends Component  {
  componentDidMount () {
    // set schedule notifications
    setLocalNotification();
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <MyStatusBar backgroundColor={blue} barStyle="light-content" />
          <AppNavigation></AppNavigation>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
});
