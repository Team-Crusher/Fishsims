/* eslint-disable no-case-declarations */
const SET_TURNS_REMAINING = 'SET_TURNS_REMAINING'

const setTurnsRemaining = turns => ({type: SET_TURNS_REMAINING, turns})

const init = 26

const turnsRemaining = (state = init, action) => {
  switch (action.type) {
    case SET_TURNS_REMAINING:
      return action.turns
    default:
      return state
  }
}

module.exports = {turnsRemaining, setTurnsRemaining}
