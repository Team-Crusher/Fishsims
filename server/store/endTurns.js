/* eslint-disable no-case-declarations */
const ADD_ENDTURN = 'ADD_ENDTURN'
const RESET_ENDTURNS = 'RESET_ENDTURNS'

const addEndTurn = playerSocketId => ({type: ADD_ENDTURN, playerSocketId})

const resetEndTurns = () => ({type: RESET_ENDTURNS})

const init = []

const endTurns = (state = init, action) => {
  switch (action.type) {
    case ADD_ENDTURN:
      const {playerSocketId} = action
      return state.includes(playerSocketId) ? state : [...state, playerSocketId]
    case RESET_ENDTURNS:
      return init
    default:
      return state
  }
}

module.exports = {endTurns, addEndTurn, resetEndTurns}
