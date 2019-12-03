const UPDATE_GAME_STATS = 'UPDATE_GAME_STATS'

const updateGameStats = playerStats => ({type: UPDATE_GAME_STATS, playerStats})

const init = {}

const gameStats = (state = init, action) => {
  switch (action.type) {
    case UPDATE_GAME_STATS:
      return {...state, ...action.playerStats}
    default:
      return state
  }
}

module.exports = {gameStats, updateGameStats}
