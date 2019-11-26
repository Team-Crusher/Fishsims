const {makeMap} = require('../../fractal-noise.js')
const GOT_MAP = 'GOT_MAP'

const setMap = map => ({type: GOT_MAP, map})

const init = makeMap()
/*[
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 2],
  [2, 1, 1, 1, 1, 1, 1, 1],
  [2, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 2, 2, 2, 2]
]*/

const board = function(state = init, action) {
  switch (action.type) {
    case GOT_MAP:
      return action.map
    default:
      return state
  }
}

module.exports = {board, setMap, init}
