const SET_MAP = 'SET_MAP'

const setMap = map => ({type: SET_MAP, map})

const init = []

const board = function(state = init, action) {
  switch (action.type) {
    case SET_MAP:
      return action.map
    default:
      return state
  }
}

module.exports = {board, setMap, init}
//
