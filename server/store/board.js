const GOT_MAP = 'GOT_MAP'

const setMap = map => ({type: GOT_MAP, map})

const init = []

const board = function(state = init, action) {
  switch (action.type) {
    case GOT_MAP:
      return action.map
    default:
      return state
  }
}

module.exports = {board, setMap, init}
