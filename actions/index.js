export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export function loadDecks (decks) {
  return {
    type: LOAD_DECKS,
    decks,
  }
}

export function addCard (deck, card) {
  return {
    type: ADD_CARD,
    deck,
    card,
  }
}

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}