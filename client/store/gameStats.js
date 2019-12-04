const SET_GAME_STATS = 'SET_GAME_STATS'

export const setGameStats = gameStats => ({type: SET_GAME_STATS, gameStats})

export default function(state = [], action) {
  switch (action.type) {
    case SET_GAME_STATS:
      return action.gameStats
    default:
      return state
  }
}
