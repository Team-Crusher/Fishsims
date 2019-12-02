const {getWaterNeighbors} = require('../../utilityMethods.js')

const ADD_DOCK = 'ADD_DOCK'

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

const init = []

const docks = (state = init, action) => {
  switch (action.type) {
    case ADD_DOCK:
      return [...state, action.dock]
    default:
      return state
  }
}

module.exports = {docks, addDock}
