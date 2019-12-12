const {getWaterNeighbors} = require('../script/utilityMethods.js')

const ADD_DOCK = 'ADD_DOCK'
const CLEAR_DOCKS = 'CLEAR_DOCKS'

const addDock = (pId, pName, coords, board) => ({
  type: ADD_DOCK,
  dock: {
    pId,
    pName: pName || `anon${pId.substring(0, 6)}`,
    col: coords.col,
    row: coords.row,
    waterNeighbors: getWaterNeighbors(coords, board),
    dockId: require('uuid/v4')()
  }
})
const clearDocks = () => ({
  type: CLEAR_DOCKS
})

const init = []

const docks = (state = init, action) => {
  switch (action.type) {
    case ADD_DOCK:
      return [...state, action.dock]
    case CLEAR_DOCKS:
      return init
    default:
      return state
  }
}

module.exports = {docks, addDock, clearDocks}
