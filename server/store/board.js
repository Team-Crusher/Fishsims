/**
 * ACTION TYPES
 */
const GOT_MAP = 'GOT_MAP'

const setMap = map => ({type: GOT_MAP, map})

/**
 * INITIAL STATE
 */
/*const init = {
   map: makeFake(1000),
   scroll: {
   sx: 0,
   sy: 0
   }
   }*/

const init = {}

const board = function(state = init, action) {
  switch (action.type) {
    case GOT_MAP:
      return action.map
    default:
      return state
  }
}

module.exports = {board, setMap}
