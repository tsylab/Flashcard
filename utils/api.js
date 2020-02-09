import { AsyncStorage } from 'react-native'

const MOBILE_FLASHCARD_KEY = 'MobileFlashcard:storage'
const defaultStorage = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  },
  Android: {
    title: 'Android',
    questions: [
    ]
  }
}

export function loadDefaultStorage() {
  return AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(defaultStorage))
}

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      return JSON.parse(results)
    })
}

export function getDeck(id) {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      const deck = JSON.parse(results);
      return deck[id];
    })
}

export function addDeckToStorage(deck) {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      const decks = JSON.parse(results);
      decks[deck.title] = deck;
      return AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(decks));
    })
}

export function addCardToDeck(id, card) {
  return AsyncStorage.getItem(MOBILE_FLASHCARD_KEY)
    .then((results) => {
      const deck = JSON.parse(results);
      const { questions } = deck[id];
      questions.push(card);
      return AsyncStorage.setItem(MOBILE_FLASHCARD_KEY, JSON.stringify(deck));
    })
}