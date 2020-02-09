import { ADD_CARD, ADD_DECK, LOAD_DECKS } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat([action.card])
        }
      }
    case ADD_DECK :
      return {
        ...state,
        [action.deck.title]: {
          ...action.deck
        }
      }
    default :
      return state
  }
}

export default decks