const SET_GAMESTATE = 'SET_GAMESTATE'

const setGameState = gameState => ({type: SET_GAMESTATE, gameState})

const initialGameState = {
  board: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 2],
    [2, 1, 1, 1, 1, 1, 1, 1],
    [2, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 2, 2, 2, 2]
  ],
  players: [],
  fishes: [{x: 3, y: 3, pop: 2000}]
}

const gameState = function(state = initialGameState, action) {
  switch (action.type) {
    case SET_GAMESTATE:
      return action.gameState
    default:
      return state
  }
}

module.exports = {setGameState, gameState, initialGameState}
