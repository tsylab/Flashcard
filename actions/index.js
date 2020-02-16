export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

/**
 * Put Decks to store
 * @param {*} decks object contains decks description
 */
export function loadDecks (decks) {
  return {
    type: LOAD_DECKS,
    decks,
  }
}

/**
 * Put new Card to specific Deck
 * @param {*} deck deck id
 * @param {*} card card info
 */
export function addCard (deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card,
  }
}

/**
 * Add new Deck to store
 * @param {*} deck deck description
 */
export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}